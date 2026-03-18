/**
 * LearnSphere — script.js
 * Full application logic: state management, scheduling engine,
 * AI chat, analytics, notifications, dark mode, and more.
 */

/* ============================================================
   COURSE DATA
   ============================================================ */
const COURSES = [
  {
    id: 'py101', title: 'Python Fundamentals', emoji: '🐍',
    interest: 'Coding', difficulty: 'Beginner', duration: '6 weeks', durationWeeks: 6,
    desc: 'Learn Python from scratch. Variables, loops, functions, and OOP with real projects.',
    jobs: ['Junior Developer', 'Data Analyst', 'Automation Engineer', 'QA Engineer'],
    hoursPerWeek: 3, color: '#3b82f6', weight: 1,
  },
  {
    id: 'js201', title: 'JavaScript & DOM', emoji: '⚡',
    interest: 'Coding', difficulty: 'Intermediate', duration: '8 weeks', durationWeeks: 8,
    desc: 'Build interactive web pages using modern JavaScript, ES6+, and DOM manipulation.',
    jobs: ['Frontend Developer', 'Web Developer', 'React Developer'],
    hoursPerWeek: 4, color: '#f59e0b', weight: 2,
  },
  {
    id: 'react301', title: 'React.js Mastery', emoji: '⚛️',
    interest: 'Coding', difficulty: 'Advanced', duration: '10 weeks', durationWeeks: 10,
    desc: 'Master React hooks, state management, and build production-ready apps.',
    jobs: ['React Developer', 'Frontend Engineer', 'Full Stack Developer'],
    hoursPerWeek: 5, color: '#06b6d4', weight: 3,
  },
  {
    id: 'ds401', title: 'Data Science with Python', emoji: '📊',
    interest: 'Coding', difficulty: 'Intermediate', duration: '9 weeks', durationWeeks: 9,
    desc: 'Pandas, NumPy, Matplotlib, and machine learning basics with real datasets.',
    jobs: ['Data Scientist', 'ML Engineer', 'Business Analyst', 'Data Analyst'],
    hoursPerWeek: 5, color: '#8b5cf6', weight: 2,
  },
  {
    id: 'gd101', title: 'Graphic Design Basics', emoji: '🎨',
    interest: 'Graphic Designing', difficulty: 'Beginner', duration: '4 weeks', durationWeeks: 4,
    desc: 'Principles of design: color theory, typography, layout, and visual hierarchy.',
    jobs: ['Graphic Designer', 'Brand Designer', 'Marketing Designer'],
    hoursPerWeek: 2, color: '#ec4899', weight: 1,
  },
  {
    id: 'ps201', title: 'Adobe Photoshop Pro', emoji: '🖼️',
    interest: 'Graphic Designing', difficulty: 'Intermediate', duration: '6 weeks', durationWeeks: 6,
    desc: 'Photo editing, compositing, retouching, and digital art creation in Photoshop.',
    jobs: ['Photo Editor', 'Creative Retoucher', 'Digital Artist', 'Social Media Designer'],
    hoursPerWeek: 3, color: '#3b82f6', weight: 2,
  },
  {
    id: 'ill301', title: 'Illustrator & Vector Art', emoji: '✏️',
    interest: 'Graphic Designing', difficulty: 'Intermediate', duration: '5 weeks', durationWeeks: 5,
    desc: 'Create scalable vector graphics, logos, and illustrations in Adobe Illustrator.',
    jobs: ['Logo Designer', 'Brand Identity Designer', 'Illustrator', 'Packaging Designer'],
    hoursPerWeek: 3, color: '#f59e0b', weight: 2,
  },
  {
    id: 'ui101', title: 'UI Design Fundamentals', emoji: '🎯',
    interest: 'UI/UX', difficulty: 'Beginner', duration: '5 weeks', durationWeeks: 5,
    desc: 'Design beautiful, usable interfaces. Learn spacing, grids, components, and visual design.',
    jobs: ['UI Designer', 'Product Designer', 'Visual Designer'],
    hoursPerWeek: 3, color: '#22d3a2', weight: 1,
  },
  {
    id: 'ux201', title: 'UX Research & Strategy', emoji: '🔬',
    interest: 'UI/UX', difficulty: 'Intermediate', duration: '7 weeks', durationWeeks: 7,
    desc: 'User research methods, personas, journey maps, usability testing, and information architecture.',
    jobs: ['UX Researcher', 'UX Designer', 'Product Manager', 'Service Designer'],
    hoursPerWeek: 4, color: '#6c63ff', weight: 2,
  },
  {
    id: 'figma301', title: 'Figma Advanced', emoji: '🟣',
    interest: 'UI/UX', difficulty: 'Advanced', duration: '6 weeks', durationWeeks: 6,
    desc: 'Master Figma: auto-layout, components, variants, prototyping and design systems.',
    jobs: ['Product Designer', 'Lead UI Designer', 'Design System Engineer'],
    hoursPerWeek: 4, color: '#8b5cf6', weight: 3,
  },
  {
    id: 'video101', title: 'Video Editing Basics', emoji: '🎬',
    interest: 'Video Production', difficulty: 'Beginner', duration: '4 weeks', durationWeeks: 4,
    desc: 'Learn video editing with Premiere Pro or DaVinci Resolve. Cuts, transitions, audio.',
    jobs: ['Video Editor', 'Content Creator', 'Social Media Manager'],
    hoursPerWeek: 3, color: '#ef4444', weight: 1,
  },
  {
    id: 'motion201', title: 'Motion Graphics', emoji: '🌀',
    interest: 'Video Production', difficulty: 'Intermediate', duration: '7 weeks', durationWeeks: 7,
    desc: 'After Effects animations, kinetic typography, logo reveals, and motion design.',
    jobs: ['Motion Designer', 'Broadcast Designer', 'VFX Artist'],
    hoursPerWeek: 4, color: '#06b6d4', weight: 2,
  },
  {
    id: 'mk101', title: 'Digital Marketing', emoji: '📢',
    interest: 'Marketing', difficulty: 'Beginner', duration: '6 weeks', durationWeeks: 6,
    desc: 'SEO, social media marketing, email campaigns, Google Ads, and analytics basics.',
    jobs: ['Digital Marketer', 'SEO Specialist', 'Growth Hacker', 'Content Strategist'],
    hoursPerWeek: 3, color: '#f59e0b', weight: 1,
  },
  {
    id: 'seo201', title: 'SEO & Content Strategy', emoji: '🔍',
    interest: 'Marketing', difficulty: 'Intermediate', duration: '5 weeks', durationWeeks: 5,
    desc: 'Technical SEO, keyword strategy, content calendars, link building, and analytics.',
    jobs: ['SEO Manager', 'Content Manager', 'Digital Strategist'],
    hoursPerWeek: 3, color: '#22d3a2', weight: 2,
  },
  {
    id: 'cyber101', title: 'Cybersecurity Fundamentals', emoji: '🔐',
    interest: 'Coding', difficulty: 'Intermediate', duration: '8 weeks', durationWeeks: 8,
    desc: 'Network security, ethical hacking basics, cryptography, and threat analysis.',
    jobs: ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Security Engineer'],
    hoursPerWeek: 5, color: '#ef4444', weight: 2,
  },
  {
    id: 'ai101', title: 'AI & Machine Learning', emoji: '🤖',
    interest: 'Coding', difficulty: 'Advanced', duration: '12 weeks', durationWeeks: 12,
    desc: 'Deep learning, neural networks, NLP, and deploying ML models with Python and TensorFlow.',
    jobs: ['AI Engineer', 'ML Researcher', 'Data Scientist', 'AI Product Manager'],
    hoursPerWeek: 6, color: '#8b5cf6', weight: 3,
  },
];

