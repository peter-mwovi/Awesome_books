class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  static addBookToList(book) {
    const list = document.getElementById('bookList');
    const li = document.createElement('li');
    li.innerHTML = `<div class='details'> <div> <strong> <span>'</span>${book.title}<span>'</span> by ${book.author} </strong> </div> <button class='delete'>Remove</button> </div>`;
    list.appendChild(li);
  }

  static clearInputFields() {
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('body');
    const form = document.getElementById('bookForm');
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  static deleteBookFromList(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
      const title = target.previousElementSibling.textContent;
      const author =
        target.previousElementSibling.previousElementSibling.textContent;
      const book = new Book(title, author);
      UI.removeFromLocalStorage(book);
      UI.showAlert('Book removed', 'success');
    }
  }

  static saveToLocalStorage(book) {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooksFromLocalStorage() {
    let books = [];
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooksFromLocalStorage() {
    const books = UI.getBooksFromLocalStorage();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static removeFromLocalStorage(book) {
    let books = UI.getBooksFromLocalStorage();
    books = books.filter(
      (item) => item.title !== book.title || item.author !== book.author
    );
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event listeners
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('titleInput').value;
  const author = document.getElementById('authorInput').value;
  const book = new Book(title, author);
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'error');
  } else {
    UI.addBookToList(book);
    UI.clearInputFields();
    UI.saveToLocalStorage(book);
    UI.showAlert('Book added', 'success');
  }
});
document.getElementById('bookList').addEventListener('click', (e) => {
  UI.deleteBookFromList(e.target);
});
// Load books from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  UI.displayBooksFromLocalStorage();
});

const bookListI = document.getElementById('book-container');
const contactI = document.getElementById('contact');
const bookFormI = document.getElementById('bookForm');

function showContent(itemId) {
  if (itemId === 'book-container') {
    bookListI.classList.remove('hidden');
    contactI.classList.add('hidden');
    bookFormI.classList.add('hidden');
  } else if (itemId === 'contact') {
    bookListI.classList.add('hidden');
    contactI.classList.remove('hidden');
    bookFormI.classList.add('hidden');
  } else if (itemId === 'bookForm') {
    bookListI.classList.add('hidden');
    contactI.classList.add('hidden');
    bookFormI.classList.remove('hidden');
  }
}

// Get the date and format it as 'March 19th 2021 9:25:32 am'
function getCurrentFormattedDate() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const today = new Date();
  const month = months[today.getMonth()];
  const day = String(today.getDate());
  const year = today.getFullYear();
  let hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Add 'st', 'nd', 'rd', or 'th' to the day based on its value
  let daySuffix = 'th';
  if (day === '1' || day === '21' || day === '31') {
    daySuffix = 'st';
  } else if (day === '2' || day === '22') {
    daySuffix = 'nd';
  } else if (day === '3' || day === '23') {
    daySuffix = 'rd';
  }

  return `${month} ${day}${daySuffix} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update the innerHTML of the dateDiv with the formatted date
document.addEventListener('DOMContentLoaded', () => {
  const dateDiv = document.getElementById('date');
  dateDiv.innerHTML = getCurrentFormattedDate();
});

showContent('book');
