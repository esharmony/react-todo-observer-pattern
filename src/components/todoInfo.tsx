import React from 'react';
import ListItemObserver from '../Observers/Abstractions/ListObserver';
import TodoList, { ItemState, TodoListState } from '../Subjects/TodoList';

export default class Component
	extends React.Component<{}, TodoListState>
	implements ListItemObserver
{
	constructor() {
		super({});

		this.state = {
			ListItems: [],
			ListSetting: ItemState.Todo,
		};
	}

	componentDidMount() {
		TodoList.registerObserver(this);
	}

	updated = (state: TodoListState): void => {
		this.setState(state);
	};

	lengthOfTodo = ():number => {
		return this.state.ListItems.filter((item) => item.State === ItemState.Todo)
			.length;
	};

	lengthOfDone = ():number => {
		return this.state.ListItems.filter((item) => item.State === ItemState.Done)
			.length;
	};

	render() {
		if (this.state.IsLoading) return null;
		return (
			<div id="todoListInfo">
				{this.state.ListSetting === ItemState.Todo ? (
					<p>
						You have completed <strong>{this.lengthOfDone()}</strong>
					</p>
				) : (
					<p>
						You have <strong>{this.lengthOfTodo()}</strong> still to do!
					</p>
				)}
			</div>
		);
	}
}
