import React, {PropsWithChildren} from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';
import {Container} from '@mui/material';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="md">
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;