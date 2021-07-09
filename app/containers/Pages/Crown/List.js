import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import CrownListTable from '../Table/CrownListTable';
import config from '../../../config/config';

const List = () => {
  const [crowns, setCrowns] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;

  const getCrowns = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'crown';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 10,
            page,
            platform: 'all'
          },
        });
        const result = response.data.data.crowns;
        const { pagination } = response.data;
        setTotal(pagination.total);
        setCrowns(result);
        setIsDone(true);
      } catch (error) {
        console.log(
          error.response ? error.response.data : error.message
        );
      }
    },
    [setCrowns, setIsDone, setTotal]
  );

  const onChange = (event, page) => {
    getCrowns(page);
  };

  useEffect(() => {
    if (!isDone) {
      getCrowns();
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
        desc="Crown table"
      >
        <div>
          {crowns && crowns.length ? <CrownListTable data={crowns} setIsDone={setIsDone} /> : ''}
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
