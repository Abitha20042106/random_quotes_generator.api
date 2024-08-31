document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display today's quote
    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Display the quote and author
            const quoteContainer = document.querySelector('#collapseExample2 .card-body');
            quoteContainer.innerHTML = `
            <p>${data.content}</p>
            <p class="fst-italic">${data.author}</p>
        `;
        } catch (error) {
            console.error('Error fetching the quote:', error);
        }
    }

    // Function to fetch and display a searched quote
    async function searchQuote() {
        const query = document.querySelector('input').value;
        if (!query) return;

        try {
            const response = await fetch(`https://api.quotable.io/search/quotes?query=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const quotes = data.results;

            // Display a random quote from the search results
            const searchResultContainer = document.querySelector('#collapseExample .card-body');
            if (quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                searchResultContainer.innerHTML = `
                  <p>${quotes[randomIndex].content}</p>
                  <p class="fst-italic">${quotes[randomIndex].author}</p>
              `;
            } else {
                searchResultContainer.innerHTML = '<p>No quotes found for the given search.</p>';
            }

            // Expand the collapse element to show the result
            const collapseElement = document.getElementById('collapseExample');
            const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
            bsCollapse.show();

        } catch (error) {
            console.error('Error fetching the search results:', error);
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

});