/**
 * Calisthenics Skills & Mobility Hub — script.js
 * Interactions:
 *   1. Theme toggle (button + 'T' key) — persists to localStorage
 *   2. Skill filter by difficulty (All / Beginner / Intermediate / Advanced)
 *   3. Keyboard-accessible throughout
 */

(() => {
  'use strict';

  // =========================================================================
  // Data
  // =========================================================================
  const skills = [
    {
      id: 'handstand',
      name: 'Handstand',
      level: 'beginner',
      description: 'Foundation for all pressing and inverted skills. Builds shoulder stability and body awareness.',
      progressions: [
        { text: 'Wall walk holds (30s)', completed: true },
        { text: 'Chest-to-wall handstand (30s)', completed: true },
        { text: 'Freestanding handstand (10s)', completed: false },
        { text: 'Handstand push-up (1 rep)', completed: false }
      ]
    },
    {
      id: 'lsit',
      name: 'L-Sit',
      level: 'beginner',
      description: 'Core compression and straight-arm pushing strength. Transfers to planche and V-sit.',
      progressions: [
        { text: 'Tuck L-sit (15s)', completed: true },
        { text: 'One-leg L-sit (10s/side)', completed: true },
        { text: 'Full L-sit (15s)', completed: false },
        { text: 'L-sit to handstand press', completed: false }
      ]
    },
    {
      id: 'pullup',
      name: 'Strict Pull-up',
      level: 'beginner',
      description: 'Base pulling strength. Prerequisite for muscle-ups, front lever, and one-arm pull-up.',
      progressions: [
        { text: 'Dead hang (30s)', completed: true },
        { text: 'Negative pull-ups (5×5s)', completed: true },
        { text: '1 strict pull-up', completed: false },
        { text: '5×5 strict pull-ups', completed: false }
      ]
    },
    {
      id: 'muscleup',
      name: 'Bar Muscle-up',
      level: 'intermediate',
      description: 'Explosive pull + transition + dip. Gateway to rings and advanced pulling.',
      progressions: [
        { text: 'High pull-ups (chest to bar)', completed: false },
        { text: 'Transition drills (banded)', completed: false },
        { text: '1 strict muscle-up', completed: false },
        { text: '3×3 muscle-ups', completed: false }
      ]
    },
    {
      id: 'backlever',
      name: 'Back Lever',
      level: 'intermediate',
      description: 'Straight-arm pulling in horizontal plane. Requires shoulder extension mobility.',
      progressions: [
        { text: 'Skin the cat (5 reps)', completed: false },
        { text: 'Tuck back lever (10s)', completed: false },
        { text: 'Advanced tuck (15s)', completed: false },
        { text: 'Full back lever (10s)', completed: false }
      ]
    },
    {
      id: 'frontlever',
      name: 'Front Lever',
      level: 'advanced',
      description: 'Ultimate straight-arm pulling skill. Demands massive lat and core strength.',
      progressions: [
        { text: 'Tuck front lever (10s)', completed: false },
        { text: 'Advanced tuck (15s)', completed: false },
        { text: 'One-leg front lever (10s)', completed: false },
        { text: 'Full front lever (5s)', completed: false }
      ]
    },
    {
      id: 'planche',
      name: 'Planche',
      level: 'advanced',
      description: 'Straight-arm pushing in horizontal plane. Peak of planche progression line.',
      progressions: [
        { text: 'Pseudo planche push-ups', completed: false },
        { text: 'Tuck planche (10s)', completed: false },
        { text: 'Advanced tuck planche (10s)', completed: false },
        { text: 'Straddle planche (5s)', completed: false },
        { text: 'Full planche (3s)', completed: false }
      ]
    },
    {
      id: 'onearm',
      name: 'One-Arm Pull-up',
      level: 'advanced',
      description: 'Unilateral pulling maximum. Requires tendon conditioning and neural drive.',
      progressions: [
        { text: 'Archer pull-ups (3×5)', completed: false },
        { text: 'Typewriter pull-ups (3×4)', completed: false },
        { text: 'One-arm negative (5s)', completed: false },
        { text: '1 OAP (each arm)', completed: false }
      ]
    }
  ];

  const mobilityItems = [
    {
      title: 'Wrist Extension',
      description: '≥ 90° passive extension with fingers straight. Required for planche, handstand, and push-up variations.',
      test: 'Palm flat on floor, lean forward until forearm vertical. Measure angle.'
    },
    {
      title: 'Shoulder Flexion',
      description: '≥ 180° overhead arms without arching lower back. Needed for handstand line and front lever.',
      test: 'Wall slide: back against wall, arms overhead, thumbs touch wall. No rib flare.'
    },
    {
      title: 'Shoulder Extension',
      description: '≥ 45° behind body with straight arms. Critical for back lever, skin-the-cat, and dips.',
      test: 'Prone on floor, arms behind back, lift hands toward ceiling. Measure height.'
    },
    {
      title: 'Thoracic Extension',
      description: '≥ 15° extension over foam roller. Enables straight handstand line and front lever posture.',
      test: 'Foam roller at T-spine, hands behind head, extend backward. Chin tucked.'
    },
    {
      title: 'Hip Flexion / Pancake',
      description: 'Chest to floor in wide straddle. Prerequisite for press handstand, V-sit, and manna.',
      test: 'Seated straddle, fold forward. Chest touches floor = pass.'
    },
    {
      title: 'Hamstring / Pike',
      description: 'Chest to thighs with straight legs. Needed for L-sit, V-sit, and compression skills.',
      test: 'Standing pike or seated forward fold. Chest on thighs = pass.'
    },
    {
      title: 'Scapular Control',
      description: 'Full protraction/retraction, elevation/depression, upward/downward rotation. Foundation for all straight-arm work.',
      test: 'Scapular push-ups, pull-ups, and circles. Smooth, controlled, no winging.'
    },
    {
      title: 'Elbow Supination',
      description: 'Full supination under load. Protects biceps tendon in false grip, muscle-ups, and one-arm work.',
      test: 'Forearm pronated, rotate to supinated against band resistance. Pain-free full ROM.'
    }
  ];

  // =========================================================================
  // State
  // =========================================================================
  let currentFilter = 'all';

  // =========================================================================
  // DOM References
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = themeToggle.querySelector('.theme-text');
  const skillsGrid = document.getElementById('skills-grid');
  const mobilityGrid = document.getElementById('mobility-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // =========================================================================
  // Theme System
  // =========================================================================
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
  }

  function updateThemeButton(theme) {
    themeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // =========================================================================
  // Render
  // =========================================================================
  function renderSkills() {
    skillsGrid.innerHTML = skills
      .filter(skill => currentFilter === 'all' || skill.level === currentFilter)
      .map(skill => `
        <article class="skill-card" data-level="${skill.level}" data-id="${skill.id}">
          <header class="skill-header">
            <h3 class="skill-name">${skill.name}</h3>
            <span class="skill-level skill-level--${skill.level}">${skill.level}</span>
          </header>
          <p class="skill-desc">${skill.description}</p>
          <div class="skill-progressions">
            ${skill.progressions.map((step, i) => `
              <div class="progression-step ${step.completed ? 'completed' : ''}" data-step="${i}">
                ${step.text}
              </div>
            `).join('')}
          </div>
        </article>
      `).join('');
  }

  function renderMobility() {
    mobilityGrid.innerHTML = mobilityItems.map(item => `
      <article class="mobility-card">
        <h3 class="mobility-title">${item.title}</h3>
        <p class="mobility-desc">${item.description}</p>
        <div class="mobility-test"><strong>Test:</strong> ${item.test}</div>
      </article>
    `).join('');
  }

  // =========================================================================
  // Filter
  // =========================================================================
  function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    renderSkills();
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  themeToggle.addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const active = document.activeElement;
      if (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable) {
        e.preventDefault();
        toggleTheme();
      }
    }
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // =========================================================================
  // Init
  // =========================================================================
  initTheme();
  renderSkills();
  renderMobility();
})();