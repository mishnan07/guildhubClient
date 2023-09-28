import React from 'react'
import { userAPI } from "../../../Constants/Api";
const profile = "/images/user_149071.png";


const CommentBox = ({comments,item,details}) => {
  return (
    <div>
         <div className=" overflow-scroll max-h-[300px] ">
                        {comments.map((item1,index) => (
                          <ul  key={index} className="max-w-md divide-y divide-gray-200 dark:divide-gray-300  ">
                            {item._id === item1.post ? (
                              <li className="pt-5 pb-3 sm:pt-4">
                                <div className="flex items-center space-x-4 ">
                                  <div className="flex-shrink-0">
                                    {details(item1.userId, "pic") ? (
                                      <img
                                        // onClick={()=>goProfile(item.proId)}
                                        src={
                                          `${userAPI}/images/` +
                                          details(item1.userId, "pic")
                                        }
                                        alt="user"
                                        className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                                      />
                                    ) : (
                                      <img
                                        // onClick={()=>goProfile(item.proId)}
                                        src={profile}
                                        alt="user"
                                        className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 truncate dark:text-gray-400">
                                      {item1.userId
                                        ? details(item1.userId, "name")
                                        : ""}
                                    </p>
                                    <p className="text-sm text-gray-700 truncate dark:text-gray-700">
                                      {item._id === item1.post
                                        ? item1.content
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              " "
                            )}
                          </ul>
                        ))}
                      </div >
      
    </div>
  )
}

export default CommentBox
