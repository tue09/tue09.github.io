const roleConfig = {
  super_admin: {
    label: "Super Admin",
    email: "admin@ai-residency.org",
    permissions: [
      "Full candidate visibility including PII and CV downloads.",
      "Can manage users, batches, role policies, and audit exports.",
      "Can bulk-edit candidates and inspect all workflow logs.",
    ],
  },
  coordinator: {
    label: "Coordinator",
    email: "coord@ai-residency.org",
    permissions: [
      "Can import data, assign interviews, change statuses, and export reports.",
      "Can edit candidate records inline across the active batch.",
      "Cannot manage users or override RLS policy configuration.",
    ],
  },
  reviewer: {
    label: "Reviewer",
    email: "reviewer@ai-residency.org",
    permissions: [
      "Can review candidates and submit interview evaluations for assigned applicants.",
      "Email and phone are hidden at the data layer in the real product.",
      "Cannot download CVs, export contact data, or perform bulk edits.",
    ],
  },
};

const statusMeta = {
  all: { label: "All statuses" },
  new: { label: "new" },
  under_review: { label: "under_review" },
  test_invited: { label: "test_invited" },
  test_completed: { label: "test_completed" },
  interview_scheduled: { label: "interview_scheduled" },
  interview_completed: { label: "interview_completed" },
  shortlisted: { label: "shortlisted" },
  accepted: { label: "accepted" },
  rejected: { label: "rejected" },
  waitlisted: { label: "waitlisted" },
  withdrawn: { label: "withdrawn" },
};

