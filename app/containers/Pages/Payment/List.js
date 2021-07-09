import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import PaymentListTable from '../Table/PaymentListTable';
import config from '../../../config/config';

const List = () => {
  const [history, setHistory] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;

  const getPaymentHistory = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'transaction/history';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 10,
            page,
          },
        });
        const result = response.data.data.history;
        const { pagination } = response.data;
        setTotal(pagination.total);
        setHistory(result);
        setIsDone(true);
      } catch (error) {
        console.log(
          error.response ? error.response.data : error.message
        );
      }
    },
    [setHistory, setIsDone, setTotal]
  );

  const onChange = (event, page) => {
    getPaymentHistory(page);
  };

  useEffect(() => {
    if (!isDone) {
      getPaymentHistory();
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
        desc="Payment table"
      >
        <div>
          {history && history.length ? <PaymentListTable data={history} /> : ''}
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
