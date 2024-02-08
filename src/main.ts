// Exporting key functionalities of the Steto library

// useState function: Provides a way to create and manage state within your application.
// It allows components to re-render or update when the state changes.
export { useState } from './state-manager'; // Adjust the import path as necessary

// useHTML function: Similar to useState, but specifically designed for managing
// and updating the innerHTML of elements, allowing for more complex HTML updates.
export { useHTML } from './state-manager'; // Adjust the import path as necessary

// stateManager: The core state management class instance that allows for state tracking,
// updating, and notifying subscribed components/elements of state changes.
export { stateManager } from './state-manager'; // Adjust the import path as necessary