const candidates = [
  {
    id: "AR-101",
    fullName: "Linh Tran",
    email: "linh.tran@candidate.ai",
    phone: "+84 912 250 401",
    location: "Hanoi, Vietnam",
    university: "HUST",
    degree: "B.S.",
    major: "Computer Science",
    gpa: 3.91,
    graduationTime: "Jul 2026",
    englishCertificate: "IELTS 8.0",
    contests: "ICPC national finalist, VNOI coach",
    projects: "Agentic code repair benchmark, synthetic reasoning dataset pipeline",
    priorPublications: 1,
    experienceYears: 1.5,
    researchInterests: ["Code Intelligence", "Reasoning Models", "LLM Alignment"],
    applicationDate: "2026-01-18",
    status: "shortlisted",
    screening: {
      scores: { researchFit: 9, codingDepth: 10, writing: 8, signal: 9 },
      comments: "Extremely strong technical portfolio with unusually clear experiment design.",
    },
    test: {
      date: "2026-02-10",
      componentScores: { coding: 94, math: 88, reading: 91 },
      total: 91,
    },
    interview: {
      reviewer: "An Nguyen",
      round: 2,
      scheduledDate: "2026-02-18",
      status: "completed",
      criteriaScores: {
        technical: 9,
        researchAptitude: 9,
        problemSolving: 8,
        communication: 8,
        motivationFit: 9,
      },
      comments: "Strong systems intuition, grounded research taste, and concise communication.",
      submittedAt: "2026-02-18 16:40 UTC",
    },
    activity: [
      { at: "2026-02-18 16:40 UTC", action: "Round 2 evaluation submitted" },
      { at: "2026-02-12 09:10 UTC", action: "Moved to shortlisted review queue" },
      { at: "2026-01-20 14:02 UTC", action: "Initial screening completed by coordinator" },
    ],
  },
  {
    id: "AR-102",
    fullName: "Minh Bui",
    email: "minh.bui@candidate.ai",
    phone: "+84 909 114 726",
    location: "Ho Chi Minh City, Vietnam",
    university: "VNU-HCM",
    degree: "B.Eng.",
    major: "Artificial Intelligence",
    gpa: 3.76,
    graduationTime: "Jun 2025",
    englishCertificate: "TOEFL iBT 108",
    contests: "Kaggle bronze, ACM chapter lead",
    projects: "Safety eval dashboard, retrieval-augmented tutoring system",
    priorPublications: 0,
    experienceYears: 2.2,
    researchInterests: ["Applied ML", "Evaluation", "Data Systems"],
    applicationDate: "2026-01-17",
    status: "interview_completed",
    screening: {
      scores: { researchFit: 8, codingDepth: 8, writing: 7, signal: 8 },
      comments: "Solid engineering signal and strong product-facing instincts.",
    },
    test: {
      date: "2026-02-09",
      componentScores: { coding: 86, math: 82, reading: 84 },
      total: 84,
    },
    interview: {
      reviewer: "Bao Pham",
      round: 1,
      scheduledDate: "2026-02-15",
      status: "completed",
      criteriaScores: {
        technical: 8,
        researchAptitude: 7,
        problemSolving: 8,
        communication: 9,
        motivationFit: 8,
      },
      comments: "Well rounded candidate with strong communication and practical ownership.",
      submittedAt: "2026-02-15 11:05 UTC",
    },
    activity: [
      { at: "2026-02-15 11:05 UTC", action: "Interview evaluation submitted" },
      { at: "2026-02-11 18:20 UTC", action: "Interview round 1 assigned to Bao Pham" },
      { at: "2026-01-22 08:41 UTC", action: "Entry test imported from CSV" },
    ],
  },
  {
    id: "AR-103",
    fullName: "Thao Nguyen",
    email: "thao.nguyen@candidate.ai",
    phone: "+84 937 204 881",
    location: "Da Nang, Vietnam",
    university: "HUST",
    degree: "B.S.",
    major: "Mathematics and Informatics",
    gpa: 3.98,
    graduationTime: "Jul 2026",
    englishCertificate: "IELTS 7.5",
    contests: "National Olympiad silver medalist",
    projects: "Formal reasoning benchmark, mechanistic interpretability reading group",
    priorPublications: 2,
    experienceYears: 0.8,
    researchInterests: ["Reasoning Models", "Mechanistic Interpretability", "Optimization"],
    applicationDate: "2026-01-15",
    status: "accepted",
    screening: {
      scores: { researchFit: 10, codingDepth: 8, writing: 9, signal: 10 },
      comments: "Rare research upside. Publications and contest record align tightly with the residency.",
    },
    test: {
      date: "2026-02-08",
      componentScores: { coding: 90, math: 96, reading: 89 },
      total: 92,
    },
    interview: {
      reviewer: "Quynh Le",
      round: 2,
      scheduledDate: "2026-02-19",
      status: "completed",
      criteriaScores: {
        technical: 8,
        researchAptitude: 10,
        problemSolving: 9,
        communication: 8,
        motivationFit: 10,
      },
      comments: "Exceptional research taste and strong curiosity under ambiguity.",
      submittedAt: "2026-02-19 17:12 UTC",
    },
    activity: [
      { at: "2026-02-26 10:00 UTC", action: "Final decision marked accepted" },
      { at: "2026-02-19 17:12 UTC", action: "Round 2 evaluation submitted" },
      { at: "2026-01-19 15:22 UTC", action: "Candidate imported into active batch" },
    ],
  },
  {
    id: "AR-104",
    fullName: "Huy Pham",
    email: "huy.pham@candidate.ai",
    phone: "+84 983 004 517",
    location: "Can Tho, Vietnam",
    university: "PTIT",
    degree: "B.S.",
    major: "Information Security",
    gpa: 3.45,
    graduationTime: "Jun 2025",
    englishCertificate: "IELTS 7.0",
    contests: "CTF finalist",
    projects: "Secure coding assistant, static analysis plugin",
    priorPublications: 0,
    experienceYears: 1.8,
    researchInterests: ["Security", "Code Intelligence", "Program Analysis"],
    applicationDate: "2026-01-23",
    status: "under_review",
    screening: {
      scores: { researchFit: 7, codingDepth: 8, writing: 6, signal: 7 },
      comments: "Good engineering instincts; research framing still needs work.",
    },
    test: {
      date: null,
      componentScores: { coding: null, math: null, reading: null },
      total: null,
    },
    interview: {
      reviewer: null,
      round: null,
      scheduledDate: null,
      status: "pending",
      criteriaScores: null,
      comments: null,
      submittedAt: null,
    },
    activity: [
      { at: "2026-01-25 12:14 UTC", action: "Coordinator added screening comments" },
      { at: "2026-01-23 09:50 UTC", action: "Application synced from intake form" },
    ],
  },
  {
    id: "AR-105",
    fullName: "Mai Vo",
    email: "mai.vo@candidate.ai",
    phone: "+84 968 772 410",
    location: "Hanoi, Vietnam",
    university: "FULbright VN",
    degree: "B.A.",
    major: "Data Science",
    gpa: 3.64,
    graduationTime: "May 2025",
    englishCertificate: "IELTS 8.5",
    contests: "Research poster winner",
    projects: "Human preference collection toolkit, LLM rubric evaluator",
    priorPublications: 1,
    experienceYears: 1.2,
    researchInterests: ["Evaluation", "Human Feedback", "Alignment"],
    applicationDate: "2026-01-19",
    status: "test_completed",
    screening: {
      scores: { researchFit: 8, codingDepth: 7, writing: 9, signal: 8 },
      comments: "High signal on writing and evaluation fluency. Worth fast-tracking to interviews.",
    },
    test: {
      date: "2026-02-11",
      componentScores: { coding: 80, math: 78, reading: 93 },
      total: 84,
    },
    interview: {
      reviewer: "Bao Pham",
      round: 1,
      scheduledDate: "2026-02-24",
      status: "scheduled",
      criteriaScores: null,
      comments: null,
      submittedAt: null,
    },
    activity: [
      { at: "2026-02-16 09:02 UTC", action: "Interview scheduled for round 1" },
      { at: "2026-02-11 17:42 UTC", action: "Entry test scores imported" },
      { at: "2026-01-20 07:51 UTC", action: "Coordinator validated CV upload" },
    ],
  },
  {
    id: "AR-106",
    fullName: "Anh Do",
    email: "anh.do@candidate.ai",
    phone: "+84 903 332 918",
    location: "Hue, Vietnam",
    university: "VNU-HN",
    degree: "M.S.",
    major: "Computer Science",
    gpa: 3.82,
    graduationTime: "Dec 2024",
    englishCertificate: "TOEIC 975",
    contests: "Open source maintainer",
    projects: "Distributed eval runner, post-training optimization tracker",
    priorPublications: 1,
    experienceYears: 3.1,
    researchInterests: ["Post-training", "Optimization", "Infrastructure"],
    applicationDate: "2026-01-14",
    status: "waitlisted",
    screening: {
      scores: { researchFit: 8, codingDepth: 9, writing: 7, signal: 8 },
      comments: "Technically mature profile. Final ranking depends on cohort balance.",
    },
    test: {
      date: "2026-02-07",
      componentScores: { coding: 88, math: 84, reading: 83 },
      total: 85,
    },
    interview: {
      reviewer: "An Nguyen",
      round: 2,
      scheduledDate: "2026-02-21",
      status: "completed",
      criteriaScores: {
        technical: 9,
        researchAptitude: 8,
        problemSolving: 8,
        communication: 7,
        motivationFit: 7,
      },
      comments: "Strong builder profile with good depth, slightly less differentiated research agenda.",
      submittedAt: "2026-02-21 13:18 UTC",
    },
    activity: [
      { at: "2026-02-27 08:17 UTC", action: "Placed on waitlist after committee review" },
      { at: "2026-02-21 13:18 UTC", action: "Round 2 evaluation submitted" },
      { at: "2026-01-18 16:02 UTC", action: "Coordinator changed status to test_invited" },
    ],
  },
  {
    id: "AR-107",
    fullName: "Bao Chau Le",
    email: "baochau.le@candidate.ai",
    phone: "+84 961 880 507",
    location: "Hanoi, Vietnam",
    university: "UEH",
    degree: "B.B.A.",
    major: "Business Analytics",
    gpa: 3.52,
    graduationTime: "Jun 2025",
    englishCertificate: "IELTS 7.5",
    contests: "National data challenge finalist",
    projects: "Experiment tracking dashboard, recruiter assistant workflow",
    priorPublications: 0,
    experienceYears: 1.0,
    researchInterests: ["Product Analytics", "Applied ML", "Data Systems"],
    applicationDate: "2026-01-24",
    status: "new",
    screening: {
      scores: { researchFit: 6, codingDepth: 6, writing: 7, signal: 6 },
      comments: "Promising but needs deeper technical review before moving forward.",
    },
    test: {
      date: null,
      componentScores: { coding: null, math: null, reading: null },
      total: null,
    },
    interview: {
      reviewer: null,
      round: null,
      scheduledDate: null,
      status: "pending",
      criteriaScores: null,
      comments: null,
      submittedAt: null,
    },
    activity: [
      { at: "2026-01-24 10:24 UTC", action: "Application submitted through batch intake form" },
    ],
  },
  {
    id: "AR-108",
    fullName: "Nam Ho",
    email: "nam.ho@candidate.ai",
    phone: "+84 979 121 442",
    location: "Ho Chi Minh City, Vietnam",
    university: "HCMUT",
    degree: "B.S.",
    major: "Computer Engineering",
    gpa: 3.69,
    graduationTime: "Jun 2025",
    englishCertificate: "IELTS 7.0",
    contests: "Robotics challenge top 5",
    projects: "Vision-language debugging tool, dataset curation pipeline",
    priorPublications: 0,
    experienceYears: 2.4,
    researchInterests: ["Multimodal Models", "Evaluation", "Agents"],
    applicationDate: "2026-01-18",
    status: "rejected",
    screening: {
      scores: { researchFit: 6, codingDepth: 8, writing: 6, signal: 7 },
      comments: "Good builder, but the cohort had stronger matches for research depth.",
    },
    test: {
      date: "2026-02-09",
      componentScores: { coding: 83, math: 77, reading: 79 },
      total: 80,
    },
    interview: {
      reviewer: "Quynh Le",
      round: 1,
      scheduledDate: "2026-02-17",
      status: "completed",
      criteriaScores: {
        technical: 7,
        researchAptitude: 6,
        problemSolving: 8,
        communication: 7,
        motivationFit: 7,
      },
      comments: "Execution signal is good, but research framing did not land as strongly.",
      submittedAt: "2026-02-17 14:11 UTC",
    },
    activity: [
      { at: "2026-02-25 09:34 UTC", action: "Final decision marked rejected" },
      { at: "2026-02-17 14:11 UTC", action: "Round 1 evaluation submitted" },
      { at: "2026-02-10 08:15 UTC", action: "Interview assigned to Quynh Le" },
    ],
  },
];

