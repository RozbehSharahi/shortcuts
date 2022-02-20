import { ShortCut } from "./short-cut";

type Handler = (e: KeyboardEvent) => void;

export const shortCutter = new (class ShortCutter {
  private listeners: { [key: string]: Handler } = {};

  register(identifier: string, shortCut: ShortCut): this {
    this.unregister(identifier);

    this.listeners[identifier] = (e) => {
      if (shortCut.match(e)) {
        e.preventDefault();
        shortCut.callAction();
      }
    };

    document.addEventListener("keydown", this.listeners[identifier]);

    return this;
  }

  unregister(identifier: string): this {
    if (!this.listeners[identifier]) return this;
    document.removeEventListener("keydown", this.listeners[identifier]);
    return this;
  }
})();
