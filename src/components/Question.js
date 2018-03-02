import React, {Component} from 'react';
import Api from './../services/api';
import { Link } from 'react-router-dom'


export default class Question extends Component {

    constructor() {
        super();
        this.state = {
            question: null,
            answer: ''
        };

        this.answerChanged = this.answerChanged.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
    }

    componentDidMount() {
        this.loadQuestion();
    }

    loadQuestion() {
        Api.get('/questions/' + this.props.match.params.id).then((question) => {
            if (question) {
                this.setState({question: question});
            }
        });
    }

    answerChanged(event) {
        this.setState({answer: event.target.value});
    }

    saveAnswer(event) {
        event.preventDefault();
        const data = {
            uuid: this.props.match.params.id,
            answer: this.state.answer
        };
        Api.post('/answers', data).then((results) => {
            this.props.history.push('/');
        });
    }

    render() {
        return(
            <div className="container">
                <Link to="/">
                    <i className="fa fa-home fa-2x"></i>
                </Link>
                {
                    this.state.question ? (
                        <div className="jumbotron">
                            <h2 className="text-center">{ this.state.question.question }</h2>
                            <h4>Your answer</h4>
                            <div id="answer-form">
                                <form onSubmit={this.saveAnswer}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" onChange={this.answerChanged} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary btn-md" value="Send answer" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : ""
                }
            </div>
        )
    }
}