import { UserExerciseAttempt, UserFeedbackAttempt } from "./userStorage";

const STORAGE_KEY: string = 'user_exercise_attempts';
const STORAGE_KEY_FEEDBACK: string = 'user_exercise_attempts';

export function loadUserExerciseAttempts(): UserExerciseAttempt[] {
    try {
        const userAttemptsJson = localStorage.getItem(STORAGE_KEY);
        if(!userAttemptsJson) return [];
        return JSON.parse(userAttemptsJson) as UserExerciseAttempt[];
    } catch {
        return [];
    }
}

export function saveUserExerciseAttempt(updatedAttempt: UserExerciseAttempt) {
    const currentUserAttempts = loadUserExerciseAttempts();
    const updatedUserAttempts = [
            ...currentUserAttempts,
            updatedAttempt
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserAttempts));
}

export function getLatestUserExerciseAttemptByPhaseId(phaseId: string): UserExerciseAttempt | undefined {
    return loadUserExerciseAttempts().filter(ua => ua.phaseId === phaseId)
                                .reduce<UserExerciseAttempt | undefined>((latest, current) => {
                                    if(!latest) return current;
                                    return latest.submittedAt > current.submittedAt
                                        ? latest
                                        : current;
                                    }, undefined);
}

export function loadUserFeedbackAttempts(): UserFeedbackAttempt[] {
    try {
        const userAttemptsJson = localStorage.getItem(STORAGE_KEY_FEEDBACK);
        if(!userAttemptsJson) return [];
        return JSON.parse(userAttemptsJson) as UserFeedbackAttempt[];
    } catch {
        return [];
    }
}

export function saveUserFeedbackAttempt(updatedAttempt: UserFeedbackAttempt) {
    const currentUserAttempts = loadUserFeedbackAttempts();
    const updatedUserAttempts = [
            ...currentUserAttempts,
            updatedAttempt
    ];
    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(updatedUserAttempts));
}

export function getLatestUserFeedbackAttemptByPhaseId(phaseId: string): UserFeedbackAttempt | undefined {
    return loadUserFeedbackAttempts().filter(ua => ua.phaseId === phaseId)
                                .reduce<UserFeedbackAttempt | undefined>((latest, current) => {
                                    if(!latest) return current;
                                    return latest.submittedAt > current.submittedAt
                                        ? latest
                                        : current;
                                    }, undefined);
}