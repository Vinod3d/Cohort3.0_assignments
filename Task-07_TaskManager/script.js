
let tasks = [];  // Task array - stores all tasks
let filteredTasks = []; // Filtered tasks array - stores search/filter results
let currentTheme = localStorage.getItem("theme") || "dark"; // Current theme - light or dark


document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});


function initializeApp() {
  // 1. Apply saved theme
  setTheme(currentTheme);

  // 2. Load tasks from browser storage
  loadTasksFromStorage();

  // 3. Render tasks to page
  renderTasks();

  // 4. Attach all event listeners
  attachEventListeners();

  // 5. Setup event propagation demo
  setupEventPropagationDemo();
}

//  Theme Setting
function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);

  // Update icon
  const themeToggle = document.getElementById("themeToggle");
  const iconSpan = themeToggle.querySelector(".theme-icon");
  iconSpan.innerHTML = theme === "dark" ? "<i class='ri-moon-fill'></i>" : "<i class='ri-sun-fill'></i>";
}


// Load tasks from browser LocalStorage
function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");

  if (stored) {
    try {
      // Parse JSON string back to array
      tasks = JSON.parse(stored);
      console.log(`📂 Loaded ${tasks.length} tasks from LocalStorage`);
    } catch (e) {
      console.error("❌ Error loading tasks:", e);
      tasks = [];
    }
  } else {
    console.log("📂 No saved tasks found - starting fresh");
    tasks = [];
  }
}

// ========================================
// EVENT LISTENERS MANAGEMENT
// ========================================

/**
 * Attach all event listeners to the application
 * Uses EVENT DELEGATION for performance optimization
 */
function attachEventListeners() {
  console.log("📌 Attaching event listeners...");

  // THEME TOGGLE BUTTON
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", toggleTheme);

  // TASK FORM SUBMISSION
  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", handleTaskFormSubmit);

  // EVENT DELEGATION FOR TASK ACTIONS
  // PRINCIPLE: Instead of attaching click handlers to each task button individually,
  // we attach ONE listener to the parent container and use event.target to identify
  // which button was clicked. This is more efficient when dealing with many elements.
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

  console.log("✅ Event listeners attached");
}

// THEME MANAGEMENT

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);

  console.log("🌓 Theme changed to: " + currentTheme.toUpperCase());
}



// ========================================
// TASK CREATION & FORM HANDLING
// ========================================

/**
 * Handle task form submission
 * DEMONSTRATES: DOM elements, form validation, object creation
 */
function handleTaskFormSubmit(e) {
  e.preventDefault();

  // Get form inputs
  const taskInput = document.getElementById("taskInput");
  const categorySelect = document.getElementById("categorySelect");

  // ===== ATTRIBUTE vs PROPERTY DEMONSTRATION =====
  // HTML Attribute: <input value="stored text">  → getAttribute('value')
  // DOM Property: input.value → current value shown to user
  // For form inputs, use PROPERTIES (.value) not attributes

  const taskTitle = taskInput.value.trim();
  const taskCategory = categorySelect.value;

  // Validate input
  if (taskTitle === "") {
    alert("❌ Please enter a task title");
    return;
  }

  // Create task object
  const task = {
    id: Date.now(), // Unique ID based on timestamp
    title: taskTitle,
    category: taskCategory,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };

  // Add to tasks array
  tasks.push(task);

  // Save to localStorage
  saveTasksToStorage();

  // Clear form input
  taskInput.value = "";
  taskInput.focus();

  // Re-render all tasks
  renderTasks();

  console.log("✅ Task created:", task);
}

// ========================================
// TASK ACTIONS USING EVENT DELEGATION
// ========================================

/**
 * Handle task actions using EVENT DELEGATION
 *
 * EVENT DELEGATION PATTERN:
 * ❌ INEFFICIENT: for (let btn of allButtons) { btn.addEventListener(...) }
 *    - Creates thousands of listeners if many tasks
 * ✅ EFFICIENT: container.addEventListener(...) with target checking
 *    - Only ONE listener needed, handles all task buttons
 *
 * DEMONSTRATES: Event bubbling, event.target, closest()
 */
