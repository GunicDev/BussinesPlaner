import { Outlet } from "react-router-dom";
import NavigationMenu from "../components/Menu/Menu";

export default function RootLayot() {
  return (
    <>
      <NavigationMenu />
      <main className="lg:mt-10 lg:ml-72 sm: mt-7">
        <Outlet />
      </main>
    </>
  );
}
