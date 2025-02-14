// <!-- Script to Handle Mobile Menu -->
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Adding api <!-- JavaScript to Fetch Books -->
async function fetchBooks() {
    const query = "popular books";
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const booksScroller = document.getElementById("booksScroller");
      booksScroller.innerHTML = "";

      const bookCards = [];

      data.items.forEach((book) => {
        const bookInfo = book.volumeInfo;

        const bookCard = document.createElement("div");
        bookCard.className =
          "book-card min-w-[180px] max-w-[180px] bg-white rounded-md shadow-md p-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer";

        bookCard.innerHTML = `
          <img src="${
            bookInfo.imageLinks?.thumbnail ||
            'https://via.placeholder.com/150'
          }" alt="${bookInfo.title}" class="w-full h-40 object-cover rounded mb-2">
          <h3 class="text-md text-center font-semibold truncate">${bookInfo.title}</h3>
          <h6 class="text-sm text-center text-gray-800 truncate">${
            bookInfo.authors?.join(", ") || "Unknown Author"
          }</h6>
        `;

        bookCards.push(bookCard);
      });

      // Double the cards for seamless infinite scroll
      bookCards.forEach((card) => booksScroller.appendChild(card.cloneNode(true)));
      bookCards.forEach((card) => booksScroller.appendChild(card.cloneNode(true)));

      // Start the scrolling animation
      booksScroller.classList.add("scrolling");
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  }

  window.addEventListener("DOMContentLoaded", fetchBooks);