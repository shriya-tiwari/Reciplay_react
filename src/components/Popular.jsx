import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15`)
      const data = await api.json();
      
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      console.log(data.recipes);
      setPopular(data.recipes);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: true,
          drag: "free",
        }}>
          {popular.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient/>
                    </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin 4rem 0 rem;  
`
const Card = styled.div`
  margin: 0px 0px 35px 0px;
  height: 298px;
  width: 330px;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    transition: transform .75s, visibility .75s ease-in;
  }

  &:hover img{
    transform: scale(1.15);
  }

  p{
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
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Popular