import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import DropDownMenu from "./DropDownMenu.jsx";

export default function Header() {

  const { user } = useSelector(state => state.userSlice);

  return (

    <div className="px-5 mt-1.5 flex justify-between items-center sticky top-0 z-1 bg-gray-100 rounded-b-2xl flex-wrap">

      <div className="flex items-center">
        <img src="/logobgremover.png" alt="" />
        <NavLink to={'/'} className='font-extrabold font-serif text-orange-500'>Networking Hub</NavLink>
      </div>





      <div className="flex items-center flex-wrap">

        {user ? <DropDownMenu user={user} /> : <div className="flex sm:gap-0 lg:gap-3 items-center f[rgba(255,165,0,0.04)]">

          <NavLink to={'/login'} className='px-5 py-2  hover:scale-120 transition duration-300'>Login</NavLink>
          <NavLink to={'/register'} className='bg-blue-600 px-5 py-2 m-2 rounded-br-xl text-white 
            hover:scale-105 transition duration-300'>Register</NavLink>
        </div>}
      </div>
    </div>

  )
}
