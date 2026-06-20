
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

