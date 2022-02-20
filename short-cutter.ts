import { ShortCut } from "./short-cut";

type Callback = () => void;
type Handler = (e: KeyboardEvent) => void;

export const shortCutter = new (class ShortCutter {
  private listeners: { [key: string]: Handler } = {};

  register(identifier: string, shortCut: ShortCut, callback: Callback): this {
    this.unregister(identifier);

    this.listeners[identifier] = (e) => {
      if (shortCut.isCtrl() !== ShortCutter.isCtrlKeyEvent(e)) return;
      if (shortCut.getKey() !== e.key) return;
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

  private static isCtrlKeyEvent(e: KeyboardEvent): boolean {
    return window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey;
  }
})();
