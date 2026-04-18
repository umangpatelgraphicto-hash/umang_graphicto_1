'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ContextData {
  showVideoModal: boolean
  openVideoModal: () => void
  closeVideoModal: () => void
  scrollWithOffset: (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => void
}

const Context = createContext<ContextData | undefined>(undefined)

interface ContextProviderProps {
  children: ReactNode
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  // Video Modal Modal
  const [showVideoModal, setShowVideoModal] = useState(false)

  const openVideoModal = () => {
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
  }

  // ScrollOffset
  const scrollWithOffset = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offset = 120 // Offset in pixels
      const targetPosition = targetElement.offsetTop - offset
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  // Return
  const contextValue: ContextData = {
    showVideoModal,
    openVideoModal,
    closeVideoModal,
    scrollWithOffset,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export const useCustomContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useCustomContext must be used within an ContextProvider')
  }
  return context
}
