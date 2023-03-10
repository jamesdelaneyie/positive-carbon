import axios from "axios";

function Logout(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <button onClick={logMeOut} className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700"> 
            Logout
        </button>
    )
}

export default Logout;