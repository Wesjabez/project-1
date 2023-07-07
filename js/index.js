
const booksContainer = document.querySelector('.books-container');
const cartContainer = document.querySelector('.cart-container');

async function fetchBooks() {
  
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();
    return books;

    
}

function renderBooks(books) {
  books.forEach((book) => {
    const category = document.querySelector(`.${book.category}`);
    if (category) {
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
      category.appendChild(bookDiv);
    }
  });
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
const removeButton = document.createElement('button');
removeButton.classList.add('confirm');
removeButton.textContent = 'cancel';
removeButton.addEventListener('click',()=>{
  removeFromCart(bookDiv);
} )

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
  
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-tile');
  const removeButton = document.createElement('button'); 
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'X';
  removeButton.addEventListener('click', () => {
    searchResults.remove(); 
  });
  bookDiv.appendChild(removeButton);
  
  const bookDetails = document.createElement('div');
  bookDetails.classList.add('details');
  
  fetch(`http://localhost:3000/books?title_like=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        bookDetails.textContent = 'Sorry, book not available';
      } else {
        const book = data[0];
        
        const bookImage = new Image();
        bookImage.src = book.imageUrl;
        bookImage.alt = book.title;
        bookImage.classList.add('book-image');
        bookDiv.appendChild(bookImage);
        
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
      }
    })
    
    .finally(() => {
      bookDiv.appendChild(bookDetails);
      searchResults.appendChild(bookDiv);
      booksContainer.appendChild(searchResults);
    });
}



function removeFromCart(bookDiv) {
  cartContainer.removeChild(bookDiv);
}

async function loadBooks() {
  const books = await fetchBooks();
  renderBooks(books);
}
loadBooks();
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const emailInput = document.getElementById("email");
  const userEmail = emailInput.value;
  const passwordInput = document.getElementById('password');
  const userPassword = passwordInput.value;
  
  try {
    const response =  fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': userEmail,
        'password': userPassword
      })
    });
  
    const result =  response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
  

  window.location.href = "pages/home.html";
  
});
console.log("me");


