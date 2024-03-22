import React from 'react'
import Comment from './Comment'

const CommentsContainers = () => {

    const commentsData = [
        {
            name:"krishna bokefod",
            text:"your awesome men",
            replies:[]
        },
        {
            name:"krishna bokefod",
            text:"your awesome men",
            replies:[]
        },
        {
            name:"krishna bokefod",
            text:"your awesome men",
            replies:[
                {
                    name:"krishna bokefod",
                    text:"your awesome men",
                    replies:[]
                },
                {
                    name:"krishna bokefod",
                    text:"your awesome men",
                    replies:[]
                },
            ]
        },
        {
            name:"krishna bokefod",
            text:"your awesome men",
            replies:[]
        },
        {
            name:"krishna bokefod",
            text:"your awesome men",
            replies:[
                {
                    name:"krishna bokefod",
                    text:"your awesome men",
                    replies:[]
                },
                {
                    name:"krishna bokefod",
                    text:"your awesome men",
                    replies:[
                        {
                            name:"krishna bokefod",
                            text:"your awesome men",
                            replies:[
                                {
                                    name:"krishna bokefod",
                                    text:"your awesome men",
                                    replies:[]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
    ]

    const CommentList = ({ comments }) => {
        return (
          <>
            {comments.map((comment, index) => (
              <div key={index}>
                <Comment data={comment} />
                {comment.replies && (
                  <div className='pl-5 border border-l-black ml-5'>
                    <CommentList comments={comment.replies} />
                  </div>
                )}
              </div>
            ))}
          </>
        );
      };
      
      

  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Comments:</h1>
 <CommentList comments={commentsData}  />
    </div>
  )
}

export default CommentsContainers
