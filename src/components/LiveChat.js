import React, { useEffect ,useState} from 'react'
import ChatMessages from './ChatMessages'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../redux/slice/chatSlice'
import { generateRandomName,generateRandomMessage } from '../utils/helper'

const LiveChat = () => {
    const dispatch =useDispatch()
    const [liveMessage,setLiveMessage] = useState()
    const chatMessages= useSelector(store => store.chat.messages)
    useEffect(() =>{
const  i = setInterval(() =>{
//api polling
dispatch(addMessage({
    name:generateRandomName(),
    message:generateRandomMessage(20)
}))
},1500)

return () => clearInterval(i)
    },[])

  return (
    <>
    <div className='ml-2 h-[31.6rem] p-2 border border-black w-full h-[600] bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
    {
      chatMessages.map((c, index) => <ChatMessages key={index} name={c.name} message={c.message} />)
    } 
  </div>
  <form className='flex w-full p-2 m-2 border border-black'
  onSubmit={
    (e) =>{
        e.preventDefault()
        dispatch(addMessage({
            name:"krishna",
            message:liveMessage
        }))
        setLiveMessage("")
    }
  }>
    <input  className='w-96 p-2'
    type='text'
    value={liveMessage}
    onChange={(e) => setLiveMessage(e.target.value)}
    />
    <button className='px-2 mx-2 bg-green-100'>
        Send
    </button>
  </form>

  </>
  
  )
}

export default LiveChat
