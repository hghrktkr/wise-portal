'use client';
import { DUMMY_LESSON, PhaseData } from "./dummyData";
import { FaCheck } from "react-icons/fa";
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
        <header>
            <h1>
                {title}
            </h1>
        </header>
    );
}

interface StepBarProps {
    currentPhaseId: string;
    phases: PhaseData[];
}

function StepBar({currentPhaseId, phases}: StepBarProps) {
    const phaseLength: number = phases.length;
    const phaseIds: string[] = phases.map((phase) => {
        return phase.id;
    });
    const phaseTypes = phases.map((phase) =>{
        switch (phase.type) {
            case 'instruction':
                return '📝説明'
            
            case 'exercise':
                return '✏️練習'

            case 'feedback':
                return '⭐感想'
            default:
                break;
        }
    })
    const currentPhaseIndex: number = phaseIds.indexOf(currentPhaseId);

    return (
        <div className="step-bar-container">
            {phaseTypes.map((label, index) =>{
                const isFinished = index < currentPhaseIndex;
                const isCurrent = index === currentPhaseIndex;

                return (
                    <div className="step" key={index}>
                        <div className="step-content">
                            <div className={`step-label ${isFinished ? 'finished' : isCurrent ? 'current' : ''}`}>
                                {label}
                            </div>
                            <div className={`step-circle ${isFinished ? 'finished' : isCurrent ? 'current' : ''}`}>
                                {isFinished && <FaCheck color="white"/>}
                            </div>
                        </div>

                        {index < phaseLength - 1 && <div className={`step-line ${isFinished ? 'finished' : ''}`}></div>}

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
        <h2>{description}</h2>
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