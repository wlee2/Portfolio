import React, { Component } from 'react';

import { Nav, ProgressBar, Overlay, Popover } from 'react-bootstrap';

class CloudNav extends Component {
    render() {
        const {percents} = this.props;
        return (
            <>
                <Nav fill variant="tabs" defaultActiveKey="lists">
                    <Nav.Item>
                        <Nav.Link eventKey="lists">Lists View</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled>
                            <ProgressBar ref="target" now={percents} />
                            <Overlay target={this.refs.target} show={percents > 0 && percents < 50 ? true : false} placement="bottom" container={this}>
                                <Popover id="popover-contained" title="Upload Start">
                                    <strong>The upload progress has started.</strong>
                                </Popover>
                            </Overlay>
                            <Overlay target={this.refs.target} show={percents === 100 ? true : false} placement="bottom">
                            <Popover id="popover-contained" title="Upload Done">
                                    <strong>The upload progress has done.</strong>
                                </Popover>
                            </Overlay>
                        </Nav.Link> 
                    </Nav.Item>
                </Nav>
            </>
        );
    }
}

export default CloudNav;