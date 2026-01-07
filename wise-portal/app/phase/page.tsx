'use client';
import { DUMMY_LESSON, PhaseData } from "./dummyData";
import { FaCheck, FaChalkboardTeacher, FaPencilAlt, FaStar } from "react-icons/fa";
import "./phase-style.css";

export default function PhasePage() {
    return (
        <div>
            <PhaseHeader title={DUMMY_LESSON.title} />

            <StepBar currentPhaseId="phase_2" phases={DUMMY_LESSON.phases} />

            <PhaseDescription description={DUMMY_LESSON.description} />

            {/* <CardField /> */}

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
                    <div className="step" key={index}>
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

}

function CardField() {

}

interface CardProps {

}

function Card() {

}

interface FooterProps {

}

function Footer() {

}