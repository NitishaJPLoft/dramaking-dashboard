import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import config from '../../../config/config';
import UserSearchTable from '../Table/UserSearchTable';

const Search = (props) => {
  const { match } = props;
  const [searchString, setSearchString] = useState(match && match.params && match.params.user ? match.params.user : '');
  const [page, setPage] = useState();
  const [users, setUsers] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;

  const searchUser = async (e, pageNo = 1) => {
    const url = baseApiUrl + 'search/users';
    const { value } = e.target;
    setSearchString(value);
    const response = await axios.get(url, {
      params: {
        token: localStorage.getItem('token'),
        limit: 10,
        page: pageNo,
        q: value || searchString,
      },
    });
    const data = response.data.data.users;
    if (data.length > 0) {
      const { pagination } = response.data.data;
      setTotal(pagination.total);
      setUsers(data);
      setIsDone(true);
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here

      const data = { target: { value: searchString } };
      await searchUser(data);
      // ...
    }
    if (searchString) {
      fetchData();
    }
  }, [searchString]);


  const getUsers = useCallback(
    async (pageNo = 1) => {
      try {
        const url = baseApiUrl + 'user';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 10,
            page: pageNo,
          },
        });
        const result = response.data.data.users;
        const { pagination } = response.data;
        setTotal(pagination.total);
        setUsers(result);
        setIsDone(true);
      } catch (error) {
        return error.response ? error.response.data : error.message;
      }
    },
    [setUsers, setIsDone, setTotal]
  );

  const onChange = (event, pageNo) => {
    setPage(pageNo);
    setIsDone(false);
  };

  useEffect(() => {
    if (!isDone) {
      if (searchString) {
        const data = { target: { value: searchString } };
        searchUser(data, page);
        setIsDone(true);
      } else {
        getUsers(page);
        setIsDone(true);
      }
    }
  }, [isDone, searchString, searchUser, getUsers]);
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
        <div style={{ width: '100%' }}>
          <Grid container justify="right" style={{ width: '100%', float: 'right', margin: '10px' }} spacing={2}>
            <Grid item>
              <TextField
                label="Search a user"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={searchUser}
              />
            </Grid>
          </Grid>

          <UserSearchTable data={users} />

          {users.length > 0 ? (
            <Pagination
              count={total}
              color="primary"
              onChange={onChange}
            />
          ) : (
            ''
          )}
        </div>
      </PapperBlock>
    </div>
  );
};

Search.propTypes = {
  match: PropTypes.object.isRequired
};

export default Search;
