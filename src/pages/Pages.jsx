import React from 'react'
import Home from './Home'
import Cuisine from "./Cuisine";
import Searched from './Searched';
import Recipe from './Recipe';
import Filter from './Filter';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from "react-router-dom";

function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>} />
        <Route path="/cuisine/:type" element={<Cuisine/>} />
        <Route path="/searched/:search" element={<Searched/>}></Route>
        <Route path="/recipe/:name" element={<Recipe/>}></Route>
        <Route path="/filter" element={<Filter />}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default Pages