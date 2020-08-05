import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import { Container, AnimationContainer, Content, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { useToast } from '../../hooks/toast'

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {

            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().required('Email is required').email('Email not valid'),
                password: Yup.string().min(6, 'At least six characters')

            })

            await schema.validate(data, {
                abortEarly: false
            })

            await api.post('/user', data)

            addToast({
                type: 'success',
                title: 'User created!',
                description: 'Please, logon to continue!'
            })

            history.push('/')

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'error',
                title: 'Sign up error',
                description: 'Please, try again!'
            })
        }
    }, [ addToast, history])

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer >
                    <img src={logoImg} alt="Go Barber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
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
                    <Link to="/" >
                        <FiArrowLeft />
                    Go back to Log On
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>

    )
}

export default SignUp
