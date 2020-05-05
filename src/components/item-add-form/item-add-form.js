import React from 'react';
import './item-add-form.css';

export default class ItemAddForm extends React.Component {
    constructor() {
        super();

        this.state = {
            label: ''
        }

        this.onLabelChange = (evt) => {
            this.setState({
                label: evt.target.value
            });
        };

        this.onSubmit = (evt) => {
            evt.preventDefault();
            this.props.onAdd(this.state.label);
            this.setState({
                label: ''
            });
        };
    };

    render() {
        return (
            <form className='item-add-form d-flex'
                onSubmit={this.onSubmit}>
                <input 
                    type='text'
                    className='add-item-input form-control'
                    placeholder='What needs to be done'
                    required
                    onChange={this.onLabelChange} 
                    value={this.state.label}/>
                <button 
                    type='submit'
                    className='btn btn-outline-info'>
                    Add item
                </button>
            </form>
        );
    };
}