import styled from "styled-components";

export const Wrapper = styled.div`
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 20px;
    background-color:#c84731;
    margin-top:80px;
    border-radius:20px;
`;

export const Title = styled.h1`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    font-size:21px;
    text-align:center;
    font-weight:bold;
`;

export const Form = styled.form`
    font-size: 42px;
    margin-bottom:15px;
`;

export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
    cursor: pointer;
    &:hover {
    opacity: 0.8;
`;

export const Error = styled.div`
    font-weight: 600;
    color: #fff;
    font-size:14px;
`;

export const GitButton = styled.button`
    width:100%;
    background-color:#fff;
    font-weight:500;
    padding:10px 20px;
    border-radius:50px;
    border:0;
    display:flex;
    gap:5px;
    align-items:center;
    justify-content:center;
    margin-top:50px;
    cursor:pointer;
`;

export const Switcher = styled.p`
    font-weight: 600;
    color: #fff;
    font-size:14px;
`;