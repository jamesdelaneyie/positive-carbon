import { useState } from 'react'
import axios from "axios";

function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url:"/api/user/1",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      console.log(response)
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        name: res.user.username,
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <article className="mb-auto p-4 sm:w-full md:w-3/6 lg:w-2/6">
      <h1>Profile</h1>
      <p>Profile name: {profileData && profileData.name}</p>
      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
    </article>
  );
}

export default Profile;