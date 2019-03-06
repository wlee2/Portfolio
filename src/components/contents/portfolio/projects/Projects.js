import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import Pulse from 'react-reveal/Pulse';

import styles from './Projects.module.scss'

import javaIcon from '../../Icons/java.svg'
import jqueryIcon from '../../Icons/jquery-1.svg'
import reactIcon from '../../Icons/react.svg'

import Boxes from './Boxes'

const lists = [
    {
        name: "React",
        src: reactIcon,
        projectLists: [
            "Portfolio Application",
            "Book Shelf",
            "Code Viewer"
        ]
    },
    {
        name: "Java",
        src: javaIcon,
        projectLists: [
            "Chatting Application",
            "Weather Application",
            "IPv6 Subnetting Application"
        ]
    },
    {
        name: "jQuery",
        src: jqueryIcon,
        projectLists: [
            "Code Viewer",
            "Homepage with Cloud Drive"
        ]
    }
]

class Projects extends Component {
    state = {
        clickedName: "null"
    }

    
    Change = (name) => {
        if(this.state.clickedName === name) {
            this.setState({
                clickedName: "null"
            })
        }
        else {
            this.setState({
                clickedName: name
            })
        }    
        
    }

    render() {
        return (
            <div className={styles.background}>  
                <div className={styles.main}>
                    <h1>Projects</h1><br/>
                    <div className={styles.row}>
                        {
                            lists.map((list, index) => 
                            <Pulse key={index} spy={list.name === this.state.clickedName}>
                                <Boxes key={index} Change={this.Change} name={list.name} src={list.src} clickedName={this.state.clickedName} lists={list.projectLists}/>
                            </Pulse>)
                        }
                    </div>
                    <div className={styles.buttonBackground}>
                        <Link to="/Projects" onClick={() => window.scrollTo(0, 0)}>Click Here To View All Projects</Link>
                    </div>
                </div>
            </div>   
        );
    }
}

export default Projects;