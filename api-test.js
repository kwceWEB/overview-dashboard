#!/usr/bin/env node
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

async function testAPI() {
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey || apiKey === "sk-ant-xxx-your-api-key-here-xxx") {
    console.error("❌ CLAUDE_API_KEY non configurée ou invalide");
    console.error("📋 Setup:");
    console.error("   1. Copie .env.example en .env");
    console.error("   2. Ajoute ta clé API Claude (https://console.anthropic.com)");
    console.error("   3. Relance ce script");
    process.exit(1);
  }

  try {
    const client = new Anthropic({ apiKey });

    console.log("🔄 Test connexion Claude API...");
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 100,
      messages: [
        { role: "user", content: "Dis bonjour très brièvement en français." }
      ],
    });

    console.log("✅ Connexion réussie!");
    console.log("📝 Réponse Claude:", response.content[0].text);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur API:", error.message);
    if (error.status === 401) {
      console.error("⚠️  Clé API invalide ou expirée");
    }
    process.exit(1);
  }
}

testAPI();
