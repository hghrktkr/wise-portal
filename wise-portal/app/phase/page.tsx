'use client';
import { ContentData, DUMMY_LESSON, ExerciseBlock, ImageBlock, LessonData, PhaseData, TextBlock } from "./dummyData";
import { FaCheck, FaChalkboardTeacher, FaPencilAlt, FaStar } from "react-icons/fa";
import "./phase-style.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PhasePage() {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const pageData: LessonData = DUMMY_LESSON;
    const currentPhase: PhaseData = pageData.phases[currentPhaseIndex];
    const phaseLength: number = pageData.phases.length;
    const currentPhaseType: string = currentPhase.type;
    const currentContents: ContentData[] = currentPhase.contents;

    const canGoNext = (currentPhaseIndex < phaseLength -1) && (currentPhase.type !== 'exercise');
    const canGoPrevious = (currentPhaseIndex > 0) && (currentPhase.type !== 'exercise');


    const goNextPhase = () => {
        if(canGoNext) setCurrentPhaseIndex(currentPhaseIndex + 1);
    }

    const goPrevPhase = () => {
        if(canGoPrevious) setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1));
    }

    return (
        <div>
            <PhaseHeader title={DUMMY_LESSON.title} />

            <StepBar currentPhaseIndex={currentPhaseIndex} phases={DUMMY_LESSON.phases} phaseLength={phaseLength} />

            <PhaseDescription description={DUMMY_LESSON.description} />

            <CardField currentPhaseType={currentPhaseType} currentContents={currentContents} />

            <Footer currentPhaseIndex={currentPhaseIndex} phaseLength={phaseLength} canGoNext={canGoNext} canGoPrevious={canGoPrevious} onGoNext={goNextPhase} onGoPrevious={goPrevPhase}/>

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
}

function PhaseDescription({description}: PhaseDescriptionProps) {
    return (
        <div className="description-container">
            <div className="description">{description}</div>
        </div>
    );
}

interface CardFieldProps {
    currentPhaseType: string;
    currentContents: ContentData[];
}

function CardField({currentPhaseType, currentContents}: CardFieldProps) {
    return (
        <div className="card-field-container">
            {currentContents.map((content) => {
                return (
                    <div className={`card-wrapper ${currentPhaseType}`} key={content.id}>
                        {content.body.map((block) => {
                            switch (block.kind) {
                                case 'text':
                                    return <TextCardBlock key={block.id} item={block}/>;
                                case 'image':
                                    return <ImageCardBlock key={block.id} item={block}/>;
                                case 'exercise':
                                    return <ExerciseCardBlock key={block.id} item={block}/>;
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
}

function ExerciseCardBlock({item}: ExerciseCardBlockProps) {
    return (
        <div className="exercise-block-wrapper">
            <div className="question">{item.question}</div>
        </div>
    )
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