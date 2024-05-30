import React, { useEffect, useRef, useState } from 'react';
import style from './doubtcreation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Doubtcreation() {
  const router = useRouter();
  const { me} = router.query;
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const randomInt = getRandomInteger(11111, 9999);
  var k=randomInt
  console.log(randomInt);
  const [tags, setTags] = useState(['']); 
  const [doubt, setDoubt] = useState({
    Status:'-1',
    Id:k,
    Username:me,
    Tags: [],
    Question: '',
    Description: '',
    Coin:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoubt({ ...doubt, [name]: value });
  };

  const handleTagChange = (e, index) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
    setDoubt({ ...doubt, Tags: newTags });
  };

  const handleSubmit = async (e) => {
    const { Tags, Question, Description ,Coin,Id,Status,Username} = doubt;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Status,
        Id,
        Username:`${me}`,
        Tags,
        Question,
        Description,
        Coin
      })
    };

    try {
      const res = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/UserData/question/${Id}.json`, options);
      const re = await fetch(`https://acehack-65f02-default-rtdb.firebaseio.com/${me}/question/${Id}.json`, options);
      if (res.ok) {
        alert('Data stored successfully!');
      } else {
        throw new Error('Failed to store data.');
      }
      if (re.ok) {
        alert('Data stored successfully!');
      } else {
        throw new Error('Failed to store data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while storing data.');
    }
    router.push(`/dashboard?me=${me}`); 
  };

  const addTag = () => {
    setTags([...tags, '']);
    console.log('Tag added');
  };

  return (
    <>
      <div id={style.creation}>
        <div id={style.tagandadd}>
          <div id={style.tags}>
            {tags.map((tag, index) => (
              <div key={index} className={style.tag}>
                <input
                  type='text'
                  name='Tag'
                  placeholder='Tag'
                  value={tag}
                  autoComplete='off'
                  required
                  onChange={(e) => handleTagChange(e, index)}
                />
              </div>
            ))}
          </div>
          <div id={style.addtag}><button onClick={addTag}>+</button></div>
        </div>
        <div id={style.doubt}>
          <h3>Ask Any Question</h3>
          <input
            type='text'
            name='Question'
            placeholder='Ask Doubt'
            value={doubt.Question}
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </div>
        <div id={style.description}>
          <h3>Describe</h3>
          <textarea
            type='text'
            name='Description'
            value={doubt.Description}
            autoComplete='off'
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div id={style.coins}>
          <h3>Value of Question</h3>
          <input
            type='text'
            name='Coin'
            placeholder='coins'
            value={doubt.Coin}
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </div>
        <div id={style.submit}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Doubtcreation;
