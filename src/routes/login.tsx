import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Error, Input, Title, Wrapper } from "../components/auth-components";
import styled from "styled-components";

const Logo = styled.img`
    
`;

export default function CreateAccount() {
    const navigate =  useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const submit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
        } catch(e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <Wrapper>
            <Logo src="/public/logo.svg" />
            <Title>Login</Title>
            <Form onSubmit={submit}>
                <Input type="email" placeholder="email" onChange={onChange} name="email" value={email} required />
                <Input type="password" placeholder="password" onChange={onChange} name="password" value={password} required />
                <Input type="submit" value={isLoading ? "Loading.." : "로그인"} />
            </Form>
            {error !=="" ? <Error>{error}</Error> : null}
        </Wrapper>
    )
}