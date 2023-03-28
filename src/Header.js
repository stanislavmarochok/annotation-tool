import React from 'react';
import './Header.css';
import ImportFileComponent from "./ImportFileComponent";

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log('Header constructor here');
    }

    render(){
        return (
            <div className={"header-container"}>
                <table>
                    <tbody>
                        <tr>
                            <td width={"40%"}><div className={"header-title"}>Annotations-tool</div></td>

                            <td><button onClick={this.props.mergeSelectedCells}>Merge selected cells</button></td>
                            <td><button onClick={this.props.splitSelectedCells}>Split selected cells</button></td>
                            <td><ImportFileComponent /></td>
                        </tr>
                    </tbody>
                </table>
                <div className={"header-buttons"}>



                </div>
            </div>
        );
    }
}

export default Header;