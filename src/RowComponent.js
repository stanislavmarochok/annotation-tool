import React from 'react';
import UpperCellItemComponent from "./UpperCellItemComponent";
import BottomCellItemComponent from "./BottomCellItemComponent";
import './RowComponent.css';

class RowComponent extends React.Component {
    render() {
        return (
            <table cellPadding={0} cellSpacing={0} className={"row-table"}>
                <tbody>
                    <tr>
                        {this.props.rowData.upperRowData.map((x, idx) => (
                            <td key={`upper-row-cell-${idx}`} colSpan={x.colSpan}>
                                <UpperCellItemComponent cellItem={x} onClick={this.props.onCellClick} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {this.props.rowData.bottomRowData.map((x, idx) => (
                            <td key={`bottom-row-cell-${idx}`} colSpan={x.colSpan}>
                                <BottomCellItemComponent cellItem={x} onClick={this.props.onCellClick} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RowComponent;