export let tasks = [
    {
        id: 1,
        text: "Сделать домашнее задание",
        completed: false,
        createdAt: Date.now()
    },
    {
        id: 2,
        text: "Повторить JavaScript",
        completed: true,
        createdAt: Date.now() - 1000
    }
];

export function addTask(text) {
    const newTask = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: Date.now()
    };

    tasks.push(newTask);
}

export function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
}

export function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });
}

export function editTask(id, newText) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                text: newText
            };
        }

        return task;
    });
}