const INTERESTS = [
  { id: 'Coding', label: '💻 Coding' },
  { id: 'Graphic Designing', label: '🎨 Graphic Design' },
  { id: 'UI/UX', label: '🎯 UI/UX Design' },
  { id: 'Video Production', label: '🎬 Video Production' },
  { id: 'Marketing', label: '📢 Marketing' },
];

/* Time slots for scheduler */
const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

/* ============================================================
   STATE
   ============================================================ */
let state = {
  user: null,
  interests: [],
  enrolled: [],   // array of course ids
  schedule: [],   // generated schedule blocks
  notifications: [],
  darkMode: true,
  activeView: 'overview',
  searchQuery: '',
  filterInterest: '',
  filterDifficulty: '',
  filterDuration: '',
  progress: {},   // courseId → 0–100
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  if (document.querySelector('.dashboard-page')) {
    initDashboard();
  }
  initNavigation();
});

function loadState() {
  const user = JSON.parse(localStorage.getItem('ls_user') || 'null');
  const interests = JSON.parse(localStorage.getItem('ls_interests') || '[]');
  const enrolled = JSON.parse(localStorage.getItem('ls_enrolled') || '[]');
  const dark = localStorage.getItem('ls_dark');
  const progress = JSON.parse(localStorage.getItem('ls_progress') || '{}');
  const notifs = JSON.parse(localStorage.getItem('ls_notifs') || 'null');

  state.user = user;
  state.interests = interests;
  state.enrolled = enrolled;
  state.darkMode = dark !== 'false';
  state.progress = progress;

  if (!state.progress || Object.keys(state.progress).length === 0) {
    // Simulate some progress
    enrolled.forEach(id => {
      state.progress[id] = Math.floor(Math.random() * 85) + 5;
    });
    saveState();
  }

  state.notifications = notifs || [
    { id: 1, text: '✨ New course: AI & Machine Learning added!', time: '2m ago', read: false },
    { id: 2, text: '📅 Your schedule was auto-optimized', time: '1h ago', read: false },
    { id: 3, text: '🎉 You\'re 70% done with Python Fundamentals!', time: '3h ago', read: false },
  ];

  applyTheme();
}

