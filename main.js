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
 
        const books = Store.getBooks();
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

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Make alert go away
        setTimeout(()=>
            document.querySelector('.alert').remove(),
        2000);

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
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books =[]
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books
  }
  
 static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book, index) =>{
        if(book.isbn === isbn){
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Event to Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event to Add a Book
document.getElementById('book-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    // Get Form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

// Validate Input
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all required fields', 'danger');
    }else{
         // instatiate Book
    const book = new Book(title, author, isbn);
   
    // Add Book To UI
    UI.addBookToLIst(book);

    // Add book to store(localStorage)
        Store.addBook(book);

        //Book added alert 
    UI.showAlert('Book Added', 'success');

    // Method to clear input fields after submission
    UI.clearFields();
    }



});
// Event to Remove a Book
document.getElementById('book-list').addEventListener('click', (e) =>{
    // Delete book from UI
    UI.deleteBook(e.target);

    // Delete book from store(localStorage)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // Book deleted alert
    UI.showAlert('Book Deleted', 'danger')
})