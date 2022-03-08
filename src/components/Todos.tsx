import { FC, useState, useEffect } from "react";
import styles from './Todos.module.scss'

export const TodosList: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.header}>
                   <div className={styles.navigation}>
                       <div>
                           Список целей
                       </div>
                       <div>
                           <button className={styles.createButton}>Создать цель</button>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    )
}