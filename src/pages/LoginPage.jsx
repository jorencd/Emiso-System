import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/loginBG/loginBG.jpg";
import Logo from "../assets/logo/PLSPLogo.png";
import courses from "../data/courses";
import Popup from "../components/pop_up/Popup";
import FloatingInput from "../components/common/input/FloaterInput";

import { loginStudent, registerStudent } from "../services/authService";
import {
  validateNameStep,
  validateRegisterStep,
  validateLoginInput,
} from "../utils/validators";

function LoginPage() {
  const navigate = useNavigate();
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

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const errorMsg = validateLoginInput(form);
    if (errorMsg) return showPopup(errorMsg);

    const res = await loginStudent(form.loginId, form.loginPass);

    if (!res.success) return showPopup(res.message);

    localStorage.setItem("auth", "true");

    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    showPopup("Login Successful", true);

    setTimeout(() => {
      navigate("/hero");
    }, 1000);
  };

  /* ================= REGISTER STEP 1 ================= */
  const handleStep1 = () => {
    const errorMsg = validateNameStep(form);
    if (errorMsg) return showPopup(errorMsg);
    setStep(2);
  };

  /* ================= REGISTER STEP 2 ================= */
  const handleRegister = async () => {
    const errorMsg = validateRegisterStep(form);
    if (errorMsg) return showPopup(errorMsg);

    const res = await registerStudent(form);

    if (!res.success) return showPopup(res.message);

    showPopup("Registration Successful", true);

    setIsRegistering(false);
    setStep(1);
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

          <p className="md:text-2xl text-xl font-bold text-white text-center">
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className="flex flex-col w-100 justify-center items-center gap-y-4 bg-white rounded-xl p-6 shadow-lg">

          {!isRegistering && (
            <>
              <h1 className="text-green-900 font-bold text-3xl">Welcome!</h1>
              <p className="text-sm text-gray-600 text-center">
                Fill out the information below to access your account
              </p>

              <FloatingInput
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                label="Student ID"
                icon="mdi:card-account-details"
              />

              <FloatingInput
                type="password"
                name="loginPass"
                value={form.loginPass}
                onChange={handleChange}
                label="Password"
                icon="mdi:lock"
              />

              <button
                onClick={handleLogin}
                className="bg-green-700 hover:bg-green-800 w-full text-white px-4 py-3 rounded transition"
              >
                Login
              </button>

              <div className="flex justify-between w-full text-sm">
                <p>Don't have an account?</p>
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-green-700 font-bold"
                >
                  Register
                </button>
              </div>
            </>
          )}

          {/* REGISTER STEP 1 */}
          {isRegistering && step === 1 && (
            <>
              <h1 className="text-green-900 font-bold text-2xl">
                What's your name?
              </h1>

              <FloatingInput
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                label="First Name"
                icon="mdi:account"
              />

              <FloatingInput
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                label="Middle Name"
                icon="mdi:account"
              />

              <FloatingInput
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                label="Last Name"
                icon="mdi:account"
              />

              <button
                onClick={handleStep1}
                className="bg-green-700 hover:bg-green-800 text-white py-3 rounded w-full"
              >
                Next
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1); }}
                className="text-sm text-gray-500"
              >
                I already have an account
              </button>
            </>
          )}

          {/* REGISTER STEP 2 */}
          {isRegistering && step === 2 && (
            <>
              <h1 className="text-green-900 font-bold text-2xl">
                Student Information
              </h1>

              <FloatingInput
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                label="Student ID"
                icon="mdi:card-account-details"
              />

              <FloatingInput
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                label="Password"
                icon="mdi:lock"
              />

              <FloatingInput
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                icon="mdi:lock-check"
              />

              {/* COURSE SELECT */}
              <div className="relative w-full">
                <Icon
                  icon="mdi:school"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                />

                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded px-10 py-3 focus:border-green-700 focus:outline-none"
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
                onClick={handleRegister}
                className="bg-green-700 hover:bg-green-800 text-white py-3 rounded w-full"
              >
                Register Account
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1); }}
                className="text-sm text-gray-500"
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
