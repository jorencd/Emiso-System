import React from "react";
import bg from "../assets/loginBG/loginBG.jpg";
import Logo from "../assets/logo/PLSPLogo.png";
import courses from "../data/courses";
import Popup from "../components/pop_up/Popup";
import FloatingInput from "../components/common/input/FloaterInput";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Icon } from "@iconify/react";

import { useLoginForm } from "../hooks/useLoginForm";
import { usePopup } from "../hooks/usePopup";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const { form, handleChange, validateLogin, validateName, validateRegister, resetForm } = useLoginForm();
  const { popup, showPopup, hidePopup } = usePopup();
  const {
    isLoggingIn,
    isRegisteringAccount,
    isRegistering,
    step,
    handleLogin,
    handleRegister,
    goToNextStep,
    toggleRegister,
  } = useAuth(showPopup, resetForm);

  // Wrapper functions to pass form data
  const onLogin = () => {
    const errorMsg = validateLogin();
    if (errorMsg) return showPopup(errorMsg);
    handleLogin(form);
  };

  const onRegister = () => {
    handleRegister(form, validateRegister);
  };

  const onNextStep = () => {
    goToNextStep(validateName);
  };

  return (
    <div
      className="relative h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Popup
        show={popup.show}
        message={popup.message}
        success={popup.success}
        onClose={hidePopup}
      />

      <div className="absolute inset-0 bg-linear-to-b from-green-100/60 to-emerald-800 backdrop-blur-xs"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full md:flex-row md:mx-30 gap-y-4 gap-x-30">
        <div className="flex flex-col items-center gap-y-4">
          <div
            className="w-40 h-40 bg-cover rounded-full md:h-70 md:w-70"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>

          <p className="text-xl font-bold text-center text-white md:text-2xl">
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg w-100 gap-y-4 rounded-xl">
          {!isRegistering && (
            <LoginForm
              form={form}
              handleChange={handleChange}
              onLogin={onLogin}
              onRegisterClick={() => toggleRegister(true)}
              isLoggingIn={isLoggingIn}
            />
          )}

          {isRegistering && step === 1 && (
            <RegisterStep1
              form={form}
              handleChange={handleChange}
              onNext={onNextStep}
              onBack={() => toggleRegister(false)}
              isRegisteringAccount={isRegisteringAccount}
            />
          )}

          {isRegistering && step === 2 && (
            <RegisterStep2
              form={form}
              handleChange={handleChange}
              onRegister={onRegister}
              onBack={() => toggleRegister(false)}
              isRegisteringAccount={isRegisteringAccount}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components for better organization
const LoginForm = ({ form, handleChange, onLogin, onRegisterClick, isLoggingIn }) => (
  <>
    <h1 className="text-3xl font-bold text-green-900">Welcome!</h1>
    <p className="text-sm text-center text-gray-600">
      Fill out the information below to access your account
    </p>

    <FloatingInput
      name="loginId"
      value={form.loginId}
      onChange={handleChange}
      label="Student ID"
      icon="mdi:card-account-details"
      disabled={isLoggingIn}
    />

    <FloatingInput
      type="password"
      name="loginPass"
      value={form.loginPass}
      onChange={handleChange}
      label="Password"
      icon="mdi:lock"
      disabled={isLoggingIn}
    />

    <button
      onClick={onLogin}
      disabled={isLoggingIn}
      className={`w-full px-4 py-3 text-white transition rounded cursor-pointer flex items-center justify-center
        ${isLoggingIn 
          ? 'bg-green-400 cursor-not-allowed' 
          : 'bg-green-700 hover:bg-green-800'
        }`}
    >
      {isLoggingIn ? (
        <>
          <LoadingSpinner />
          Logging in...
        </>
      ) : (
        'Login'
      )}
    </button>

    <div className="flex justify-between w-full text-sm">
      <p>Don't have an account?</p>
      <button
        onClick={onRegisterClick}
        disabled={isLoggingIn}
        className={`font-bold text-green-700 ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Register
      </button>
    </div>
  </>
);

const RegisterStep1 = ({ form, handleChange, onNext, onBack, isRegisteringAccount }) => (
  <>
    <h1 className="text-2xl font-bold text-green-900">What's your name?</h1>

    <FloatingInput
      name="firstName"
      value={form.firstName}
      onChange={handleChange}
      label="First Name"
      icon="mdi:account"
      disabled={isRegisteringAccount}
    />

    <FloatingInput
      name="middleName"
      value={form.middleName}
      onChange={handleChange}
      label="Middle Name"
      icon="mdi:account"
      disabled={isRegisteringAccount}
    />

    <FloatingInput
      name="lastName"
      value={form.lastName}
      onChange={handleChange}
      label="Last Name"
      icon="mdi:account"
      disabled={isRegisteringAccount}
    />

    <button
      onClick={onNext}
      disabled={isRegisteringAccount}
      className={`w-full py-3 text-white rounded ${
        isRegisteringAccount 
          ? 'bg-green-400 cursor-not-allowed' 
          : 'bg-green-700 hover:bg-green-800'
      }`}
    >
      Next
    </button>

    <button
      onClick={onBack}
      disabled={isRegisteringAccount}
      className={`text-sm text-gray-500 ${isRegisteringAccount ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      I already have an account
    </button>
  </>
);

const RegisterStep2 = ({ form, handleChange, onRegister, onBack, isRegisteringAccount }) => (
  <>
    <h1 className="text-2xl font-bold text-green-900">Student Information</h1>

    <FloatingInput
      name="studentId"
      value={form.studentId}
      onChange={handleChange}
      label="Student ID"
      icon="mdi:card-account-details"
      disabled={isRegisteringAccount}
    />

    <FloatingInput
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      label="Password"
      icon="mdi:lock"
      disabled={isRegisteringAccount}
    />

    <FloatingInput
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      label="Confirm Password"
      icon="mdi:lock-check"
      disabled={isRegisteringAccount}
    />

    <div className="relative w-full">
      <Icon
        icon="mdi:school"
        className="absolute text-xl text-gray-400 -translate-y-1/2 left-3 top-1/2"
      />

      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        disabled={isRegisteringAccount}
        className={`w-full px-10 py-3 border-2 border-gray-300 rounded focus:border-green-700 focus:outline-none ${
          isRegisteringAccount ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      >
        <option value="">Select Course</option>
        {courses.map((course, i) => (
          <option key={i} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={onRegister}
      disabled={isRegisteringAccount}
      className={`w-full py-3 text-white rounded flex items-center justify-center ${
        isRegisteringAccount 
          ? 'bg-green-400 cursor-not-allowed' 
          : 'bg-green-700 hover:bg-green-800'
      }`}
    >
      {isRegisteringAccount ? (
        <>
          <LoadingSpinner />
          Registering...
        </>
      ) : (
        'Register Account'
      )}
    </button>

    <button
      onClick={onBack}
      disabled={isRegisteringAccount}
      className={`text-sm text-gray-500 ${isRegisteringAccount ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      I already have an account
    </button>
  </>
);

export default LoginPage;