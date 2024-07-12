import React from 'react'
import CreateRoomForm from './create-room-form'

const CreatePageRoom = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 pt-12 pb-24'>
        <p className='text-4xl font-bold'>Create Room</p>
        <CreateRoomForm/>
    </div>
  )
}

export default CreatePageRoom