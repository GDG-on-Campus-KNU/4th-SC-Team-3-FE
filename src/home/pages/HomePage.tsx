import React, { useState } from "react";
import menu1 from "../../assets/menu1.png";
import menu2 from "../../assets/menu2.png";
import menu3 from "../../assets/menu3.png";
import menu4 from "../../assets/menu4.png";

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDED]">
      <div className="w-16 h-full bg-[#FFFFFF] border-r-[#BBBBBB] border-r-[0.5px]">
        <div className="h-full flex flex-col items-start p-2 space-y-2 gap-7 mt-3">
          {/* <button onClick={toggleDrawer}>
            <img src={menu1} alt="menu1" className="w-12 h-12" />
          </button>

          <img src={menu2} alt="menu2" className="w-12 h-12" />
          <img src={menu3} alt="menu3" className="w-12 h-12" />
          <img src={menu4} alt="menu4" className="w-12 h-12" /> */}
        </div>
      </div>
    </div>
  );
}
