import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import Fade from 'react-reveal/Fade';
import styles from './Login.module.scss';
import axios from 'axios';

class Login extends Component {
    state = {
        userID: "",
        password: "",
        confirmID: "",
        displayToggle: true,

        loginFail: false,
        usedName: false,
        IDmatch: false,
        passwordWeak: false
    }

    displayToggle = () => {
        this.setState({
            displayToggle: this.state.displayToggle ? false : true,
            userID: "",
            password: "",
            confirmID: "",
            
            loginFail: false,
            usedName: false,
            IDmatch: false,
            passwordWeak: false
        })
    }

    onChange = (evt) => {
        if (evt.target.name.match("userID")) {
            this.setState({
                userID: evt.target.value
            })
        }
        else if (evt.target.name.match("confirmID")) {
            this.setState({
                confirmID: evt.target.value
            })
        }
        else if (evt.target.name.match("password")) {
            this.setState({
                password: evt.target.value
            })
        }
    }

    validator = (e) => {
        e.preventDefault();
        const { userID, password } = this.state;
        const { setUserName, setLoginRequire } = this.props;
        if (userID !== "" && password !== "") {
            this.login(userID.toLowerCase(), password, e)
            .then (res => {
                this.setState({
                    loginFail: false
                })
                setUserName(res)
                setLoginRequire(false);
            })
            .catch(err => {
                this.setState({
                    loginFail: true
                })
            })
        }
        else {
            this.setState({
                loginFail: true
            })
        }
    }

    login = (userID, password, evt) => {
        return new Promise((resolve, reject) => {
            evt.preventDefault();
            axios.post("/login", {name: userID, password: password})
            .then(res => {
                if(res.data === false) {
                    reject("fail");   
                }
                else {
                    resolve(res.data);
                }
            })
        })
    }

    register = (e) => {
        e.preventDefault();
        let pass = true;
        const { userID, password, confirmID } = this.state;
        const regex = new RegExp("(?=.{8,})")
        if(!regex.test(password)) {
            this.setState({
                passwordWeak: true
            })
            pass = false;
        }
        else {
            this.setState({
                passwordWeak: false
            }) 
        }
        if (userID !== confirmID) {
            this.setState({
                IDmatch: true
            })
            pass = false;
        }
        else {
            this.setState({
                IDmatch: false
            })
        }
        if(pass) {
            axios.post("/regist", {
                name: userID.toLowerCase(), password: password
            })
            .then(res => {
                if(res.data === "used name") {
                    this.setState({
                        usedName: true
                    })
                }
                else {
                    alert("Registration successful, you can now try logging in!");
                    this.displayToggle();
                }
            })
        }
    }

    loginDisplay = () => {
        const { userID, password, loginFail } = this.state;
        return (
            <Form onSubmit={this.validator}>
                <h2>Login Require</h2>
                <Form.Group>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" name="userID" value={userID} placeholder="Enter Your ID" onChange={this.onChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={this.onChange} />
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>
                <Fade bottom collapse when={loginFail === true}>
                    <div className={styles.error}>
                        Fail To Login, Invalid ID or Password
                    </div>
                </Fade>
                <hr />
                <p>New to here? <span onClick={this.displayToggle}>Register</span></p>
            </Form>
        )
    }

    registDisplay = () => {
        const { userID, confirmID, password, usedName, IDmatch, passwordWeak } = this.state;
        return (
            <Form onSubmit={this.register}>
                <h3>Register New Account</h3>
                <Form.Group>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" name="userID" value={userID} placeholder="Enter Your ID" onChange={this.onChange} />
                    <Fade bottom collapse when={usedName === true}>
                        <div className={styles.error}>
                            This ID is already taken
                        </div>
                    </Fade>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm ID</Form.Label>
                    <Form.Control type="text" name="confirmID" value={confirmID} placeholder="Re-Enter Your ID" onChange={this.onChange} />
                    <Fade bottom collapse when={IDmatch === true}>
                        <div className={styles.error}>
                            ID is not match
                        </div>
                    </Fade>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={this.onChange} />
                    <Fade bottom collapse when={passwordWeak === true}>
                    <div className={styles.error}>
                        Password must have 8 charaters
                    </div>
                </Fade>
                </Form.Group>

                <Button variant="primary" type="submit">Regist</Button>
                <div className={styles.close} onClick={this.displayToggle}><i className="fas fa-arrow-left"></i></div>
            </Form>
        )
    }

    render() {
        const { userName } = this.props;
        const { displayToggle } = this.state;
        return (
            <>
                <div className={styles.background} style={userName === "" ? null : { display: "none" }}></div>
                <div className={styles.main} style={userName === "" ? { "transform": "scale(1)" } : { "transform": "scale(0)" }}>
                    {displayToggle ? this.loginDisplay() : this.registDisplay()}
                </div>
            </>
        );
    }
}

export default Login;