function saveState() {
  localStorage.setItem('ls_enrolled', JSON.stringify(state.enrolled));
  localStorage.setItem('ls_interests', JSON.stringify(state.interests));
  localStorage.setItem('ls_dark', state.darkMode);
  localStorage.setItem('ls_progress', JSON.stringify(state.progress));
  localStorage.setItem('ls_notifs', JSON.stringify(state.notifications));
}

/* ============================================================
   DASHBOARD INIT
   ============================================================ */
function initDashboard() {
  if (!state.user) { window.location.href = 'index.html'; return; }
  
  document.getElementById('userName').textContent = state.user.name;
  document.getElementById('avatarBtn').textContent = state.user.avatar || state.user.name.charAt(0);

  // Show interests modal if no interests set
  if (state.interests.length === 0) {
    renderInterestsPicker();
    document.getElementById('interestsModal').style.display = 'flex';
  } else {
    document.getElementById('interestsModal').style.display = 'none';
  }

  renderAll();
  initCharts();
  renderNotifications();
  updateBadge();

  // Simulate live availability updates
  setInterval(() => {
    const randCourse = COURSES[Math.floor(Math.random() * COURSES.length)];
    addNotification(`🔴 "${randCourse.title}" has limited spots — ${Math.floor(Math.random()*5)+1} left!`);
  }, 45000);
}

function renderAll() {
  renderStats();
  renderRecommended();
  renderCourseGrid();
  renderInterestTags();
  renderSchedule();
  renderEnrolled();
  renderAnalytics();
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNavigation() {
  if (!document.querySelector('.sidebar-nav')) return;
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const view = item.dataset.view;
      switchView(view);
    });
  });
}

function switchView(view) {
  state.activeView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('view-' + view);
  if (el) el.classList.add('active');
  const nav = document.querySelector(`.nav-item[data-view="${view}"]`);
  if (nav) nav.classList.add('active');
  // Close sidebar on mobile
  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

/* ============================================================
   THEME
   ============================================================ */
function toggleDark() {
  state.darkMode = !state.darkMode;
  applyTheme();
  saveState();
}

function applyTheme() {
  if (state.darkMode) {
    document.body.classList.remove('light');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '🌙';
  } else {
    document.body.classList.add('light');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
}

/* ============================================================
   INTERESTS
   ============================================================ */
function renderInterestsPicker() {
  const container = document.getElementById('interestsPicker');
  if (!container) return;
  container.innerHTML = INTERESTS.map(i => `
    <div class="interest-chip ${state.interests.includes(i.id) ? 'selected' : ''}"
         onclick="toggleInterest('${i.id}', this)">${i.label}</div>
  `).join('');
}

function toggleInterest(id, el) {
  if (state.interests.includes(id)) {
    state.interests = state.interests.filter(i => i !== id);
    el.classList.remove('selected');
  } else {
    state.interests.push(id);
    el.classList.add('selected');
  }
}

function saveInterests() {
  if (state.interests.length === 0) {
    showToast('Please select at least one interest!', 'warning');
    return;
  }
  localStorage.setItem('ls_interests', JSON.stringify(state.interests));
  document.getElementById('interestsModal').style.display = 'none';
  renderAll();
  showToast(`🎯 Dashboard personalized for ${state.interests.join(', ')}!`, 'success');
}

/* ============================================================
   STATS
   ============================================================ */
function renderStats() {
  const enrolled = state.enrolled.length;
  const hours = state.enrolled.reduce((sum, id) => {
    const c = COURSES.find(c => c.id === id);
    return sum + (c ? c.hoursPerWeek : 0);
  }, 0);
  const completed = Object.values(state.progress).filter(p => p >= 100).length;
  const avgProgress = state.enrolled.length > 0
    ? Math.round(state.enrolled.reduce((sum, id) => sum + (state.progress[id] || 0), 0) / state.enrolled.length)
    : 0;

  animateNumber('enrolledCount', enrolled);
  animateNumber('hoursCount', hours, 'h');
  animateNumber('completedCount', completed);
  animateNumber('progressAvg', avgProgress, '%');
}

function animateNumber(id, target, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 20);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 40);
}

/* ============================================================
   COURSE RENDERING
   ============================================================ */
function getCoursesByInterests() {
  if (state.interests.length === 0) return COURSES.slice(0, 8);
  return COURSES.filter(c => state.interests.includes(c.interest));
}

