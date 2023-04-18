import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Dropdown } from 'bootstrap';
import { Dropdown } from 'react-bootstrap';



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


// CREATE TABLE produtos (
//         ID SERIAL PRIMARY KEY,
//         NAME TEXT NOT NULL,
//         PRICE REAL NOT NULL,
//         QUANTITY INT NOT NULL

const EditProductModal = ({nomeInitial, preçoInitial, quantidadeInitial}) => (
    <div>
        <Formik
            initialValues={{ nome: nomeInitial, preço: preçoInitial, quantidade: quantidadeInitial }}
            validate={values => {
                const errors = {};
                if (!values.nome) { errors.nome = 'Required'; }
                if (!values.preço) { errors.preço = 'Required'; }
                if (!values.quantidade) { errors.quantidade = 'Required'; }
                console.log(values)
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setTimeout(() => {

                    //utilizar async ??
                    fetch('/produto');

                    setSubmitting(false);
                }, 2000);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={'form-group'}>
                        <label htmlFor='nome'>Nome:</label>
                        <Field className={'form-control'} type="text" name="nome" />
                        <ErrorMessage name="nome" component="div" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='preço'>preço:</label>
                        <Field className={'form-control'} name="preço" component="select">
                            <option value="1">stun</option>
                            <option value="2">spark</option>
                            <option value="3">loki</option>
                        </Field>

                    </div>
                    <div className='form-group'>
                        <label htmlFor='quantidade'>Quantidade</label>
                        <Field className={'form-control'} type="textarea" name="quantidade" />
                        <ErrorMessage name="quantidade" component="div" />
                    </div>
                    <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                        Enviar

                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default EditProductModal;