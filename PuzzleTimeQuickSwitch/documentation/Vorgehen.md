### Vorgehen
Da ich noch nie eine eigene Browsererweiterung entwickelt habe, 
musste ich mich zuerst mit den Grundlagen vertraut machen.
Zu meiner Überraschung stellte sich das erstellen als recht einfach heraus.
Dazu muss lediglich eine Datei namens manifest.json erstellt werden, 
diese ist das Herzstück der Erweiterung denn beim Importieren, 
der in einen Browser sucht dieser lediglich nach jener Datei.
Um nun aber effektiv funktionalität zu der Erweiterung hinzuzufügen, 
erstellte ich sowohl eine Javascript als auch eine HTML Datei, diese musste ich beide in der 
Konfigurationsdatei angeben, damit der Browser später auch weiss das diese Dateien zum Projekt gehören.
Danach begann ich der einen Knopf zu programmieren, welcher es möglich machen soll einen PuzzleTime eintrag, 
als Preset zu der Erweiterung hinzuzufügen. Dieser soll alle Daten aus den Eingabefeldern auslesen und diese Daten anschlissend abspeichern.
Bis zu diesem Punkt war noch alles relativ einfach, als ich jedoch mit dem Popup beginnen wollte, 
stellte ich fest, dass das ganze ohne Framework recht aufwendig wird.
Nach kurzer recherche fand ich ein sehr praktisches Tutorial welches aufzeigt, 
wie man eine Browsererweiterung mit Angular entwickelt.
Danach verwendete ich Angular Materials, um eine Tabelle zu erstellen, welche sowohl sortierbar ist, 
als auch die Möglichkeit bietet nur eine bestimmte Anzahl an einträgen anzuzeigen, damit der Benutzer nicht ewig lang scrollen muss.
Eine der grössen Schwierigkeiten bis zu diesem Punkt war die Kommunikation zwischen der Seite also dem von mir hinzugefügten Knopf und dem Popup.
Da ich anfangs nur Version 2 als manifest version verwendete, konnte ich viele Befehle nicht benutzen, da diese veraltet ist. 
Die meisten code snippets welche ich verwendete, um die presets so zu speichern, das auch das Popup auf diese zugreifen kann, wurden nur von Version 3 unterstützt.
Erst als ich realisierte das die von mir verwendete Version veraltet ist, konnte ich die Version ändern und so auf alle Befehle zugreifen.
Das nächste Problem war das Senden der Preset Daten an das Backend, das dies keinen API-Endpunkt zur verfügung stellt, welche ich für meinen Zweck verwenden konnte, 
war ich gezwungen die Daten mittels der gleichen Methode zu übermitteln welche auch vom PuzzleTime verwendet wird. 
Die Schwierigkeit hierbei war das es mir nicht nur nicht möglich war die Anfrage direkt aus der Erweiterung zu senden,
sondern auch das ich die Art der Datenübermittlung bis zu diesem Zeitpunkt noch nie gesehen bzw verwendet hatte.
Dazu kam noch das meine Anfrage schon abgelehnt wurde, weil diese nicht von dem PuzzleTime, sondern eben von meiner Erweiterung gesendet wurde. 
Nach mehreren Stunden voller Fehlermeldungen und googeln fand ich heraus das ich aus der Erweiterung auf die Seite zugreifen kann und die Anfrage quasi von der Seite selber geschickt wird. 
Nachdem ich dies Problem gelöst hatte, konnte ich endlich Daten von meiner Erweiterung an das PuzzleTime backend senden.
Als nächstes versuchte ich es zu ermöglichen, das zum Verwenden der Erweiterung nicht zwingend die PuzzleTime Seite im vordergrund sein muss.
Dies ermöglichte ich mittels eines kleinen Tricks, wie schon erwähnt war es mir nicht möglich Anfragen direkt zu schicken, die Erweiterung 
benötigt also immer eine geöffnete Seite, in welcher der Nutzer im PuzzleTime angemeldet ist.
Anfangs sendete ich meine Anfrage immer über direkt über die aktive Seite, um meine Anfrage aber trotzdem zu senden, 
musste ich zuerst den Tab identifizieren, in welchem das PuzzleTime geöffnet ist. Dies löste ich, indem ich prüfte, ob die im Tab geöffnete URL mit der PuzzleTime URL übereinstimmt.
Danach musste ich lediglich meine Anfrage mittels dieses Tabs schicken und schon war es nicht mehr erforderlich die PuzzleTime Seite im Vordergrund zu haben um die Erweiterung zu verwenden.