function renderRecommended() {
  const container = document.getElementById('recommendedCourses');
  if (!container) return;
  const courses = getCoursesByInterests()
    .filter(c => !state.enrolled.includes(c.id))
    .slice(0, 4);
  if (courses.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">🎉</div><h3>You\'re enrolled in all recommended courses!</h3></div>';
    return;
  }
  container.innerHTML = courses.map(c => renderCourseCard(c)).join('');
}

function renderCourseGrid() {
  const container = document.getElementById('courseGrid');
  if (!container) return;

  // Skeleton loading briefly
  container.innerHTML = Array(6).fill('<div class="skeleton skeleton-card"></div>').join('');

  setTimeout(() => {
    let courses = state.interests.length > 0 && state.filterInterest
      ? COURSES.filter(c => c.interest === state.filterInterest)
      : state.interests.length > 0
        ? getCoursesByInterests()
        : COURSES;

    // Apply search
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      courses = courses.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.jobs.some(j => j.toLowerCase().includes(q)) ||
        c.interest.toLowerCase().includes(q)
      );
    }

    // Difficulty filter
    if (state.filterDifficulty) {
      courses = courses.filter(c => c.difficulty === state.filterDifficulty);
    }

    // Duration filter
    if (state.filterDuration === 'short') courses = courses.filter(c => c.durationWeeks <= 4);
    else if (state.filterDuration === 'medium') courses = courses.filter(c => c.durationWeeks >= 5 && c.durationWeeks <= 8);
    else if (state.filterDuration === 'long') courses = courses.filter(c => c.durationWeeks >= 9);

    if (courses.length === 0) {
      container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>No courses match your filters</h3><p>Try adjusting your search or filters</p></div>';
      return;
    }
    container.innerHTML = courses.map(c => renderCourseCard(c)).join('');
  }, 600);
}

function renderCourseCard(course) {
  const isEnrolled = state.enrolled.includes(course.id);
  const bannerGradient = `linear-gradient(135deg, ${course.color}22, ${course.color}44)`;
  return `
    <div class="course-card ${isEnrolled ? 'enrolled' : ''}" id="card-${course.id}">
      <div class="course-banner" style="background:${bannerGradient}">
        ${course.emoji}
        <span class="course-badge badge-${course.difficulty.toLowerCase()}">${course.difficulty}</span>
        ${isEnrolled ? '<span class="course-enrolled-tag">✓ Enrolled</span>' : ''}
      </div>
      <div class="course-body">
        <div class="course-title">${course.title}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-meta">
          <span class="meta-tag">⏱ ${course.duration}</span>
          <span class="meta-tag">📚 ${course.hoursPerWeek}h/wk</span>
          <span class="meta-tag">💼 ${course.jobs.length} careers</span>
        </div>
      </div>
      <div class="course-actions">
        <button class="btn-enroll ${isEnrolled ? 'enrolled' : ''}" onclick="toggleEnroll('${course.id}')">
          ${isEnrolled ? '✓ Enrolled' : '+ Enroll'}
        </button>
        <button class="btn-details" onclick="showCourseDetail('${course.id}')">Details</button>
      </div>
    </div>
  `;
}

/* ============================================================
   ENROLLMENT
   ============================================================ */
function toggleEnroll(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  if (state.enrolled.includes(courseId)) {
    // Remove
    state.enrolled = state.enrolled.filter(id => id !== courseId);
    delete state.progress[courseId];
    state.schedule = generateSchedule();
    saveState();
    renderAll();
    showToast(`📚 "${course.title}" removed from your courses`, 'info');
  } else {
    // Duplicate check
    if (state.enrolled.includes(courseId)) {
      showToast('You\'re already enrolled in this course!', 'warning'); return;
    }
    state.enrolled.push(courseId);
    state.progress[courseId] = Math.floor(Math.random() * 20); // Starting progress
    state.schedule = generateSchedule();
    checkScheduleConflicts();
    saveState();
    renderAll();
    updateCharts();
    showToast(`🎉 Enrolled in "${course.title}"!`, 'success');
    addNotification(`📚 You enrolled in "${course.title}"`);
  }
}

function removeCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  state.enrolled = state.enrolled.filter(id => id !== courseId);
  delete state.progress[courseId];
  state.schedule = generateSchedule();
  saveState();
  renderAll();
  updateCharts();
  showToast(`Removed "${course.title}"`, 'info');
}

/* ============================================================
   INTEREST TAGS (filter bar)
   ============================================================ */
function renderInterestTags() {
  const container = document.getElementById('interestTags');
  if (!container) return;
  const tags = ['All', ...INTERESTS.map(i => i.id)];
  container.innerHTML = tags.map(t => `
    <div class="filter-tag ${state.filterInterest === (t === 'All' ? '' : t) ? 'active' : ''}"
         onclick="setInterestFilter('${t === 'All' ? '' : t}')">
      ${t === 'All' ? 'All Courses' : INTERESTS.find(i => i.id === t)?.label || t}
    </div>
  `).join('');
}