function handleTaskAction(e) {
  // Get the clicked element
  const target = e.target;

  // Find the closest task card ancestor
  // closest() walks up the DOM tree looking for a matching selector
  const taskCard = target.closest(".task-card");

  // Exit if click wasn't on a task card
  if (!taskCard) return;

  // ===== DATA ATTRIBUTES DEMONSTRATION =====
  // Custom data attributes store additional info in HTML
  // HTML: <div data-id="123" data-status="pending">
  // JavaScript: element.getAttribute('data-id') OR element.dataset.id

  const taskId = parseInt(taskCard.getAttribute("data-id"));

  // Route to appropriate handler based on which button was clicked
  if (target.classList.contains("task-btn-complete")) {
    handleCompleteTask(taskId);
  } else if (target.classList.contains("task-btn-edit")) {
    handleEditTask(taskId);
  } else if (target.classList.contains("task-btn-delete")) {
    handleDeleteTask(taskId);
  }
}

/**
 * Toggle task completion status
 */
function handleCompleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  // Toggle status
  task.status = task.status === "completed" ? "pending" : "completed";

  saveTasksToStorage();
  renderTasks();

  const status = task.status === "completed" ? "✅ COMPLETED" : "⏳ PENDING";
  console.log(status + " - " + task.title);
}

/**
 * Delete a task
 * Demonstrates: Array.filter() for deletion
 */
function handleDeleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (confirm(`🗑️ Delete task: "${task.title}"?`)) {
    // Use filter to create new array without this task
    // DEMONSTRATES: Immutable array update pattern
    tasks = tasks.filter((t) => t.id !== taskId);

    saveTasksToStorage();
    renderTasks();

    console.log("🗑️ Task deleted: " + task.title);
  }
}

/**
 * Edit task title
 */
function handleEditTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  const newTitle = prompt("✏️ Edit task title:", task.title);

  if (newTitle && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    saveTasksToStorage();
    renderTasks();

    console.log("✏️ Task updated: " + newTitle);
  }
}

/**
 * Clear all tasks
 */
function handleClearAllTasks() {
  if (tasks.length === 0) {
    alert("No tasks to clear");
    return;
  }

  if (confirm("⚠️ Clear ALL tasks? This cannot be undone.")) {
    tasks = [];
    saveTasksToStorage();
    renderTasks();

    console.log("🗑️ All tasks cleared");
  }
}

// ========================================
// TASK RENDERING & DOM MANIPULATION
// ========================================

/**
 * Render all tasks to the DOM
 *
 * DEMONSTRATES: DocumentFragment optimization
 * Instead of appending each task individually (causes browser reflow),
 * we create all elements in a fragment first, then append once to DOM
 * This is a critical performance optimization for rendering many items
 */
function renderTasks() {
  const container = document.getElementById("tasksContainer");
  const emptyState = document.getElementById("emptyState");

  // Clear existing tasks
  container.innerHTML = "";

  // Determine which tasks to display (filtered or all)
  const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

  // If no tasks, show empty state
  if (displayTasks.length === 0) {
    emptyState.classList.remove("hidden");
    updateStats();
    return;
  }

  emptyState.classList.add("hidden");

  // ===== DOCUMENTFRAGMENT PERFORMANCE OPTIMIZATION =====
  // Create a DocumentFragment - it's like a temporary container in memory
  // When we append to fragment, NO browser reflow happens yet
  // Only when we append fragment to DOM do we get ONE reflow
  const fragment = document.createDocumentFragment();

  // Create all task cards and add to fragment
  displayTasks.forEach((task) => {
    const taskCard = createTaskElement(task);
    fragment.appendChild(taskCard);
  });

  // Append all tasks at once - single reflow/repaint
  container.appendChild(fragment);

  // Update statistics
  updateStats();
}

/**
 * Create a task card element
 *
 * DEMONSTRATES:
 * ✓ createElement() - create new DOM elements
 * ✓ createTextNode() - create text nodes
 * ✓ setAttribute() - set element attributes
 * ✓ classList - manage CSS classes
 * ✓ appendChild() - add children to parent
 */
