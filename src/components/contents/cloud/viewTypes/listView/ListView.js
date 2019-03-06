import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
import {Row, Col} from 'react-bootstrap';

import ListViewLeft from './listViewLeft'
import styles from './ListView.module.scss';

class ListView extends Component {
    state = {
        text: "Select a file or folder to open!"
    }

    folderReload = () => {
        const {currentFolder, lists} = this.props
        if(currentFolder === "") {
            this.props.loadDrive();
        }
        else if(currentFolder.split('/').length === 1) {
            this.props.loadDrive();
        }
        else {
            const lastIndex = currentFolder.lastIndexOf('/');
            const folderName = currentFolder.substring(0, lastIndex);
            let from = -1
            let to = 0
            lists.forEach((filename, index) => {
                if (filename.includes(`${folderName}`)) {
                    if (from === -1)
                        from = index + 1
                    else
                        to = index + 1
                }
            })
            if(to === 0){
                this.folderClick(folderName);
            }
            else  {
                this.folderClick(folderName);
                this.folderClick(folderName);
            }
        }
    }

    fileDelete = (clickedFileName) => {
        if (window.confirm(`Are you sure you want to delete "${clickedFileName}?"`)) {
            if(clickedFileName.includes('.')) {
                axios.delete("/drive", {
                    params: { filename: clickedFileName }
                })
                    .then((res) => {
                        if (res.data === "login require") {
                            this.props.setUserName("");
                            this.props.setCurrentFolder("")
                        } else {
                            this.folderReload(clickedFileName);
                        }
                    })
            }
            else {
                axios.delete("/drive", {
                    params: { foldername: clickedFileName }
                })
                    .then((res) => {
                        if (res.data === "login require") {
                            this.props.setUserName("");
                            this.props.setCurrentFolder("")
                        } else {
                            this.props.loadDrive();
                            
                        }
                    })
            }
            
        }
    }

    folderClick = (clickedFileName) => {
        const { lists, update, remove } = this.props
        if (lists.filter((dataFileName) => dataFileName.includes(`${clickedFileName}/`)).length > 0) {
            //remove appended lists
            var from = -1
            var to = 0
            lists.forEach((filename, index) => {
                if (filename.includes(`${clickedFileName}`)) {
                    if (from === -1)
                        from = index + 1
                    else
                        to = index + 1
                }
            })
            remove(from, to)

        }
        else {
            //append lists
            axios.get("/drive", {
                params: { folder: clickedFileName }
            })
                .then(res => {
                    if (res.data === "login require") {
                        this.props.setUserName("");
                        this.props.setCurrentFolder("")
                    }
                    else {
                        const responsedData = res.data.lists;
                        const where = lists.indexOf(clickedFileName);
                        update(responsedData, where + 1);
                    }     
                })
        }
    }

    BytesToGB = (bytes) => {
        if(bytes > 1073741824) return(bytes / 1073741824).toFixed(3);
        else return 0;
    }

    fileClick = (clickedFileName) => {
        this.setState({
            text:
            <>
                <i className='fas fa-spinner fa-spin loading'></i>
            </>
        })
        let renderValue = "";
        const frameURL = `storage/${this.props.userName}/${clickedFileName}`
        axios.get('/drive', {params: {filename: clickedFileName}})
            .then(res => {
                if (res.data === "login require") {
                    this.props.setUserName("");
                    this.props.setCurrentFolder("")
                } else {
                    const imgTypes = /(.jpg$|.png$|.ico$|.jpeg$)/i
                    const docTypes = /(.docx$|.doc$)/i
                    const readableTypes = /(.js$|.java$|.c$|.css$|.scss$|.txt$|.pdf$)/i
                    const videoTypes = /(.mp4$)/i
                    //const url = window.URL.createObjectURL(new Blob([res.data]));
                    console.log(res.data.size)
                    
                    if(this.BytesToGB(res.data.size) > 5){
                        renderValue =
                        <>
                            <a href={frameURL} download={clickedFileName}>Download</a>
                            <div height="100%" width="100%">The file is too big...</div>
                        </>
                    }else {
                        if(imgTypes.test(clickedFileName)) {
                            renderValue = 
                            <>
                                <a href={frameURL} download={clickedFileName}>Download</a>
                                <img width="100%" height="100%" src={frameURL} alt={clickedFileName}/>
                            </>
                        }   
                        else if(docTypes.test(clickedFileName)) {
                            renderValue =
                            <>
                                <a href={frameURL} download={clickedFileName}>Download</a>
                                <iframe title="Doc" width="100%" height="500px" frameBorder="0" src={`https://docs.google.com/gview?url=${window.location.protocol}//${window.location.hostname}:4300/${frameURL}&embedded=true`}></iframe>
                            </>
                        }
                        else if(readableTypes.test(clickedFileName)){
                            console.log("readable type")
                            renderValue = 
                            <>
                                <a href={frameURL} download={clickedFileName}>Download</a>
                                <iframe title="else" width="100%" height="500px" src={frameURL}></iframe>
                            </>
                        }
                        else if(videoTypes.test(clickedFileName)) {
                            renderValue = 
                            <>
                                <a href={frameURL} download={clickedFileName}>Download</a>
                                <ReactPlayer width="100%" url={frameURL} controls={true}>
                                </ReactPlayer>
                            </>
                        }
                        else {
                            renderValue = 
                            <>
                                <a href={frameURL} download={clickedFileName}>Download</a>
                                <p>Unable to display this file!</p>
                            </>
                        }
                    }
                    this.setState({
                        text: renderValue
                    })
                }
            })
    }

    fileUploadEvent = (data) => {
        data.preventDefault();
        const {currentFolder} = this.props
        console.log(currentFolder);
        let formData = new FormData();
        for (let i = 0; i < data.target.files.length; i++) {
            var file = data.target.files[i];
            formData.append(currentFolder, file, file.name);
        }
        axios({
            url: `/drive`,
            method: 'post',
            data: formData,
            onUploadProgress: (evt) => {
                let percent = evt.loaded / evt.total;
                percent = parseInt(percent * 100);
                this.props.setPercents(percent);
                if(percent === 100) {
                    setTimeout(() => {
                        this.props.setPercents(0);
                    }, 2000);
                }
            }
        })
            .then((res) => {
                if (res.data === "login require") {
                    this.props.setUserName("");
                    this.props.setCurrentFolder("")
                } else {
                    this.folderReload(this.props.currentFolder)
                }

            })
    }

    addFolder = () => {
        const {currentFolder} = this.props
        let name = prompt("please enter folder name")
        if(name !== null && name !== ""){
            name = currentFolder + name
            axios.put('/drive', {folder: name})
            .then(res => { 
                if(res.data === "EEXIST") alert("exist");
                else this.folderReload(this.props.currentFolder)
            })
        }
        
    }

    
    render() {
        return (
            <Row className={styles.main}>
                <Col md="5">
                    <ListViewLeft 
                    lists={this.props.lists} 
                    folderClick={this.folderClick} 
                    fileClick={this.fileClick} 
                    fileUploadEvent={this.fileUploadEvent}
                    fileDelete={this.fileDelete}
                    addFolder={this.addFolder}
                    currentFolder= {this.props.currentFolder}
                    setCurrentFolder={this.props.setCurrentFolder}
                    />
                </Col>
                <Col md="7">
                    {this.state.text}
                </Col>  
            </Row>
        );
    }
}

export default ListView;