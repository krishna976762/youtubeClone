import React from 'react'

const ChatMessages = ({name,message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
      <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="userIcon"
          className="h-8"
        />
        <span className='font-bold px-2'>{name}</span>
        <span>{message}</span>
    </div>
  )
}

export default ChatMessages
