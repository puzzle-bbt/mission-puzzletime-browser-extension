# Analyse

## Funktionalität und ihre Grenzen
Grundsätzlich kann mit plain HTML CSS und JavaScript schon viel erarbeitet werden.
Jedoch wird der Code auf diese weise sehr schnell sowohl unübersichtlich als auch unleserlich.
Der erste Schritt um dem entgegenzuwirken ist die verwendung von Libraries, sollte man aber die falsche verwenden 
kann das Projekt scn-ell unnötig gross werden.
Eine einheitliche Lösung dafür ist die verwendung eines Frameworks, in meinem Fall Angular.
Mit Angular stehen einem praktisch alle Möglichkeiten der modernen Webentwicklung zur verfügung.
Das heisst ein Projekt meiner Komplexitätsstufe ist problemlos realisierbar, 
zusätzlich wird das Frontend durch das Verwenden von Angular Materials und Bootstrap 
einheitlich und übersichtlich und dies sogar ohne viel zusätzlichen Aufwand.

## Browser übergreifende Kompatibilität
Initial versuchte ich die Erweiterung so zu gestalten, 
das diese sowohl nicht an einen spezifischen Browser bzw. Engine gebunden ist.
Jedoch wurde mir spätestes bei der Persistierung der Daten klar, 
dass dies nicht einheitlich für mehrere Browser möglich ist:
denn das Problem hierbei ist, dass nicht jeder Browser die chrome.storage api unterstützt, 
sondern eben nur die, welche auch auf der Chromium engine basieren.
Jedoch wäre es sicherlich auch möglich die Extension Firefox kompatibel zu machen.
Man müsste lediglich eine API verwenden, welche vergleichbar ist mit jener von Chromium.

## Nutzen
Die Erweiterung bietet die Möglichkeit, schnell und einfach Presets hinzuzufügen.
Dies geht direkt im PuzzleTime. Sobald ein Preset erstellt wurde, kann dies in der Erweiterung bequem aktiviert werden.
Nach der aktivierung eines Presets wird dieses farblich hervorgehoben, und der "Eintrag abschlissen" Knopf wird freigeschaltet.
Sollte ein Preset nicht mehr verwendet werden kann dies ganz einfach mittels des Mülleimers entfernt werden.
Die Erweiterung ist insofern praktisch da man lediglich einen Tab geöffnet haben muss, in dem man im PuzzleTime angemeldet ist.
Das PuzzleTime muss also nicht zwingend im Vordergrund sein. 
