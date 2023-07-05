document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  window.location.href = "pages/home.html";
});

const booksContainer = document.querySelector('.books-container');
const cartContainer = document.querySelector('.cart-container');

async function fetchBooks() {
  const response = await fetch('http://localhost:3000/books');
  const books = await response.json();
  return books;
}

function renderBook(book, parentElement) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');

  const bookImage = new Image();
  bookImage.src = book.imageUrl;
  bookImage.alt = book.title;
  bookImage.classList.add('book-image');
  bookDiv.appendChild(bookImage);

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('details');

  const bookTitle = document.createElement('div');
  bookTitle.classList.add('title');
  bookTitle.textContent = book.title;
  bookDetails.appendChild(bookTitle);

  const bookDescription = document.createElement('div');
  bookDescription.classList.add('description');
  bookDescription.textContent = book.description;
  bookDetails.appendChild(bookDescription);

  const bookPrice = document.createElement('div');
  bookPrice.classList.add('price');
  bookPrice.textContent = `Price: $${book.price}`;
  bookDetails.appendChild(bookPrice);

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', () => {
    addToCart(book);
  });
  bookDetails.appendChild(addToCartButton);

  bookDiv.appendChild(bookDetails);
  parentElement.appendChild(bookDiv);
}

function addToCart(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-tile');

  const bookImage = new Image();
  bookImage.src = book.imageUrl;
  bookImage.alt = book.title;
  bookImage.classList.add('book-image');
  bookDiv.appendChild(bookImage);

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('details');

  const bookTitle = document.createElement('div');
  bookTitle.classList.add('title');
  bookTitle.textContent = book.title;
  bookDetails.appendChild(bookTitle);

  const bookDescription = document.createElement('div');
  bookDescription.classList.add('description');
  bookDescription.textContent = book.description;
  bookDetails.appendChild(bookDescription);

  const bookPrice = document.createElement('div');
  bookPrice.classList.add('price');
  bookPrice.textContent = `Price: $${book.price}`;
  bookDetails.appendChild(bookPrice);

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('confirm');
  confirmButton.textContent = 'Confirm';
  confirmButton.addEventListener('click', () => {
    alert('Order placed');
    removeFromCart(bookDiv);
  });
  bookDetails.appendChild(confirmButton);

  bookDiv.appendChild(bookDetails);
  cartContainer.appendChild(bookDiv);
}

function searchBooks(event) {
  event.preventDefault();

  const searchBox = document.querySelector('.searchBox');
  const searchTerm = searchBox.value.trim().toLowerCase();

  if (searchTerm === '') {
    return;
  }

  const searchResults = document.createElement('div');
  searchResults.classList.add('search-results');

  fetch(`http://localhost:3000/books?title_like=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        const bookDetails = document.createElement('div');
        bookDetails.classList.add('details');
        bookDetails.textContent = 'Sorry, book not available';
        searchResults.appendChild(bookDetails);
      } else {
        data.forEach(book => {
          renderBook(book, searchResults);
        });
      }
    })
    .catch(error => {
      const bookDetails = document.createElement('div');
      bookDetails.classList.add('details');
      bookDetails.textContent = 'Error searching for books';
      console.log('Error searching for books:', error);
      searchResults.appendChild(bookDetails);
    })
    .finally(() => {
      booksContainer.appendChild(searchResults);
    });
}

function removeFromCart(bookDiv) {
  cartContainer.removeChild(bookDiv);
}

async function loadBooks() {
  const books = await fetchBooks();
  books.forEach(book => {
    renderBook(book, booksContainer);
  });
}

loadBooks();