import React, { useState, useEffect } from 'react';
import style from './login.module.css';
import { useRouter } from 'next/router';

function Chat() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    Email: '',
    PhoneNumber: ''
  });
  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, Email, PhoneNumber } = user;
    const tagmessage = <div id={style.message}>{username}</div>;
    setMessage([...message, tagmessage]);

    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/credentials.json`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const matches = Object.values(data).filter(entry => {
            return entry.username === username && entry.Email === Email && entry.PhoneNumber === PhoneNumber;
          });
          if(matches.length > 0) {
            console.log('matches');
            router.push(`/dashboard?me=${username}`); 
          }
        }
      } else {
        throw new Error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div id={style.login}>
        <form>
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
      </div>
    </>
  );
}

export default Chat;
