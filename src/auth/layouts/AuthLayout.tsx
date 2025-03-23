import { Outlet } from 'react-router-dom';
import { Fragment } from 'react'; // 수정된 부분

export const AuthLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-dvh flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[600px]">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
