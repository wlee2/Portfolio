import React from 'react';

import styles from './Contact.module.scss'

import {FaEnvelope, FaPhone} from 'react-icons/fa';

const Contact = () => {
    return (
        <div className={styles.background}>
            <div className={styles.overlay}></div>
            <div className={styles.main}>
                <h2>Contact Me</h2><br/>
                <p><FaEnvelope/>&nbsp; Email: stoneage95xp@gmail.com</p>
                <p><FaPhone/>&nbsp; Phone: +1 6478654939</p>
            </div>
        </div>
    );
};

export default Contact;