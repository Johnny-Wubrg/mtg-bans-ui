import type { CardRationale } from '$lib/models/Card';

export const needsRationaleReview = (rationale?: CardRationale | null): boolean =>
	!!rationale?.aiModel && !rationale.dateApproved;
