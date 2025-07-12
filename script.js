let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let resultHeading = document.getElementById("resultHeading");
let spinner = document.getElementById("spinner");

// Create a single book card and append to results
function createAndAppendListOfBooks(book) {
    let { author, imageLink, title } = book;

    let col = document.createElement('div');
    col.className = "col-6 col-md-3 mb-4";

    let bookCard = document.createElement('div');
    bookCard.className = "book-card";

    let bookImage = document.createElement('img');
    bookImage.src = imageLink;
    bookImage.alt = title;

    let bookTitle = document.createElement('h5');
    bookTitle.textContent = title;

    let authorName = document.createElement('p');
    authorName.textContent = "By " + author;

    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(authorName);

    col.appendChild(bookCard);
    searchResults.appendChild(col);
}

// Display books after API response
function diplayBooks(booksList) {
    spinner.classList.add('d-none');
    searchResults.innerHTML = "";

    if (booksList.total > 0) {
        resultHeading.textContent = "Popular Books";
        for (let book of booksList.search_results) {
            createAndAppendListOfBooks(book);
        }
    } else {
        resultHeading.textContent = "No Records Found";
    }
}

// Event listener for Enter key
searchInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        searchResults.innerHTML = "";
        resultHeading.textContent = "";
        spinner.classList.remove('d-none');

        let title = searchInput.value.trim();
        if (title === "") {
            spinner.classList.add('d-none');
            resultHeading.textContent = "Please enter a book title.";
            return;
        }

        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + title;

        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                diplayBooks(jsonData);
            });
    }
});
