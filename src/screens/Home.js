import React, {useEffect} from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  Container, Row, Col, Form, InputGroup, Button, Alert,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import { loginProcess, authSelector } from '../slices/userSlice';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, hasErrors, auth } = useSelector(authSelector);

  useEffect(() => {
    console.log("auth: ", auth)
    if(auth) {
      history.push('/admin')
    }
  }, [auth]);

  return (
    <Container fluid className="d-flex flex-column" style={{ height: '100vh' }}>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log('values: ', values);

          const { email, password } = values;
          dispatch(loginProcess({ email, password })).then((result) => {
            console.log('result: ', result);
            if (result) {
              history.push('/admin');
            }
          });
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="d-flex flex-grow-1 justify-content-center flex-column">
            {!loading.loginProcess && hasErrors.loginProcess ? (
              <Form.Row className="d-flex my-4 mx-2 justify-content-center">
                <Alert variant="danger">
                  Hatalı E-Posta veya Şifre !
                </Alert>
              </Form.Row>
            ) : null}
            <Form.Row className="d-flex my-4 mx-2">
              <Form.Group as={Col} xs="12" controlId="email">
                <Form.Label>E-Posta</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="E-Posta"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email && !!touched.email}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} xs="12" controlId="password">
                <Form.Label>Şifre</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Şifre"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password && !!touched.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex my-4 mx-2 justify-content-center">
              <Button xs="3" type="submit" disabled={loading.loginProcess}>
                {loading.loginProcess ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
