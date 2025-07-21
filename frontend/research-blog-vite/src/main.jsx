import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/Signup.jsx'
import RandomLogs from './components/RandomLogs.jsx'
import LogForm from './components/LogForm.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children:[
    {
      path: "",
      element: <RandomLogs />
    },
    {
      path: "signup",
      element: <SignUp />
    },
    {
      path: "signin",
      element: <SignIn />
    },
    {
      path: "add-log",
      element: <LogForm />
    },
    {
      path: "search",
      element: <RandomLogs />
    },
    {
      path: "/signedin",
      element: <RandomLogs />
    },
    {
      path: "/my-logs",
      element: <RandomLogs />
    }
  ]
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
