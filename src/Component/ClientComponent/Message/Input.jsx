import React, { useState } from 'react'

const InpuChat = ({handle}) => {

  const [message, setmessage] = useState("")
  const sendHandler=async()=>{
    handle(message)
  }
  return (
    <div className='bg-white rounded-2xl p-5'>
      <div className='flex justify-center items-center'>
      <input type="text" onChange={(e)=>{setmessage(e.target.value)}} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      <button  onClick={sendHandler} className="btn  mx-2">Sent</button>
      </div>
    </div>
  )
}

export default InpuChat