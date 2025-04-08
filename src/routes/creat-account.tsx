import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components"
import { Error, Form, Input, Title, Wrapper } from "../components/auth-components";

const Logo = styled.img`
    
`;

export default function CreateAccount() {
    const navigate =  useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const submit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName:name
            });
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
            <Title>Create Account</Title>
            <Form onSubmit={submit}>
                <Input type="text" placeholder="name" onChange={onChange} name="name" value={name} required />
                <Input type="email" placeholder="email" onChange={onChange} name="email" value={email} required />
                <Input type="password" placeholder="password" onChange={onChange} name="password" value={password} required />
                <Input type="submit" value={isLoading ? "Loading.." : "생성"} />
            </Form>
            {error !=="" ? <Error>{error}</Error> : null}
        </Wrapper>
    )
}