import React, {Component} from 'react';
import Api from './../../services/api';

export default class AddQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            question: '',
            error: false
        };
        this.questionChanged = this.questionChanged.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    questionChanged(event) {
        if(!this.state.question.length) {
            this.setState({error: true});
        } else {
            this.setState({error: false});
        }
        this.setState({question: event.target.value});
    }

    saveQuestion(event) {
        event.preventDefault();
        Api.post('/questions', {question: this.state.question}).then((results) => {
            this.props.addQuestion(results.question);
            this.state.question = '';
            document.getElementById('close-question-modal').click();
        });
    }

    render() {
        return (
            <div id="add-question">
                <button type="button" className="btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#add-question-modal">
                    Add Question
                </button>
                <div className="modal fade" id="add-question-modal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="add-question-modal-title">Add Question</h5>
                                <button type="button" className="close" id="close-question-modal" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.saveQuestion}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="questionInput" onChange={this.questionChanged} required />
                                        {this.state.error ? (
                                            <div className="alert-danger">Question cannot be empty</div>
                                        ) : "" }
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" value="Add"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}