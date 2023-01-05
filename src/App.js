import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import NewForm from './pages/NewForm'
import Temas from './pages/Temas'
import UserHomePage from './pages/UserHomePage'
import UserSettings from './pages/UserSettings'
import NotFound from './pages/NotFound'
import { PostProvider } from './context/PostContainer'

const Layout = () => {
  return(
    <>
    <Navbar></Navbar>
    <div className='bg-red-500'>
    <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <HomePage />
    },
    {
      path:"/temas",
      element: <Temas />
    },
    {
      path: "/new",
      element: <NewForm />
    },
    {
      path: "/posts/:id",
      element: <NewForm />
    },
    {
      path: "/userhome",
      element: <UserHomePage/>
    },
    {
      path: "/usersettings",
      element: <UserSettings />
    },
    {
      path: "/*",
      element: <NotFound/>
    }
  ]
}])


function App() {
  return (
    <PostProvider>
    <RouterProvider router={router} />
    </PostProvider>
  )
}

export default App;
