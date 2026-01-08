'use client';
import { ContentData, DUMMY_LESSON, ExerciseBlock, ImageBlock, PhaseData, TextBlock } from "./dummyData";
import { FaCheck, FaChalkboardTeacher, FaPencilAlt, FaStar } from "react-icons/fa";
import "./phase-style.css";

export default function PhasePage() {
    const currentPhaseId: string = "phase_1";
    const phaseIds = DUMMY_LESSON.phases.map((phase) => {
        return phase.id;
    });
    const currentPhaseIndex: number = phaseIds.indexOf(currentPhaseId);
    const currentPhaseType: string = DUMMY_LESSON.phases[currentPhaseIndex].type;
    const currentContents: ContentData[] = DUMMY_LESSON.phases[currentPhaseIndex].contents;

    return (
        <div>
            <PhaseHeader title={DUMMY_LESSON.title} />

            <StepBar currentPhaseId={currentPhaseId} phases={DUMMY_LESSON.phases} />

            <PhaseDescription description={DUMMY_LESSON.description} />

            <CardField currentPhaseType={currentPhaseType} currentContents={currentContents} />

            {/* <Footer /> */}

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
    currentPhaseId: string;
    phases: PhaseData[];
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

function StepBar({currentPhaseId, phases}: StepBarProps) {
    const phaseLength: number = phases.length;
    const phaseIds: string[] = phases.map((phase) => {
        return phase.id;
    });
    const currentPhaseIndex: number = phaseIds.indexOf(currentPhaseId);

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
    return (<div className='text-item'>{item.value}</div>);
}

interface ImageCardBlockProps {
    item: ImageBlock;
}

function ImageCardBlock({item}: ImageCardBlockProps) {
    return (<img className="image-item" loading="lazy" src={item.src} alt={item.alt ?? ''}/>);
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

}

function Footer() {

}