import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

// LOGIN - Compare hashed password
export const loginStudent = async (studentId, password) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", studentId)
    .single();

  if (error || !data) {
    return { success: false, message: "Invalid login credentials" };
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, data.password);
  
  if (!isPasswordValid) {
    return { success: false, message: "Invalid login credentials" };
  }

  const { password: _, ...userWithoutPassword } = data;
  
  return { success: true, data: userWithoutPassword };
};

// REGISTER - Hash password before storing
export const registerStudent = async (form) => {
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

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);

    // Insert with hashed password
    const { error } = await supabase
      .from("students")
      .insert([
        {
          student_id: form.studentId,
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          course: form.course,
          password: hashedPassword,
        },
      ]);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: "Error creating account" };
  }
};