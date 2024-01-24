// Get the modal element by its ID
var taskFormModal = document.getElementById("taskFormModal");

// Get the button that opens the modal
var btn = document.getElementById("createTaskButton");

// When the user clicks the button, open the modal
btn.onclick = function() {
 taskFormModal.style.display = "block";
}

// When the user clicks on the modal, close it
window.onclick = function(event) {
 if (event.target == taskFormModal) {
    taskFormModal.style.display = "none";
 }
}