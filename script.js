const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    return `${this.title} written by ${this.author}, ${this.pages} pages. ${
      this.haveRead ? "Have read it." : "Not read yet."
    }`;
  };
}

function addBookToLibrary(title, author, pages, haveRead = false) {
  const newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

function addBooksToTable(booksArray) {
  let newHTML = "";
  booksArray.forEach((book) => {
    newHTML += `
      <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.haveRead ? "Read" : "Not Read"}</td>
      <td><button class="btn delete" onClick="deleteBook('${
        book.title
      }')"><i class="fa-solid fa-trash"></i></button></td>
      <td><button class="btn status" onClick="changeReadStatus('${
        book.title
      }')"><i class="fa-solid fa-glasses"></i></button></td>
      </tr>`;
  });
  console.log(newHTML);
  tableBody.innerHTML = newHTML;
}

function deleteBook(title) {
  const bookToDeleteIndex = myLibrary.findIndex((book) => book.title === title);
  myLibrary.splice(bookToDeleteIndex, 1);
  addBooksToTable(myLibrary);
}

function changeReadStatus(title) {
  const bookToDeleteIndex = myLibrary.findIndex((book) => book.title === title);
  myLibrary[bookToDeleteIndex].haveRead =
    !myLibrary[bookToDeleteIndex].haveRead;
  addBooksToTable(myLibrary);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const { title, author, pages, read } = Object.fromEntries(formData);

  addBookToLibrary(title, author, pages, read);
  addBooksToTable(myLibrary);
  form.reset();
});

addBookToLibrary("Hobbit", "JRR Tolkien", 310, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 376, false);

addBooksToTable(myLibrary);
