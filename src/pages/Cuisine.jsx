import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import '../index.css'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=9`
            );
        const recipes = await data.json();
        setCuisine(recipes.results);
    };

    useEffect(() => {
        getCuisine(params.type);
        console.log(params);
    }, [params.type]);

    return <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <h4>{item.title}</h4>
                        <img src={item.image} alt={item.title}/>
                        <Gradient/>
                    </Link>
                </Card>
            )
        })}
    </Grid>
}

const Grid = styled(motion.div)`
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

export default Cuisine;