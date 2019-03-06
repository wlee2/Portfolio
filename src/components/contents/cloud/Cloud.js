import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../../actions'
import axios from 'axios';

import {Container} from 'react-bootstrap';

import CloudHead from './cloudHead';
import ListView from './viewTypes/listView';
import styles from './Cloud.module.scss';

import Page from '../../../common/Page'

class Cloud extends Component {
    state = {
        currentFolder: "",
        percents: 0
    }

    componentWillUnmount = () => {
        this.props.setLoginRequire(false);
    }

    componentDidMount = () => {
        this.props.setLoginRequire(true);
        if(this.props.lists.length === 0){
            this.loadDrive();
        }   
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.userName !== prevProps.userName) {
            this.loadDrive();
        }
    }

    setCurrentFolder = (path) => {
        this.setState({
            currentFolder: path
        })
    }

    setPercents = (now) => {
        this.setState({
            percents: now
        })
    }

    loadDrive = () => {
        this.setCurrentFolder("");
        this.props.init()
        .then((res) => {
            this.props.setUserName(res);
        })
        .catch(() => {
            this.props.setUserName("");
        })
    }

    render() {
        const { percents, currentFolder} = this.state;
        const {userName, setUserName} = this.props;
        return (
            <Page>
                <Container fluid={true} className={styles.main}>
                    <CloudHead userName={userName} logout={this.logout} percents={percents}/>
                    <ListView userName={userName}
                    setUserName={setUserName} 
                    loadDrive={this.loadDrive} 
                    setPercents={this.setPercents} 
                    lists={this.props.lists} 
                    update={this.props.update} 
                    remove={this.props.remove} 
                    setCurrentFolder={this.setCurrentFolder}
                    currentFolder={currentFolder}
                    />
                </Container>
            </Page>
        );
    }
}
const mapStateToProps = (state) => ({
    lists: state.lists
});

const mapDispatchToProps = (dispatch) => ({
    init: () => {
        return new Promise((resolve, reject) => {
            axios.get('/drive')
            .then(res => {
                console.log(res.data);
                if (res.data === "login require") {
                    dispatch(actions.init([]))
                    reject("login fail")
                }
                else {
                    dispatch(actions.init(res.data.lists))
                    resolve(res.data.userName)
                }
            })
        })
      },
    update: (data, index) => dispatch(actions.update({ data, index })),
    remove: (from, to) => dispatch(actions.remove({ from, to }))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cloud);