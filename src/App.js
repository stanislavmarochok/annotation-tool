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
                        row={x}
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

        for (let i = 0; i < rawRows.length; i++){
            let rawRow = rawRows[i];
            let row = new RowItem(i);
            for (let j = 0; j < rawRow.length; j++){
                row.addCellToRow(rawRow[j], " ", 1);
            }
            this.state.rows.push(row);
        }
    }

    onCellClick = (cellItem) => {
        cellItem.selected = !cellItem.selected;
        console.log(cellItem);
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
            for (let j = 0; j < row.rowData.length; j++)
            {
                let cell = row.rowData[j];
                if (cell.selected){
                    selectedCells.push(cell);
                }
                else {
                    const selectedCellsLength = selectedCells.length - 1;
                    this.mergeCells(selectedCells);
                    row.rowData.splice(j - selectedCellsLength, selectedCellsLength);

                    selectedCells = [];
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

            firstSelectedCell.plainText = firstSelectedCell.plainText + secondSelectedCell.plainText;
            firstSelectedCell.cipherText = firstSelectedCell.cipherText + secondSelectedCell.cipherText;

            cells.splice(1, 1);
        }
    }

    splitSelectedCells = () => {
        for (let i = 0; i < this.state.rows.length; i++)
        {
            let row = this.state.rows[i];
            for (let j = 0; j < row.rowData.length; j++)
            {
                let cell = row.rowData[j];
                if (cell.selected)
                {
                    if (cell.cipherText.length > 1)
                    {
                        // split cell to multiple cells
                        const splittedCells = this.splitCell(cell);
                        row.rowData.splice(j, 1, ...splittedCells);
                    }
                }
            }
        }

        this.setState({});
    }

    splitCell = (cell) => {
        let splittedCells = [];

        const cellData = cell.cipherText;
        while (splittedCells.length < cellData.length)
        {
            let newCell = new CellItem(cell.cipherText[0], " ", cell.parentRow, cell.indexInRow);
            newCell.selected = true;
            splittedCells.push(newCell);

            cell = new CellItem(cell.cipherText.substring(1), " ", cell.parentRow, cell.indexInRow + 1);
        }

        return splittedCells;
    }
}

class RowItem {
    constructor(rowIndex) {
        this.rowData = [];
        this.rowIndex = rowIndex;
    }

    addCellToRow = (cipherText, plainText) => {
        let cell = new CellItem(cipherText, plainText, this, this.rowData);
        this.rowData.push(cell);
    }
}

class CellItem {
    constructor(cipherText, plainText, parentRow, indexInRow) {
        this.cipherText = cipherText;
        this.plainText = plainText;
        this.selected = false;
        this.parentRow = parentRow;
        this.indexInRow = indexInRow;
    }
}

export default App;
