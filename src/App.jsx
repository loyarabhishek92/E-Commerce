import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom"
import RootLayout from "./components/RootLayout.jsx";
import Home from "./home/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },


        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
