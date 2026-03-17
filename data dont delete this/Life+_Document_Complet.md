# Life+ — DOCUMENT FINAL COMPLET

## ✅ CE QUI EST FAIT (ce document)
- Analyse complète de ton code (2000 lignes)
- Méga-prompt Claude Code (amélioration UI + thèmes + Life Score)
- Méga-prompt Claude Code (migration React/Supabase — phase 2)
- Roadmap 0€ → 50M€
- Architecture technique gratuite
- Marketing 0€
- Protection IP
- Modèle économique

## ❌ CE QU'IL RESTE (toi)
- Copier prompt 1 dans Claude Code + ton index.html → dashboard amélioré
- Plus tard : copier prompt 2 → migration React
- Build-in-public dès que le design est prêt
- Enveloppe Soleau INPI (15€) pour horodater

---

# PROMPT 1 — AMÉLIORATION DU DASHBOARD ACTUEL
(copie dans Claude Code avec ton index.html)

```
Tu es mon co-fondateur technique. On améliore "Life+" — un SaaS de coaching de vie algorithmique visant 50M€+ de valorisation.

FICHIER : index.html joint. Dashboard monofichier HTML (~2000 lignes), 8 pages, Firebase sync, design dark glassmorphism. TOUT doit continuer à fonctionner.

BUDGET : 0€. On reste en monofichier HTML. Pas de framework.

NOM DU PROJET : "Life+" (remplacer "Overview" partout)

═══════════════════════════════════════
CE QUE TU DOIS FAIRE
═══════════════════════════════════════

A) SYSTÈME DE THÈMES DARK/LIGHT + 5 ACCENTS
B) LIFE SCORE (gamification quotidienne)
C) AMÉLIORATION UX/UI GLOBALE
D) Renommer en "Life+" partout

Ne casse RIEN. Toutes les features existantes (auto-checks, heure coucher dynamique, checklist filtrée par agenda, drag & drop, Firebase sync, nutrition, sport, planning, etc.) doivent fonctionner identiquement.

═══════════════════════════════════════
A) THÈMES
═══════════════════════════════════════

Ajouter data-theme="dark" et data-accent="lime" sur <html>.

DARK (défaut — améliorer le design actuel) :
--bg:#060609  --surface:rgba(12,12,20,.7)  --surface-hover:rgba(18,18,30,.8)
--border:rgba(255,255,255,.06)  --text:#f0f0f5  --text2:rgba(255,255,255,.65)
--muted:rgba(255,255,255,.35)  --card-shadow:0 2px 12px rgba(0,0,0,.4)
--input-bg:rgba(255,255,255,.04)  --sidebar-bg:rgba(6,6,9,.96)
--check-text:#000 (couleur du ✓ sur fond accent)

LIGHT :
--bg:#f5f5f7  --surface:rgba(255,255,255,.82)  --surface-hover:rgba(255,255,255,.92)
--border:rgba(0,0,0,.06)  --text:#1d1d1f  --text2:rgba(0,0,0,.6)
--muted:rgba(0,0,0,.38)  --card-shadow:0 1px 3px rgba(0,0,0,.06),0 6px 16px rgba(0,0,0,.04)
--input-bg:rgba(0,0,0,.03)  --sidebar-bg:rgba(245,245,247,.97)
--check-text:#fff
Orbs : opacity 0.35 en light. Grain : opacity 0.
Couleurs sémantiques adaptées : green=#16a34a, orange=#ea580c, red=#dc2626, blue=#2563eb, purple=#9333ea

5 ACCENTS (via data-accent) :
- lime: #c8ee00 (défaut)
- blue: #0A84FF
- violet: #BF5AF2
- orange: #FF9F0A
- rose: #FF375F

Chaque accent définit : --accent, --accent2 (plus foncé), --accent-glow (12% opacity), --accent-rgb (pour rgba()).

TOUS les éléments qui utilisent --accent doivent réagir au changement : brand dot, nav active, boutons, progress bars, badges, Life Score ring, 90J ring, etc. Ajouter transition:all .3s sur les éléments concernés.

UI POUR CHANGER :
- Dans la sidebar footer (au-dessus du day-pill) : toggle dark/light + row de 5 dots accent
- Dans Config : section "Apparence" avec le même toggle + dots en plus grand
- Sauvegarder le choix dans localStorage (clé: 'life_theme' et 'life_accent')
- Appliquer au chargement de la page

Toggle dark/light : un pill 44×24px avec un cercle 18px qui slide. Background var(--glass3), cercle background var(--accent).

═══════════════════════════════════════
B) LIFE SCORE
═══════════════════════════════════════

Score quotidien de 0 à 100. C'est LE cœur du produit. Ce qui rend l'app addictive.

ALGORITHME (à implémenter dans une fonction calculateLifeScore) :

1. CHECKLIST (25 pts max)
   = Math.round((todosDone / todosTotal) * 25)

2. SPORT (20 pts max)
   Si jour de repos dans SPORT_PROG → 20 pts automatique
   Sinon → compter tous les IDs (warmup + exos par tours + étirements) cochés dans sportChecks[dateKey], diviser par total, × 20

3. NUTRITION (15 pts max)
   Compter combien de meals (breakfast, lunch, snack, dinner) sont validés dans nutritionChecks[dateKey]
   0 repas=0, 1=4, 2=7, 3=11, 4=15

4. SOMMEIL (15 pts max)
   Chercher le todo avec id 't10' (couché avant X). Si done → 10 pts. Sinon 0.
   (Plus tard on ajoutera les données wearable pour 15pts)

5. DISCIPLINE (15 pts max)
   Filtrer les todos avec cat==='discipline'. Compter done / total × 15.

6. PRODUCTIVITÉ (10 pts max)
   Filtrer les todos avec cat==='business'. Compter done / total × 10. Si aucun → 5pts par défaut.

7. BONUS (5 pts max)
   +2 si streak (jours consécutifs ≥70%) >= 3
   +3 si streak >= 7 (remplace le +2)
   +2 si Life Score d'hier >= 80
   Cap à 5.

Total = min(100, somme de tout)

AFFICHAGE SUR LA HOME :
Nouveau composant "Life Score Hero" — la PREMIÈRE card de la page Home, au-dessus du 90J.
Layout : grand anneau SVG (110×110) à gauche avec le score au centre + breakdown barres horizontales à droite.

Anneau SVG :
- Rayon 46, strokeWidth 8
- Fond : var(--glass3)
- Fill : var(--accent), stroke-dasharray=289.03, stroke-dashoffset calculé
- Au centre : le nombre en gros (32px, font-weight 800, couleur accent) + "LIFE SCORE" en petit label mono

Breakdown (7 barres) :
Chaque barre = label mono 9px (70px wide) + track (flex:1, 5px height, var(--glass3)) + fill (couleur accent, width proportionnelle) + valeur mono 9px
Labels : Checklist, Sport, Nutrition, Sommeil, Discipline, Productivité, Bonus

Couleur du fill de chaque barre : utiliser var(--accent) pour tout (cohérent avec le thème).

Appeler calculateLifeScore() dans renderHome() et stocker le résultat dans S.lifeScore et S.lifeScoreBreakdown. Sauvegarder aussi dans todoHistory pour chaque jour.

HISTORIQUE :
Dans la section "Discipline — Progression" (les mini gauges), ajouter le Life Score sous chaque jour. Le score affiché dans les mini gauges reste le % de checklist, mais ajouter une ligne "LS: XX" en dessous.

═══════════════════════════════════════
C) AMÉLIORATIONS UX/UI
═══════════════════════════════════════

Le design doit faire "premium" — niveau app à 50M€. Pas copier Apple mais s'inspirer de la qualité : propreté, espacement, typographie, micro-interactions.

1. TYPOGRAPHIE
   - Garder Plus Jakarta Sans + Fira Code
   - Augmenter légèrement les paddings des cards (22px au lieu de 20px)
   - Les card-title en 9.5px mono uppercase sont bien, garder
   - Les card-big en 36px bold sont bien

2. CARDS
   - Ajouter box-shadow subtle : en dark "0 2px 12px rgba(0,0,0,.4)", en light "0 1px 3px rgba(0,0,0,.06), 0 6px 16px rgba(0,0,0,.04)"
   - Border-radius 16px au lieu de 14px
   - Padding 22px au lieu de 20px

3. SIDEBAR
   - Largeur 256px au lieu de 240px
   - Nav items : active = background rgba(accent-rgb, .12) + couleur accent (au lieu de fond accent plein). Plus élégant.
   - Brand name : "Life+" au lieu de "Overview"
   - Brand sub : "Dashboard · Défi 90J"

4. BOUTONS
   - Hover : légèrement plus lumineux (filter:brightness(1.08)) + translateY(-1px) + box-shadow accent glow
   - Active : translateY(0) + brightness(.95)

5. ANIMATIONS
   - Toutes les transitions : cubic-bezier(.4,0,.2,1) (ease standard)
   - View switch : fadeIn + translateY(10px) en 0.35s
   - Les progress bars : width transition 0.8s ease

6. INPUTS
   - Focus : border-color rgba(accent-rgb, .4) au lieu de hardcoded
   - Background : var(--input-bg) au lieu de hardcoded

7. MOBILE
   - Sidebar : backdrop-filter blur(40px) quand ouverte
   - Mob header : backdrop-filter blur(20px)
   - Désactiver les orbs sur mobile (opacity:0, animation:none) pour perf Safari

8. SCROLLBAR
   - Thumb : var(--muted2) au lieu de hardcoded rgba

9. FAVICON / META
   - Ajouter <meta name="apple-mobile-web-app-capable" content="yes">
   - Ajouter <meta name="theme-color" content="#060609"> (dynamique selon thème)
   - Title : "Life+ — Dashboard"

═══════════════════════════════════════
D) RENOMMER EN "Life+"
═══════════════════════════════════════

- <title> : "Life+ — Dashboard"
- Sidebar brand-name : "Life+"
- Brand sub : "Dashboard · Défi 90J"
- Partout où "Overview" apparaît dans le code

═══════════════════════════════════════
RÉSUMÉ DES MODIFICATIONS
═══════════════════════════════════════

1. Ajouter le CSS des thèmes (dark/light + 5 accents) avec les CSS variables
2. Ajouter les contrôles UI (toggle + accent dots dans sidebar + config)
3. Ajouter la fonction calculateLifeScore()
4. Ajouter le composant Life Score Hero sur la Home
5. Mettre à jour tous les éléments pour utiliser les variables de thème
6. Remplacer toutes les couleurs hardcodées par des CSS variables
7. Améliorer les détails UX (paddings, shadows, radius, animations)
8. Renommer en "Life+"
9. Tester que TOUT fonctionne : checklist, planning, nutrition, sport, corps, business, config, Firebase sync, auto-checks, drag & drop

Fais toutes les modifications dans le fichier index.html existant. Montre-moi le fichier complet modifié.
```

