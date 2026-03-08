import { useState } from "react";
import {
  validateNameStep,
  validateRegisterStep,
  validateLoginInput,
} from "../utils/validators";

export const useLoginForm = () => {
  const [form, setForm] = useState({
    loginId: "",
    loginPass: "",
    firstName: "",
    middleName: "",
    lastName: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateLogin = () => validateLoginInput(form);
  const validateName = () => validateNameStep(form);
  const validateRegister = () => validateRegisterStep(form);

  const resetForm = () => {
    setForm({
      loginId: "",
      loginPass: "",
      firstName: "",
      middleName: "",
      lastName: "",
      studentId: "",
      password: "",
      confirmPassword: "",
      course: "",
    });
  };

  return {
    form,
    handleChange,
    validateLogin,
    validateName,
    validateRegister,
    resetForm,
  };
};