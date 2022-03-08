import { useState, useEffect } from "react";
import styles from "./Todos.module.scss";
import axios from 'axios'
import { Data } from '../../interfaces/interfaces'
// Importing libraries ...

export const TodosList: React.FC = () => {
  
  // Data content
  const [data, setData] = useState<any | undefined>("");

  // Input content
  const [input, setInput] = useState<string | any>("");

  // Input handler
  const changeInput = (event: any) => {
    setInput(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get('https://61851c6723a2fe0017fff39d.mockapi.io/todos')
    setData(response.data)
    console.log(response.data)
  }

  const sendData = () => {
    const obj: Data = {
      id: data.length + 1,
      description: input,
      done: false
    }
    axios.post('https://61851c6723a2fe0017fff39d.mockapi.io/todos', obj)
    const temp = [...data]
    temp.push(obj)
    setData(temp)
    setInput("")
    
  }


  useEffect(() => {
    fetchData()
  }, [])

  

  

  

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <div className={styles.navigation}>
            <div>Список целей</div>
            <div>
              <button className={styles.createButton} onClick={sendData}>Создать цель</button>
            </div>
          </div>
          <div className={styles.navigation}>
            <div>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your goal name"
                autoFocus
                value={input}
                onChange={changeInput}
              />
            </div>
          </div>
        </div>
        <div>
          {data.length === 0 ? 'There are no goals at the moment. Care to create one?' : data.map((item: any) => (
            <div>
              {item.id} {item.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
