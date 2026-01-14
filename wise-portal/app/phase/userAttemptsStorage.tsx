import { UserAttempt } from "./userStorage";

const STORAGE_KEY: string = 'user_attempts';

export function loadUserAttempts(): UserAttempt[] {
    try {
        const userAttemptsJson = localStorage.getItem(STORAGE_KEY);
        if(!userAttemptsJson) return [];
        return JSON.parse(userAttemptsJson) as UserAttempt[];
    } catch {
        return [];
    }
}

export function saveUserAttempt(updatedAttempt: UserAttempt) {
    const currentUserAttempts = loadUserAttempts();
    const updatedUserAttempts = [
            ...currentUserAttempts,
            updatedAttempt
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserAttempts));
}

export function getLatestUserAttemptByPhaseId(phaseId: string): UserAttempt | undefined {
    return loadUserAttempts().filter(ua => ua.phaseId === phaseId)
                                .reduce<UserAttempt | undefined>((latest, current) => {
                                    if(!latest) return current;
                                    return latest.submittedAt > current.submittedAt
                                        ? latest
                                        : current;
                                    }, undefined);
}