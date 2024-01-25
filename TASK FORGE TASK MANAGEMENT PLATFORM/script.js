// JavaScript File (script.js)
document.addEventListener('DOMContentLoaded', function () {
    // Get the form and task list elements
    const taskForm = document.getElementById('taskForm');
    const taskList = document.createElement('section'); // Create a section for displaying tasks
    document.body.appendChild(taskList); // Append the task list section to the body
    
    // Add an event listener to the form for submission
    taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

     // Set the background color of the taskList section
     taskList.style.backgroundColor = '#3498db';
     taskList.style.color = '#010001';
    
    // Get the values from the form inputs
    const taskDescription = document.getElementById('taskDescription').value;
    const importanceLevel = document.getElementById('importanceLevel').value;
    const deadline = document.getElementById('deadline').value;
    
    // Create a task item element
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.innerHTML = `
    <p style="margin-bottom: 8px;" >Task: ${taskDescription}</p>
    <p style="margin-bottom: 8px;">Importance: ${importanceLevel}</p>
    <p style="margin-bottom: 8px;">Deadline: ${deadline}</p>
    `;
    
    // Add the task item to the task list
    taskList.appendChild(taskItem);
    
    // Clear the form
    taskForm.reset();
    });
    });
    
    
