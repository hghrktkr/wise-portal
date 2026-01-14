import { UserExerciseAttempt } from "./userStorage";

const STORAGE_KEY: string = 'user_attempts';

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