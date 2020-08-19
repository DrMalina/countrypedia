import React, { FC } from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Dashboard } from 'components/Dashboard';
import { ScrollTop } from 'components/ScrollTop';

export const HomePage: FC = () => {
  return (
    <>
      <Dashboard />
      <ScrollTop>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
