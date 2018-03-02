import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Api from './../services/api';
import AddQuestion from './modals/AddQuestion';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        this.loadQuestions();
    }

    loadQuestions() {
        Api.get('/questions').then((results) => {
            if (results) {
                this.setState({questions: results.questions});
            }
        });
    }

    addQuestion(question) {
        let questions = this.state.questions;
        questions.push(question);
        return this.setState({questions: questions});
    }

    render() {
        return(
            <div>
                <div className="container">
                    <h3 className="text-center">Questions/Answers List</h3>
                    <AddQuestion  addQuestion={this.addQuestion.bind(this)}  showMessage={this.props.showMessage} />
                    <div id="accordion">
                        {
                            this.state.questions.length ? (
                                this.state.questions.map((question, questionId) => {
                                    return (
                                        <div className="card" key={questionId}>
                                            <div className="card-header" id={`heading` + questionId}>
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse` + questionId}
                                                            aria-expanded="false" aria-controls={`collapse` + questionId}>
                                                        {question.question}
                                                    </button>
                                                    <Link className="float-right" to={`/question/` + question.uuid}>
                                                        Open question
                                                    </Link>
                                                </h5>
                                            </div>
                                            {
                                                question.Answers ? (
                                                    <div id={`collapse` + questionId} className="collapse" aria-labelledby={`heading` + questionId} data-parent="#accordion">
                                                        <div className="card-body">
                                                            <ul className="answers">
                                                                { question.Answers.map((answer, answerId) => (<li key={answerId}>{ answer.answer }</li>) ) }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    );
                                })
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

