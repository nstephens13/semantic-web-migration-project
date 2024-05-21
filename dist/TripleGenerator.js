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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
console.log(`\n#################################################################\n`);
console.log(`@prefix mo: <https://gitlab.imn.htwk-leipzig.de/semantic-web-migration/migration-backend/-/blob/main/Ontology/migrationOntology.ttl#> .`);
console.log(`@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .`);
console.log(`@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .`);
console.log(`@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .`);
console.log(`\n#################################################################\n`);
let Identifier;
let DataYear;
function readJsonFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        return jsonData;
    }
    catch (error) {
        console.error("Error reading JSON file:", error);
        return null;
    }
}
function replaceSpacesWithUnderscores(input) {
    return input.replace(/ /g, "_");
}
async function getWikipediaPageLink(searchString) {
    try {
        const apiUrl = 'https://en.wikipedia.org/w/api.php';
        const params = {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: searchString,
        };
        const response = await axios_1.default.get(apiUrl, { params });
        const searchResults = response.data.query.search;
        if (searchResults.length > 0) {
            const pageTitle = replaceSpacesWithUnderscores(searchResults[0].title);
            const pageLink = `https://en.wikipedia.org/wiki/${pageTitle}`;
            return pageLink;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        return null;
    }
}
function generateTriples(filePath, DataYear) {
    const data1 = readJsonFile(filePath);
    for (const data of data1) {
        async function main() {
            if (data) {
                let Identifier = `${data.RS}_${DataYear}`;
                const result = await getWikipediaPageLink(data.NAME);
                console.log(`\n\n`);
                console.log(`mo:${Identifier} a mo:City ;`);
                console.log(`                 mo:name "${data.NAME}"@en ;`);
                console.log(`                 mo:regional_code ${data.RS} ;`);
                console.log(`                 mo:year ${DataYear} .`);
                if (result) {
                    console.log(`mo:${Identifier} mo:wikiLink <${result}> .`);
                }
                console.log(`\n`);
                console.log(`mo:Population_${Identifier} a mo:Population ;`);
                console.log(`                            mo:totalPopulation ${data.INSGESAMT} .`);
                console.log(`\n`);
                console.log(`mo:Population_Agegroup_${Identifier} a mo:Agegroup ;`);
                console.log(`                                     mo:under_6_years ${data.IIU6} ;`);
                console.log(`                                     mo:between_6_and_15_years ${data.II6BU15} ;`);
                console.log(`                                     mo:between_15_and_65_years ${data.II15BU65} ;`);
                console.log(`                                     mo:older_than_65_years ${data.II65UM} .`);
                console.log(`\n`);
                console.log(`mo:Germans_${Identifier} a mo:Germans ;`);
                console.log(`                         mo:totalGermans ${data.DIU6 + data.DI6BU15 + data.DI15BU65 + data.DI65UM} .`);
                console.log(`\n`);
                console.log(`mo:Germans_Agegroup_${Identifier} a mo:Agegroup ;`);
                console.log(`                                 mo:under_6_years ${data.DIU6} ;`);
                console.log(`                                 mo:between_6_and_15_years ${data.DI6BU15} ;`);
                console.log(`                                 mo:between_15_and_65_years ${data.DI15BU65} ;`);
                console.log(`                                 mo:older_than_65_years ${data.DI65UM} .`);
                console.log(`\n`);
                console.log(`mo:Foreigners_${Identifier} a mo:Foreigners ;`);
                console.log(`                            mo:totalForeigners ${data.AZR_INSG} ;`);
                console.log(`                            mo:fromEU ${data.AZR_EU28_AUSL} ;`);
                console.log(`                            mo:from_non_EU ${data.AZR_NICHTEU_AUSL} .`);
                console.log(`\n`);
                console.log(`mo:Foreigners_Agegroup_${Identifier} a mo:Agegroup ;`);
                console.log(`                                     mo:under_6_years ${data.AIU6} ;`);
                console.log(`                                     mo:between_6_and_15_years ${data.AI6BU15} ;`);
                console.log(`                                     mo:between_15_and_65_years ${data.AI15BU65} ;`);
                console.log(`                                     mo:older_than_65_years ${data.AI65UM} .`);
                console.log(`\n`);
                console.log(`mo:ProtectionSeekers_${Identifier} a mo:ProtectionSeekers ;`);
                console.log(`                                   mo:open ${data.N_Sch_O} ;`);
                console.log(`                                   mo:recognized ${data.N_Sch_J} ;`);
                console.log(`                                   mo:cancelled ${data.N_Sch_N} .`);
                console.log(`\n`);
                console.log(`mo:Residence_Status_${Identifier} a mo:Residence_Status ;`);
                console.log(`                                  mo:with_EU_residence_permit ${data.AZR_EUNIEDERL} ;`);
                console.log(`                                  mo:with_permanent_residence_permit ${data.AZR_UNBEFR} ;`);
                console.log(`                                  mo:with_temporary_residence_permit ${data.AZR_BEFR} ;`);
                console.log(`                                  mo:with_permission_to_remain ${data.AZR_GESTATT} ;`);
                console.log(`                                  mo:with_permission_to_remain_untill_deported ${data.AZR_DULD} .`);
                console.log(`\n`);
                console.log(`mo:Duration_of_stay_${Identifier} a mo:Duration_of_stay ;`);
                console.log(`                                  mo:under2years ${data.AZR_ADU2} ;`);
                console.log(`                                  mo:2to10years ${data.AZR_AD2BU10} ;`);
                console.log(`                                  mo:from10to25years ${data.AZR_AD10BU25} ;`);
                console.log(`                                  mo:from_25_years_and_more ${data.AZR_AD25UM} .`);
                console.log(`\n# Property Assertions for ${data.NAME} in ${DataYear}`);
                console.log(`mo:${Identifier} mo:hasPopulation mo:Population_${Identifier} .`);
                console.log(`mo:Population_${Identifier} mo:hasGermans mo:Germans_${Identifier} .`);
                console.log(`mo:Population_${Identifier} mo:hasForeigners mo:Foreigners_${Identifier} .`);
                console.log(`mo:Population_${Identifier} mo:hasProtectionSeekers mo:ProtectionSeekers_${Identifier} .`);
                console.log(`mo:Population_${Identifier} mo:PopulationAgegroup mo:Population_Agegroup_${Identifier} .`);
                console.log(`mo:Germans_${Identifier} mo:GermanAgegroup mo:Germans_Agegroup_${Identifier} .`);
                console.log(`mo:Foreigners_${Identifier} mo:ForeignersAgegroup mo:Foreigners_Agegroup_${Identifier} .`);
                console.log(`mo:Foreigners_${Identifier} mo:hasCitizenship mo:Citizenship_${Identifier} .`);
                console.log(`mo:Foreigners_${Identifier} mo:hasResidenceStatus mo:Residence_Status_${Identifier} .`);
                console.log(`mo:Foreigners_${Identifier} mo:hasDurationOfStay mo:Duration_of_stay_${Identifier} .`);
            }
        }
        main();
    }
}
const data2021 = '../data/data_2021.json';
const data2022 = '../data/data_2022.json';
generateTriples(data2021, 2021);
//# sourceMappingURL=TripleGenerator.js.map