function createTaskElement(task) {
  // ===== CREATE MAIN CONTAINER =====
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  // Set data attributes for identification
  // DEMONSTRATES: Custom data attributes
  taskCard.setAttribute("data-id", task.id);
  taskCard.setAttribute("data-status", task.status);
  taskCard.setAttribute("data-category", task.category);

  // Add completed class if task is done
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

// ========================================
// SEARCH & FILTER FUNCTIONALITY
// ========================================

/**
 * Handle search and category filter
 *
 * DEMONSTRATES: Array.filter() for searching
 * Uses: String.includes() for case-insensitive search
 */
function handleSearchAndFilter() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const categoryValue = document.getElementById("filterCategory").value;

  // Filter tasks based on search and category
  filteredTasks = tasks.filter((task) => {
    // Check if task title matches search
    const matchesSearch = task.title.toLowerCase().includes(searchValue);

    // Check if category matches (empty string means "all")
    const matchesCategory =
      categoryValue === "" || task.category === categoryValue;

    // Return true only if both conditions are met
    return matchesSearch && matchesCategory;
  });

  // Re-render with filtered results
  renderTasks();

  console.log(
    `🔍 Search: "${searchValue}" | Category: "${categoryValue}" | Results: ${filteredTasks.length}`,
  );
}

// ========================================
// STATISTICS UPDATE
// ========================================

/**
 * Update task statistics counters
 */
function updateStats() {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = totalCount - completedCount;

  // Update DOM with statistics
  // DEMONSTRATES: Accessing and modifying element text content
  document.getElementById("totalTasks").textContent = totalCount;
  document.getElementById("completedTasks").textContent = completedCount;
  document.getElementById("pendingTasks").textContent = pendingCount;
}

// ========================================
// LOCALSTORAGE PERSISTENCE
// ========================================

/**
 * Save tasks to browser LocalStorage
 *
 * DEMONSTRATES: LocalStorage API, JSON serialization
 * LocalStorage allows ~5-10MB of data per domain
 * Data persists even after browser closes
 */
function saveTasksToStorage() {
  // Convert tasks array to JSON string and save
  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(`💾 Saved ${tasks.length} tasks to LocalStorage`);
}



// ========================================
// EVENT PROPAGATION DEMONSTRATION
// ========================================

/**
 * Setup event propagation demo
 *
 * DEMONSTRATES: Event capturing and bubbling phases
 *
 * EVENT PROPAGATION PHASES:
 * 1. CAPTURING PHASE: Event travels down (window → document → target)
 *    - Set by: addEventListener(..., true)
 *    - Rarely used
 *
 * 2. AT TARGET: Event reaches the target element
 *
 * 3. BUBBLING PHASE: Event bubbles up (target → document → window)
 *    - Set by: addEventListener(..., false) or omit third parameter
 *    - Default and most commonly used
 */
function setupEventPropagationDemo() {
  const grandparent = document.getElementById("grandparent");
  const parent = document.getElementById("parent");
  const child = document.getElementById("eventChild");

  // Log header
  console.log("\n" + "=".repeat(60));
  console.log("📡 EVENT PROPAGATION PHASES EXPLANATION");
  console.log("=".repeat(60) + "\n");

  // ===== CAPTURING PHASE LISTENERS =====
  // These listen during the CAPTURING phase (top-down)
  // They execute in order: Grandparent → Parent → Child
  console.log(
    "🔴 CAPTURING PHASE (useCapture = true) - Events flow downward:\n",
  );

  grandparent.addEventListener(
    "click",
    () => {
      console.log(
        "%c[CAPTURE] ↓ 1️⃣  Grandparent captured event",
        "color: #ec4899; font-weight: bold; font-size: 12px;",
      );
    },
    true,
  ); // true = capturing phase

  parent.addEventListener(
    "click",
    () => {
      console.log(
        "%c[CAPTURE] ↓ 2️⃣  Parent captured event",
        "color: #ec4899; font-weight: bold; font-size: 12px;",
      );
    },
    true,
  ); // true = capturing phase

  child.addEventListener(
    "click",
    (e) => {
      console.log(
        "%c[CAPTURE] ↓ 3️⃣  Child captured event (target reached)",
        "color: #ec4899; font-weight: bold; font-size: 12px;",
      );
    },
    true,
  ); // true = capturing phase

  console.log(
    'Capturing phase logs "Event travels down from parent to child"\n',
  );

  // ===== BUBBLING PHASE LISTENERS =====
  // These listen during the BUBBLING phase (bottom-up)
  // They execute in order: Child → Parent → Grandparent
  console.log("🟢 BUBBLING PHASE (useCapture = false) - Events flow upward:\n");

  child.addEventListener(
    "click",
    (e) => {
      console.log(
        "%c[BUBBLE] ↑ 3️⃣  Child (TARGET element)",
        "color: #10b981; font-weight: bold; font-size: 12px;",
      );
    },
    false,
  ); // false = bubbling phase (default)

  parent.addEventListener(
    "click",
    (e) => {
      console.log(
        "%c[BUBBLE] ↑ 2️⃣  Parent received bubbled event",
        "color: #10b981; font-weight: bold; font-size: 12px;",
      );
    },
    false,
  ); // false = bubbling phase (default)

  grandparent.addEventListener(
    "click",
    () => {
      console.log(
        "%c[BUBBLE] ↑ 1️⃣  Grandparent received bubbled event",
        "color: #10b981; font-weight: bold; font-size: 12px;",
      );
    },
    false,
  ); // false = bubbling phase (default)

  console.log('Bubbling phase logs "Event travels up from child to parents"\n');

  // Instruction for user
  console.log(
    "%c💡 EXECUTION ORDER WHEN YOU CLICK:\n" +
      "1. CAPTURING (1→2→3): Grandparent → Parent → Child\n" +
      "2. AT TARGET: Event reaches the clicked button\n" +
      "3. BUBBLING (3→2→1): Child → Parent → Grandparent\n\n" +
      '📌 Click "Click Me to See Event Flow!" button above to see this in action!\n\n' +
      "🎯 To stop propagation:\n" +
      "   event.stopPropagation() - stops bubbling/capturing\n" +
      "   event.stopImmediatePropagation() - stops other listeners too\n",
    "color: #f59e0b; font-style: italic; font-size: 12px;",
  );

  console.log("=".repeat(60) + "\n");
}

