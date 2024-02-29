import { useEffect, useRef } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateType } from "../app/store";

const MainLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const mainElRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const setHeightOfMainEl = () => {
    if (headerRef.current && mainElRef.current && footerRef.current) {
      mainElRef.current.style.minHeight = `calc(100vh - ${
        headerRef.current.offsetHeight + footerRef.current.offsetHeight
      }px)`;
    }
  };

  useEffect(() => {
    setHeightOfMainEl();

    const watcher = new ResizeObserver(setHeightOfMainEl);
    watcher.observe(document.documentElement);

    return () => {
      watcher.unobserve(document.documentElement);
    };
  }, []);

  const user = useSelector((state: RootStateType) => state.users.currentUser);

  const main = (
    <main className={"main-app-holder"} ref={mainElRef}>
      <Outlet />
    </main>
  );

  return user ? (
    <>
      <Header ref={headerRef} />

      {main}

      <footer ref={footerRef}>
        start work on 31/12/2023 <br /> finsh work on "don't know"
      </footer>
    </>
  ) : (
    main
  );
};
export default MainLayout;
