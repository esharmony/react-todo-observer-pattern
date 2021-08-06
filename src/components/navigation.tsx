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

    componentDidMount(){
        TodoList.registerObserver(this);
    }

	updated = (state: TodoListState) => {
        this.setState(state);
    };

	handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, state: ItemState) => {
		TodoList.setListSetting(state);
		e.preventDefault();
	};

	render() {
		return (
			<ul id="navigation">
				<li>
					<a
						href=":"
						className={
							this.state.ListSetting === ItemState.Todo ? 'selected' : ''
						}
						onClick={(e) => this.handleClick(e, ItemState.Todo)}
					>
						Todo
					</a>
				</li>
				<li>
					<a
						href=":"
						className={
							this.state.ListSetting === ItemState.Done ? 'selected' : ''
						}
						onClick={(e) => this.handleClick(e, ItemState.Done)}
					>
						Done
					</a>
				</li>
			</ul>
		);
	}
}
