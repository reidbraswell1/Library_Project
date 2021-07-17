console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

let checkboxNumber = 0;

const scriptConstants = {
    inputElement: `<input type="checkbox" name="read" id="readLibraryCheckbox-${checkboxNumber}" disabled />`,
    tableId: "table",
    tbodyID: "tbody",
    checkboxPrefix: "readLibraryCheckbox-"
}

class Book {
    constructor(id, title, author, read) {
        this.id = id,
            this.title = title,
            this.author = author,
            this.read = read
    }
}
class Library {
    constructor(bookCount, books) {
        this.bookCount = bookCount,
            this.books = books
    }
    // checkbox will be either true or false. The checkbox can be turned
    // checked or unchecked if the id matches
    markRead(checkbox, id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id == id) {
                let checkboxElement = document.getElementById(`${checkboxPrefix}${i}`);
                checkboxElement.checked = checkbox;
            }
        }
    }

    // Add a book to the library
    addBook(id, title, author, read) {
        let book = new Book(id, title, author, read);
        console.log(`Book Title:${book.title}\nBook Author:${book.author}\nBook Read:${book.read}`);
        // Increment the book count and add book to the library of books
        library.bookCount += 1;
        library.books.push(book);
        let table = document.getElementById(scriptConstants.tbodyID);
        let row = table.insertRow();
        let cellId = row.insertCell();
        let cellTitle = row.insertCell();
        let cellAuthor = row.insertCell();
        let cellRead = row.insertCell();
        cellId.innerText = book.id;
        cellTitle.innerText = book.title;
        cellAuthor.innerText = book.author;
        checkboxNumber = this.books.length;
        cellRead.innerHTML = scriptConstants.inputElement;
    }
}

// Construct an empty library with no books
let library = new Library(0, []);
library.addBook(8009, "Gulivers Travels", "Clemens", false);
library.markRead(false, 8009);
console.log(`Library Book Count = ${library.bookCount}\nLibrary Books Array Length = ${library.books.length}`);

function validateForm() {
    alert("here");
}
