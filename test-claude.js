import dotenv from "dotenv";

dotenv.config(); // ⚠️ toujours avant tout usage de process.env
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

async function runTest() {
  try {
    const response = await client.messages.create({
  model: "claude-2", // <-- remplace par celui qui existe pour ton compte
  max_tokens: 300,
  messages: [
    { role: "user", content: "Salut, test API key." }
  ],
});
    console.log("✅ Réponse Claude:", response.content[0].text);
  } catch (e) {
    console.error("❌ Erreur API Claude:", e);
  }
}

runTest();