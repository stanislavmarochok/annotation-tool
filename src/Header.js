import React from 'react';
import './Header.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Header extends React.Component {
    render(){


        return (
            <div className={"header-container"}>
                <div className={"header-item header-title"}>Annotations-tool</div>
                <div className={"header-item header-buttons-container"}>

                    <DropdownButton
                        as={ButtonGroup}
                        key={`header-dropdown-button-import`}
                        id={`dropdown-import`}
                        variant={`import`}
                        title={`Import`}>

                        <Dropdown.Item eventKey="1">
                            <input
                                id={"import-txt-file-input"}
                                className={"header-buttons-item-inner"}
                                type={"file"}
                                name={"txt-file"}
                                accept={".txt"}
                                onChange={this.handleImportTxtFile}
                                hidden />
                            <label onClick={this.handleImportTxtCiphertextButtonClick}>Import TXT file</label>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="2">
                            <input
                                id={"import-json-file-input"}
                                className={"header-buttons-item-inner"}
                                type={"file"}
                                name={"json-file"}
                                accept={".json"}
                                onChange={this.handleImportJsonFile}
                                hidden />
                            <label onClick={this.handleImportJsonButtonClick}>Import JSON file</label>
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item eventKey="1">
                            <label
                                className={"header-buttons-item-inner"}
                                onClick={this.props.exportData}>Export data</label>
                        </Dropdown.Item>

                    </DropdownButton>

                    <DropdownButton
                        as={ButtonGroup}
                        key={`header-dropdown-button-operations`}
                        id={`dropdown-operations`}
                        variant={`operations`}
                        title={`Operations`}>

                        <Dropdown.Item eventKey="1">
                            <label
                                className={"header-buttons-item-inner"}
                                onClick={this.props.mergeSelectedCells}>Merge selected cells</label>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="2">
                            <label
                                className={"header-buttons-item-inner"}
                                onClick={this.props.splitSelectedCells}>Split selected cells</label>
                        </Dropdown.Item>

                    </DropdownButton>
                </div>
            </div>
        );
    }

    handleImportTxtCiphertextButtonClick = () => {
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        let input = document.getElementById('import-txt-file-input');
        input.dispatchEvent(clickEvent);
    }

    handleImportJsonButtonClick = () => {
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        let input = document.getElementById('import-json-file-input');
        input.dispatchEvent(clickEvent);
    }

    handleImportTxtFile = async (e) => {
        console.log('Importing txt document');
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);

            document.getElementById("import-txt-file-input").value = null;

            this.props.handleTxtFileImport(text);
        };
        reader.readAsText(e.target.files[0]);
    }

    handleImportJsonFile = async (e) => {
        console.log('Importing json document');
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);

            document.getElementById("import-json-file-input").value = null;

            this.props.handleJsonFileImport(text);
        };
        reader.readAsText(e.target.files[0]);
    }
}

export default Header;