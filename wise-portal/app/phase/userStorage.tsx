interface UserAnswer {
    questionId: string;
    isCorrect: boolean;
}

export interface UserAttempt {
    attemptId: string;
    phaseId: string;
    isPerfect: boolean;
    submittedAt: number;
    userAnswers: UserAnswer[];
}
