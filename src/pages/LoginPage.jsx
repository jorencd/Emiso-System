import React, { useState } from 'react'
import bg from '../assets/loginBG/loginBG.jpg'
import Logo from '../assets/logo/PLSPLogo.png'
import courses from '../data/courses';
import Popup from '../components/pop_up/Popup';

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [step, setStep] = useState(1)

  const [popup, setPopup] = useState({
    show:false,
    message:"",
    success:false
  });

  const showPopup = (msg, success=false)=>{
    setPopup({show:true,message:msg,success});
  };

  const [form, setForm] = useState({
    loginId:'',
    loginPass:'',
    firstName:'',
    middleName:'',
    lastName:'',
    studentId:'',
    password:'',
    confirmPassword:'',
    course:''
  });

  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^\d{6,12}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  // LOGIN VALIDATION
  const validateLogin = ()=>{
    if(!idRegex.test(form.loginId))
      return showPopup("Student ID must be 6–12 digits");

    if(!form.loginPass)
      return showPopup("Password is required");

    showPopup("Login Successful ✅", true);
  };

  // STEP 1 VALIDATION - UPDATED TO PREVENT PROCEEDING IF EMPTY
  const validateStep1 = ()=>{
    // Check if required fields are empty
    if(!form.firstName.trim())
      return showPopup("First Name is required");
    
    if(!form.lastName.trim())
      return showPopup("Last Name is required");

    // Validate format if not empty
    if(!nameRegex.test(form.firstName))
      return showPopup("Valid First Name required (letters only)");

    if(form.middleName && !nameRegex.test(form.middleName))
      return showPopup("Middle Name letters only");

    if(!nameRegex.test(form.lastName))
      return showPopup("Valid Last Name required (letters only)");

    setStep(2);
  };

  // STEP 2 VALIDATION
  const validateStep2 = ()=>{
    if(!idRegex.test(form.studentId))
      return showPopup("Student ID must be 6–12 digits");

    if(!passRegex.test(form.password))
      return showPopup("Password must be 8+ chars with uppercase, lowercase, and number");

    if(form.password !== form.confirmPassword)
      return showPopup("Passwords do not match");

    if(!form.course)
      return showPopup("Please select a course");

    showPopup("Registration Successful 🎉", true);
  };

  return (
    <div
      className='h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* POPUP */}
      <Popup
        show={popup.show}
        message={popup.message}
        success={popup.success}
        onClose={()=>setPopup({...popup,show:false})}
      />

      <div className='absolute inset-0 bg-gradient-to-b from-green-100/60 to-emerald-800/100 backdrop-blur-xs'></div>

      <div className='flex md:flex-row flex-col mx-30 gap-y-4 gap-x-30 items-center justify-center relative z-10 h-full'>

        <div className='flex flex-col items-center gap-y-4'>
          <div
            className='md:h-70 md:w-70 h-40 w-40 bg-cover rounded-full'
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>

          <p className='md:text-2xl text-xl w-full font-bold text-white'>
            Pamantasan ng Lungsod ng San Pablo
          </p>
        </div>

        <div className='flex flex-col w-100 justify-center items-center gap-y-2 bg-white rounded-xl p-6'>

          {/* LOGIN */}
          {!isRegistering && (
            <>
              <h1 className='text-green-900 font-bold text-3xl'>Welcome!</h1>
              <p>Fill out the information below in order to access your account</p>

              <input
                name="loginId"
                onChange={handleChange}
                placeholder='Student ID'
                className='border-2 border-gray-300 rounded p-2 w-full'
              />

              <input
                type="password"
                name="loginPass"
                onChange={handleChange}
                placeholder='Password'
                className='border-2 border-gray-300 rounded p-2 w-full'
              />

              <button
                onClick={validateLogin}
                className='bg-green-700 w-full text-white px-4 py-2 rounded'
              >
                Login
              </button>

              <div className='flex justify-between w-full text-sm'>
                <p>Don't have an account yet?</p>
                <button
                  onClick={() => setIsRegistering(true)}
                  className='text-green-700 font-bold'
                >
                  Register
                </button>
              </div>
            </>
          )}

          {/* STEP 1 */}
          {isRegistering && step === 1 && (
            <div className='text-left flex flex-col w-100 p-6 gap-y-2'>
              <h1 className='text-green-900 font-bold text-2xl'>What's your name?</h1>
              <p>Enter the name you use in real life</p>

              <input name="firstName" onChange={handleChange}
                placeholder='First Name *'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <input name="middleName" onChange={handleChange}
                placeholder='Middle Name (Optional)'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <input name="lastName" onChange={handleChange}
                placeholder='Last Name *'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <button
                onClick={validateStep1}
                className='bg-green-700 w-full text-white px-4 py-2 rounded'
              >
                Next
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1) }}
                className='text-sm text-gray-500 mt-2'
              >
                I already have an account
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {isRegistering && step === 2 && (
            <>
              <h1 className='text-green-900 font-bold text-2xl'>
                What's your student information
              </h1>

              <input name="studentId" onChange={handleChange}
                placeholder='Student ID'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <input type="password" name="password" onChange={handleChange}
                placeholder='Password'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <input type="password" name="confirmPassword" onChange={handleChange}
                placeholder='Confirm Password'
                className='border-2 border-gray-300 rounded p-2 w-full'/>

              <select name="course" onChange={handleChange}
                className='border-2 border-gray-300 rounded p-2 w-full'>
                <option value="">Select Course Program</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <button
                onClick={validateStep2}
                className='bg-green-700 w-full text-white px-4 py-2 rounded'
              >
                Register Account
              </button>

              <button
                onClick={() => { setIsRegistering(false); setStep(1) }}
                className='text-sm text-gray-500 mt-2'
              >
                I already have an account
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default LoginPage;