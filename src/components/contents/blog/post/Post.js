import React, { Component } from 'react';
import axios from 'axios'
import styles from './Post.module.scss';
import { Form } from 'react-bootstrap';

import { Editor } from 'slate-react'

import Plain from 'slate-plain-serializer'
import html from './slateContainer'


class Post extends Component {
    state = {
        Title: "",
        ThumbNail: "",
        Contents: html.deserialize('<p></p>'),
    }

    ref = editor => {
        this.editor = editor
    }

    hasMark = (type) => {
        const { Contents } = this.state
        return Contents.activeMarks.some(mark => mark.type === type)
    }

    hasBlock = (type) => {
        const { Contents } = this.state
        return Contents.blocks.some(node => node.type === type)
    }

    componentDidUpdate = (prev) => {
        if(this.props.show !== prev.show) {
            console.log("did!")
            this.setState({
                Title: "",
                ThumbNail: "",
                Contents: html.deserialize('<p></p>'),
            })
        }
    } 

    posting = (evt) => {
        evt.preventDefault();

        axios({
            method: 'post',
            url: '/blog',
            data: {
                Title: this.state.Title,
                PostTime: new Date().toLocaleString('en-US', { hour12: false }),
                Author: this.props.userName,
                ThumbNail: this.state.ThumbNail,
                Contents: localStorage.plainType,
                HtmlContents: localStorage.htmlType
            }
        })
            .then(res => {
                if(res.data === true) {
                    console.log(res);
                    this.props.update(true);
                    alert("Success to post!")
                    this.props.toggler();
                }
                else {
                    alert(`Error: ${res.data.name}`)
                    console.log(res.data)
                }
                
            })
    }

    titleChange = (e) => {
        this.setState({
            Title: e.target.value
        })
    }

    thumbnailChange = (e) => {
        this.setState({
            ThumbNail: e.target.value
        })
    }

    contentsChange = ({value}) => {
        const htmlType = html.serialize(value)
        const plainType = Plain.serialize(value)
        localStorage.setItem('htmlType', htmlType)
        localStorage.setItem('plainType', plainType)

        this.setState({
            Contents: value
        })
    }

    onKeyDown = (event, editor, next) => {
        if (!event.ctrlKey) return next()

        switch (event.key) {
            case 'b': {
                event.preventDefault()
                editor.toggleMark('bold')
                break;
            }
            case 'i': {
                event.preventDefault()
                editor.toggleMark('italic')
                break;
            }
            case '`': {
                const isCode = editor.value.blocks.some(block => block.type === 'code')
                event.preventDefault()
                editor.setBlocks(isCode ? 'paragraph' : 'code')
                break;
            }
            case 'q': {
                const isCode = editor.value.blocks.some(block => block.type === 'quote')
                event.preventDefault()
                editor.setBlocks(isCode ? 'paragraph' : 'quote')
                break;
            }
            default: {
                return next()
            }
        }
    }
    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'code':
                return (
                    <pre {...props.attributes}>
                        <code>{props.children}</code>
                    </pre>
                )
            case 'paragraph':
                return (
                    <p {...props.attributes} className={props.node.data.get('className')}>
                        {props.children}
                    </p>
                )
            case 'quote':
                return (
                    <blockquote {...props.attributes}>
                        {props.children}
                    </blockquote>
                )
            case 'h2':
                return (
                    <h2 {...props.attributes}>
                        {props.children}
                    </h2>
                )
            default:
                return next()
        }
    }
    
      // Add a `renderMark` method to render marks.
      renderMark = (props, editor, next) => {
        const { mark, attributes } = props
        switch (mark.type) {
          case 'bold':
            return <strong {...attributes}>{props.children}</strong>
          case 'italic':
            return <em {...attributes}>{props.children}</em>
          case 'underline':
            return <u {...attributes}>{props.children}</u>
          default:
            return next()
        }
    }

    buttonToBlockToggle = (e, type) => {
        e.preventDefault();
        const isCode = this.editor.value.blocks.some(block => block.type === type)
        this.editor.setBlocks(isCode ? 'paragraph' : type)
    }

    buttonToMarkToggle = (e, type) => {
        e.preventDefault();
        this.editor.toggleMark(type)
    }

    render() {
        return (
            <div className={styles.main} style={this.props.show ? {"transform": "scale(1)"}: {"transform": "scale(0)"}}>
                <Form onSubmit={this.posting}>
                    <h3>Post Form</h3>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="Author" value={this.props.userName} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="Title" onChange={this.titleChange} value={this.state.Title} placeholder="Enter Title" />
                    </Form.Group>
                    <Form.Group controlId="formThumbNail">
                        <Form.Label>ThumbNail URL</Form.Label>
                        <Form.Control type="text" name="ThumbNail" onChange={this.thumbnailChange} value={this.state.ThumbNail} placeholder="Enter URL" />
                    </Form.Group>
                    <Form.Group controlId="formTextarea">
                        <Form.Label>Contents</Form.Label>
                        <div className={styles.typeButton}>
                            <button className={this.hasBlock('paragraph') ? styles.actived :null} onClick={(e) => this.buttonToBlockToggle(e,'paragraph')}>p</button>
                            <button className={this.hasBlock('h2') ? styles.actived : null} onClick={(e) => this.buttonToBlockToggle(e,'h2')}>h2</button>
                            &emsp;
                            <button className={this.hasMark('bold') ? styles.actived : null} onClick={(e) => this.buttonToMarkToggle(e,'bold')}>bold</button>
                            <button className={this.hasMark('italic') ? styles.actived : null} onClick={(e) => this.buttonToMarkToggle(e,'italic')}>italic</button>
                        </div>
                        <Editor
                        className={styles.editor} 
                        ref={this.ref}
                        value={this.state.Contents}
                        onChange={this.contentsChange} 
                        onKeyDown={this.onKeyDown}
                        renderNode={this.renderNode}
                        renderMark={this.renderMark}
                        />
                    </Form.Group>
                    
                    <button type="submit">post</button>
                </Form>
            </div>
        );
    }
}

export default Post;