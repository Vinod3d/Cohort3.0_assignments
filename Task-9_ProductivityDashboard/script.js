// --- STATE MANAGEMENT (localStorage keys) ---
const STORAGE_KEYS = {
  THEME: 'theme',
  TODOS: 'todos',
  PLANNER: 'planner',
  GOALS: 'goals',
  LOCATION: "location",
};

// My Credentials for Weather API Config, please do not misuse it
const WEATHER_API_KEY = "2bd8398df0b447b79ac182453242308";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";

// --- BACKGROUNDS & WEATHER STATES MAP ---
const BACKGROUNDS = {
  day: {
    sunny: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920",
    cloudy: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1920",
    mist: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920",
    rainy: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1920",
    snow: "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?q=80&w=1920",
    storm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1920",
  },
  night: {
    sunny: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920",
    cloudy: "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=1920",
    mist: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920",
    rainy: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920",
    snow: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=1920",
    storm: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=1920",
  }
};

const WEATHER_CODE_MAP = {
  // Sunny / Clear
  1000: { sky: "Clear", icon: "ri-sun-fill", color: "#facc15", bg: "sunny" },

  // Cloudy
  1003: { sky: "Partly Cloudy", icon: "ri-cloudy-fill", color: "#cbd5e1", bg: "cloudy" },
  1006: { sky: "Cloudy", icon: "ri-cloudy-fill", color: "#94a3b8", bg: "cloudy" },
  1009: { sky: "Overcast", icon: "ri-cloudy-fill", color: "#94a3b8", bg: "cloudy" },

  // Mist / Fog
  1030: { sky: "Mist", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },
  1135: { sky: "Fog", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },
  1147: { sky: "Freezing Fog", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },

  // Drizzle / Rain
  1063: { sky: "Patchy Rain Possible", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1150: { sky: "Light Drizzle", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1153: { sky: "Drizzle", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1180: { sky: "Patchy Light Rain", icon: "ri-rainy-fill", color: "#60a5fa", bg: "rainy" },
  1183: { sky: "Light Rain", icon: "ri-rainy-fill", color: "#3b82f6", bg: "rainy" },
  1186: { sky: "Moderate Rain At Times", icon: "ri-rainy-fill", color: "#3b82f6", bg: "rainy" },
  1189: { sky: "Moderate Rain", icon: "ri-rainy-fill", color: "#2563eb", bg: "rainy" },
  1192: { sky: "Heavy Rain At Times", icon: "ri-heavy-showers-fill", color: "#2563eb", bg: "rainy" },
  1195: { sky: "Heavy Rain", icon: "ri-heavy-showers-fill", color: "#1d4ed8", bg: "rainy" },
  1240: { sky: "Light Rain Shower", icon: "ri-showers-fill", color: "#3b82f6", bg: "rainy" },
  1243: { sky: "Moderate Rain Shower", icon: "ri-showers-fill", color: "#2563eb", bg: "rainy" },
  1246: { sky: "Torrential Rain Shower", icon: "ri-showers-fill", color: "#1d4ed8", bg: "rainy" },

  // Snow / Ice
  1066: { sky: "Patchy Snow Possible", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1069: { sky: "Sleet Possible", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1114: { sky: "Blowing Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1117: { sky: "Blizzard", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1210: { sky: "Patchy Light Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1213: { sky: "Light Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1216: { sky: "Patchy Moderate Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1219: { sky: "Moderate Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1222: { sky: "Patchy Heavy Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1225: { sky: "Heavy Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1255: { sky: "Light Snow Showers", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1258: { sky: "Heavy Snow Showers", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },

  // Thunder / Storm
  1087: { sky: "Thundery Outbreaks", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1273: { sky: "Patchy Light Rain with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1276: { sky: "Moderate or Heavy Rain with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1279: { sky: "Patchy Light Snow with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1282: { sky: "Moderate or Heavy Snow with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
};



// --- MOTIVATIONAL QUOTES DATABASE ---
const MOTIVATIONAL_QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "productivity" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "persistence" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "persistence" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James", category: "focus" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "productivity" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "focus" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", category: "productivity" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss", category: "focus" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear", category: "productivity" },
  { text: "Your mind is for having ideas, not holding them.", author: "David Allen", category: "focus" }
];

const HERO_QUOTES = [
  "Your mind is for having ideas, not holding them. Focus on what matters, one step at a time.",
  "Deep work: professional activities performed in a state of distraction-free concentration.",
  "Productivity isn't about doing more, it's about doing what matters most with intention.",
  "Simplicity is the ultimate sophistication. Simplify your schedule, maximize your impact.",
  "Focus on the process, not the outcome. Consistency builds momentum."
];

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ri-checkbox-circle-fill';
  if (type === 'info') icon = 'ri-information-fill';
  if (type === 'warning') icon = 'ri-error-warning-fill';
  
  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
      toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3000);
}

function getWeatherVisual(conditionCode) {
  const mapped = WEATHER_CODE_MAP[conditionCode];
  if (mapped) return mapped;

  return { sky: conditionText || "Clear", icon: "ri-sun-fill", color: "#facc15", bg: "sunny" };
}
// --- BACKGROUND & WEATHER CONTROL ---
function updateBackgroundAndWeather(data) {
  if (!data?.current || !data?.location) return;
  const root = document.documentElement; 
  const currentTheme = root.getAttribute('data-theme') || 'dark'; 
  let themeMode = currentTheme === 'light' ? 'day' : 'night';

  // console.log(data)

  
  
  const tempEl = document.getElementById('hero-temp');
  const skyEl = document.getElementById('hero-sky');
  const iconEl = document.getElementById('weather-icon');
  const location = document.getElementById('hero-location');
  const humEl = document.getElementById('hero-humidity');
  const windEl = document.getElementById('hero-wind');
  const bgEl = document.getElementById("dashboard-bg");

  const conditionCode = data.current.condition.code;
  const isDay = data.current.is_day === 1;

  const visual = getWeatherVisual(conditionCode);
   themeMode = isDay ? "day" : "night";
  const bgImage = BACKGROUNDS?.[themeMode]?.[visual.bg];

  if (bgEl && bgImage) {
    bgEl.style.backgroundImage = `url('${bgImage}')`;
  }

  
  let skyText = data?.current?.condition?.text;
  let weatherIcon = data?.current?.condition?.icon;
  let locationName = data?.location?.name;
  let tempValue = data?.current?.temp_c;
  let humidity = data?.current?.humidity;
  let wind = data?.current?.wind_mph;
  

  
  if (tempEl) tempEl.textContent = tempValue + "°C";
  if (skyEl) skyEl.textContent = skyText;
  if (iconEl) iconEl.src = weatherIcon;
  if (location) location.textContent = locationName;
  if (humEl) humEl.textContent = "Humidity: " + humidity;
  if (windEl) windEl.textContent = "Wind: " + wind + "mph";
}

// --- CLOCK & DATE UPDATE ---
function initClock() {
  const navClock = document.getElementById('nav-clock');
  const heroTime = document.getElementById('hero-time');
  const heroDate = document.getElementById('hero-date');
  const heroQuote = document.getElementById('hero-quote');
  
  if (heroQuote) {
    const randomIndex = Math.floor(Math.random() * HERO_QUOTES.length);
    heroQuote.textContent = HERO_QUOTES[randomIndex];
  }
  
  function updateTime() {
    const now = new Date();
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const heroTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    
    if (navClock) navClock.textContent = now.toLocaleTimeString('en-US', timeOptions);
    if (heroTime) heroTime.textContent = now.toLocaleTimeString('en-US', heroTimeOptions);
    if (heroDate) heroDate.textContent = now.toLocaleDateString('en-US', dateOptions);
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

// --- THEME MANAGEMENT ---
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      updateThemeIcon(newTheme);
      updateBackgroundAndWeather();
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
  
  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'ri-moon-line';
    } else {
      icon.className = 'ri-sun-line';
    }
  }
}

function saveLocation(locationData) {
  localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(locationData));
}

function getSavedLocation() {
  const raw = localStorage.getItem(STORAGE_KEYS.LOCATION);
  return raw ? JSON.parse(raw) : null;
}

async function fetchCurrentWeather(query) {
  const url = `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}&aqi=no`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  return await res.json();
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}

// --- INTERACTIVE WEATHER CYCLER ---
async function initWeather() {
  try {
    const savedLocation = getSavedLocation();

    if (savedLocation?.query) {
      const data = await fetchCurrentWeather(savedLocation.query);
      updateBackgroundAndWeather(data)
      return;
    }


    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

     const query = `${latitude},${longitude}`;
    const data = await fetchCurrentWeather(query);

    updateBackgroundAndWeather(data);

    console.log(data)
    saveLocation({
      query: data.location.name,
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
    });
  } catch (error) {
    console.error(error);
    showToast("Unable to load weather.", "danger");
  }
  
  
}

// --- SPA VIEW ROUTING CONTROLLER ---
function showView(viewId) {
  const dashboardView = document.getElementById('dashboard-view');
  if (dashboardView) dashboardView.style.display = 'none';
  
  const detailViews = document.querySelectorAll('.detail-view');
  detailViews.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.style.display = ''; // Fallback to flex/grid stylesheet rules
    targetView.classList.add('active');
  }
  
  const backBtn = document.getElementById('dashboard-back-btn');
  if (backBtn) backBtn.style.display = 'flex';
}

function showDashboard() {
  const detailViews = document.querySelectorAll('.detail-view');
  detailViews.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  const dashboardView = document.getElementById('dashboard-view');
  if (dashboardView) dashboardView.style.display = '';
  
  const backBtn = document.getElementById('dashboard-back-btn');
  if (backBtn) backBtn.style.display = 'none';
  
  updateDashboardBadges();
}

function updateDashboardBadges() {
  // 1. Todo active count
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS)) || [];
  const activeTodos = todos.filter(t => !t.completed).length;
  const todoBadge = document.getElementById('todo-badge');
  if (todoBadge) todoBadge.textContent = `${activeTodos} Active`;
  const todoDetailBadge = document.getElementById('todo-detail-badge');
  if (todoDetailBadge) todoDetailBadge.textContent = `${activeTodos} Active`;
  
  // 2. Planner events count
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANNER)) || [];
  const plannerBadge = document.getElementById('planner-badge');
  if (plannerBadge) plannerBadge.textContent = `${events.length} Events`;
  const plannerDetailBadge = document.getElementById('planner-detail-badge');
  if (plannerDetailBadge) plannerDetailBadge.textContent = `${events.length} Events`;
  
  // 3. Goals completed fraction
  const goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || [];
  const completedGoals = goals.filter(g => g.completed).length;
  const goalsBadge = document.getElementById('goals-progress-badge');
  if (goalsBadge) goalsBadge.textContent = `${completedGoals}/${goals.length} Completed`;
}

function initSpaRouting() {
  const todoCard = document.getElementById('todo-card-wrapper');
  const plannerCard = document.getElementById('planner-card-wrapper');
  const motivationCard = document.getElementById('motivation-card-wrapper');
  const pomodoroCard = document.getElementById('pomodoro-card-wrapper');
  const goalsCard = document.getElementById('goals-card-wrapper');
  
  const backBtn = document.getElementById('dashboard-back-btn');
  const logo = document.getElementById('logo-dashboard-trigger');
  
  if (todoCard) todoCard.addEventListener('click', () => showView('todo-view'));
  if (plannerCard) plannerCard.addEventListener('click', () => showView('planner-view'));
  if (motivationCard) motivationCard.addEventListener('click', () => showView('motivation-view'));
  if (pomodoroCard) pomodoroCard.addEventListener('click', () => showView('pomodoro-view'));
  if (goalsCard) goalsCard.addEventListener('click', () => showView('goals-view'));
  
  if (backBtn) backBtn.addEventListener('click', showDashboard);
  if (logo) logo.addEventListener('click', showDashboard);
  
  updateDashboardBadges();
}

// --- MOTIVATION QUOTES WIDGET ---
function initMotivationWidget() {
  const displayEl = document.getElementById('motivation-quote-display');
  const authorEl = document.getElementById('motivation-quote-author');
  const refreshBtn = document.getElementById('refresh-quote-btn');
  const categoryChips = document.querySelectorAll('.category-chip');
  
  let currentCategory = 'all';
  
  function setRandomQuote() {
    if (!displayEl || !authorEl) return;
    
    displayEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    
    setTimeout(() => {
      const filteredQuotes = currentCategory === 'all' 
        ? MOTIVATIONAL_QUOTES 
        : MOTIVATIONAL_QUOTES.filter(q => q.category === currentCategory);
        
      if (filteredQuotes.length === 0) return;
      
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      displayEl.textContent = `"${random.text}"`;
      authorEl.textContent = `— ${random.author}`;
      
      displayEl.style.transition = 'opacity 0.4s ease';
      authorEl.style.transition = 'opacity 0.4s ease';
      displayEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 200);
  }
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      setRandomQuote();
      const icon = refreshBtn.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          icon.style.transform = 'none';
          icon.style.transition = 'none';
        }, 500);
      }
    });
  }
  
  if (categoryChips.length > 0) {
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.getAttribute('data-category');
        setRandomQuote();
        showToast(`Filtered quotes by: ${chip.textContent.trim()}`, 'info');
      });
    });
  }
  
  setRandomQuote();
}

