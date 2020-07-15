import React from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'

import logoImg from '../../assets/logo.svg'

import { Container, Content, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'

interface PropsSubmit {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {

    function handleSubmit({ name, email, password }: PropsSubmit): void {
        console.log(name, email, password)
    }

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoImg} alt="Go Barber" />

                    <Form initialData={{ name: '' }} onSubmit={handleSubmit} >
                        <h1>Sign Up</h1>
                        <Input name="name" placeholder="Name" icon={FiUser} />
                        <Input name="email" placeholder="Email" icon={FiMail} />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon={FiLock} />
                        <Button type="submit" >Sign Up</Button>
                    </Form>
                    <a href="login">
                        <FiArrowLeft />
                    Go back to Log On
                    </a>
                </Content>
            </Container>

        </>
    )
}

export default SignUp
