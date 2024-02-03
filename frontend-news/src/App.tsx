import Layout from './components/UI/Layout/Layout';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/new-post" element={<h3>New post</h3>}/>
          <Route path="*" element={<h1>Page not found!</h1>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
