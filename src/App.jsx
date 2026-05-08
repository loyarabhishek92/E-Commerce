import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom"
import RootLayout from "./components/RootLayout.jsx";
import Home from "./home/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import AdminPage from "./features/admin/AdminPage.jsx";
import Edit from "./features/admin/form/Edit.jsx";
import Add from "./features/admin/form/Add.jsx";

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
          path: '/profile',
          element: <UserProfile />
        },
        {
          path: 'admin',
          element: <AdminPage />
        },
        {
          path: 'form/add',
          element: <Add />
        },
        {
          path: 'form/edit/:id',
          element: <Edit />
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
