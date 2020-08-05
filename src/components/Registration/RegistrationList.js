import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import useDeviceDetect from "../../config/useDeviceDetect";

const RegisterList = styled.div`
-webkit-box-shadow: 0px 2px 4px 2px #cfd8dc; 
box-shadow: 0px 2px 4px 2px #cfd8dc;

transition: all 300ms;

&:hover {
  -webkit-box-shadow: 0px 2px 4px 2px #78909c; 
box-shadow: 0px 2px 4px 2px #78909c;
}
`;
export default ({ registration, onCloseAccess, onDownload, onDelete }) => {
  const { isMobile } = useDeviceDetect();
  
  const {
    Lecture, Lecturer, start_date: startDate, end_date: endDate, id, status,
  } = registration;
  const { name, code } = Lecture;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <RegisterList className="m-2 p-2 border rounded-2 border-dark d-flex flex-grow-1 bg-light">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bağlantı Kopyalandı !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ fontSize: '12px' }}>
          https://yoklama-listesi.herokuapp.com/register/{id}
          </span>
        </Modal.Body>
      </Modal>
      <div className={`d-flex ${isMobile ? 'flex-column' : 'flex-row' } flex-grow-1`}>
        <div className="d-flex flex-row flex-1" style={{ flex: 1 }}>
          <Button
            className="flex-grow-1 bg-danger"
            onClick={() => {
              onDelete(id)
            }}
          >
            <MdDelete color="white" size="2.5em" />
          </Button>
        </div>
        <div className="d-flex flex-column p-2" style={{ flex: 8 }}>
          <span className="font-weight-bold">
            Ders Kodu / Adı:
          </span>
          {`  ${code} - ${name}`}
          <br />
          <span className="font-weight-bold">
            Başlangıç Tarihi:
          </span>
          {'  '}{moment(startDate, moment.DATETIME_LOCAL_MS).format('DD.MM.YYYY HH:mm')}
          <br />
          <span className="font-weight-bold">
            Bitiş Tarihi:
          </span>
          {'  '}{moment(endDate, moment.DATETIME_LOCAL_MS).format('DD.MM.YYYY HH:mm')}
        </div>
        <div className="d-flex flex-row flex-1" style={{ flex: 4 }}>
          <Button
            className="flex-grow-1 bg-info"
            onClick={() => {
              handleShow();
              navigator.clipboard.writeText(`https://yoklama-listesi.herokuapp.com/register/${id}`).then(() => {
                console.log(`https://yoklama-listesi.herokuapp.com/register/${id}`)
              }, () => {
                console.log(`https://yoklama-listesi.herokuapp.com/register/${id}`)
              });
            }}
          >
            Bağlantı Linkini Kopyala
          </Button>
          {status ? (
            <Button
              className="flex-grow-1 bg-success"
              onClick={() => {
                onDownload(id);
              }}
            >
              Listeyi İndir
            </Button>
          ) : (
            <Button
              className="flex-grow-1 bg-warning"
              onClick={() => {
                onCloseAccess(id);
              }}
            >
              Erişime Kapat
            </Button>
          )}
        </div>
      </div>
    </RegisterList>
  );
};
