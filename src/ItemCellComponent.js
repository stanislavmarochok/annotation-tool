import React from 'react';
import './ItemCell.css';

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
                {this.props.cellItem.data}
            </div>
        );
    }
}

export default ItemCellComponent;