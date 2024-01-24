function filterTasks(filterType) {
 // Get the list of tasks and clear it
 var taskList = document.getElementById("tasks");
 taskList.innerHTML = "";

 // Fetch tasks based on the selected filterType (e.g., all tasks, high priority tasks, due soon tasks)
 // This can be achieved by fetching data from the backend and filtering the tasks based on the selected filterType
 // For now, we'll simply re-add all tasks to the list to demonstrate the filtering functionality
 var tasks = document.getElementsByTagName("li");
 for (var i = 0; i < tasks.length; i++) {
    if (filterType === "all" || filterType === "high" && tasks[i].textContent.includes("High Priority") || filterType === "due" && tasks[i].textContent.includes("Due Soon")) {
      taskList.appendChild(tasks[i]);
    }
 }
}