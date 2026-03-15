#!/usr/bin/env node
import fs from "fs";
import simpleGit from "simple-git";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const git = simpleGit();

async function runWorkflow(prompt) {
  // Vérifie la clé API
  if (!process.env.CLAUDE_API_KEY) {
    console.error("❌ CLAUDE_API_KEY non configurée");
    console.error("📋 Run: npm run setup");
    process.exit(1);
  }

  const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

  try {
    console.log("🔄 Lecture du contexte du projet...");

    // Lire les fichiers pertinents du projet
    const files = fs.readdirSync("./").filter(f =>
      f.endsWith(".html") || f.endsWith(".md") || f.endsWith(".json")
    );
    const projectContext = files
      .filter(f => !f.startsWith("."))
      .map(f => {
        const content = fs.readFileSync(f, "utf8");
        return `=== ${f} ===\n${content.slice(0, 2000)}${content.length > 2000 ? "\n... (truncated)" : ""}`;
      })
      .join("\n\n");

    console.log("🤖 Appel à Claude API...");

    // Envoyer la tâche à Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are a Life+ project assistant.\n\nProject context:\n${projectContext}\n\nTask:\n${prompt}\n\nProvide your analysis and suggestions.`
        }
      ]
    });

    console.log("\n📝 Réponse Claude:");
    console.log("---");
    console.log(response.content[0].text);
    console.log("---\n");

    // Git commit et push (optionnel avec confirmation)
    const shouldCommit = process.argv.includes("--commit");
    if (shouldCommit) {
      console.log("📤 Commit et push...");
      await git.add(".");
      await git.commit(`Task: ${prompt.slice(0, 50)}`);
      await git.push();
      console.log("✅ Changements pushés");
    }
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
}

// Récupérer l'argument du terminal
const prompt = process.argv.slice(2).filter(a => a !== "--commit").join(" ");

if (!prompt) {
  console.log("Usage: npm run workflow \"your task description\"");
  console.log("       npm run workflow \"your task\" --commit");
  process.exit(1);
}

runWorkflow(prompt);