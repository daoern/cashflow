import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="h-full">
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
