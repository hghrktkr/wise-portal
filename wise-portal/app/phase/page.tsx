import { DUMMY_LESSON } from "./dummyData";

export default function PhasePage() {
    return (
        <div>
            <PhaseHeader title={DUMMY_LESSON.title} />

            <main>
            <PhaseDescription description={DUMMY_LESSON.description} />
            
            </main>

            <footer>

            </footer>
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

interface PhaseDescriptionProps {
    description: string;
}

function PhaseDescription({description}: PhaseDescriptionProps) {
    return (
        <h2>{description}</h2>
    );
}