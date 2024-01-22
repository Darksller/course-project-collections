import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/useUiStore'
import { Link, LinkProps } from '@tanstack/react-router'

export function CheckAuthLink({ children, className, ...props }: LinkProps) {
  const { isAuth } = useAuthStore()
  const { setIsAuthModelOpen } = useUiStore()

  return (
    <Link
      className={className}
      {...(isAuth ? props : null)}
      onClick={!isAuth ? () => setIsAuthModelOpen(true) : () => {}}
    >
      {children}
    </Link>
  )
}
