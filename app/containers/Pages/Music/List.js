import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import MusicListTable from '../Table/MusicListTable';
import config from '../../../config/config';

const List = () => {
  const [musics, setMusics] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;

  const getMusics = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'music';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 5,
            page,
          },
        });
        const { pagination } = response.data;
        setTotal(pagination.total);
        const result = response.data.data.musics;
        setMusics(result);
        setIsDone(true);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    [setMusics, setIsDone, setTotal]
  );

  const onChange = (event, page) => {
    getMusics(page);
  };

  useEffect(() => {
    if (!isDone) {
      getMusics();
    }
  }, [isDone]);
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Table"
        whiteBg
        icon="ios-menu-outline"
        desc="Music table"
      >
        <div>
          <MusicListTable data={musics} setIsDone={setIsDone} />
          <Pagination
            count={total}
            color="primary"
            onChange={onChange}
          />
        </div>
      </PapperBlock>
    </div>
  );
};

export default List;
