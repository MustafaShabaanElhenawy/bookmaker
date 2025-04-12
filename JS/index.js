let bookmarks = [];

// Load from localStorage
window.onload = function () {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
  }
};

// Validate name
function validateName() {
  const nameRegex = /^[A-Z][a-z]{3,}$/;
  const nameInput = document.getElementById("bookmarkName");

  if (nameRegex.test(nameInput.value.trim())) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    return false;
  }
}

// Validate URL
function validateURL() {
  const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/;
  const urlInput = document.getElementById("bookmarkURL");

  if (urlRegex.test(urlInput.value.trim())) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
    return true;
  } else {
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
    return false;
  }
}

// Add bookmark
function addBookmark() {
  const nameInput = document.getElementById("bookmarkName");
  const urlInput = document.getElementById("bookmarkURL");

  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (!name || !url) {
    alert("Please fill in both fields.");
    return;
  }

  if (!validateName()) {
    alert("Site name must start with a capital letter and be at least 4 characters.");
    return;
  }

  if (!validateURL()) {
    alert("Please enter a valid URL.");
    return;
  }

  bookmarks.push({ name, url });
  saveToLocalStorage();
  displayBookmarks();
  clearForm();
}

// Display bookmarks
function displayBookmarks() {
  let tableContent = "";
  for (let i = 0; i < bookmarks.length; i++) {
    tableContent += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td><a href="${bookmarks[i].url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = tableContent;
}

// Delete bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  saveToLocalStorage();
  displayBookmarks();
}

// Clear form inputs and classes
function clearForm() {
  const nameInput = document.getElementById("bookmarkName");
  const urlInput = document.getElementById("bookmarkURL");

  nameInput.value = "";
  urlInput.value = "";

  nameInput.classList.remove("is-valid", "is-invalid");
  urlInput.classList.remove("is-valid", "is-invalid");
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}