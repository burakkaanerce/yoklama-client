import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

import {
  Spinner, Form, Alert,
} from 'react-bootstrap';

import { findLectureFunc } from '../../api/lecture';

const AutoContainer = styled.div`
position: absolute;
border-width: 1px;
border-style: solid;
border-color: #78909c;
width: 100%;
max-height: 100px;
overflow: auto;
background-color: white;
z-index: 100;
`;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: auto;
`;

const OptionDiv = styled.div`
background-color: white;
transition: 300ms all;
padding: 8px;
cursor: pointer;

&:hover {
  background-color: #b0bec5;
}
`;

export default ({
  text, onTextChange, isInvalid, isNew, setNew, selectedLecture, onSelectLecture,
}) => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  const selectLecture = (lectureId) => {
    onSelectLecture(lectureId);
    setDisplay(false);
  };

  useEffect(() => {
    /* const pokemon = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then((pokemonArr) => pokemonArr.map((value) => value
      .json()
      .then(({ name, sprites: { front_default: sprite } }) => pokemon.push({ name, sprite }))));
    setOptions(pokemon); */
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);
      setDisplay(true);
      const callLecture = async () => {
        try {
          const returnResponse = await findLectureFunc({ code: search })
            .then((result) => {
              console.log('result: ', result);
              const { data } = result;
              console.log('data: ', data);
              if (data) {
                const { success, lecture } = data;

                if (success && lecture) {
                  return lecture;
                }
                throw Error('FIND_LECTURE_FAILED');
              } else {
                throw Error('REQUEST_FAILED');
              }
            })
            .catch((error) => {
              console.log('error: ', error);
              throw error || Error('REQUEST_FAILED');
            });
          console.log('returnResponse: ', returnResponse);
          return returnResponse;
        } catch (error) {
          console.log('failed: ', error);
          return error;
        }
      };

      callLecture().then((result) => {
        setLoading(false);
        setOptions(result);
        console.log('result: ', result);
      }).catch((error) => {
        setLoading(false);
        console.log('error: ', error);
      });
    }
  }, [search]);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
      console.log({ options, search, isNew });
      if (options.length === 0 && search.length > 0 && !isNew) {
        setNew(!isNew);
        selectLecture(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Container>
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <Form.Control
          type="text"
          placeholder="Ders Kodu"
          name="code"
          value={text}
          onChange={(v) => {
            setNew(false);
            setSearch(v.nativeEvent.target.value);
            onTextChange(v);
          }}
          isInvalid={isInvalid}
          autoComplete="off"
        />
        {display && (
        <AutoContainer>
          {loading
            ? (
              <Spinner animation="border" variant="primary" />
            )
            : options.length > 0 ? options
              .filter((value) => value.code.toLowerCase().includes(search.toLowerCase()))
              .map((value, i) => (
                <OptionDiv
                  onClick={() => selectLecture(value)}
                  className="option"
                  key={value.id}
                  tabIndex="0"
                >
                  <span>{value.code}</span>
                </OptionDiv>
              )) : (
                <OptionDiv
                  onClick={() => {
                    setDisplay(false);
                    setNew(!isNew);
                    selectLecture(null);
                  }}
                >
                  Herhangi bir ders bulunamadı, bu ders kodunu kullanarak yeni bir ders oluşturmak için tıklayınız.
                </OptionDiv>
            )}
        </AutoContainer>
        )}
      </div>
    </Container>
  );
};
