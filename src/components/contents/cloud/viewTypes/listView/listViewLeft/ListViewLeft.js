import React, { Component } from 'react';
import styles from './ListViewLeft.module.scss';
import './ListViewLeft.css'
import {Button} from 'react-bootstrap';
import { TransitionGroup } from 'react-transition-group';
import Slide from 'react-reveal/Fade';

let seleted = ""

class ListViewLeft extends Component {

    clickEvent = (clickedFileName) => {
        seleted = clickedFileName;
        let tempPath = ""
        const {setCurrentFolder} = this.props;
        console.log(clickedFileName.includes('.')? 'file Clicked': 'folder Clicked')
        const split = clickedFileName.split('/');
        if(clickedFileName.includes('.')) {
            if(split.length === 1)
                tempPath = ""
            else {
                for(let i = 0; i < split.length - 1; i++)
                    tempPath += split[i]+"/";
            } 
            this.props.fileClick(clickedFileName)
        }
        else {
            tempPath = clickedFileName + '/';
            this.props.folderClick(clickedFileName)
        }
        setCurrentFolder(tempPath);
    }

    design = (list, index) => {
        const {fileDelete} = this.props;
        const splitedName = list.split('/');
        let printingName = "";
        if(splitedName.length === 1) {
            if(list.length > 18) {
                printingName = list.substring(0, 18) + '...';
            }
            else {
                printingName = list
            }

            if(list.includes('.')) {
                //file
                return (
                    <>
                    <p className={seleted === list ? [styles.file, styles.active].join(' ') : styles.file} onClick={() => this.clickEvent(list)}>
                        &emsp;<i className="fas fa-file"/>&nbsp;{printingName}
                    </p> <i className={[styles.delete, "fas fa-trash"].join(' ')} onClick={() => fileDelete(list)}/>
                    </>
                )
            }
            else {
                //folder
                return (
                    <>
                    <p className={seleted === list ? [styles.folder, styles.active].join(' ') : styles.folder}  onClick={() => this.clickEvent(list)}>
                        &emsp;<i className="fas fa-folder"/>&nbsp;{printingName}
                    </p> <i className={[styles.delete, "fas fa-trash"].join(' ')}onClick={() => fileDelete(list)}/>
                    </>
                )
            }
        }
        else {
            if(splitedName[splitedName.length - 1].length > 18) {
                printingName = splitedName[splitedName.length - 1].substring(0, 18) + '...';
            }
            else {
                printingName = splitedName[splitedName.length - 1]
            }

            if(splitedName[splitedName.length - 1].includes('.')) {
                return (
                    <>
                    <p className={seleted === list ? [styles.file, styles.active].join(' ') : styles.file}  onClick={() => this.clickEvent(list)}>
                    {
                        splitedName.map((temp, index) => <React.Fragment key={index}>&nbsp;</React.Fragment>)
                    }
                    &emsp;<i className="fas fa-file"/>&nbsp;{printingName}
                    </p> <i className={[styles.delete, "fas fa-trash"].join(' ')} onClick={() => fileDelete(list)}/>
                    </>
                )
            }
            else {
                return (
                    <>
                    <p className={seleted === list ? [styles.folder, styles.active].join(' ') : styles.folder} onClick={() => this.clickEvent(list)}>
                    {
                        splitedName.map((temp, index) => <React.Fragment key={index}>&nbsp;</React.Fragment>)
                    }
                    &emsp;<i className="fas fa-folder"/>&nbsp;{printingName}
                    </p> <i className={[styles.delete, "fas fa-trash"].join(' ')} onClick={() => fileDelete(list)}/>
                    </>
                )
            }
        }
    }
    render() {
        const {lists, fileUploadEvent, addFolder, currentFolder} = this.props;
        return (
            <>
            <div className={styles.uploadNav}> 
                <div className={styles.upText}>Folder path: {currentFolder === "" ? "." : currentFolder}</div>
                <div className={styles.upButton}><Button variant="outline-primary" onClick={()=> addFolder()}><i className="fas fa-folder-plus"/></Button></div>
                <div className={styles.upButton}><Button variant="outline-primary" onClick={() => this.refs.upload.click()}><i className="fas fa-cloud-upload-alt"></i></Button></div>
                <form>
                    <input ref="upload" type="file" multiple="multiple" onChange={(data) => fileUploadEvent(data)} style={{display: "none"}} />
                </form>
            </div>
            <div className={styles.leftMain} >
                {Array.isArray(lists) && lists.length > 0 ?
                <TransitionGroup appear={true} enter={true} exit={true}>
                {lists.map((list, index) =>
                    <Slide key={index} left collapse opposite>
                        <div style={{position: "relative"}}>
                            {this.design(list, index)}
                        </div>
                    </Slide>
                )}
                </TransitionGroup> 
                : <p>This is empty</p>} 
            </div>
            </>
        );
    }
}

export default ListViewLeft;