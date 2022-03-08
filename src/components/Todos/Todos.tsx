import { useState, useEffect } from "react";
import styles from "./Todos.module.scss";
import axios from 'axios'
// Importing libraries ...

export const TodosList: React.FC = () => {
  
  // Data content
  const [data, setData] = useState<any | undefined>("");

  // Input content
  const [input, setInput] = useState<string | undefined>("");

  // Input handler
  const changeInput = (event: any) => {
    setInput(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get('https://61851c6723a2fe0017fff39d.mockapi.io/todos')
    setData(response.data)
    console.log(response, response.data)
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
              <button className={styles.createButton}>Создать цель</button>
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
          
        </div>
      </div>
    </div>
  );
};
