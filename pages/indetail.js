import React, { useState, useEffect } from 'react';
import style from './indetail.module.css';
import { useRouter } from 'next/router';

function Indetail() {
  const router = useRouter();
  const { id,me,you } = router.query;
  console.log(id)
  console.log("me in indetail : ",me)
  console.log("you in indetail : ",you)
  const [questions, setQuestions] = useState([]);
  const [check, setcheck] = useState({});
  var j = 'ganw'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/UserData/question/${id}.json`);
        if (res.ok) {
          const data = await res.json();
          setcheck(data)
          const keys = Object.keys(data);

          const questionsArray = keys.reduce((acc, key) => {
            acc.push(data[key]);
            return acc;
          }, []);
          setQuestions(questionsArray);
        } else {
          throw new Error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const randomInt = getRandomInteger(11111, 9999);
  const store=randomInt
  const handleAccept = async (questionId) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:store                                          
      })
    };
    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/ids/${me}&&${you}.json`, option);
      if (res.ok) {
        console.log("ids")
      } else {
        throw new Error('Failed to store data.');
      }
    
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while storing data.');
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:store                                          
      })
    };
    
    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/messages/ids/${you}&&${me}.json`, options);
      if (res.ok) {
        console.log("ids")
      } else {
        throw new Error('Failed to store data.');
      }
    
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while storing data.');
    }
  
    try {
      const updatedQuestions = questions.map(question => {
        if (question.Id === questionId) {
          question.Status = 1;
        }
        return question;
      });
      console.log('accepted question is ', updatedQuestions)
  
      const acceptedQuestion = updatedQuestions.find(question => question.Id === questionId);
  
      
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/${me}/Statuses/${id}.json`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({updatedQuestions})
      });
      if (res.ok) {
        console.log('Question status updated successfully.');
        setQuestions(updatedQuestions); 
      } else {
        throw new Error('Failed to update question status.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    router.push(`/dashboard?me=${me}`); 
  };
  
  
  return (
    <>
      <div id={style.indetail}>
        {questions.map((question, index) => (
          <div id={style.inside} key={index}>
            <div id={style.problem}>
              <div id={style.details}>
                <img src='doughtprofile.png' alt='profile' />
                <h3>{question.Username}</h3>
                <span>.</span>
                <h4>9h</h4>
                <div id={style.tags}>
                  {question.Tags.map((tag, index) => (
                    <div key={index} id={style.tag}>{tag}</div>
                  ))}
                </div>
              </div>
              <div id={style.coins}>
                <img src='coin.png' alt='coin' />
                <h4>{question.Coin}</h4>
              </div>
            </div>
            <div id={style.question}>
              <h2>{question.Question}</h2>
            </div>
            <div id={style.description}>
              <p>{question.Description}</p>
            </div>
            <button onClick={() => handleAccept(question.Id)}>Accept</button>  </div>
        ))}
      </div>
    </>
  );
}

export default Indetail;
