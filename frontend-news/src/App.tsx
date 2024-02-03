import Layout from './components/UI/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import News from './containers/News/News';
import NewPost from './containers/NewPost/NewPost';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<News/>}/>
          <Route path="/new-post" element={<NewPost/>}/>
          <Route path="*" element={<h1>Page not found!</h1>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
