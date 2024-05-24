import React, { useState, useEffect } from 'react';
import style from './dashboard.module.css';
import Link from 'next/link';
import Box from './box';

import { useRouter } from 'next/router';

function Dashboard() {

  const router = useRouter();
  const { me} = router.query;

   const handleButtonClick = () => {
    
            router.push(`/chat?me=${me}`);
   
    };
  const [message, setMessage] = useState([]);
  const [questions, setQuestions] = useState([]);
//
  useEffect(() => {
    const tagMessage = <div id={style.tag}>kfewwd</div>;
    setMessage([tagMessage]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/UserData/question.json`);
        if (res.ok) {
          const data = await res.json();
          const questionsArray = Object.values(data).flatMap(item => Object.values(item));
          setQuestions(questionsArray);
          console.log(questions)
        } else {
          throw new Error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div id={style.chatbutton}>
    <button onClick={handleButtonClick}>
            chat
        </button>
    </div>
    <div id={style.dash}>
      <div id={style.icon}>
        <img src='icons.png' alt='icon' />
        <h3>Doubt<span>Box</span></h3>
      </div>
      <div id={style.doughts}>
        <div id={style.searchbar}>
          <img src='searchicon.png' alt='search icon' />
          <Link href={`/doubtcreation?me=${me}`}>
            <input type='search' placeholder='Ask a Doubt ?' />
          </Link>
        </div>
        <div id={style.line}></div>
        <div id={style.issue}>
          {questions.map((question, index) => (
            <Link href={`/indetail?id=${question.Id}`} key={index}>
              <div key={index} id={style.problem}>
                <div id={style.details}>
                  <img src='doughtprofile.png' alt='profile' />
                  <h3>{question.Username}</h3>
                  <span>.</span>
                  <h4>9h</h4>
                </div>
                <div id={style.tags}>
                  {question.Tags && question.Tags.map((tag, index) => (
                    <div key={index} id={style.tag}>{tag}</div>
                  ))}
                </div>
                <div id={style.dought}>{question.Question}</div>
                <div id={style.coins}>
                  <img src='coin.png' alt='coin' />
                  <h4>{question.Coin}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
   <Box me={me}/>
    </div>
    </>
  );
}

export default Dashboard;
