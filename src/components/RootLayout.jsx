import { Outlet } from "react-router";
import Header from "./Header.jsx";

export default function RootLayout() {
  return (
    <div className="px-30">
      <Header />
      <Outlet />
    </div>
  )
}