// --- TODO WIDGET ---
function initTodoWidget() {
  const addBtn = document.getElementById('add-todo-item-btn');
  const inputField = document.getElementById('todo-input-field');
  const listContainer = document.getElementById('todo-items-list');
  const detailBadge = document.getElementById('todo-detail-badge');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentFilter = 'all';
  
  let todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS)) || [
    { id: 1, text: "Finish presentation outline", completed: false },
    { id: 2, text: "Review team comments on dashboard", completed: true },
    { id: 3, text: "Schedule dentist appointment", completed: false }
  ];
  
  function saveAndRender() {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
    render();
    updateDashboardBadges();
  }
  
  function addTodo() {
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;
    
    todos.push({
      id: Date.now(),
      text: text,
      completed: false
    });
    
    inputField.value = '';
    saveAndRender();
    showToast('Task added successfully');
  }
  
  if (addBtn) addBtn.addEventListener('click', addTodo);
  if (inputField) {
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  }
  
  window.deleteTodo = function(id) {
    todos = todos.filter(t => t.id !== id);
    saveAndRender();
    showToast('Task deleted', 'warning');
  };
  
  window.toggleTodo = function(id) {
    todos = todos.map(t => {
      if (t.id === id) t.completed = !t.completed;
      return t;
    });
    saveAndRender();
  };
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        render();
      });
    });
  }
  
  function render() {
    const activeTodos = todos.filter(t => !t.completed);
    if (detailBadge) detailBadge.textContent = `${activeTodos.length} Active`;
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    let filtered = todos;
    if (currentFilter === 'active') {
      filtered = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
      filtered = todos.filter(t => t.completed);
    }
    
    if (filtered.length === 0) {
      listContainer.innerHTML = `<li class="todo-item-li" style="justify-content:center; color:var(--text-muted); font-style:italic;">No tasks under this filter.</li>`;
      return;
    }
    
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item-li';
      li.innerHTML = `
        <div class="todo-item-li-left">
          <label class="checkbox-container">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span class="checkmark"></span>
            <span class="goal-text">${todo.text}</span>
          </label>
        </div>
        <button class="todo-delete-btn" onclick="deleteTodo(${todo.id})" aria-label="Delete task">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      `;
      listContainer.appendChild(li);
    });
  }
  
  render();
}