const state = {
  role: "coordinator",
  activeTab: "profile",
  selectedId: candidates[0].id,
  selectedIds: new Set(),
  search: "",
  university: "all",
  statuses: new Set(["all"]),
  sort: "score-desc",
  batchStatus: "active",
};

const weights = {
  technical: 0.28,
  researchAptitude: 0.24,
  problemSolving: 0.22,
  communication: 0.12,
  motivationFit: 0.14,
};

const dom = {
  year: document.getElementById("year"),
  menuBtn: document.querySelector(".menu-btn"),
  nav: document.querySelector(".site-nav"),
  roleSwitch: document.getElementById("roleSwitch"),
  roleSummary: document.getElementById("roleSummary"),
  metricStrip: document.getElementById("metricStrip"),
  statusFilters: document.getElementById("statusFilters"),
  candidateHead: document.getElementById("candidateHead"),
  candidateBody: document.getElementById("candidateTableBody"),
  emptyState: document.getElementById("emptyState"),
  resultsCount: document.getElementById("resultsCount"),
  detailHeader: document.getElementById("detailHeader"),
  detailContent: document.getElementById("detailContent"),
  topCandidates: document.getElementById("topCandidates"),
  recentActivity: document.getElementById("recentActivity"),
  searchInput: document.getElementById("searchInput"),
  universityFilter: document.getElementById("universityFilter"),
  sortSelect: document.getElementById("sortSelect"),
  shortlistBtn: document.getElementById("shortlistBtn"),
  assignBtn: document.getElementById("assignBtn"),
  exportBtn: document.getElementById("exportBtn"),
  savePresetBtn: document.getElementById("savePresetBtn"),
  archiveBatchBtn: document.getElementById("archiveBatchBtn"),
  adminPanelCard: document.getElementById("adminPanelCard"),
  batchStatusInline: document.getElementById("batchStatusInline"),
  batchStatusHero: document.getElementById("batchStatusHero"),
  heroFunnel: document.getElementById("heroFunnel"),
  reportFunnel: document.getElementById("reportFunnel"),
  universityChart: document.getElementById("universityChart"),
  detailTabs: document.getElementById("detailTabs"),
  toastStack: document.getElementById("toastStack"),
  confirmBackdrop: document.getElementById("confirmBackdrop"),
  confirmTitle: document.getElementById("confirmTitle"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmCancel: document.getElementById("confirmCancel"),
  confirmAccept: document.getElementById("confirmAccept"),
};

let confirmAction = null;
let loadingTimer = null;

function computeInterviewAverage(criteriaScores) {
  if (!criteriaScores) {
    return null;
  }
  return Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + criteriaScores[key] * 10 * weight;
  }, 0);
}

