import React from 'react';
import styles from './Detail.module.scss';

const Detail = ({blogData, toggler}) => {

    const stringToHtml = (string) => {
        return {__html: string}
    }

    return (
        <div className={styles.detailMain}>
            <div className={styles.buttonWrap}>
                <button className={styles.backButton} onClick={toggler}>back</button>
            </div>
            <div className={styles.topInfo}>
                <h1 className={styles.title}>{blogData.Title}</h1>
                <p className={styles.sub}>Author - {blogData.Author}</p>
                <p className={styles.sub}>Posted Time - {blogData.PostTime}</p>
            </div>
            <pre className={styles.innerText} dangerouslySetInnerHTML={stringToHtml(blogData.HtmlContents)} />
        </div>
    );
};

export default Detail;