import React from 'react';
import ListItemObserver from '../Observers/Abstractions/ListObserver';
import { ItemState, TodoListState } from '../Subjects/TodoList';
import TodoList from '../Subjects/TodoList';

interface ListState {
	todoListState: TodoListState;
}

export default class Component
	extends React.Component<{}, ListState>
	implements ListItemObserver
{
	constructor() {
		super({});

		this.state = {
			todoListState: { ListItems: [], ListSetting: ItemState.Todo },
		};
	}

	componentDidMount() {
		TodoList.registerObserver(this);
		TodoList.setIsLoading(true);
		// mock initial load
		setTimeout(() => {
			TodoList.setState({
				IsLoading: false,
				ListItems: [
					{ Title: 'Clean Car', State: ItemState.Done },
					{ Title: 'Clean Kitchen', State: ItemState.Done },
					{ Title: 'Take out trash', State: ItemState.Done },
					{ Title: 'Feed Cat', State: ItemState.Todo },
					{ Title: 'Food shopping', State: ItemState.Todo },
					{ Title: 'Get dry cleaning', State: ItemState.Todo },
				],
				ListSetting: ItemState.Todo,
			});
		}, 1000);
	}

	componentDidUpdate() {
		console.log('list updating');
	}

	updated = (todoListState: TodoListState) => {
		this.setState({ todoListState });
	};

	render() {
		if (this.state.todoListState.IsLoading) return <p>Loading...</p>;
		return (
			<ul id="list">
				{this.state.todoListState.ListItems.map((listItem, index) => {
					if (listItem.State === this.state.todoListState.ListSetting)
						return (
							<li key={`id-${index}`}>
								{listItem.Title}
								<span>
									<label>
										{this.state.todoListState.ListSetting === ItemState.Todo
											? 'Done:'
											: 'Undo:'}
										<input
											type="checkbox"
											// setTimeout to slow the action as to see the tick
											onClick={() => setTimeout(() => { TodoList.changeListItemState(index)}, 200)}
										/>
									</label>
								</span>
							</li>
						);
					return null;
				})}
			</ul>
		);
	}
}
