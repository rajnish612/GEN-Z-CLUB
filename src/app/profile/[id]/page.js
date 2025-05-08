
import React from 'react'
import Profile from '@/components/Profile/Profile'

const page = async({params}) => {
  const {id} = await params
  return (
    <div >
      
      <Profile id={id} />
     
     
    </div>
  )
}

export default page
