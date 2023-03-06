import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Filter = () => {
    const [input, setInput] = useState("");
    const [searchedRecipes, setSearchedRecipes] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        getSearched(input);
    }

    const getSearched = async (ingredients) => {
        const list = ingredients.split(' ');
        const ingredientList = list.join(",+");
        console.log(ingredientList);
        const data = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredientList}&number=2`
            );
        const recipes = await data.json();
        console.log(recipes);
        setSearchedRecipes(recipes);
    };

    return (
        <div>
            <FormStyle onSubmit={submitHandler}>
            <div>
                <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input} 
                />
            </div>
            </FormStyle>
            <Grid>
            {searchedRecipes.map((item) => {
                return(
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <h4>{item.title}</h4>
                            <img src={item.image} alt={item.title}></img>
                            <Gradient/>
                        </Link>
                    </Card>
                )
            })}
            </Grid>
        </div>
    )
}

const FormStyle = styled.form`
  display: flex;
  justify-content: space-evenly;
  width: 897px;

  div {
    position: realtive;
    widhth: 100%;
  }    
  input {
      background: linear-gradient(35deg, #494949, #313131);
      font-size: 20px;
      color: white;
      padding: 10px 30px;
      border: none;
      border-radius: 1rem;
      outline: none;
      width: 141%;
  }
  svg {
      position: absolute;
      top: 17%;
      left: 34%;
      font-size: 24px;
      color: white;
  }
`
const Grid = styled.div`
    margin: 30px 0px 0px 0px; 
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 1.5rem;
`
const Card = styled.div`
    margin: 10px 0px 10px 0px;
    height: 254.54px;
    width: 338.41px;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img { 
        width: 100%;
        border-radius: 2rem;
        position: absolute;
        object-fit: cover;
        transition: transform .75s, visibility .75s ease-in;
    }
    &:hover img{
        transform: scale(1.15);
    }
    a {
        text-decoration: none;
    }
    h4 {
        position: absolute;
        z-index: 10;
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        height: 150%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const Gradient = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.25));
`

export default Filter