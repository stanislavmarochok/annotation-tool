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
            <div className={`item-cell ${this.props.className} ${this.props.cellItem.selected ? 'selected-cell' : ''}`} onClick={this.handleClick}>
                {this.props.isUpperRow &&
                    <input name="upper-row-cell-input" onInput={this.handleChange} value={this.props.cellItem.plainText} maxLength={this.props.cellItem.plainText.length} size={this.props.cellItem.plainText.length} />}
                {!this.props.isUpperRow && this.props.cellItem.cipherText}
            </div>
        );
    }

    handleClick = (event) => {
        event.stopPropagation();
        this.props.onClick(this.props.cellItem)
    }

    handleChange = (event) => {
        this.props.handleCellInputChange(this.props.cellItem, event.target.value);
    }
}

export default ItemCellComponent;