import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import styles from './Introduction.module.scss'
import img1 from '../../images/programmer1.png'

class Introduction extends Component {
    render() {
        return (
            
            <div className={styles.intro}>
                <div className={styles.overlay}></div>
                <Fade left cascade delay={200}>
                    <div className={styles.column}>
                        <div className={styles.nameSection}>
                            <p>My name is</p>
                            <h1>Wooseok Lee</h1>
                            <hr/>
                            <p>I graduated Computer Programming Diploma with interest in full stack developing.
                            I have Various knowledge from the front to the back end.
                            I Able to build a server and web client.
                            I Have the Ability to learn new program languages quickly.</p>
                        </div>
                        <img src={img1} alt="qwe"/>
                    </div>
                </Fade>
            </div>
            
        );
    }
}

export default Introduction;