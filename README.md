# Chasan Moustafas Reiseblog

Ein statischer Reiseblog für Chasan Moustafas persönliche Geschichten und Bilder. Westwärts ist das
erste Kapitel und begleitet das Auslandssemester in Vancouver. Beiträge liegen als Markdown Dateien
im Repository. Eine Datenbank oder ein CMS ist für die erste Version nicht erforderlich.

## Voraussetzungen

- Node.js 24.20.0
- pnpm 11.24.0

Die verwendeten Werkzeugversionen stehen in `package.json`. Volta wählt innerhalb des Projektordners
automatisch die dort festgelegte Node Version.

## Lokale Entwicklung

Beim ersten Start werden zunächst die Abhängigkeiten installiert:

```sh
pnpm install
```

Anschließend startet dieser Befehl die lokale Vorschau mit automatischer Aktualisierung:

```sh
pnpm dev
```

Astro zeigt die lokale Adresse anschließend im Terminal an.

Alternativ kann die Vorschau im Hintergrund laufen:

```sh
pnpm astro dev --background
```

Status und Ausgaben lassen sich anschließend so prüfen:

```sh
pnpm astro dev status
pnpm astro dev logs
```

Zum vollständigen Neustart wird die laufende Vorschau zuerst beendet und danach wieder gestartet:

```sh
pnpm astro dev stop
pnpm astro dev --background
```

## Beiträge schreiben

```sh
pnpm new-post -- "Titel des Beitrags"
```

Das Kommando legt unter `src/content/blog/` einen unveröffentlichten Markdown-Entwurf an. Weitere
Hinweise stehen in [`docs/content-guide.md`](docs/content-guide.md).

Die visuelle Richtung und die wichtigsten UI-Konventionen stehen in
[`docs/design-system.md`](docs/design-system.md).

## Logo

Das editierbare Logo kann mit Adobe Illustrator aus dem Skript
`scripts/illustrator/create-chasan-travels-logo.jsx` erzeugt werden. Die Anleitung steht in
[`docs/logo-guide.md`](docs/logo-guide.md).

## Qualitätsprüfungen

```sh
pnpm verify
```

Der Befehl prüft nacheinander die Formatierung, die Astro Typen und den Produktionsbuild. Mit
`pnpm format` lässt sich die Formatierung automatisch korrigieren.

## Konfiguration

Titel, Beschreibung und das aktuelle Kapitel stehen in `src/consts.ts`. Für eine öffentliche
Veröffentlichung muss `SITE_URL` auf die endgültige HTTPS Adresse gesetzt werden. Ohne diese Variable
verwendet der lokale Build `http://localhost:4321`.

Das derzeitige Vancouver Titelbild ist ein klar gekennzeichneter, frei lizenzierter Platzhalter.
Vor der Veröffentlichung kann es unter `src/assets/photos/` durch ein eigenes Foto ersetzt werden.
Bildnachweis und Alternativtext müssen dabei ebenfalls angepasst werden.

Hinweise zu eingebundenen Schriften und Bildern stehen in `THIRD_PARTY_NOTICES.md`.

## Lizenz

Der Quellcode steht unter der [MIT-Lizenz](LICENSE).

Sofern nicht anders angegeben, bleiben persönliche Blogbeiträge und eigene Fotografien urheberrechtlich
Chasan Moustafa vorbehalten. Inhalte Dritter unterliegen ihren jeweiligen Lizenzen. Einzelheiten stehen
in `THIRD_PARTY_NOTICES.md`.

## Veröffentlichung

Die Website wird über `.github/workflows/deploy.yml` geprüft und bei GitHub Pages veröffentlicht.
Pull Requests werden vollständig gebaut, aber nicht veröffentlicht. Ein Push auf `main` startet
Prüfung und Deployment.

Ohne weitere Konfiguration führt der Workflow alle Prüfungen aus und überspringt das Deployment.
Zum Veröffentlichen wird im GitHub Repository unter
`Settings > Secrets and variables > Actions > Variables` die öffentliche Variable `SITE_URL`
angelegt. Ihr Wert ist die endgültige HTTPS Adresse, zum Beispiel `https://chasantravels.de`. Die
Adresse ist öffentlich und gehört deshalb nicht in die Secrets. Nach dem Eintragen veröffentlicht
der nächste Push auf `main` oder eine manuelle Ausführung des Workflows die Website.

Anschließend wird unter `Settings > Pages` als Quelle `GitHub Actions` gewählt. Eine eigene Domain
wird dort zusätzlich unter `Custom domain` eingetragen. Dieses Projekt verwendet bewusst keinen
GitHub Repository Basispfad und erwartet für das Deployment deshalb eine endgültige Root Domain.
