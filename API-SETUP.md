# 🚀 Claude API Setup pour Life+

Système pour utiliser l'API Claude directement dans le projet.

## ⚡ Setup rapide

### 1️⃣ Configure ta clé API
```bash
npm run setup
```
Cela te guidera pour:
- Créer un fichier `.env` sécurisé
- Ajouter ta clé API Claude (https://console.anthropic.com/account/keys)

### 2️⃣ Vérifie la connexion
```bash
npm run test-api
```

### 3️⃣ C'est prêt! 🎉

---

## 🛠️ Scripts disponibles

### `npm run setup`
Assistant interactif pour configurer ta clé API.

### `npm run test-api`
Teste la connexion avec l'API Claude.
- ✅ Vérifie que la clé est valide
- ✅ Confirme la connectivité
- ✅ Affiche une réponse test

### `npm run workflow "ta tâche"`
Lance un workflow avec Claude pour analyser le projet.

**Exemples:**
```bash
npm run workflow "Optimise le dashboard"
npm run workflow "Ajoute une feature X" --commit
```

L'option `--commit` fait un git commit automatique après.

### `npm start`
Lance le workflow (ancien alias).

---

## 🔐 Sécurité

- ✅ `.env` est ignoré par git (cf `.gitignore`)
- ✅ La clé API ne sera **jamais** commitée
- ✅ Utilise des variables d'environnement système

---

## 📚 Modèles disponibles

Le projet utilise **Claude 3.5 Sonnet** par défaut (meilleur rapport performance/coût):
- Peut être changé dans `api-test.js` ou `claude-workflow.js`
- Plus récente: `claude-3-5-sonnet-20241022`

---

## ❓ Troubleshooting

### ❌ "CLAUDE_API_KEY non configurée"
→ Exécute: `npm run setup`

### ❌ "Clé API invalide"
→ Vérifie que ta clé commence par `sk-ant-`
→ Obtiens une nouvelle clé: https://console.anthropic.com/account/keys

### ❌ "Erreur 401"
→ La clé a expiré ou est invalide
→ Crée une nouvelle clé et relance `npm run setup`

---

## 💡 Prochaines étapes

1. Configure la clé: `npm run setup`
2. Teste: `npm run test-api`
3. Utilise: `npm run workflow "ta demande"`
