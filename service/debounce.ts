/**
 *
 * @param callback that is called after some delay
 * @param delay in ms
 * @returns a function that restarts the timer on each call, if the function is not called for the given delay, the callback is called
 */
export function debounce<T>(callback: (arg: T) => void, delay = 1000) {
  let timeout: NodeJS.Timeout;

  return (arg: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(arg);
    }, delay);
  };
}
