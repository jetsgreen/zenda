// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3456789'
            },
            {
                title: 'Book Two',
                author: 'Jand Doe',
                isbn: '3454321'
            }
        ];
        const books = StoredBooks;
        // Loop through the books
        books.forEach((book) => UI.addBookToLIst(book));
    }
    static addBookToLIst(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="btn btn-danger btn-sm 
                        delete">X</a></td>`;
        list.appendChild(row);
    }

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    static deleteBook(el){
     
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

}

// Store Class: Handles Storage

// Event to Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event to Add a Book
document.getElementById('book-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    // Get Form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instatiate Book
    const book = new Book(title, author, isbn);
    
    // Add Book To UI
    UI.addBookToLIst(book);

    // Method to clear input fields after submission
    UI.clearFields();

});
// Event to Remove a Book
document.getElementById('book-list').addEventListener('click', (e) =>{
    UI.deleteBook(e.target);
})