const STORAGE_KEY = "orquideate_preorder_selection";

export function savePreorderSelection(selection) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
}

export function loadPreorderSelection() {
  try {
    const savedSelection = window.localStorage.getItem(STORAGE_KEY);
    return savedSelection ? JSON.parse(savedSelection) : null;
  } catch {
    return null;
  }
}
