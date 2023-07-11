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
    }

    componentDidMount() {
        // this.createTestData();
    }

    render(){
        return (
            <div className={"whole-page-container"}>
                <Header
                    mergeSelectedCells={this.mergeSelectedCells}
                    splitSelectedCells={this.splitSelectedCells}
                    exportData={this.exportData}
                    handleTxtCiphertextFileImport={this.handleTxtCiphertextFileImport}
                    handleTxtPlaintextFileImport={this.handleTxtPlaintextFileImport}
                    handleJsonFileImport={this.handleJsonFileImport}
                    shiftPlaintextRight={this.shiftPlaintextRight}
                    shiftPlaintextLeft={this.shiftPlaintextLeft}
                    constructKey={this.constructKey}
                />
                <div className={"main-content-container"} onClick={this.handleBackgroundClick}>
                    {this.state.rows.map((x, idx) => (
                        <RowComponent
                            key={`row-component-${idx}`}
                            row={x}
                            onCellClick={this.onCellClick}
                            handleCellInputChange={this.handleCellInputChange}
                        />
                    ))}
                </div>
            </div>
        );
    }

    createTestData = () => {
        let rawRowsText = "6323194643424029339684338344236421282556353\n" +
            "1343233867360002719566437833639234338934572\n" +
            "89114323193836464804239003505141541179438549\n" +
            "0063000570426234412346914216199548914900630\n" +
            "00590424321593643360087036451223006303600590\n";

        let rawRows = rawRowsText.split('\n');
        this.writeRowsCiphertext(rawRows);
    }

    handleBackgroundClick = () => {
        let rows = this.state.rows;

        for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
            let row = rows[rowIdx];
            let rowCells = row.rowCells;
            for (let cellIdx = 0; cellIdx < rowCells.length; cellIdx++){
                let cell = rowCells[cellIdx];
                if (cell.selected){
                    cell.selected = false;
                }
            }
        }

        this.setState({ rows: rows });
    }

    constructKey = () => {
        let key = {};
        let rows = this.state.rows;
        for (let rowIdx = 0; rowIdx < rows.length; rowIdx++){
            let row = rows[rowIdx];
            let rowCells = row.rowCells;
            for (let cellIdx = 0; cellIdx < rowCells.length; cellIdx++) {
                let cell = rowCells[cellIdx];
                let cipherText = cell.cipherText;
                let oldKey = key[cipherText];
                if (!oldKey){
                    key[cipherText] = [];
                    oldKey = key[cipherText];
                }
                if (!oldKey.includes(cell.plainText)){
                    oldKey.push(cell.plainText);
                }
            }
        }

        const stringifiedData = JSON.stringify(key);
        const blob = new Blob([stringifiedData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.download = "constructed_key.json";
        link.href = url;
        link.click();
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

    handleTxtCiphertextFileImport = (fileContent) => {
        console.log(fileContent);
        let rawRows = fileContent.split('\n');
        this.writeRowsCiphertext(rawRows);
    }

    handleTxtPlaintextFileImport = (fileContent) => {
        console.log('txt plaintext file import here');
        let rawRows = fileContent.split('\n');
        this.writeRowsPlaintext(rawRows);
    }

    handleJsonFileImport = (fileJsonContent) => {
        let rows = JSON.parse(fileJsonContent);
        this.setState({ rows: rows });
    }

    writeRowsCiphertext = (ciphertextLines) => {
        let oldRows = this.state.rows;
        if (!oldRows){
            oldRows = [];
        }

        for (let ciphertextLineIdx = 0; ciphertextLineIdx < ciphertextLines.length; ciphertextLineIdx++){
            let ciphertextLine = ciphertextLines[ciphertextLineIdx];
            ciphertextLine = ciphertextLine.trim();
            if (!ciphertextLine)
                continue;

            if (ciphertextLineIdx < oldRows.length){
                let oldRow = oldRows[ciphertextLineIdx];
                for (let j = 0; j < ciphertextLine.length; j++){
                    if (j < oldRow.rowCells.length){
                        let cell = oldRow.rowCells[j];
                        cell.cipherText = ciphertextLine[j];
                    } else {
                        let newCell = new CellItem(ciphertextLine[j], "", oldRow.rowCells.length, ciphertextLineIdx);
                        oldRow.rowCells.push(newCell);
                    }
                }
            } else {
                let row = new RowItem(ciphertextLineIdx);
                for (let j = 0; j < ciphertextLine.length; j++) {
                    let cell = new CellItem(ciphertextLine[j], "", row.rowCells.length, ciphertextLineIdx);
                    row.rowCells.push(cell);
                }
                oldRows.push(row);
            }
        }
        this.setState({ rows: oldRows });
    }

    writeRowsPlaintext = (plaintextLines) => {
        let oldRows = this.state.rows;
        if (!oldRows){
            oldRows = [];
        }

        for (let plaintextLineIdx = 0; plaintextLineIdx < plaintextLines.length; plaintextLineIdx++){
            let plaintextLine = plaintextLines[plaintextLineIdx];
            plaintextLine = plaintextLine.trim();
            if (!plaintextLine)
                continue;

            if (plaintextLineIdx < oldRows.length){
                let oldRow = oldRows[plaintextLineIdx];
                for (let j = 0; j < plaintextLine.length; j++){
                    if (j < oldRow.rowCells.length){
                        let cell = oldRow.rowCells[j];
                        cell.plainText = plaintextLine[j];
                    } else {
                        let newCell = new CellItem("", plaintextLine[j], oldRow.rowCells.length, plaintextLineIdx);
                        oldRow.rowCells.push(newCell);
                    }
                }
            } else {
                let row = new RowItem(plaintextLineIdx);
                for (let j = 0; j < plaintextLine.length; j++) {
                    let cell = new CellItem("", plaintextLine[j], row.rowCells.length, plaintextLineIdx);
                    row.rowCells.push(cell);
                }
                oldRows.push(row);
            }
        }
        console.log(oldRows);
        this.setState({ rows: oldRows });
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
            for (let j = 0; j < row.rowCells.length; j++)
            {
                let cell = row.rowCells[j];
                if (cell.selected){
                    selectedCells.push(cell);
                }
                else {
                    const selectedCellsLength = selectedCells.length - 1;
                    this.mergeCells(selectedCells);
                    row.rowCells.splice(j - selectedCellsLength, selectedCellsLength);

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
            for (let j = 0; j < row.rowCells.length; j++)
            {
                let cell = row.rowCells[j];
                if (cell.selected)
                {
                    if (cell.cipherText.length > 1)
                    {
                        // split cell to multiple cells
                        const splittedCells = this.splitCell(cell);
                        row.rowCells.splice(j, 1, ...splittedCells);
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
            let newCell = new CellItem(cell.cipherText[0], " ", cell.indexInRow, cell.rowIdx);
            newCell.selected = true;
            splittedCells.push(newCell);

            cell = new CellItem(cell.cipherText.substring(1), " ", cell.indexInRow + 1, cell.rowIdx);
        }

        return splittedCells;
    }

    shiftPlaintextRight = () => {
        let rows = this.state.rows;
        for (let rowIdx = 0; rowIdx < rows.length; rowIdx++){
            let row = rows[rowIdx];
            let cells = row.rowCells;

            for (let cellIdx = 0; cellIdx < cells.length; cellIdx++){
                let firstSelectedCellInRow = cells[cellIdx];
                if (firstSelectedCellInRow.selected){
                    console.log(firstSelectedCellInRow);
                    for (let cellIdx2 = row.rowCells.length - 1; cellIdx2 > cellIdx; cellIdx2--){
                        let cell = row.rowCells[cellIdx2];
                        cell.plainText = row.rowCells[cellIdx2 - 1].plainText;
                    }
                    firstSelectedCellInRow.plainText = "";
                    break;
                }
            }
        }
        this.setState({ rows: rows });
    }

    shiftPlaintextLeft = () => {
        let rows = this.state.rows;
        for (let rowIdx = 0; rowIdx < rows.length; rowIdx++){
            let row = rows[rowIdx];
            let cells = row.rowCells;

            for (let cellIdx = 0; cellIdx < cells.length; cellIdx++){
                let firstSelectedCellInRow = cells[cellIdx];
                if (firstSelectedCellInRow.selected){
                    for (let cellIdx2 = cellIdx - 1; cellIdx2 < row.rowCells.length - 1; cellIdx2++){
                        if (cellIdx2 < 0){
                            continue;
                        }
                        let cell = row.rowCells[cellIdx2];
                        cell.plainText = row.rowCells[cellIdx2 + 1].plainText;
                    }
                    row.rowCells[row.rowCells.length - 1].plainText = "";
                    cellIdx += 1;
                }
            }
        }
        this.setState({ rows: rows });
    }
}

class RowItem {
    constructor(rowIndex) {
        this.rowCells = [];
        this.rowIndex = rowIndex;
    }
}

class CellItem {
    constructor(cipherText, plainText, indexInRow, rowIdx) {
        this.cipherText = cipherText;
        this.plainText = plainText;
        this.selected = false;
        this.indexInRow = indexInRow;
        this.rowIdx = rowIdx;
    }
}

export default App;
