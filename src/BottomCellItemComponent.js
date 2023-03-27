import React from 'react';
import ItemCellComponent from "./ItemCellComponent";

class BottomCellItemComponent extends React.Component {
    render() {
        return <ItemCellComponent
            cellItem={this.props.cellItem}
            onClick={this.props.onClick}
            handleCellInputChange={this.props.handleCellInputChange}
            isUpperRow={false}
            className={"bottom-line"} />
    }
}

export default BottomCellItemComponent;