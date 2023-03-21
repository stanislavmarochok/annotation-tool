import './App.css';
import React from 'react';
import RowComponent from "./RowComponent";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };

        let testRow = new RowItem(this.state.rows.length);
        testRow.addCellToUpperRow("a", 1);
        testRow.addCellToUpperRow("b", 1);
        testRow.addCellToUpperRow("c", 1);
        testRow.addCellToUpperRow("", 1);
        testRow.addCellToUpperRow("a", 1);
        testRow.addCellToUpperRow("b", 1);
        testRow.addCellToUpperRow("c", 1);
        testRow.addCellToUpperRow("", 1);
        testRow.addCellToUpperRow("a", 1);
        testRow.addCellToUpperRow("b", 1);
        testRow.addCellToUpperRow("c", 1);

        testRow.addCellToBottomRow("1");
        testRow.addCellToBottomRow("2");
        testRow.addCellToBottomRow("3");
        testRow.addCellToBottomRow(".");
        testRow.addCellToBottomRow("1");
        testRow.addCellToBottomRow("2");
        testRow.addCellToBottomRow("3");
        testRow.addCellToBottomRow(".");
        testRow.addCellToBottomRow("1");
        testRow.addCellToBottomRow("2");
        testRow.addCellToBottomRow("3");

        this.state.rows.push(testRow);

        this.firstSelectedCell = null;
        this.secondSelectedCell = null;
    }

    render(){
        return (
            <div className={"main-content-container"}>
                <button onClick={this.mergeSelectedCells}>Merge selected cells</button>
                {this.state.rows.map((x, idx) => (
                    <RowComponent
                        key={`row-component-${idx}`}
                        rowData={x}
                        onCellClick={this.onCellClick} />
                ))}
            </div>
        );
    }

    onCellClick = (cellItem) => {
        cellItem.selected = !cellItem.selected;
        // if (cellItem.selected) {
        //     if (this.firstSelectedCell == null){
        //         this.firstSelectedCell = cellItem;
        //     } else {
        //         // if second item is on another row than first selected item or if two selected items are not adjacent
        //         if ((this.firstSelectedCell.parentRow.rowIndex !== cellItem.parentRow.rowIndex) ||
        //             (Math.abs(this.firstSelectedCell.indexInRow - cellItem.indexInRow) > 1 &&
        //                 (this.secondSelectedCell == null || (Math.abs(this.secondSelectedCell.indexInRow - cellItem.indexInRow) > 1)))){
        //             this.firstSelectedCell.selected = false;
        //             this.firstSelectedCell = cellItem;
        //
        //             this.secondSelectedCell = null;
        //         } else {
        //             if (this.secondSelectedCell == null) {
        //                 this.secondSelectedCell = cellItem;
        //             } else {
        //                 this.firstSelectedCell = this.secondSelectedCell;
        //                 this.secondSelectedCell = cellItem;
        //             }
        //         }
        //     }
        // }
        console.log(this.firstSelectedCell, this.secondSelectedCell);

        this.setState({});
    }

    mergeSelectedCells = () => {
        if (this.firstSelectedCell == null || this.secondSelectedCell == null){
            console.log("Merge operation requires two items to be selected");
            return;
        }

        this.firstSelectedCell.data = this.firstSelectedCell.data + this.secondSelectedCell.data;
        this.firstSelectedCell.colSpan = this.firstSelectedCell.colSpan + this.secondSelectedCell.colSpan;

        // remove second cell from all cells
        this.secondSelectedCell.parentRow.upperRowData.splice(this.secondSelectedCell.indexInRow, 1);

        this.setState({});
    }
}

class RowItem {
    constructor(rowIndex) {
        this.upperRowData = [];
        this.bottomRowData = [];
        this.rowIndex = rowIndex;
    }

    addCellToUpperRow = (text, colSpan) => {
        let cell = new CellItem(text, colSpan, this, this.upperRowData.length);
        this.upperRowData.push(cell);
    }

    addCellToBottomRow = (text) => {
        let cell = new CellItem(text, 1, this, this.bottomRowData.length);
        this.bottomRowData.push(cell);
    }
}

class CellItem {
    constructor(data, colSpan, parentRow, indexInRow) {
        this.data = data;
        this.colSpan = colSpan;
        this.selected = false;
        this.parentRow = parentRow;
        this.indexInRow = indexInRow;
    }
}

export default App;
