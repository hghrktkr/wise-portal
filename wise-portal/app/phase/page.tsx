'use client';
import { ContentData, DUMMY_LESSON, ExerciseBlock, FeedbackBlock, ImageBlock, LessonData, PhaseData, Question, TextBlock } from "./dummyData";
import { FaCheck, FaChalkboardTeacher, FaPencilAlt, FaStar, FaExclamationTriangle, FaRegCircle, FaTimes } from "react-icons/fa";
import "./phase-style.css";
import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { UserExerciseAttempt } from "./userStorage";
import { getLatestUserExerciseAttemptByPhaseId, saveUserExerciseAttempt } from "./userAttemptsStorage";

export default function PhasePage() {

    // ----- フェーズ管理・ページ表示関係 -----
    
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const scrollToTopRef = useRef<HTMLDivElement>(null);
    const pageData: LessonData = DUMMY_LESSON;
    const currentPhase: PhaseData = pageData.phases[currentPhaseIndex];
    const phaseLength: number = pageData.phases.length;
    const currentPhaseType: 'instruction' | 'exercise' | 'feedback' = currentPhase.type;
    const currentContents: ContentData[] = currentPhase.contents;

    const handleScrollToTopRef = () => {
        scrollToTopRef!.current!.scrollIntoView({
            behavior: "instant",
            block: "center"
        });
    }



    // ----- Exercise採点関係 -----
    
    const [results, setResults] = useState< Record<string, {isCorrect: boolean}> >({});
    const [isSubmitted, setIsSubmitted] = useState< boolean >(false);
    const [unAnsweredCount, setUnansweredCount] = useState< number >(0);
    const [answerSyncKey, setAnswerSyncKey] = useState< number >(0);
    const userAnswersRef = useRef<Record<string, string[]>>({});
    const currentExerciseBlocks: ExerciseBlock[] = currentPhase.type === 'exercise'
                                                                ? currentPhase.contents
                                                                .flatMap(c => c.body)
                                                                .filter(b => b.kind === 'exercise')
                                                                : [];
    const currentQuestions: Question[] = currentExerciseBlocks.flatMap(b => b.question);

    const handleUnansweredCount = () => {
        const updatedUnAnsweredCount: number = currentQuestions.filter(q => (userAnswersRef.current[q.id] ?? []).length === 0).length;
        setUnansweredCount(updatedUnAnsweredCount);
    }

    const handleResults = () => {
        const updatedResults: Record<string, {isCorrect: boolean}> = {};

        currentQuestions.forEach(q => {
            const userAnswer: string[] = userAnswersRef.current[q.id] ?? [];
            const isCorrect = q.answer.length === userAnswer.length &&
            q.answer.every(a => userAnswer.includes(a));
            
            updatedResults[q.id] = {isCorrect: isCorrect};
        });
        setResults(updatedResults);

        const isResultPerfect: boolean = checkIsPerfect(updatedResults, unAnsweredCount);
        const userAttempt: UserExerciseAttempt = {
            attemptId: crypto.randomUUID(),
            phaseId: currentPhase.id,
            isPerfect: isResultPerfect,
            submittedAt: Date.now(),
            userAnswers: structuredClone(updatedResults)
        }

        console.log(userAttempt);
        saveUserExerciseAttempt(userAttempt);
    }

    const handleSubmit = () => {
        handleResults();
        setIsSubmitted(true);
    }

    const handleRetry = (phaseId: string) => {
        const latestUserAttempt: UserExerciseAttempt | undefined = getLatestUserExerciseAttemptByPhaseId(phaseId);
        if(!latestUserAttempt) return;
        
        if(latestUserAttempt.isPerfect) {
            setResults({});
            userAnswersRef.current = {};
            setUnansweredCount(0);
        } else {
            setResults(latestUserAttempt.userAnswers);
        }
        setAnswerSyncKey(key => key + 1);
        setIsSubmitted(false);
    }

    const checkIsPerfect = (
        results:Record<string, {isCorrect: boolean}>,
        unAnsweredCount: number
    ) => {
        return unAnsweredCount === 0 && Object.values(results).every(r => r.isCorrect);
    }
    
    const isPerfect: boolean = isSubmitted && checkIsPerfect(results, unAnsweredCount);

    useEffect(() => {
        setIsSubmitted(false);
        setResults({});
        setUnansweredCount(0);
        userAnswersRef.current = {};
        setAnswerSyncKey(key => key + 1);
    }, [currentPhaseIndex]);

    useEffect(() => {
        if (currentPhase.type !== 'exercise') return;

        const userAttempt = getLatestUserExerciseAttemptByPhaseId(currentPhase.id) ?? undefined;

        if (!userAttempt) {
            // 初回
            setResults({});
            userAnswersRef.current = {};
            setIsSubmitted(false);
            return;
        }

        // 復元
        setResults(userAttempt.userAnswers);
        setIsSubmitted(true);

        const restoredAnswers: Record<string, string[]> = {};
        currentQuestions.forEach(q => {
            const result = userAttempt.userAnswers[q.id];
            restoredAnswers[q.id] = result?.isCorrect
                ? [ ... q.answer]
                : [];
        });
        userAnswersRef.current = restoredAnswers;
        

        // UI 再同期用
        setAnswerSyncKey(k => k + 1);

    }, [currentPhase.id]);


    // ----- Footerボタン制御関係 -----

    const canGoNext = (currentPhase.type !== 'exercise')
                        ? (currentPhaseIndex < phaseLength -1)
                        : (isSubmitted && isPerfect);
    const canGoPrevious = (currentPhase.type !== 'exercise')
                        ? (currentPhaseIndex > 0)
                        : (isSubmitted);


    const goNextPhase = () => {
        if(canGoNext) setCurrentPhaseIndex(currentPhaseIndex + 1);
    }

    const goPrevPhase = () => {
        if(canGoPrevious) setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1));
    }



    // ----- ここから各ブロック -----

    return (
        <div className="phase-page">
            <PhaseHeader title={DUMMY_LESSON.title} />

            <StepBar currentPhaseIndex={currentPhaseIndex} phases={DUMMY_LESSON.phases} phaseLength={phaseLength} />

            <PhaseDescription description={DUMMY_LESSON.description} ref={scrollToTopRef} />

            <CardField currentPhaseType={currentPhaseType} currentContents={currentContents} userAnswersRef={userAnswersRef} results={results?? {}} isSubmitted={isSubmitted} answerSyncKey={answerSyncKey} />

            {currentPhaseType === 'exercise' && <ExerciseSubmitBar questions={currentQuestions} isPerfect={isPerfect} isSubmitted={isSubmitted} onSubmit={handleSubmit} onRetry={handleRetry} phaseId={currentPhase.id} unAnsweredCount={unAnsweredCount} onExerciseFinished={handleUnansweredCount} />}

            <Footer currentPhaseIndex={currentPhaseIndex} phaseLength={phaseLength} canGoNext={canGoNext} canGoPrevious={canGoPrevious} onGoNext={() => {goNextPhase(); handleScrollToTopRef()}} onGoPrevious={goPrevPhase}/>

        </div>
    );
}

