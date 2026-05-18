import { tasks, addTask } from "./data.js";
import { renderTasks } from "./ui.js";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("errorMessage");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

function getFilteredTasks() {
    let filteredTasks = [...tasks];

    const searchText = searchInput.value.toLowerCase().trim();
    const filterValue = filterSelect.value;
    const sortValue = sortSelect.value;

    if (searchText !== "") {
        filteredTasks = filteredTasks.filter(task =>
            task.text.toLowerCase().includes(searchText)
        );
    }

    if (filterValue === "active") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (filterValue === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    if (sortValue === "new") {
        filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (sortValue === "old") {
        filteredTasks.sort((a, b) => a.createdAt - b.createdAt);
    }

    return filteredTasks;
}

function updateTasks() {
    const filteredTasks = getFilteredTasks();
    renderTasks(filteredTasks, taskList, updateTasks);
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Введите текст задачи";
        return;
    }

    if (taskText.length < 3) {
        errorMessage.textContent = "Задача должна содержать минимум 3 символа";
        return;
    }

    errorMessage.textContent = "";
    addTask(taskText);
    taskInput.value = "";
    updateTasks();
});

searchInput.addEventListener("input", updateTasks);
filterSelect.addEventListener("change", updateTasks);
sortSelect.addEventListener("change", updateTasks);

updateTasks();