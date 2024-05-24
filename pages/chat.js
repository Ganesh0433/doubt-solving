

import React, { useState, useEffect } from 'react';
import style from './chat.module.css'
import { useRouter } from 'next/router';

function Chat() {
  const router = useRouter();

  const { me,you} = router.query;
  console.log("you is  ",you)
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    PhoneNumber: ''
  });
  const [fetchedData, setFetchedData] = useState(null);
  const [message, setmessage] = useState([]);
  var i=0;

console.log(message)
var username='vicky'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    const inname = <div  id={style.inname}>
    <input type='search' placeholder='Your Name'></input>
</div>;
    const tagmessage =  <div id={style.message}>{user.Name}</div>
    setmessage([...message, tagmessage]);

    e.preventDefault();

    const { Name, Email, PhoneNumber } = user;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name,
        Email,
        PhoneNumber
      })
    };

    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${me}&&${you}/${me}.json`, options);
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

  useEffect(() => {
   setInterval(()=>{
    const fetchData = async () => {
      try {
                                                                                                                                                                   
        console.log("inside try me is ",me)
        const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${you}&&${me}/${you}.json`);
        if (res.ok) {
          const data = await res.json();
          const len= Object.keys(data).length; 
          console.log("len is ",len)
          const lastKey = Object.keys(data).pop();
          const lastName = data[lastKey].Name;
          console.log( "fetched : ",lastName)
 
          if(len>i){
            i=len
            const omessage=
              <div id={style.oppomessage}>
              {lastName}
   
            </div>
              setmessage(prevMessage => [...prevMessage, omessage]);
          }
 
          setFetchedData(data);
          
        } else {
          throw new Error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error:', error);

      }
    };
    fetchData();
  },1000)

  }, []);
  
    

  



  return (
    <>
      <div>
      
      </div>
     
     <div id={style.chat}>
      <div id={style.names}>

      </div>
      <div id={style.line}></div>
    
     <input id={style.messagein}
            type='text'
            name='Name'
            placeholder='Your Message'
            value={user.Name}
            autoComplete='off'
            required
            onChange={handleChange}
          />

          
          <button  type='submit' onClick={handleSubmit} >Send</button>
          <div id={style.messages}>
          {message}
          
          </div>
     </div>
    </>
  );
}

export default Chat;
