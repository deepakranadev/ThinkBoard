import React from 'react'
import { Route ,Routes} from 'react-router'
import CreatePage from './Pages/CreatePage.jsx'
import HomePage from './Pages/HomePage.jsx'
import DetailsPage from './Pages/DetailsPage.jsx'

export const App = () => {
  return (
    <>
    <div data-theme='forest'>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<DetailsPage/>}/>
      </Routes>
    </div> 
    </>
  )
}

export default App