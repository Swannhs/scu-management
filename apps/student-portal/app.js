const state = { token: sessionStorage.getItem('scu_access_token'), user: null, student: null, route: 'dashboard', apiOnline: true };
const app = document.querySelector('#app');
const api = async (path, options = {}) => {
  const response = await fetch(`/portal/api${path}`, { ...options, headers: { 'content-type': 'application/json', ...(state.token ? { authorization: `Bearer ${state.token}` } : {}), ...(options.headers || {}) } });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `Request failed (${response.status})`);
  return payload?.data ?? payload;
};
const displayName = () => state.user?.firstName ? `${state.user.firstName} ${state.user.lastName || ''}`.trim() : state.user?.email || 'Student';
const initials = () => displayName().split(' ').map((item) => item[0]).slice(0, 2).join('').toUpperCase();
const unwrap = (value) => Array.isArray(value) ? value : value?.data || value?.items || value?.enrollments || [];
const navItems = [['dashboard', 'Overview'], ['courses', 'Course enrollment'], ['attendance', 'Attendance'], ['grades', 'Grades & GPA'], ['transcript', 'Transcript']];

function renderLogin(error = '') {
  app.innerHTML = `<section class="login"><div class="login-card"><div class="brand"><span class="brand-mark">S</span> SCU Management</div><h1>Student portal</h1><p class="muted">Sign in to view your academic progress, enrollment, attendance, and grades.</p>${error ? `<p class="error">${error}</p>` : ''}<form id="login-form"><label>Email<input required type="email" name="email" autocomplete="email" placeholder="student@university.edu" /></label><label>Password<input required type="password" name="password" autocomplete="current-password" /></label><label>University tenant ID<input required name="tenantId" placeholder="your-university" /></label><button class="primary" type="submit">Sign in</button></form></div></section>`;
  document.querySelector('#login-form').addEventListener('submit', login);
}

