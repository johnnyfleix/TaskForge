function createTask() {
 // Get the form inputs
 var title = document.getElementById("title").value;
 var priority = document.getElementById("priority").value;
 var dueDate = document.getElementById("dueDate").value;

 // Create a new list item for the task
 var li = document.createElement("li");
 li.textContent = title + " - Priority: " + priority + " - Due Date: " + dueDate;

 // Append the new list item to the unordered list
 document.getElementById("tasks").appendChild(li);

 // Close the modal
 taskFormModal.style.display = "none";
}