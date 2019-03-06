import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav } from 'react-bootstrap';

import styles from './Header.module.scss'

class Header extends Component {
    ScrollToTop = (e) => {
        window.scrollTo(0, 0);
        this.mobileToggle();
    }

    mobileToggle = () => {
        let temp = document.getElementById("basic-navbar-nav");
        if(temp.classList.contains("show")) {
            setTimeout(() => {
                document.getElementsByClassName("navbar-toggler")[0].click();
            }, 300);
        }   
    }

    goLogin = () => {
        this.mobileToggle();
        this.props.loginRequireToggle();
    }

    goLogout = () => {
        this.mobileToggle();
        this.props.logout();
    }

    render() {
        const { userName } = this.props
        return (
            <Navbar bg="light" expand="lg" collapseOnSelect={true} className={styles.HeadNav}>
                <Navbar.Brand ><Link to="/" onClick={this.ScrollToTop}>HOME</Link></Navbar.Brand>
                <Navbar.Toggle ref="toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/projects" onClick={this.ScrollToTop}>PROJECT</Link>
                        <Link to="/blogs" onClick={this.ScrollToTop}>BLOG</Link>
                        <Link to="/drives" onClick={this.ScrollToTop}>CLOUD</Link>
                    </Nav>                
                    {
                        userName === "" ?
                        <div className={styles.login} onClick={this.goLogin} sm="10"><i className="fas fa-user-times"/></div> :
                        <div className={styles.logout} onClick={this.goLogout} sm="10"><span>{userName}</span><i className="fas fa-user-alt"/></div>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;