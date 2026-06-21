
let tasks = [];  // Task array - stores all tasks
let filteredTasks = []; // Filtered tasks array - stores search/filter results
let currentTheme = localStorage.getItem("theme") || "dark"; // Current theme - light or dark

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});


function initializeApp() {
  setTheme(currentTheme);  // 1. Apply saved theme
  loadTasksFromStorage();  // 2. Load tasks from browser storage
  renderTasks();   // 3. Render tasks to page
  attachEventListeners(); // 4. Attach all event listeners

  // 5. Setup event propagation demo
  setupEventPropagationDemo();
}

//  Theme Setting
function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  const themeToggle = document.getElementById("themeToggle");
  const iconSpan = themeToggle.querySelector(".theme-icon");
  iconSpan.innerHTML = theme === "dark" ? "<i class='ri-moon-fill'></i>" : "<i class='ri-sun-fill'></i>";
}


// Load tasks from browser LocalStorage
function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error("❌ Error loading tasks:", e);
      tasks = [];
    }
  } else {
    console.log("📂 No saved tasks found - starting fresh");
    tasks = [];
  }
}


// Instead of appending each task individually (causes browser reflow),
//  we create all elements in a fragment first, then append once to DOM
function renderTasks() {
  const container = document.getElementById("tasksContainer");
  const emptyState = document.getElementById("emptyState");

  // Clear existing tasks
  container.innerHTML = "";
  const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

  if (displayTasks.length === 0) {
    emptyState.classList.remove("hidden");
    updateStats();
    return;
  }

  emptyState.classList.add("hidden");
  const fragment = document.createDocumentFragment();

  displayTasks.forEach((task) => {
    const taskCard = createTaskElement(task);
    fragment.appendChild(taskCard);
  });

  container.appendChild(fragment);

  // Update statistics
  updateStats();
}

//  Update task statistics counters
function updateStats() {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = totalCount - completedCount;

  document.getElementById("totalTasks").textContent = totalCount;
  document.getElementById("completedTasks").textContent = completedCount;
  document.getElementById("pendingTasks").textContent = pendingCount;
}


// Create a task card element

function createTaskElement(task) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  // Custom data attributes
  taskCard.setAttribute("data-id", task.id);
  taskCard.setAttribute("data-status", task.status);
  taskCard.setAttribute("data-category", task.category);

  if (task.status === "completed") {
    taskCard.classList.add("completed");
  }

  // Set role for accessibility
  taskCard.setAttribute("role", "listitem");

  // ===== CREATE CONTENT SECTION =====
  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  // Create title heading
  const taskTitle = document.createElement("h3");
  taskTitle.className = "task-title";
  // DEMONSTRATES: createTextNode - create explicit text node
  // More efficient than: taskTitle.textContent = task.title
  taskTitle.appendChild(document.createTextNode(task.title));

  // Create metadata section
  const taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";

  // Create category badge
  const categoryBadge = document.createElement("span");
  categoryBadge.className = `task-category ${task.category}`;
  categoryBadge.appendChild(document.createTextNode(task.category));

  // Create date span
  const dateSpan = document.createElement("span");
  dateSpan.appendChild(document.createTextNode("Created: " + task.createdAt));

  // Create status badge
  const statusBadge = document.createElement("span");
  statusBadge.className = "task-status";
  statusBadge.appendChild(
    document.createTextNode(`[${task.status.toUpperCase()}]`),
  );

  // Append metadata elements
  taskMeta.appendChild(categoryBadge);
  taskMeta.appendChild(statusBadge);
  taskMeta.appendChild(dateSpan);

  // Append content to card
  taskContent.appendChild(taskTitle);
  taskContent.appendChild(taskMeta);

  // ===== CREATE ACTION BUTTONS =====
  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.className = "task-btn task-btn-complete";
  completeBtn.innerHTML = "✓";
  completeBtn.setAttribute("aria-label", "Mark as complete");
  completeBtn.setAttribute("title", "Mark complete");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.className = "task-btn task-btn-edit";
  editBtn.innerHTML = "✏️";
  editBtn.setAttribute("aria-label", "Edit task");
  editBtn.setAttribute("title", "Edit task");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "task-btn task-btn-delete";
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.setAttribute("title", "Delete task");

  // Append buttons to actions container
  taskActions.appendChild(completeBtn);
  taskActions.appendChild(editBtn);
  taskActions.appendChild(deleteBtn);

  // ===== ASSEMBLE COMPLETE TASK CARD =====
  taskCard.appendChild(taskContent);
  taskCard.appendChild(taskActions);

  return taskCard;
}

