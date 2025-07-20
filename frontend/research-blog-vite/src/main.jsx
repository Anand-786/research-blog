import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/Signup.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children:[
    {
      path: "",
      element: <SignIn />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
