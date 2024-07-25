import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'
import { LuSendHorizonal } from "react-icons/lu";
import Avatar from "react-avatar";

import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../redux/slice/chatSlice'
import { generateRandomName, generateRandomMessage } from '../utils/helper'

const LiveChat = () => {
    const dispatch = useDispatch()
    const [liveMessage, setLiveMessage] = useState("")
    const chatMessages = useSelector(store => store.chat.messages)

    useEffect(() =>{
      const  i = setInterval(() =>{
      dispatch(addMessage({
          name:generateRandomName(),
          message:generateRandomMessage(20)
      }))
      },1500)
      return () => clearInterval(i)
          },[])

          const sendMessage = (e) => {
            e.preventDefault()
            dispatch(addMessage({
              name: "krishna",
              message: liveMessage
            }))
            setLiveMessage("")
          }
      

    return (
        <>
            <div className='ml-2 h-[31.6rem] p-2 border border-black w-full h-[600] bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
                {
                    chatMessages.map((c, index) => <ChatMessages key={index} name={c.name} message={c.message} />)
                }
            </div>
            <form className='flex w-full p-2 m-2 border border-black'
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(addMessage({
                        name: "krishna",
                        message: liveMessage
                    }))
                    setLiveMessage("")
                }}>

                <div className='w-full flex items-center justify-between border-t p-2'>
                    <div className='flex items-center '>
                        <div>
                            <Avatar src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" size={35} round={true} />
                        </div>
                        <input value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} className='border-b border-gray-300 outline-none ml-2' type="text" placeholder='Send message...' />
                        <div className='bg-gray-200 cursor-pointer p-2 rounded-full' onClick={sendMessage}>
                            <LuSendHorizonal />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LiveChat
