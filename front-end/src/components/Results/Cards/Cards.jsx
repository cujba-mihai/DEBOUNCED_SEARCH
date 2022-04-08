/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef } from 'react';
import { ReactComponent as UserLogo } from '../../../assets/icons/man-user-svgrepo-com.svg';
import stringToColor from '../../../utils/stringToColor';

const Container = styled.div`
  display: flex;

  width: clamp(300px, 50vw, 80vw);
  min-height: 2rem;
  padding: 10px 5px;

  background-color: #dfdfdf;
  border-radius: 5px;
`;

const Span = styled.span`
  font-size: 1.1rem;
  align-self: center;
  margin-left: 8px;
`;

function Cards({ data }) {
  const circle = useRef();
  const setLogoBg = useCallback(() => {
    const [getCircle] = circle.current.getElementsByClassName('bg-circle');
    return (getCircle.style.fill = stringToColor(data));
  }, []);

  useEffect(() => {
    setLogoBg();
  }, []);

  return (
    <Container>
      <UserLogo
        ref={circle}
        style={{
          width: '30px',
          height: '30px',
        }}
      />
      <Span>{data}</Span>
    </Container>
  );
}

export default Cards;
