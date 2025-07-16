// Alternative approach using module augmentation for more specific form attributes
declare module 'svelte/elements' {
  interface HTMLFormAttributes {
    'netlify-honeypot'?: string;
  }
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
