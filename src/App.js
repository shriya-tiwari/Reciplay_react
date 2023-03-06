import React from "react";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import Filter from "./pages/Filter";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { useState } from "react";
import './index.css';

function App() {
  const [click, setClick] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <GiChefToque />
        <Logo onClick={() => setClick(false)} to={"/"}>Reciplay</Logo>
        <SLink onClick={() => setClick(true)} to={"/filter/"}>Filter By Ingredients</SLink>
      </Nav>
      {click === false && 
      <div>
        <Search/>
        <Category/>
        <Pages/>
      </div>
      }
      {click === true && 
        <Filter />
      }
        
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 35px;
  font-weitgh: 400;
  margin-left: 20px;
  font-family: 'Lobster Two', cursive;
`
const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 45px;
  }
`
const SLink = styled(Link)`
  width: 246px;
  margin-left: 624px;
  padding: 1rem 0.5rem;
  background: linear-gradient(35deg, #494949, #313131);
  border: none;
  border-radius: 7px;
  font-size: 20px;
  color: white;
  text-decoration: none;
  text-align: center;
`

export default App;
