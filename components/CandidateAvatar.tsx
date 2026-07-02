import React from 'react'

export default function CandidateAvatar({children}:{children: React.ReactNode}) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-tags text-gray-300">
      {children}
    </div>
  )
}
