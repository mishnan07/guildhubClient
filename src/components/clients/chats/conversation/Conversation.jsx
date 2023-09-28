import React, { useEffect, useState } from 'react'
import userInstance from '../../../../Axios/userAxios'

const Conversation = ({ data, currentUserId}) => {
    const [userData,setUserData] = useState(null)

    useEffect(()=>{
        const id = data.members.find((id)=>id!==currentUserId)
        const getUserData = async()=>{
            try {
                const response = await userInstance.get(`/user${id}`)
                setUserData(response.data)
                console.log(response.data,'kkkkkkkkkk');
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    },[])
  return (
    <div>
      <div className="follower conversation">
        <div className="online-dot">
            <img src="" alt="image" />
            <span>online</span>
            <span>{userData?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Conversation
