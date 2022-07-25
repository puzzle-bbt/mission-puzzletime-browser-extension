# Vorgehen
Da ich noch nie eine eigene Browsererweiterung entwickelt habe, 
musste ich mich zuerst mit den Grundlagen vertraut machen.
Zu meiner Überraschung stellte sich das blosse erstellen als recht einfach heraus.
Dazu muss lediglich eine Datei namens manifest.json erstellt werden, 
denn diese ist das Herzstück der Erweiterung.
Beim Importieren sucht der Browser lediglich nach dieser einen Datei.
Um nun aber effektiv funktionalität zu der Erweiterung hinzuzufügen, 
erstellte ich sowohl eine Javascript als auch eine HTML Datei, diese musste ich beide in der 
Konfigurationsdatei angeben, damit der Browser später auch weiss das diese Dateien zum Projekt gehören.
Danach begann ich damit einen Button zu programmieren. 
Dieser sollte es möglich machen sollte einen PuzzleTime eintrag, als Preset zu der Erweiterung hinzuzufügen. 
Das heisst er soll alle Daten aus den Eingabefeldern auslesen und diese Daten anschlissend abspeichern.

## Angular
Bis dahin war noch alles relativ einfach. 
Als ich jedoch mit dem Popup beginnen wollte, stellte ich fest, dass dies ganze ohne Framework recht aufwendig wird.
Nach kurzer recherche fand ich ein sehr praktisches Tutorial welches aufzeigt, 
wie man eine Browsererweiterung mit Angular entwickelt.
Danach verwendete ich Angular Materials, um eine Tabelle zu erstellen, 
welche sowohl sortierbar ist, als auch die Möglichkeit bietet nur eine bestimmte Anzahl an einträgen anzuzeigen.
Auf diese Weise wird verhindert, dass der Benutzer lange scrollen muss.

## Persistenz
Eine der grössen Schwierigkeiten bis zu diesem Punkt war die Kommunikation zwischen der Seite, also dem von mir hinzugefügten Knopf und dem Popup.
Da ich anfangs nur Version 2 des manifests verwendete, konnte ich viele Befehle nicht benutzen, da diese veraltet sind. 
Die meisten code snippets welche ich verwendete, um die presets so zu speichern, das auch das Popup auf diese zugreifen kann, wurden nur von Version 3 unterstützt.
Erst als ich realisierte das die von mir verwendete Version veraltet ist, konnte ich die Version ändern und so auf alle Befehle zugreifen.


## Backendkommunikation
Das nächste Problem war das Senden der Preset Daten an das Backend. 
Dies stellt aber keinen API-Endpunkt zur verfügung, welche ich für meinen Zweck hätte verwenden könnten.
So war ich gezwungen die Daten mittels der gleichen Methode zu übermitteln, welche auch vom PuzzleTime verwendet wird. 
Die Schwierigkeit hierbei war das es mir nicht nur nicht möglich war die Anfrage direkt aus der Erweiterung zu senden,
sondern auch das ich die Art der Datenübermittlung bis zu diesem Zeitpunkt noch nie gesehen bzw. verwendet hatte.
Dazu kam noch das meine Anfrage schon abgelehnt wurde, weil diese nicht von dem PuzzleTime, sondern eben von meiner Erweiterung gesendet wurde. 
Nach mehreren Stunden voller Fehlermeldungen und googeln fand ich heraus das ich mittels der Erweiterung auf die Seite zugreifen kann 
und so die Anfrage quasi von der Seite selbst geschickt wird. 
Nachdem ich dies Problem gelöst hatte, konnte ich endlich Daten von meiner Erweiterung an das PuzzleTime backend senden.
Als nächstes versuchte ich es zu ermöglichen, das zum Verwenden der Erweiterung nicht zwingend die PuzzleTime Seite im Vordergrund sein muss.
Dies ermöglichte ich mittels eines kleinen Tricks, wie schon erwähnt war es mir nicht möglich Anfragen direkt zu schicken.
Die Erweiterung benötigt also immer einen geöffneten Tab, in welchem der Nutzer im PuzzleTime angemeldet ist.
Anfangs sendete ich meine Anfrage immer über direkt über die aktive Seite, 
dies erfordert aber logischerweise, dass der Nutzer das PuzzleTime im Vordergrund geöffnet hat.
Um die Anfrage aber trotzdem senden zu können, musste ich zuerst den Tab identifizieren, in welchem das PuzzleTime geöffnet ist. 
Dies löste ich, indem ich prüfte, ob die im Tab geöffnete URL mit der PuzzleTime URL übereinstimmt.
Danach musste ich lediglich meine Anfrage mittels dieses Tabs schicken und schon war es nicht mehr erforderlich die PuzzleTime Seite im Vordergrund zu haben 
um die Erweiterung zu verwenden.

## Übersicht und Styles
Nach einiger Zeit ist mir aufgefallen, dass weder die Bootstrap noch die Angular Material Styles angewendet wurden.
Dabei wurden alle entsprechenden Klassen in das styles.css exportiert wurden.
Das merkwürdige hierbei war das die Dateien problemlos angewendet wurden, wenn ich die Anwendung via `ng serve` gestartet habe. 
Durch die Recherche fand ich heraus das Angular die Dateien aufgrund von zu strengen Optimierungen nicht anwendet wurden. 
Nachdem ich die erforderlichen Parameter im angular.json angepasste, wurden alle Styles problemlos angewendet.
Auf die Empfehlung von Pascal importierte ich die Puzzle shell und wendete diese in meinem Projekt entsprechend an.
Ein Punkt, der mich an dem damaligen aussehen störte, war das die Darstellung der Tabellenspalte "Beschreibung".
Denn diese nahm übermässig viel Platz ein und reduzierte so die Übersichtlichkeit. 
Ich löste dies Problem, in dem ich die Beschreibung nur anzeigte, sollte der Benutzer das Ausklappen Symbol benutzten.

## Abschluss
Alles in allem fand ich das ganze ein spannendes Projekt, welches ich sicher in Zukunft selber verwenden werde.

