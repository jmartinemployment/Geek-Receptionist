/**
 * What a Server Action hands back to the form that ran it. An action that succeeds leaves the page with redirect() and never returns;
 * one that fails returns the sentence to show, so a failure is always on screen and never a silent nothing.
 */
export type ActionState = { error: string | null };

export const idle: ActionState = { error: null };