function setInterestFilter(interest) {
  state.filterInterest = interest;
  renderInterestTags();
  renderCourseGrid();
}

function applyFilters() {
  state.filterDifficulty = document.getElementById('filterDifficulty')?.value || '';
  state.filterDuration = document.getElementById('filterDuration')?.value || '';
  renderCourseGrid();
}

function clearFilters() {
  state.filterDifficulty = '';
  state.filterDuration = '';
  state.filterInterest = '';
  state.searchQuery = '';
  if (document.getElementById('filterDifficulty')) document.getElementById('filterDifficulty').value = '';
  if (document.getElementById('filterDuration')) document.getElementById('filterDuration').value = '';
  if (document.getElementById('globalSearch')) document.getElementById('globalSearch').value = '';
  renderInterestTags();
  renderCourseGrid();
}

/* ============================================================
   SEARCH (with debounce)
   ============================================================ */
let searchTimer;
function handleSearchDebounce(val) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.searchQuery = val.trim();
    if (state.searchQuery) {
      switchView('courses');
    }
    renderCourseGrid();
  }, 350);
}

/* ============================================================
   SMART SCHEDULING ENGINE
   Advanced constraint-based scheduler:
   - Max 3 hours/day
   - No back-to-back heavy (weight 3) courses
   - Priority-based (advanced courses first in morning)
   - Balanced daily workload
   - Auto-breaks after 2 consecutive sessions
   ============================================================ */
function generateSchedule() {
  if (state.enrolled.length === 0) return [];

  const enrolledCourses = state.enrolled
    .map(id => COURSES.find(c => c.id === id))
    .filter(Boolean)
    .sort((a, b) => b.weight - a.weight); // Heavy courses get priority morning slots

  const blocks = [];
  const dayLoad = {}; // day → hours scheduled
  const dayLastWeight = {}; // day → last scheduled course weight
  const used = new Set(); // "day-timeSlot" used

  DAYS.forEach(d => { dayLoad[d] = 0; dayLastWeight[d] = 0; });

  let slotColors = ['slot-a', 'slot-b', 'slot-c', 'slot-d'];
  let colorIdx = 0;

  enrolledCourses.forEach(course => {
    let placed = false;

    for (let di = 0; di < DAYS.length && !placed; di++) {
      const day = DAYS[di];

      // Workload balance: skip if day already at max
      if (dayLoad[day] >= 3) continue;

      // No back-to-back heavy courses
      if (course.weight === 3 && dayLastWeight[day] === 3) continue;

      // Find available time slot
      const slotsForDay = course.weight >= 2 ? TIME_SLOTS.slice(0, 5) : TIME_SLOTS;
      for (let si = 0; si < slotsForDay.length; si++) {
        const slot = slotsForDay[si];
        const key = `${day}-${slot}`;
        if (!used.has(key)) {
          used.add(key);

          // Insert break if needed (after 2 consecutive slots)
          const prevSlotIdx = si > 0 ? si - 1 : -1;
          if (prevSlotIdx >= 0) {
            const prevKey = `${day}-${slotsForDay[prevSlotIdx]}`;
            if (used.has(prevKey) && !used.has(`break-${prevKey}`)) {
              blocks.push({
                day, time: slotsForDay[prevSlotIdx],
                courseId: 'BREAK', courseName: '☕ Break',
                type: 'break', colorClass: 'slot-b',
              });
              used.add(`break-${prevKey}`);
            }
          }

          blocks.push({
            day, time: slot,
            courseId: course.id,
            courseName: course.title,
            emoji: course.emoji,
            difficulty: course.difficulty,
            type: 'study',
            colorClass: slotColors[colorIdx % slotColors.length],
          });
          colorIdx++;
          dayLoad[day] += course.hoursPerWeek / 5;
          dayLastWeight[day] = course.weight;
          placed = true;
          break;
        }
      }
    }

    // If didn't place in any slot, add overflow warning
    if (!placed) {
      blocks.push({
        day: 'Overflow', time: '—',
        courseId: course.id, courseName: course.title,
        emoji: course.emoji, type: 'overflow', colorClass: 'slot-c',
      });
    }
  });

  return blocks;
}

function regenerateSchedule() {
  state.schedule = generateSchedule();
  renderSchedule();
  showToast('📅 Schedule regenerated!', 'success');
}

function checkScheduleConflicts() {
  const overflow = state.schedule.filter(b => b.type === 'overflow');
  if (overflow.length > 0) {
    addNotification(`⚠️ Schedule conflict: ${overflow.map(b => b.courseName).join(', ')} couldn't be scheduled this week`);
    showToast('⚠️ Some courses have scheduling conflicts — check Schedule tab', 'warning');
  }
}

