"use client"

import React from 'react'
import dynamic from 'next/dynamic'

const BackgroundSphere = dynamic(() => import('./BackgroundSphere'), { ssr: false })

export const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <BackgroundSphere />
    </div>
  )
}
