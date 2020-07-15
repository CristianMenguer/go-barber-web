import React from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Container, Content, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'

const SignUp: React.FC = () => (
    <>
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="Go Barber" />

                <form >
                    <h1>Sign Up</h1>
                    <Input name="Name" placeholder="Name" icon={FiUser} />
                    <Input name="Email" placeholder="Email" icon={FiMail} />
                    <Input
                        name="Password"
                        type="password"
                        placeholder="Password"
                        icon={FiLock} />
                    <Button >Sign Up</Button>
                </form>
                <a href="login">
                    <FiArrowLeft />
                    Go back to Log On
                </a>
            </Content>
        </Container>

    </>
)

export default SignUp
