let icon = {
  success: '<i class="fa-solid fa-circle-check"></i>',
  danger: '<i class="fa-solid fa-circle-xmark"></i>',
  warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
  info: '<i class="fa-solid fa-circle-info"></i>',
};

// Toast notification
const showToast = (
  message = "Sample Message",
  toastType = "info",
  duration = 5000,
) => {
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = ` <div class="toast-content-wrapper">
                      <div class="toast-icon">
                      ${icon[toastType]}
                      </div>
                      <div class="toast-message">${message}</div>
                      <div class="toast-progress"></div>
                      </div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration =
    `${duration / 1000}s`;

  let toastAlready = document.body.querySelector(".toast");
  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);

  // Auto-dismiss the toast
  setTimeout(() => {
    box.classList.add("closing");
    box.addEventListener("animationend", (e) => {
      if (e.animationName === "slideOutRight") {
        box.remove();
      }
    });
  }, duration);
};

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();

  // Check for pending toast in sessionStorage
  const pendingToastJson = sessionStorage.getItem("pendingToast");
  if (pendingToastJson) {
    try {
      const pendingToast = JSON.parse(pendingToastJson);
      showToast(pendingToast.message, pendingToast.type);
    } catch (e) {
      console.error("Error parsing pending toast:", e);
    }
    sessionStorage.removeItem("pendingToast");
  }

  if (document.getElementById("loginForm")) {
    initLoginPage();
  } else if (document.getElementById("registerForm")) {
    initRegisterPage();
  } else if (document.getElementById("dashboard-view")) {
    initDashboardPage();
  }
});

// get Logged In User
function getLoggedInUser() {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

// check Authentication
function checkAuth() {
  const user = getLoggedInUser();
  const currentPath = window.location.pathname;
  const isAuthPage =
    currentPath.includes("login.html") || currentPath.includes("register.html");

  if (!user) {
    if (!isAuthPage) {
      window.location.href = "login.html";
    }
  } else {
    if (isAuthPage) {
      window.location.href = "index.html";
    }
  }
}

function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));

  // Also update this user's data in the global list of registered users
  const usersJson = localStorage.getItem("users");
  if (usersJson) {
    const users = JSON.parse(usersJson);
    const index = users.findIndex(
      (u) => u.username.toLowerCase() === user.username.toLowerCase(),
    );
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}

/* ============ Login Page Logic ========== */

function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");

    const username = usernameInput ? usernameInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!username || !password) {
      showToast("Please enter both username and password.", "danger");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password,
    );

    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(matchedUser));
      sessionStorage.setItem(
        "pendingToast",
        JSON.stringify({
          message: `Welcome back, ${matchedUser.username}!`,
          type: "success",
        }),
      );
      window.location.href = "index.html";
    } else {
      showToast("Invalid username or password. Please try again.", "danger");
    }
  });
}

/* ========== init Register Page ============ */
function initRegisterPage() {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("regUsername");
    const passwordInput = document.getElementById("regPassword");

    const username = usernameInput ? usernameInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!username || !password) {
      showToast("Please enter both username and password.", "danger");
      return;
    }

    if (username.length < 3) {
      showToast("Username must be at least 3 characters long.", "danger");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", "danger");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase(),
    );

    if (userExists) {
      showToast(
        "Username already exists. Please choose a different one.",
        "danger",
      );
      return;
    }

    // Initializing a new user with default preferences and empty data
    const newUser = {
      username: username,
      password: password,
      name: username,
      currency: "₹",
      transactions: [],
      darkMode: false,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    sessionStorage.setItem(
      "pendingToast",
      JSON.stringify({
        message: "Account created successfully! You can now log in.",
        type: "success",
      }),
    );
    window.location.href = "login.html";
  });
}

/* ========== Dashboard Page Logic =========== */
let activeUser = null;
let chartInstance = null;

function initDashboardPage() {
  activeUser = getLoggedInUser();
  if (!activeUser) return;

  updateProfileUI(); // Set user settings in UI
  initTheme(); // Initialise Theme/Dark Mode
  renderDashboard(); // Render Dashboard widgets
  setupDashboardEventHandlers(); // Set up all Dashboard event handlers
}

function updateProfileUI() {
  const displayName = activeUser.name || activeUser.username;

  const topbarName = document.getElementById("topbarName");
  if (topbarName) topbarName.textContent = displayName;

  const settingName = document.getElementById("settingName");
  if (settingName) settingName.value = displayName;

  const settingCurrency = document.getElementById("settingCurrency");
  if (settingCurrency) settingCurrency.value = activeUser.currency || "$";
}

function initTheme() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const isDark = activeUser.darkMode;

  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (darkModeToggle) darkModeToggle.checked = true;
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (darkModeToggle) darkModeToggle.checked = false;
  }
}

function renderDashboard() {
  // 1. Calculate and update balances/totals
  calculateStats();

  // 2. Filter and render the transactions list table
  renderTransactionsTable();

  // 3. Render the Visual Cash Flow Chart
  renderChart();
}

function calculateStats() {
  const transactions = activeUser.transactions || [];
  const currency = activeUser.currency || "$";

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((t) => {
    const amount = parseFloat(t.amount) || 0;
    if (t.type === "income") {
      incomeTotal += amount;
    } else if (t.type === "expense") {
      expenseTotal += amount;
    }
  });

  const currentBalance = incomeTotal - expenseTotal;

  const displayBalance = document.getElementById("displayBalance");
  const displayIncome = document.getElementById("displayIncome");
  const displayExpense = document.getElementById("displayExpense");
  const displayCount = document.getElementById("displayCount");

  if (displayBalance) {
    const sign = currentBalance < 0 ? "-" : "";
    displayBalance.textContent = `${sign}${currency}${Math.abs(currentBalance).toFixed(2)}`;
  }
  if (displayIncome) {
    displayIncome.textContent = `${currency}${incomeTotal.toFixed(2)}`;
  }
  if (displayExpense) {
    displayExpense.textContent = `${currency}${expenseTotal.toFixed(2)}`;
  }
  if (displayCount) {
    displayCount.textContent = transactions.length;
  }
}

function renderTransactionsTable() {
  const tableBody = document.getElementById("transactionTableBody");
  if (!tableBody) return;

  const transactions = activeUser.transactions || [];
  const currency = activeUser.currency || "$";

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");

  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const typeVal = typeFilter ? typeFilter.value : "all";

  // Filter logic
  const filtered = transactions.filter((t) => {
    if (typeVal !== "all" && t.type !== typeVal) {
      return false;
    }

    if (query) {
      const description = (t.description || "").toLowerCase();
      const category = (t.category || "").toLowerCase();
      if (!description.includes(query) && !category.includes(query)) {
        return false;
      }
    }
    return true;
  });

  // Sort transactions by date descending (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Build table HTML
  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 24px;">No transactions found.</td></tr>`;
    return;
  }

  filtered.forEach((t) => {
    const tr = document.createElement("tr");

    const txDate = new Date(t.date);
    const formattedDate = txDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const isIncome = t.type === "income";
    const amtClass = isIncome ? "text-green" : "text-red";
    const amtPrefix = isIncome ? "+" : "-";

    tr.innerHTML = `
            <td>${formattedDate}</td>
            <td>${escapeHTML(t.description)}</td>
            <td><span class="tag">${escapeHTML(t.category)}</span></td>
            <td class="${amtClass}">${amtPrefix}${currency}${parseFloat(t.amount).toFixed(2)}</td>
            <td>
                <button class="action-btn btn-edit" data-id="${t.id}" title="Edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="action-btn btn-delete" data-id="${t.id}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

    tableBody.appendChild(tr);
  });
}

function renderChart() {
  const canvas = document.getElementById("cashFlowChart");
  if (!canvas) return;

  const chartType = document.getElementById("chartTypeSelect").value;
  const transactions = activeUser.transactions || [];

  if (chartInstance) chartInstance.destroy();

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const textColor = isDark ? "#f9fafb" : "#1a1d21";
  const gridColor = isDark ? "#374151" : "#e5e7eb";

  let data;

  // ---------------- PIE CHART ----------------
  if (chartType === "pie") {
    const categories = {};

    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        const category = tx.category || "Other";
        categories[category] = (categories[category] || 0) + Number(tx.amount);
      });

    data = {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "#ef4444",
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#8b5cf6",
            "#ec4899",
          ],
        },
      ],
    };
  }

  // ---------------- LINE / BAR ----------------
  else {
    const daily = {};

    transactions.forEach((tx) => {
      if (!daily[tx.date]) {
        daily[tx.date] = {
          income: 0,
          expense: 0,
        };
      }

      daily[tx.date][tx.type] += Number(tx.amount);
    });

    const dates = Object.keys(daily).sort();

    data = {
      labels: dates,
      datasets: [
        {
          label: "Income",
          data: dates.map((d) => daily[d].income),
          borderColor: "#22c55e",
          backgroundColor: "#22c55e",
          fill: false,
        },
        {
          label: "Expense",
          data: dates.map((d) => daily[d].expense),
          borderColor: "#ef4444",
          backgroundColor: "#ef4444",
          fill: false,
        },
      ],
    };
  }

  chartInstance = new Chart(canvas, {
    type: chartType,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },

      scales:
        chartType === "pie"
          ? {}
          : {
              x: {
                ticks: {
                  color: textColor,
                },
                grid: {
                  color: gridColor,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: textColor,
                },
                grid: {
                  color: gridColor,
                },
              },
            },
    },
  });
}

function setupDashboardEventHandlers() {
  // 1. Navigation Event Handlers
  const menuLinks = document.querySelectorAll(".menu-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      menuLinks.forEach((l) => l.classList.remove("current"));
      link.classList.add("current");

      const targetId = link.getAttribute("data-target");
      const screens = document.querySelectorAll(".screen-panel");
      screens.forEach((s) => s.classList.remove("active"));

      const targetScreen = document.getElementById(targetId);
      if (targetScreen) {
        targetScreen.classList.add("active");
      }

      // Re-render chart on viewport visibility change to keep calculations correct
      if (targetId === "dashboard-view") {
        setTimeout(renderChart, 50);
      }
    });
  });

  // 2. Transaction Add Modal Controls
  const openAddModalBtn = document.getElementById("openAddModalBtn");
  const transactionModal = document.getElementById("transactionModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const transactionForm = document.getElementById("transactionForm");
  const modalTitle = document.getElementById("modalTitle");

  if (openAddModalBtn && transactionModal) {
    openAddModalBtn.addEventListener("click", () => {
      if (transactionForm) transactionForm.reset();

      const txIdInput = document.getElementById("txId");
      if (txIdInput) txIdInput.value = ""; // Empty implies ADD mode

      if (modalTitle) modalTitle.textContent = "Add Transaction";

      // Pre-fill date to today
      const txDateInput = document.getElementById("txDate");
      if (txDateInput) {
        txDateInput.value = new Date().toISOString().split("T")[0];
      }

      transactionModal.classList.add("active");
    });
  }

  if (closeModalBtn && transactionModal) {
    closeModalBtn.addEventListener("click", () => {
      transactionModal.classList.remove("active");
    });
  }

  if (transactionModal) {
    transactionModal.addEventListener("click", (e) => {
      if (e.target === transactionModal) {
        transactionModal.classList.remove("active");
      }
    });
  }

  // 3. Add/Edit Transaction Form Submission
  if (transactionForm) {
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const txIdVal = document.getElementById("txId").value;
      const txType = document.getElementById("txType").value;
      const txDescription = document
        .getElementById("txDescription")
        .value.trim();
      const txAmount =
        parseFloat(document.getElementById("txAmount").value) || 0;
      const txDate = document.getElementById("txDate").value;
      const txCategory = document.getElementById("txCategory").value;

      if (
        !txType ||
        !txDescription ||
        txAmount <= 0 ||
        !txDate ||
        !txCategory
      ) {
        showToast(
          "Please fill out all fields. Amount must be a positive number.",
          "danger",
        );
        return;
      }

      if (!activeUser.transactions) activeUser.transactions = [];

      if (txIdVal) {
        // Edit Mode
        const idx = activeUser.transactions.findIndex(
          (t) => t.id.toString() === txIdVal.toString(),
        );
        if (idx !== -1) {
          activeUser.transactions[idx] = {
            id: txIdVal,
            type: txType,
            description: txDescription,
            amount: txAmount,
            date: txDate,
            category: txCategory,
          };
        }
      } else {
        // Add Mode
        const newTx = {
          id: Date.now().toString(),
          type: txType,
          description: txDescription,
          amount: txAmount,
          date: txDate,
          category: txCategory,
        };
        activeUser.transactions.push(newTx);
        showToast("Transaction added successfully!", "success");
      }

      saveUser(activeUser);
      if (transactionModal) transactionModal.classList.remove("active");
      renderDashboard();
    });
  }

  // 4. Delegated Table Actions (Edit & Delete Buttons)
  const tableBody = document.getElementById("transactionTableBody");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".btn-edit");
      const deleteBtn = e.target.closest(".btn-delete");

      if (editBtn) {
        const txId = editBtn.getAttribute("data-id");
        const tx = activeUser.transactions.find(
          (t) => t.id.toString() === txId.toString(),
        );
        if (tx) {
          document.getElementById("txId").value = tx.id;
          document.getElementById("txType").value = tx.type;
          document.getElementById("txDescription").value = tx.description;
          document.getElementById("txAmount").value = tx.amount;
          document.getElementById("txDate").value = tx.date;
          document.getElementById("txCategory").value = tx.category;

          if (modalTitle) modalTitle.textContent = "Edit Transaction";
          if (transactionModal) transactionModal.classList.add("active");
        }
      } else if (deleteBtn) {
        const txId = deleteBtn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this transaction?")) {
          activeUser.transactions = activeUser.transactions.filter(
            (t) => t.id.toString() !== txId.toString(),
          );
          saveUser(activeUser);
          renderDashboard();
        }
      }
    });
  }

  // 5. Search & Filter Inputs
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const chartTypeSelect = document.getElementById("chartTypeSelect");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderTransactionsTable();
      renderChart();
    });
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", () => {
      renderTransactionsTable();
      renderChart();
    });
  }

  if (chartTypeSelect) {
    chartTypeSelect.addEventListener("change", () => {
      renderChart();
    });
  }

  // 6. Settings Form Submit Handler
  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInputVal = document.getElementById("settingName").value.trim();
      const currencyVal = document.getElementById("settingCurrency").value;

      if (!nameInputVal || !currencyVal) {
        showToast("Please fill out all settings details.", "success");
        return;
      }

      activeUser.name = nameInputVal;
      activeUser.currency = currencyVal;

      saveUser(activeUser);
      updateProfileUI();
      renderDashboard();

      showToast("Settings saved successfully!", "success");
    });
  }

  // 7. Reset Data Handler
  const resetDataBtn = document.getElementById("resetDataBtn");
  if (resetDataBtn) {
    resetDataBtn.addEventListener("click", () => {
      if (
        confirm(
          "Are you sure you want to reset all transaction data? This action is permanent!",
        )
      ) {
        activeUser.transactions = [];
        saveUser(activeUser);
        renderDashboard();
      }
    });
  }

  // 8. Dark Mode Theme Toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", (e) => {
      activeUser.darkMode = e.target.checked;
      saveUser(activeUser);
      initTheme();
      renderChart();
    });
  }

  // 9. Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
}
