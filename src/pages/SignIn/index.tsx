import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import { Container, AnimationContainer, Content, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useAuth from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { signIn, signOut } = useAuth()
    const { addToast, removeToast } = useToast()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string().required('Email is required').email('Email not valid'),
                password: Yup.string().required('Password is required')

            })

            await schema.validate(data, {
                abortEarly: false
            })

            const { email, password } = data

            await signIn({
                email,
                password
            })

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Authentication error',
                description: 'Please, try again!'
            })
        }
    }, [ signIn, addToast ])

    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer >
                        <img src={logoImg} alt="Go Barber" />

                        <Form ref={formRef} onSubmit={handleSubmit} >
                            <h1>Log On</h1>
                            <Input name="email" placeholder="Email" icon={FiMail} />
                            <Input name="password" type="password" placeholder="Password" icon={FiLock} />
                            <Button type="submit" >Log On</Button>
                            <a href="forgot">I forgot my password</a>
                        </Form>

                        <Link to="/signup" >
                            <FiLogIn />
                            Create account
                        </Link>
                    </AnimationContainer>
                </Content>
                <Background />
            </Container>

        </>
    )
}

export default SignIn
