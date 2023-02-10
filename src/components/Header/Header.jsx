import React from 'react';
import { AiFillYoutube } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import styles from './Header.module.css';

export default function Header() {
    return <header className={styles.header}>
        <span className={styles.logo_and_name}>
            <span className={styles.logo}><AiFillYoutube/></span>
            <span className={styles.youtube_name}>Youtube</span>
        </span>
        <form className={styles.input_form}>
            <input className={styles.input}></input>
            <button className={styles.search_btn}>
                <span className={styles.search_btn_icon}>
                    <BsSearch />
                </span>    
            </button>
        </form>
    </header>
}