// ========================================
// BROWSER RENDERING PIPELINE INFO
// ========================================

/**
 * Educational information about browser rendering
 * This section is displayed in the HTML and explained here
 */
console.log("\n" + "=".repeat(60));
console.log("🔄 BROWSER RENDERING PIPELINE EXPLAINED");
console.log("=".repeat(60) + "\n");

console.log(
  "%c1. HTML PARSING & TOKENIZATION\n" +
    "   Browser receives HTML file\n" +
    "   Creates a DOM Tree (tree structure of all elements)",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n2. CSS PROCESSING\n" +
    "   Browser parses CSS files\n" +
    "   Creates CSSOM (CSS Object Model) Tree\n" +
    "   Matches styles to DOM elements",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n3. RENDER TREE CREATION\n" +
    "   Combines DOM Tree + CSSOM Tree\n" +
    "   Only includes visible elements\n" +
    "   Excludes elements with display: none",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n4. LAYOUT (Reflow)\n" +
    "   Calculates geometry of each element\n" +
    "   Positions elements on the page\n" +
    "   Determines width, height, position coordinates",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n5. PAINT (Repaint)\n" +
    "   Converts render tree to pixels\n" +
    "   Fills colors, images, borders, shadows\n" +
    "   Draws text and decorative elements",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n6. COMPOSITING\n" +
    "   Combines all painted layers\n" +
    "   Handles z-index and opacity\n" +
    "   Creates final image for GPU rendering",
  "color: #6366f1; font-weight: bold;",
);

console.log(
  "%c\n7. DISPLAY\n" +
    "   ✨ Webpage rendered to user screen\n" +
    "   All visible content now appears in browser",
  "color: #6366f1; font-weight: bold;",
);

console.log("\n" + "=".repeat(60));

// ========================================
// DOM MANIPULATION BEST PRACTICES
// ========================================

console.log("\n" + "=".repeat(60));
console.log("🔧 DOM MANIPULATION BEST PRACTICES");
console.log("=".repeat(60) + "\n");

console.log("%c✓ USE THESE:", "color: #10b981; font-weight: bold;");
console.log(
  '• document.querySelector(".class") - find single element\n' +
    '• element.querySelectorAll("selector") - find multiple\n' +
    '• element.closest(".parent") - find nearest parent\n' +
    "• element.classList.add/remove() - manage classes\n" +
    "• element.addEventListener() - attach listeners\n" +
    "• document.createDocumentFragment() - batch updates\n" +
    "• element.textContent vs element.innerHTML\n" +
    "• Event delegation for many similar elements",
);

console.log("%c\n❌ AVOID THESE:", "color: #ef4444; font-weight: bold;");
console.log(
  '• Inline styles (style="color: red")\n' +
    "• Manipulating innerHTML constantly\n" +
    "• Creating event listeners in loops\n" +
    "• Excessive DOM reflows in loops\n" +
    "• Global variables (use let/const in scope)\n" +
    "• Synchronous localStorage operations in critical paths",
);

console.log("\n" + "=".repeat(60) + "\n");
