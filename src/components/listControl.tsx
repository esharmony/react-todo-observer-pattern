import React, { useState } from 'react';
import TodoList, { ItemState } from '../Subjects/TodoList';

const ListControl: React.FC = () => {
	const [title, setTitle] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (title) {
			TodoList.addListItem({ Title: title, State: ItemState.Todo});
            setTitle('');
		} else {
			alert('Add something');
		}
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add item todo" />
			<input type="submit" value="Add todo" />
		</form>
	);
};

export default ListControl;
