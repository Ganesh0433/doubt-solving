import React ,{useEffect,useState} from 'react'
import style from './menu.module.css'
import Link from 'next/link';
function Menu() {
  const [questions, setQuestions] = useState([]);
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
      <div>

    <div id={style.menu}>
    <h2>Trending tags</h2>
    <div id={style.line}></div>
    {questions.map((question, index) => (
            <Link href={`/indetail?id=${question.Id}`} key={index}>
              <div key={index} id={style.problem}>
                <div id={style.tags}>
                  {question.Tags && question.Tags.map((tag, index) => (
                    <div key={index} id={style.tag}><h3>#{tag}</h3></div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
  
       </div>


      </div>
    </>
  )
}

export default Menu
