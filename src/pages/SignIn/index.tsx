import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Container, Content, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'

const SignIn: React.FC = () => (
    <>
        <Container>
            <Content>
                <img src={logoImg} alt="Go Barber" />

                <form >
                    <h1>Log On</h1>
                    <Input name="Email" placeholder="Email" icon={FiMail} />
                    <Input name="Password" type="password" placeholder="Password" icon={FiLock} />
                    <Button >Log On</Button>
                    <a href="forgot">I forgot my password</a>
                </form>
                <a href="login">
                    <FiLogIn />
                    Create account
                </a>
            </Content>
            <Background />
        </Container>

    </>
)

export default SignIn
