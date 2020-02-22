import { createStore } from '@stencil/store';


export const Frameworks = ['Angular', 'React', 'Vue', 'JavaScript'] as const;
export const Runtimes = ['Capacitor', 'Cordova'] as const;

export interface DocsStore {
  framework: typeof Frameworks[number];
  runtime: typeof Runtimes[number];
  valid: {[key: string]: any};
}

const initialValues: DocsStore = {
  framework: localStorage.getItem('ionic-docs:framework') as any ?? 'Angular',
  runtime: localStorage.getItem('ionic-docs:runtime') as any ?? 'Capacitor',
  valid: {
    framework: Frameworks,
    runtime: Runtimes
  }
};

const { state, subscribe } = createStore(initialValues);

subscribe(operation => {
  // prevent infinite loops when we read state values inside here
  if (operation === 'get') return;

  for (const [key, validValues] of Object.entries(initialValues.valid)) {
    const currentlySaved = getSaved(key);
    if (
      currentlySaved &&
      currentlySaved !== state[key] &&
      validValues.indexOf(state[key] !== -1)) {

        console.log('saving!', key, state[key]);
        setSaved(key, state[key]);
    }
  }
});

export default state;



function getSaved(key: string): string {
  try {
    return localStorage.getItem(`ionic-docs:${key}`);
  } catch (error) {
    console.warn(`Unable to get key "${key}" from localStorage:`, error);
    return null;
  }
}

function setSaved(key: string, value: string): string {
  try {
    if (localStorage.getItem(`ionic-docs:${key}`) === value) {
      return value;
    }

    localStorage.setItem(`ionic-docs:${key}`, value);
    notify(key, value);
    return value;
  } catch (error) {
    console.warn(`Unable to set key "${key}" of localStorage:`, error);
    return null;
  }
}

function notify(key: string, value: string) {
  if (window && typeof window.dispatchEvent === 'function') {
    const detail = { key, value };
    window.dispatchEvent(new CustomEvent('local-storage', { detail }));
  }
}
