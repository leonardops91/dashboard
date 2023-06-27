import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { ReactNode, createContext, useContext, useEffect } from "react";

interface SidebarDrawerContextProps {
    children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({children}: SidebarDrawerContextProps) {
    const disclosure = useDisclosure()
    // const router = window.location

    // useEffect(() => {
    //     disclosure.onClose()
    // }, [router])

    return (
        <SidebarDrawerContext.Provider value={disclosure} >
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)