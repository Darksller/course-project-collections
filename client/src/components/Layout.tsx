import { Outlet } from '@tanstack/react-router'

export const Layout = () => {
  return (
    <div className="mx-auto mt-4 max-w-1440 rounded-xl bg-slate-200 bg-opacity-40 backdrop-blur dark:bg-purple-500/60 sm:mt-12">
      <Outlet />
    </div>
  )
}
