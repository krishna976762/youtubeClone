import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";

const sidebarItems = [
  {
    icons: <CiHome size="24px" />,
    title: "Home",
    route: "/"
  },
  {
    icons: <SiYoutubeshorts size="24px" />,
    title: "Short",
    route: "/" 
  },
  {
    icons: <MdOutlineSubscriptions size="24px" />,
    title: "Subscription",
    route: "/" 
  }
];

const SideBar = () => {
  const [open, setOpen] = useState(true); // State to toggle sidebar width
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div 
      className={`relative left-0 ${isMenuOpen ? "w-[100%] max-w-[200px] min-w-[200px]" : "w-[90%]"} p-5 h-[calc(100vh-4.625rem)] bg-white overflow-y-scroll overflow-x-hidden`}
    >
      {
        sidebarItems.map((item, index) => {
          return (
            <Link key={index} to={item.route} className='flex my-3 ml-2'>
              {item.icons}
              <p className={`ml-5 ${isMenuOpen ? "" : 'hidden'}`}>{item.title}</p>
            </Link>
          );
        })
      }
    </div>
  );
}

export default SideBar;
