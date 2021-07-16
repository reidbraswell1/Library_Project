console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

let checkboxNumber = 0;

const scriptConstants = { 
    inputElement:`<input type="checkbox" name="read" id="readLibraryCheckbox${checkboxNumber}" checked disabled />`
}

class Book {
    constructor(title, author, read) {
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
    mark(checkbox, id) {

    }
    addBook(title, author, read) {
        let book = new Book(title, author, read);
        console.log(`Book Title:${book.title}\nBook Author:${book.author}\nBook Read:${book.read}`);
        // Increment the book count and add book to the library of books
        library.bookCount += 1;
        library.books.push(book);
        let table = document.getElementById("table");
        let row = table.insertRow();
        let cellTitle = row.insertCell();
        let cellAuthor = row.insertCell();
        let cellRead = row.insertCell();
        cellTitle.innerText = book.title;
        cellAuthor.innerText = book.author;
        cellRead.innerHTML = scriptConstants.inputElement;
    }
}

// Construct an empty library with no books
let library = new Library(0, []);
library.addBook("Gulivers Travels", "Clemens", false);
console.log(`Library Book Count = ${library.bookCount}\nLibrary Books Array Length = ${library.books.length}`);
