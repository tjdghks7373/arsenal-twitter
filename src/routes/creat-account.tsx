import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components"
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GitButton from "../components/git-btn";

const Logo = styled.img`
    
`;

const getErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "이미 사용 중인 이메일입니다.";
        case "auth/invalid-email":
            return "이메일 주소를 입력해주세요.";
        case "auth/user-not-found":
            return "해당 사용자를 찾을 수 없습니다.";
        case "auth/wrong-password":
            return "비밀번호가 올바르지 않습니다.";
        case "auth/weak-password":
            return "비밀번호는 최소 6자리 이상이어야 합니다.";
        case "auth/missing-password":
            return "비밀번호를 입력해주세요.";
        case "auth/account-exists-with-different-credential":
            return "이미 다른 방식으로 가입된 계정입니다. 기존 로그인 방법을 사용해주세요.";
        case "auth/popup-closed-by-user":
            return "로그인 창이 닫혔습니다. 다시 시도해주세요.";
        case "auth/invalid-credential":
            return "로그인 정보가 유효하지 않아요. 다시 시도해 주세요.";
        default:
        return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
};

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
                const friendlyMsg = getErrorMessage(e);
                setError(friendlyMsg);
                console.log(e.message)
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
            <GitButton />
            <Switcher>
                계정이 있으신가요? <Link to="/login">로그인 하기</Link>
            </Switcher>
        </Wrapper>
    )
}