interface PhaseHeaderProps {
    title: string;
}

function PhaseHeader({title}: PhaseHeaderProps) {
    return (
        <header className="header-container">
            <div className="header-wrapper">
                <img className="logo-svg" src='/logo/logo-icon.svg' alt="Wise Portal" />
                <h1 className="title">
                    {title}
                </h1>
            </div>
        </header>
    );
}

interface StepBarProps {
    currentPhaseIndex: number;
    phases: PhaseData[];
    phaseLength: number;
}

const STEPBAR_UI = {
    instruction: {
        label: '説明',
        icon: FaChalkboardTeacher
    },
    exercise: {
        label: '練習',
        icon: FaPencilAlt
    },
    feedback: {
        label: '感想',
        icon: FaStar
    }
}

function StepBar({currentPhaseIndex, phases, phaseLength}: StepBarProps) {
    return (
        <div className="step-bar-container">
            {phases.map((phase, index) =>{
                const isFinished: boolean = index < currentPhaseIndex;
                const isCurrent: boolean = index === currentPhaseIndex;
                const ui = STEPBAR_UI[phase.type];

                return (
                    <div className="step" key={phase.id}>
                        <div className="step-content">
                            <div className={`step-label ${isFinished ? 'finished' : isCurrent ? 'current' : ''}`}>
                                {ui.label}
                            </div>
                            <div className={`step-circle ${isFinished ? 'finished' : isCurrent ? 'current' : ''}`}>
                                {isFinished ? <FaCheck color="white"/> : <ui.icon color="white"/>}
                            </div>
                        </div>
                        {index < phaseLength - 1 && <div className={`step-line ${isFinished ? 'finished' : ''}`} ></div>}
                    </div>
                );
            })}
        </div>
    );
}

interface PhaseDescriptionProps {
    description: string;
    ref: React.Ref<HTMLDivElement>;
}

function PhaseDescription({description, ref}: PhaseDescriptionProps) {
    return (
        <div className="description-container" ref={ref} >
            <div className="description">{description}</div>
        </div>
    );
}

