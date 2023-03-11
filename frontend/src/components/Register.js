import { useState } from 'react';
import axios from "axios";

function Register() {

    const [registerForm, setRegisterForm] = useState({
      email: "",
      username: "",
      password: ""
    })

    const [success, setSuccess] = useState(false)


    function register(event) {
      axios({
        method: "POST",
        url:"/register",
        data:{
          email: registerForm.email,
          username: registerForm.username,
          password: registerForm.password
         }
      })
      .then((response) => {
        if(response.status === 201) {
            setSuccess(true)   
        }
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setRegisterForm(({
        email: "",
        username: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setRegisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <article className="mb-auto p-6 sm:w-full md:w-2/6 lg:w-1/6 border rounded">
        <div>
          <h1 className='text-2xl font-bold mb-4'>Register</h1>
          {/* if success is true, show success message */}
            {success && <p className="bg-green-500 p-2 pl-4 rounded text-white">Success!</p>}
            {!success && <form className="login">
                <input 
                    className="w-full border border-stone-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="email"
                    text={registerForm.email} 
                    name="email" 
                    placeholder="Email" 
                    value={registerForm.email} />
                <input 
                    className="w-full border border-stone-200 rounded p-2 mb-2"
                    onChange={handleChange} 
                    type="text"
                    text={registerForm.username} 
                    name="username" 
                    placeholder="Name" 
                    value={registerForm.username} />
                <input 
                    className="w-full border border-stone-200 rounded p-2 mb-2"
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
