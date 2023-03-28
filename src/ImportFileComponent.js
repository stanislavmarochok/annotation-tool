import React from 'react';

class ImportFileComponent extends React.Component {
    render () {
        return <div>
            <input type={"file"} name={"txt-file"} onChange={this.handleImportTxtDocument} /> <br />
        </div>;
    }

    handleImportTxtDocument = async (e) => {
        console.log('Importing txt document');
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            console.log(text);
        };
        reader.readAsText(e.target.files[0])
    }
}

export default ImportFileComponent;