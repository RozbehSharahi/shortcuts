type Callback = () => void;
type Handler = (e: KeyboardEvent) => void;

export const shortCuts = new (class Shortcuts {
  private listeners: { [key: string]: Handler } = {};

  register(
    identifier: string,
    shortCutDescription: string,
    callback: Callback
  ): this {
    this.unregister(identifier);

    const shortCut = Shortcuts.getShortCut(shortCutDescription);

    this.listeners[identifier] = (e) => {
      if (shortCut.ctrl !== Shortcuts.isCtrlKeyEvent(e)) return;
      if (shortCut.key !== e.key) return;

      e.preventDefault();
      callback();
    };

    document.addEventListener("keydown", this.listeners[identifier]);

    return this;
  }

  unregister(identifier: string): this {
    document.removeEventListener("keydown", this.listeners[identifier]);
    return this;
  }

  private static getShortCut(shortCutDescription: string) {
    let ctrl = false;
    let key = shortCutDescription;

    if (shortCutDescription.match(/^ctrl+/)) {
      ctrl = true;
      key = shortCutDescription.split("+")[1];
    }

    return {
      ctrl,
      key,
    };
  }

  private static isCtrlKeyEvent(e: KeyboardEvent): boolean {
    return window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey;
  }
})();
