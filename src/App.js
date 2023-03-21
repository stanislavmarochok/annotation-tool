import './App.css';
import React from 'react';
import RowComponent from "./RowComponent";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
        this.state.rows.push(
            new RowItem([
                new CellItem("a", 1),
                new CellItem("b", 1),
                new CellItem("c", 1)
            ], [
                new CellItem("1", 1),
                new CellItem("2", 1),
                new CellItem("3", 1)
            ])
        );

        this.selectedCells = [];
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
        if (cellItem.selected){
            this.selectedCells.push(cellItem);
        } else {
            let indexOfItemToRemove = this.selectedCells.indexOf(cellItem);
            this.selectedCells.splice(indexOfItemToRemove, 1);
        }
        this.setState({});
        console.log(this.selectedCells);
    }

    mergeSelectedCells = () => {
        let selectedCells = this.state.rows.
        for (let i = 0; i < this.selectedCells.length; i++){
            let firstCell = this.selectedCells[i];
            let secondCell = this.selectedCells[i + 1];
            if (firstCell != null && secondCell != null){
                firstCell.data = firstCell.data + secondCell.data;
                firstCell.colSpan = firstCell.colSpan + secondCell.colSpan;

                // remove second cell from selectedCells
                let indexOfItemToRemove = this.selectedCells.indexOf(secondCell);
                this.selectedCells.splice(indexOfItemToRemove, 1);

                // remove second cell from all cells
                // todo: add to cell a reference to parent row
                indexOfItemToRemove = this.state.rows[0].upperRowData.indexOf(secondCell);
                this.state.rows[0].upperRowData.splice(indexOfItemToRemove, 1);
            }
        }
        this.setState({});
    }
}

class RowItem {
    constructor(upperRowData, bottomRowData) {
        this.upperRowData = upperRowData;
        this.bottomRowData = bottomRowData;
    }
}

class CellItem {
    constructor(data, colSpan) {
        this.data = data;
        this.colSpan = colSpan;
        this.selected = false;
    }
}

export default App;
