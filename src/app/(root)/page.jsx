
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Button>Click Me</Button>
      <UserButton/>
    </div>
  )
}

export default Home