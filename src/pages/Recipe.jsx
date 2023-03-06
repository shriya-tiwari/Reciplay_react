import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

function Recipe() {
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab]  = useState("instructions");
    let params = useParams();
    
    const fetchDetails = async() => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title}></img>
            </div>
            <Info>
                <Button 
                className={activeTab ==="instructions" ? "active" : ""}
                onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button
                className={activeTab === "ingredients" ? "active" : ""}
                onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>
                {activeTab ==="instructions" && (
                    <div>
                    <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
                    <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
                </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                    {details.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
                )}
                
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 100px;
    margin-bottom: 5rem;
    display: flex;

    img {
        width: 470px;
        height: 390px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
        width: 470px;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`
const Button = styled.button`
    width: 150px; 
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 1rem;
    font-weight: 600;
`
const Info = styled.div`
    margin-left: 100px;

    p {
        line-height: 25px;
        font-size: 19px;
        margin-top: 30px;
    }
    li {
        font-size: 19px;
        line-height: 25px;
    }
`

export default Recipe