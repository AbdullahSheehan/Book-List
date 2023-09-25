// Adding Event Listeners
document.getElementById("form").addEventListener("submit", addBook);
document.getElementById("tableBody").addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", getBook);

// Class Book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	constructor() {}
	static showAlert(idName) {
		document.getElementById(`${idName}`).style.display = "block";
		setTimeout(() => {
			document.getElementById(`${idName}`).style.display = "none";
		}, 3000);
	}
	static clearFields() {
		document.getElementById("title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("isbn").value = "";
	}
	static addToList(book) {
		let newRow = document.createElement("tr");
		newRow.innerHTML += `
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td closeBtn="deleteBook">X</td>
                            `;
		document.getElementById("tableBody").appendChild(newRow);
	}
	static removeFromList(element) {
		element.parentElement.remove();
	}
}

class LocalStorage {
	static getFromLS() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}
	static addtoLS(book) {
		let books = LocalStorage.getFromLS();
		books.push(book);
		localStorage.setItem("books", JSON.stringify(books));
	}
	static removeFromLS(isbn) {
		let books = LocalStorage.getFromLS();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(books));
	}
	static displayBooks() {
		let books = LocalStorage.getFromLS();
		books.forEach((book) => {
			UI.addToList(book);
		});
	}
}
// Add Book
function addBook(e) {
	e.preventDefault();
	let bookTitle = document.getElementById("title").value;
	let bookAuthor = document.getElementById("author").value;
	let bookIsbn = document.getElementById("isbn").value;
	if (bookTitle == "" || bookAuthor == "" || bookIsbn == "") {
		UI.showAlert("error");
	} else {
		const newBook = new Book(bookTitle, bookAuthor, bookIsbn);
		UI.addToList(newBook);
		UI.showAlert("addsuccess");
		UI.clearFields();
		LocalStorage.addtoLS(newBook);
	}
}

// Remove Book
function removeBook(e) {
	e.preventDefault();
	if (e.target.hasAttribute("closeBtn")) {
		UI.removeFromList(e.target);
		UI.showAlert("removesuccess");
		LocalStorage.removeFromLS(e.target.previousElementSibling.innerText);
	}
}

// Get Book
function getBook() {
	LocalStorage.displayBooks();
}
