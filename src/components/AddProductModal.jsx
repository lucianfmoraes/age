import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Dropdown } from 'bootstrap';
import { Dropdown } from 'react-bootstrap';



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


// CREATE TABLE produtos (
//         ID SERIAL PRIMARY KEY,
//         NAME TEXT NOT NULL,
//         PRICE REAL NOT NULL,
//         QUANTITY INT NOT NULL

const AddProductModal = () => {
    const [data, setData] = useState({nome: '', preço: '', quantidade: ''})
    return (
        <div>
        <Formik
            initialValues={{ data }}
            validate={values => {
                return values
                //return handleValidation(values);
            }}
            onSubmit={  (values, { setSubmitting }) => {
                console.log('clicou')
                setSubmitting(false);
            }}
            
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={'form-group'}>
                        <label htmlFor='nome'>Nome:</label>
                        <Field className={'form-control'} type="text" name="nome" />
                        <ErrorMessage name="nome" component="div" style={{color:'red'}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='preço'>preço:</label>
                        <Field className={'form-control'} name="preço" type="text" />
                        <ErrorMessage name="preco" component="div" style={{color:'red'}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='quantidade'>Quantidade</label>
                        <Field className={'form-control'} type="textarea" name="quantidade" />
                        <ErrorMessage name="quantidade" component="div"style={{color:'red'}} />
                    </div>
                    <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                        Enviar

                    </button>
                </Form>
            )}
        </Formik>
    </div>
    )


}


const handleClick = async (body) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

}
const handleValidation = (values) => {
    let errors = {nome:'', preço:'', quantidade:''};
    if (!values.nome) { errors.nome += 'Required'; }
    if (!values.preço) { errors.preço += 'Required'; }
    if (typeof(values.preço) !== 'number') { errors.preço += ' | Needs to be a number'}
    if (!values.quantidade) { errors.quantidade += 'Required'; }
    console.log(typeof(values.preço))
    return errors
}

export default AddProductModal;