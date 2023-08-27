import React, { useEffect, useState } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { Link } from "react-router-dom"

const Menu = () => {
  const [menu, setMenu] = useState(0)
  const [listUrl, setListUrl] = useState([])
  const [indexActive, setIndexActive] = useState(-1)
  const [heightMenu, setHeightMenu] = useState("")

  // change height menu   
  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      setHeightMenu(`${screenHeight-56}px`);
    };
    handleResize(); // Call it once to set initial dimensions
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const listFunctions = [
    [AiOutlineMenu, [
      ['Login Users', '/user/login'],
      ['Users', '/user'],
    ]],
    [BsFillPersonFill, [
      ['Manage users', '/admin/all-users'],

    ]],

  ]
  const color = {
    normal: "rgb(153, 213, 232)",
    active: "rgb(90, 200, 234)"
  }

  useEffect(() => {
    const heightScreen = document.querySelector('.menu');
    heightScreen.style.height = (window.innerHeight - 56) + 'px';

    if (menu) {
      const elementMenu = document.querySelector('.menu')
      elementMenu.style.width = "400px"

    } else {
      const elementMenu = document.querySelector('.menu')
      elementMenu.style.width = "56px"
    }
  }, [menu])
  const handleOpenMenu = (index, listUrl) => {

    if (menu === index + 1) {
      const elementMenu = document.querySelector(`[data-index="${indexActive}"]`)
      elementMenu.style.backgroundColor = color.normal
      setMenu(0)
      setIndexActive(-1)

    } else {
      if (indexActive !== index) {
        const elementMenu = document.querySelector(`[data-index="${index}"]`)
        elementMenu.style.backgroundColor = color.active

        if (indexActive !== -1) {
          const elementMenu = document.querySelector(`[data-index="${indexActive}"]`)
          elementMenu.style.backgroundColor = color.normal
        }
        setIndexActive(index)
      }
      setMenu(index + 1)
    }
    setListUrl(listUrl)
  }

  return (
    <div className='menu d-flex sticky top-[56px]' style={{ height: heightMenu }} >
      <div style={{ backgroundColor: "rgb(153, 213, 232)" }}>
        {
          listFunctions.map(([iconName, listUrl], index) => {
            const Icon = iconName;
            Icon.key = { size: 40 }
            return (
              <div key={index} data-index={index} className='p-2 active cursor-pointer'
                onClick={() => handleOpenMenu(index, listUrl)}  >
                <Icon size={40} />
              </div>
            );
          })
        }
      </div>

      {
        menu !== 0 &&
        <div className='w-100' style={{ backgroundColor: "rgb(90, 200, 234)" }}>
          {
            listUrl.map(([title, url]) => (
              <Link key={title} to={url} className='d-flex pt-3 pb-3' >
                <span className='pl-2'>{title}</span>
              </Link>
            ))
          }
        </div>
      }
    </div>

  )
}

export default Menu