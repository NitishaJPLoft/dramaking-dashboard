import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import UserListTable from '../Table/UserListTable';
import config from '../../../config/config';

const List = () => {
  const [users, setUsers] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;
  const getUsers = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'user';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 10,
            page,
          },
        });
        const result = response.data.data.users;
        const { pagination } = response.data;
        setTotal(pagination.total);
        setUsers(result);
        setIsDone(true);
      } catch (error) {
        console.log(
          error.response ? error.response.data : error.message
        );
      }
    },
    [setUsers, setIsDone, setTotal]
  );

  const onChange = (event, page) => {
    getUsers(page);
  };

  useEffect(() => {
    if (!isDone) {
      getUsers();
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
        desc="User table"
      >
        <div>
          {users && users.length ? <UserListTable data={users} setIsDone={setIsDone} /> : ''}
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