async function login(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  try {
    const body = new URLSearchParams({ client_id: 'scu-portal', grant_type: 'password', username: data.email, password: data.password });
    const response = await fetch('http://localhost:8080/realms/scu/protocol/openid-connect/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error_description || 'Sign in failed');
    state.token = result.access_token;
    sessionStorage.setItem('scu_access_token', state.token);
    const claims = JSON.parse(atob(state.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    state.user = { id: claims.sub, email: claims.email, firstName: claims.given_name, lastName: claims.family_name, tenantId: claims.tenant_id };
    await loadStudent();
    render();
  } catch (error) { renderLogin(error.message); }
}

async function loadStudent() {
  try { state.student = await api('/v1/students/me'); } catch { state.student = { id: state.user?.id, ...state.user }; }
}

function shell(content) {
  app.innerHTML = `<div class="shell"><aside class="sidebar"><div class="brand"><span class="brand-mark">S</span> SCU Management</div><nav class="nav">${navItems.map(([route, label]) => `<button class="${state.route === route ? 'active' : ''}" data-route="${route}">${label}</button>`).join('')}</nav><div class="sidebar-footer">Student workspace<br />Academic services via secure API gateway</div></aside><section class="content"><header class="topbar"><div><h2>${navItems.find(([route]) => route === state.route)?.[1] || 'Student portal'}</h2><p class="muted">${displayName()}</p></div><div class="user-menu"><span class="avatar">${initials()}</span><button class="logout" id="logout">Sign out</button></div></header>${state.apiOnline ? '' : '<div class="notice">Some academic services are unavailable. You can still navigate the portal. <button id="retry">Retry</button></div>'}${content}</section></div>`;
  document.querySelectorAll('[data-route]').forEach((button) => button.addEventListener('click', () => { state.route = button.dataset.route; render(); }));
  document.querySelector('#logout').addEventListener('click', logout);
  document.querySelector('#retry')?.addEventListener('click', render);
}

function logout() { sessionStorage.removeItem('scu_access_token'); Object.assign(state, { token: null, user: null, student: null, route: 'dashboard' }); renderLogin(); }
function metric(label, value, accent = false) { return `<div class="metric ${accent ? 'accent' : ''}"><span>${label}</span><strong>${value}</strong></div>`; }
function status(value) { const text = String(value || 'Unknown').replaceAll('_', ' '); const style = /pending|draft|warning/i.test(text) ? 'warning' : /enrolled|published|present|active/i.test(text) ? '' : 'neutral'; return `<span class="badge ${style}">${text}</span>`; }

async function dashboard() {
  let enrollment = [], attendance = null, grades = [], gpa = null;
  try {
    [enrollment, attendance, grades, gpa] = await Promise.all([api(`/v1/students/${state.student.id}/enrollments`), api('/v1/attendance/me/summary'), api('/v1/grades/me'), api('/v1/gpa/me')]);
    state.apiOnline = true;
  } catch { state.apiOnline = false; }
  const items = unwrap(enrollment); const gradeItems = unwrap(grades); const attendancePercent = attendance?.attendancePercentage ?? attendance?.percentage ?? '—'; const gpaValue = gpa?.gpa ?? gpa?.cumulativeGpa ?? '—';
  shell(`<section class="metrics">${metric('Enrolled sections', items.length)}${metric('Attendance', `${attendancePercent}${attendancePercent === '—' ? '' : '%'}`)}${metric('Current GPA', gpaValue, true)}${metric('Published grades', gradeItems.length)}</section><section class="grid"><article class="panel"><div class="panel-header"><h3>Current enrollment</h3><button data-route="courses">Manage courses</button></div><div class="list">${items.length ? items.slice(0, 4).map((item) => `<div class="row"><div class="row-main"><strong>${item.courseCode || item.course?.code || 'Course section'}</strong><span>${item.courseTitle || item.sectionId || item.offering_id || 'Current term'}</span></div>${status(item.status || 'ENROLLED')}</div>`).join('') : '<div class="empty">No enrollment data is available yet.</div>'}</div></article><article class="panel"><div class="panel-header"><h3>Academic progress</h3><button data-route="grades">View grades</button></div><div class="row"><div class="row-main"><strong>Attendance</strong><span>Maintain at least 75% attendance.</span></div></div><div class="progress"><span style="width:${Number(attendancePercent) || 0}%"></span></div><div class="row"><div class="row-main"><strong>GPA</strong><span>Your current academic standing.</span></div><strong>${gpaValue}</strong></div></article></section>`);
}

async function courses() {
  let sections = [], enrollments = [];
  try { [sections, enrollments] = await Promise.all([api('/v1/sections'), api(`/v1/students/${state.student.id}/enrollments`)]); state.apiOnline = true; } catch { state.apiOnline = false; }
  const enrolled = new Set(unwrap(enrollments).map((item) => item.sectionId || item.offering_id));
  shell(`<div class="toolbar"><p class="muted">Browse available course sections and submit enrollment requests.</p></div><section class="course-grid">${unwrap(sections).length ? unwrap(sections).map((section) => { const id = section.id || section.sectionId; const active = enrolled.has(id); return `<article class="course"><span class="badge neutral">${section.courseCode || 'Section'}</span><h3>${section.courseTitle || section.name || id}</h3><p>${section.termName || 'Current term'} · ${section.capacity ? `${section.capacity} seats` : 'Capacity pending'}</p><button class="${active ? 'secondary' : 'primary'}" data-enroll="${id}" ${active ? 'disabled' : ''}>${active ? 'Enrolled' : 'Enroll'}</button></article>`; }).join('') : '<div class="empty">No course sections are available.</div>'}</section>`);
  document.querySelectorAll('[data-enroll]').forEach((button) => button.addEventListener('click', () => enroll(button.dataset.enroll)));
}

async function enroll(sectionId) {
  try { await api('/v1/enrollments', { method: 'POST', body: JSON.stringify({ studentId: state.student.id, sectionId }) }); await courses(); } catch (error) { window.alert(error.message); }
}

async function attendancePage() {
  let report = null; try { report = await api('/v1/attendance/me/summary'); state.apiOnline = true; } catch { state.apiOnline = false; }
  const rows = unwrap(report?.sections || report?.attendance || report);
  shell(`<section class="panel"><div class="panel-header"><h3>Attendance summary</h3><strong>${report?.attendancePercentage ?? report?.percentage ?? '—'}${report?.attendancePercentage || report?.percentage ? '%' : ''}</strong></div>${rows.length ? `<table class="table"><thead><tr><th>Section</th><th>Present</th><th>Attendance</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${row.sectionName || row.sectionId || 'Course section'}</td><td>${row.present ?? row.presentCount ?? '—'}</td><td>${row.percentage ?? row.attendancePercentage ?? '—'}%</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Attendance records will appear here after your faculty marks a session.</div>'}</section>`);
}

async function gradesPage() {
  let grades = [], gpa = null; try { [grades, gpa] = await Promise.all([api('/v1/grades/me'), api('/v1/gpa/me')]); state.apiOnline = true; } catch { state.apiOnline = false; }
  shell(`<section class="metrics">${metric('Current GPA', gpa?.gpa ?? gpa?.cumulativeGpa ?? '—', true)}${metric('Completed credits', gpa?.completedCredits ?? '—')}${metric('Grades published', unwrap(grades).length)}${metric('Academic standing', gpa?.standing ?? 'Pending')}</section><section class="panel"><div class="panel-header"><h3>Published grades</h3></div>${unwrap(grades).length ? `<table class="table"><thead><tr><th>Course</th><th>Score</th><th>Letter grade</th><th>Status</th></tr></thead><tbody>${unwrap(grades).map((grade) => `<tr><td>${grade.courseCode || grade.sectionId || 'Course section'}</td><td>${grade.score ?? '—'}</td><td><strong>${grade.letterGrade || '—'}</strong></td><td>${status(grade.status || 'PUBLISHED')}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Your faculty has not published grades yet.</div>'}</section>`);
}

async function transcriptPage() {
  let transcript = null; try { transcript = await api('/v1/transcripts/me'); state.apiOnline = true; } catch { state.apiOnline = false; }
  const courses = unwrap(transcript?.courses || transcript?.records || transcript);
  shell(`<section class="transcript"><div class="transcript-top"><div><div class="brand"><span class="brand-mark">S</span> SCU Management</div><h3>Academic transcript</h3><p class="muted">${displayName()}</p></div><div><strong>GPA: ${transcript?.gpa ?? transcript?.cumulativeGpa ?? '—'}</strong><p class="muted">Unofficial view</p></div></div>${courses.length ? `<table class="table"><thead><tr><th>Course</th><th>Credits</th><th>Grade</th></tr></thead><tbody>${courses.map((course) => `<tr><td>${course.courseCode || course.title || course.sectionId || 'Course section'}</td><td>${course.credits ?? '—'}</td><td>${course.letterGrade || course.grade || '—'}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">Your published transcript will appear here.</div>'}</section>`);
}

async function render() {
  if (!state.token) return renderLogin();
  if (!state.student) await loadStudent();
  if (state.route === 'courses') return courses();
  if (state.route === 'attendance') return attendancePage();
  if (state.route === 'grades') return gradesPage();
  if (state.route === 'transcript') return transcriptPage();
  return dashboard();
}
render();
