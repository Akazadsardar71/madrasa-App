import { pgTable, text, serial, integer, boolean, timestamp, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("staff"),
  mobileNumber: text("mobile_number"),
  email: text("email"),
  active: boolean("active").default(true),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Student model
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  fatherName: text("father_name").notNull(),
  motherName: text("mother_name").notNull(),
  dateOfBirth: text("date_of_birth"),
  className: text("class_name").notNull(),
  rollNumber: text("roll_number"),
  address: text("address"),
  mobileNumber: text("mobile_number"),
  guardianMobile: text("guardian_mobile"),
  admissionDate: text("admission_date").notNull(),
  status: text("status").default("active"),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

// Teacher model
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  teacherId: text("teacher_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  fatherName: text("father_name"),
  qualification: text("qualification"),
  specialization: text("specialization"),
  joiningDate: text("joining_date").notNull(),
  address: text("address"),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email"),
  salary: real("salary"),
  status: text("status").default("active"),
});

export const insertTeacherSchema = createInsertSchema(teachers).omit({
  id: true,
});

// Attendance model
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  studentId: text("student_id").notNull(),
  className: text("class_name").notNull(),
  status: text("status").notNull(), // present, absent, late
  notes: text("notes"),
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
});

// Exam model
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  examName: text("exam_name").notNull(),
  examType: text("exam_type").notNull(), // Monthly, Quarterly, Half-yearly, Annual
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  className: text("class_name").notNull(),
});

export const insertExamSchema = createInsertSchema(exams).omit({
  id: true,
});

// Exam Results model
export const examResults = pgTable("exam_results", {
  id: serial("id").primaryKey(),
  examId: integer("exam_id").notNull(),
  studentId: text("student_id").notNull(),
  subjectName: text("subject_name").notNull(),
  marksObtained: real("marks_obtained").notNull(),
  totalMarks: real("total_marks").notNull(),
  grade: text("grade"),
  remarks: text("remarks"),
});

export const insertExamResultSchema = createInsertSchema(examResults).omit({
  id: true,
});

// Fee model
export const fees = pgTable("fees", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").notNull(),
  feeType: text("fee_type").notNull(), // Tuition, Admission, Exam, etc.
  amount: real("amount").notNull(),
  dueDate: text("due_date").notNull(),
  paymentStatus: text("payment_status").default("unpaid"), // paid, unpaid, partial
  paymentDate: text("payment_date"),
  receiptNumber: text("receipt_number"),
  notes: text("notes"),
});

export const insertFeeSchema = createInsertSchema(fees).omit({
  id: true,
});

// Expense model
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  expenseType: text("expense_type").notNull(), // Salary, Maintenance, Utilities, etc.
  amount: real("amount").notNull(),
  expenseDate: text("expense_date").notNull(),
  paidTo: text("paid_to").notNull(),
  paidBy: text("paid_by").notNull(),
  receiptNumber: text("receipt_number"),
  description: text("description"),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
});

// Curriculum/Subject model
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  subjectName: text("subject_name").notNull(),
  subjectCode: text("subject_code"),
  className: text("class_name").notNull(),
  teacherId: text("teacher_id"),
  description: text("description"),
  booksRequired: text("books_required"),
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

// Notice model
export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  publishDate: text("publish_date").notNull(),
  expireDate: text("expire_date"),
  noticeType: text("notice_type").default("general"), // general, exam, holiday, event
  forClass: text("for_class"), // specific class or all
  createdBy: text("created_by").notNull(),
});

export const insertNoticeSchema = createInsertSchema(notices).omit({
  id: true,
});

// Prayer Times model
export const prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  fajr: text("fajr").notNull(),
  sunrise: text("sunrise"),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  sunset: text("sunset"),
  isha: text("isha").notNull(),
});

export const insertPrayerTimeSchema = createInsertSchema(prayerTimes).omit({
  id: true,
});

