import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

const Menu = () => {
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (menu) {
      const elementMenu = document.querySelector('.menu')
      elementMenu.classList.add("w-25")
      elementMenu.classList.remove("w-20")


    } else {
      const elementMenu = document.querySelector('.menu')
      elementMenu.classList.remove("w-25")
      elementMenu.classList.add("w-20")

    }

  }, [menu])

  return (
    <div className='menu w-20' style={{ backgroundColor: "rgba(153, 213, 232, 0.8)" }}>
      <div className='p-2'>
        <AiOutlineMenu size={40} onClick={() => setMenu(!menu)} />
      </div>
      {
        menu &&
        <div >
          Menu
        </div>
      }
    </div>
  )
}

export default Menu