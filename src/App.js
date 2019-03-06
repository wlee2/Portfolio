import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';

import axios from 'axios'

import { connect } from 'react-redux'
import actions from './actions'

import MainBody from './components/contents/portfolio/MainBody'
import Header from './components/header'
import ProjectLists from './components/contents/projectLists'
import Cloud from './components/contents/cloud'
import SideNav from './components/sideNav'
import Login from './components/login'
import Blog from './components/contents/blog'
import './App.css'


const supportsHistory = 'pushState' in window.history;

class App extends Component {
  state = {
    userName: "",
    loginRequire: false
  }

  componentDidMount() {
    const { project_init } = this.props;
    project_init();
    this.loginCheck()
    .then(res => {
      if(res !== this.state.userName) {
        console.log("name reload!")
        this.setUserName(res);
      }
    })
    this.intervel();
  }

  intervel = () => {
    setInterval(async() => {
      const res = await this.loginCheck();
      if(res !== this.state.userName) {
        this.setUserName(res);
      }
    }, 2 * 1000 * 60);
  }

  loginCheck = () => {
    return new Promise((resolve, reject) => {
      axios.get('/login')
      .then(res => {
        if(res.data === "login require") {
          resolve("")
        }
        else {
          resolve(res.data.userName)
        }
      })
    })
  }

  setUserName = (userName) => {
    this.setState({userName: userName});
  }

  setLoginRequire = (boolean) => {
    this.setState({loginRequire: boolean});
  }

  loginRequireToggle = () => {
    this.setState({loginRequire: !this.state.loginRequire});
  }

  logout = () => {
    if (window.confirm(`Are you sure to logout?`)) {
      axios.get('/logout')
          .then(() => {
              this.setUserName("");
              this.setLoginRequire(true);
          })
    }
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <>
            <Header userName={this.state.userName} loginRequireToggle={this.loginRequireToggle} logout={this.logout}/>
            <SideNav/>
            { this.state.loginRequire ?
              <Login userName={this.state.userName} setUserName={this.setUserName} setLoginRequire={this.setLoginRequire}/>
              : null
            }
            <Route render={({location}) => {
              const {pathname} = location;
              return (
                <TransitionGroup>
                <CSSTransition 
                  key={pathname}
                  classNames="page"
                  timeout={{
                    enter: 500,
                    exit: 500,
                  }}
                >
                <Route location={location} render={() => (
                  <Switch>
                    <Route exact path="/" component={MainBody}></Route>
                    <Route path="/projects" render={(props) => <ProjectLists {...props} projectLists={this.props.projectLists} />}></Route>
                    <Route path="/blogs" render={(props) => <Blog {...props} userName={this.state.userName} setLoginRequire={this.setLoginRequire}/>}></Route>
                    <Route path="/drives" render={(props) => <Cloud {...props} userName={this.state.userName} setUserName={this.setUserName} setLoginRequire={this.setLoginRequire}/>}></Route>
                  </Switch>
                )}/>
                </CSSTransition>
                </TransitionGroup>
              )
            }}/>
            
          </>
        </BrowserRouter>
      </div >
    );
  }
}


const mapStateToProps = (state) => ({
  projectLists: state.projectLists
});

const mapDispatchToProps = (dispatch) => ({
  project_init: () => {
    axios.get("/projects")
      .then(res => {
        dispatch(actions.project_init(res.data))
      })

  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)