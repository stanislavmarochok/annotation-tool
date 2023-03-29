import './App.css';
import React from 'react';
import RowComponent from "./RowComponent";
import Header from "./Header";

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
            <>
                <Header
                    mergeSelectedCells={this.mergeSelectedCells}
                    splitSelectedCells={this.splitSelectedCells}
                    exportData={this.exportData}
                    handleTxtFileImport={this.handleTxtFileImport}
                    handleJsonFileImport={this.handleJsonFileImport} />
                <div className={"main-content-container"}>
                    {this.state.rows.map((x, idx) => (
                        <RowComponent
                            key={`row-component-${idx}`}
                            row={x}
                            onCellClick={this.onCellClick}
                            handleCellInputChange={this.handleCellInputChange}
                        />
                    ))}
                </div>
            </>
        );
    }

    createTestData = () => {
        // todo: remove this function later

        let rawRowsText = "6323194643424029339684338344236421282556353\n" +
            "1343233867360002719566437833639234338934572\n" +
            "89114323193836464804239003505141541179438549\n" +
            "0063000570426234412346914216199548914900630\n" +
            "00590424321593643360087036451223006303600590\n";

        let rawRows = rawRowsText.split('\n');
        this.writeRows(rawRows);
    }

    exportData = () => {
        console.log("exporting data");
        const stringifiedData = JSON.stringify(this.state.rows);
        const blob = new Blob([stringifiedData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.download = "data.json";
        link.href = url;
        link.click();
    }

    handleTxtFileImport = (fileContent) => {
        console.log(fileContent);
        let rawRows = fileContent.split('\n');
        this.writeRows(rawRows);
    }

    handleJsonFileImport = (fileJsonContent) => {
        let rows = JSON.parse(fileJsonContent);
        this.setState({ rows: rows });
    }

    writeRows = (rawRows) => {
        let rows = [];
        for (let i = 0; i < rawRows.length; i++){
            let rawRow = rawRows[i];
            let row = new RowItem(i);
            for (let j = 0; j < rawRow.length; j++){
                let cell = new CellItem(rawRow[j], " ", row.rowData.length);
                row.rowData.push(cell);
            }
            rows.push(row);
        }
        this.setState({ rows: rows });
    }

    onCellClick = (cellItem) => {
        cellItem.selected = !cellItem.selected;
        console.log(cellItem);
        this.setState({});
    }

    handleCellInputChange = (cellItem, newValue) => {
        cellItem.plainText = newValue;
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
            let newCell = new CellItem(cell.cipherText[0], " ", cell.indexInRow);
            newCell.selected = true;
            splittedCells.push(newCell);

            cell = new CellItem(cell.cipherText.substring(1), " ", cell.indexInRow + 1);
        }

        return splittedCells;
    }
}

class RowItem {
    constructor(rowIndex) {
        this.rowData = [];
        this.rowIndex = rowIndex;
    }
}

class CellItem {
    constructor(cipherText, plainText, indexInRow) {
        this.cipherText = cipherText;
        this.plainText = plainText;
        this.selected = false;
        this.indexInRow = indexInRow;
    }
}

export default App;
