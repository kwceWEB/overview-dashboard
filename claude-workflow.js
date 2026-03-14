import fs from "fs";
import { execSync } from "child_process";
import fetch from "node-fetch";
import simpleGit from "simple-git";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
const git = simpleGit();

async function runWorkflow(prompt) {
  // Lire les fichiers du projet
  const files = fs.readdirSync("./").filter(f => f.endsWith(".html") || f.endsWith(".md"));
  const projectContext = files.map(f => `FILE:${f}\n${fs.readFileSync(f, "utf8")}`).join("\n");

  // Envoyer la tâche à Claude API
  const response = await anthropic.messages.create({
    model: "claude-3-7-sonnet",
    max_tokens: 4000,
    messages: [
      { role: "user", content: `Project files:\n${projectContext}\n\nTask:\n${prompt}\nReturn modified files.` }
    ]
  });

  // Afficher le résultat
  console.log(response.content[0].text);

  // Ici tu pourrais parser et écrire les fichiers modifiés automatiquement
  // fs.writeFileSync("index.html", modifiedContent);

  // Commit et push sur GitHub
  await git.add(".");
  await git.commit(`Automated update: ${prompt}`);
  await git.push();

  // Déploiement Netlify
  const netlifyRes = await fetch(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` }
  });
  const netlifyData = await netlifyRes.json();
  console.log("Déploiement Netlify:", netlifyData.id);
}

// Récupérer l'argument du terminal
const prompt = process.argv.slice(2).join(" ");
runWorkflow(prompt);