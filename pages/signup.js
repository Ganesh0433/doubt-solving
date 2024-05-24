import React, { useState, useEffect } from 'react';
import style from './signup.module.css'
import Link from 'next/link';

function Chat() {
  const [user, setUser] = useState({
    username: '',
    Email: '',
    PhoneNumber: ''
  });
  const [fetchedData, setFetchedData] = useState(null);
  const [message, setmessage] = useState([]);
  var i=0;

console.log(message)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    const inname = <div  id={style.inname}>
    <input type='search' placeholder='Your username'></input>
</div>;
    const tagmessage =  <div id={style.message}>{user.username}</div>
    setmessage([...message, tagmessage]);

    e.preventDefault();

    const { username, Email, PhoneNumber } = user;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        Email,
        PhoneNumber
      })
    };

    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/credentials.json`, options);
      if (res.ok) {
        alert('Data stored successfully!');
      } else {
        throw new Error('Failed to store data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while storing data.');
    }
  };
  return (
    <>
    <div id={style.sign}>
      <div id={style.signup}>
        <form >
          <input
            type='text'
            name='username'
            placeholder='Your username'
            value={user.username}
            autoComplete='off'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='Email'
            placeholder='Your E-mail'
            value={user.Email}
            autoComplete='off'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='PhoneNumber'
            placeholder='Your Phone Number'
            value={user.PhoneNumber}
            autoComplete='off'
            required
            onChange={handleChange}
          />
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
        <Link id={style.butto} href='/login'> <button >Login</button></Link>
      </div>
      </div>
    
    </>
  );
}

export default Chat;
