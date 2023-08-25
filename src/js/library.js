const library = [];

const table = document.querySelector("tbody");
const form = document.querySelector("form");

function Book(author, title, totalPages, read) {
  this.author = author;
  this.title = title;
  this.totalPages = totalPages;
  this.read = read;
}

function addBook(author, title, totalPages, read) {
  library.push(new Book(author, title, totalPages, read));
}

function displayAllBooks() {
  for (let i = 0; i < library.length; i++) {
    displayBook(library[i]);
  }

  handleReadButton(document.querySelectorAll(".read-button"));
  handleRemoveButton(document.querySelectorAll(".remove-book"));

  table.lastElementChild.classList.remove("border-b");
}

function displayBook(book) {
  const bookTemplate = document.querySelector("#book");
  const bookTemplateClone = bookTemplate.content.cloneNode(true);

  const td = bookTemplateClone.querySelectorAll("td");
  td[0].textContent = book.author;
  td[1].textContent = book.title;
  td[2].textContent = book.totalPages;
  bookTemplateClone.firstElementChild.id = book.id;

  const button = bookTemplateClone.querySelector("button");
  if (book.read) {
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
    form.reset();
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

function handleNewBookButton() {
  const authorInput = document.querySelector("#author");
  const titleInput = document.querySelector("#title");
  const pagesInput = document.querySelector("#pages");
  const readCheckbox = document.querySelector("#read");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookToBeAdded = {
      author: authorInput.value,
      title: titleInput.value,
      pages: parseInt(pagesInput.value),
      hasRead: readCheckbox.checked,
    };

    const isValid = validateNewBook(bookToBeAdded);

    if (isValid === true) {
      addBook(
        bookToBeAdded.author,
        bookToBeAdded.title,
        bookToBeAdded.pages,
        bookToBeAdded.hasRead
      );

      addIdToBooks();
      updateLibraryInfo();
      table.lastElementChild.classList.add("border-b");
      displayBook(library[library.length - 1]);

      const readButton = document.querySelectorAll(".read-button");
      const removeButton = document.querySelectorAll(".remove-book");

      handleReadButton([readButton[readButton.length - 1]]);
      handleRemoveButton([removeButton[removeButton.length - 1]]);

      toggleModal();
    } else {
      const authorLabel = document.querySelector(".author-label");
      const titleLabel = document.querySelector(".title-label");
      const pagesLabel = document.querySelector(".pages-label");
      const authorErrorMessage = document.querySelector(
        ".invalid-author-message"
      );
      const titleErrorMessage = document.querySelector(
        ".invalid-title-message"
      );
      const pagesErrorMessage = document.querySelector(
        ".invalid-pages-message"
      );

      authorInput.classList.remove("bg-red-100", "text-red-900");
      authorLabel.classList.remove("text-red-600");
      authorErrorMessage.classList.add("hidden");
      titleInput.classList.remove("bg-red-100", "text-red-900");
      titleLabel.classList.remove("text-red-600");
      titleErrorMessage.classList.add("hidden");
      pagesInput.classList.remove("bg-red-100", "text-red-900");
      pagesLabel.classList.remove("text-red-600");
      pagesErrorMessage.classList.add("hidden");

      isValid.forEach((invalidField) => {
        switch (invalidField) {
          case "author":
            authorInput.classList.add("bg-red-100", "text-red-900");
            authorLabel.classList.add("text-red-600");
            authorErrorMessage.classList.remove("hidden");
            break;
          case "title":
            titleInput.classList.add("bg-red-100", "text-red-900");
            titleLabel.classList.add("text-red-600");
            titleErrorMessage.classList.remove("hidden");
            break;
          case "pages":
            pagesInput.classList.add("bg-red-100", "text-red-900");
            pagesLabel.classList.add("text-red-600");
            pagesErrorMessage.classList.remove("hidden");
            break;
        }
      });

      console.log("INVALID", isValid);
    }
  });
}

function validateNewBook(inputFields) {
  const authorRegex = /^[A-Za-z \.]{3,30}$/gm;
  const titleRegex = /^[A-Za-z \.]{3,50}$/gm;

  let invalidFields = [];

  if (!authorRegex.test(inputFields.author)) {
    invalidFields.push("author");
  }

  if (!titleRegex.test(inputFields.title)) {
    invalidFields.push("title");
  }

  if (inputFields.pages <= 0 || inputFields.pages > 21450) {
    invalidFields.push("pages");
  }

  return !invalidFields.length ? true : invalidFields;
}

function handleReadButton(readButtonsArr) {
  readButtonsArr.forEach((readButton) => {
    readButton.addEventListener("click", (clickedReadButton) => {
      updateButtonStatus(clickedReadButton.target);
      updateReadStatus(clickedReadButton.target.parentNode.parentNode);
      updateLibraryInfo();
    });
  });
}

function handleRemoveButton(remveButtonsArr) {
  remveButtonsArr.forEach((removeButton) => {
    removeButton.addEventListener("click", (clickedRemoveButton) => {
      clickedRemoveButton.target.parentNode.parentNode.remove();
      table.lastElementChild.classList.remove("border-b");
      library.splice(
        clickedRemoveButton.target.parentNode.parentNode.id - 1,
        1
      );

      updateLibraryInfo();
      addIdToBooks();
    });
  });
}

// Should come from db ideally.
addBook("Peter Jan", "Het goede leven", 118, true);
addBook("Hennie", "Het leven", 1138, true);
addBook("Joost", "goede leven", 354, false);

addIdToBooks();
displayAllBooks();
updateLibraryInfo();
handleModal();
handleNewBookButton();
