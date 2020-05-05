import React from 'react';
import './app-header.css'

const AppHeader = ({ toDo, done }) => {
    return (
        <section className='app-header d-flex'>
            <h1>Todo List</h1>
            <h2>{toDo} more to do, {done} done</h2>
        </section>
    );
};

export default AppHeader;
