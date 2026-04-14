export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type Student = {
  id: string;
  name: string;
  program: string;
  year: string;
  block: string;
  room: string;
  bed: string;
  status: "Resident" | "Pending Transfer" | "Pending Checkout";
  feeStatus: "Clear" | "Partial" | "Overdue";
  guardian: string;
  phone: string;
};

export type Room = {
  id: string;
  code: string;
  block: string;
  type: string;
  capacity: number;
  occupied: number;
  residentLead?: string;
  status: "Available" | "Nearly Full" | "Maintenance";
  rate: string;
};

export const hostelNav: NavItem[] = [
  { label: "Dashboard", href: "", icon: "dashboard" },
  { label: "Analytics", href: "/analytics", icon: "query_stats" },
  { label: "Students", href: "/students", icon: "group" },
  { label: "Rooms", href: "/rooms", icon: "bed" },
  { label: "Allocation", href: "/allocation", icon: "assignment_ind" },
  { label: "Transfers", href: "/transfers", icon: "swap_horiz" },
  { label: "Check-ins", href: "/check-ins", icon: "login" },
  { label: "Fees", href: "/fees", icon: "payments" },
  { label: "Payments", href: "/payments", icon: "receipt_long" },
  { label: "Complaints", href: "/complaints", icon: "build_circle" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export const dashboardMetrics = [
  { label: "Residents", value: "1,284", delta: "+4.8%", icon: "group", tone: "emerald" },
  { label: "Occupancy Rate", value: "92.5%", delta: "+1.2%", icon: "domain", tone: "sky" },
  { label: "Pending Transfers", value: "18", delta: "5 urgent", icon: "swap_horiz", tone: "amber" },
  { label: "Fee Collection", value: "84%", delta: "+7.1%", icon: "payments", tone: "violet" },
];

export const screenPreviews = [
  {
    title: "Hostel Admin Dashboard",
    subtitle: "Executive overview for wardens and operations leads",
    href: "/",
    image: "/hostel-previews/hostel_admin_dashboard.png",
  },
  {
    title: "Student Management",
    subtitle: "Resident tracking, status filtering, and room visibility",
    href: "/students",
    image: "/hostel-previews/hostel_student_management_desktop.png",
  },
  {
    title: "Room Allocation Workflow",
    subtitle: "Assign students to the right blocks and available beds",
    href: "/allocation",
    image: "/hostel-previews/room_allocation_workflow.png",
  },
  {
    title: "Hostel Analytics Dashboard",
    subtitle: "Occupancy, maintenance, and recovery trends",
    href: "/analytics",
    image: "/hostel-previews/hostel_analytics_dashboard.png",
  },
];

export const students: Student[] = [
  {
    id: "stu-2024-001",
    name: "James Anderson",
    program: "Computer Science",
    year: "Year 3",
    block: "Block A",
    room: "A-203",
    bed: "Bed 2",
    status: "Resident",
    feeStatus: "Clear",
    guardian: "Maria Anderson",
    phone: "+1 555 0180",
  },
  {
    id: "stu-2024-014",
    name: "Aisha Bello",
    program: "Business Administration",
    year: "Year 2",
    block: "Block C",
    room: "C-118",
    bed: "Bed 1",
    status: "Pending Transfer",
    feeStatus: "Partial",
    guardian: "Ibrahim Bello",
    phone: "+1 555 0118",
  },
  {
    id: "stu-2024-021",
    name: "Liam Chen",
    program: "Architecture",
    year: "Year 4",
    block: "Block B",
    room: "B-307",
    bed: "Bed 3",
    status: "Resident",
    feeStatus: "Overdue",
    guardian: "Wei Chen",
    phone: "+1 555 0127",
  },
  {
    id: "stu-2024-039",
    name: "Ruth Mensah",
    program: "Nursing",
    year: "Year 1",
    block: "Block D",
    room: "D-104",
    bed: "Bed 1",
    status: "Pending Checkout",
    feeStatus: "Clear",
    guardian: "Samuel Mensah",
    phone: "+1 555 0194",
  },
];

export const rooms: Room[] = [
  {
    id: "room-a203",
    code: "A-203",
    block: "Block A",
    type: "Double Deluxe",
    capacity: 2,
    occupied: 1,
    residentLead: "James Anderson",
    status: "Available",
    rate: "$1,250 / term",
  },
  {
    id: "room-b307",
    code: "B-307",
    block: "Block B",
    type: "Triple Standard",
    capacity: 3,
    occupied: 2,
    residentLead: "Liam Chen",
    status: "Nearly Full",
    rate: "$980 / term",
  },
  {
    id: "room-c118",
    code: "C-118",
    block: "Block C",
    type: "Double Ensuite",
    capacity: 2,
    occupied: 2,
    residentLead: "Aisha Bello",
    status: "Nearly Full",
    rate: "$1,340 / term",
  },
  {
    id: "room-d221",
    code: "D-221",
    block: "Block D",
    type: "Single Premium",
    capacity: 1,
    occupied: 0,
    status: "Maintenance",
    rate: "$1,720 / term",
  },
];

export const roomRecommendations = [
  { code: "A-203", match: "Best match", note: "Close to CS labs, 1 bed available" },
  { code: "A-205", match: "Quiet floor", note: "Suitable for returning residents" },
  { code: "B-112", match: "Budget option", note: "Triple room with strong peer mix" },
];

export const transferQueue = [
  {
    student: "Aisha Bello",
    from: "C-118",
    to: "A-205",
    reason: "Program block alignment",
    eta: "Needs approval today",
  },
  {
    student: "Noah Okafor",
    from: "D-308",
    to: "B-112",
    reason: "Medical accessibility request",
    eta: "Pending finance clearance",
  },
];

export const checkInSchedule = [
  { slot: "08:30", student: "Ruth Mensah", action: "Check-out", desk: "Front Office 2" },
  { slot: "09:15", student: "Kofi Adu", action: "Check-in", desk: "Front Office 1" },
  { slot: "10:00", student: "Emily Park", action: "Check-in", desk: "Express Desk" },
];

export const paymentRecords = [
  { invoice: "INV-24031", student: "Liam Chen", method: "Bank transfer", amount: "$640", status: "Captured" },
  { invoice: "INV-24028", student: "Aisha Bello", method: "Card", amount: "$420", status: "Pending verification" },
  { invoice: "INV-24016", student: "James Anderson", method: "Wallet", amount: "$1,250", status: "Settled" },
];

export const complaintRecords = [
  { id: "CMP-210", title: "Water pressure issue", block: "Block B", priority: "High", owner: "Maintenance Desk" },
  { id: "CMP-208", title: "Door lock replacement", block: "Block A", priority: "Medium", owner: "Security Ops" },
  { id: "CMP-201", title: "Internet access unstable", block: "Block C", priority: "High", owner: "Campus IT" },
];

export const settingsSections = [
  {
    title: "Allocation Rules",
    description: "Configure eligibility and auto-assignment preferences.",
    items: ["Program-to-block mapping", "Bed hold period", "Transfer approval chain"],
  },
  {
    title: "Finance Controls",
    description: "Coordinate invoice generation and payment reconciliation windows.",
    items: ["Late fee threshold", "Payment reminder cadence", "Manual waiver permissions"],
  },
  {
    title: "Operations Alerts",
    description: "Choose which events create notifications for hostel staff.",
    items: ["Overdue payments", "Maintenance SLA breach", "Checkout exceptions"],
  },
];

export function getStudentById(id: string) {
  return students.find((student) => student.id === id);
}

export function getStatusTone(status: string) {
  if (status === "Clear" || status === "Resident" || status === "Available" || status === "Captured" || status === "Settled") {
    return "emerald";
  }
  if (status === "Partial" || status === "Pending Transfer" || status === "Pending verification" || status === "Nearly Full") {
    return "amber";
  }
  return "rose";
}
