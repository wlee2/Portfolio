import React, { Component } from 'react';

import ProjectDetails from './ProjectDetails'

import styles from './ProjectLists.module.scss'
import styled, { keyframes } from 'styled-components';

import Page from '../../../common/Page'
var timer = null;

const buttonAnimation = keyframes`
    0% {
        transform: translateY(-20%);
    }
    60% {
        transform: translateY(+10%);
    }
    100% {
        transform: translateY(0%);
    }
`

const Button = styled.button`
    background: ${props => props.clicked === true ? "green" : "#41A4F5"};
    color: ${props => props.clicked === true ? "white" : "white"};

    font-size: 13px;
    margin: 5px;
    padding: 10px 15px;
    border: 1px solid white;
    border-radius: 5px;
    animation: ${props => props.clicked === true ? buttonAnimation : ""} .5s ease;

    @media (max-width: 600px) {
        margin: 4px;
        padding: 4px 10px;
    }
`;

const AnimationDiv = styled.div`
    opacity: ${props => props.animate === true ? "0" : "1"};
    transition: .5s ease;
`;

class ProjectLists extends Component {
    state = {
        tags: [],
        seletedProject: "null",
        clickedTag: "All",
        lists: [],
        animate: true
    }

    componentDidMount = async () => {
        const {projectLists} = this.props
        const tagFromParam = this.props.location.state ? this.props.location.state.tag : "All"
        this.TagClcik(tagFromParam)
        var tags = ["All"]
        await projectLists.map((list) => {
            list.tags.map(tagData => {
                if (tags.filter(data => data === tagData).length === 0) {
                    tags.push(tagData);
                }
                return true
            })

            return true
        })

        this.setState({
            tags: tags,
            clickedTag: tagFromParam
        })

        setTimeout(() => {
            this.setState({
                animate: false
            })
        }, 200)
    }

    TagClcik = (tag) => {
        const {projectLists} = this.props
        if (tag === "All") {
            this.setState({
                lists: projectLists
            })
        }
        else {
            var matchedLists = []
            projectLists.map(data => {
                if (data.tags.filter(tagData => tagData === tag).length > 0) {
                    matchedLists.push(data)
                }
                return true;
            })
            this.setState({
                lists: matchedLists
            })
        }

    }

    timeOut = (tag) => {
        this.setState({
            animate: true,
            clickedTag: tag
        })
        window.clearTimeout(timer);
        timer = null;
        timer = setTimeout(() => {
            this.TagClcik(tag)
            this.setState({
                animate: false
            })
        }, 500)
    }

    Change = (name) => {
        if (this.state.seletedProject === name) {
            this.setState({
                seletedProject: "null"
            })
        } else {
            this.setState({
                seletedProject: name
            })
        }
    }

    render() {
        return (
            <Page>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Projects</h1>
                        <p>Those are my Case Studies, and it shows what I can do.</p>
                    </div>
                    <div className={styles.buttons}>
                        {this.state.tags.map((tag, index) => <Button clicked={tag === this.state.clickedTag} key={index} onClick={() => this.timeOut(tag)}>{tag}</Button>)}
                    </div>
                    <AnimationDiv className={styles.row} animate={this.state.animate}>
                        {this.state.lists.map((list, index) =>
                            <ProjectDetails key={index} Change={this.Change} name={list.name} src={list.src} tags={list.tags} background={list.background} seleted={this.state.seletedProject}/>
                        )}
                    </AnimationDiv>
                </div>
            </Page>
        );
    }
}


export default ProjectLists