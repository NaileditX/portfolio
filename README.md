# Portfolio — Mohamed Nail Hefied

Site statique : ouvrir `index.html` dans un navigateur. Aucun outil de compilation ni dépendance externe n’est nécessaire. Les chemins relatifs permettent de publier le dossier seul sur GitHub Pages.

## Pages

- `index.html` : introduction, expertises, expériences, formations et publications.
- `veego.html` : recherche doctorale, fonctionnalités et vidéos VEEGO, validation, projet EVAGO, manifestations scientifiques et publications.
- `realite-augmentee.html` : stage au LIST, contexte, AnchorSpawner, RadareX et projets RISARX/TERRIFFIC.
- `experiences.html` : enseignement en informatique, cours, responsabilités et accompagnement.
- `publications.html` : redirection conservée vers les publications de l’accueil.
- `cv/index.html` : CV imprimable ; copie du CV racine, avec ses styles locaux.

## Styles et interactions

- `styles.css` : base commune ; `theme.css` : palette claire et turquoise.
- `navigation.css` et `site.js` : navigation, menu mobile et interactions communes.
- `home.css` : structure de l’accueil.
- `hero.css` et `hero.js` : introduction et composition photographique.
- `expertises.css` et `expertises.js` : carte interactive ; sélection au clic, IHM activée par défaut.
- `timeline.css` et `timeline.js` : formations et progression au défilement.
- `experience-cards.css` : cartes des expériences.
- `experience-details.css` et `experience-details.js` : pages détaillées et animation des partenaires.

Les animations respectent la préférence de réduction du mouvement. Les vidéos locales utilisent les contrôles natifs du navigateur.

## Ressources

Les fichiers portent des noms explicites, en minuscules, sans espaces ni accents :

- `assets/images/` : portrait, photographies de l’introduction et des expériences, icône IHM et favicon.
- `assets/logos/` : LIUM, CREN, RMeS, HRV, EVAGO, Nantes Université et LIST.
- `assets/videos/` : trois démonstrations VEEGO, une démonstration AnchorSpawner et trois démonstrations RadareX.
- `assets/documents/` : article CSEDU 2026, bibliographie BibTeX téléchargeable et ancien export PDF du CV.

Le diaporama `assets/HEFIED_JournalClub.pptx` reste à son emplacement d’origine car il était verrouillé lors du rangement. Après fermeture de l’application qui l’utilise, le déplacer vers `assets/documents/journal-club-realite-augmentee.pptx`. Il sert de source au contenu de la page de réalité augmentée et n’est pas chargé par le site.

Les logos affichés sont les fichiers fournis par l’auteur ; HRV conserve sa fusion CSS pour masquer le fond blanc. Les anciennes variantes inutilisées et les scripts de l’ancien avatar ont été supprimés.

Les textes proviennent du CV académique `../main.tex`, du CV HTML et de `../references.bib`. Synchroniser `assets/documents/references.bib` après une modification de la bibliographie source. Les deux copies du CV et de ses styles doivent également rester synchronisées.

## Hébergement sur GitHub Pages

Placer le contenu du dossier `portfolio` à la racine du dépôt destiné au site. Dans les réglages GitHub, sélectionner Pages puis le déploiement depuis la branche et le dossier correspondants. Le fichier `.nojekyll` est inclus.

Les vidéos et le diaporama source sont volumineux : vérifier les limites du mode d’hébergement choisi. Le diaporama et l’ancien export PDF ne sont pas nécessaires au fonctionnement du site et peuvent être exclus du dépôt de publication.

Adresse publique : https://naileditx.github.io/portfolio/index.html (français) et https://naileditx.github.io/portfolio/en/index.html (anglais). Chaque CV contient un QR code SVG local vers le portfolio de la même langue, également cliquable dans le navigateur et le PDF. Les images sont dans `assets/images/portfolio-qr-fr.svg` et `assets/images/portfolio-qr-en.svg`. Si l’adresse du site change, régénérer les deux QR codes et actualiser les liens du CV et du générateur anglais.

## Langues

Le français est la langue par défaut. Le sélecteur FR | EN, visible dans l’en-tête y compris sur mobile, ouvre la même page dans l’autre langue et conserve la section consultée. Aucune redirection automatique selon la langue du navigateur n’est appliquée.

La version anglaise est dans `en/`, avec les mêmes pages et un CV dans `en/cv/index.html`. Le bouton CV de chaque version mène au document dans la langue correspondante. Les ressources et feuilles de style restent partagées, notamment `cv/styles.css` pour les deux CV. `language.css` et `language.js` gèrent le sélecteur ; les scripts interactifs lisent l’attribut `lang` de la page pour leurs messages.

Les titres originaux des publications et les noms officiels des établissements sont conservés. Les citations étudiantes sont traduites avec une mention explicite ; les vidéos restent celles des sources, sans doublage ajouté.

Pour maintenir les traductions, modifier `../translations/en.json`, puis exécuter `node scripts/build-english.mjs` depuis la racine du projet (le dossier parent de `portfolio`). Cette commande régénère les six pages anglaises à partir du français ; éviter de modifier directement les fichiers dans `en/`, car ils seront écrasés à la prochaine génération. Aucun script de génération ni catalogue n’est nécessaire sur l’hébergement : publier le contenu de `portfolio` comme auparavant.
