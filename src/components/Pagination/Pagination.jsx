import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setPage } from '../../Redux/slice/slicePage';
import { getCountArticles } from '../../services/services';

export default function BasicPagination() {
  const page = useSelector((state) => state.page);
  const [articlesCount, setArticlesCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const count = await getCountArticles();
      setArticlesCount(count);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      dispatch(setPage(parseInt(storedPage)));
    }
  }, [dispatch]);

  const handlePageChange = (_, num) => {
    dispatch(setPage(num));
    localStorage.setItem('currentPage', num);
  };

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', margin: '25px' }}>
      <Pagination
        count={Math.ceil(articlesCount / 10)}
        page={page}
        onChange={handlePageChange}
        color='primary'
      />
    </Stack>
  );
}
