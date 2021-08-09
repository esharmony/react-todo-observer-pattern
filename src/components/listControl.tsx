import React, { useState } from 'react';

import TodoList, { ItemState } from '../Subjects/TodoList';

const ListControl = () => {
  const [title, setTitle] = useState<string>('');
  const [asyncRequested, setAsyncRequested] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && !asyncRequested) {
      TodoList.addListItem({ Title: title, State: ItemState.Todo });
      setTitle('');
    } else if (title && asyncRequested) {
      setIsLoading(true);
      setTitle('loading..');
      await TodoList.addListItemAsync({ Title: title, State: ItemState.Todo });
      setIsLoading(false);
      setTitle('');
    } else {
      alert('Add something');
    }
  };

  const handleAsyncOption = () => {
    setAsyncRequested(asyncRequested !== true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add item todo"
      />
      <input type="submit" value="Add todo" disabled={isLoading} />
      <label id="asyncOption">
        {' '}
        do async <input type="checkbox" onClick={handleAsyncOption} />
      </label>
    </form>
  );
};

export default ListControl;
