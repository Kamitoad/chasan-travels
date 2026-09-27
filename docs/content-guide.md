# Beiträge schreiben

Jeder Beitrag ist eine Markdown-Datei in `src/content/blog/`. Der Dateiname wird zur stabilen
URL und sollte nach der Veröffentlichung nicht mehr geändert werden.

## Neuen Entwurf anlegen

```sh
pnpm new-post "Meine erste Woche"
```

Der neue Beitrag enthält immer `draft: true`. Entwürfe sind lokal sichtbar, werden aber weder in
einem Produktions-Build noch im RSS-Feed veröffentlicht.

## Deutsche und englische Beiträge

Deutsch ist die Standardsprache. Deutsche Beiträge liegen direkt in `src/content/blog/` und
behalten ihre bisherigen URLs unter `/blog/`. Englischsprachige Fassungen liegen mit demselben
Dateinamen in `src/content/blog/en/` und erscheinen unter `/en/blog/`. Bei englischen Beiträgen
steht `language: en` im Dateikopf. Die englische Übersetzung von `meine-ankunft.md` liegt zum
Beispiel unter `src/content/blog/en/meine-ankunft.md`.

`pnpm new-post` erstellt weiterhin einen deutschen Entwurf. Eine englische Fassung wird erst
angelegt, wenn der deutsche Text bereit ist. Titel, Zusammenfassung, Schlagwörter, Alternativtexte,
Bildunterschriften und Links müssen mitübersetzt beziehungsweise geprüft werden. Relative Bildpfade
beginnen aus dem Unterordner `en/` mit `../../../assets/` statt `../../assets/`.

Die Fassungen werden getrennt veröffentlicht: Beide behalten `draft: true`, bis Inhalt, Bilder,
Rechte und Privatsphäre für die jeweilige Sprache geprüft wurden. Nur veröffentlichte deutsche
Beiträge erscheinen im deutschen RSS-Feed; englische Beiträge erscheinen im Feed unter
`/en/rss.xml`. Für jeden übersetzten Beitrag sollte die gleichnamige deutsche Fassung existieren,
damit der Sprachwechsel zur entsprechenden Geschichte führt.

## Felder

- `title`: klarer Titel
- `description`: Zusammenfassung mit höchstens 160 Zeichen
- `pubDate`: Veröffentlichungsdatum im Format `YYYY-MM-DD`
- `updatedDate`: optionales Änderungsdatum
- `location`: optionaler, bewusst ungenauer Ort
- `language`: `de` (Standard) oder `en`
- `tags`: optionale Liste weniger hilfreicher Schlagwörter
- `draft`: `true` für Entwürfe, `false` für öffentliche Beiträge
- `heroImage`: optionales Titelbild relativ zur Beitragsdatei
- `heroImageAlt`: Pflicht, sobald ein Titelbild gesetzt ist
- `heroImageCaption`: optionale, kurze Bildunterschrift
- `heroImageCredit`: optionaler sichtbarer Bildnachweis
- `heroImageCreditUrl`: optionale URL zur Quelle oder Lizenz. Das Feld erfordert `heroImageCredit`.

Beispiel mit Bild:

```yaml
heroImage: './images/abendstimmung.jpg'
heroImageAlt: 'Blick über die Dächer der Stadt am frühen Abend'
heroImageCaption: 'Die Stadt kurz nach Sonnenuntergang.'
heroImageCredit: 'Eigenes Foto'
```

Astro erzeugt für Titelbilder mehrere responsive Größen. Bilder sollten trotzdem vorab sinnvoll
zugeschnitten sein. Im Hochformat auf dem Handy liegt der Fokus des aktuellen Layouts etwas links
der Bildmitte.

## Bilder im Beitrag

Lokale Bilder werden unter `src/assets/photos/` abgelegt und über einen relativen Pfad in den Text
eingefügt:

```md
![Blick vom Wasser auf die Lions Gate Bridge und bewaldete Berge](../../assets/photos/stanley-park.jpg)

_Stanley Park und Lions Gate Bridge. Eigenes Foto._
```

Die kursiv geschriebene Zeile direkt nach dem Bild wird als Bildunterschrift dargestellt. Bei einem
fremden Bild enthält sie zusätzlich Urheber, Quelle und Lizenz. Jedes inhaltliche Bild benötigt
einen sinnvollen Alternativtext. Bilder, die nur dekorativ sind, sollten im Beitrag vermieden werden.

## Schreibstil

Öffentliche Texte verwenden kurze, direkte Sätze. Semikola, Gedankenstriche und dekorative
Bindestriche werden vermieden. Zusammengesetzte Wörter werden ausgeschrieben, wenn das ohne
unnatürliche Formulierungen möglich ist.

Die Texte richten sich an Freunde und Familie, sollen aber auch ohne persönliches Vorwissen
verständlich sein. Die Stimme ist neugierig, inspirierend und erstaunt. Humor darf vorkommen,
solange er natürlich wirkt und eine Geschichte nicht zur Pointe zwingt.

Längere Geschichten, kurze Alltagsnotizen, Bilder, kulinarische Entdeckungen und kleine visuelle
Elemente dürfen sich abwechseln. Das Format folgt dem Erlebnis und nicht umgekehrt.

## Vor der Veröffentlichung

1. Text und mobile Vorschau prüfen.
2. Personen auf Fotos und private Informationen kontrollieren.
3. GPS- und andere sensible Bildmetadaten entfernen.
4. Rechte, Quellenangabe und Alternativtext jedes Bildes prüfen.
5. Exakte Live-Standorte, Adressen und Dokumente vermeiden.
6. `draft` erst danach auf `false` setzen.
7. `pnpm check` und `pnpm build` ausführen.
