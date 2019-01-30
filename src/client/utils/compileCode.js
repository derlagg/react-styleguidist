import type { BubleOptions } from 'buble';

const compile = (code: string): string => transform(code);

const startsWithJsx = (code: string): boolean => !!code.trim().match(/^</);

const wrapCodeInFragment = (code: string): string => `<React.Fragment>${code}</React.Fragment>;`;

/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */

export default function compileCode(
	code: string,
	compilerConfig: BubleOptions,
	onError: (err: Error) => void
): Function<Promise<string>> {
	try {
		const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
		return compile.bind(null, wrappedCode);
	} catch (err) {
		if (onError) {
			onError(err);
		}
	}
	return Promise.resolve();
}

function transform(source: string): Function<Promise<string>> {
	const body = JSON.stringify({ source });
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	return fetch('https://sandbox.arrival.services/transpiler/make', {
		method: 'POST',
		body,
		headers,
		mode: 'cors',
	}).then(async response => {
		if (response.ok) {
			const json = await response.json();
			return json.result.outputText;
		}

		return Promise.reject(response);
	});
}
