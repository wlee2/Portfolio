import React from 'react';
import ReactSVG from 'react-svg'
import {Link} from 'react-router-dom'
import styles from './Projects.module.scss'


const Boxes = ({Change, name, src, clickedName, lists}) => {
    return (
        <div className={styles.container} onClick={() => Change(name)}>
            <ReactSVG src={src}/>
            <div className={clickedName=== name ? styles.overlay : styles.none}>
            <div className={styles.text}>
                    <h2>{name} Project Lists</h2>
                    <ul>
                        {lists.map((list, index) => <li key={index}>{list}</li>)}
                    </ul>
                    <p>View my project</p>
                    <ul>
                        <li><Link to={{
                            pathname: "/projects",
                            state: { tag: name }
                        }} onClick={() => window.scrollTo(0,0)}>Project Details</Link></li>
                        <li><Link to="/" onClick={() => window.open("", "_blank")}>View in the GitHub</Link></li>
                    </ul> 
                </div>
            </div>
            <div className={styles.outText}>
                {name} Projects
            </div>
        </div>
    );
};

export default Boxes;