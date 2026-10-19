import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const MainLayout = () => {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Theme still works for the current session.
    }
  }, [theme]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
