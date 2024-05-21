import * as fs from 'fs';

function processJsonData(jsonData: any): string {
  const triples = `
    @prefix : <http://example.org/> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    # Weitere Prefixes hier definieren

    :subject rdf:type :Class .
    :subject :property "${jsonData.propertyValue}" .
    # Weitere Triples hier hinzufügen
  `;

  return triples;
}

// Array von Dateinamen
const fileNames: string[] = ['../data/data_2021.json'];

// Lese und verarbeite die JSON-Dateien
fileNames.forEach((fileName: string) => {
  fs.readFile(fileName, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error(`Fehler beim Lesen der Datei ${fileName}:`, err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const triples = processJsonData(jsonData);

      const outputFileName = fileName.replace('.json', '.ttl');
      fs.writeFile(outputFileName, triples, 'utf8', (writeErr: NodeJS.ErrnoException | null) => {
        if (writeErr) {
          console.error(`Fehler beim Schreiben der Datei ${outputFileName}:`, writeErr);
          return;
        }
        console.log(`Die Datei ${outputFileName} wurde erfolgreich erstellt.`);
      });
    } catch (parseError) {
      console.error(`Fehler beim Parsen der JSON-Daten in ${fileName}:`, parseError);
    }
  });
});