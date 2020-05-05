import React from 'react';
import './search-panel.css';

export default class SearchPanel extends React.Component {
    constructor() {
        super();

        this.state = {
            searchString: ''
        };

        this.onSearchChange = (evt) => {
            const searchString = evt.target.value;
            this.setState({ searchString });
            this.props.getSearchStr(searchString);
        }
    }

    render() {
        return <input 
        type='text'
        className='form-control search-input' 
        placeholder='Search'
        onChange={ this.onSearchChange }
        value={this.state.searchString} />;
    };
}
