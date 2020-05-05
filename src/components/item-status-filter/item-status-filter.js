import React from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
    constructor() {
        super();

        this.state = {
            filterString: 'all'
        }

        this.activeClass = '';
        this.getFilteredItems = (evt) => { 
            const filterString = evt.target.dataset.filter;
            this.setState({ filterString });

            this.props.showFilteredItems(filterString);

            const btnGroupChildren = evt.target.parentElement.children;
            Array.from(btnGroupChildren).forEach((el) => {
                if (el.dataset.filter === filterString) {
                    el.className = 'btn btn-info';
                } else {
                    el.className = 'btn btn-outline-secondary';
                }
            });
        };
    }

    render() {
        return (
            <div className='btn-group' onClick={this.getFilteredItems}>
                <button type='button' 
                        className='btn btn-info'
                        data-filter='all'>All</button>
                <button type='button' 
                        className='btn btn-outline-secondary'
                        data-filter='active'>Active</button>
                <button type='button' 
                        className='btn btn-outline-secondary'
                        data-filter='done'>Done</button>
            </div>
        );
    }
}
