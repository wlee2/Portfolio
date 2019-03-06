import React, { Component } from 'react';

import Introduction from './introduction/Introduction'
import Projects from './projects'
import Skills from './skills'
import Contact from './Contact'

import Page from '../../../common/Page'

import styles from './MainBody.module.scss'

class mainBody extends Component {
    render() {
        return (
            <Page>
                <div className={styles.main}>
                    <Introduction/>
                    <Skills/>
                    <Projects />
                    <Contact />
                </div>
            </Page>
        );
    }
}

export default mainBody;