// Attach all event listeners to the application
function attachEventListeners() {
  // THEME TOGGLE BUTTON
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", toggleTheme);

  // TASK FORM SUBMISSION
  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", handleTaskFormSubmit);

  //  Handle TASK ACTIONS
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.addEventListener("click", handleTaskAction);

  // SEARCH & FILTER INPUTS
  const searchInput = document.getElementById("searchInput");
  const filterCategory = document.getElementById("filterCategory");
  searchInput.addEventListener("input", handleSearchAndFilter);
  filterCategory.addEventListener("change", handleSearchAndFilter);

  // CLEAR ALL TASKS BUTTON
  const clearAllBtn = document.getElementById("clearAllBtn");
  clearAllBtn.addEventListener("click", handleClearAllTasks);
}

// THEME MANAGEMENT
function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
}


// TASK CREATION & FORM HANDLING
function handleTaskFormSubmit(e) {
  e.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const categorySelect = document.getElementById("categorySelect");

  const taskTitle = taskInput.value.trim();
  const taskCategory = categorySelect.value;

  if (taskTitle === "") {
    alert("❌ Please enter a task title");
    return;
  }

  // Create task object
  const task = {
    id: Date.now(),
    title: taskTitle,
    category: taskCategory,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };


  tasks.push(task);
  saveTasksToStorage();

  taskInput.value = "";
  taskInput.focus();

  renderTasks();
}

// Save tasks to browser LocalStorage
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TASK ACTIONS USING EVENT DELEGATION
function handleTaskAction(e) {
  const target = e.target;
  const taskCard = target.closest(".task-card");

  if (!taskCard) return;

  const taskId = parseInt(taskCard.getAttribute("data-id"));

  if (target.classList.contains("task-btn-complete")) {
    handleCompleteTask(taskId);
  } else if (target.classList.contains("task-btn-edit")) {
    handleEditTask(taskId);
  } else if (target.classList.contains("task-btn-delete")) {
    handleDeleteTask(taskId);
  }
}

// Toggle task completion status
function handleCompleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  task.status = task.status === "completed" ? "pending" : "completed";

  saveTasksToStorage();
  renderTasks();
}

// Delete a task
function handleDeleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (confirm(`🗑️ Delete task: "${task.title}"?`)) {
    tasks = tasks.filter((t) => t.id !== taskId);

    saveTasksToStorage();
    renderTasks();
  }
}

// Edit task title
function handleEditTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const newTitle = prompt("✏️ Edit task title:", task.title);

  if (newTitle && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    saveTasksToStorage();
    renderTasks();
  }
}

// Clear all tasks
function handleClearAllTasks() {
  if (tasks.length === 0) {
    alert("No tasks to clear");
    return;
  }

  if (confirm("⚠️ Clear ALL tasks? This cannot be undone.")) {
    tasks = [];
    saveTasksToStorage();
    renderTasks();
  }
}

// SEARCH & FILTER FUNCTIONALITY
function handleSearchAndFilter() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const categoryValue = document.getElementById("filterCategory").value;

  // Filter tasks based on search and category
  filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "" || task.category === categoryValue;

    return matchesSearch && matchesCategory;
  });

  renderTasks();
}