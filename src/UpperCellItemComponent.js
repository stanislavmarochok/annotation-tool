import React from 'react';
import ItemCellComponent from "./ItemCellComponent";

class UpperCellItemComponent extends React.Component {
    render() {
        return <ItemCellComponent
            cellItem={this.props.cellItem}
            onClick={this.props.onClick}
            className={"upper-line"} />
    }
}

export default UpperCellItemComponent;