import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from "react-router-dom"

const Menu = () => {
  const [menu, setMenu] = useState(0)
  const [listUrl, setListUrl] = useState([])
  const [indexActive, setIndexActive] = useState(-1)

  const listFunctions = [
    [AiOutlineMenu, [
      ['Login Users', '/user/login'],
      ['Users', '/user'],
    ]],
    [AiOutlineMenu, [
      ['Home', '/user'],
      ['User1', '/user'],
    ]],
    [AiOutlineMenu, [
      ['Home', '/user'],
      ['User2', '/user'],
    ]]
  ]

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
      elementMenu.style.backgroundColor = "rgba(153, 213, 232, 0.8)"
      setMenu(0)
    } else {
      if (indexActive !== index) {
        const elementMenu = document.querySelector(`[data-index="${index}"]`)
        elementMenu.style.backgroundColor = "rgba(90, 200, 234, 0.8)"

        if (indexActive !== -1) {
          const elementMenu = document.querySelector(`[data-index="${indexActive}"]`)
          elementMenu.style.backgroundColor = "rgba(153, 213, 232, 0.8)"
        }
        setIndexActive(index)
      }
      setMenu(index + 1)
    }
    setListUrl(listUrl)
  }

  return (
    <div className='menu d-flex' style={{ width: "56px" }} >
      <div style={{ backgroundColor: "rgba(153, 213, 232, 0.8)" }}>
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

      <div className='w-100' style={{ backgroundColor: "rgba(90, 200, 234, 0.8)" }}>
        {
          menu !== 0 &&
          listUrl.map(([title, url]) => (
            <Link key={title} to={url} className='d-flex pt-3 pb-3' >
              <span>{title}</span>
            </Link>
          ))
        }
      </div>
    </div>

  )
}

export default Menu