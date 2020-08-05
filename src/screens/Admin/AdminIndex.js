import React, { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';

import {
  Container, Row, Col, Button, Modal, Form, InputGroup, Spinner,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { FaPowerOff } from 'react-icons/fa';

import apiURL from '../../config';

import RegistrationList from '../../components/Registration/RegistrationList';
import Autocomplete from '../../components/Forms/Autocomplete';

import { addLecture } from '../../slices/lectureSlice';
import {
  registrationSelector,
  addRegistration,
  fetchRegistrations,
  closeAccessRegistration,
  downloadRegistrationList,
  deleteRegistration,
} from '../../slices/registrationSlice';
import { authSelector, logoutProcess } from '../../slices/userSlice';

const schema = yup.object({
  code: yup.string().required('Bu alan zorunludur'),
});

export default () => {
  const dispatch = useDispatch();

  const { auth } = useSelector(authSelector);
  const { loading, registrations } = useSelector(registrationSelector);

  useEffect(() => {
    if (auth) {
      dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
    }
  }, []);

  useEffect(() => {

  }, [registrations]);

  const [show, setShow] = useState(false);
  const [isNew, setNew] = useState(false);

  const handleClose = () => {
    if (auth) {
      dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="m-0" style={{ backgroundColor: '#b0bec5' }}>
      <Formik
        validationSchema={schema}
        onSubmit={(values, action) => {
          const {
            code, name, lectureId, startDate, endDate,
          } = values;

          if (isNew && name.length === 0) {
            action.setFieldError('name', 'HATA');
            return;
          }

          if (lectureId) {
            dispatch(addRegistration({
              startDate, endDate, lectureId, lecturerId: auth.user.id,
            })).then((registerResult) => {
              dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
              setShow(false);
              return registerResult;
            }).catch((registerError) => {
              console.log('registerError: ', registerError);
              return registerError;
            });
          } else {
            dispatch(addLecture({ name, code, lecturerId: auth.user.id })).then((lectureResult) => {
              dispatch(addRegistration({
                startDate, endDate, lectureId: lectureResult.id, lecturerId: auth.user.id,
              })).then((registerResult) => {
                dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
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
                  <Form.Group as={Col} xs="12" controlId="code">
                    <Form.Label>Ders Kodu</Form.Label>
                    <InputGroup>
                      <Autocomplete
                        lecturerId={auth ? auth.user.id : null}
                        text={values.code}
                        onTextChange={handleChange}
                        isInvalid={!!errors.code && !!touched.code}
                        isNew={isNew}
                        setNew={(value) => {
                          setNew(value);
                          if (!value) {
                            setFieldValue('name', '');
                            setFieldValue('lectureId', null);
                          }
                        }}
                        selectedLecture={values.lectureId || null}
                        onSelectLecture={(lecture) => {
                          if (lecture) {
                            setFieldValue('lectureId', lecture.id);
                            setFieldValue('code', lecture.code);
                          } else {
                            setFieldValue('lectureId', null);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  {isNew ? (
                    <Form.Group as={Col} xs="12" controlId="name">
                      <Form.Label>Ders Adı</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Ders Adı"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name && !!touched.name}
                          autoComplete="off"
                        />
                      </InputGroup>
                    </Form.Group>
                  ) : null}
                  <Form.Group as={Col} xs="12" controlId="startDate">
                    <Form.Label>Başlangıç Tarihi</Form.Label>
                    <InputGroup>
                      <DatePicker
                        locale="tr"
                        selected={values.startDate}
                        onChange={(date) => {
                          const nowDate = new Date();
                          let tempDate = date;
                          if (nowDate - tempDate > 0) tempDate = nowDate;

                          setFieldValue('startDate', tempDate);
                          if (values.endDate - tempDate < 0) {
                            setFieldValue('endDate', tempDate);
                          }
                        }}
                        showTimeSelect
                        dateFormat="Pp"
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                          },
                        }}
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
                          if (nowDate - tempDate > 0) tempDate = nowDate;

                          setFieldValue('endDate', tempDate);
                          if (values.startDate - tempDate > 0) {
                            setFieldValue('startDate', tempDate);
                          }
                        }}
                        showTimeSelect
                        dateFormat="Pp"
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                          },
                        }}
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
      <div className="d-flex flex-wrap justify-content-between m-2">
        <Button
          variant="dark"
          onClick={() => {
            dispatch(logoutProcess());
          }}
        >
          <FaPowerOff color="white" size="1em" />
        </Button>
        <Button variant="primary" onClick={handleShow}>
          Yoklama Listesi Oluştur
        </Button>
      </div>
      <div className={`d-flex flex-column ${loading.fetchRegistrations ? 'justify-content-center align-items-center' : ''}`}>
        {loading.fetchRegistrations ? (
          <Spinner animation="border" variant="primary" />
        ) : null}
        {/* {registrations.map((registration) => (
          <RegistrationBox
            registration={registration}
            onCloseAccess={(registrationId) => {
              dispatch(closeAccessRegistration({ registrationId })).then(result => {
                console.log("result: ", result)
                dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
              });
            }}
            onDownload={(registrationId) => {
              dispatch(downloadRegistrationList({ registrationId }));
            }}
          />
        ))} */}
        {registrations.map((registration) => (
          <RegistrationList
            registration={registration}
            onCloseAccess={(registrationId) => {
              dispatch(closeAccessRegistration({ registrationId })).then((result) => {
                dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
              });
            }}
            onDownload={(registrationId) => {
              dispatch(downloadRegistrationList({ registrationId })).then((result) => {
                axios({
                  url: `${apiURL}/downloads/Yoklama.xlsx`,
                  method: 'GET',
                  responseType: 'blob', // important
                }).then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', result);
                  document.body.appendChild(link);
                  link.click();
                });
              });
            }}
            onDelete={(registrationId) => {
              dispatch(deleteRegistration({ registrationId })).then((result) => {
                dispatch(fetchRegistrations({ lecturerId: auth.user.id }));
              });
            }}
          />
        ))}
      </div>
    </Container>
  );
};
