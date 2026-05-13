import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function RootLayout() {
  return (
    <div className="sm:px-5 md:px-15 lg:px-30">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
