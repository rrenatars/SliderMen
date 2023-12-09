import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Presentation } from '../types'

interface PresentationContextProps {
    presentationData: Presentation
    setPresentationData: React.Dispatch<React.SetStateAction<Presentation>>
}

const PresentationDataContext = createContext<
    PresentationContextProps | undefined
>(undefined)

interface PresentationContextProviderProps {
    children: ReactNode
    initialPresentationData: Presentation
}

export function PresentationContextProvider({
    children,
    initialPresentationData,
}: PresentationContextProviderProps) {
    const [presentationData, setPresentationData] = useState(
        initialPresentationData,
    )

    return (
        <PresentationDataContext.Provider
            value={{ presentationData, setPresentationData }}
        >
            {children}
        </PresentationDataContext.Provider>
    )
}

export function usePresentationDataContext() {
    const context = useContext(PresentationDataContext)
    if (!context) {
        throw new Error(
            'usePresentationContext must be used within a PresentationDataContext Provider',
        )
    }
    return context
}
