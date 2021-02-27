import React from 'react'
import Header from './components/Header/Header'
import MyTable from './components/MyTable/MyTable'
import Search from './components/Search/Search'
import { BrowserRouter } from 'react-router-dom'


function App() {



  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Search />
          <MyTable />

        </div>
      </BrowserRouter>
    </>

  );
}




export default App;
