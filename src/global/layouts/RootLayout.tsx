import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import logo from "../../assets/logo.svg";

export const RootLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-12 bg-bgCanvasWhite">
        <div className="w-full h-full flex items-center px-4 gap-5 border-b-[#BBBBBB] border-b-[0.5px]">
          <img src={logo} alt="logo" className="h-8" />
          <h1 className="text-2xl font-bold text-center">PIPY</h1>
        </div>
      </div>
      <div className="w-full h-dvh flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
