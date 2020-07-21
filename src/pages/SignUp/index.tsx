import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

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

    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
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

        } catch (err) {
            const errors = getValidationErrors(err)
            formRef.current?.setErrors(errors)
        }
    }, [])

    return (
        <Container>
            <Background />
            <Content>
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
                <a href="login">
                    <FiArrowLeft />
                    Go back to Log On
                </a>
            </Content>
        </Container>

    )
}

export default SignUp
