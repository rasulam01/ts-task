import { useState, useEffect } from "react";
import styles from "./Todos.module.scss";
import axios from "axios";
import { Data } from "../../interfaces/interfaces";
import classNames from "classnames";
// Importing libraries ...

export const TodosList: React.FC = () => {
  // Data content
  const [data, setData] = useState<any | undefined>("");

  // Input content
  const [input, setInput] = useState<string | any>("");

  // Editing variables
  const [editingMode, setEditingMode] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string | undefined>("");

  // Input handler
  const changeInput = (event: any) => {
    setInput(event.target.value);
  };

  // GET request
  const fetchData = async () => {
    const response = await axios.get(
      "https://61851c6723a2fe0017fff39d.mockapi.io/todos"
    );
    setData(response.data);    
  };

  // POST request
  const sendData = () => {
    const obj: Data = {
      id: data.length + 1,
      description: input,
      done: false,
      date: new Date().toLocaleString(),
    };
    axios.post("https://61851c6723a2fe0017fff39d.mockapi.io/todos", obj);
    const temp = [...data];
    temp.push(obj);
    setData(temp);
    setInput("");
  };

  // DELETE request
  const deleteData = (id: number) => {        
    axios.delete(`https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`);
    const filtered = data.filter((item: any) => item.id !== id);
    setData(filtered);                  
  };

  // EDIT function
  const editData = (id: number) => {
    const updated = [...data].map((item: any) => {
      if (item.id === id) {
        item.description = editingText;
        axios.put(`https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`, {
          description: editingText,
        });
      }
      return item;
    });
    setData(updated);
    setEditingText("");
    setEditingMode(null);
  };

  const content = data.length === 0
  ? <div style={{ textAlign: 'center'}}>{"There are no goals at the moment. Care to create one?"}</div>
    
  
  : data.map((item: any, id: number) => {
      const changeDone = async (id: number) => {
        await axios.put(
          `https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`,
          {
            done: !item.done,
          }
        );
        fetchData();
      };
      return (
        <div className={styles.content} key={id}>
          <div className={item.done ? styles.done : styles.notDone}>
            {item.id}
            {"."}
          </div>
          {editingMode === item.id ? (
            <div>
              <input
                type="text"
                autoFocus
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
                className={styles.changeInput}
              />
            </div>
          ) : (
            <div className={classNames({[styles.notDone]: !item.done, [styles.done]: item.done})}>
              {item.description ? item.description : "No goal"}
            </div>
          )}

          <div>Date: {item.date}</div>

          <div className={styles.buttons}>
            <button
              className={styles.statusButton}
              onClick={() => changeDone(item.id)}
            >
              {item.done ? "Not done yet." : "Done!"}
            </button>
            {editingMode ? (
              <button
                className={styles.editButton}                          
                onClick={() => editData(item.id)}
              >
                Сохранить
              </button>
            ) : (
              <button
                className={styles.editButton}
                onClick={() => setEditingMode(item.id)}
              >
                Изменить
              </button>
            )}

            <button
              className={styles.deleteButton}
              onClick={() => deleteData(item.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      );
    })

  // Get data once the component is loaded
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <div className={styles.navigation}>
            <div>Список целей</div>
            <div>
              <button className={styles.createButton} onClick={sendData}>
                Создать цель
              </button>
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
          {content}
        </div>
      </div>
    </div>
  );
};
