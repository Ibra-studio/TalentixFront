import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Spinner className='size-8'/>
    </div>
  )
}
