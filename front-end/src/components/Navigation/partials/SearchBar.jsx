/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as SearchIcon } from '../../../assets/icons/icons8-search.svg';
import useDataset from '../../../hooks/useDataset';
import History from '../../History/History';
import { useRecoilState } from 'recoil';
import { queryState } from '../../../atoms/queryAtom';
import _ from 'lodash';

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
  const refInput = useRef();
  const datasetApi = useDataset();
  const [query, setQuery] = useRecoilState(queryState);
  const controller = new AbortController();

  const debouncedSearch = useCallback(
    _.debounce(() => datasetApi.fetchFilteredDataset(), 600),
    [query]
  );

  useEffect(() => {
    debouncedSearch();

    return () => controller.abort();
  }, [query, setQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (refInput.current.value.length < 1) {
      return History.push({
        pathname: '/',
        search: null,
      });
    }

    if (query && query.length < 1 && !window.location.search) {
      return History.push({
        pathname: '/search',
        search: null,
      });
    }
    History.push({
      pathname: '/search',
      search: '?' + new URLSearchParams({ data_name: query }).toString(),
    });
  };

  return (
    <DivStyled>
      <WrapperDiv>
        <InputStyled
          ref={refInput}
          type="text"
          placeholder="Search through dataset"
          onChange={handleChange}
          value={query}
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
