export interface UserExerciseAttempt {
    attemptId: string;
    phaseId: string;
    isPerfect: boolean;
    submittedAt: number;
    userAnswers: Record<string, {isCorrect: boolean}>;
}

export interface UserFeedbackAttempt {
    attemptId: string;
    phaseId: string;
    isPerfect: boolean;
    submittedAt: number;
    rate: Record<string, string[]>;
    comment?: string;
}
