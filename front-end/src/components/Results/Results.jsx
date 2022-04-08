import styled from '@emotion/styled';
import React from 'react';
import { useRecoilState } from 'recoil';
import { datasetState } from '../../atoms/datasetAtom';
import Cards from './Cards/Cards';

const Container = styled.div`
  margin-top: 8px;
`;

const UlStyled = styled.ul`
  list-style: none;
  display: grid;
  gap: 5px;

  margin: 0;
  padding: 0;
`;

const LiStyled = styled.li`
  place-self: center;
`;

function Results() {
  const [dataSet] = useRecoilState(datasetState);

  return (
    <Container>
      <UlStyled>
        {dataSet
          ? dataSet.map((data, index) => (
              <LiStyled key={index}>
                <Cards data={data} />
              </LiStyled>
            ))
          : 'No results'}
      </UlStyled>
    </Container>
  );
}

export default Results;