function renderSchedule() {
  const container = document.getElementById('scheduleWrap');
  const warnContainer = document.getElementById('scheduleWarnings');
  if (!container) return;

  if (state.schedule.length === 0 && state.enrolled.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📅</div><h3>No courses enrolled yet</h3><p>Enroll in courses to auto-generate your schedule</p></div>';
    if (warnContainer) warnContainer.innerHTML = '';
    return;
  }

  if (state.schedule.length === 0) {
    state.schedule = generateSchedule();
  }

  // Warnings
  const overflow = state.schedule.filter(b => b.type === 'overflow');
  if (warnContainer) {
    warnContainer.innerHTML = overflow.length > 0
      ? overflow.map(b => `<div class="warning">⚠️ "${b.courseName}" couldn't be auto-scheduled — please adjust manually</div>`).join('')
      : '';
  }

  // Build day cards
  const byDay = {};
  DAYS.forEach(d => byDay[d] = []);
  state.schedule.filter(b => b.type !== 'overflow').forEach(b => {
    if (byDay[b.day]) byDay[b.day].push(b);
  });

  container.innerHTML = DAYS.map(day => {
    const blocks = byDay[day];
    if (blocks.length === 0) {
      return `<div class="schedule-day-card">
        <h4>${day}</h4>
        <div class="schedule-slots"><span style="color:var(--text3);font-size:13px">Rest day 😴</span></div>
      </div>`;
    }
    const blocksHtml = blocks.map(b => `
      <div class="time-block ${b.type === 'break' ? 'break-block' : ''}">
        <span class="time">${b.time}</span>
        <span class="course-name">${b.emoji || ''} ${b.courseName}</span>
        ${b.difficulty ? `<span class="block-type">${b.difficulty}</span>` : ''}
      </div>
    `).join('');
    return `<div class="schedule-day-card">
      <h4>${day} <span style="float:right;font-size:11px;color:var(--text3)">${blocks.filter(b=>b.type==='study').length} sessions</span></h4>
      <div class="schedule-slots">${blocksHtml}</div>
    </div>`;
  }).join('');
}

/* ============================================================
   ENROLLED LIST
   ============================================================ */
function renderEnrolled() {
  const container = document.getElementById('enrolledList');
  if (!container) return;

  if (state.enrolled.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📚</div><h3>No courses yet</h3><p>Head to the Course Library to get started!</p></div>';
    return;
  }

  container.innerHTML = state.enrolled.map(id => {
    const course = COURSES.find(c => c.id === id);
    if (!course) return '';
    const progress = state.progress[id] || 0;
    const weeksLeft = Math.ceil(course.durationWeeks * (1 - progress / 100));
    return `
      <div class="enrolled-card">
        <div class="enrolled-icon">${course.emoji}</div>
        <div class="enrolled-info">
          <h3>${course.title}</h3>
          <p>${course.difficulty} · ${course.duration} · ${course.hoursPerWeek}h/week</p>
          <div class="progress-bar-wrap">
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width:${progress}%"></div>
            </div>
            <div class="progress-label">${progress}% complete · ~${weeksLeft} weeks left</div>
          </div>
        </div>
        <div class="enrolled-actions">
          <button class="btn-remove" onclick="removeCourse('${id}')">✕ Remove</button>
        </div>
      </div>
    `;
  }).join('');
}

/* ============================================================
   ANALYTICS
   ============================================================ */
function renderAnalytics() {
  const container = document.getElementById('analyticsGrid');
  if (!container) return;

  const enrolled = state.enrolled.length;
  const totalHours = state.enrolled.reduce((s, id) => {
    const c = COURSES.find(c => c.id === id);
    return s + (c ? c.hoursPerWeek : 0);
  }, 0);
  const avgProgress = enrolled > 0
    ? Math.round(state.enrolled.reduce((s, id) => s + (state.progress[id] || 0), 0) / enrolled)
    : 0;

  container.innerHTML = `
    <div class="analytics-card">
      <h4>Courses Enrolled</h4>
      <div class="big-num" style="color:var(--accent2)">${enrolled}</div>
      <div class="trend">↑ Great start!</div>
    </div>
    <div class="analytics-card">
      <h4>Weekly Study Hours</h4>
      <div class="big-num" style="color:var(--green)">${totalHours}h</div>
      <div class="trend">↑ ${totalHours > 5 ? 'Above' : 'Below'} average</div>
    </div>
    <div class="analytics-card">
      <h4>Avg Progress</h4>
      <div class="big-num" style="color:var(--amber)">${avgProgress}%</div>
      <div class="trend">Keep going! 💪</div>
    </div>
  `;
}

/* ============================================================
   CHARTS (Chart.js)
   ============================================================ */
