import React, { useState } from "react";
import bg from "../assets/loginBG/loginBG.jpg";
import Logo from "../assets/logo/PLSPLogo.png";
import courses from "../data/courses";
import Popup from "../components/pop_up/Popup";

import { loginStudent, registerStudent } from "../services/authService";
import {
  validateNameStep,
  validateRegisterStep,
  validateLoginInput,
} from "../utils/validators";

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false,
  });

  const showPopup = (msg, success = false) => {
    setPopup({ show: true, message: msg, success });
  };

  const [form, setForm] = useState({
    // LOGIN
    loginId: "",
    loginPass: "",

    // REGISTER STEP 1
    firstName: "",
    middleName: "",
    lastName: "",
    
    // REGISTER STEP 2
    studentId: "",
    password: "",
    confirmPassword: "",
    course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN
  const handleLogin = async () => {
    const errorMsg = validateLoginInput(form);
    if (errorMsg) return showPopup(errorMsg);

    const res = await loginStudent(form.loginId, form.loginPass);

    if (!res.success) return showPopup(res.message);

    showPopup("Login Successful", true);
  };

  // STEP 1
  const handleStep1 = () => {
    const errorMsg = validateNameStep(form);
    if (errorMsg) return showPopup(errorMsg);

    setStep(2);
  };

  // STEP 2
  const handleRegister = async () => {
    const errorMsg = validateRegisterStep(form);
    if (errorMsg) return showPopup(errorMsg);

    const res = await registerStudent(form);

    if (!res.success) return showPopup(res.message);

    showPopup("Registration Successful", true);

    setIsRegistering(false);
    setStep(1);
    setForm({
      ...form,
      studentId: "",
      password: "",
      confirmPassword: "",
      course: "",
    });
  };


  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Popup
        show={popup.show}
        message={popup.message}
        success={popup.success}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      <div className="absolute inset-0 bg-linear-to-b from-green-100/60 to-emerald-800 backdrop-blur-xs"></div>

      <div className="flex md:flex-row flex-col md:mx-30 gap-y-4 gap-x-30 items-center justify-center relative z-10 h-full">

        <div className="flex flex-col items-center gap-y-4">
          <div
            className="md:h-70 md:w-70 h-40 w-40 bg-cover rounded-full"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>

          <p className="md:text-2xl text-xl w-full font-bold text-white text-center">
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className="flex flex-col w-100 justify-center items-center gap-y-2 bg-white rounded-xl p-6">

          {/* LOGIN */}
          {!isRegistering && (
            <>
              <h1 className="text-green-900 font-bold text-3xl">Welcome!</h1>
              <p>Fill out the information below in order to access your account</p>

              <input
                name="loginId"
                onChange={handleChange}
                placeholder="Student ID"
                className="border-2 border-gray-300 rounded p-2 w-full"
              />

              <input
                type="password"
                name="loginPass"
                onChange={handleChange}
                placeholder="Password"
                className="border-2 border-gray-300 rounded p-2 w-full"
              />

              <button
                onClick={handleLogin}
                className="bg-green-700 hover:bg-green-800 w-full text-white px-4 py-2 rounded cursor-pointer"
              >
                Login
              </button>

              <div className="flex justify-between w-full text-sm">
                <p>Don't have an account?</p>
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-green-700 font-bold cursor-pointer"
                >
                  Register
                </button>
              </div>
            </>
          )}

          {/* REGISTER STEP 1 */}
          {isRegistering && step === 1 && (
            <div className="flex flex-col w-full gap-y-2">
              <h1 className="text-green-900 font-bold text-2xl">
                What's your name?
              </h1>

              <input name="firstName" onChange={handleChange}
                placeholder="First Name"
                className="border-2 border-gray-300 rounded p-2" />

              <input name="middleName" onChange={handleChange}
                placeholder="Middle Name"
                className="border-2 border-gray-300 rounded p-2" />

              <input name="lastName" onChange={handleChange}
                placeholder="Last Name"
                className="border-2 border-gray-300 rounded p-2" />

              <button
                onClick={handleStep1}
                className="bg-green-700 hover:bg-green-800 text-white py-2 rounded cursor-pointer"
              >
                Next
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1); }}
                className="text-sm text-gray-500 cursor-pointer"
              >
                I already have an account
              </button>
            </div>
          )}

          {/* REGISTER STEP 2 */}
          {isRegistering && step === 2 && (
            <>
              <h1 className="text-green-900 font-bold text-2xl">
                Student Information
              </h1>

              <input name="studentId" onChange={handleChange}
                placeholder="Student ID"
                className="border-2 border-gray-300 rounded p-2 w-full" />

              <input type="password" name="password" onChange={handleChange}
                placeholder="Password"
                className="border-2 border-gray-300 rounded p-2 w-full" />

              <input type="password" name="confirmPassword" onChange={handleChange}
                placeholder="Confirm Password"
                className="border-2 border-gray-300 rounded p-2 w-full" />

              <select name="course" onChange={handleChange}
                className="border-2 border-gray-300 rounded p-2 w-full">
                <option value="">Select Course</option>
                {courses.map((course, i) => (
                  <option key={i} value={course}>{course}</option>
                ))}
              </select>

              <button
                onClick={handleRegister}
                className="bg-green-700 hover:bg-green-800 text-white py-2 rounded cursor-pointer w-full"
              >
                Register Account
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1); }}
                className="text-sm text-gray-500 cursor-pointer"
              >
                I already have an account
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
