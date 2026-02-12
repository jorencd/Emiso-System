import { supabase } from "../supabaseClient";

// LOGIN
export const loginStudent = async (studentId, password) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", studentId)
    .eq("password", password)
    .single();

  if (error || !data) {
    return { success: false, message: "Invalid login credentials" };
  }

  return { success: true, data };
};

// REGISTER
export const registerStudent = async (form) => {
  // 1️⃣ Check if student ID already exists
  const { data: existing, error: checkError } = await supabase
    .from("students")
    .select("student_id")
    .eq("student_id", form.studentId)
    .maybeSingle();

  if (checkError) {
    return { success: false, message: "Error checking student ID" };
  }

  if (existing) {
    return { success: false, message: "Student ID already registered" };
  }

  // 2️⃣ Insert if not existing
  const { error } = await supabase
    .from("students")
    .insert([
      {
        student_id: form.studentId,
        first_name: form.firstName,
        middle_name: form.middleName,
        last_name: form.lastName,
        course: form.course,
        password: form.password,
      },
    ]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
};