function computeScreeningAverage(scores) {
  const values = Object.values(scores || {});
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value * 10, 0) / values.length;
}

function computeComposite(candidate) {
  const screening = computeScreeningAverage(candidate.screening.scores);
  const test = candidate.test.total != null ? candidate.test.total : screening * 0.92;
  const interviewAverage = computeInterviewAverage(candidate.interview.criteriaScores);
  const interview = interviewAverage != null ? interviewAverage : screening;
  return Math.round(screening * 0.3 + test * 0.3 + interview * 0.4);
}

function statusLabel(status) {
  const label = statusMeta[status] ? statusMeta[status].label : status;
  return label.replace(/_/g, " ");
}

function statusPill(status) {
  return `<span class="status-pill ${status}">${statusLabel(status)}</span>`;
}

function getFilteredCandidates() {
  let filtered = candidates.filter((candidate) => {
    const searchTarget = [
      candidate.fullName,
      candidate.university,
      candidate.major,
      candidate.projects,
      candidate.screening.comments,
      ...candidate.researchInterests,
    ]
      .join(" ")
      .toLowerCase();

    const searchMatch = !state.search || searchTarget.includes(state.search.toLowerCase());
    const universityMatch = state.university === "all" || candidate.university === state.university;
    const statusMatch =
      state.statuses.has("all") || state.statuses.has(candidate.status);

    return searchMatch && universityMatch && statusMatch;
  });

  filtered = [...filtered].sort((left, right) => {
    if (state.sort === "gpa-desc") {
      return right.gpa - left.gpa;
    }
    if (state.sort === "status-asc") {
      return statusLabel(left.status).localeCompare(statusLabel(right.status));
    }
    if (state.sort === "name-asc") {
      return left.fullName.localeCompare(right.fullName);
    }
    return computeComposite(right) - computeComposite(left);
  });

  return filtered;
}

function getCurrentCandidate(filteredCandidates) {
  if (!filteredCandidates.length) {
    return null;
  }
  const stillVisible = filteredCandidates.find((candidate) => candidate.id === state.selectedId);
  if (stillVisible) {
    return stillVisible;
  }
  state.selectedId = filteredCandidates[0].id;
  return filteredCandidates[0];
}

function renderRoleSummary() {
  const config = roleConfig[state.role];
  const permissionList = config.permissions
    .map((permission) => `<li><strong>${config.label}</strong><span>${permission}</span></li>`)
    .join("");

  dom.roleSummary.innerHTML = `
    <p class="support-copy">Signed in as <strong>${config.email}</strong></p>
    <ul>${permissionList}</ul>
  `;

  const isAdmin = state.role === "super_admin";
  dom.archiveBatchBtn.classList.toggle("hidden", !isAdmin);
  dom.adminPanelCard.classList.toggle("hidden", !isAdmin);
}

