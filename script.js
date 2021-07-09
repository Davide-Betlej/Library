const addButton = document.querySelector('input.addBook');
const bookContainer = document.querySelector('.book-container');
const readFormButton = document.querySelector('input.isReadButton');
let readButton = document.querySelector('button.readButton');
addButton.addEventListener('click', addBookToLibrary);
readFormButton.addEventListener('click', toggle);


let newBook
let myLibrary = [];

function toggle() {
    if (this.value == 'Read') {
        this.value = 'Not Read'
        this.style.backgroundColor = '#FF0000'
        console.log(this.value)
    } else {
        this.value = 'Read'
        this.style.backgroundColor = '#32CD32'
        console.log(this.value)
    }
}

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages + " pages"
    this.isRead = isRead
}

function addBookToLibrary() {
    titleValue = document.getElementById("form-input").elements[0].value;
    authorValue = document.getElementById("form-input").elements[1].value;
    pageValue = parseInt(document.getElementById("form-input").elements[2].value);
    readValue = document.getElementById('form-input').elements[3].value;
    newBook = new Book(titleValue, authorValue, pageValue, readValue)
    if (!Number.isInteger(pageValue)) {
        alert("Enter a proper number of pages!")
        return
    } else {
        myLibrary.push(newBook);
        saveData()
        render();
        document.dupa.reset();
    }
}

function render() {
    const books = document.querySelectorAll('.book')
    books.forEach(book => bookContainer.removeChild(book));
    for (let i = 0; i < myLibrary.length; i++) {
        displayBooks(myLibrary[i]);
    }
}

function displayBooks(item) {
    const newBookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    newBookDiv.classList.add('book');
    newBookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    newBookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    newBookDiv.appendChild(authorDiv);

    pagesDiv.textContent = item.pages;
    pagesDiv.classList.add('pages');
    newBookDiv.appendChild(pagesDiv);

    readButton.classList = 'readButton'
    newBookDiv.appendChild(readButton)

    if (item.isRead === 'Read') {
        readButton.textContent = 'Read';
        readButton.style.backgroundColor = '#63da63';
    } else {
        readButton.textContent = 'Not Read';
        readButton.style.backgroundColor = '#e04f63'
    }

    readButton.addEventListener('click', () => {
        if (item.isRead == "Read") {
            item.isRead = "Not Read"
        } else {
            item.isRead = "Read"
        }
        saveData()
        render();
    });

    removeButton.textContent = 'Remove';
    removeButton.setAttribute('id', 'removeButton');
    newBookDiv.appendChild(removeButton);

    bookContainer.appendChild(newBookDiv)

    removeButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        saveData()
        render();
    });
}

function saveData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if (!localStorage.myLibrary) {
        render();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();