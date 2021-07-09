import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import CardTable from '../Table/CardTable';
import config from '../../../config/config';

const UserVideoList = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [total, setTotal] = useState(0);
  const title = brand.name + ' - User List';
  const description = brand.desc;
  const { baseApiUrl } = config;
  const { id } = useParams();
  const history = useHistory();

  const getVideos = useCallback(
    async (page = 1) => {
      try {
        const url = baseApiUrl + 'search/user/' + id + '/videos';
        const response = await axios.get(url, {
          params: {
            token: localStorage.getItem('token'),
            limit: 5,
            page,
          },
        });
        const { pagination } = response.data.data;
        setTotal(pagination.total);
        const result = response.data.data.videos;
        setUser(response.data.data.user);
        setVideos(result);
        setIsDone(true);
      } catch (error) {
        return error.response ? error.response.data : error.message;
      }
    },
    [setVideos, setIsDone, setTotal]
  );

  useEffect(() => {
    if (!isDone) {
      if (!id) {
        history.push('/404');
      }
      getVideos();
    }
  }, [isDone]);

  const onChange = (event, page) => {
    getVideos(page);
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
        desc="Videos table"
      >
        <div>
          <CardTable data={videos} user={user} setIsDone={setIsDone} />
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

export default UserVideoList;
