console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

// Constants used in script
const scriptConstants = {
  bookCountId: "booksInLibrary",
  tableId: "table",
  tbodyID: "tbody",
  checkboxPrefix: "readLibraryCheckbox-",
  formBookEntry: "formBookEntry",
  formBookRead: "formBookRead",
};

// Book Class
// Book is composed of an "id", "title",
// "author", and boolean flag "read" indicating
// whether or not the book has been read
class Book {
  constructor(id, title, author, read) {
    (this.id = id),
      (this.title = title),
      (this.author = author),
      (this.read = read);
  }
}

// Library Class
// Library is composed of a "bookCount" and a "books" array
class Library {
  constructor(bookCount, books) {
    (this.bookCount = bookCount), (this.books = books);
  }

  // Add a book to the library
  // Method of the library class to add a book to the library object
  // The HTML table will also be updated with the book being added.
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
    this.bookCount += 1;
    let booksInLibrary = document.getElementById(scriptConstants.bookCountId);
    booksInLibrary.innerText = `Books in the library = ${library.bookCount}`;
    this.books.push(book);
    let tbody = document.getElementById(scriptConstants.tbodyID);
    if (tbody == null) {
      console.log("--Error addBook unable to get body element--");
    } else {
      let row = tbody.insertRow();
      row.id = bookId;
      let cellId = row.insertCell();
      let cellTitle = row.insertCell();
      let cellAuthor = row.insertCell();
      let cellRead = row.insertCell();
      cellId.innerText = book.id;
      cellTitle.innerText = book.title;
      cellAuthor.innerText = book.author;
      cellRead.innerHTML = generateInputElement(bookId, book.read);
      let bookReadCell = document.getElementById(
        `${scriptConstants.checkboxPrefix}${bookId}`
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

  // Deete a book from the library
  // Method of the library class to delete a book from the library object
  // The HTML table will also be updated with the book being deleted.
  deleteBook(bookId) {
    console.log("--Library.deleteBook--");
    console.log(`Book Id = ${bookId}`);

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id == bookId) {
        // Remove the element
        this.books.splice(i, 1);
        // Now remove the table entry from the html table
        let rowToRemove = document.getElementById(`${bookId}`);
        rowToRemove.remove();
        // Decrement the books in the library
        this.bookCount -= 1;
        let booksInLibrary = document.getElementById(scriptConstants.bookCountId);
        booksInLibrary.innerText = `Books in the library = ${this.bookCount}`;
      }
    }
  }

  // Method to mark a book as read or not. The checkbox
  // will be either true or false. The checkbox can be
  // checked or unchecked if the id matches
  markRead(checkbox, bookId) {
    console.log("--Library.markRead--");
    console.log(`Check Box = ${checkbox}\nBook Id = ${bookId}`);
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id == bookId) {
        let checkboxElement = document.getElementById(
          `${scriptConstants.checkboxPrefix}${bookId}`
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

}

// Construct an empty library with no books
let library = new Library(0, []);
// Add some dummy books to the library
library.addBook(7007, "Name of the Wind", "Patrick Rothfuss", "true");
library.addBook(8009, "Gulivers Travels", "Clemens", "false");
console.log("--root--");
console.log(
  `Library Book Count = ${library.bookCount}\nLibrary Books Array Length = ${library.books.length}`
);

// Action function called from the HTML formBookEntry
// This controller function will call the library method addBook to
// add a book to the library and reset the form.
function bookEntryController(bookId, bookTitle, bookAuthor, bookRead) {
  console.log("--bookEntryController--");
  console.log(
    `Book Id = ${bookId}\nBook Title = ${bookTitle}\nBook Author = ${bookAuthor}\nBook Read = ${bookRead}\n`
  );
  library.addBook(bookId, bookTitle, bookAuthor, bookRead);
  let formBookEntry = document.getElementById(scriptConstants.formBookEntry);
  if (formBookEntry == null) {
    console.log(
      "---Error bookEntryController unable to get formBookEntry element--"
    );
  } else {
    formBookEntry.reset();
  }
}

// Action function called from the HTML formBookRead
// This controller function will call the library method deleteBook
function bookDeleteController(bookId, bookDelete) {
  console.log("--bookDeleteController--");
  console.log(`Book Id = ${bookId}`);
  if (bookDelete == "true") {
    library.deleteBook(bookId);
  }
  let formBookRead = document.getElementById(scriptConstants.formBookRead);
  if (formBookRead == null) {
    console.log(
      "--Error bookMarkController unable to get formBookRead element---"
    );
  } else {
    formBookRead.reset();
  }
}

// Action function called from the HTML formBookRead
// This controller function will call the library method markRead
// and check or uncheck the input check box in the HTML table if
// the id of the book matches the supplied bookId.
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

// Helper function called to generate an input checkbox element.
// The id will vary depending on the "count" passed into the function.
// This will allow all of the newly generated elements to be obtained
// and updated.
function generateInputElement(bookId, checked) {
  if (checked) {
    return `<input type="checkbox" name="read" id="readLibraryCheckbox-${bookId}" checked disabled />`;
  } else {
    return `<input type="checkbox" name="read" id="readLibraryCheckbox-${bookId}" disabled />`;
  }
}

// Function called by the formBookEntry on submit attribute.
// The function will check to see if the "bookId" has already
// been used before allowing a user to enter a book. An error
// will be generated if the "bookId" is found.
function validateBookEntryForm(bookId) {
  console.log("--validateBookEntryForm--");
  console.log(`Book Id = ${bookId}\n`);
  let error = document.getElementById("errorBookEntry");
  if (error == null) {
    console.log("--Error validateBookEntryForm unable to get error element--");
    return false;
  } else {
    error.innerText = "";
    let found = validateBookID(bookId * 1);
    if (found) {
      error.innerText = "This ID is in use please select another ID";
      error.style.color = "red";
      return false;
    }
  }
  return true;
}

// Function called by the formBookDelete on submit attribute.
// The function will check to see if the "bookId" is found
// in the libray books array before allowing a user to delete
// a book. Returns true if the "bookId" is found in the books array.
function validateBookDeleteForm(bookId) {
  console.log("--validateBookDeleteForm--");
  console.log(`Book Id = ${bookId}`);
  let error = document.getElementById("errorBookDelete");
  if (error == null) {
    console.log("--Error validateBookDeleteForm unable to get error element--");
    return false;
  } else {
    error.innerText = "";
    let found = validateBookID(bookId * 1);
    if (!found) {
      error.innerText = "This Id was not found - please enter a valid book Id";
      error.style.color = "red";
      return false;
    }
  }
  return true;
}

// Function called by the formBookRead on submit attribute.
// The function will check to see if the "bookId" is found
// in the libray books array before allowing a user to change
// the checked or unchecked status of the "read" checkbox.
// returns true if the "bookId" is found in the books array.
function validateBookMarkForm(bookId) {
  console.log("--validateBookMarkForm--");
  console.log(`Book Id = ${bookId}`);
  let error = document.getElementById("errorBookMark");
  if (error == null) {
    console.log("--Error validateBookMarkForm unable to get error element--");
    return false;
  } else {
    error.innerText = "";
    let found = validateBookID(bookId * 1);
    if (!found) {
      error.innerText = "This Id was not found - please enter a valid book Id";
      error.style.color = "red";
      return false;
    }
  }
  return true;
}

// Helper function to check and see if the supplied
// "bookId" is found in the library books array.
// returns true if the "bookId" is found in the books array.
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
