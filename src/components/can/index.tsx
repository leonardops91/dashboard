import { ReactNode } from 'react'
import { useCan } from '../../services/hooks/useCan'

interface CanProps {
    children: ReactNode
    permissions?: string[]
    roles?: string[]
}
export default function Can({ children, permissions, roles }: CanProps) {
  const userCanSeeComponent = useCan({
    permissions,
    roles,
  });
  if (userCanSeeComponent) {
    return <>{children}</>;
  } else {
    return null;
  }
}