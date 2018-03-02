const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const Model = require('./models');
const Question = Model.Question;
const Answer = Model.Answer;

router.get('/questions/:uuid?', async (req, res, next) => {
    try {
        if(req.params.uuid) {
            const question = await Question.findOne({
                where: {
                    uuid: req.params.uuid
                }
            });

            if(!question) {
                return res.status(400).json({ message: 'Question not found' });
            }

            res.status(200).json(question);
        } else {
            const questions = await Question.findAll({
                include: [Answer]
            });
            res.status(200).json({questions: questions});
        }
    } catch(err) {
        next(err);
    }
});

router.post('/questions', async (req, res, next) => {
    try {
        if(!req.body.question) {
            throw new Error('Question cannot be empty');
        }

        const question = await Question.create({
            question: req.body.question,
            uuid: uuid()
        });

        res.status(200).json({
            success: true,
            message: 'Question added successfully',
            question: question
        });
    } catch(err) {
        next(err);
    }
});

router.post('/answers', async (req, res, next) => {
    try {
        if(!req.body.uuid || !req.body.answer) {
            throw new Error('Invalid request');
        }

        const question = await Question.findOne({
            where: {
                uuid: req.body.uuid
            }
        });

        if(!question) {
            return res.status(400).json({
                success: false,
                message: 'Question not found'
            });
        }

        const answer = await Answer.create({
            questionId: question.id,
            answer: req.body.answer
        });

        res.status(200).json({
            success: true,
            message: 'Answer stored successfully'
        });
    } catch(err) {
        next(err);
    }
});


module.exports = router;