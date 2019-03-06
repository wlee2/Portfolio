import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Page from '../../../common/Page';
import Post from './post';
import Detail from './details'
import styles from './Blog.module.scss';

const Blog = ({userName, setLoginRequire}) => {
    const [showPost, setShowPost] = useState(false);

    const toggle = () => {
        if (userName === "") {
            setLoginRequire(true);
            setShowPost(false);
        }
        else {
            setShowPost(!showPost);
        }
    }

    const [hasPosted, setHasPosted] = useState(true);
    const [blogLists, setBlogLists] = useState([])
    useEffect(() => {
        if(hasPosted === true){
            update();
        }

        setHasPosted(false)
    }, [hasPosted === false])

    const update = () => {
        console.log("update!")
        axios.get('/blog')
            .then(res => {
                setBlogLists(res.data)
            })
    }

    const [detailToggle, setDetailToggle] = useState(null)
    
    const detailToggler = (blogData) => {
        if(detailToggle !== null) {
            setDetailToggle(null)
        }
        else {
            setDetailToggle(blogData)
        }
    }

    return (
        <Page>
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Blog</h1>
                <p>You can post and share various ideas here. Enjoy!</p>
            </div>
            <div className={styles.postingBtnNav}>
                <button className={styles.postingButton} onClick={toggle}><i className="fas fa-pencil-alt"/></button>
                <Post userName={userName} update={setHasPosted} show={showPost} toggler={setShowPost}/>
            </div>
            <div>
                {
                    detailToggle !== null ? <Detail blogData={detailToggle} toggler={detailToggler}/> :
                    blogLists.map((data) =>
                        <>
                            <div key={data.id} className={styles.cards} onClick={() => detailToggler(data)}>
                                <h3 className={styles.title}>Title: {data.Title}</h3>
                                <div className={styles.cardContents}>
                                    <img src={data.ThumbNail} alt=""/>
                                    <div>
                                        {
                                            data.Contents !== null ? <pre>{data.Contents.length > 80 ? `${data.Contents.substring(0, 80)}...` : data.Contents}</pre> : <pre>It seems like empty...</pre>
                                        }
                                        <span className={styles.author}>Author: {data.Author} - Posted: {data.PostTime}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
        </Page>
    );
};

export default Blog;

// class Blog extends Component {
//     state = {
//         showPost: false,
//         blogLists: []
//     }

//     componentDidMount = () => {
//         this.update();
//     }

//     update = () => {
//         axios.get('/blog')
//             .then(res => {
//                 this.setState({
//                     blogLists: res.data
//                 })
//             })
//     }
    
//     showPostToggler = () => {
//         this.setState({
//             showPost: !this.state.showPost
//         })
//     }

//     postingLoginValid = () => {
//         this.props.setLoginRequire(true);
//         if (this.props.userName === "") {
//             this.props.setLoginRequire(true);
//             this.setState({
//                 showPost: false
//             })
//         }
//         else {
//             this.setState({
//                 showPost: !this.state.showPost
//             })
//         }
//     }

//     stringToHtml = (string) => {
//         return {__html: string}
//     }

//     render() {
//         return (
//             <Page>
//                 <div className={styles.main}>
//                     <div className={styles.header}>
//                         <h1>Blog</h1>
//                         <p>You can post and share various ideas here. Enjoy!</p>
//                     </div>
//                     <div className={styles.postingBtnNav}>
//                         <button onClick={this.postingLoginValid}><i className="fas fa-pencil-alt"/></button>
//                         <Post userName={this.props.userName} update={this.update} show={this.state.showPost} toggler={this.showPostToggler}/>
//                     </div>
//                     <div>
//                         {
//                             this.state.blogLists.map((data) =>
//                                 <>
//                                     <div key={data.id} className={styles.cards}>
//                                         <h3 className={styles.title}>Title: {data.Title}</h3>
//                                         <div className={styles.cardContents}>
//                                             <img src={data.ThumbNail} alt=""/>
//                                             <div>
//                                                 {
//                                                     // data.Contents !== null ?  <pre dangerouslySetInnerHTML={{__html: data.Contents.length > 90 ? data.Contents.substring(0, 90) + "..." : data.Contents}}/> : <pre> Empty </pre>
//                                                 }
//                                                 {
//                                                     data.Contents !== null ? <pre>{data.Contents.length > 80 ? `${data.Contents.substring(0, 80)}...` : data.Contents}</pre> : <pre>It seems like empty...</pre>
//                                                 }
//                                                 <span className={styles.author}>Author: {data.Author} - Posted: {data.PostTime}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>
//                             )
//                         }
//                     </div>
//                 </div>
//             </Page>
//         );
//     }
// }

// export default Blog;