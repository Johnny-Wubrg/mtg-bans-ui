const HIDE_KEY = 'mtgbans:hideRationaleVoting';

export const isRationaleFeedbackHidden = (): boolean => localStorage.getItem(HIDE_KEY) === 'true';

export const setRationaleFeedbackHidden = (hidden: boolean): void => {
	if (hidden) localStorage.setItem(HIDE_KEY, 'true');
	else localStorage.removeItem(HIDE_KEY);
};
