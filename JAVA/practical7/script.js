// Grab DOM Element Interfaces
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const remainingTasksEl = document.getElementById('remaining-tasks');
const clearAllBtn = document.getElementById('clear-all-btn');

// Initial Array Seed Setup (Exactly matching the snapshot mock state)
let tasks = JSON.parse(localStorage.getItem('todo_items_data')) || [
    { id: 1, text: 'Experiment 1', completed: true },
    { id: 2, text: 'Case Study 1', completed: true },
    { id: 3, text: 'Experiment 2', completed: true },
    { id: 4, text: 'Case Study 2', completed: false },
    { id: 5, text: 'Experiment 3', completed: false },
    { id: 6, text: 'Case Study 3', completed: false }
];

// Structural Renderer Pipeline
function renderApp() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span class="task-text">${escapeHtml(task.text)}</span>
            </div>
            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    calculateDashboardMetrics();
    localStorage.setItem('todo_items_data', JSON.stringify(tasks));
}

// Compute Statistics Functions
function calculateDashboardMetrics() {
    const countTotal = tasks.length;
    const countCompleted = tasks.filter(t => t.completed).length;
    const countRemaining = countTotal - countCompleted;

    totalTasksEl.textContent = countTotal;
    completedTasksEl.textContent = countCompleted;
    remainingTasksEl.textContent = countRemaining;
}

// Logic Mutations Handles
function createNewTask() {
    const content = taskInput.value.trim();
    if (!content) return;

    tasks.push({
        id: Date.now(),
        text: content,
        completed: false
    });

    taskInput.value = '';
    renderApp();
}

window.toggleTask = function(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderApp();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderApp();
};

window.editTask = function(id) {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    const modifiedText = prompt('Modify task summary details:', targetTask.text);
    if (modifiedText !== null && modifiedText.trim() !== '') {
        targetTask.text = modifiedText.trim();
        renderApp();
    }
};

// Event Listeners Hooks
addTaskBtn.addEventListener('click', createNewTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') createNewTask();
});

clearAllBtn.addEventListener('click', () => {
    if (confirm('Clear out all tracked entries completely?')) {
        tasks = [];
        renderApp();
    }
});

// Basic XSS Mitigation Sanitizer
function escapeHtml(stringData) {
    const structuralEntityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return stringData.replace(/[&<>"']/g, match => structuralEntityMap[match]);
}

// Initial Boot Run 
renderApp();