import React, { useState } from 'react';
import { AiFillYoutube } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header({ handleSearchVideos, initVideos, videoDetail }) {

    const [searchItem, setSearchItem] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        if(e){
            e.preventDefault();
        }
        videoDetail && navigate('/');
        handleSearchVideos(searchItem);
    }

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }

    const handleInit = () => {
        initVideos();
        setSearchItem('');
    }

    

    return <header className={styles.header}>
        <span className={styles.logo_and_name} onClick={() => { navigate("/");  handleInit(); }}>
            <span className={styles.logo}><AiFillYoutube/></span>
            <span className={styles.youtube_name}>Youtube</span>
        </span>
        <form className={styles.input_form} onSubmit={handleSubmit}>
            <input className={styles.input} value={searchItem} onChange={handleChange}></input>
            <button className={styles.search_btn}>
                <span className={styles.search_btn_icon}>
                    <BsSearch />
                </span>    
            </button>
        </form>
    </header>
}

