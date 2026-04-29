export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type Applicant = {
  id: string;
  name: string;
  program: string;
  intake: string;
  stage: "Under Review" | "Interview" | "Decision Ready" | "Admitted";
  feeStatus: "Paid" | "Pending" | "Waived";
  documents: "Verified" | "Needs Review" | "Missing";
  score: string;
  reviewer: string;
};

export type Program = {
  id: string;
  title: string;
  code: string;
  level: string;
  duration: string;
  seats: number;
  status: "Active" | "Draft" | "Closed";
};

export const admissionNav: NavItem[] = [
  { label: "Dashboard", href: "", icon: "dashboard" },
  { label: "Analytics", href: "/analytics", icon: "query_stats" },
  { label: "Applications", href: "/applications", icon: "description" },
  { label: "Review Queue", href: "/review-queue", icon: "fact_check" },
  { label: "Documents", href: "/documents", icon: "inventory_2" },
  { label: "Programs", href: "/programs", icon: "school" },
  { label: "Fees", href: "/fees", icon: "payments" },
  { label: "Payments", href: "/payments", icon: "receipt_long" },
  { label: "History", href: "/history", icon: "timeline" },
  { label: "Drafts", href: "/drafts", icon: "draft" },
  { label: "Interviews", href: "/interviews", icon: "event" },
  { label: "Portal Status", href: "/portal-status", icon: "monitoring" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export const dashboardMetrics = [
  { label: "Applications", value: "2,418", delta: "+12.4%", icon: "description", tone: "indigo" },
  { label: "Conversion Rate", value: "41%", delta: "+3.2%", icon: "insights", tone: "sky" },
  { label: "Pending Review", value: "146", delta: "22 urgent", icon: "pending_actions", tone: "amber" },
  { label: "Fee Collection", value: "87%", delta: "+5.9%", icon: "payments", tone: "emerald" },
];

export const screenPreviews = [
  {
    title: "Admission Admin Dashboard",
    subtitle: "Decision velocity, intake volume, and operational health",
    href: "/",
    image: "/admission-previews/admission_admin_dashboard.png",
  },
  {
    title: "Application Management",
    subtitle: "Applicant roster, filtering, and admissions workflow ownership",
    href: "/applications",
    image: "/admission-previews/admission_application_management.png",
  },
  {
    title: "Review Queue",
    subtitle: "Prioritized review workbench for admissions officers",
    href: "/review-queue",
    image: "/admission-previews/admission_review_queue.png",
  },
  {
    title: "Admission Analytics",
    subtitle: "Pipeline, interview, and payment trends for the current cycle",
    href: "/analytics",
    image: "/admission-previews/admission_analytics_dashboard.png",
  },
];

export const applicants: Applicant[] = [
  {
    id: "app-2026-0012",
    name: "Sophia Martinez",
    program: "BSc Computer Science",
    intake: "Fall 2026",
    stage: "Decision Ready",
    feeStatus: "Paid",
    documents: "Verified",
    score: "91 / 100",
    reviewer: "D. Mensah",
  },
  {
    id: "app-2026-0041",
    name: "Daniel Okeke",
    program: "MBA",
    intake: "Fall 2026",
    stage: "Interview",
    feeStatus: "Pending",
    documents: "Needs Review",
    score: "84 / 100",
    reviewer: "R. Shah",
  },
  {
    id: "app-2026-0065",
    name: "Maya Hassan",
    program: "BSc Nursing",
    intake: "Spring 2027",
    stage: "Under Review",
    feeStatus: "Waived",
    documents: "Verified",
    score: "88 / 100",
    reviewer: "A. Lewis",
  },
  {
    id: "app-2026-0088",
    name: "Ethan Kim",
    program: "BArch",
    intake: "Fall 2026",
    stage: "Admitted",
    feeStatus: "Paid",
    documents: "Verified",
    score: "94 / 100",
    reviewer: "J. Okafor",
  },
];

export const programs: Program[] = [
  {
    id: "prog-cs",
    title: "BSc Computer Science",
    code: "CS-BSC",
    level: "Undergraduate",
    duration: "4 years",
    seats: 180,
    status: "Active",
  },
  {
    id: "prog-mba",
    title: "Master of Business Administration",
    code: "MBA",
    level: "Postgraduate",
    duration: "2 years",
    seats: 90,
    status: "Active",
  },
  {
    id: "prog-nur",
    title: "BSc Nursing",
    code: "NUR-BSC",
    level: "Undergraduate",
    duration: "4 years",
    seats: 120,
    status: "Draft",
  },
];

export const reviewQueue = [
  {
    applicant: "Sophia Martinez",
    program: "BSc Computer Science",
    issue: "Committee sign-off pending",
    eta: "Approve today",
  },
  {
    applicant: "Daniel Okeke",
    program: "MBA",
    issue: "Interview notes incomplete",
    eta: "Needs coordinator review",
  },
  {
    applicant: "Maya Hassan",
    program: "BSc Nursing",
    issue: "Transcript cross-check",
    eta: "Awaiting verifier",
  },
];

export const interviewSchedule = [
  { slot: "09:00", applicant: "Daniel Okeke", panel: "Graduate Panel A", mode: "Virtual" },
  { slot: "10:30", applicant: "Nina Patel", panel: "Scholarship Review", mode: "On campus" },
  { slot: "13:00", applicant: "Joshua Reed", panel: "Architecture Faculty", mode: "Portfolio review" },
];

export const paymentRecords = [
  { invoice: "ADM-24031", applicant: "Sophia Martinez", method: "Card", amount: "$120", status: "Captured" },
  { invoice: "ADM-24028", applicant: "Daniel Okeke", method: "Bank transfer", amount: "$120", status: "Pending verification" },
  { invoice: "ADM-24016", applicant: "Maya Hassan", method: "Waiver", amount: "$0", status: "Approved waiver" },
];

export const settingsSections = [
  {
    title: "Workflow Rules",
    description: "Configure review routing, SLA thresholds, and decision approvals.",
    items: ["Auto-assignment logic", "Escalation windows", "Committee review chain"],
  },
  {
    title: "Applicant Communications",
    description: "Manage portal visibility and applicant notifications.",
    items: ["Decision release timing", "Interview reminders", "Portal status labels"],
  },
  {
    title: "Finance Controls",
    description: "Admission fee policies and waiver permissions.",
    items: ["Fee amount by program", "Waiver approval role", "Refund handling"],
  },
];

export const draftApplications = [
  { applicant: "Lina Farouk", program: "BSc Biology", updated: "2h ago", completeness: "78%" },
  { applicant: "Victor James", program: "BSc Accounting", updated: "5h ago", completeness: "61%" },
  { applicant: "Grace Chen", program: "MBA", updated: "Yesterday", completeness: "89%" },
];

export const historyTimeline = [
  ["Today • 09:10", "Interview confirmed", "Daniel Okeke accepted the revised interview slot and uploaded the updated SOP."],
  ["Apr 12 • 16:45", "Documents verified", "Sophia Martinez completed transcript verification and committee review moved to final stage."],
  ["Apr 09 • 08:32", "Application submitted", "Maya Hassan completed payment waiver approval and application moved to review."],
];

export function getApplicantById(id: string) {
  return applicants.find((applicant) => applicant.id === id);
}

export function getStatusTone(status: string) {
  if (
    status === "Paid" ||
    status === "Verified" ||
    status === "Admitted" ||
    status === "Active" ||
    status === "Captured"
  ) {
    return "emerald";
  }
  if (
    status === "Interview" ||
    status === "Decision Ready" ||
    status === "Pending" ||
    status === "Needs Review" ||
    status === "Draft" ||
    status === "Pending verification"
  ) {
    return "amber";
  }
  if (status === "Waived" || status === "Approved waiver") {
    return "sky";
  }
  return "rose";
}