function renderMetrics(filteredCandidates) {
  const counts = {
    total: filteredCandidates.length,
    underReview: filteredCandidates.filter((candidate) =>
      ["new", "under_review", "test_invited"].includes(candidate.status)
    ).length,
    testsCompleted: filteredCandidates.filter((candidate) =>
      ["test_completed", "interview_scheduled", "interview_completed", "shortlisted", "accepted", "rejected", "waitlisted"].includes(
        candidate.status
      )
    ).length,
    interviewsDone: filteredCandidates.filter((candidate) =>
      ["interview_completed", "shortlisted", "accepted", "rejected", "waitlisted"].includes(candidate.status)
    ).length,
    shortlisted: filteredCandidates.filter((candidate) => candidate.status === "shortlisted").length,
    accepted: filteredCandidates.filter((candidate) => candidate.status === "accepted").length,
  };

  dom.metricStrip.innerHTML = [
    ["Total Candidates", counts.total],
    ["Under Review", counts.underReview],
    ["Tests Completed", counts.testsCompleted],
    ["Interviews Done", counts.interviewsDone],
    ["Shortlisted", counts.shortlisted],
    ["Accepted", counts.accepted],
  ]
    .map(
      ([label, value]) => `
        <article class="metric-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join("");
}

function renderStatusFilters() {
  const order = [
    "all",
    "new",
    "under_review",
    "test_invited",
    "test_completed",
    "interview_scheduled",
    "interview_completed",
    "shortlisted",
    "accepted",
    "rejected",
    "waitlisted",
    "withdrawn",
  ];

  dom.statusFilters.innerHTML = order
    .map((status) => {
      const active = state.statuses.has(status);
      return `
        <button class="status-chip ${active ? "active" : ""}" type="button" data-status="${status}">
          ${statusLabel(status)}
        </button>
      `;
    })
    .join("");
}

function renderTable(filteredCandidates) {
  const showPII = state.role !== "reviewer";
  const showSelection = state.role !== "reviewer";
  const allVisibleSelected =
    showSelection &&
    filteredCandidates.length > 0 &&
    filteredCandidates.every((candidate) => state.selectedIds.has(candidate.id));

  dom.candidateHead.innerHTML = `
    <tr>
      ${showSelection ? '<th><input class="select-all" type="checkbox" aria-label="Select all" ' + (allVisibleSelected ? "checked" : "") + " /></th>" : ""}
      <th>Candidate</th>
      <th>University</th>
      <th>Degree</th>
      <th>GPA</th>
      <th>Status</th>
      <th>Test</th>
      <th>Interview</th>
      <th>Composite</th>
      ${showPII ? "<th>Email</th><th>Phone</th>" : ""}
    </tr>
  `;

  dom.candidateBody.innerHTML = filteredCandidates
    .map((candidate) => {
      const composite = computeComposite(candidate);
      const interviewAvg = computeInterviewAverage(candidate.interview.criteriaScores);
      return `
        <tr class="${candidate.id === state.selectedId ? "active" : ""}">
          ${showSelection ? `<td><input class="row-checkbox" type="checkbox" data-id="${candidate.id}" aria-label="Select ${candidate.fullName}" ${state.selectedIds.has(candidate.id) ? "checked" : ""} /></td>` : ""}
          <td>
            <button class="row-link" type="button" data-id="${candidate.id}">
              <strong>${candidate.fullName}</strong>
              <span>${candidate.major}</span>
            </button>
          </td>
          <td>${candidate.university}</td>
          <td>${candidate.degree}</td>
          <td>${candidate.gpa.toFixed(2)}</td>
          <td>${statusPill(candidate.status)}</td>
          <td>${candidate.test.total != null ? candidate.test.total : "Pending"}</td>
          <td>${interviewAvg ? Math.round(interviewAvg) : "Pending"}</td>
          <td>${composite}</td>
          ${
            showPII
              ? `<td>${candidate.email}</td><td>${candidate.phone}</td>`
              : ""
          }
        </tr>
      `;
    })
    .join("");

  dom.resultsCount.textContent = `${filteredCandidates.length} candidates in current view`;
  dom.emptyState.classList.toggle("hidden", filteredCandidates.length !== 0);
}

function renderProfile(candidate) {
  const showPII = state.role !== "reviewer";
  const screeningScore = Math.round(computeScreeningAverage(candidate.screening.scores));

  return `
    <div class="data-grid">
      <div class="data-point">
        <span>University</span>
        <strong>${candidate.university}</strong>
      </div>
      <div class="data-point">
        <span>Location</span>
        <strong>${candidate.location}</strong>
      </div>
      <div class="data-point">
        <span>Degree / Major</span>
        <strong>${candidate.degree} · ${candidate.major}</strong>
      </div>
      <div class="data-point">
        <span>GPA / Graduation</span>
        <strong>${candidate.gpa.toFixed(2)} · ${candidate.graduationTime}</strong>
      </div>
      <div class="data-point">
        <span>English Certificate</span>
        <strong>${candidate.englishCertificate}</strong>
      </div>
      <div class="data-point">
        <span>Experience</span>
        <strong>${candidate.experienceYears} years</strong>
      </div>
      ${
        showPII
          ? `
            <div class="data-point">
              <span>Email</span>
              <strong>${candidate.email}</strong>
            </div>
            <div class="data-point">
              <span>Phone</span>
              <strong>${candidate.phone}</strong>
            </div>
          `
          : `
            <div class="data-point">
              <span>Protected Contact</span>
              <strong>Hidden for reviewer role</strong>
            </div>
            <div class="data-point">
              <span>Data Access</span>
              <strong>RLS removes email and phone at query time</strong>
            </div>
          `
      }
      <div class="data-point">
        <span>Contests</span>
        <strong>${candidate.contests}</strong>
      </div>
      <div class="data-point">
        <span>Projects</span>
        <strong>${candidate.projects}</strong>
      </div>
      <div class="data-point">
        <span>Publications</span>
        <strong>${candidate.priorPublications}</strong>
      </div>
      <div class="data-point">
        <span>Screening Average</span>
        <strong>${screeningScore}</strong>
      </div>
    </div>

    <div class="data-point">
      <span>Research Interests</span>
      <div class="interest-row">
        ${candidate.researchInterests.map((interest) => `<span>${interest}</span>`).join("")}
      </div>
    </div>

    <div class="interview-note">
      <span>Screening Comments</span>
      <p>${candidate.screening.comments}</p>
    </div>
  `;
}

function renderCV(candidate) {
  const reviewerWatermark =
    state.role === "reviewer"
      ? `${roleConfig[state.role].email} · ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`
      : "Coordinator preview";

  return `
    <div class="cv-card">
      <div class="cv-viewer">
        <div class="cv-sheet">
          <div class="cv-line short"></div>
          <div class="cv-line"></div>
          <div class="cv-line"></div>
          <div class="cv-line short"></div>
          <div class="cv-line"></div>
          <div class="cv-line short"></div>
          <div class="cv-line"></div>
          <div class="cv-line"></div>
          <div class="watermark">${reviewerWatermark}</div>
        </div>
      </div>
      <div class="interview-note">
        <span>Access Policy</span>
        <p>
          ${
            state.role === "reviewer"
              ? "Download disabled. CV is view-only with user email and timestamp watermark."
              : "Coordinators and admins can review the stored CV file and share it inside approved workflows."
          }
        </p>
        <span>Storage</span>
        <p>Supabase Storage object path: <strong>cv/${candidate.id}.pdf</strong></p>
      </div>
    </div>
  `;
}

function renderEntryTest(candidate) {
  if (!candidate.test.total) {
    return `
      <div class="empty-state">
        <strong>Entry test not imported yet.</strong>
        <p>The PRD supports separate CSV imports matched by candidate email.</p>
      </div>
    `;
  }

  const scores = candidate.test.componentScores;
  return `
    <div class="score-grid">
      <div class="score-card">
        <span>Coding</span>
        <strong>${scores.coding}</strong>
      </div>
      <div class="score-card">
        <span>Math</span>
        <strong>${scores.math}</strong>
      </div>
      <div class="score-card">
        <span>Reading</span>
        <strong>${scores.reading}</strong>
      </div>
      <div class="score-card">
        <span>Total</span>
        <strong>${candidate.test.total}</strong>
      </div>
    </div>
    <div class="interview-note">
      <span>Imported on</span>
      <p>${candidate.test.date}</p>
    </div>
  `;
}

function renderInterviews(candidate) {
  const interview = candidate.interview;
  if (!interview.reviewer) {
    return `
      <div class="empty-state">
        <strong>No interview assignment yet.</strong>
        <p>Coordinators can bulk assign reviewers, rounds, and optional dates from the candidate list.</p>
      </div>
    `;
  }

  const average = computeInterviewAverage(interview.criteriaScores);
  const rubric = interview.criteriaScores
    ? Object.entries(interview.criteriaScores)
        .map(
          ([key, value]) => `
            <div class="rubric-row">
              <span>${key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())}</span>
              <div class="rubric-bar"><i style="width: ${value * 10}%"></i></div>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state"><strong>Evaluation pending.</strong><p>Submission is still open for the assigned interviewer.</p></div>`;

  return `
    <div class="interview-grid">
      <div class="score-card">
        <span>Reviewer</span>
        <strong>${interview.reviewer}</strong>
      </div>
      <div class="score-card">
        <span>Round</span>
        <strong>${interview.round != null ? interview.round : "-"}</strong>
      </div>
      <div class="score-card">
        <span>Scheduled Date</span>
        <strong>${interview.scheduledDate != null ? interview.scheduledDate : "Pending"}</strong>
      </div>
      <div class="score-card">
        <span>Weighted Average</span>
        <strong>${average ? Math.round(average) : "Pending"}</strong>
      </div>
    </div>
    <div class="rubric-card">${rubric}</div>
    <div class="interview-note">
      <span>Reviewer Comments</span>
      <p>${interview.comments || "Comments will become read-only after submission."}</p>
    </div>
  `;
}

