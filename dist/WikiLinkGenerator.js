"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
            const pageTitle = searchResults[0].title;
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
const searchString = 'Flensburg, Stadt';
getWikipediaPageLink(searchString)
    .then(link => {
    if (link) {
        console.log('Wikipedia Page Link:', link);
    }
    else {
        console.log('No Wikipedia page found for the search string.');
    }
})
    .catch(err => {
    console.error('An error occurred:', err);
});
//# sourceMappingURL=WikiLinkGenerator.js.map