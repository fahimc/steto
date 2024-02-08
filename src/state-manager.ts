// Define a type for the setter function
type SetStateAction<T> = (value: T) => void;

// Define a type for the return value of useState
type UseStateReturn = [string, SetStateAction<string>];

// StateManager class with strict typing
class StateManager {
  private state: { [key: string]: string } = {};
  private listeners: { [key: string]: ((value: string) => void)[] } = {};

  setState(key: string, value: string): void {
    this.state[key] = value;
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
  }

  getState<T>(key: string): T | undefined {
    return this.state[key] as T;
  }

  subscribe(key: string, callback: (value: string) => void): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);

    // Immediately update the element with the current state value if it exists
    if (this.state[key] !== undefined) {
      callback(this.state[key]);
    }
  }

  // New method to subscribe to HTML content updates
  subscribeHTML(key: string, callback: (value: string) => void): void {
    this.subscribe(key, callback); // Reuse the subscribe method
  }
}

// The useState function with TypeScript typings
function useState(key: string, initialValue: string): UseStateReturn {
  // Initialize state if it doesn't exist
  const currentState = stateManager.getState<string>(key);
  if (currentState === undefined) {
    stateManager.setState(key, initialValue);
  }

  // Function to update the state
  const setState: SetStateAction<string> = (newValue: string) => {
    stateManager.setState(key, newValue);
  };

  return [stateManager.getState(key) as string, setState];
}

function useHTML(
  key: string,
  initialValue: string,
): [string, (newValue: string) => void] {
  const currentState = stateManager.getState<string>(key);
  if (currentState === undefined) {
    stateManager.setState(key, initialValue);
  }

  const setHTML = (newValue: string) => {
    stateManager.setState(key, newValue);
  };

  return [stateManager.getState<string>(key) as string, setHTML];
}

// Creating a single instance of StateManager to be used across the application
const stateManager = new StateManager();

export { useState, useHTML, stateManager };
