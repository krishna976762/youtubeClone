import React from 'react'

const Comment = ({data}) => {
    const {name,text,replies}=data
  return (
    <div className='flex shadow-sm bg-gray-100 p-2 my-2 rounded-lg'> 
      <img alt="user"
      className='w-12 h-12 p-3'
      src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div>
        <p className='font-bold'>{name}</p>
        <p className=''>{text}</p>
      </div>
    </div>
  )
}

export default Comment
