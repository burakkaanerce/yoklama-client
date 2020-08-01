import React, { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';

import {
  Container, Row, Col, Button, Modal, Form, InputGroup, Alert,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import RegisterList from '../../components/RegisterList';
import Autocomplete from '../../components/Forms/Autocomplete';

import { addLecture } from '../../slices/lectureSlice';
import { registrationSelector, addRegistration, fetchRegistration } from '../../slices/registrationSlice';
import { authSelector } from '../../slices/userSlice';

const schema = yup.object({
  code: yup.string().required(),
});

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { auth } = useSelector(authSelector);
  const { registrations } = useSelector(registrationSelector);

  useEffect(() => {
    if (auth) {
      dispatch(fetchRegistration({ lecturerId: auth.user.id }));
    } else {
      history.push('/');
    }
  }, []);

  const [show, setShow] = useState(false);
  const [isNew, setNew] = useState(false);

  const handleClose = () => {
    if (auth) {
      dispatch(fetchRegistration({ lecturerId: auth.user.id }));
    } else {
      history.push('/');
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Formik
        validationSchema={schema}
        onSubmit={(values, action) => {
          console.log('values: ', values);
          console.log('action: ', action);
          console.log('auth: ', auth);

          const {
            code, name, lectureId, startDate, endDate,
          } = values;

          if (isNew && name.length === 0) {
            console.log('isNew and name length is zero so it is not valid');
            action.setFieldError('name', 'HATA');
            return;
          }

          if (lectureId) {
            dispatch(addRegistration({
              startDate, endDate, lectureId, lecturerId: auth.user.id,
            })).then((registerResult) => {
              console.log('registerResult: ', registerResult);
              dispatch(fetchRegistration({ lecturerId: auth.user.id }));
              setShow(false);
              return registerResult;
            }).catch((registerError) => {
              console.log('registerError: ', registerError);
              return registerError;
            });
          } else {
            dispatch(addLecture({ name, code, lecturerId: auth.user.id })).then((lectureResult) => {
              console.log('lectureResult: ', lectureResult);

              dispatch(addRegistration({
                startDate, endDate, lectureId: lectureResult.id, lecturerId: auth.user.id,
              })).then((registerResult) => {
                console.log('registerResult: ', registerResult);
                dispatch(fetchRegistration({ lecturerId: auth.user.id }));
                setShow(false);
                return registerResult;
              }).catch((registerError) => {
                console.log('registerError: ', registerError);
                return registerError;
              });
              return lectureResult;
            }).catch((error) => {
              console.log('1 error: ', error);
              return error;
            });
          }
        }}
        initialValues={{
          name: '',
          code: '',
          lectureId: null,
          startDate: new Date(),
          endDate: new Date(),
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Modal show={show} onHide={handleClose}>
            <Form noValidate onSubmit={handleSubmit} className="d-flex flex-grow-1 justify-content-center flex-column">
              <Modal.Header closeButton>
                <Modal.Title>Yeni Yoklama Listesi Oluştur</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* {!loading.loginProcess && hasErrors.loginProcess ? (
              <Form.Row className="d-flex my-4 mx-2 justify-content-center">
                <Alert variant="danger">
                  Hatalı E-Posta veya Şifre !
                </Alert>
              </Form.Row>
            ) : null} */}
                <Form.Row className="d-flex my-4 mx-2">
                  <Form.Group as={Col} xs="12" controlId="email">
                    <Form.Label>Ders Kodu</Form.Label>
                    <InputGroup>
                      <Autocomplete
                        text={values.code}
                        onTextChange={handleChange}
                        isInvalid={!!errors.code && !!touched.code}
                        isNew={isNew}
                        setNew={(value) => {
                          setNew(value);
                          if (!value) setFieldValue('name', '');
                        }}
                        selectedLecture={values.lectureId || null}
                        onSelectLecture={(lecture) => {
                          setFieldValue('lectureId', lecture.id);
                          setFieldValue('code', lecture.code);
                        }}
                      />
                      {isNew ? (
                        <Form.Control
                          type="text"
                          placeholder="Ders Adı"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name && !!touched.name}
                          autoComplete="off"
                        />
                      ) : null}
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs="12" controlId="startDate">
                    <Form.Label>Başlangıç Tarihi</Form.Label>
                    <InputGroup>
                      <DatePicker
                        locale="tr"
                        selected={values.startDate}
                        onChange={(date) => {
                          const nowDate = new Date();
                          let tempDate = date;
                          console.log('1 date: ', tempDate, values.endDate - tempDate < 0, nowDate - tempDate > 0);
                          if (nowDate - tempDate > 0) tempDate = nowDate;

                          console.log('2 date: ', tempDate, values.endDate - tempDate < 0, nowDate - tempDate > 0);

                          setFieldValue('startDate', tempDate);
                          if (values.endDate - tempDate < 0) {
                            setFieldValue('endDate', tempDate);
                          }
                        }}
                        showTimeSelect
                        dateFormat="Pp"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.startDate}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs="12" controlId="endDate">
                    <Form.Label>Bitiş Tarihi</Form.Label>
                    <InputGroup>
                      <DatePicker
                        locale="tr"
                        selected={values.endDate}
                        onChange={(date) => {
                          const nowDate = new Date();
                          let tempDate = date;
                          console.log('1 date: ', tempDate, values.startDate - tempDate < 0, nowDate - tempDate > 0);
                          if (nowDate - tempDate > 0) tempDate = nowDate;

                          console.log('2 date: ', tempDate, values.startDate - tempDate < 0, nowDate - tempDate > 0);

                          setFieldValue('endDate', tempDate);
                          if (values.startDate - tempDate > 0) {
                            setFieldValue('startDate', tempDate);
                          }
                        }}
                        showTimeSelect
                        dateFormat="Pp"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>
                {/* <Form.Row className="d-flex my-4 mx-2 justify-content-center">
              <Button xs="3" type="submit" disabled={loading.loginProcess}>
                {loading.loginProcess ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </Form.Row> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  İptal
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Onayla
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )}
      </Formik>
      <div className="d-flex flex-wrap justify-content-end m-2">
        <Button variant="primary" onClick={handleShow}>
          Yoklama Listesi Oluştur
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {registrations.map((registration) => (
          <RegisterList registration={registration} />
        ))}
      </div>
    </Container>
  );
};