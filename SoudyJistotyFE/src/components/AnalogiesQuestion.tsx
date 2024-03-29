import React from 'react';
import { Question } from '../types/types';

interface AnalogiesQuestionProps {
    question: Question;
    onAnswerChange: (selectedOptionId: number) => void;
}

const AnalogiesQuestion: React.FC<AnalogiesQuestionProps> = ({ question, onAnswerChange }) => {
    return (
        <div className="container has-text-centered" style={{ marginTop: '20px', maxWidth: '800px', margin: 'auto' }}>
            <div className="box" style={{ padding: '20px', boxShadow: '0 2px 3px rgba(10,10,10,.1)', border: '1px solid #dbdbdb' }}>
                <p className="is-size-4">{question.description}</p>
                <p className="is-size-4">{`${question.firstWord}  -  ?`}</p>
                <div className="columns is-mobile is-multiline" style={{ justifyContent: 'center' }}>
                    <div className="column is-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label className="radio" style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name={`question-${question.ID}`}
                                value={question.option1}
                                onChange={() => onAnswerChange(question.option1)}
                            />
                            <span style={{ marginLeft: '8px' }}>{question.option1Content}</span>
                        </label>
                        <label className="radio" style={{ marginBottom: '10px' }}>
                            <input
                                type="radio"
                                name={`question-${question.ID}`}
                                value={question.option3}
                                onChange={() => onAnswerChange(question.option3)}
                            />
                            <span style={{ marginLeft: '8px' }}>{question.option3Content}</span>
                        </label>
                    </div>
                    <div className="column is-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label className="radio">
                            <input
                                type="radio"
                                name={`question-${question.ID}`}
                                value={question.option2}
                                onChange={() => onAnswerChange(question.option2)}
                            />
                            <span style={{ marginLeft: '8px' }}>{question.option2Content}</span>
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name={`question-${question.ID}`}
                                value={question.option4}
                                onChange={() => onAnswerChange(question.option4)}
                            />
                            <span style={{ marginLeft: '8px' }}>{question.option4Content}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalogiesQuestion;
