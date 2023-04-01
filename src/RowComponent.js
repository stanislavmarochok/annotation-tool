import React from 'react';
import UpperCellItemComponent from "./UpperCellItemComponent";
import BottomCellItemComponent from "./BottomCellItemComponent";
import './RowComponent.css';

class RowComponent extends React.Component {
    render() {
        return (
            <div className={"row-container"}>
                <div className={"row-idx"}>
                    {`${this.props.row.rowIndex}.`}
                </div>
                <div>
                    <table className={"row-table"}>
                        <tbody>
                        <tr>
                            {this.props.row.rowCells.map((x, idx) => (
                                <td key={`upper-row-cell-${idx}`}>
                                    <UpperCellItemComponent
                                        cellItem={x}
                                        onClick={this.props.onCellClick}
                                        handleCellInputChange={this.props.handleCellInputChange} />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {this.props.row.rowCells.map((x, idx) => (
                                <td key={`bottom-row-cell-${idx}`}>
                                    <BottomCellItemComponent
                                        cellItem={x}
                                        onClick={this.props.onCellClick}
                                        handleCellInputChange={this.props.handleCellInputChange} />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RowComponent;