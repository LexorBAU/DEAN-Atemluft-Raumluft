# DEAN: Raumluft und Atemluft im Vergleich

Digitaler Experimentierassistent (DEAN) für die Doppelstunde „Raumluft und Atemluft im Vergleich“ (Klasse 8 NTG, Bayern). Entstanden als Teil einer schriftlichen Hausarbeit im Seminar („Luft als Stoffgemisch“). **Stand: Entwurf.**

Die ganze Anwendung ist **eine einzige HTML-Datei** (`index.html`). Sie läuft offline im Browser, auch auf dem iPad, und braucht kein Netz, keine Installation und keinen Server. Die SuS führen darin durch die fünf Schritte des naturwissenschaftlichen Erkenntnisgewinnungsprozesses. Die Maskottchen-Figur „Bunsi“ begleitet sie.

## Inhalt
- Vier Versuche: A Kalkwasserprobe, B Glimmspanprobe, C Kerze unter dem Becherglas, D Sauerstoffanteil der Luft (Animation mit Stahlwolle und zwei Kolbenprobern)
- Skizzeneditor für den Aufbau, Hilfe-Funktion mit Hinweisen und Lösungsangebot, Sicherheitshinweise
- Abgleich der Ergebnisse mit Literaturwerten
- Protokoll als PDF, wird auf dem Gerät der SuS erzeugt (ohne Server)
- Sprachen: Deutsch, Persisch, Türkisch. **Die persischen und türkischen Texte sind mit KI erstellt und noch nicht von Muttersprachlern geprüft.**

## Benutzen
- Lokal: `index.html` im Browser öffnen.
- Über GitHub Pages: Im Repository unter Settings → Pages den Zweig `main` und den Ordner `/ (root)` wählen. Die Seite liegt dann unter der von GitHub angezeigten Adresse.
- Der Stand der SuS wird nur im Browser des jeweiligen Geräts (localStorage) gespeichert. Es werden keine Daten übertragen.

## Aus den Quelldateien bauen
Voraussetzung ist Python 3, es sind keine zusätzlichen Pakete nötig.

```
python3 build.py
```

Das erzeugt `index.html` aus den Dateien in `src/` (Texte, Logik, Seiten, Design) und den Bildern und Videos in `assets/` und `bunsi/`.

| Ordner/Datei | Inhalt |
|---|---|
| `src/texts.js` | alle Texte (Deutsch, Persisch, Türkisch), Aufgabenstellungen, Konfiguration |
| `src/core.js`, `ui.js`, `pages.js`, `widgets.js` | Zustand, Bunsi, Seiten, Skizzeneditor und Animationen |
| `src/pdf.js`, `pdfloc.js`, `export.js` | PDF-Erzeugung (Deutsch als Text, Persisch/Türkisch als gesetzte Seiten) |
| `src/app.css` | Gestaltung |
| `assets/` | Fotos und Videos des Versuchsaufbaus, Gefahrenpiktogramm |
| `bunsi/svg`, `bunsi/png` | Bunsi-Grafiken |
| `wheel/` | Grafiken des Prozess-Rads |
| `tools/` | Skripte, mit denen Bunsi und das Rad erzeugt wurden |

Bunsi und Rad neu erzeugen (optional):
```
python3 tools/gen_bunsi.py bunsi/svg
PYTHONPATH=tools python3 tools/rad2.py
```

## Hinweise
- Im Text lassen sich offene Punkte mit `[PRÜFEN]` und fehlende Aufgabenstellungen mit `[PLATZHALTER]` markieren. Die App hebt solche Markierungen hervor. Stand 20.11.2026 sind keine offen.
- Das Lehrerpasswort steht in `src/texts.js` (`LEHRER_PASSWORT`). **Vor einer Veröffentlichung ändern.**
- Quellen der Infotexte und Werte: Online-Lexika, Abruf am 19.11.2026. Die vollständigen Angaben stehen in der Quellenübersicht der Hausarbeit.
- Eine Lizenz ist noch nicht festgelegt.
