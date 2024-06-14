// Библиотеки
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Функции
import { setAuth } from '../../Redux/slice/sliceAuthentication';
// Стили
import icon from '../../icon/icon.png';
import './Header.scss';

export default function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { jwt, username, image } = useSelector((state) => state.user);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(setAuth({ token: '', username: '' }));
    nav('/sign-in');
  };

  return (
    <>
      <header className='header'>
        {jwt ? (
          <>
            <h2>
              <Link to='/'>RealWorld Blog</Link>
            </h2>
            <Link to='/new-article'>
              <button className='btn-create'>create article</button>
            </Link>
            <Link to='/profile'>
              <span className='name'>{username}</span>
            </Link>
            <Link to='/profile'>
              <img
                style={{ width: '46px', height: '46px', borderRadius: '50%' }}
                src={image ? image : icon}
                alt='myPhoto'
              />
            </Link>
            <button className='btn-out' onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <h2>
              <Link to='/'>RealWorld Blog</Link>
            </h2>
            <Link to='sign-in'>
              <button className='btn-in'>Sign In</button>
            </Link>
            <Link to='/sign-up'>
              <button className='btn-up'>Sign Up</button>
            </Link>
          </>
        )}
      </header>
    </>
  );
}
