import { Icon, Text, Link as LinkBase, LinkProps as LinkBaseProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";
interface NavLinkProps extends LinkBaseProps{
    children: string,
    icon: ElementType,
    href: string
}

export function NavLink({ children, icon, href, ...rest}: NavLinkProps){
    const location = useLocation()

    return (
      <Link to={href}>
        <LinkBase display='flex' alignItems='center' color={location.pathname.startsWith(href) ? 'purple.500' : ''} {...rest}>
          <Icon as={icon} fontSize='20' />
          <Text ml='4' fontWeight='medium'>
            {children}
          </Text>
        </LinkBase>
      </Link>
    );
}