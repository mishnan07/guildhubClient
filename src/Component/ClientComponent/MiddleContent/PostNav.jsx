import React from 'react'
import ProfilePic from '../ProfilePic/ProfilePic'
import Options from './Options'
import OptionsIcon from '../Icon/OptionIcon'

const PostNav = ({item,user,deleatTheComponent,Type,deleteQuestion,userId,setState}) => {
           let postUserId 
           if(item.proId){
            postUserId = item.proId
           }else if(item.userId){
            postUserId = item.userId
           }
  return (
    <div>
         <div className="post-container flex justify-start items-start mt-4 p-2">
                <div className='h-fit w-20'>
                <ProfilePic UserId={postUserId } value="pic" />

                </div>

                    <div className="flex justify justify-between w-full  post-detail ml-2 mb-2">
                      <div className="user-info">
                        <h5>
                          <a
                            href="timeline.html"
                            className="profile-link text-blue-500 font-semibold hover:underline"
                          >
                            <ProfilePic UserId={postUserId } value="name" />
                          </a>{" "}
                          <span className="following text-green-500">
                            <ProfilePic UserId={postUserId } value="location" />
                          </span>
                        </h5>
                        <p className="text-muted">
                          {" "}
                          <ProfilePic UserId={postUserId } value="category" />
                        </p>
                      </div>
                      <div className="mt-4 ">

                      {item?.proId === postUserId&&
                        <Options
                          item={item}
                          user={user}
                          deleate={deleatTheComponent}
                          value={item?._id}
                          Type={Type}
                          setState={setState}
                        />
                      }

                      {item?.userId === postUserId&& item?.userId === userId&&
                   <OptionsIcon 
                   id={item._id} 
                   item={item} 
                   deleteQuestion={deleteQuestion}/>

                      
                      }
                      </div>
                    </div>
                  </div>
      
    </div>
  )
}

export default PostNav
