const library = [];

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
  const table = document.querySelector("tbody");

  for (let i = 0; i < library.length; i++) {
    const bookTemplate = document.querySelector("#book");
    const bookTemplateClone = bookTemplate.content.cloneNode(true);

    const td = bookTemplateClone.querySelectorAll("td");
    td[0].textContent = library[i].author;
    td[1].textContent = library[i].title;
    td[2].textContent = library[i].totalPages;

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
  console.log(tableRow);

  // TODO: Update read status in the library.
}

addBook("Peter Jan", "Het goede leven", 118, false);
addBook("Hennie", "Het leven", 1138, true);
addBook("Joost", "goede leven", 354, false);
displayBooks();

document.querySelectorAll(".read-button").forEach((e) => {
  e.addEventListener("click", (clickedButton) => {
    updateButtonStatus(clickedButton.target);
    updateReadStatus(clickedButton.target.parentNode.parentNode);
  });
});
