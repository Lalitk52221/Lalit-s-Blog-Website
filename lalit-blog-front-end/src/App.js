import { Outlet } from "react-router-dom";
import Header from "./Components/UI/Header";
import LoadingBar from "react-top-loading-bar";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProgress } from "./Components/Redux/Slicer";

const App = () => {
  const progress = useSelector((state) => state.navbarItem.progress);
  const dispatch = useDispatch();

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => dispatch(updateProgress(0))}
        style={{ zIndex: 9999 }}
      />
      <Header />
      <Outlet />
    </div>
  );
};
export default App;
