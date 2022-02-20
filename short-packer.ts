import { ShortCut } from "./short-cut";

type Pack = {
  shortCut: ShortCut;
  label: string;
  method: () => void;
}[];

export const shortPacker = new (class ShortPacker {
  private packs: Pack[] = [];

  constructor() {
    document.addEventListener("keydown", (e) => this.handler(e));
  }

  getCurrent(): Pack {
    return this.packs.slice().reverse()[0] || [];
  }

  set(pack: Pack): this {
    this.packs = [pack];
    return this;
  }

  push(pack: Pack): this {
    this.packs.push(pack);
    return this;
  }

  pop(): this {
    this.packs.pop();
    return this;
  }

  private handler(e: KeyboardEvent): void {
    for (const cut of this.getCurrent()) {
      if (
        cut.shortCut.isCtrl() === ShortPacker.isCtrlEvent(e) &&
        cut.shortCut.getKey() === e.key
      ) {
        e.preventDefault();
        cut.method();
        return;
      }
    }
    return;
  }

  private static isCtrlEvent(e: KeyboardEvent): boolean {
    return window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey;
  }
})();
