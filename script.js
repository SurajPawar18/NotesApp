const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelector(".input-box");

// Function to display notes from local storage when the page loads
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// Function to update local storage with current notes content
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for the "Create Note" button
createBtn.addEventListener("click", () => {
    // Create a new editable paragraph and delete image
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

// Event listener for clicks on the notes container
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        // If delete image is clicked, remove the parent paragraph and update storage
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        // If a paragraph is clicked, add a keyup event listener to update storage on text changes
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        });
    }
})

// Event listener to insert a line break on pressing the Enter key
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
