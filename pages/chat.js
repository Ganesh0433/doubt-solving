

import React, { useState, useEffect } from 'react';
import style from './chat.module.css'
import { useRouter } from 'next/router';
import InfiniteScroller from 'react-infinite-scroller';
import dayjs from 'dayjs';


function Chat() {
  const [val, setval] = useState([]);
  const [lent, setlent] = useState();
  const router = useRouter();

  const { me, you } = router.query;



   
  console.log("you is  ", you)
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    PhoneNumber: ''
  });

  const [message, setmessage] = useState([]);
  const [mess, setmess] = useState([]);
 


  console.log(message)
  var i = 0

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async (e) => {

    const today = dayjs().format('dddd'); // 'dddd' gives the full name of the day
  
    const currentDate = new Date();
    console.log("present date ",currentDate)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    var CurrentTime=`${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const tagmessage = <div id={style.message}>{user.Name}
    <h5>{CurrentTime}</h5></div>
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
        PhoneNumber,
        currentDate:currentDate,
        CurrentTime:CurrentTime,
        CurrentDay:today
      })
    };
 
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: me,
        Name,
        currentDate:currentDate,
        CurrentTime:CurrentTime,
        CurrentDay:today
      })
    };
    user.Name=''

    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${me}&&${you}/${me}.json`, options);
      const respons = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${val}/.json`, option);
      if (res.ok) {
        console.log("ids")
      } else {
        throw new Error('Failed to store data.');
      }
      if (respons.ok) {

      } else {
        throw new Error('Failed to store data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while storing data.');
    }
  };
  
 
  useEffect(() => {

    setInterval(async() => {

     
        try {

          console.log("inside try me is ", me)
          const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${you}&&${me}/${you}.json`)
          if (res.ok) {
            const data = await res.json();
            if(data){
            var len = Object.keys(data).length;
            setlent(len)
            const lkey=Object.keys(data)
            console.log("len is ", len)
            const lastKey = Object.keys(data).pop();
            const lastName = data[lastKey].Name;
            const lastTime = data[lastKey].CurrentTime;
            const lastDate = data[lastKey].currentDate;
           
         
            console.log("fetched : ", lastName)
            
            if (len > i){
              i = len
              const omessage =
                <div id={style.oppomessage}>
                  {lastName}
               <h5>{lastTime}</h5>
                </div>
              setmessage(prevMessage => [...prevMessage, omessage]);
            } 

          }


          } else {
            throw new Error('Failed to fetch data.');
          }
        } catch (error) {

          console.error('Error:', error);

        }
    


    }, 7000)
  

  }, []);
  const currentDate = new Date();
  console.log("present date ",currentDate)
  useEffect(() => {
    const ids = async () => {

      try {
        const idres = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/ids/${you}&&${me}.json`);
        if (idres.ok) {
          const idi = await idres.json()
          if(idi){
          console.log("idi is ", idi)
          const l = Object.values(idi)
         
          var setvalue = l[0].id
          console.log("l value is ", setvalue)
          setval(setvalue)

          const response = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/${setvalue}.json?timestamp=${Date.now()}`);
          if (response.ok) {
            const tdata = await response.json();
          if(tdata){
            const wmessages = Object.values(tdata);
           
            console.log("whole data inside l: ", wmessages);

            const newMessages = wmessages.map((item, index) => {
              if (item.message == me) {
                return <div key={index} id={style.message}>{item.Name}
                 <h5>{item.CurrentTime}</h5></div>;
              } else if (item.message == you) {
                return <div key={index} id={style.oppomessage}>{item.Name}
                 <h5>{item.CurrentTime}</h5></div>;
              }
              return null;
            }).filter(Boolean);

            setmess(newMessages);
          }
         
          console.log("after set idval is : ", val)
        }
      }
        } else {
          throw new Error('Failed to store data.');
        }

      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while storing data.');
      }
    }
    ids()
  }, [me, you]);

console.log("messages are ", message)

var firstOppomessageSkipped = false;
  const filteredMessages = message.filter(messag => {
    if (messag.props.id.includes('oppomessage')) {
      if (!firstOppomessageSkipped) {
        firstOppomessageSkipped = true;
        return false; 
      }
    }
    return true; 
  });
  var something;
  if(lent>1){
    if(lent==2){
      router.push(`/chat?me=${me}&you=${you}`)
    
    }
   
    something=filteredMessages
  }else{
    something=message
  }


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


        <button type='submit' onClick={handleSubmit} ><img src='./send.png'></img></button>
        <div id={style.messages}>
          <InfiniteScroller>

            {mess}
            {something}
          </InfiniteScroller>

        </div>
      </div>
    </>
  );
}

export default Chat;
