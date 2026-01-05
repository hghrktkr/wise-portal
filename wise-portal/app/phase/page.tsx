'use client';
import { DUMMY_LESSON, PhaseData } from "./dummyData";
import { BarChart, Bar, LabelList, XAxis, YAxis } from "recharts";

export default function PhasePage() {
    return (
        <div>
            <PhaseHeader title={DUMMY_LESSON.title} />

            <ProgressBar currentPhaseId="phase_1" phases={DUMMY_LESSON.phases} />

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

interface ProgressBarProps {
    currentPhaseId: string;
    phases: PhaseData[];
}

function ProgressBar({currentPhaseId, phases}: ProgressBarProps) {

    const phaseIds = phases.map((phase) => {
        return phase.id;
    });

    const phaseLength: number = phaseIds.length;
    const currentPhaseIndex: number = phaseIds.indexOf(currentPhaseId);

    if(currentPhaseIndex === -1) return null;

    const percentage: number = Math.floor((currentPhaseIndex + 1) / phaseLength * 100);
    const left: number = 100 - percentage;
    const data = [
        {name: 'progress', value: percentage},
        {name: 'shadow', value: left}
    ];

    return (
        <BarChart width={1000} height={60} data={data} layout="vertical">
            <Bar dataKey='value' stackId='a' fill="#8884d8" radius={[10, 0, 0, 10]}/>
            <Bar dataKey='value' stackId='a' fill="#888888ff" radius={[0, 10, 10, 0]}/>
            <XAxis type='number' dataKey={'value'} domain={[0, 100]} />
            <YAxis type='category' dataKey={'name'} />
        </BarChart>
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