import { useCallback, useMemo } from 'react';
import axios from 'axios';
import {
  DATASET_BACKEND_LINK,
  DATASET_SEARCH_BACKEND_LINK,
} from '../constants/api';

import { useRecoilState } from 'recoil';
import { datasetState } from '../atoms/datasetAtom';
import { queryState } from '../atoms/queryAtom';

const options = {
  method: 'GET',
  url: DATASET_BACKEND_LINK,
};

function useDataset() {
  const [, setDatasetResults] = useRecoilState(datasetState);
  const [searchData] = useRecoilState(queryState);

  const searchOptions = useMemo(
    () => ({
      method: 'POST',
      url: DATASET_SEARCH_BACKEND_LINK,
      params: { data_name: searchData },
    }),
    [searchData]
  );
  const fetchDataset = useCallback(async () => {
    try {
      const { data } = await axios.request(options);
      setDatasetResults(data[0].DATASET);
    } catch (e) {
      console.error('ERROR WITH FETCH: ', e.message);
    }
  }, [setDatasetResults]);

  const fetchFilteredDataset = useCallback(async () => {
    try {
      axios
        .request(searchOptions)
        .then(function (response) {
          setDatasetResults(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (e) {
      console.error('ERROR WITH FETCH: ', e.message);
    }
  }, [searchOptions, setDatasetResults]);

  return {
    fetchDataset,
    fetchFilteredDataset,
  };
}

export default useDataset;
