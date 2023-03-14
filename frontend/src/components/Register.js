import { useState } from 'react';
import axios from "axios";

function Register() {

    const [registerForm, setRegisterForm] = useState({
      email: "",
      username: "",
      phone_number: "",
      password: ""
    })

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    function register(event) {
      axios({
        method: "POST",
        url:"/api/register",
        data:{
          email: registerForm.email,
          phone_number: registerForm.phone_number,
          username: registerForm.username,
          password: registerForm.password
         }
      })
      .then((response) => {
        if(response.status === 201) {
            setError(false)
            setSuccess(true)   
        }
      }).catch((error) => {
        if (error.response) {
          if(error.response.status === 400) {
            setErrorMessage(error.response.data.msg)
            setError(true)
          }
        }
      })

      setRegisterForm((
        {
          email: "",
          phone_number: "",
          username: "",
          password: ""
        }
      ))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setRegisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <article className="bg-white mb-auto p-6 sm:w-full md:w-2/6 lg:w-1/4 border rounded-md">
        <div>
          <h1 className='text-2xl font-bold mb-4'>Register</h1>
          
            {success && <p className="bg-green-500 p-2 pl-4 rounded text-sm mb-3 text-white">Success!</p>}

            {error && <p className="bg-red-500 p-2 pl-4 rounded text-sm mb-3 text-white">{errorMessage}</p>}

            {!success && <form className="login">
                <input 
                    className="w-full border border-slate-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="email"
                    text={registerForm.email} 
                    name="email" 
                    placeholder="Email Address" 
                    value={registerForm.email} />
                <input 
                    className="w-full border border-slate-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="phone"
                    text={registerForm.phone_number} 
                    name="phone_number" 
                    placeholder="Phone Number" 
                    value={registerForm.phone_number} />
                <input 
                    className="w-full border border-slate-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="text"
                    text={registerForm.username} 
                    name="username" 
                    placeholder="Name" 
                    value={registerForm.username} />
                <input 
                    className="w-full border border-slate-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="password"
                    text={registerForm.password} 
                    name="password" 
                    autoComplete="on"
                    placeholder="Password" 
                    value={registerForm.password} />

            <button className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700" onClick={register}>Register</button>
            </form>}
        </div>
      </article>
    );
}

export default Register;