---

# PROMPT 2 — MIGRATION REACT (pour plus tard)
(à utiliser quand le dashboard est parfait et que tu veux passer en SaaS)

```
On migre "Life+" de monofichier HTML vers React + Supabase. Budget : 0€ (free tiers).

STACK : React 18 + Vite + Tailwind + Zustand + Recharts + Framer Motion + Supabase (auth + Postgres + Realtime) + Vercel

Le fichier index.html joint est le dashboard actuel. Reproduis EXACTEMENT le même design, comportement, et toutes les features en React.

STRUCTURE :
src/components/ → layout/, dashboard/, checklist/, planning/, nutrition/, sport/, corps/, business/, ai-coach/, social/, onboarding/, config/, ui/
src/stores/ → useAppStore.ts, useAuthStore.ts
src/lib/ → supabase.ts, lifeScore.ts, dailyReset.ts, autoChecks.ts, bedtime.ts, agendaSync.ts, constants.ts
src/hooks/ → useLifeScore.ts, useDailyReset.ts, useRealtimeSync.ts

AJOUTER :
- Auth Supabase (email + Google)
- Toutes les données dans Postgres avec RLS
- Realtime sync (remplace Firebase)
- PWA (manifest.json + service worker)
- Landing page marketing

Tables Supabase : users, user_settings, daily_state (JSONB pour todos/nutrition/sport), revenues, expenses, weight_logs, workout_logs, agenda_events, week_template, base_routine, chat_history, friendships, daily_scores

Commence par le setup + auth + Home page avec Life Score.
```

