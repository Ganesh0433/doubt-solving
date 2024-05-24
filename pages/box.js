import React, { useState, useEffect } from 'react';
import style from './box.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
function Box({me}) {
    const router = useRouter();

    console.log("me in box  ",me)
    const [questions, setQuestions] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/UserData/Statuses/.json`);
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched data:", data);
        
                    const questionsArray = Object.keys(data).map(key => ({
                        Id: key,
                        ...data[key].updatedQuestions[0] 
                    }));
                    setQuestions(questionsArray);
                    console.log('Questions array:', questionsArray);
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
       
        
        <div id={style.box}>    
            
            <div id={style.heading}>Box</div>
            <div id={style.line}></div>
            {questions.map((question, index) => (
                <Link href={`/chat?me=${me}&you=${question.Username}`} key={index}>
                <div key={index} className={style.message}>
                    <div className={style.photo}>
                        <img src='boxphoto.png' alt='Box photo' />
                    </div>
                    <div className={style.nameque}>
                        <h3>{question.Username}</h3>
                        <h4>{question.Question}</h4>
                     
                    </div>
                    
                    <p>{question.Coin}</p>

                </div>
                </Link>
            ))}
        </div>
        </>
    );
    
}

export default Box;
