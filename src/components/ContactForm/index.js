import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

class ContractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', organization: '', issue: '', type: 'partnership'};
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeOrganization = this.onChangeOrganization.bind(this);
        this.onChangeIssue = this.onChangeIssue.bind(this);
        this.onChangeIssueType = this.onChangeIssueType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleFile() {
        var input = document.querySelector( '#attachment' );
        var label	 = input.parentElement;
        var labelVal = label.innerHTML;
        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    }

    onSubmit(event){
        alert(`${this.state.name}, добро пожаловать!`);
        event.preventDefault();
    }

    onChangeOrganization(event){
        this.setState({organization: event.target.value});
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeIssueType(event) {
        this.setState({type: event.target.value});
    }

    onChangeIssue(event){
        this.setState({issue: event.target.value});
    }


    render() {
        return (
            <form id="contact-form" name="myForm" className="form" action="/contacts/create"
                  method="POST" onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label className="form-label" id="nameLabel" htmlFor="name"></label>
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder="Your name" tabIndex="1" value={this.state.name}
                           onChange={this.onChangeName} required/>
                </div>
                <div className="form-group">
                    <label className="form-label" id="organizationLabel" htmlFor="organization"></label>
                    <input type="text" className="form-control" id="organization" name="organization"
                           placeholder="Your organization" tabIndex="2" value={this.state.organization}
                           onChange={this.onChangeOrganization} />
                </div>
                <div className="form-group">
                    <label className="form-label" id="subjectLabel" htmlFor="type"></label>
                    <select name="type" className="form-control" id="type" title="type" tabIndex="3"
                            value={this.state.type} onChange={this.onChangeIssueType}
                            required>
                        <option value="partnership">Partnership</option>
                        <option value="media">Media</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" id="issueLabel" htmlFor="issue"></label>
                    <textarea rows="6" cols="60" name="issue" className="form-control" id="issue"
                              placeholder="Your issue" tabIndex="4" value={this.state.issue}
                              onChange={this.onChangeIssue} required></textarea>
                </div>
                <div className="form-group" id="attachmentSelector">
                    <label className="form-label"></label>
                    <label className="form-control" id="attachmentLabel" htmlFor="attachment"
                           onClick={this.handleFile}>
                        <span style={{color: '#818181'}}>Choose a file...</span>
                    </label>
                    <input type="file" id="attachment" name="attachment" accept="image/*" tabIndex="5"/>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="serv_bottom btn btn-border btn-lg w-100">Send
                        Message
                    </button>
                </div>
            </form>
        )
    }
}

export default ContractForm;