---

# ROADMAP 0€ → 50M€

**Mois 1** : Dashboard parfait (prompt 1). Life Score + thèmes. Waitlist landing page. Budget : 0€.
**Mois 2-3** : Migration React (prompt 2). Auth + Supabase. Beta 100 users. Build-in-public. Budget : 0€.
**Mois 4-6** : IA Coach (Claude API). Social/leaderboard. Stripe. Premiers revenus. Budget : 0€ → ~100€/mois API.
**Mois 6-12** : 10K users. Product-market fit. Seed si besoin. Revenus : 5-30K€/mois.
**Année 2-3** : 100K users. App native. Multi-langue. Revenus : 50-500K€/mois.
**Année 3-5** : 1M users. Valorisation 50M€+. Revenus : 500K-5M€/mois.

---

# ARCHITECTURE (0€)

Navigateur/PWA → Vercel free (frontend) → Supabase free (auth + Postgres 500MB + Realtime) → Plus tard : Edge Functions (API IA)

Quand tu as 1K users : ~100€/mois. 10K users : ~500€/mois. 100K : ~5000€/mois.

---

# MARKETING (0€)

1. **Build-in-public** : 1 post/jour (X, TikTok, LinkedIn) — screenshots, vidéos du dev
2. **Contenu viral** : "Mon IA organise ma vie pendant 30 jours" / "J'ai créé Life+"
3. **Ta success story** : ta transformation perso = meilleur marketing possible
4. **Waitlist** : page Vercel simple, "invite un ami = monte dans la liste"
5. **Communities** : Reddit (r/productivity, r/selfimprovement), Discord, Product Hunt

