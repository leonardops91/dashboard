import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine } from "react-icons/ri";
import { NavSection } from "./navSection";
import { NavLink } from "./navLink";

export function SidebarNav(){
    return (
        <Stack spacing={12} align="flex-start">
          <NavSection title="GERAL">
            <NavLink href='/dashboard' icon={RiDashboardLine}>Dashboard</NavLink>
            <NavLink href='/users' icon={RiContactsLine}>Usuários</NavLink>

          </NavSection>
        </Stack>
    )
}