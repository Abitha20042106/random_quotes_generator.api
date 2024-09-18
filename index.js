// Function to fetch and display today's quote
async function fetchQuote() {
    try {
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://zenquotes.io/api/random') + '&cache-bust=' + new Date().getTime());
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        // Display the quote and author from the response
        const quoteContainer = document.querySelector('#collapseExample2 .card-body');
        quoteContainer.innerHTML = `
            <p>${data[0].q}</p>
            <p class="fst-italic">${data[0].a}</p>
        `;
    } catch (error) {
        console.error('Error fetching the quote:', error);
        alert('There was an issue fetching the quote. Please try again later.');
    }
}

// Function to fetch and display a random quote
async function searchQuote() {
    try {
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://zenquotes.io/api/random') + '&cache-bust=' + new Date().getTime());
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Display the random quote and author
        const searchResultContainer = document.querySelector('#collapseExample .card-body');
        searchResultContainer.innerHTML = `
            <p>${data[0].q}</p>
            <p class="fst-italic">${data[0].a}</p>
        `;

        // Expand the collapse element to show the result
        const collapseElement = document.getElementById('collapseExample');
        const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
        bsCollapse.show();

    } catch (error) {
        console.error('Error fetching the search results:', error);
        alert('There was an issue fetching the quote. Please try again later.');
    }
}

// Add event listeners to trigger the quote fetching
document.querySelector('a[href="#collapseExample2"]').addEventListener('click', fetchQuote);
document.querySelector('a[href="#collapseExample"]').addEventListener('click', searchQuote);

// Add event listener for the Enter key in the input field
document.querySelector('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchQuote();
        event.preventDefault(); // Prevents form submission or other default actions
    }
});
