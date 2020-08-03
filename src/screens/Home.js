import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  Container, Row, Col, Form, InputGroup, Button, Alert,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import styled from 'styled-components';

import { loginProcess, authSelector } from '../slices/userSlice';

const StyledFormLabel = styled(Form.Label)`
color: #455a64;
font-weight: bold;
font-size: calc(8px + 0.5vw + 0.5vh);
line-height: calc((8px + 0.5vw + 0.5vh) * 1.618);
letter-spacing: calc((8px + 0.5vw + 0.5vh) / (1.618 * 20));
`;

const schema = yup.object({
  email: yup.string().email().required('Bu alan zorunludur'),
  password: yup.string().required('Bu alan zorunludur'),
});

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, hasErrors, auth } = useSelector(authSelector);

  useEffect(() => {
    if (auth) {
      history.push('/admin');
    }
  }, [auth]);

  return (
    <Container fluid className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#b0bec5' }}>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          const { email, password } = values;
          dispatch(loginProcess({ email, password })).then((result) => {
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
            <Row className="d-flex my-4 mx-2 justify-content-center">
              <Col xs="12" md="4">
                {!loading.loginProcess && hasErrors.loginProcess ? (
                  <Form.Row className="d-flex my-4 mx-2 justify-content-center">
                    <Alert variant="danger">
                      Hatalı E-Posta veya Şifre !
                    </Alert>
                  </Form.Row>
                ) : null}
                <Form.Row className="d-flex my-4 mx-2">
                  <Form.Group as={Col} xs="12" controlId="email">
                    <StyledFormLabel>E-Posta</StyledFormLabel>
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
                    <StyledFormLabel>Şifre</StyledFormLabel>
                    <InputGroup>
                      <Form.Control
                        type="password"
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
                  <Button xs="12" type="submit" disabled={loading.loginProcess}>
                    {loading.loginProcess ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </Button>
                </Form.Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
