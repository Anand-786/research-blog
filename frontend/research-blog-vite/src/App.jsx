import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import LogCard from './components/LogCard'
import SearchBar from './components/SearchBar'
import CategoryManager from './components/CategoryManager'
import LogForm from './components/LogForm'
import SignIn from './components/SignIn'
import SignUp from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full bg-[#FAF9F6] flex flex-col space-y-4'>
        <div>
          <Navbar />
        </div>
        <div className='pt-20 px-72 flex justify-center items-center'>
          <SearchBar onSearch={(data) => console.log(data)} />
        </div>
          
        <div className="flex w-full pt-4 px-52">
          <div className="w-3/4 pr-20 border-r border-gray-200">
            {/*<LogForm onSubmit={(data) => console.log(data)} />*/}
            <LogCard />
          </div>
          <div className="w-1/4 pl-20">
            <p className="text-gray-500">
              <CategoryManager />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
