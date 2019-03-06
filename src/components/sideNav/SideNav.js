import React, { Component } from 'react';
import styles from './SideNav.module.scss';

let timeEvent = null;

class SideNav extends Component {
    state = {
        show: true
    }

    setTimer = () => {
        clearTimeout(timeEvent);
        timeEvent = setTimeout(() => {
            this.setState({
                show: false
            })
        }, 4500);
    }

    componentDidMount = () => {
        this.setTimer();
    }

    openOrCloseEvent = () => {
        this.setTimer();
        this.setState({
            show: !this.state.show
        })
    }

    scrollToTop = () => {
        this.setTimer();
        window.scrollTo(0, 0);
    }

    faceBook = () => {
        this.setTimer();
        window.open("https://www.facebook.com/jawtuck", "_blank")
    }

    gitHub = () => {
        this.setTimer();
        window.open("https://github.com/wlee2", "_blank")
    }

    linkedIn = () => {
        this.setTimer();
        window.open("https://www.linkedin.com/in/wooseok-lee-964a18165/", "_blank")
    }

    render() {
        const { show } = this.state
        return (
            <div className={show ? styles.main : [styles.main, styles.close].join(' ')}>
                <div className={styles.lists}>
                    <ul>
                        <li onClick={this.scrollToTop}>
                            <i className="fas fa-angle-double-up"></i>
                            <p>Top</p>
                        </li>
                        <hr/>
                        <li onClick={this.faceBook }>
                            <i className="fab fa-facebook"></i>
                        </li>
                        <li onClick={this.gitHub}>
                            <i className="fab fa-github"></i>
                        </li>
                        <li onClick={this.linkedIn}>
                            <i className="fab fa-linkedin"></i>
                        </li>
                    </ul>
                </div>
                <div className={styles.toggler} onClick={this.openOrCloseEvent}>
                    {
                        show ? <i className={"fas fa-caret-left"}/> : <i className={"fas fa-caret-right"}/>
                    }
                </div>
            </div>
        );
    }
}

export default SideNav;