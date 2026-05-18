import { deleteTask, toggleTask, editTask } from "./data.js";

export function renderTasks(tasks, taskList, renderCallback) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "task-item";
        emptyMessage.textContent = "Задачи не найдены";
        taskList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";

        const taskText = document.createElement("span");
        taskText.className = "task-text";

        if (task.completed) {
            taskText.classList.add("completed");
        }

        taskText.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const doneButton = document.createElement("button");
        doneButton.className = "done-btn";
        doneButton.textContent = task.completed ? "Вернуть" : "Готово";

        doneButton.addEventListener("click", () => {
            toggleTask(task.id);
            renderCallback();
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Изменить";

        editButton.addEventListener("click", () => {
            const newText = prompt("Введите новый текст задачи:", task.text);

            if (newText !== null && newText.trim() !== "") {
                editTask(task.id, newText.trim());
                renderCallback();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Удалить";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
            renderCallback();
        });

        actions.appendChild(doneButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);
    });
}