"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function processJsonData(jsonData) {
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
const fileNames = ['../data/data_2021.json'];
fileNames.forEach((fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(`Fehler beim Lesen der Datei ${fileName}:`, err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const triples = processJsonData(jsonData);
            const outputFileName = fileName.replace('.json', '.ttl');
            fs.writeFile(outputFileName, triples, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(`Fehler beim Schreiben der Datei ${outputFileName}:`, writeErr);
                    return;
                }
                console.log(`Die Datei ${outputFileName} wurde erfolgreich erstellt.`);
            });
        }
        catch (parseError) {
            console.error(`Fehler beim Parsen der JSON-Daten in ${fileName}:`, parseError);
        }
    });
});
//# sourceMappingURL=Triples.js.map