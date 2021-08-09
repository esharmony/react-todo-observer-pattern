import ListObserver from '../Observers/Abstractions/ListObserver';
import Subject from './Abstractions/Subject';

export interface ListItem {
  Title: string;
  State: ItemState;
}

export enum ItemState {
  Todo = 1,
  Done = 2,
}

export interface TodoListState {
  ListItems: ListItem[];
  ListSetting: ItemState;
  IsLoading?: boolean;
}

class TodoList implements Subject {

  private TodoListState: TodoListState = {
    ListItems: [],
    ListSetting: ItemState.Todo,
  };

  private observers: ListObserver[];

  constructor() {
    this.observers = [];
  }

  setState = (state: TodoListState) => {
    this.TodoListState = state;
    this.notifyObservers();
  };

  setIsLoading = (isLoading: boolean) => {
    this.TodoListState.IsLoading = isLoading;
    this.notifyObservers();
  };

  setListSetting = (setting: ItemState) => {
    this.TodoListState.ListSetting = setting;
    this.notifyObservers();
  };

  addListItems = (items: ListItem[]) => {
    this.TodoListState.ListItems = this.TodoListState.ListItems.concat(items);
    this.notifyObservers();
  };

  addListItem = (item: ListItem) => {
    this.TodoListState.ListItems.push(item);
    this.notifyObservers();
  };

  addListItemAsync = async (item: ListItem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.addListItem(item);
        resolve('done');
      }, 3000);
    });
  };

  changeListItemState = (itemIndex: number) => {
    const item = this.TodoListState.ListItems[itemIndex];
    if (item.State === ItemState.Todo) {
      item.State = ItemState.Done;
    } else {
      item.State = ItemState.Todo;
    }
    this.notifyObservers();
  };

  registerObserver = (o: ListObserver): void => {
    this.observers.push(o);
  };

  removeObserver = (o: ListObserver): void => {
    this.observers.splice(this.observers.indexOf(o), 1);
  };

  notifyObservers = (): void => {
    this.observers.forEach((observer) => observer.updated(this.TodoListState));
  };
}

// export an instance - use the single instance accross the app
const todoListInstance = new TodoList();

export default todoListInstance;
