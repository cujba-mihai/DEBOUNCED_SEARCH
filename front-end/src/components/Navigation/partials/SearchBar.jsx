import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as SearchIcon } from '../../../assets/icons/icons8-search.svg';
import useDataset from '../../../hooks/useDataset';
import _ from 'lodash';
import History from '../../History/History';
import { useRecoilState } from 'recoil';
import { queryState } from '../../../atoms/queryAtom';

const InputStyled = styled.input`
  width: clamp(300px, 50vw, 80vw);
  min-height: 2rem;
  padding-left: 2rem;
  border: 1px solid black;
  border-radius: 8px;
`;

const DivStyled = styled.div`
  display: grid;
  place-items: center;
`;

const WrapperDiv = styled.div`
  position: relative;
  width: auto;
  height: auto;
`;

function SearchBarComponent() {
  const [query, setQuery] = useRecoilState(queryState);
  const datasetApi = useDataset();

  const handleChange = (e) => {
    setQuery(e.target.value);

    History.push({
      pathname: '/search',
      search: '?' + new URLSearchParams({ data_name: query }).toString(),
    });
  };

  useEffect(() => {
    if (query.length < 1 && !window.location.search)
      return History.push({
        pathname: '/search',
        search: null,
      });

    datasetApi.fetchFilteredDataset();
  }, [query]);

  return (
    <DivStyled>
      <WrapperDiv>
        <InputStyled
          type="text"
          placeholder="Search through dataset"
          onChange={handleChange}
        />
        <SearchIcon
          style={{
            position: 'absolute',
            top: '23%',
            left: '8px',
            width: '20px',
            height: '20px',
          }}
        />
      </WrapperDiv>
    </DivStyled>
  );
}

export default SearchBarComponent;
