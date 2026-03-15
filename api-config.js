#!/usr/bin/env node
import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, ".env");
const examplePath = path.join(__dirname, ".env.example");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log("🔧 Configuration Claude API pour Life+\n");

  // Vérifie si .env existe
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    const current = fs.readFileSync(envPath, "utf8");
    const hasKey = current.includes("CLAUDE_API_KEY=") && !current.includes("xxx");

    if (hasKey) {
      console.log("✅ .env existe déjà avec une clé API configurée\n");
      const action = await ask("Veux-tu (1) la garder, (2) la remplacer? (1 ou 2): ");

      if (action === "1") {
        console.log("✓ Configuration conservée");
        rl.close();
        return;
      }
    }
  }

  // Créer/copier .env.example si absent
  if (!envExists && !fs.existsSync(examplePath)) {
    console.log("📋 Création du fichier .env...");
  }

  console.log("\n📝 Entre ta clé API Claude");
  console.log("   (Obtiens-la sur https://console.anthropic.com/account/keys)\n");

  const apiKey = await ask("Clé API (sk-ant-...): ");

  if (!apiKey || !apiKey.startsWith("sk-ant-")) {
    console.error("❌ Format invalide. Clé doit commencer par sk-ant-");
    rl.close();
    return;
  }

  // Écrire .env
  const envContent = `# Claude API Configuration
CLAUDE_API_KEY=${apiKey}

# Optional: Netlify deployment
# NETLIFY_SITE_ID=your-site-id
# NETLIFY_AUTH_TOKEN=your-token
`;

  fs.writeFileSync(envPath, envContent);
  console.log("\n✅ .env créé avec succès!");
  console.log("📍 Localisation: " + envPath);
  console.log("\n💡 Prochaines étapes:");
  console.log("   • npm run test-api   → Vérifie la connexion");
  console.log("   • npm run workflow   → Lance le workflow automatisé");

  rl.close();
}

main();
