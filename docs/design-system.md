# Designsystem

## Richtung

Der Reiseblog verbindet ein redaktionelles Fototagebuch mit einem klaren, chronologischen Journal.
Große Fotos und Serifenüberschriften tragen die Geschichten. Navigation und Metadaten bleiben
sachlich und kompakt. Westwärts ist das erste Kapitel und nicht der Name der gesamten Website. Das
Design vermeidet austauschbare Kartenraster, Pillen Buttons und dekorative Elemente ohne inhaltliche
Funktion.

## Grundbausteine

- **Pacific Ink** bildet Header, Footer und die Kapitelübersicht ab.
- **Warm Paper** ist die ruhige Lesefläche für Journal und Artikel.
- **Cedar** kennzeichnet Links, Status und kleine redaktionelle Marker.
- Die System-Serifenschrift wird nur für Überschriften, Intros und Zitate verwendet.
- Atkinson bleibt als selbst gehostete, gut lesbare Schrift für Fließtext und Navigation erhalten.
- Monospace-Metadaten machen Datum, Ort und Eintragsnummern schnell unterscheidbar.

Die zentralen Tokens stehen in `src/styles/global.css`. Seiten verwenden diese Tokens statt eigener,
fast identischer Farben oder Abstände.

## Komponenten

- `Header.astro` und `Footer.astro` bilden die globale, bewusst kleine Navigation.
- `PostPreview.astro` ist die gemeinsame chronologische Vorschau auf Start- und Journal-Seite.
- `BlogPost.astro` verantwortet Artikelkopf, Titelbild, Lesefläche und Abschlussnavigation.
- Die Content Collection in `src/content.config.ts` bleibt die Quelle für alle Beitragsmetadaten.

## Responsive und zugänglich

Das Layout arbeitet mit flüssigen Größen und wenigen inhaltlich begründeten Breakpoints. Navigation
und zentrale Textlinks besitzen mindestens 44 Pixel Höhe. Bei sehr kleinen Viewports werden
mehrspaltige Bereiche zu einer linearen Lesereihenfolge. Sichtbarer Tastaturfokus verwendet einen
hellen und einen dunklen Ring, damit er auf Foto, Papier und Ink Flächen erkennbar bleibt.

Semantische Landmarks, eine einzelne Hauptüberschrift, beschriftete Regionen, `aria-current`, ein
Skip-Link und aussagekräftige Alternativtexte sind verbindlich. Bewegung bleibt optional und wird
bei `prefers-reduced-motion` reduziert.

## Fotos

Das aktuelle Titelbild ist ein eigenes Foto vom Flughafen Calgary. Eigene und fremde Aufnahmen
werden mit aussagekräftigem Alternativtext, Bildunterschrift und gegebenenfalls sichtbarem
Bildnachweis verwendet. Vor der Veröffentlichung werden sensible Metadaten entfernt.

## Sinnvolle nächste Erweiterungen

1. Eigene Fotos und einen echten ersten Beitrag einsetzen.
2. Wiederverwendbare Bildreihen mit konsistenten Beschriftungen ergänzen, sobald ein Beitrag sie
   tatsächlich benötigt.
3. Eine zurückhaltende Karte oder Lightbox erst nach mehreren passenden Beiträgen bewerten.

React, eine Datenbank und Drittanbieter-Skripte bleiben außen vor, solange kein konkretes Feature sie
rechtfertigt.
