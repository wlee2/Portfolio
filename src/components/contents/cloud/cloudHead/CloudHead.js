import React from 'react';
import {Row, Col} from 'react-bootstrap';

import CloudNav from './cloudNav';
import styles from './CloudHead.module.scss';
import './CloudHead.css';

const CloudHead = ({percents, logout, userName}) => {
    return (
        <>
            <Row className={styles.head}>
                <Col>
                    <h2>Web Storage</h2>
                    <p>Welcome - {userName}</p>
                </Col>
            </Row>
            <Row>
                <Col className={styles.options}>
                    <CloudNav percents={percents}/>
                </Col>
            </Row>
        </>
    );
};

export default CloudHead;