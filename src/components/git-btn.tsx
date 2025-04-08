import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
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
    margin-top:20px;
    margin-bottom:20px;
    cursor:pointer;
`;

const Logo = styled.img`
    height:25px;
`;

export default function GitButton() {
    const navigate =  useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch(error) {
            console.error(error)
        }
    }
    return(
        <>
            <Button onClick={onClick}>
                <Logo src="/public/github-log.svg" />
                Continue With Github
            </Button>
        </>
    )
}