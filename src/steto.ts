// Assuming StateManager and stateManager are defined as in the previous conversion...

import { stateManager } from './state-manager';

const observeAttributeChanges = (): void => {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      if (
        mutation.type === 'attributes' &&
        (mutation.attributeName === 'state-key' ||
          mutation.attributeName === 'state-html')
      ) {
        const element = mutation.target as HTMLElement;
        const isHTML = mutation.attributeName === 'state-html';
        const stateKey = element.getAttribute(mutation.attributeName);
        if (stateKey) {
          const updateElement = isHTML
            ? (value: string) => {
                element.innerHTML = value;
              }
            : (value: string) => {
                element.textContent = value;
              };
          stateManager.subscribe(stateKey, updateElement);

          const currentState = stateManager.getState<string>(stateKey);
          if (currentState !== undefined) {
            updateElement(currentState);
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['state-key', 'state-html'],
  });
};

const initializeStateKeys = (): void => {
  document.querySelectorAll('[state-key], [state-html]').forEach((element) => {
    const isHTML = element.hasAttribute('state-html');
    const stateKey = isHTML
      ? element.getAttribute('state-html')
      : element.getAttribute('state-key');
    if (stateKey) {
      const updateElement = isHTML
        ? (value: string) => {
            element.innerHTML = value;
          }
        : (value: string) => {
            element.textContent = value;
          };
      stateManager.subscribe(stateKey, updateElement);

      // Initialize content with current state
      const currentState = stateManager.getState<string>(stateKey);
      if (currentState !== undefined) {
        updateElement(currentState);
      }
    }
  });
};

// Start observing when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeStateKeys();
  observeAttributeChanges();
});
