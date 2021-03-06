import React, { useCallback, useRef } from 'react';
import LogoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import geValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';


const SignUp: React.FC = () => {
const formRef = useRef<FormHandles>(null);

console.log(formRef);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            });

            await schema.validate(data,{
                abortEarly: false,
            });

        } catch (err) {

            const errors = geValidationErrors(err);
            
           formRef.current?.setErrors(errors);
        }

    }, []);

    return (
        <Container>

            <Background />
            <Content>
                <img src={LogoImg} alt="GoBarber" />
                <Form ref={formRef}  onSubmit={handleSubmit}>
                    <h1>Faca seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Cadastrar</Button>

                </Form>
                <a href="login">
                    <FiArrowLeft />
                    Voltar para login</a>

            </Content>
        </Container>

    )
};

export default SignUp;