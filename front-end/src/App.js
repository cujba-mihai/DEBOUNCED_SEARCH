import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";
import Filters from "./components/Filters/Filters";
import Results from "./components/Results/Results";

import History from "./components/History/History";
import { RecoilRoot } from "recoil";


function Home() {
  return (
    <>
      <NavBar />
      <Filters />
      <Results />
    </>
  )
}




function App() {

  return (
    <RecoilRoot>
      <BrowserRouter history={History}>
        <Routes>
          <Route index={true} element={<Home />} />
          <Route path="/search" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;
