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
export default ({registration}) => {
  const [clicked, setClick] = useState(false);
  const { Lecture, Lecturer, start_date: startDate, end_date: endDate, id } = registration;
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
            https://yoklama.com/register/{id}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            style={{ flex: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
            onClick={() => {
              setClick(true);
            }}
          >Erişime Kapat
          </Button>
          {clicked ? (<Button style={{ flex: 1 }}>Listeyi İndir</Button>) : null}
        </div>
      </div>
    </RegisterList>
  );
};
