Après chaque modification de fichier, fais automatiquement dans cet ordre :
1. git add . && git commit -m "update" && git push
2. NETLIFY_AUTH_TOKEN="NETLIFY_TOKEN_REDACTED" netlify deploy --prod --dir="." --site="NETLIFY_SITE_ID_REDACTED" --auth="NETLIFY_TOKEN_REDACTED"

Ne demande pas confirmation pour le git push ni pour le déploiement Netlify.
