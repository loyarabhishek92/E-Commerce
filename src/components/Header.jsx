import { NavLink } from "react-router";

export default function Header() {
  return (
    <div>
      <div className="px-5 flex justify-between items-center bg-amber-100 rounded-b-2xl">
        <NavLink to={'/'}>E-Commerce</NavLink>
        <div className="flex gap-15 items-center">
          <NavLink to={'/login'} className={'hover:bg-blue-100 px-5 py-2 m-2 rounded-2xl'}>Login</NavLink>
          <NavLink to={'/register'} className={'bg-blue-600 px-5 py-2 m-2 rounded-2xl text-white'}>Register</NavLink>
        </div>
      </div>
    </div>
  )
}
