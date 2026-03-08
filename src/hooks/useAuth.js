import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent, registerStudent } from "../services/authService";

export const useAuth = (showPopup, resetForm) => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegisteringAccount, setIsRegisteringAccount] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);

  const handleLogin = async (form) => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    const res = await loginStudent(form.loginId, form.loginPass);

    if (!res.success) {
      setIsLoggingIn(false);
      showPopup(res.message);
      return;
    }

    localStorage.setItem("auth", "true");
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    showPopup("Login Successful", true);

    setTimeout(() => {
      setIsLoggingIn(false);
      navigate("/hero");
    }, 1000);
  };

  const handleRegister = async (form, validateRegister) => {
    if (isRegisteringAccount) return;

    const errorMsg = validateRegister();
    if (errorMsg) {
      showPopup(errorMsg);
      return;
    }

    setIsRegisteringAccount(true);
    const res = await registerStudent(form);

    if (!res.success) {
      setIsRegisteringAccount(false);
      showPopup(res.message);
      return;
    }

    showPopup("Registration Successful", true);
    
    // Reset all states
    setIsRegistering(false);
    setStep(1);
    setIsRegisteringAccount(false);
    resetForm();
  };

  const goToNextStep = (validateName) => {
    const errorMsg = validateName();
    if (errorMsg) {
      showPopup(errorMsg);
      return;
    }
    setStep(2);
  };

  const toggleRegister = (value) => {
    setIsRegistering(value);
    if (!value) setStep(1);
  };

  return {
    // States
    isLoggingIn,
    isRegisteringAccount,
    isRegistering,
    step,
    
    // Actions
    handleLogin,
    handleRegister,
    goToNextStep,
    toggleRegister,
    setStep,
  };
};