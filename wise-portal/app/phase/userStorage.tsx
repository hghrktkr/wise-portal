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
    rating: Record<string, {rate: 1 | 2 | 3}>;
    comment: string;
}
