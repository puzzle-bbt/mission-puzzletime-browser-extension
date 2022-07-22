# Analyse

## Funktionalität und ihre Grenzen
Grundsätzlich kann mit plain HTML CSS und JavaScript schon viel erarbeitet,
jedoch wird der Code ohne die Nutzung von Libraries schnell unübersichtlich und unleserlich.
Der erste Schritt um dem entgegenzuwirken ist die verwendung von Libraries, dies können das
Projekt jedoch schnell unnötig gross machen sollten man die falschen verwenden.
Eine einheitliche Lösung dafür ist die verwendung eines Frameworks, in meinem Fall Angular.
Mit Angular stehen einem praktisch alle Möglichkeiten der modernen Webentwicklung zur verfügung.
Das heisst ein Projekt meiner Komplexitätsstufe ist problemlos realisierbar, 
zusätzlich wird das Frontend durch das Verwenden von Angular Materials und Bootstrap 
einheitlich und übersichtlich und das sogar ohne viel zusätzlichen Aufwand.

## Browser übergreifende Kompatibilität
Initial versuchte ich die Erweiterung so zu gestalten, 
das diese sowohl nicht an einen spezifischen Browser bzw Engine gebunden ist.
Jedoch wurde mir spätestes bei der Persistierung der Daten klar das dies nicht für mehrere Browser möglich ist:
denn das Problem hierbei ist, dass nicht jeder Browser die chrome.storage api unterstützt, 
sondern eben nur die, welche auch auf der Chromium engine basieren.
Jedoch wäre es sicherlich auch möglich die Extension Firefox kompatibel zu machen, 
mann müsste lediglich eine mit der von Chromium bereitgestellte vergleichbare API verwenden.

## Nutzen
Die Erweiterung bietet die möglichkeit bietet schnell und einfach Presets hinzuzufügen, 
dies geht direkt im PuzzleTime. Sobald ein Preset erstellt wurde, kann dies in der Erweiterung bequem aktiviert werden.
Das aktivierung des Presets wird dieses farblich hervorgehoben, und der "Eintrag abschlissen" Knopf wird freigeschaltet.
Sollte ein Preset nicht mehr verwendet werden kann dies ganz einfach mittels des Mülleimers entfernt werden.