let chartInstances = {};

function initCharts() {
  renderSkillChart();
  renderTimeChart();
  renderProgressChart();
  renderPredictionChart();
  renderDiffChart();
}

function updateCharts() {
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  chartInstances = {};
  initCharts();
}

function getChartColors() {
  return state.darkMode
    ? { grid: 'rgba(255,255,255,0.05)', text: '#8a8fa8', bg: '#13161e' }
    : { grid: 'rgba(0,0,0,0.05)', text: '#555870', bg: '#ffffff' };
}

function renderSkillChart() {
  const canvas = document.getElementById('skillChart');
  if (!canvas) return;
  const cc = getChartColors();
  const interestCounts = {};
  INTERESTS.forEach(i => interestCounts[i.id] = 0);
  state.enrolled.forEach(id => {
    const c = COURSES.find(c => c.id === id);
    if (c && interestCounts[c.interest] !== undefined) interestCounts[c.interest]++;
  });
  const labels = Object.keys(interestCounts);
  const data = Object.values(interestCounts).map((v, i) => v * (15 + i * 10) + 10);
  chartInstances.skill = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: labels.map(l => l.split(' ')[0]),
      datasets: [{
        label: 'Skill Level',
        data,
        fill: true,
        backgroundColor: 'rgba(108,99,255,0.15)',
        borderColor: 'rgba(108,99,255,0.7)',
        pointBackgroundColor: '#6c63ff',
        tension: 0.3,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: cc.grid },
          grid: { color: cc.grid },
          pointLabels: { color: cc.text, font: { size: 11 } },
          ticks: { display: false },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

function renderTimeChart() {
  const canvas = document.getElementById('timeChart');
  if (!canvas) return;
  const cc = getChartColors();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = days.map(() => Math.floor(Math.random() * 4) + 1);
  chartInstances.time = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Hours',
        data,
        backgroundColor: days.map((_, i) => i < 5 ? 'rgba(108,99,255,0.7)' : 'rgba(108,99,255,0.25)'),
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: cc.grid }, ticks: { color: cc.text } },
        y: { grid: { color: cc.grid }, ticks: { color: cc.text }, max: 6, stepSize: 1 },
      },
    },
  });
}

function renderProgressChart() {
  const canvas = document.getElementById('progressChart');
  if (!canvas) return;
  const cc = getChartColors();
  const labels = state.enrolled.map(id => COURSES.find(c => c.id === id)?.title || id);
  const data = state.enrolled.map(id => state.progress[id] || 0);
  const colors = ['#6c63ff','#22d3a2','#f59e0b','#3b82f6','#ec4899','#06b6d4','#ef4444','#8b5cf6'];

  chartInstances.progress = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Progress (%)',
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length] + 'bb'),
        borderColor: labels.map((_, i) => colors[i % colors.length]),
        borderWidth: 2, borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: cc.grid }, ticks: { color: cc.text }, max: 100 },
        y: { grid: { color: cc.grid }, ticks: { color: cc.text, font: { size: 11 } } },
      },
    },
  });
}

function renderPredictionChart() {
  const canvas = document.getElementById('predictionChart');
  if (!canvas) return;
  const cc = getChartColors();
  const weeks = Array.from({ length: 8 }, (_, i) => `Wk ${i + 1}`);
  chartInstances.prediction = new Chart(canvas, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [{
        label: 'Predicted Progress',
        data: weeks.map((_, i) => Math.min(100, (i + 1) * 13 + Math.random() * 5)),
        fill: true,
        backgroundColor: 'rgba(34,211,162,0.1)',
        borderColor: 'rgba(34,211,162,0.8)',
        tension: 0.4, pointRadius: 4,
        pointBackgroundColor: '#22d3a2',
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: cc.grid }, ticks: { color: cc.text } },
        y: { grid: { color: cc.grid }, ticks: { color: cc.text }, max: 100 },
      },
    },
  });
}

function renderDiffChart() {
  const canvas = document.getElementById('diffChart');
  if (!canvas) return;
  const beg = state.enrolled.filter(id => COURSES.find(c => c.id === id)?.difficulty === 'Beginner').length;
  const mid = state.enrolled.filter(id => COURSES.find(c => c.id === id)?.difficulty === 'Intermediate').length;
  const adv = state.enrolled.filter(id => COURSES.find(c => c.id === id)?.difficulty === 'Advanced').length;
  chartInstances.diff = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Beginner', 'Intermediate', 'Advanced'],
      datasets: [{
        data: [beg || 1, mid || 1, adv || 1],
        backgroundColor: ['rgba(34,211,162,0.8)', 'rgba(245,158,11,0.8)', 'rgba(239,68,68,0.8)'],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getChartColors().text, padding: 16, font: { size: 12 } },
        },
      },
      cutout: '65%',
    },
  });
}

