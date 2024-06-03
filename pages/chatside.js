import React,{useEffect,useState} from 'react'
import style from './chat.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
function Chatside() {
    const router = useRouter();

    const { me } = router.query;

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/${me}/Statuses/.json`);
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
    <div id={style.names}>
          {questions.map((question, index) => (
           <Link href={`/chat?me=${me}&you=${question.Username}`} key={index}>
           
            <div id={style.details}>
              <img src='doughtprofile.png' alt='profile' />
              <h3>{question.Username}</h3>
            </div>
            </Link>

          ))}
        </div>
  )
}

export default Chatside