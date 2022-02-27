import React from 'react'
import cat from '@/public/images/300x300.gif'
import CardTitle from '@/public/images/CardTitle.png'
import Image from 'next/image'
import CardDetails from '@/components/CardDetails'

const Card = () => {
  return (
    <div
      className='relative flex justify-center text-center max-h-min rounded-3xl '
      style={{ backgroundColor: '#FBFBFB', width: '847px' }}
    >
      <div className='absolute text-4xl md:text-6xl -mt-5 md:-mt-14 w-2/3'>
        <Image src={CardTitle} placeholder='blur' priority quality={100} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full p-10 md:p-16 gap-y-4'>
        <div className='flex justify-center md:justify-start items-center'>
          <Image src={cat} />
        </div>
        <div className='flex justify-center items-center'>
          <CardDetails />
        </div>
      </div>
    </div>
  )
}

export default Card