interface CardFieldProps {
    currentPhaseType: 'instruction' | 'exercise' | 'feedback';
    currentContents: ContentData[];
    userAnswersRef: React.RefObject<Record<string, string[]>>;
    results?: Record<string, {isCorrect: boolean}>;
    isSubmitted: boolean;
    answerSyncKey: number;
}

function CardField({currentPhaseType, currentContents, userAnswersRef, results, isSubmitted, answerSyncKey}: CardFieldProps) {
    return (
        <div className="card-field-container">
            {currentContents.map((content) => {

                const isExerciseCard = currentPhaseType === 'exercise';
                let isCorrectCard: boolean = false;
                if(isExerciseCard && results !== undefined) {
                    const exerciseCardQuestions: Question[] = content.body.filter(b => b.kind === 'exercise').flatMap(b => b.question).filter(q => q.id);
                    isCorrectCard = exerciseCardQuestions.every(q => results?.[q.id]?.isCorrect === true);
                }

                return (
                    <div className={`card-wrapper ${currentPhaseType} ${isSubmitted ? isCorrectCard ? 'correct' : 'incorrect' : '' }`} key={content.id}>
                        {content.body.map((block) => {
                            switch (block.kind) {
                                case 'text':
                                    return <TextCardBlock key={block.id} item={block}/>;
                                case 'image':
                                    return <ImageCardBlock key={block.id} item={block}/>;
                                case 'exercise':
                                    return <ExerciseCardBlock key={block.id} item={block} userAnswersRef={userAnswersRef} results={results} isSubmitted={isSubmitted} answerSyncKey={answerSyncKey} />;
                                case 'rate':
                                    return <FeedbackCardBlock key={block.id} item={block} isSubmitted={isSubmitted} />
                                case 'comment':
                                    return <FeedbackCardBlock key={block.id} item={block} isSubmitted={isSubmitted} />
                                default:
                                    return null;
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
}

interface TextCardBlockProps {
    item: TextBlock;
}

function TextCardBlock({item}: TextCardBlockProps) {
    return (
        <div className='text-item'>
            <ReactMarkdown 
            >
                {item.value}
            </ReactMarkdown>
        </div>);
}

interface ImageCardBlockProps {
    item: ImageBlock;
}

function ImageCardBlock({item}: ImageCardBlockProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img
                className="image-item"
                loading="lazy"
                src={item.src}
                alt={item.alt ?? ''}
                onClick={() => setIsOpen(true)}
            />
            {isOpen && 
                <div className="image-modal-wrapper" onClick={() => setIsOpen(false)}>
                    < img
                        className="image-modal"
                        src={item.src}
                        alt={item.alt ?? ''}
                    />
                </div>
            }
        </>
    );
}

interface ExerciseCardBlockProps {
    item: ExerciseBlock;
    userAnswersRef: React.RefObject<Record<string, string[]>>;
    results?: Record<string, {isCorrect: boolean}>;
    isSubmitted: boolean;
    answerSyncKey: number;
}

function ExerciseCardBlock({item, userAnswersRef, results, isSubmitted, answerSyncKey}: ExerciseCardBlockProps) {
    const question: Question[] = item.question;

    return (
        <div className="exercise-item" key={item.id}>
            {
                question.map((question) => {
                    return (
                        <ExerciseQuestion key={question.id} question={question} userAnswersRef={userAnswersRef} result={results ? results[question.id] : undefined} isSubmitted={isSubmitted} answerSyncKey={answerSyncKey} />
                    )
                })
            }
        </div>
    );
}

interface ExerciseQuestionProps {
    question: Question;
    userAnswersRef: React.RefObject<Record<string, string[]>>;
    result: {isCorrect : boolean} | undefined;
    isSubmitted: boolean;
    answerSyncKey: number;
}

function ExerciseQuestion({question, userAnswersRef, result, isSubmitted, answerSyncKey}: ExerciseQuestionProps) {
    const id: string = question.id;
    const sentence: undefined | string = question.questionSentence;
    const answerType: 'single' | 'multiple' = question.answerType;
    const currentAnswersRef: string[] = userAnswersRef.current[id] ?? [];
    const [currentAnswers, setCurrentAnswers] = useState<string[]>(currentAnswersRef);
    const isCorrect = result?.isCorrect;

    const handleUserChoices = (choiceId: string) => {
        let updatedAnswers: string[];

        switch (answerType) {
            case 'multiple':
                updatedAnswers = currentAnswers.includes(choiceId)
                    ? currentAnswers.filter(a => a !== choiceId)
                    : [... currentAnswers, choiceId];
                break;
            
            case 'single':
                updatedAnswers = currentAnswers.includes(choiceId)
                    ? []
                    : [choiceId];
                break;
        
            default:
                updatedAnswers = [];
                break;
        }

        setCurrentAnswers(updatedAnswers);
        userAnswersRef.current[id] = updatedAnswers;
    }

    useEffect(() => {
        setCurrentAnswers(userAnswersRef.current[id] ?? []);
    }, [answerSyncKey]);

    return (
        <div className={`question ${isSubmitted ? isCorrect ? 'correct' : 'incorrect' : ''}`} key={id}>
            <ReactMarkdown>{sentence ?? ''}</ReactMarkdown>
            {isSubmitted && 
                <div className="question-result">
                    {isCorrect ? 
                        <div className="question-result correct">
                            <FaRegCircle /> good!
                        </div>
                        :
                        <div className="question-result incorrect">
                            <FaTimes /> bad...
                        </div>
                    }            
                </div>
            }
            <ul className="question-choices">
                {
                    question.choices.map(({id, label}) => {
                        const choiceId = id;

                        return (
                            <li key={choiceId}>
                                <label>
                                    <input 
                                        type={'checkbox'}
                                        name={choiceId}
                                        checked={currentAnswers.includes(choiceId)}
                                        disabled={isSubmitted ? true : isCorrect ? true : false}
                                        onChange={() => handleUserChoices(choiceId)}
                                    />
                                    {label}
                                </label>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

interface FeedbackCardBlockProps {
    item: FeedbackBlock;
    isSubmitted: boolean;
}

function FeedbackCardBlock({item, isSubmitted}: FeedbackCardBlockProps) {
    if(item.kind === 'rate' && item.rate) {
        return (
            <div className="feedback-item">
                <ReactMarkdown>{item.survey_sentence}</ReactMarkdown>
                <ul className="feedback-wrapper rate">
                    {
                        item.rate.map(r => (
                            <li className="feedback-choices" key={r.id}>
                                <label>
                                    <input
                                        type={'checkbox'}
                                        name={item.id}
                                        disabled={isSubmitted}
                                    />
                                {r.label}
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className="feedback-item">
            <ReactMarkdown>{item.survey_sentence}</ReactMarkdown>
            <div className="feedback-wrapper comment">
                <textarea
                    placeholder="きょうは、○○についてのプログラミングをつくりました。"
                    key={item.id}
                    onChange={e => {}}
                    disabled={isSubmitted}
                />
            </div>
        </div>
    )
}

interface ExerciseSubmitBarProps {
    questions: Question[];
    isSubmitted: boolean;
    unAnsweredCount: number;
    isPerfect: boolean;
    onSubmit: () => void;
    onRetry: (phaseId: string) => void;
    phaseId: string;
    onExerciseFinished: () => void;
}

function ExerciseSubmitBar({questions, isSubmitted, unAnsweredCount, isPerfect, onSubmit, onRetry, phaseId, onExerciseFinished}: ExerciseSubmitBarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="submit-bar-container">
            {!isSubmitted && <button className="submit-button check" onClick={() => {setIsModalOpen(true); onExerciseFinished();}}>回答する</button>}
            {isSubmitted && <button className="submit-button check" onClick={() => onRetry(phaseId)}>リトライする</button>}
            {isModalOpen && 
                <div className="exercise-modal-background">
                    <div className="exercise-modal-wrapper">
                        {(unAnsweredCount > 0 &&
                            <div className="exercise-modal-warning">
                                <FaExclamationTriangle />
                                <p>{`未回答の問題が${unAnsweredCount}問あります`}</p>
                            </div>
                        )}
                        <div className="exercise-modal-check">回答を提出しますか？</div>
                        <div className="exercise-modal-button">
                            <button className="button-yes" onClick={() => {onSubmit(), setIsModalOpen(false)}} >回答を提出する</button>
                            <button className="button-no" onClick={() => setIsModalOpen(false)} >キャンセル</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

interface FooterProps {
    currentPhaseIndex: number;
    phaseLength: number;
    canGoNext: boolean;
    canGoPrevious: boolean;
    onGoNext: () => void;
    onGoPrevious: () => void;
}

function Footer({
    currentPhaseIndex,
    phaseLength,
    canGoNext,
    canGoPrevious,
    onGoNext,
    onGoPrevious
}: FooterProps) {
    return (
        <div className="footer-container">
            <button className="phase-change-button previous" disabled={!canGoPrevious} onClick={onGoPrevious}>前へ</button>
            <div className="phase-page-index">{currentPhaseIndex + 1} / {phaseLength}</div>
            <button className="phase-change-button next" disabled={!canGoNext} onClick={onGoNext}>次へ</button>
        </div>
    );
}