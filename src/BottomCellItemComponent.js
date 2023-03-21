import React from 'react';
import ItemCellComponent from "./ItemCellComponent";

class BottomCellItemComponent extends React.Component {
    render() {
        return <ItemCellComponent
            cellItem={this.props.cellItem}
            onClick={() => {
                console.log('do nothing, bottom row is not clickable');
            }}
            className={"bottom-line"} />
    }
}

export default BottomCellItemComponent;