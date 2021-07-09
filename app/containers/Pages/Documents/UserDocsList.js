import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Pagination from '@material-ui/lab/Pagination';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import CardDocTable from '../Table/CardDocTable';
import config from '../../../config/config';

const UserDocsList = () => {
  const [docs, setDocs] = useState([]);
  const [userData, setUserData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;
  const { id } = useParams();
  const history = useHistory();

  const getDocs = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'user/docs/' + id;
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 10,
            page,
          },
        });
        const { pagination } = response.data;
        setTotal(pagination.total);
        const { documents, user } = response.data.data;
        setDocs(documents);
        setUserData(user);
        setIsDone(true);
      } catch (error) {
        console.log(error);
        // return error.response ? error.response.data : error.message;
      }
    },
    [setDocs, setIsDone, setTotal]
  );

  useEffect(() => {
    if (!isDone) {
      if (!id) {
        history.push('/404');
      }
      getDocs();
    }
  }, [isDone]);

  const onChange = (event, page) => {
    getDocs(page);
  };

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
        desc="Document table"
      >
        <div>
          <CardDocTable data={docs} user={userData} setIsDone={setIsDone} />
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

export default UserDocsList;
