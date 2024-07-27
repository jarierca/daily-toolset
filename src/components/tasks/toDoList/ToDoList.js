// src/pages/ToDoList.js
import React, { useEffect } from 'react';
import "./ToDoList.css";

import { MoonIconString } from '../../../assets/icons/svg/MoonIcon';
import { SunIconString } from '../../../assets/icons/svg/SunIcon';

const ToDoList = () => {
  var listsData = JSON.parse(localStorage.getItem("listsData")) || { default: { tasks: [], taskIdCounter: 0 } };
  var currentList = localStorage.getItem("currentList") || "default";
  var loadAll = true;
  let soundEnabled = true;
  const sound = new Audio('/assets/todolist/complete-sound.wav');
  sound.crossOrigin = 'anonymous';
  sound.preload = 'auto'; 

  useEffect(() => {
    init();
  });

  function init() {
    loadLists();
    switchList(currentList);
    loadTheme();
    loadFormVisibility();
    loadTasks();
    loadFilter();
    loadSound();
  }

  function addTask() {
    var titleInput = document.getElementById("titleInput");
    var descriptionInput = document.getElementById("descriptionInput");
    var dueDateInput = document.getElementById("dueDateInput");
    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];

    if (titleInput.value !== "") {
      var task = {
        id: listsData[currentList].taskIdCounter++,
        title: titleInput.value,
        description: descriptionInput.value,
        dueDate: dueDateInput.value,
        completed: false,
        subtasks: [],
        subtaskIdCounter: 0,
        showSubtasks: false
      };

      listsData[currentList].tasks.push(task);

      saveListsData();

      var row = createTaskRow(task);
      taskTable.appendChild(row);

      titleInput.value = "";
      descriptionInput.value = "";
      dueDateInput.value = "";

      phoneModeVisibility('addTask');

      document.getElementById("countTasks").textContent = "("+taskCount()+")";

    } else {
      alert("Please enter a title for the task!");
    }
  }

  function createTaskRow(task) {
    var row = document.createElement("tr");
    row.classList.add('tr-task');
    row.dataset.id = task.id;
    row.dataset.list = currentList;
    
    var subtasks = task.subtasks;
    var showSubtasks = task.showSubtasks;

    var showCell = document.createElement("td");

    if(subtasks.length > 0){
      var toggleButtona = document.createElement("a");
      toggleButtona.classList.add("a-btn");
      toggleButtona.classList.add("toggle-hide");
     
      if(showSubtasks){
        toggleButtona.textContent = "▲";
      }else {
        toggleButtona.textContent = "▼";
      }

      toggleButtona.addEventListener("click", function() {
        toggleSubtasksVisibility(row);
      });
      showCell.appendChild(toggleButtona);

    } else{
      var toggleButton = document.createElement("span");
      toggleButton.classList.add("a-btn");
      toggleButton.classList.add("toggle-hide-none");
     
      toggleButton.textContent = "–";
      showCell.appendChild(toggleButton);
    }

    row.appendChild(showCell); 

    var checkCell = document.createElement("td");
    checkCell.classList.add("cursor");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.title = "Toggle Completed";
    checkbox.classList.add("a-btn");
    checkbox.checked = task.completed;
    checkbox.onchange = function() {
      toggleCompleted(task,this);
    };
    checkCell.appendChild(checkbox);

    row.appendChild(checkCell);

    var titleCell = document.createElement("td");
    titleCell.classList.add('task-title');

    var title = document.createElement("span");
    title.textContent = task.title;
    titleCell.appendChild(title);

    row.appendChild(titleCell);    

    var descriptionCell = document.createElement("td");
    descriptionCell.classList.add('task-description');
    descriptionCell.innerHTML = urlTranform(task.description);
    row.appendChild(descriptionCell);

    var dueDateCell = document.createElement("td");
    dueDateCell.textContent = task.dueDate;
    row.appendChild(dueDateCell);

    var actionsCell = document.createElement("td");
    actionsCell.classList.add('task-actions');

    var editButton = document.createElement("a");
    editButton.textContent = "📝";
    editButton.classList.add("a-action");
    editButton.title = "Edit Task";
    editButton.style.paddingRight = "5px";
    editButton.onclick = function() {
      editTask(row);
    };
    actionsCell.appendChild(editButton);
    
    var deleteButton = document.createElement("a");
    deleteButton.textContent = "🗑️";
    deleteButton.classList.add("a-action");
    deleteButton.title = "Clear task";
    deleteButton.style.paddingRight = "5px";
    deleteButton.onclick = function() {
      deleteTask(row);
    };
    actionsCell.appendChild(deleteButton);

    var addSubtaskButton = document.createElement("a");
    addSubtaskButton.textContent = "+";
    addSubtaskButton.classList.add("a-subtask")
    addSubtaskButton.classList.add("a-action");
    addSubtaskButton.title = "Add subtask";
    addSubtaskButton.onclick = function() {
      addSubtask(row);
    };
    actionsCell.appendChild(addSubtaskButton);

    row.appendChild(actionsCell);

    if (task.completed) {
      row.classList.add("completed");
    }

    return row;
  }

  function urlTranform(description) {
    return description ? description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>') : "";
  }

  function editTask(row) {
    var taskId = parseInt(row.dataset.id);
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      var task = listsData[currentList].tasks[taskIndex];

      document.getElementById("editTaskTitle").value = task.title;
      document.getElementById("editTaskDescription").value = task.description;
      document.getElementById("editTaskDueDate").value = task.dueDate;
      document.getElementById("saveEditButton").dataset.id = taskId;

      document.getElementById("editModal").style.display = "flex";
    }
  }

  function updateTask() {
    var taskId = parseInt(document.getElementById("saveEditButton").dataset.id);
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      var editTaskTitle = document.getElementById("editTaskTitle").value;
      var editTaskDescription = document.getElementById("editTaskDescription").value;
      var editTaskDueDate = document.getElementById("editTaskDueDate").value;

      var subtasksContainer = document.querySelector('tr[data-id="' + taskId + '"] .subtask-list tbody');
      var subtasks = [];
      if (subtasksContainer) {
        subtasksContainer.querySelectorAll('tr').forEach(function(subtaskRow) {
          subtasks.push({
            title: subtaskRow.cells[3].querySelector('span').textContent ,
            completed: subtaskRow.cells[2].querySelector('input[type="checkbox"]').checked
          });
        });
      }

      var updatedTask = {
        id: taskId,
        title: editTaskTitle,
        description: editTaskDescription,
        dueDate: editTaskDueDate,
        completed: listsData[currentList].tasks[taskIndex].completed,
        subtasks: subtasks,
        subtaskIdCounter: listsData[currentList].tasks[taskIndex].subtaskIdCounter,
        showSubtasks: listsData[currentList].tasks[taskIndex].showSubtasks
      };

      listsData[currentList].tasks[taskIndex] = updatedTask;

      saveListsData();
      loadFilter();
      //loadTasks();
    }

    closeModal();
  }

  function closeModal() {
    document.getElementById("editModal").style.display = "none";
    
    document.getElementById("editTaskTitle").value = "";
    document.getElementById("editTaskDescription").value = "";
    document.getElementById("editTaskDueDate").value = "";
    document.getElementById("saveEditButton").dataset.id = "";
  }

  function deleteTask(row) {
    var confirmation = window.confirm("Are you sure you want to remove this task?");
    if (confirmation) {
      var taskId = parseInt(row.dataset.id);
      var currentListData = listsData[currentList];
      
      currentListData.tasks = currentListData.tasks.filter(function(task) {
        return task.id !== taskId;
      });

      saveListsData();
      
      loadFilter();

      document.getElementById("countTasks").textContent = "("+taskCount()+")";
    }
  }


  function toggleCompleted(task, checkbox) {
    var row = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
      row.classList.add("completed");
      
      if(soundEnabled){
        sound.currentTime = 0;
        sound.play();
      }
    } else {
      row.classList.remove("completed");
    }

    var taskId = row.dataset.id;
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id == taskId;
    });

    if (taskIndex !== -1) {
      listsData[currentList].tasks[taskIndex].completed = row.classList.contains("completed");
      saveListsData();
    }
    loadFilter();
  }

  function loadTasks() {
    clearTable();
    if (!listsData[currentList]) {
      listsData[currentList] = { tasks: [], taskIdCounter: 0 };
    }
    var tasks = listsData[currentList].tasks;
    var taskTable = document.getElementById("taskTable").getElementsByTagName('tbody')[0];

    tasks.forEach(function(task) {
      var row = createTaskRow(task);
      taskTable.appendChild(row);

      loadSubtasks(task);
    });
  }


  function switchList(listName) {
    currentList = listName;
    localStorage.setItem("currentList", currentList);
    clearTable();

    document.getElementById("countTasks").textContent = "("+taskCount()+")";
    document.getElementById("listNameLink").textContent = currentList;
    document.getElementById("listNameLink").title = currentList;
    loadTasks();
  }

  function loadLists() {
    var listSelector = document.getElementById("listOptions");
    listSelector.innerHTML = "";

    Object.keys(listsData).forEach(function(listName) {
      var span = document.createElement("span");
      span.value = listName;
      span.classList.add("a-btn");
      span.textContent = listName;
      span.onclick = function() {
        switchList(listName);
      };

      listSelector.appendChild(span);
    });
  }

  function createList() {
    var newListName = document.getElementById('newListInput')
    if (newListName.value.trim() === "") {
      alert("Please enter a name for the new list!");
      return;
    }

    if (listsData[newListName.value]) {
      alert("List already exists!");
      return;
    }

    listsData[newListName.value] = { tasks: [], taskIdCounter: 0 };

    saveListsData();

    loadLists();
    switchList(newListName.value);
    newListName.value = "";

    phoneModeVisibility('addList');
  }

  function editListName() {
    var newName = prompt("Enter the new name for the current list:", currentList);
    if (newName && newName.trim() !== "") {
      var oldListName = currentList;
      currentList = newName.trim();
      localStorage.setItem("currentList", currentList);
      document.getElementById("listNameLink").textContent = currentList;
      if (listsData.hasOwnProperty(oldListName)) {
        listsData[newName] = listsData[oldListName];
        delete listsData[oldListName];
        saveListsData();
        loadLists();
        window.location.reload();
      }
    }
  }

  function loadTheme() {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === null) {
      document.body.classList.add("dark-mode");
      document.querySelectorAll('.theme-toggle').forEach(element => element.innerHtml = MoonIconString);
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelectorAll('.theme-toggle').forEach(element => element.innerHtml = SunIconString);
    }
  }

  function toggleSettings() {
    var settingsMenu = document.getElementById("settingsMenu");
    settingsMenu.classList.toggle("show");
  }

  function hideSettings() {
      var settingsMenu = document.getElementById("settingsMenu");
      settingsMenu.classList.remove("show");
  }

  function clearTable() {
    var tableBody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
  }

  function applyFilter() {
    var listTasks = listsData[currentList].tasks;

    var completed = document.getElementById("filterCompleted").checked;
    var incomplete = document.getElementById("filterIncomplete").checked;
    var filterDate = document.getElementById("filterDate").value;
    var startDate = document.getElementById("filterStartDate").value;
    var endDate = document.getElementById("filterEndDate").value;
    var filterTitle = document.getElementById("filterTitle").value.toLowerCase();
    var filterDescription = document.getElementById("filterDescription").value.toLowerCase();

    var filteredTasks = listTasks.filter(function(task) {

      if (completed && !task.completed) {
        return false;
      }

      if (incomplete && task.completed) {
        return false;
      }

      if (filterDate && task.dueDate !== filterDate) {
        return false;
      }

      if (startDate && endDate) {
        if (task.dueDate < startDate || task.dueDate > endDate) {
            return false;
        }
      } else if (startDate) {
        if (task.dueDate < startDate) {
            return false;
        }
      } else if (endDate) {
        if (task.dueDate > endDate) {
            return false;
        }
      }

      if (filterTitle && !task.title.toLowerCase().includes(filterTitle)) {
        return false;
      }

      if (filterDescription && !task.description.toLowerCase().includes(filterDescription)) {
        return false;
      }

      return true;
    });

    var taskTableBody = document.getElementById("taskList");
    taskTableBody.innerHTML = "";

    filteredTasks.forEach(function(task) {
      var row = createTaskRow(task);
      taskTableBody.appendChild(row);

      if (task.subtasks && task.subtasks.length > 0) {
         loadSubtasks(task);
      }
    });
  }

  function resetFilter() {

    document.getElementById("filterCompleted").checked = false;
    document.getElementById("filterIncomplete").checked = false;
    document.getElementById("filterAll").checked = true;
    document.getElementById("filterDate").value = "";
    document.getElementById("filterStartDate").value = "";
    document.getElementById("filterEndDate").value = "";
    document.getElementById("filterTitle").value = "";
    document.getElementById("filterDescription").value = "";

    loadTasks();
  }

  function toggleFilter() {
    var filterOptions = document.getElementById("filterOptions");
    var toggleFilterButton = document.getElementById("toggleFilterButton");

    if (filterOptions.style.display === "none" || filterOptions.style.display === "") {
      filterOptions.style.display = "block";
      toggleFilterButton.textContent = "▲";
      toggleFilterButton.title = "Close Filter";
    } else {
      filterOptions.style.display = "none";
      toggleFilterButton.textContent = "▼";
      toggleFilterButton.title = "Open Filter";
    }
    saveFilterOpen(filterOptions.style.display === "block");
  }

  function saveFilterOpen(isFilterOpen) {
    localStorage.setItem("filter", isFilterOpen ? "openned" : "closed");
  }

  function loadOpenFilter() {
    var filterOptions = document.getElementById("filterOptions");
    var toggleFilterButton = document.getElementById("toggleFilterButton");
    var isOpen = localStorage.getItem("filter");

      if (isOpen === "openned") {
      filterOptions.style.display = "block";
      toggleFilterButton.textContent = "▲";
        toggleFilterButton.title = "Close Filter";
    } else {
      filterOptions.style.display = "none";
      toggleFilterButton.textContent = "▼";
      toggleFilterButton.title = "Open Filter";
    }
  }

  function saveFilterValues() {
    var filterValues = {
        all: document.getElementById("filterAll").checked,
        completed: document.getElementById("filterCompleted").checked,
        incomplete: document.getElementById("filterIncomplete").checked,
        date: document.getElementById("filterDate").value,
        startDate: document.getElementById("filterStartDate").value,
        endDate: document.getElementById("filterEndDate").value,
        title: document.getElementById("filterTitle").value,
        description: document.getElementById("filterDescription").value
    };
    listsData[currentList].filterValues = filterValues;
    saveListsData();
  }

  function clearFilterValues() {
    resetFilter();

    saveFilterValues();
  }


  function loadFilter() {
    loadOpenFilter();

    var filterValues = listsData[currentList].filterValues || {};

    var all = document.getElementById("filterAll").checked;
    var completed = document.getElementById("filterCompleted").checked;
    var incomplete = document.getElementById("filterIncomplete").checked;
    var filterDate = document.getElementById("filterDate").value;
    var startDate = document.getElementById("filterStartDate").value;
    var endDate = document.getElementById("filterEndDate").value;
    var filterTitle = document.getElementById("filterTitle").value.toLowerCase();
    var filterDescription = document.getElementById("filterDescription").value.toLowerCase();

    var anyFilterFilled = !all || completed || incomplete || filterDate || startDate || endDate || filterTitle || filterDescription;

    if (anyFilterFilled && Object.keys(filterValues).length == 0) {
      filterValues = {
        all: all,
        completed: completed,
        incomplete: incomplete,
        date: filterDate,
        startDate: startDate,
        endDate: endDate,
        title: filterTitle,
        description: filterDescription
      };
    }

    if(Object.keys(filterValues).length !== 0){
      document.getElementById("filterAll").checked = filterValues.all || false;
      document.getElementById("filterCompleted").checked = filterValues.completed || false;
      document.getElementById("filterIncomplete").checked = filterValues.incomplete || false;
      document.getElementById("filterDate").value = filterValues.date || "";
      document.getElementById("filterStartDate").value = filterValues.startDate || "";
      document.getElementById("filterEndDate").value = filterValues.endDate || "";
      document.getElementById("filterTitle").value = filterValues.title || "";
      document.getElementById("filterDescription").value = filterValues.description || "";

      applyFilter()

    } else{
      resetFilter();
    }
  }

  function clearCurrentListTasks() {
    var confirmation = window.confirm("Are you sure you want to delete all tasks from the current list?");
    if (confirmation && listsData[currentList]) {
      listsData[currentList].tasks = [];
      delete listsData[currentList];
   
      saveListsData();
      var remainingLists = Object.keys(listsData);
      if (remainingLists.length > 0) {
        currentList = remainingLists[0];
        localStorage.setItem("currentList", currentList);
      } else {
        localStorage.removeItem("currentList");
      }
      
      loadLists();
      switchList(currentList);    
      loadTasks();
    }
  }

  function clearAllTasks() {
    var confirmation = window.confirm("Are you sure you want to delete all?");
    if (confirmation) {
      listsData = {};

      localStorage.removeItem("listsData");
      localStorage.removeItem("taskIdCounter");
      localStorage.removeItem("currentList");

      var taskTableBody = document.getElementById("taskList");
      taskTableBody.innerHTML = "";

      window.location.reload();
    }
  }

  function exportTasks() {
    var dataToExport = JSON.stringify(listsData);
    
    if (dataToExport) {
      var blob = new Blob([dataToExport], { type: "application/json" });
      
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `toDo_list_${(new Date().toJSON().slice(0,10))}.json`;
      
      link.click();
    } else {
      alert("No lists to export.");
    }
  }

  function importTasks() {
    var input = document.createElement("input");
    input.type = "file";
    
    input.onchange = function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      
      reader.onload = function(event) {
        var content = event.target.result;
        
        try {
          var importedData = JSON.parse(content);
        
          for (var listName in importedData) {
            if (importedData.hasOwnProperty(listName)) {
              if (!listsData.hasOwnProperty(listName)) {
                listsData[listName] = importedData[listName];
              } else {
                importedData[listName].tasks.forEach(function(importedTask) {
                  var existingList = listsData[listName];
                  var existingTask = existingList.tasks.find(function(task) {
                    return task.title === importedTask.title;
                  });
                  if (!existingTask) {
                    var currentTaskId = existingList.taskIdCounter;
                    existingList.taskIdCounter = currentTaskId + 1;
                    importedTask.id = currentTaskId;
                    existingList.tasks.push(importedTask);
                  } else {
                    importedTask.subtasks.forEach(function(importedSubtask) {
                      if (!existingTask.subtasks.find(function(subtask) {
                        return subtask.title === importedSubtask.title;
                      })) {
                        var currentSubtaskId = existingTask.subtaskIdCounter;
                        existingTask.subtaskIdCounter = currentSubtaskId + 1;
                        importedSubtask.id = currentSubtaskId;
                        existingTask.subtasks.push(importedSubtask);
                      }
                    });
                  }
                });
              }
            }
          }
          
          alert("Successful import");        
          
          saveListsData();

          loadLists();
          loadTasks();
        } catch (error) {
          alert("Error importing tasks: Invalid JSON format.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
    toggleSettings();
  }

  function saveListsData() {
    localStorage.setItem("listsData", JSON.stringify(listsData));
  }

  function sortTasksByDate() {
    var header = document.getElementById("dueDateHeader");
    var currentOrder = header.dataset.order;

    if (!currentOrder) {
      header.dataset.order = "asc";
      header.textContent = "Due Date ▲";
    } else if (currentOrder === "asc") {
      header.dataset.order = "desc";
      header.textContent = "Due Date ▼";
    } else if (currentOrder === "desc") {
      header.removeAttribute("data-order");
      header.textContent = "Due Date";
      //loadTasks();
      loadFilter();
      return;
    }

    var tasks = Array.from(document.querySelectorAll("#taskList .tr-task"));

    tasks.sort(function(a, b) {
      var dateA = new Date(a.cells[4].textContent);
      var dateB = new Date(b.cells[4].textContent);

      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return currentOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
      taskList.appendChild(task);
    });
  }


  function toggleListOptions() {
      var listOptions = document.getElementById("listOptions");
      listOptions.classList.toggle("show");
  }

  function hideListOptions() {
      var listOptions = document.getElementById("listOptions");
      listOptions.classList.remove("show");
  }

  function addSubtask(row) {
    var taskId = parseInt(row.dataset.id);

    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id == taskId;
    });

    if (taskIndex !== -1) {
      var subtaskTitle = prompt("Enter the title for the subtask:");

      if (!listsData[currentList].tasks[taskIndex].subtasks || !Array.isArray(listsData[currentList].tasks[taskIndex].subtasks)) {
        listsData[currentList].tasks[taskIndex].subtasks = [];
      }

      if (subtaskTitle) {
        var subtask = {
          id: listsData[currentList].tasks[taskIndex].subtaskIdCounter++,
          title: subtaskTitle,
          completed: false
        };

        listsData[currentList].tasks[taskIndex].subtasks.push(subtask);

        saveListsData();
        loadFilter();
        //loadTasks();
      }
    } else {
      console.error("Parent task not found!");
    }
  }

  function editSubtask(taskId, subtaskId, newTitle) {
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      var subtaskIndex = listsData[currentList].tasks[taskIndex].subtasks.findIndex(function(subtask) {
        return subtask.id === subtaskId;
      });

      if (subtaskIndex !== -1) {
        listsData[currentList].tasks[taskIndex].subtasks[subtaskIndex].title = newTitle;

        saveListsData();

        loadFilter();
        //loadTasks();
      }
    } else {
      console.error("Parent task not found!");
    }
  }

  function deleteSubtask(taskId, subtaskId) {
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      var subtaskIndex = listsData[currentList].tasks[taskIndex].subtasks.findIndex(function(subtask) {
        return subtask.id === subtaskId;
      });

      if (subtaskIndex !== -1) {
        listsData[currentList].tasks[taskIndex].subtasks.splice(subtaskIndex, 1);

        saveListsData();
        loadFilter();
        //loadTasks();
      }
    } else {
      console.error("Parent task not found!");
    }
  }

  function loadSubtasks(task) {
    var taskIndex = task.id;
    var row = document.querySelector('tr[data-id="' + taskIndex + '"]');
    var parentRow = row.parentNode;

    var subtasks = task.subtasks;
    var showSubtasks = task.showSubtasks;
      
    if(subtasks.length > 0){
      var subtaskContainer = document.createElement("tr");
      subtaskContainer.setAttribute("data-id", taskIndex);
      subtaskContainer.classList.add("subtask-container");

      if(!showSubtasks){
        subtaskContainer.style.display = "none";    
      }

      var subtaskTd = document.createElement("td");
      subtaskTd.setAttribute('colspan', 6);
      subtaskTd.classList.add("subtask-list-td");
        
      var subtaskTable = document.createElement("table");
      subtaskTable.classList.add("subtask-list");
      var subtaskTableBody = document.createElement("tbody");

      subtasks.forEach(function(subtask) {
        var subtaskRow = document.createElement("tr");
        subtaskRow.classList.add("tr-subtask");
          
        var emptyCell = document.createElement("td");
        emptyCell.classList.add("subtasks-toggle");
        subtaskRow.appendChild(emptyCell);
     
        var secondEmptyCell = document.createElement("td");
        secondEmptyCell.classList.add("subtaks-second-td");
        subtaskRow.appendChild(secondEmptyCell);       
          
        var checkboxCell = document.createElement("td");
        checkboxCell.classList.add("subtasks-toggle");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (subtask.completed || task.completed) {
          subtaskRow.classList.add("completed");
        }
        checkbox.classList.add("a-btn");
        checkbox.title = "Toggle Completed";
        checkbox.checked = task.completed ? task.completed : subtask.completed;
        checkbox.onchange = function() {
          toggleSubtasks(taskIndex, subtask.id, this);
        };
        checkboxCell.appendChild(checkbox);
        subtaskRow.appendChild(checkboxCell); 

        var subtaskTitleCell = document.createElement("td");
        subtaskTitleCell.classList.add("subtasks-split-content");
        subtaskTitleCell.classList.add('subtask-title');
        
        var firstContainer = document.createElement("span");


        var titleTest = document.createElement("span");
        titleTest.innerHTML = urlTranform(subtask.title);
        firstContainer.appendChild(titleTest);

        var secondContainer = document.createElement("span");
        secondContainer.classList.add("subtasks-actions");
          
        var editButton = document.createElement("a");
        editButton.textContent = "📝";
        editButton.classList.add("a-action");
        editButton.title = "Edit subtask";
        editButton.addEventListener("click", function() {
          var newTitle = prompt("Enter the new name for the subtask:", subtask.title);
          if (newTitle !== null) {
            editSubtask(taskIndex, subtask.id, newTitle);
          }
        });
        secondContainer.appendChild(editButton);
         
        var deleteButton = document.createElement("a");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("a-action");
        deleteButton.title = "Clear subtask";
        deleteButton.addEventListener("click", function() {
          var confirmation = window.confirm("Are you sure you want to delete this subtask?");
          if (confirmation) {
            deleteSubtask(taskIndex, subtask.id);
          }
        });
        secondContainer.appendChild(deleteButton);

        subtaskTitleCell.appendChild(firstContainer);
        subtaskTitleCell.appendChild(secondContainer);

        subtaskRow.appendChild(subtaskTitleCell);

        subtaskTableBody.appendChild(subtaskRow);
      });

      subtaskTable.appendChild(subtaskTableBody);
      subtaskTd.appendChild(subtaskTable);
      subtaskContainer.appendChild(subtaskTd);

      parentRow.insertBefore(subtaskContainer, row.nextSibling);
    }
  }

  function toggleSubtasks(taskId, subtaskId, checkbox) {
    var taskIndex = listsData[currentList].tasks.findIndex(function(task) {
      return task.id === taskId;
    });

    if (taskIndex !== -1) {
      var subtaskIndex = listsData[currentList].tasks[taskIndex].subtasks.findIndex(function(subtask) {
        return subtask.id === subtaskId;
      });
      var row = checkbox.parentNode.parentNode;
      if (checkbox.checked) {
        row.classList.add("completed");
        listsData[currentList].tasks[taskIndex].subtasks[subtaskIndex].completed = true;
        
        if(soundEnabled){
          sound.currentTime = 0;
          sound.play();
        }   
      } else {
        row.classList.remove("completed");
        listsData[currentList].tasks[taskIndex].subtasks[subtaskIndex].completed = false;
      }

      saveListsData();
      loadFilter();
      //loadTasks();

    } else {
      console.error("Parent task not found!");
    }
  }

  function toggleSubtasksVisibility(taskRow) {
    var taskId = taskRow.dataset.id;
    var subtaskContainer = taskRow.nextElementSibling;

    var task = listsData[currentList].tasks.find(function(task) {
      return task.id == taskId;
    });

    var showSubTasks = task.showSubtasks;

    if (subtaskContainer && subtaskContainer.classList.contains("subtask-container") && (subtaskContainer.getAttribute('data-id') === taskId)) {
      var aToggleHide = taskRow.querySelector('a.toggle-hide');
      
      if (!showSubTasks) {
        subtaskContainer.style.display = "";
        aToggleHide.textContent = "▲";

      } else {
        subtaskContainer.style.display = "none";
        aToggleHide.textContent = "▼";
      }

      if (task) {
        task.showSubtasks = !task.showSubtasks;

        saveListsData();

        //loadTasks();
      }
    }
  }

  function toggleAllSubtasksVisibility(){
    var subtaskContainer = document.querySelectorAll('.subtask-container');

    subtaskContainer.forEach(function(subtaskRow) {
      if (subtaskRow && subtaskRow.classList.contains("subtask-container") && loadAll) {
        subtaskRow.style.display = "";
        document.getElementsByClassName("toggle-all-subtasks")[0].textContent = "🫣";
        document.getElementsByClassName("toggle-all-subtasks")[0].title = "Hide all subtasks";
      } else {
        subtaskRow.style.display = "none";
        document.getElementsByClassName("toggle-all-subtasks")[0].textContent = "👁️";
        document.getElementsByClassName("toggle-all-subtasks")[0].title = "Show all subtasks";
      }
    });
    loadAll = !loadAll;
  }

  function toggleBurgerMenu() {
    var menuOverlay = document.getElementById("menuOverlay");
    var body = document.body;

    menuOverlay.style.display = (menuOverlay.style.display === "block") ? "none" : "block";
    body.style.overflow = (body.style.overflow === "hidden") ? "auto" : "hidden";

  }

  function toggleFormVisibility(formId) {
    var form = document.getElementById(formId);
    
    if (form.style.display === "none") {
      form.style.display = "";
      localStorage.setItem(formId, true);
    } else {
      form.style.display = "none";
      localStorage.setItem(formId, false);
    }
  }

  function loadFormVisibility() {
    var addList = localStorage.getItem("addList");
    var addTask = localStorage.getItem("addTask");

    if (addList === null) {
      addList = true;
      localStorage.setItem("addList", addList);
    } else {
      addList = addList === "true";
    }

    if (addTask === null) {
      addTask = true;
      localStorage.setItem("addTask", addTask);
    } else {
      addTask = addTask === "true";
    }

    document.getElementById("addList").style.display = addList ? "" : "none";
    document.getElementById("addTask").style.display = addTask ? "" : "none";
  }

  function loadSound(){
    const storedSoundEnabled = localStorage.getItem("soundEnabled");
    soundEnabled = storedSoundEnabled === "true";

    document.querySelectorAll('.vol-icon').forEach(element => element.innerText = soundEnabled ? "🔊" : "🔇" );
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;

    if(soundEnabled){
      document.querySelectorAll('.vol-icon').forEach(element => element.innerText = '🔊');
      sound.currentTime = 0;
      sound.play();
    }else{
      document.querySelectorAll('.vol-icon').forEach(element => element.innerText = '🔇');
    }

    localStorage.setItem("soundEnabled", soundEnabled);
  }

  function taskCount() {
    return listsData[currentList].tasks.length;
  }

  function phoneModeVisibility(formId, hideFormId){
    if(hideFormId) {
      document.getElementById(hideFormId).classList.add("phone-mode");
    }

    var form = document.getElementById(formId);
    
    if (form.classList.contains('phone-mode')) {
      form.classList.remove("phone-mode");
    } else {
      form.classList.add("phone-mode");
    }
  }

