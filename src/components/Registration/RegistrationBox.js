import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';

const RegisterList = styled.div`
width: 200px;
height: 200px;
-webkit-box-shadow: 0px 2px 4px 2px #cfd8dc; 
box-shadow: 0px 2px 4px 2px #cfd8dc;

transition: all 300ms;

&:hover {
  -webkit-box-shadow: 0px 2px 4px 2px #78909c; 
box-shadow: 0px 2px 4px 2px #78909c;
}
`;
export default ({registration, onCloseAccess, onDownload}) => {
  const { Lecture, Lecturer, start_date: startDate, end_date: endDate, id, status } = registration;
  const { name, code } = Lecture;
  return (
    <RegisterList className="m-2 d-flex">
      <div className="d-flex flex-column flex-grow-1" style={{ justifyContent: 'space-between' }}>
        <div style={{ }}>
          {`${code} - ${name}`}
          <br />
          {moment(startDate, moment.DATETIME_LOCAL_MS).format('DD.MM.YYYY HH:mm')}
          <br />
          {moment(endDate, moment.DATETIME_LOCAL_MS).format('DD.MM.YYYY HH:mm')}
          <br />
          <br />
          Bağlantı Linki:
          <br />
          <span style={{ fontSize: '10px' }}>
            http://localhost:3000/register/{id}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {status ? (
          <Button
          style={{ flex: 1 }}
          onClick={() => {
            onDownload(id)
          }}
          >Listeyi İndir</Button>
          ) : (
          <Button
            style={{ flex: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
            onClick={() => {
              onCloseAccess(id)
            }}
          >Erişime Kapat
          </Button>
          )}
        </div>
      </div>
    </RegisterList>
  );
};
