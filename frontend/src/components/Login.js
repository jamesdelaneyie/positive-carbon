import { useState } from 'react';
import axios from "axios";

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/api/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
        props.setUserID(response.data.user_id)
        window.location.href('/watchlist')
      }).catch((error) => {
        if (error.response) {
          if(error.response.status === 400 || error.response.status === 401) {
            setErrorMessage(error.response.data.msg)
            setError(true)
          }
        }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <article className="bg-white mb-auto p-6 sm:w-full md:w-2/6 lg:w-1/6 border rounded-md">
        <div>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          {error && <p className="bg-red-500 p-2 pl-4 rounded text-sm mb-3 text-white">{errorMessage}</p>}
          <form className="login">
            <input 
                  className="w-full border border-slate-200 rounded p-2 mb-2"
                  onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input 
                  className="w-full border border-slate-200 rounded p-2 mb-2"
                  onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  autoComplete="on"
                  placeholder="Password" 
                  value={loginForm.password} />

          <button className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700" onClick={logMeIn}>Submit</button>
          <a href="/register" className="text-slate-500 hover:underline text-sm">Register</a>
        </form>
        </div>
      </article>
    );
}

export default Login;
