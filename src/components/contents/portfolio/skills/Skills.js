import React from 'react';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';
import { FaCheckCircle, FaNodeJs, FaCode } from "react-icons/fa";

import styles from './Skills.module.scss'

const Skills = () => {
    return (
        <div className={styles.background}>
            <div className={styles.main}>
                <h1>My Skills</h1><br/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div className={styles.row}>
                    <Flip left cascade>
                        <fieldset className={styles.box}>
                            <legend><h3><FaNodeJs/></h3></legend>
                            <p>Frontend</p>
                            <ol>
                                <li><FaCheckCircle/>&nbsp;React/Redux</li>
                                <li><FaCheckCircle/>&nbsp;Javascript</li>
                                <li><FaCheckCircle/>&nbsp;HTML</li>
                                <li><FaCheckCircle/>&nbsp;jQuery/AJAX</li>
                                <li><FaCheckCircle/>&nbsp;CSS/Bootstrap/W3.CSS/SCSS</li>
                            </ol>
                            <p>Backend</p>
                            <ol>
                                <li><FaCheckCircle/>&nbsp;Nodejs</li>
                                <li><FaCheckCircle/>&nbsp;MySQL/Oracle DB</li>
                                <li><FaCheckCircle/>&nbsp;IBM iSeries/DB2</li>
                                <li><FaCheckCircle/>&nbsp;PHP</li>
                            </ol>
                        </fieldset>
                    </Flip>
                    <Flip left cascade>
                        <fieldset className={styles.box}>
                        <legend><h3><FaCode/></h3></legend>
                            <p>Language</p>
                            <ol>
                                <li><FaCheckCircle/>&nbsp;C/C++/C11</li>
                                <li><FaCheckCircle/>&nbsp;Java</li>
                                <li><FaCheckCircle/>&nbsp;Python</li>
                            </ol>
                            <p>User Interface</p>
                            <ol>
                                <li><FaCheckCircle/>&nbsp;Swift4/Object-C</li>
                                <li><FaCheckCircle/>&nbsp;QT5</li>
                                <li><FaCheckCircle/>&nbsp;JavaFX</li>
                            </ol>
                        </fieldset>
                    </Flip>
                </div>
                <div className={styles.skillBar}>
                    <h2>Web App</h2>
                    <Slide left delay={300} duration={1000}>
                        <p>Front-end</p>
                        <div className={styles.white}>
                            <div className={styles.front}></div>
                        </div> 
                        <p>Back-end</p>
                        <div className={styles.white}>
                            <div className={styles.back}></div>
                        </div>
                    </Slide>
                    <h2>OS App</h2>
                    <Slide left delay={300} duration={1000}>
                        <p>Desktop</p>
                        <div className={styles.white}>
                            <div className={styles.desktop}></div>
                        </div> 
                        <p>Mobile</p>
                        <div className={styles.white}>
                            <div className={styles.mobile}></div>
                        </div>
                    </Slide>
                </div>
                
                
            </div>
        </div>
    );
};

export default Skills;