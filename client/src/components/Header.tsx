
import React from 'react'

import logo from '../assets/Dark Logo.png'

const Header = () => {
  return (
    <div>
       <div className="flex flex-row ml-2">
       <img src={logo} alt="logo" className="w-[3.5rem] rounded-full p-1 bg-green-400"   />
       <h4 className="text-green-700 sm:text-[0.8rem] font-semibold mt-4 ml-1"> EXPENSE HUB </h4>
       </div>
    </div>
  )
}

export default Header