/* ============================================================
   COURSE DETAIL MODAL
   ============================================================ */
function showCourseDetail(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  const isEnrolled = state.enrolled.includes(courseId);
  const modal = document.getElementById('courseModal');
  const content = document.getElementById('courseModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="course-modal-header" style="background:linear-gradient(135deg,${course.color}22,${course.color}44)">
      <div class="course-modal-icon">${course.emoji}</div>
      <div class="course-modal-title">${course.title}</div>
      <div>
        <span class="course-badge badge-${course.difficulty.toLowerCase()}">${course.difficulty}</span>
      </div>
    </div>
    <div class="course-modal-body">
      <h4>About this course</h4>
      <p>${course.desc}</p>
      <h4>Duration & Commitment</h4>
      <p>${course.duration} · ${course.hoursPerWeek} hours per week · Total ~${course.durationWeeks * course.hoursPerWeek}h</p>
      <h4>Career Opportunities</h4>
      <div class="jobs-list">
        ${course.jobs.map(j => `<span class="job-chip">💼 ${j}</span>`).join('')}
      </div>
      <h4>Interest Category</h4>
      <p>${INTERESTS.find(i => i.id === course.interest)?.label || course.interest}</p>
    </div>
    <div class="course-modal-footer">
      <button class="close-modal" onclick="closeModal()">✕ Close</button>
      <button class="btn-primary" onclick="toggleEnroll('${courseId}'); closeModal();">
        ${isEnrolled ? '✕ Remove Course' : '+ Enroll Now'}
      </button>
    </div>
  `;
  modal.style.display = 'flex';
}

function closeModal() {
  const m = document.getElementById('courseModal');
  if (m) m.style.display = 'none';
}

// Close modal on overlay click
document.addEventListener('click', e => {
  const modal = document.getElementById('courseModal');
  if (e.target === modal) closeModal();
});

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function addNotification(text) {
  state.notifications.unshift({ id: Date.now(), text, time: 'Just now', read: false });
  if (state.notifications.length > 10) state.notifications.pop();
  updateBadge();
  renderNotifications();
  saveState();
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;
  list.innerHTML = state.notifications.map(n => `
    <div class="notif-item">
      <div>${n.text}</div>
      <div class="notif-time">${n.time}</div>
    </div>
  `).join('') || '<div class="notif-item">No notifications</div>';
}

function updateBadge() {
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  const unread = state.notifications.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.style.display = unread ? 'flex' : 'none';
}

function toggleNotifications() {
  const drawer = document.getElementById('notifDrawer');
  if (!drawer) return;
  drawer.classList.toggle('open');
  // Mark all as read
  state.notifications.forEach(n => n.read = true);
  updateBadge();
  saveState();
}

function clearNotifs() {
  state.notifications = [];
  renderNotifications();
  updateBadge();
  saveState();
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 280);
  }, 3500);
}

/* ============================================================
   AI CHAT ASSISTANT
   ============================================================ */
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatPanel');
  if (chatOpen) panel.classList.add('open');
  else panel.classList.remove('open');
}

function sendQuick(msg) {
  document.getElementById('chatInput').value = msg;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  appendChatMsg(msg, 'user');

  // Typing indicator
  const loadId = appendTyping();

  try {
    const enrolledCourses = state.enrolled.map(id => COURSES.find(c => c.id === id)?.title).filter(Boolean);
    const systemPrompt = `You are Sphere AI, a helpful learning assistant for the LearnSphere education platform.
The student's name is ${state.user?.name || 'Student'}.
Their interests: ${state.interests.join(', ') || 'not set yet'}.
Enrolled courses: ${enrolledCourses.join(', ') || 'none yet'}.
Available courses: ${COURSES.map(c => c.title + ' (' + c.difficulty + ')').join(', ')}.

Be concise, encouraging, and specific. Use emojis naturally. When suggesting courses, pick from the available list. Keep replies under 150 words.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: msg }],
      }),
    });

    const data = await response.json();
    removeTyping(loadId);

    const reply = data.content?.map(b => b.text || '').join('') || "I couldn't connect right now. Try again!";
    appendChatMsg(reply, 'ai');
  } catch (err) {
    removeTyping(loadId);
    appendChatMsg("I'm having trouble connecting. Please check your internet and try again! 🔌", 'ai');
  }
}

function appendChatMsg(text, role) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function appendTyping() {
  const id = 'typing-' + Date.now();
  const container = document.getElementById('chatMessages');
  if (!container) return id;
  const div = document.createElement('div');
  div.className = 'chat-msg ai loading';
  div.id = id;
  div.innerHTML = `<div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ============================================================
   UTILITY
   ============================================================ */
function logout() {
  localStorage.removeItem('ls_user');
  window.location.href = 'index.html';
}