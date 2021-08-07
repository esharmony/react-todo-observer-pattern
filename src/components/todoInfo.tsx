import React from 'react';
import ListItemObserver from '../Observers/Abstractions/ListObserver';
import TodoList, { ItemState, TodoListState } from '../Subjects/TodoList';

interface TodoInfoState {
	todoListState: TodoListState;
	isVisible: boolean;
}

export default class Component
	extends React.Component<{}, TodoInfoState>
	implements ListItemObserver
{
	constructor(props: {}) {
		super(props);

		this.state = {
			todoListState: {
				ListItems: [],
				ListSetting: ItemState.Todo,
			},
			isVisible: true,
		};
	}

	componentDidUpdate() {
		console.log('info updating');
	}

	componentDidMount() {
		TodoList.registerObserver(this);
	}

	updated = (state: TodoListState): void => {
		this.setState({ todoListState: state });
	};

	lengthOfTodo = (): number => {
		return this.state.todoListState.ListItems.filter(
			(item) => item.State === ItemState.Todo
		).length;
	};

	lengthOfDone = (): number => {
		return this.state.todoListState.ListItems.filter(
			(item) => item.State === ItemState.Done
		).length;
	};

	handleClose = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		this.setState({ isVisible: false });
		TodoList.removeObserver(this);
		e.preventDefault();
	};

	handleOpen = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		this.setState({ isVisible: true });
		TodoList.registerObserver(this);
		e.preventDefault();
	};

	render() {
		if (this.state.todoListState.IsLoading) return null;
		return (
			<div id="todoListInfo">
				{this.state.isVisible &&
				this.state.todoListState.ListSetting === ItemState.Todo ? (
					<p>
						You have completed <strong>{this.lengthOfDone()}</strong> tasks!
					</p>
				) : (
					this.state.isVisible && (
						<p>
							You have <strong>{this.lengthOfTodo()}</strong> tasks to do!
						</p>
					)
				)}
				{this.state.isVisible ? (
					<a href=":" onClick={(e) => this.handleClose(e)}>
						Close
					</a>
				) : (
					<a href=":" onClick={(e) => this.handleOpen(e)}>
						Open
					</a>
				)}
			</div>
		);
	}
}
