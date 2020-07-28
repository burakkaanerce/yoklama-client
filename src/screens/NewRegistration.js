import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  Container, Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  stuName: yup.string().required(),
  stuLastname: yup.string().required(),
  stuNo: yup.number().required(),
});

export default () => {
  const { id } = useParams();
  console.log('id: ', id);

  if (id !== '123') {
    return (
      <div>
        ERİŞİME KISITLI LİNK
      </div>
    );
  }

  return (
    <Container fluid className="d-flex flex-column" style={{ height: '100vh' }}>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log('values: ', values);
        }}
        initialValues={{
          stuName: '',
          stuLastname: '',
          stuNo: '',
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
              <Form.Group as={Col} xs="12" md="4" controlId="stuName">
                <Form.Label>Adı</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Adı"
                    name="stuName"
                    value={values.stuName}
                    onChange={handleChange}
                    isInvalid={!!errors.stuName && !!touched.stuName}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.stuName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} xs="12" md="4" controlId="stuLastname">
                <Form.Label>Soyadı</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Soyadı"
                    name="stuLastname"
                    value={values.stuLastname}
                    onChange={handleChange}
                    isInvalid={!!errors.stuLastname && !!touched.stuLastname}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.stuLastname}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} xs="12" md="4" controlId="stuNo">
                <Form.Label>Öğrenci NO</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Öğrenci NO"
                    name="stuNo"
                    value={values.stuNo}
                    onChange={handleChange}
                    isInvalid={!!errors.stuNo && !!touched.stuNo}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.stuNo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row className="d-flex my-4 mx-2 justify-content-center">
              <Button xs="3" type="submit">Yoklamayı Kaydet</Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
