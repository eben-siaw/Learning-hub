import React, { useState, useEffect } from 'react'; 
import {Tooltip} from 'antd';  
import axios from 'axios';
import {LikeOutlined, DislikeOutlined} from '@ant-design/icons';  
import LikeIcon from '@material-ui/icons/ThumbUp';
import DisLikeIcon from '@material-ui/icons/ThumbDown'

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

function LikesDislikes(props) { 
 
  const [Likes, setLikes] = useState(0); 
  const [DisLikes, setDisLikes] = useState(0); 
  const [LikesAction, setLikeAction] = useState(null); 
  const [DisLikesAction, setDisLikeAction] = useState(null);
    
  let variable = {};
  

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId, userTo: props.userTo }
    } else {
        variable = { commentId: props.commentId, userId: props.userId, userTo: props.userTo }
    }
 
    // mount life cycle method to retrieve lists of likes and dislikes if any
    useEffect(() => { 

    axios.post(local + `/like/getLikes`, variable).then(response => { 

        if(response.data.success) { 
            console.log("getLikes", response.data); 
            setLikes(response.data.likes.length); 
     
              //if I already click this like button or not 
              response.data.likes.map(like => {
                if (like.userId === props.userId) {
                    setLikeAction('liked')
                }
            })
        } else { 
           alert("Failed to get likes"); 
        }
    }) 

    axios.post(local + '/dislike/getDislikes', variable) 
    .then(response => { 
        if (response.data.success) {
            //How many likes does this video or comment have  
            console.log("getDislike", response.data);
            setDisLikes(response.data.dislikes.length)

            //if I already click this like button or not 
            response.data.dislikes.map(dislike => {
                if (dislike.userId === props.userId) {
                    setDisLikeAction('disliked')
                }
            })
        } else {
            alert('Failed to get dislikes')
        }
    })

  }, [])
 
   //onClick handler for the like button
   const onLike = () => {  

    if(LikesAction == null) {  

        axios.post(local + `/like/upLike`, variable)
        .then(response => {
            if (response.data.success) {

                setLikes(Likes + 1)
                setLikeAction('liked')

                //If dislike button is already clicked then reduce by 1 --dislike

                if (DisLikesAction !== null) {
                    setDisLikeAction(null)
                    setDisLikes(DisLikes - 1)
                }


            } else {
                alert('Failed to increase the like')
            }
        })
    } else { 

        axios.post(local + `/like/unLike`, variable)
        .then(response => {
            if (response.data.success) {

                setLikes(Likes - 1)
                setLikeAction(null)

            } else {
                alert('Failed to decrease the like')
            }
        })
    }

   } 
  
   // onClick handler for dislike
   const onDisLike = () => {

    if (DisLikesAction !== null) {

        axios.post(local + `/dislike/unDisLike`, variable)
            .then(response => {
                if (response.data.success) {

                    setDisLikes(DisLikes - 1)
                    setDisLikeAction(null)

                } else {
                    alert('Failed to decrease dislike')
                }
            })

    } else {

        axios.post(local + `/dislike/upDisLike`, variable)
            .then(response => {
                if (response.data.success) {

                    setDisLikes(DisLikes + 1)
                    setDisLikeAction('disliked')

                    //If dislike button is already clicked
                    if(LikesAction !== null ) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }

                } else {
                    alert('Failed to increase dislike')
                }
            })


    }

}
    return ( 
 
     <React.Fragment>  
     <div className="wrapper-likes">  

     <span key="comment-basic-like"> 
      <Tooltip title="Like">  
      <LikeIcon type="like"    
      label="Like"
      color={LikesAction === 'liked' ? 'primary': 'action'}  
      style={{cursor: 'pointer'}} 
      onClick={onLike}/> 
     
      </Tooltip>   
      <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes} likes</span>
    </span>&nbsp;&nbsp;  

     <span className="tool2" key="comment-basic-dislike">
      <Tooltip title="DisLike">  
      <DisLikeIcon type="dislike"  
      label="Dislike"
       color={DisLikesAction === 'disliked' ? 'secondary' : 'action'} 
       style={{cursor: 'pointer'}} 
       onClick={onDisLike}
      />
      </Tooltip>   
      <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DisLikes} dislikes</span>
     </span>
     </div> 
     <style jsx> {` 
       .wrapper-likes{ 
         position: absolute; 
         right: 0;   
         justify-content: space-between;
         padding-right: 150px;  
       } 
       .tool2 { 
         padding-left: 28px;  
       } 
       @media (max-width: 480px) { 
       .wrapper-likes { 
         display: flex; 
         flex-direction: row;   
        }
       } 
       `}</style>
    </React.Fragment>
    

 );

} 

export default LikesDislikes;