return (
    <div className="todolist-app">
      <div className="header-todolst">
        <nav>
          <h1><a href="/toDoList" className="title-todo">To Do List</a></h1>

          <div className="burger-list-name">
            <div className="menu-toggle" onClick={toggleBurgerMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div id="listNameContainer">
              <span id="listNameLink" onClick={toggleListOptions}>default</span>
              <span id="countTasks" onClick={toggleListOptions}>(0)</span>
              <div id="listOptions" className="" onMouseLeave={hideListOptions}></div>
              <span className="a-btn" id="editListNameButton" onClick={editListName} title="Edit List Name" role="img" aria-label="Edit List Name">📝</span>
              <span role="img" aria-label="Clear all tasks from the current list" className="a-btn" onClick={clearCurrentListTasks}>🗑️</span>

              <span id="toggleFilterButton" className="a-btn mobile-button" onClick={toggleFilter} title="Open/Close Filter">▼</span>
            </div>
          </div>

          <div id="burger-menu">
            <div className="menu-overlay" id="menuOverlay">
              <div className="menu-content">
                <div className="menu-content-flex">
                  <span className="close-menu" onClick={toggleBurgerMenu}>✕</span>
                  <span className="title-phone">To Do List</span>
                  <div>
                    <span onClick={toggleSound} className="vol-icon" role="img" aria-label="Toggle Sound">🔊</span>
                  </div>
                </div>
                <span className="a-btn" onClick={exportTasks}>Export Tasks</span>
                <span className="a-btn" onClick={importTasks}>Import Task</span>
                <span className="a-btn" onClick={clearAllTasks} title="Clear all">Clear All</span>
              </div>
            </div>
          </div>

          <div className="config">
            <span role="img" aria-label="Toggle Sound" className="vol-icon" onClick={toggleSound}>🔊</span>
            <span role="img" aria-label="Toggle Config" className="gear-icon" onClick={toggleSettings}>⚙️</span>
            <div id="settingsMenu" onMouseLeave={hideSettings}>
              <span id="toggleTaskFormButton" className="a-btn" onClick={() => toggleFormVisibility('addList')} title="Show/Hide New List Form">Toggle List Form</span>
              <span id="toggleListFormButton" className="a-btn" onClick={() => toggleFormVisibility('addTask')} title="Show/Hide New Task Form">Toggle Task Form</span>
              <span className="a-btn" onClick={exportTasks}>Export Tasks</span>
              <span className="a-btn" onClick={importTasks}>Import Task</span>
              <span className="a-btn" onClick={clearAllTasks} title="Clear all">Clear All</span>
            </div>
          </div>

        </nav>
      </div>

      <div className="main-todolst">
        <div className="container-todo">
          <div id="addList" className="form list phone-mode">
            <input type="text" id="newListInput" className="mobile-input" placeholder="New List Name" title="List name" />
            <button onClick={createList} className="mobile-button">Create List</button>
          </div>

          <div id="addTask" className="form phone-mode">
            <input type="text" id="titleInput" className="mobile-input" placeholder="Title" title="Title" />
            <textarea id="descriptionInput" className="mobile-input" placeholder="Description" title="Description"></textarea>
            <input type="date" id="dueDateInput" className="mobile-input" title="Due Date" />
            <button onClick={addTask} className="mobile-button" title="Add a new Task">Add Task</button>
          </div>

          <div id="filterOptions">
            <div className="filterOption">
              <label>Status:</label>
              <input type="radio" id="filterAll" name="status" defaultChecked />
              <label htmlFor="filterAll">All</label>
              <input type="radio" id="filterCompleted" name="status" />
              <label htmlFor="filterCompleted">Completed</label>
              <input type="radio" id="filterIncomplete" name="status" />
              <label htmlFor="filterIncomplete">Uncompleted</label>
            </div>
            <div className="filterOption">
              <label htmlFor="filterDate">Date:</label>
              <input type="date" id="filterDate" />
            </div>
            <div className="filterOption">
              <label htmlFor="filterStartDate">Start date:</label>
              <input type="date" id="filterStartDate" />

              <label htmlFor="filterEndDate">End date:</label>
              <input type="date" id="filterEndDate" />
            </div>
            <div className="filterOption">
              <label htmlFor="filterTitle">Title:</label>
              <input type="text" id="filterTitle" />
            </div>
            <div className="filterOption">
              <label htmlFor="filterDescription">Description:</label>
              <input type="text" id="filterDescription" />
            </div>
            <div className="filterOption filterOptionButtons">
              <div>
                <button onClick={applyFilter} title="Search with current filter">Search</button>
                <button onClick={resetFilter} title="Clear filter">Reset</button>
              </div>
              <div>
                <span role="img" aria-label="Save filter values" className="a-btn" onClick={saveFilterValues}>💾</span>
                <span role="img" aria-label="Clear filter values" className="a-btn" onClick={clearFilterValues}>🗑️</span>
              </div>
            </div>
          </div>

          <div className="btn-mode-group">
            <div className="btn-phone" onClick={() => phoneModeVisibility('addTask', 'addList')}>+ Task</div>
            <div className="btn-phone" onClick={() => phoneModeVisibility('addList', 'addTask')}>+ List</div>
          </div>

          <table id="taskTable">
            <thead>
              <tr>
                <th className="subtasks-toggle a-btn toggle-all-subtasks" role="button" onClick={toggleAllSubtasksVisibility} aria-label="Show all subtasks" tabIndex="0"><span role="img" aria-label="Show all subtasks">👁️</span></th>

                <th className="subtasks-toggle"></th>
                <th className="th-head-title">Title</th>
                <th>Description</th>
                <th id="dueDateHeader" onClick={sortTasksByDate}>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="taskList"></tbody>
          </table>
        </div>

        <div id="editModal" className="modal">
          <div id="modalContainer">
             <div id="modalHeader">
               <h2>Edit Task</h2>
             </div>
             <div className="modal-content">
               <label htmlFor="editTaskTitle">Title:</label>
               <input type="text" id="editTaskTitle" placeholder="Title" />
             </div>
            <div className="modal-content">
              <label htmlFor="editTaskDescription">Description:</label>
              <textarea id="editTaskDescription" cols="60" placeholder="Description"></textarea>
            </div>
            <div className="modal-content">
              <label htmlFor="editTaskDueDate">Due Date:</label>
              <input type="date" id="editTaskDueDate" />
            </div>
            <div className="modal-buttons">
              <button id="saveEditButton" onClick={updateTask}>Save</button>
              <button id="cancelEditButton" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ToDoList;
