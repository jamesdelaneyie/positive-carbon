import axios from "axios";

function Logout(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"/api/logout",
    })
    .then((response) => {
       props.token()
       console.log(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <button onClick={logMeOut} className="w-full text-right block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2"> 
            Logout
        </button>
    )
}

export default Logout;