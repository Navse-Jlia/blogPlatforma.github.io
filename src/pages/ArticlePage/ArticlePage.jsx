import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Popconfirm, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import formattedDate from '../../utils/formattedDate';
import { Liked, deleteArticle, disLiked, getArticle } from '../../services/services';
import { useEffect, useState } from 'react';
import { truncate } from '../../utils/cutText';

import noLike from '../../icon/noLike.svg';
import like from '../../icon/like.svg';
import icon from '../../icon/icon.png';
import './ArticlePage.scss';

export default function ArticlesPage() {
  const nav = useNavigate();
  const { slug } = useParams();
  const { jwt } = useSelector((state) => state.user);

  const [article, setArticle] = useState({});
  const [countLike, setCountLike] = useState(0);
  const [favoriteBool, setFavoriteBool] = useState(false);

  const { title, description, author, createdAt, tagList, body } = article;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticle(jwt, slug);
        const { favorited, favoritesCount } = res.data.article;
        setArticle(res.data.article);
        setFavoriteBool(favorited);
        setCountLike(favoritesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [jwt, slug]);

  async function confirm() {
    try {
      await deleteArticle(slug, jwt);
      message.info('article deleted');
      setTimeout(() => nav('/'), 1000);
    } catch (error) {
      console.error('Error deleting article:', error);
      message.error('Failed to delete article');
    }
  }

  function cancel() {
    message.error('cancel');
  }

  const handleLike = async () => {
    if (!jwt) {
      nav('/sign-in');
      return;
    }

    if (favoriteBool) {
      try {
        await Liked(jwt, slug);
        setFavoriteBool(false);
        setCountLike(countLike - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await disLiked(jwt, slug);
        setFavoriteBool(true);
        setCountLike(countLike + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='article-page'>
      <div className='header-article'>
        <div className='title'>
          {<h2>{title}</h2>}
          <span className='like'>
            <img src={favoriteBool ? like : noLike} alt='likes' onClick={handleLike} />
            <span>{countLike}</span>
          </span>
          <ul>
            {tagList?.map((tag) => {
              if (tag && typeof tag === 'string') {
                const trimmedTag = tag.trim();
                if (trimmedTag !== '') {
                  return (
                    <li key={uuidv4()} className='tag'>
                      {truncate(trimmedTag, 12)}
                    </li>
                  );
                }
                return null;
              }
            })}
          </ul>
        </div>
        <div className='avatar'>
          <span className='container-avatar'>
            {' '}
            <span className='name'>{author?.username}</span>
            <span>{formattedDate(createdAt)}</span>
          </span>
          <img src={author?.image ? author.image : icon} alt='avatar' />
          {author?.username === localStorage.getItem('username') ? (
            <div>
              <Popconfirm
                title='Are you sure you want to delete this article?'
                onConfirm={confirm}
                onCancel={cancel}
                okText='Yes'
                cancelText='No'
                placement={'bottom'}
              >
                <button className='btn-del'>DELETE </button>
              </Popconfirm>

              <Link to={`/articles/${slug}/edit`}>
                {' '}
                <button className='btn-edit'>EDIT</button>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='descr'>
        <p>{truncate(description)}</p>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