// --- DAILY PLANNER ---
function initPlannerWidget() {
  const addBtn = document.getElementById('add-planner-item-btn');
  const timeField = document.getElementById('planner-time-field');
  const descField = document.getElementById('planner-desc-field');
  const listContainer = document.getElementById('planner-timeline-list');
  const detailBadge = document.getElementById('planner-detail-badge');
  
  let events = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANNER)) || [
    { id: 1, time: "09:00", text: "Morning standup & coffee" },
    { id: 2, time: "11:30", text: "Productivity project revision" },
    { id: 3, time: "14:00", text: "Review designs with team" }
  ];
  
  function saveAndRender() {
    localStorage.setItem(STORAGE_KEYS.PLANNER, JSON.stringify(events));
    render();
    updateDashboardBadges();
  }
  
  function addEvent() {
    if (!timeField || !descField) return;
    const time = timeField.value;
    const text = descField.value.trim();
    if (!time || !text) return;
    
    events.push({
      id: Date.now(),
      time: time,
      text: text
    });
    
    events.sort((a, b) => a.time.localeCompare(b.time));
    descField.value = '';
    saveAndRender();
    showToast('Scheduled event added');
  }
  
  if (addBtn) addBtn.addEventListener('click', addEvent);
  if (descField) {
    descField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addEvent();
    });
  }
  
  window.deletePlannerEvent = function(id) {
    events = events.filter(e => e.id !== id);
    saveAndRender();
    showToast('Event removed', 'warning');
  };
  
  function formatTime12(timeString) {
    const [h, m] = timeString.split(':');
    const hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${m} ${ampm}`;
  }
  
  function render() {
    if (detailBadge) detailBadge.textContent = `${events.length} Events`;
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    const now = new Date();
    const currentHourString = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    
    let nextEvent = null;
    for (let i = 0; i < events.length; i++) {
      if (events[i].time >= currentHourString) {
        nextEvent = events[i];
        break;
      }
    }
    if (!nextEvent && events.length > 0) nextEvent = events[0];
    
    if (events.length === 0) {
      listContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding: 10px; font-style:italic;">No scheduled events yet. Set your daily agenda!</div>`;
      return;
    }
    
    events.forEach(event => {
      const isEventActive = nextEvent && nextEvent.id === event.id;
      const item = document.createElement('div');
      item.className = `planner-time-block ${isEventActive ? 'active' : ''}`;
      item.innerHTML = `
        <div class="planner-time-card">
          <div class="planner-card-text">
            <span class="planner-card-time">${formatTime12(event.time)}</span>
            <span class="planner-card-desc">${event.text}</span>
          </div>
          <button class="todo-delete-btn" onclick="deletePlannerEvent(${event.id})" aria-label="Delete event">
            <i class="ri-close-line"></i>
          </button>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }
  
  render();
}

// --- POMODORO TIMER WORKSPACE ---
function initPomodoroWidget() {
  const startBtn = document.getElementById('start-pomodoro');
  const pauseBtn = document.getElementById('pause-pomodoro');
  const resetBtn = document.getElementById('reset-pomodoro');
  const display = document.getElementById('pomodoro-time');
  const statusBadge = document.getElementById('pomodoro-status');
  const progressPath = document.getElementById('pomodoro-progress');
  
  const workInput = document.getElementById('work-duration-input');
  const breakInput = document.getElementById('break-duration-input');
  
  let timer = null;
  let isWorkSession = true;
  
  let focusDuration = (workInput ? parseInt(workInput.value) : 25) * 60;
  let breakDuration = (breakInput ? parseInt(breakInput.value) : 5) * 60;
  let timeLeft = focusDuration;
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius; 
  
  if (progressPath) {
    progressPath.style.strokeDasharray = circumference;
    progressPath.style.strokeDashoffset = circumference;
  }
  
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (display) display.textContent = displayString;
    
    if (progressPath) {
      const activeTotal = isWorkSession ? focusDuration : breakDuration;
      const percent = timeLeft / activeTotal;
      progressPath.style.strokeDashoffset = circumference - (percent * circumference);
    }
  }
  
  function applyInputs() {
    if (timer) return;
    focusDuration = (workInput ? parseInt(workInput.value) || 25 : 25) * 60;
    breakDuration = (breakInput ? parseInt(breakInput.value) || 5 : 5) * 60;
    timeLeft = isWorkSession ? focusDuration : breakDuration;
    updateDisplay();
  }
  
  if (workInput) workInput.addEventListener('change', applyInputs);
  if (breakInput) breakInput.addEventListener('change', applyInputs);
  
  function startTimer() {
    if (timer) return;
    
    if (workInput) workInput.disabled = true;
    if (breakInput) breakInput.disabled = true;
    
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        
        if (isWorkSession) {
          showToast('Time is up! Work session finished. Take a break!', 'success');
          isWorkSession = false;
          timeLeft = breakDuration;
          if (statusBadge) statusBadge.textContent = 'Break Session';
        } else {
          showToast('Break is over! Focus session started.', 'info');
          isWorkSession = true;
          timeLeft = focusDuration;
          if (statusBadge) statusBadge.textContent = 'Focus Session';
        }
        
        resetControls();
        updateDisplay();
      }
    }, 1000);
    
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'flex';
    if (statusBadge) statusBadge.textContent = isWorkSession ? 'Focus Session' : 'Break Session';
    if (display) display.classList.add('timer-pulse');
  }
  
  function pauseTimer() {
    clearInterval(timer);
    timer = null;
    
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (startBtn) startBtn.style.display = 'flex';
    if (statusBadge) statusBadge.textContent = 'Paused';
    if (display) display.classList.remove('timer-pulse');
  }
  
  function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorkSession = true;
    
    if (workInput) workInput.disabled = false;
    if (breakInput) breakInput.disabled = false;
    
    focusDuration = (workInput ? parseInt(workInput.value) || 25 : 25) * 60;
    breakDuration = (breakInput ? parseInt(breakInput.value) || 5 : 5) * 60;
    timeLeft = focusDuration;
    
    resetControls();
    updateDisplay();
    if (statusBadge) statusBadge.textContent = 'Idle';
    if (display) display.classList.remove('timer-pulse');
  }
  
  function resetControls() {
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (startBtn) startBtn.style.display = 'flex';
  }
  
  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);
  
  updateDisplay();
}

// --- DAILY GOALS ---
function initGoalsWidget() {
  const container = document.getElementById('goals-list-container');
  const badge = document.getElementById('goals-progress-badge');
  const progressFill = document.getElementById('goals-progress-fill');
  
  const goalInput = document.getElementById('goal-input-field');
  const addGoalBtn = document.getElementById('add-goal-btn');
  
  let goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || [
    { id: 'goal-1', text: "Project X Proposal", completed: false },
    { id: 'goal-2', text: "Client Workshop Prep", completed: false },
    { id: 'goal-3', text: "Review code submissions", completed: true }
  ];
  
  function updateProgress() {
    if (goals.length === 0) {
      if (badge) badge.textContent = `0 Completed`;
      if (progressFill) progressFill.style.width = '0%';
      return;
    }
    const completed = goals.filter(g => g.completed).length;
    if (badge) badge.textContent = `${completed}/${goals.length} Completed`;
    if (progressFill) {
      const percentage = (completed / goals.length) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }
  
  function saveGoals() {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    updateProgress();
    updateDashboardBadges();
  }
  
  window.toggleGoal = function(id) {
    goals = goals.map(g => {
      if (g.id === id) g.completed = !g.completed;
      return g;
    });
    saveGoals();
  };
  
  window.deleteGoal = function(id) {
    goals = goals.filter(g => g.id !== id);
    saveGoals();
    renderGoals();
    showToast('Daily goal deleted', 'warning');
  };
  
  function addGoal() {
    if (!goalInput) return;
    const goalText = goalInput.value.trim();
    if (!goalText) return;
    
    const newId = `goal-${Date.now()}`;
    goals.push({
      id: newId,
      text: goalText,
      completed: false
    });
    
    goalInput.value = '';
    saveGoals();
    renderGoals();
    showToast('Daily goal added');
  }
  
  if (addGoalBtn) addGoalBtn.addEventListener('click', addGoal);
  if (goalInput) {
    goalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addGoal();
    });
  }
  
  function renderGoals() {
    updateProgress();
    if (!container) return;
    container.innerHTML = '';
    
    if (goals.length === 0) {
      container.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-style:italic; padding: 10px;">No daily goals set yet. Let's outline one!</div>`;
      return;
    }
    
    goals.forEach(goal => {
      const item = document.createElement('div');
      item.className = 'todo-item-li';
      item.innerHTML = `
        <div class="todo-item-li-left">
          <label class="checkbox-container">
            <input type="checkbox" class="goal-checkbox" id="${goal.id}" ${goal.completed ? 'checked' : ''} onchange="toggleGoal('${goal.id}')">
            <span class="checkmark"></span>
            <span class="goal-text">${goal.text}</span>
          </label>
        </div>
        <button class="todo-delete-btn" onclick="deleteGoal('${goal.id}')" aria-label="Delete goal">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      `;
      container.appendChild(item);
    });
  }
  
  renderGoals();
}











// --- DOM CONTENT LOADED INITIALIZER ---
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initWeather();
  updateBackgroundAndWeather();
  
  // Initialize routers
  initSpaRouting();
  
  // Widget initializations
  initMotivationWidget();
  initTodoWidget();
  initPlannerWidget();
  initPomodoroWidget();
  initGoalsWidget();
});
