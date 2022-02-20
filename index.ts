type Callback = () => void;
type Handler = (e: KeyboardEvent) => void;

export const shortCutter = new (class ShortCutter {
  private listeners: { [key: string]: Handler } = {};

  register(identifier: string, cut: string, callback: Callback): this {
    this.unregister(identifier);

    const shortCut = ShortCutter.getShortCut(cut);

    this.listeners[identifier] = (e) => {
      if (shortCut.ctrl !== ShortCutter.isCtrlKeyEvent(e)) return;
      if (shortCut.key !== e.key) return;

      e.preventDefault();
      callback();
    };

    document.addEventListener("keydown", this.listeners[identifier]);

    return this;
  }

  unregister(identifier: string): this {
    if (!this.listeners[identifier]) return this;
    document.removeEventListener("keydown", this.listeners[identifier]);
    return this;
  }

  private static getShortCut(cut: string) {
    let ctrl = false;
    let key = cut;

    if (cut.match(/^ctrl+/)) {
      ctrl = true;
      key = cut.split("+")[1];
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
