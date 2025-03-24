import React, { useState } from "react";

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDED]">
      <div className="w-16 h-full bg-[#FFFFFF] border-r-[#BBBBBB] border-r-[0.5px]">
        <div className="h-full flex flex-col items-start p-2 space-y-2 gap-7 mt-3"></div>
      </div>
    </div>
  );
}
