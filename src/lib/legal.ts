function requireLegalValue(name: string, value: string | undefined) {
	const normalized = value?.trim();

	if (normalized) {
		return normalized;
	}

	if (import.meta.env.PROD) {
		throw new Error(`Die erforderliche Umgebungsvariable ${name} fehlt.`);
	}

	return `[${name} fehlt]`;
}

export const legalDetails = {
	name: requireLegalValue('LEGAL_NAME', import.meta.env.LEGAL_NAME),
	street: requireLegalValue('LEGAL_STREET', import.meta.env.LEGAL_STREET),
	postalCode: requireLegalValue('LEGAL_POSTAL_CODE', import.meta.env.LEGAL_POSTAL_CODE),
	city: requireLegalValue('LEGAL_CITY', import.meta.env.LEGAL_CITY),
	country: requireLegalValue('LEGAL_COUNTRY', import.meta.env.LEGAL_COUNTRY),
	email: requireLegalValue('LEGAL_EMAIL', import.meta.env.LEGAL_EMAIL),
};
