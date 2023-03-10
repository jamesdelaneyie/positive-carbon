import React, { useState, useEffect } from 'react';

const UsersTable = () => {

    const [users, setUsers] = useState(0);

    useEffect(() => {
        fetch('/users').then(res => res.json()).then(data => {
            // console.log(data)
            setUsers(data);
        });
    }, []);

      return (
      <ul>
        {/* output a list of Users after checking if the data is loaded */}
        {users ? users.map((user, index) => (
          <li key={index}>
            {user.username} ({user.email}) <br/>
          </li>
        )) : <p>Loading...</p>}
      </ul>
    );
}

export default UsersTable;
