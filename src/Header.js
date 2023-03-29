import React from 'react';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log('Header constructor here');
    }

    render(){
        return (
            <div className={"header-container"}>
                <div className={"header-item header-title"}>Annotations-tool</div>
                <div className={"header-item header-buttons-container"}>
                    <div className={"header-buttons-item"}>
                        <button className={"header-buttons-item-inner"} onClick={this.props.mergeSelectedCells}>Merge selected cells</button>
                    </div>

                    <div className={"header-buttons-item"}>
                        <button className={"header-buttons-item-inner"} onClick={this.props.splitSelectedCells}>Split selected cells</button>
                    </div>

                    <div className={"header-buttons-item"}>
                        <button className={"header-buttons-item-inner"} onClick={this.props.exportData}>Export data</button>
                    </div>

                    <div className={"header-buttons-item"}>
                        <input id={"import-txt-file-input"} className={"header-buttons-item-inner"} type={"file"} name={"txt-file"} accept={".txt"} onChange={this.handleImportTxtFile} hidden />
                        <label htmlFor={"import-txt-file-input"} className={"import-file-input-label header-buttons-item-inner"}>Import TXT file</label>
                    </div>

                    <div className={"header-buttons-item"}>
                        <input id={"import-json-file-input"} className={"header-buttons-item-inner"} type={"file"} name={"json-file"} accept={".json"} onInput={this.handleImportJsonFile} hidden />
                        <label htmlFor={"import-json-file-input"} className={"import-file-input-label header-buttons-item-inner"}>Import JSON file</label>
                    </div>
                </div>
            </div>
        );
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