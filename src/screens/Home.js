import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  Container, Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { loginProcess } from '../api/lecturer';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default () => (
  <Container fluid className="d-flex flex-column" style={{ height: '100vh' }}>
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log('values: ', values);

        const { username, password } = values;
        loginProcess({ username, password });
      }}
      initialValues={{
        username: '',
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
          <Form.Row className="d-flex my-4 mx-2">
            <Form.Group as={Col} xs="12" controlId="username">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Kullanıcı Adı"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username && !!touched.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
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
            <Button xs="3" type="submit">Giriş Yap</Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  </Container>
);
