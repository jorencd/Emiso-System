export const nameRegex = /^[A-Za-z\s]+$/;
export const idRegex = /^\d{2}-\d{5}$/;
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// STEP 1
export const validateNameStep = (form) => {
  if (!form.firstName.trim()) return "First Name is required";
  if (!form.lastName.trim()) return "Last Name is required";
  if (!nameRegex.test(form.firstName)) return "Valid First Name required";
  if (form.middleName && !nameRegex.test(form.middleName))
    return "Middle Name letters only";
  if (!nameRegex.test(form.lastName)) return "Valid Last Name required";

  return null;
};

// STEP 2
export const validateRegisterStep = (form) => {
  if (!idRegex.test(form.studentId))
    return "Student ID format must be 12-3456";

  if (!passRegex.test(form.password))
    return "Password must be strong";

  if (form.password !== form.confirmPassword)
    return "Passwords do not match";

  if (!form.course)
    return "Please select a course";

  return null;
};

// LOGIN
export const validateLoginInput = (form) => {
  if (!idRegex.test(form.loginId))
    return "Student ID format must be 12-3456";

  if (!form.loginPass)
    return "Password required";

  return null;
};
