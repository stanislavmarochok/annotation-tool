import React from 'react';
import './ItemCellComponent.css';

class ItemCellComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };
    }

    render(){
        return (
            <div className={`item-cell ${this.props.className} ${this.props.cellItem.selected ? 'selected-cell' : ''}`} onClick={() => this.props.onClick(this.props.cellItem)}>
                {this.props.cellItem.isUpperRow &&
                    <input name="upper-row-cell-input" onInput={this.handleChange} value={this.props.cellItem.data} size={this.props.cellItem.data.length} />}
                {!this.props.cellItem.isUpperRow && this.props.cellItem.data}
            </div>
        );
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }
}

export default ItemCellComponent;