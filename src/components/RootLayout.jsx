import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function RootLayout() {
  return (
    <div className="px-2 sm:px-10 md:px-20 lg:px-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
