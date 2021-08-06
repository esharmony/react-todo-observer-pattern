import { TodoListState } from "../../Subjects/TodoList";

export default interface ListItemObserver {
    updated:(state: TodoListState) => void;
}