import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";

import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import "./Sidebar.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import Notification from "../Notification/Notification";
import wizDriveImage from '../../assets/IMG_5544.jpg';


const Sidebar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Home");
  const excludedBoxRef = useRef(null);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (tab === "Home") {
      navigate("/");
    } else if (tab === "Create Post") {
      onOpen();
    } else if (tab === "About Us") {
      navigate("/about");
    } else if(tab==="Reels"){
      navigate("reels")
    }
    else if(tab==="Create Reels"){
      handleOpenCreateReelModal()
    }
    else if(tab==="Notifications"){
      navigate("/notifications")
    }
    else if(tab==="Create Story"){
      navigate("/create-story")
    }
    else if(tab==="Learning Plan"){
      navigate("/learning_plan")
    }
    else if(tab==="Learning Progress"){
      navigate("/learning-progress")
    }
    if (tab === "Search") {
      setIsSearchBoxVisible(true);
    } else setIsSearchBoxVisible(false);
  };

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  const handleLogout=()=>{
    localStorage.clear();
    navigate("/login")
  }

  const handleCloseCreateReelModal=()=>{
    setIsCreateReelModalOpen(false);
  }

  const handleOpenCreateReelModal=()=>{
    setIsCreateReelModalOpen(true);
  }

  // Check if the sidebar content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (menuRef.current) {
        const isOverflowing = menuRef.current.scrollHeight > menuRef.current.clientHeight;
        if (isOverflowing) {
          menuRef.current.classList.add('force-scroll');
        } else {
          menuRef.current.classList.remove('force-scroll');
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className="sticky top-0 h-[100vh] flex flex-col overflow-hidden sidebar-container">
      <div className={`${activeTab === "Search" ? "px-3" : "px-4 md:px-6 lg:px-10"} flex flex-col justify-between h-full`}>
        {/* Logo section */}
        <div className="flex flex-col min-h-0">
          <div className="pt-4 pb-3 flex-shrink-0">
            {!isSearchBoxVisible && (
              <img
                className="w-28 md:w-32 lg:w-36"
                src={wizDriveImage}
                alt="Logo"
              />
            )}
          </div>
          
          {/* Menu items - scrollable section */}
          <div 
            ref={menuRef}
            className="sidebar-menu flex-grow"
          >
            {mainu.map((item, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-4 cursor-pointer text-base lg:text-lg sidebar-item"
              >
                <div className="min-w-[2rem] flex justify-center">
                  {activeTab === item.title ? item.activeIcon : item.icon}
                </div>
                <p
                  className={`ml-2 whitespace-nowrap ${
                    activeTab === item.title ? "font-bold" : "font-semibold"
                  } ${isSearchBoxVisible ? "hidden" : "block"}`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* More options section - always visible at bottom */}
        <div className="pt-3 pb-4 border-t border-gray-100 mt-2 flex-shrink-0">
          <div onClick={handleClick} className="flex items-center cursor-pointer sidebar-item">
            <div className="min-w-[2rem] flex justify-center">
              <IoReorderThreeOutline className="text-2xl" />
            </div>
            {!isSearchBoxVisible && <p className="ml-2 whitespace-nowrap">More</p>}
          </div>
          {showDropdown && (
            <div className="absolute bottom-12 left-0 lg:left-14 w-full lg:w-[80%] z-10">
              <div className="shadow-md bg-white rounded">
                <p onClick={handleLogout} className="w-full py-2 text-base px-4 border-t border-b cursor-pointer hover:bg-gray-100">
                  Log out
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isSearchBoxVisible && (
        <div className="flex-1 overflow-hidden">
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal onClose={handleCloseCreateReelModal} isOpen={isCreateReelModalOpen} onOpen={handleOpenCreateReelModal} />
    </div>
  );
};

export default Sidebar;
