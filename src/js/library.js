const library = [];

const table = document.querySelector("tbody");

function Book(author, title, totalPages, read) {
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.read = read;
}

function addBook(author, title, totalPages, read) {
  library.push(new Book(author, title, totalPages, read));
}

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const bookTemplate = document.querySelector("#book");
    const bookTemplateClone = bookTemplate.content.cloneNode(true);

    const td = bookTemplateClone.querySelectorAll("td");
    td[0].textContent = library[i].author;
    td[1].textContent = library[i].title;
    td[2].textContent = library[i].totalPages;
    bookTemplateClone.firstElementChild.id = library[i].id;

    const button = bookTemplateClone.querySelector("button");
    if (library[i].read) {
      button.classList.add(
        "border-green-700",
        "text-green-700",
        "hover:bg-green-50",
        "active:bg-green-100"
      );

      button.textContent = "Read";
    } else {
      button.classList.add(
        "border-red-700",
        "text-red-700",
        "hover:bg-red-50",
        "active:bg-red-100"
      );

      button.textContent = "Not Read";
    }

    table.appendChild(bookTemplateClone);
  }

  table.lastElementChild.classList.remove("border-b");
}

function updateButtonStatus(button) {
  if (button.textContent === "Read") {
    button.classList.remove(
      "border-green-700",
      "text-green-700",
      "hover:bg-green-50",
      "active:bg-green-100"
    );

    button.classList.add(
      "border-red-700",
      "text-red-700",
      "hover:bg-red-50",
      "active:bg-red-100"
    );

    button.textContent = "Not Read";
  } else {
    button.classList.remove(
      "border-red-700",
      "text-red-700",
      "hover:bg-red-50",
      "active:bg-red-100"
    );

    button.classList.add(
      "border-green-700",
      "text-green-700",
      "hover:bg-green-50",
      "active:bg-green-100"
    );

    button.textContent = "Read";
  }
}

function updateReadStatus(tableRow) {
  const book = library.find((book) => book.id === parseInt(tableRow.id));
  book.read = book.read ? false : true;
}

function addIdToBooks() {
  const bookRow = document.querySelectorAll(".book-row");

  library.forEach((book, i) => {
    book.id = i + 1;
  });

  bookRow.forEach((e, i) => {
    e.id = i + 1;
  });
}

function updateLibraryInfo() {
  const currentBooks = document.querySelector(".current-books");
  const readBooks = document.querySelector(".read-books");
  const totalReadPages = document.querySelector(".total-pages-read");

  currentBooks.textContent = library.length;

  let booksRead = 0,
    totalPages = 0;
  for (let i = 0; i < library.length; i++) {
    if (library[i].read) {
      booksRead++;
      totalPages += library[i].totalPages;
    }
  }

  readBooks.textContent = booksRead;
  totalReadPages.textContent = totalPages;
}

function handleModal() {
  const button = document.querySelector(".new-book-btn");
  const closemodal = document.querySelectorAll(".modal-close");
  const overlay = document.querySelector(".modal-overlay");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
  });

  closemodal.forEach((e) => {
    e.addEventListener("click", () => {
      toggleModal();
    });
  });

  overlay.addEventListener("click", toggleModal);
}

function toggleModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");

  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}

// Should come from db ideally.
addBook("Peter Jan", "Het goede leven", 118, true);
addBook("Hennie", "Het leven", 1138, true);
addBook("Joost", "goede leven", 354, false);

addIdToBooks();
displayBooks();
updateLibraryInfo();

document.querySelectorAll(".read-button").forEach((e) => {
  e.addEventListener("click", (clickedReadButton) => {
    updateButtonStatus(clickedReadButton.target);
    updateReadStatus(clickedReadButton.target.parentNode.parentNode);
    updateLibraryInfo();
  });
});

document.querySelectorAll(".remove-book").forEach((e) => {
  e.addEventListener("click", (clickedRemoveButton) => {
    clickedRemoveButton.target.parentNode.parentNode.remove();
    table.lastElementChild.classList.remove("border-b");
    library.splice(clickedRemoveButton.target.parentNode.parentNode.id - 1, 1);
    updateLibraryInfo();
    addIdToBooks();
  });
});

handleModal();