// Donation model (চাঁদা আদায়)
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorName: text("donor_name").notNull(),
  donorMobile: text("donor_mobile"),
  donorAddress: text("donor_address"),
  amount: real("amount").notNull(),
  donationDate: text("donation_date").notNull(),
  donationType: text("donation_type").notNull(), // Monthly, One-time, Annual, etc.
  receiptNumber: text("receipt_number").notNull(),
  collectedBy: text("collected_by").notNull(),
  purpose: text("purpose"),
  notes: text("notes"),
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
});

// Committee Member model (মাদ্রাসা কমিটি)
export const committeeMembers = pgTable("committee_members", {
  id: serial("id").primaryKey(),
  memberId: text("member_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  position: text("position").notNull(), // Chairman, Secretary, Treasurer, Member, etc.
  joiningDate: text("joining_date").notNull(),
  address: text("address"),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email"),
  occupation: text("occupation"),
  termStart: text("term_start").notNull(),
  termEnd: text("term_end"),
  status: text("status").default("active"),
  profileImage: text("profile_image"),
  notes: text("notes"),
});

export const insertCommitteeMemberSchema = createInsertSchema(committeeMembers).omit({
  id: true,
});

// Union Committee model (ইসলামী আন্দোলন বাংলাদেশ ইউনিয়ন কমিটি)
export const unionCommitteeMembers = pgTable("union_committee_members", {
  id: serial("id").primaryKey(),
  memberId: text("member_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  position: text("position").notNull(), // Chairman, Secretary, Member, etc.
  joiningDate: text("joining_date").notNull(),
  address: text("address"),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email"),
  occupation: text("occupation"),
  wardNumber: text("ward_number"), // ওয়ার্ড নম্বর (1-9), null = ইউনিয়ন কমিটি
  wardName: text("ward_name"),     // ওয়ার্ডের নাম
  committeeType: text("committee_type").notNull(), // ইউনিয়ন/ওয়ার্ড
  termStart: text("term_start").notNull(),
  termEnd: text("term_end"),
  status: text("status").default("active"),
  profileImage: text("profile_image"),
  notes: text("notes"),
});

export const insertUnionCommitteeMemberSchema = createInsertSchema(unionCommitteeMembers).omit({
  id: true,
});

// Union Donations model (ইসলামী আন্দোলন বাংলাদেশ ইউনিয়ন মাসিক চাঁদা)
export const unionDonations = pgTable("union_donations", {
  id: serial("id").primaryKey(),
  donorName: text("donor_name").notNull(),
  donorMobile: text("donor_mobile"),
  donorAddress: text("donor_address"),
  amount: real("amount").notNull(),
  donationDate: text("donation_date").notNull(),
  donationType: text("donation_type").notNull(), // Monthly, One-time, Annual, etc.
  receiptNumber: text("receipt_number").notNull(),
  collectedBy: text("collected_by").notNull(),
  wardNumber: text("ward_number"), // ওয়ার্ড নম্বর (1-9)
  wardName: text("ward_name"),     // ওয়ার্ডের নাম
  purpose: text("purpose"),
  notes: text("notes"),
});

export const insertUnionDonationSchema = createInsertSchema(unionDonations).omit({
  id: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;

export type ExamResult = typeof examResults.$inferSelect;
export type InsertExamResult = z.infer<typeof insertExamResultSchema>;

export type Fee = typeof fees.$inferSelect;
export type InsertFee = z.infer<typeof insertFeeSchema>;

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Notice = typeof notices.$inferSelect;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;

export type PrayerTime = typeof prayerTimes.$inferSelect;
export type InsertPrayerTime = z.infer<typeof insertPrayerTimeSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;

export type CommitteeMember = typeof committeeMembers.$inferSelect;
export type InsertCommitteeMember = z.infer<typeof insertCommitteeMemberSchema>;

export type UnionCommitteeMember = typeof unionCommitteeMembers.$inferSelect;
export type InsertUnionCommitteeMember = z.infer<typeof insertUnionCommitteeMemberSchema>;

export type UnionDonation = typeof unionDonations.$inferSelect;
export type InsertUnionDonation = z.infer<typeof insertUnionDonationSchema>;