---

# PROTECTION IP

**Gratuit :**
- Git avec commits datés = preuve de création
- Logs Claude Code = preuve de développement
- Screenshots datés du dashboard

**15€ :** Enveloppe Soleau INPI = horodatage officiel du concept

**190€ (quand tu peux) :** Déposer la marque "Life+" à l'INPI

**0€ :** NDA à faire signer avant tout partage (template gratuit en ligne)

**Plus tard (3-10K€) :** Brevet sur algorithme spécifique si innovation technique

---

# MODÈLE ÉCONOMIQUE

| Plan | Prix | Contenu |
|------|------|---------|
| Free | 0€ | Checklist + planning basique, 5 requêtes IA/jour |
| Pro | 9.99€/mois | Tout + IA illimité + Life Score détaillé + sync |
| Premium | 19.99€/mois | Pro + social/leaderboard + analytics |

**Pour 50M€ valorisation** : ~50 000 abonnés × ~10€/mois = ~6M€/an ARR × 8 = 48M€

**Marché** : Apps productivité = 100Mds$+. Notion ~10Mds$, ClickUp ~4Mds$.

---

# ORDRE D'EXÉCUTION

1. ⬜ Copie le PROMPT 1 dans Claude Code + ton index.html
2. ⬜ Teste le dashboard amélioré (thèmes, Life Score, UX)
3. ⬜ Enveloppe Soleau INPI (15€)
4. ⬜ Crée un repo Git privé, commit tout
5. ⬜ Commence le build-in-public (1 post/jour)
6. ⬜ Waitlist (page simple sur Vercel)
7. ⬜ Quand le dashboard est parfait → PROMPT 2 (migration React)
8. ⬜ Beta 100 users → itérer → Stripe → scale
