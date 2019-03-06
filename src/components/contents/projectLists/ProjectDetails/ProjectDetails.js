import React, { Component } from 'react';
import styles from './ProjectDetails.module.scss'

class Boxes extends Component {
    render() {
        const {Change, name, src, tags, background, seleted} = this.props;
        return (
            <div className={styles.container} onClick={() => Change(name) }>
                <img src={src} alt={name} onClick={this.onModelClicked}/>
                <div className={styles.overlay} style={seleted === name ? {"transform": "scale(1)"} : {"transform": "scale(0)"}}>
                <div className={styles.text}>
                    <h2>Project Description</h2>
                    <p>{background}</p>
                </div>    
                </div>
                <div className={styles.outText}>
                    {name}
                </div>
                <div className={styles.tags}>
                    {tags.map((tag, index) => <div key={index} className={styles.tag}>{tag}</div>)}
                </div>
            </div>
        );
    }
}

export default Boxes;