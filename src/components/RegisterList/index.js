import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

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
export default ({ name }) => {
  const [clicked, setClick] = useState(false);
  return (
    <RegisterList className="m-2 d-flex">
      <div className="d-flex flex-column flex-grow-1" style={{ justifyContent: 'space-between' }}>
        <div style={{ }}>
          {name}
          <br />
          <br />
          Bağlantı Linki:
          <br />
          <span style={{ fontSize: '10px' }}>
            https://yoklama.com/register/123123
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            style={{ flex: 1 }}
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
