import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import ItemAddForm from '../item-add-form/item-add-form'

import './app.css';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todoData: [
                { label: 'Take advantage of this great app', important: false, done: true, id: 1 },
                { label: 'Create new Todo', important: true, done: false, id: 2 },
                this.createTodoItem('Drink Tea'),
            ],
            searchString: '',
            filterString: 'all'
        };

        this.deleteItem = (id) => {
            this.setState(({ todoData }) => {
                const idx = todoData.findIndex((el)=> el.id === id);

                const newArr = [
                    ...todoData.slice(0, idx), 
                    ...todoData.slice(idx + 1)
                ];

                return {
                    todoData: newArr
                };
            });
        };

        this.addItem = (text) => {
            const newItem = this.createTodoItem(text);

            this.setState(({ todoData }) => {
                return {
                    todoData: [...todoData, newItem]
                };
            });
        };

        this.onToggleImportant = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            });
        };

        this.onToggleDone = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            });
        };

        this.getSearchStr = (searchString) => {
            this.setState({ searchString });
        }

        this.search = (todoData, searchString) => {
            if (searchString.length === 0) {
                return todoData;
            }
            const newArr = todoData.filter((el) => el.label.toLowerCase().includes(searchString.toLowerCase()));

            return newArr;
        };

        this.showFilteredItems = (filterString) => {
            this.setState({ filterString });
        }

        this.filterItems = (visibleItem, filterString) => {
            switch (filterString) {
                case 'all':
                    return visibleItem;
                case 'active':
                    return visibleItem.filter((el) => !el.done);
                case 'done':
                    return visibleItem.filter((el) => el.done);
                default:
                    return visibleItem;
            }
        }
    }

    maxId = 100;

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    render() {
        const isLoggedIn = true;
        const loginBox = <p>Log in please</p>;

        const { todoData, searchString, filterString, } = this.state;
        let visibleItem = this.filterItems(this.search(todoData, searchString), filterString);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
                { isLoggedIn ? null : loginBox }
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel getSearchStr={ this.getSearchStr } />
                    <ItemStatusFilter showFilteredItems={ this.showFilteredItems } />
                </div>
                <TodoList 
                    data={visibleItem}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone } />
                <ItemAddForm onAdd={ this.addItem }/>
            </div>
        );
    };
}
