import { getFormats } from '$lib/api/formats';

export async function load() {
  return {
    formats: await getFormats()
  };
}