function renderActivity(candidate) {
  return `
    <div class="activity-feed">
      ${candidate.activity
        .map(
          (item) => `
            <article class="activity-item">
              <time>${item.at}</time>
              <strong>${item.action}</strong>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderDetail(candidate) {
  if (!candidate) {
    dom.detailHeader.innerHTML = `
      <div class="detail-title">
        <h3>No candidate selected</h3>
        <p class="support-copy">A detail panel will appear once the current filters return a candidate.</p>
      </div>
    `;
    dom.detailContent.innerHTML = `
      <div class="empty-state">
        <strong>Nothing to inspect yet.</strong>
        <p>Reset filters or switch presets to populate the candidate record view.</p>
      </div>
    `;
    return;
  }

  dom.detailHeader.innerHTML = `
    <div class="detail-title">
      <p class="eyebrow">Candidate Detail</p>
      <h3>${candidate.fullName}</h3>
      <div class="detail-meta">
        <span>${candidate.university}</span>
        <span>${candidate.major}</span>
        <span>Composite ${computeComposite(candidate)}</span>
      </div>
    </div>
    <div>${statusPill(candidate.status)}</div>
  `;

  if (state.activeTab === "cv") {
    dom.detailContent.innerHTML = renderCV(candidate);
    return;
  }
  if (state.activeTab === "entry") {
    dom.detailContent.innerHTML = renderEntryTest(candidate);
    return;
  }
  if (state.activeTab === "interviews") {
    dom.detailContent.innerHTML = renderInterviews(candidate);
    return;
  }
  if (state.activeTab === "activity") {
    dom.detailContent.innerHTML = renderActivity(candidate);
    return;
  }
  dom.detailContent.innerHTML = renderProfile(candidate);
}

function renderTopCandidates(filteredCandidates) {
  const top = [...filteredCandidates]
    .sort((left, right) => computeComposite(right) - computeComposite(left))
    .slice(0, 5);

  dom.topCandidates.innerHTML = top.length
    ? top
        .map(
          (candidate, index) => `
            <article class="rank-item">
              <span>#${index + 1} · ${candidate.university}</span>
              <strong>${candidate.fullName}</strong>
              <span>${candidate.researchInterests.join(" · ")}</span>
              <div class="rank-score">${computeComposite(candidate)}</div>
            </article>
          `
        )
        .join("")
    : `<div class="empty-state"><strong>No ranking available.</strong><p>Filtered results are empty.</p></div>`;
}

function renderRecentActivity(filteredCandidates) {
  const activity = filteredCandidates
    .flatMap((candidate) =>
      candidate.activity.map((item) => ({
        ...item,
        candidate: candidate.fullName,
      }))
    )
    .sort((left, right) => right.at.localeCompare(left.at))
    .slice(0, 8);

  dom.recentActivity.innerHTML = activity.length
    ? activity
        .map(
          (item) => `
            <article class="activity-item">
              <time>${item.at}</time>
              <strong>${item.action}</strong>
              <p>${item.candidate}</p>
            </article>
          `
        )
        .join("")
    : `<div class="empty-state"><strong>No activity entries.</strong><p>Try a broader filter view.</p></div>`;
}

function renderFunnel(container, pool) {
  const stages = [
    ["new", "New"],
    ["under_review", "Under Review"],
    ["test_completed", "Tests Completed"],
    ["interview_completed", "Interviews Done"],
    ["shortlisted", "Shortlisted"],
    ["accepted", "Accepted"],
  ];

  const maxCount = Math.max(1, ...stages.map(([status]) => pool.filter((candidate) => candidate.status === status).length));

  container.innerHTML = stages
    .map(([status, label]) => {
      const count = pool.filter((candidate) => candidate.status === status).length;
      return `
        <div class="funnel-stage">
          <div class="subsection-head">
            <strong>${label}</strong>
            <span>${count}</span>
          </div>
          <div class="bar-track"><i style="width: ${(count / maxCount) * 100}%"></i></div>
        </div>
      `;
    })
    .join("");
}

function renderUniversityChart(filteredCandidates) {
  const counts = filteredCandidates.reduce((accumulator, candidate) => {
    accumulator[candidate.university] = (accumulator[candidate.university] || 0) + 1;
    return accumulator;
  }, {});

  const rows = Object.entries(counts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5);
  const max = Math.max(1, ...rows.map(([, count]) => count));

  dom.universityChart.innerHTML = rows.length
    ? rows
        .map(
          ([label, count]) => `
            <div class="chart-row">
              <strong>${label}</strong>
              <div class="chart-bar"><i style="width: ${(count / max) * 100}%"></i></div>
              <span>${count}</span>
            </div>
          `
        )
        .join("")
    : `<div class="empty-state"><strong>No university distribution.</strong><p>There are no candidates in this filtered slice.</p></div>`;
}

function updateBatchLabels() {
  dom.batchStatusInline.textContent = state.batchStatus;
  dom.batchStatusHero.textContent = state.batchStatus.replace(/^./, (char) => char.toUpperCase());
  dom.batchStatusHero.className = `status-pill ${state.batchStatus}`;
}

function updateActionStates(filteredCandidates) {
  const restricted = state.role === "reviewer";
  const hasSelection = filteredCandidates.some((candidate) => state.selectedIds.has(candidate.id));

  dom.shortlistBtn.disabled = restricted || !hasSelection;
  dom.assignBtn.disabled = restricted || !hasSelection;
  dom.exportBtn.disabled = restricted;
}

function syncTabButtons() {
  dom.detailTabs.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
}

function syncRoleButtons() {
  dom.roleSwitch.querySelectorAll(".role-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
}

function syncUniversityOptions() {
  const universities = [...new Set(candidates.map((candidate) => candidate.university))].sort();
  dom.universityFilter.innerHTML = `
    <option value="all">All universities</option>
    ${universities.map((university) => `<option value="${university}">${university}</option>`).join("")}
  `;
  dom.universityFilter.value = state.university;
}

function showSkeletons() {
  const columnCount = state.role === "reviewer" ? 8 : 11;
  dom.metricStrip.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton skeleton-card"></div>').join("");
  dom.candidateBody.innerHTML = `
    <tr>
      <td colspan="${columnCount}">
        <div class="skeleton skeleton-table"></div>
      </td>
    </tr>
  `;
  dom.detailHeader.innerHTML = '<div class="skeleton skeleton-line" style="height: 72px;"></div>';
  dom.detailContent.innerHTML = '<div class="skeleton skeleton-detail"></div>';
  dom.topCandidates.innerHTML = '<div class="skeleton skeleton-detail"></div>';
  dom.recentActivity.innerHTML = '<div class="skeleton skeleton-detail"></div>';
}

function renderAll({ withLoading = false } = {}) {
  clearTimeout(loadingTimer);

  if (withLoading) {
    showSkeletons();
  }

  loadingTimer = window.setTimeout(() => {
    const filteredCandidates = getFilteredCandidates();

    state.selectedIds = new Set(
      [...state.selectedIds].filter((candidateId) => filteredCandidates.some((candidate) => candidate.id === candidateId))
    );
    if (state.role === "reviewer") {
      state.selectedIds.clear();
    }

    renderRoleSummary();
    renderMetrics(filteredCandidates);
    renderStatusFilters();
    renderTable(filteredCandidates);
    renderDetail(getCurrentCandidate(filteredCandidates));
    renderTopCandidates(filteredCandidates);
    renderRecentActivity(filteredCandidates);
    renderFunnel(dom.heroFunnel, candidates);
    renderFunnel(dom.reportFunnel, filteredCandidates);
    renderUniversityChart(filteredCandidates);
    updateBatchLabels();
    updateActionStates(filteredCandidates);
    syncRoleButtons();
    syncTabButtons();
  }, withLoading ? 220 : 0);
}

function showToast(title, message, tone = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${tone}`;
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  dom.toastStack.appendChild(toast);
  window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

function openConfirm({ title, message, onConfirm }) {
  confirmAction = onConfirm;
  dom.confirmTitle.textContent = title;
  dom.confirmMessage.textContent = message;
  dom.confirmBackdrop.classList.remove("hidden");
  dom.confirmBackdrop.setAttribute("aria-hidden", "false");
}

function closeConfirm() {
  confirmAction = null;
  dom.confirmBackdrop.classList.add("hidden");
  dom.confirmBackdrop.setAttribute("aria-hidden", "true");
}

function applyPreset(preset) {
  if (preset === "needs_review") {
    state.statuses = new Set(["new", "under_review"]);
    state.university = "all";
    state.search = "";
    state.sort = "score-desc";
  } else if (preset === "research_heavy") {
    state.statuses = new Set(["all"]);
    state.university = "all";
    state.search = "Reasoning";
    state.sort = "score-desc";
  } else if (preset === "final_round") {
    state.statuses = new Set(["interview_completed", "shortlisted", "accepted", "waitlisted"]);
    state.university = "all";
    state.search = "";
    state.sort = "score-desc";
  }

  dom.searchInput.value = state.search;
  dom.universityFilter.value = state.university;
  dom.sortSelect.value = state.sort;
  renderAll({ withLoading: true });
  showToast("Preset loaded", `Applied the ${preset.replace(/_/g, " ")} filter preset.`);
}

function shortlistSelected() {
  const ids = [...state.selectedIds];
  if (!ids.length) {
    showToast("Nothing selected", "Choose at least one candidate before changing status.", "error");
    return;
  }

  openConfirm({
    title: "Move selected candidates to shortlisted?",
    message: "This updates the candidate status and appends a new activity entry in the demo dataset.",
    onConfirm: () => {
      ids.forEach((candidateId) => {
        const candidate = candidates.find((entry) => entry.id === candidateId);
        if (!candidate) {
          return;
        }
        candidate.status = "shortlisted";
        candidate.activity.unshift({
          at: "2026-03-06 09:00 UTC",
          action: "Bulk status change to shortlisted",
        });
      });
      showToast("Status updated", `${ids.length} candidate(s) moved to shortlisted.`);
      renderAll({ withLoading: true });
    },
  });
}

function assignReviewer() {
  const ids = [...state.selectedIds];
  if (!ids.length) {
    showToast("Nothing selected", "Select candidates before assigning a reviewer.", "error");
    return;
  }

  ids.forEach((candidateId) => {
    const candidate = candidates.find((entry) => entry.id === candidateId);
    if (!candidate) {
      return;
    }
    candidate.interview.reviewer = candidate.interview.reviewer || "Phuong Bui";
    candidate.interview.round = candidate.interview.round || 1;
    candidate.interview.scheduledDate = candidate.interview.scheduledDate || "2026-03-12";
    candidate.interview.status = candidate.interview.criteriaScores ? candidate.interview.status : "scheduled";
    if (["new", "under_review", "test_completed"].includes(candidate.status)) {
      candidate.status = "interview_scheduled";
    }
    candidate.activity.unshift({
      at: "2026-03-06 09:04 UTC",
      action: `Assigned reviewer ${candidate.interview.reviewer}`,
    });
  });

  showToast("Reviewer assigned", `Interview assignments updated for ${ids.length} candidate(s).`);
  renderAll({ withLoading: true });
}

function exportFiltered(filteredCandidates) {
  if (state.role === "reviewer") {
    showToast("Access denied", "Reviewers cannot export contact details or filtered reports.", "error");
    return;
  }

  showToast(
    "Export ready",
    `Prepared CSV export for ${filteredCandidates.length} filtered candidate(s).`
  );
}

function archiveBatch() {
  openConfirm({
    title: "Archive the active batch?",
    message: "This is a destructive administrative action and should require confirmation.",
    onConfirm: () => {
      state.batchStatus = "archived";
      showToast("Batch archived", "The active batch is now marked archived.");
      renderAll({ withLoading: true });
    },
  });
}

function bindEvents() {
  if (dom.year) {
    dom.year.textContent = new Date().getFullYear();
  }

  if (dom.menuBtn && dom.nav) {
    dom.menuBtn.addEventListener("click", () => {
      const open = dom.nav.classList.toggle("open");
      dom.menuBtn.setAttribute("aria-expanded", String(open));
    });

    dom.nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        dom.nav.classList.remove("open");
        dom.menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  dom.roleSwitch.addEventListener("click", (event) => {
    const button = event.target.closest(".role-btn");
    if (!button) {
      return;
    }
    state.role = button.dataset.role;
    renderAll({ withLoading: true });
    showToast("Role switched", `Viewing the product as ${roleConfig[state.role].label}.`);
  });

  dom.detailTabs.addEventListener("click", (event) => {
    const button = event.target.closest(".tab-btn");
    if (!button) {
      return;
    }
    state.activeTab = button.dataset.tab;
    syncTabButtons();
    renderDetail(getCurrentCandidate(getFilteredCandidates()));
  });

  dom.statusFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".status-chip");
    if (!button) {
      return;
    }
    const { status } = button.dataset;
    if (status === "all") {
      state.statuses = new Set(["all"]);
    } else {
      const next = new Set(state.statuses);
      next.delete("all");
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      state.statuses = next.size ? next : new Set(["all"]);
    }
    renderAll({ withLoading: true });
  });

  dom.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    renderAll({ withLoading: true });
  });

  dom.universityFilter.addEventListener("change", (event) => {
    state.university = event.target.value;
    renderAll({ withLoading: true });
  });

  dom.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderAll({ withLoading: true });
  });

  document.querySelectorAll(".preset-btn").forEach((button) => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
  });

  dom.savePresetBtn.addEventListener("click", () => {
    showToast("Preset saved", "Current filters saved to the active user profile in this prototype.");
  });

  dom.candidateBody.addEventListener("click", (event) => {
    const rowLink = event.target.closest(".row-link");
    if (rowLink) {
      state.selectedId = rowLink.dataset.id;
      renderAll();
      return;
    }

    const checkbox = event.target.closest(".row-checkbox");
    if (checkbox) {
      if (checkbox.checked) {
        state.selectedIds.add(checkbox.dataset.id);
      } else {
        state.selectedIds.delete(checkbox.dataset.id);
      }
      updateActionStates(getFilteredCandidates());
    }
  });

  dom.candidateHead.addEventListener("click", (event) => {
    const checkbox = event.target.closest(".select-all");
    if (!checkbox) {
      return;
    }
    const filteredCandidates = getFilteredCandidates();
    if (checkbox.checked) {
      filteredCandidates.forEach((candidate) => state.selectedIds.add(candidate.id));
    } else {
      filteredCandidates.forEach((candidate) => state.selectedIds.delete(candidate.id));
    }
    renderAll();
  });

  dom.shortlistBtn.addEventListener("click", shortlistSelected);
  dom.assignBtn.addEventListener("click", assignReviewer);
  dom.exportBtn.addEventListener("click", () => exportFiltered(getFilteredCandidates()));
  dom.archiveBatchBtn.addEventListener("click", archiveBatch);

  dom.confirmCancel.addEventListener("click", closeConfirm);
  dom.confirmAccept.addEventListener("click", () => {
    const action = confirmAction;
    closeConfirm();
    if (action) {
      action();
    }
  });

  dom.confirmBackdrop.addEventListener("click", (event) => {
    if (event.target === dom.confirmBackdrop) {
      closeConfirm();
    }
  });

  const revealNodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

syncUniversityOptions();
dom.sortSelect.value = state.sort;
bindEvents();
renderAll();
