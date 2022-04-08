import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetState } from '../../atoms/datasetAtom';

function Results() {
  const [dataSet] = useRecoilState(datasetState);

  return (
    <ul>
      {dataSet
        ? dataSet.map((data, index) => <li key={index}>{data}</li>)
        : 'No results'}
    </ul>
  );
}

export default Results;
