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
        testRow.addCellToUpperRow(" ", 1);
        testRow.addCellToUpperRow("a", 1);
        testRow.addCellToUpperRow("b", 1);
        testRow.addCellToUpperRow("c", 1);
        testRow.addCellToUpperRow(" ", 1);
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

        let testRow2 = new RowItem(this.state.rows.length);
        testRow2.addCellToUpperRow("b", 1);
        testRow2.addCellToUpperRow("c", 1);
        testRow2.addCellToUpperRow("a", 1);
        testRow2.addCellToUpperRow(" ", 1);
        testRow2.addCellToUpperRow("a", 1);
        testRow2.addCellToUpperRow("b", 1);
        testRow2.addCellToUpperRow("c", 1);

        testRow2.addCellToBottomRow("1");
        testRow2.addCellToBottomRow("2");
        testRow2.addCellToBottomRow("3");
        testRow2.addCellToBottomRow(".");
        testRow2.addCellToBottomRow("1");
        testRow2.addCellToBottomRow("2");
        testRow2.addCellToBottomRow("3");

        this.state.rows.push(testRow);
        this.state.rows.push(testRow2);
    }

    render(){
        return (
            <div className={"main-content-container"}>
                <button onClick={this.mergeSelectedCells}>Merge selected cells</button>
                <button onClick={this.splitSelectedCells}>Split selected cells</button>
                <button onClick={this.increaseColSpanOfSelectedCells}>+1 selected cells colspan</button>
                <button onClick={this.decreaseColSpanOfSelectedCells}>-1 selected cells colspan</button>
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
        this.setState({});
    }

    mergeSelectedCells = () => {
        for (let i = 0; i < this.state.rows.length; i++)
        {
            let row = this.state.rows[i];
            let selectedCells = [];
            let rows = [row.upperRowData, row.bottomRowData];
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
            {
                let rowData = rows[rowIndex];
                for (let j = 0; j < rowData.length; j++)
                {
                    let cell = rowData[j];
                    if (cell.selected){
                        selectedCells.push(cell);
                    }
                    else {
                        const selectedCellsLength = selectedCells.length - 1;
                        this.mergeCells(selectedCells);
                        rowData.splice(j - selectedCellsLength, selectedCellsLength);

                        selectedCells = [];
                    }
                }
            }
        }

        this.setState({});
    }

    mergeCells = (cells) => {
        if (cells.length <= 1) {
            return;
        }

        while (cells.length > 1) {
            let firstSelectedCell = cells[0];
            let secondSelectedCell = cells[1];

            firstSelectedCell.data = firstSelectedCell.data + secondSelectedCell.data;
            firstSelectedCell.colSpan = firstSelectedCell.colSpan + secondSelectedCell.colSpan;

            cells.splice(1, 1);
        }
    }

    splitSelectedCells = () => {
        for (let i = 0; i < this.state.rows.length; i++)
        {
            let row = this.state.rows[i];
            let rows = [row.upperRowData, row.bottomRowData];
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
            {
                let rowData = rows[rowIndex];
                for (let j = 0; j < rowData.length; j++)
                {
                    let cell = rowData[j];
                    if (cell.selected)
                    {
                        if (cell.colSpan > 1)
                        {
                            // split cell to multiple cells
                            const splittedCells = this.splitCell(cell);
                            rowData.splice(j, 1, ...splittedCells);
                        }
                    }
                }
            }
        }

        this.setState({});
    }

    splitCell = (cell) => {
        let splittedCells = [];

        const colSpan = cell.colSpan;
        while (splittedCells.length < colSpan)
        {
            let newCell = new CellItem(cell.data[0], 1, cell.parentRow, cell.indexInRow, true);
            newCell.selected = true;
            splittedCells.push(newCell);

            cell = new CellItem(cell.data.substring(1), cell.colSpan - 1, cell.parentRow, cell.indexInRow + 1, true);
        }

        return splittedCells;
    }

    increaseColSpanOfSelectedCells = () => {
        console.log('test');
        for (let i = 0; i < this.state.rows.length; i++)
        {
            let row = this.state.rows[i];
            let rows = [row.upperRowData, row.bottomRowData];
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
            {
                let rowData = rows[rowIndex];
                for (let j = 0; j < rowData.length; j++)
                {
                    let cell = rowData[j];
                    if (cell.selected){
                        this.increaseColSpanOfCell(cell);
                    }
                }
            }
        }

        this.setState({});
    }

    increaseColSpanOfCell = (cell) => {
        cell.colSpan += 1;
    }

    decreaseColSpanOfSelectedCells = () => {
        for (let i = 0; i < this.state.rows.length; i++)
        {
            let row = this.state.rows[i];
            let rows = [row.upperRowData, row.bottomRowData];
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
            {
                let rowData = rows[rowIndex];
                for (let j = 0; j < rowData.length; j++)
                {
                    let cell = rowData[j];
                    if (cell.selected){
                        this.decreaseColSpanOfCell(cell);
                    }
                }
            }
        }

        this.setState({});
    }

    decreaseColSpanOfCell = (cell) => {
        if (cell.colSpan <= 1)
        {
            return;
        }

        cell.colSpan -= 1;
    }
}

class RowItem {
    constructor(rowIndex) {
        this.upperRowData = [];
        this.bottomRowData = [];
        this.rowIndex = rowIndex;
    }

    addCellToUpperRow = (text, colSpan) => {
        let cell = new CellItem(text, colSpan, this, this.upperRowData.length, true);
        this.upperRowData.push(cell);
    }

    addCellToBottomRow = (text) => {
        let cell = new CellItem(text, 1, this, this.bottomRowData.length, false);
        this.bottomRowData.push(cell);
    }
}

class CellItem {
    constructor(data, colSpan, parentRow, indexInRow, isUpperRow) {
        this.data = data;
        this.colSpan = colSpan;
        this.selected = false;
        this.parentRow = parentRow;
        this.indexInRow = indexInRow;
        this.isUpperRow = isUpperRow;
    }
}

export default App;
