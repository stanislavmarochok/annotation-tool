import './App.css';
import React from 'react';
import RowComponent from "./RowComponent";
import ImportFileComponent from "./ImportFileComponent";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };

        this.createTestData();
    }

    render(){
        return (
            <div className={"main-content-container"}>
                {this.renderButtons()}
                {this.renderImportFileComponent()}
                {this.state.rows.map((x, idx) => (
                    <RowComponent
                        key={`row-component-${idx}`}
                        rowData={x}
                        onCellClick={this.onCellClick}
                        handleCellInputChange={this.handleCellInputChange}
                    />
                ))}
            </div>
        );
    }

    renderButtons = () => {
        return <>
            <button onClick={this.mergeSelectedCells}>Merge selected cells</button>
            <button onClick={this.splitSelectedCells}>Split selected cells</button>
            <button onClick={this.increaseColSpanOfSelectedCells}>+1 selected cells colspan</button>
            <button onClick={this.decreaseColSpanOfSelectedCells}>-1 selected cells colspan</button>
        </>;
    }

    renderImportFileComponent = () => {
        return <>
            <ImportFileComponent />
        </>;
    }

    createTestData = () => {
        // todo: remove this function later

        let rawRowsText = "6323194643424029339684338344236421282556353\n" +
            "1343233867360002719566437833639234338934572\n" +
            "89114323193836464804239003505141541179438549\n" +
            "0063000570426234412346914216199548914900630\n" +
            "00590424321593643360087036451223006303600590\n";

        let rawRows = rawRowsText.split('\n');
        console.log(rawRows);

        for (let i = 0; i < rawRows.length; i++){
            let rawRow = rawRows[i];
            let row = new RowItem(i);
            for (let j = 0; j < rawRow.length; j++){
                row.addCellToUpperRow(" ", 1);
                row.addCellToBottomRow(rawRow[j], 1);
            }
            this.state.rows.push(row);
        }
    }

    onCellClick = (cellItem) => {
        cellItem.selected = !cellItem.selected;
        this.setState({});
    }

    handleCellInputChange = (cellItem, newValue) => {
        cellItem.data = newValue;
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
            let newCell = new CellItem(cell.data[0], 1, cell.parentRow, cell.indexInRow);
            newCell.selected = true;
            splittedCells.push(newCell);

            cell = new CellItem(cell.data.substring(1), cell.colSpan - 1, cell.parentRow, cell.indexInRow + 1);
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
