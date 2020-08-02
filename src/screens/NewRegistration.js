import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import {
  Container, Row, Col, Form, InputGroup, Button, Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import { registrationSelector, fetchRegistration, register } from '../slices/registrationSlice';

const StyledFormLabel = styled(Form.Label)`
color: #455a64;
font-weight: bold;
font-size: calc(8px + 0.5vw + 0.5vh);
line-height: calc((8px + 0.5vw + 0.5vh) * 1.618);
letter-spacing: calc((8px + 0.5vw + 0.5vh) / (1.618 * 20));
`;

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  stuNo: yup.number().required(),
});

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const { loading, registration, registered } = useSelector(registrationSelector);

  const [isValid, setIsValid] = useState(true);

  console.log('id: ', id);

  if (!id) {
    history.push('/');
  }

  useEffect(() => {
    console.log('id: ', id);
    if (id) {
      dispatch(fetchRegistration({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (registration) {
      const { status, start_date: startDate, end_date: endDate } = registration;
      const tempDate = new Date();
      const dateStart = new Date(startDate);
      const dateEnd = new Date(endDate);
      console.log(registration.status, tempDate, dateStart, dateEnd, tempDate - dateStart, dateEnd - tempDate);
      if (registration.status || !(tempDate - dateStart > 0 && dateEnd - tempDate > 0)) {
        setIsValid(false);
      }
    }
  }, [registration]);

  return (
    <Container fluid className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#b0bec5' }}>
      {!isValid ? (
        <div style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        >
          <div className="bg-danger p-5 text-light font-weight-bold">
            ERİŞİME KISITLI ADRES
          </div>
        </div>
      ) : (
        <>
          {loading.register ? (
            <Spinner animation="border" variant="primary" />
          )
            : registered ? (
              <div>
                Kayıt Başarılı !
              </div>
            ) : (
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  console.log('values: ', values);

                  const { firstname, lastname, stuNo } = values;
                  dispatch(register({
                    firstname, lastname, stuNo, registrationId: id,
                  }));
                }}
                initialValues={{
                  firstname: '',
                  lastname: '',
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
                      <Form.Group as={Col} xs="12" md="4" controlId="firstname">
                        <StyledFormLabel>Adı</StyledFormLabel>
                        <InputGroup>
                  <Form.Control
                          type="text"
                          placeholder="Adı"
                          name="firstname"
                          value={values.firstname}
                          onChange={handleChange}
                          isInvalid={!!errors.firstname && !!touched.firstname}
                        />
                  <Form.Control.Feedback type="invalid" tooltip>
                          {errors.firstname}
                        </Form.Control.Feedback>
                </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} xs="12" md="4" controlId="lastname">
                        <StyledFormLabel>Soyadı</StyledFormLabel>
                        <InputGroup>
                  <Form.Control
                          type="text"
                          placeholder="Soyadı"
                          name="lastname"
                          value={values.lastname}
                          onChange={handleChange}
                          isInvalid={!!errors.lastname && !!touched.lastname}
                        />
                  <Form.Control.Feedback type="invalid" tooltip>
                          {errors.lastname}
                        </Form.Control.Feedback>
                </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} xs="12" md="4" controlId="stuNo">
                        <StyledFormLabel>Öğrenci NO</StyledFormLabel>
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
            )}
        </>
      )}
    </Container>
  );
};
