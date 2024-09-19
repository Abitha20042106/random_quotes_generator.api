// API key and proxy URL
const apiKey = '4295e785d030c2de9d7493d5e38a43fb'; // FavQs API Key
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy to handle CORS

// Function to fetch a random quote from FavQs API
async function fetchRandomQuote() {
    try {
        console.log('Fetching a random quote...');
        const apiUrl = `${proxyUrl}https://favqs.com/api/qotd`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Random quote data:', data);

        // Display random quote
        const randomQuoteContainer = document.querySelector('#collapseExample2 .card-body');
        randomQuoteContainer.innerHTML = `
            <p>"${data.quote.body}"</p>
            <p class="fst-italic">- ${data.quote.author}</p>
        `;
    } catch (error) {
        console.error('Error fetching random quote:', error);
        alert('There was an issue fetching the random quote.');
    }
}

// Variable to keep track of the current page for pagination
let currentPage = 1;

// Function to search and display quotes by keyword using FavQs API with CORS Anywhere proxy
async function searchQuote() {
    try {
        const query = encodeURIComponent(document.querySelector('input').value); // Get the search query from input
        console.log(`Searching for quotes with keyword: ${query} on page: ${currentPage}`);

        // CORS Anywhere Proxy with FavQs API URL and pagination
        const apiUrl = `${proxyUrl}https://favqs.com/api/quotes/?filter=${query}&page=${currentPage}`;

        // Make the fetch request using CORS Anywhere to avoid CORS issues
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token token="${apiKey}"`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Response Body (Error):', errorText); // Log the error body for debugging
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data); // Log data for debugging

        // Display the first quote and author from the response
        const searchResultContainer = document.querySelector('#collapseExample .card-body');
        if (data.quotes && data.quotes.length > 0) {
            searchResultContainer.innerHTML = `
                <p>"${data.quotes[0].body}"</p>
                <p class="fst-italic">- ${data.quotes[0].author}</p>
            `;

            // Increment the page number to show different quotes on the next search
            currentPage++;
        } else {
            searchResultContainer.innerHTML = '<p>No quotes found.</p>';
            currentPage = 1; // Reset page number if no quotes are found
        }
    } catch (error) {
        console.error('Error caught in catch block:', error);
        alert('There was an issue fetching the quote. Please check the console for more details.');
    }
}

// Add event listeners to trigger the random and search quote fetching
document.querySelector('a[href="#collapseExample2"]').addEventListener('click', fetchRandomQuote);
document.querySelector('a[href="#collapseExample"]').addEventListener('click', searchQuote);

// Add event listener for the Enter key in the input field
document.querySelector('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchQuote();
        event.preventDefault(); // Prevents form submission or other default actions
    }
});
