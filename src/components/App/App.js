import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlesPage from '../../pages/ArticlePage/ArticlePage';
import SignUpForm from '../../pages/SignUp/SignUpForm';
import SignInForm from '../../pages/SignIn/SignInForm';
import MainLayout from '../MainLayout/MainLayout';
import EditProfile from '../../pages/EditProfile/EditProfile';
import CreateArticle from '../../pages/CreateArticle/CreateArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/blogPlatforma.github.io'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<ArticlesList />} />
            <Route path='articles' element={<ArticlesList />} />
            <Route path='articles/:slug' element={<ArticlesPage />} />

            <Route path='sign-in' element={<SignInForm />} />
            <Route path='sign-up' element={<SignUpForm />} />

            <Route path='new-article' element={<CreateArticle />} />

            <Route path='profile' element={<EditProfile />} />
            <Route path='articles/:slug/edit' element={<EditArticle />} />

            <Route path='*' element={<h2>Not found</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
