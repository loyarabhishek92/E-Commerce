import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import DropDownMenu from "./DropDownMenu.jsx";

export default function Header() {

  const { user } = useSelector(state => state.userSlice);

  return (
    <div>
      <div className="px-5 flex justify-between items-center bg-gray-100 rounded-b-2xl flex-wrap">

        <div className="flex items-center">
          <img src="./public/logobgremover.png" alt="logo" className="h-15 w-15" />
          <NavLink to={'/'} className="font-extrabold font-serif text-orange-500">Networking Hub</NavLink>
        </div>


        <div className="flex items-center flex-wrap">
          <NavLink to={'/'} className={'hover:bg-blue-100 px-5 py-2 m-2 rounded-2xl'}>Home</NavLink>
          <NavLink to={'/about'} className={'hover:bg-blue-100 px-5 py-2 m-2 rounded-2xl'}>About</NavLink>
          <NavLink to={'/contact'} className={'hover:bg-blue-100 px-5 py-2 m-2 rounded-2xl'}>Contact</NavLink>

          {user ? <DropDownMenu user={user} /> : <div className="flex sm:gap-0 lg:gap-3 items-center flex-wrap">

            <NavLink to={'/login'} className={'hover:bg-blue-100 px-5 py-2 m-2 rounded-2xl'}>Login</NavLink>
            <NavLink to={'/register'} className={'bg-blue-600 px-5 py-2 m-2 rounded-2xl text-white'}>Register</NavLink>
          </div>}
        </div>
      </div>
    </div>
  )
}
