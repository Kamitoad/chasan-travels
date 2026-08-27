# Logo in Adobe Illustrator erstellen

Das Logo wird durch ein Illustrator Skript aus editierbaren Vektorformen und Text aufgebaut. Es
verwendet keine Bildgenerierung.

## Idee

Das offene C bildet einen Weg. Das T sitzt als ruhige Wegmarke in der Mitte. Der farbige Punkt kann
als Ziel, neuer Ort oder Moment einer Reise gelesen werden. Das Zeichen bleibt auch in kleinen
Größen erkennbar und verzichtet bewusst auf Flugzeuge, Globen und andere typische Reisesymbole.

Die Farben entsprechen den bestehenden Farben der Website.

## Skript ausführen

1. Adobe Illustrator öffnen.
2. `Datei`, `Skripten`, `Anderes Skript` auswählen.
3. `scripts/illustrator/create-chasan-travels-logo.jsx` öffnen.
4. Im Speicherdialog einen Ort für die Illustrator Datei auswählen.

Das Dokument enthält drei Zeichenflächen:

1. Eine dunkle Wortmarke für helle Hintergründe
2. Eine helle Wortmarke für dunkle Hintergründe
3. Ein kompaktes Monogramm für Favicon und Profilbild

Die Wortmarken bleiben in der Illustrator Datei als Text editierbar. Das Skript verwendet bevorzugt
Palatino Linotype und Arial. Wenn eine Schrift nicht installiert ist, verwendet Illustrator eine
verfügbare Ersatzschrift.

## Für die Website exportieren

Das Logo sollte erst nach der visuellen Prüfung exportiert werden. Danach in Illustrator `Datei`,
`Exportieren`, `Für Bildschirme exportieren` wählen und die gewünschte Zeichenfläche als SVG
ausgeben. Für ein Favicon kann zusätzlich eine PNG Datei in 512 mal 512 Pixeln exportiert werden.

Vor dem Einbau in die Website werden die SVG Dateien optimiert und ihre Darstellung bei kleinen
Größen geprüft. Der ausgeschriebene Name bleibt im HTML als zugänglicher Text erhalten.
