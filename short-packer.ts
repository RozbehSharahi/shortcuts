import { ShortCut } from "./short-cut";

export const shortPacker = new (class ShortPacker {
  private packs: ShortCut[][] = [];

  constructor() {
    document.addEventListener("keydown", (e) => this.handler(e));
  }

  getCurrentPack(): ShortCut[] {
    return this.packs.slice().reverse()[0] || [];
  }

  set(pack: ShortCut[]): this {
    this.packs = [pack];
    return this;
  }

  push(pack: ShortCut[], inherit = false): this {
    if (!inherit) {
      this.packs.push(pack);
      return this;
    }

    this.packs.push([...this.getCurrentPack(), ...pack]);
    return this;
  }

  pop(): this {
    this.packs.pop();
    return this;
  }

  private handler(e: KeyboardEvent): void {
    for (const shortCut of this.getCurrentPack().slice().reverse()) {
      if (shortCut.match(e)) {
        e.preventDefault();
        shortCut.callAction();
        return;
      }
    }
    return;
  }
})();
