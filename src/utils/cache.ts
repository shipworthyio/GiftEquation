export const cache = {
  get(name: string, defaultValue?: string) {
    if (typeof localStorage === 'undefined') return defaultValue;

    return localStorage.getItem(name);
  },
  set(name: string, value: string) {
    if (typeof localStorage === 'undefined') return;

    localStorage.setItem(name, value);
  },
  remove(name: string) {
    if (typeof localStorage === 'undefined') return;

    localStorage.removeItem(name);
  },
};
