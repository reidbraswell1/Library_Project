console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

const scriptConstants = {
  tableId: "table",
  tbodyID: "tbody",
  checkboxPrefix: "readLibraryCheckbox-",
  formBookEntry: "formBookEntry",
  formBookRead: "formBookRead",
};

class Book {
  constructor(id, title, author, read) {
    (this.id = id),
      (this.title = title),
      (this.author = author),
      (this.read = read);
  }
}
class Library {
  constructor(bookCount, books) {
    (this.bookCount = bookCount), (this.books = books);
  }
  // checkbox will be either true or false. The checkbox can be turned
  // checked or unchecked if the id matches
  markRead(checkbox, bookId) {
    console.log("--Library.markRead--");
    console.log(`Check Box = ${checkbox}\nBook Id = ${bookId}`);
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id == bookId) {
        let checkboxElement = document.getElementById(
          `${scriptConstants.checkboxPrefix}${i + 1}`
        );
        if (checkboxElement == null) {
          console.log(
            "--Error Library.markRead unable to get checkboxElement--"
          );
        } else {
          if (checkbox === "true") {
            checkboxElement.checked = true;
          } else {
            checkboxElement.checked = false;
          }
        }
      }
    }
  }

  // Add a book to the library
  addBook(bookId, bookTitle, bookAuthor, bookRead) {
    console.log("--Library.addBook--");
    console.log(
      `Book Id = ${bookId}\nBook Title:${bookTitle}\nBook Author:${bookAuthor}\nBook Read:${bookRead}`
    );
    let book;
    if (bookRead === "true") {
      book = new Book(bookId, bookTitle, bookAuthor, true);
    } else {
      book = new Book(bookId, bookTitle, bookAuthor, false);
    }
    // Increment the book count and add book to the library of books
    library.bookCount += 1;
    library.books.push(book);
    let tbody = document.getElementById(scriptConstants.tbodyID);
    if (tbody == null) {
      console.log("--Error addBook unable to get body element--");
    } else {
      let row = tbody.insertRow();
      let cellId = row.insertCell();
      let cellTitle = row.insertCell();
      let cellAuthor = row.insertCell();
      let cellRead = row.insertCell();
      cellId.innerText = book.id;
      cellTitle.innerText = book.title;
      cellAuthor.innerText = book.author;
      cellRead.innerHTML = generateInputElement(library.books.length);
      let bookReadCell = document.getElementById(
        `${scriptConstants.checkboxPrefix}${library.books.length}`
      );
      if (bookReadCell == null) {
        console.log("--Error addBook unable to get bookReadCell element");
      } else {
        if (bookRead === "true") {
          bookReadCell.checked = true;
        } else {
          bookReadCell.checked = false;
        }
      }
    }
  }
}

// Construct an empty library with no books
let library = new Library(0, []);
library.addBook(7007, "Name of the Wind", "Patrick Rothfuss", "true");
library.addBook(8009, "Gulivers Travels", "Clemens", "false");
library.markRead(false, 8009);
console.log("--root--");
console.log(
  `Library Book Count = ${library.bookCount}\nLibrary Books Array Length = ${library.books.length}`
);

function bookEntryController(bookId, bookTitle, bookAuthor, bookRead) {
  console.log("--bookEntryController--");
  console.log(
    `Book Id = ${bookId}\nBook Title = ${bookTitle}\nBook Author = ${bookAuthor}\nBook Read = ${bookRead}\n`
  );
  library.addBook(bookId, bookTitle, bookAuthor, bookRead);
  let formBookEntry = document.getElementById(scriptConstants.formBookEntry);
  if(formBookEntry == null) {
      console.log("---Error bookEntryController unable to get formBookEntry element--");
  }
  else{
      formBookEntry.reset();
  }
}

function bookMarkController(bookId, bookRead) {
  console.log("--bookMarkController--");
  console.log(`Book Id = ${bookId}\nBook Read = ${bookRead}\n`);
  library.markRead(bookRead, bookId);
  let formBookRead = document.getElementById(scriptConstants.formBookRead);
  if (formBookRead == null) {
    console.log(
      "--Error bookMarkController unable to get formBookRead element---"
    );
  } else {
    formBookRead.reset();
  }
}

function generateInputElement(count) {
  return `<input type="checkbox" name="read" id="readLibraryCheckbox-${count}" disabled />`;
}

function validateBookEntryForm(bookId) {
  console.log("--validateBookEntryForm--");
  console.log(`Book Id = ${bookId}\n`);
  let error = document.getElementById("errorBookEntry");
  if (error == null) {
    console.log("--Error validateBookEntryForm unable to get error element--");
  } else {
    error.innerText = "";
    let found = validateBookID(bookId * 1);
    if (found) {
      error.innerText = "This ID is in use please select another ID";
      error.style.color = "red";
    }
  }
}

function validateBookMarkForm(bookId) {
  console.log("--validateBookMarkForm--");
  console.log(`Book Id = ${bookId}`);
  let error = document.getElementById("errorBookMark");
  if (error == null) {
    console.log("--Error validateBookMarkForm unable to get error element--");
  } else {
    error.innerText = "";
    let found = validateBookID(bookId * 1);
    if (!found) {
      error.innerText = "This Id was not found - please enter a valid book Id";
      error.style.color = "red";
    }
  }
}

function validateBookID(bookId) {
  console.log("--validateBookID--");
  console.log(`Book Id = ${bookId}`);
  let found = false;
  for (let i = 0; i < library.books.length; i++) {
    if (library.books[i].id == bookId) {
      found = true;
    }
  }
  return found;
}
