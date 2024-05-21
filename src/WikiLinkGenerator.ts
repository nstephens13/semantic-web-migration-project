import axios from 'axios';

async function getWikipediaPageLink(searchString: string): Promise<string | null> {
    try {
        const apiUrl = 'https://en.wikipedia.org/w/api.php';
        
        // Define API parameters
        const params = {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: searchString,
        };

        // Make the API request
        const response = await axios.get(apiUrl, { params });
        
        // Extract the link from the API response
        const searchResults = response.data.query.search;
        if (searchResults.length > 0) {
            const pageTitle = searchResults[0].title;
            const pageLink = `https://en.wikipedia.org/wiki/${pageTitle}`;
            return pageLink;
        } else {
            return null; // No matching page found
        }
    } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        return null;
    }
}

// Example usage
const searchString = 'Flensburg, Stadt';
getWikipediaPageLink(searchString)
    .then(link => {
        if (link) {
            console.log('Wikipedia Page Link:', link);
        } else {
            console.log('No Wikipedia page found for the search string.');
        }
    })
    .catch(err => {
        console.error('An error occurred:', err);
    });
