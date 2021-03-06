import React, { useRef, useCallback } from 'react';
import LogoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import geValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();



    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
                password: Yup.string().required('Senha obrigatoria'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password
            });

        } catch (err) {

            const errors = geValidationErrors(err);

            formRef.current?.setErrors(errors);
        }

    }, [signIn]);

    return (
        <Container>
            <Content>
                <img src={LogoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form >
                <a href="ok">
                    <FiLogIn />
                    Criar conta</a>

            </Content>
            <Background />

        </Container>
    );
}

export default SignIn;