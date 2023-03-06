import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input} 
        />
      </div>
      <FaSearch></FaSearch>
    </FormStyle>
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
      padding: 10px 50px;
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

export default Search