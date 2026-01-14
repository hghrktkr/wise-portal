export interface UserAttempt {
    attemptId: string;
    phaseId: string;
    isPerfect: boolean;
    submittedAt: number;
    userAnswers: Record<string, {isCorrect: boolean}>;
}
