import React, { useEffect } from 'react';
import List from './list';
import ListControl from '../components/listControl';
import NavigationContainer from './navigationContainer';

const ListContainer: React.FC = () => {
  useEffect(() => {
    console.log('list container updating');
  });

  return (
    <>
      <NavigationContainer />
      <List />
      <ListControl />
    </>
  );
};

export default ListContainer;
