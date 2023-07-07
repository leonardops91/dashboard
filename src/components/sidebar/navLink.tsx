import { Icon, Text, Link as LinkBase, LinkProps as LinkBaseProps } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface NavLinkProps extends LinkBaseProps{
    children: string | ReactNode
    icon?: ElementType,
    href: string
}

export function NavLink({ children, icon, href, ...rest}: NavLinkProps){
    const location = useLocation()

    return (
      <LinkBase
        href={href}
        display='flex'
        alignItems='center'
        color={location.pathname.startsWith(href) ? "purple.500" : ""}
        {...rest}
      >
        {icon ? (
          <>
            <Icon as={icon} fontSize='20' />
            <Text ml='4' fontWeight='medium'>
              {children}
            </Text>
          </>
        ) : (
          <>{children}</>
        )}
      </LinkBase>
    );
}