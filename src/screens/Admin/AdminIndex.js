import React from 'react';

import styled from 'styled-components';

import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

import RegisterList from '../../components/RegisterList';

export default () => (
  <Container fluid>
    <div className="d-flex flex-wrap justify-content-center">
      <RegisterList name="Yoklama Listesi #1" />
      <RegisterList name="Yoklama Listesi #2" />
      <RegisterList name="Yoklama Listesi #3" />
      <RegisterList name="Yoklama Listesi #4" />
      <RegisterList name="Yoklama Listesi #5" />
      <RegisterList name="Yoklama Listesi #6" />
    </div>
  </Container>
);
