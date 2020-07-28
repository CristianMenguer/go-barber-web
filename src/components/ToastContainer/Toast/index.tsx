import React, { useCallback, useEffect } from 'react'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { ToastMessage, useToast } from '../../../hooks/toast'
import { Container } from './styles'

interface ToastProps {
    message: ToastMessage
}

const Toast: React.FC<ToastProps> = ({ message }) => {

    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
            console.log('excluir')
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [removeToast, message.id])

    const handleRemoveToast = useCallback((id: string) => {
        removeToast(id)
    }, [])

    return (
        <>
            <Container
                hasDescription={!!message.description}
                type={message.type}
            >
                <FiAlertCircle size={20} />
                <div>
                    <strong>{message.title}</strong>
                    {message.description && <p>{message.description}</p> }
                </div>
                <button type="button" onClick={() => handleRemoveToast(message.id)} >
                    <FiXCircle size={18} />
                </button>
            </Container>
        </>
    )
}
export default Toast
