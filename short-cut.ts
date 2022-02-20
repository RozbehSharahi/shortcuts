interface Data {
  ctrl?: boolean;
  key: string;
}

export class ShortCut {
  private readonly ctrl: boolean;
  private readonly key: string;

  static ctrlS(): ShortCut {
    return new ShortCut({ ctrl: true, key: "s" });
  }

  static escape(): ShortCut {
    return new ShortCut({ key: "Escape" });
  }

  static delete(): ShortCut {
    return new ShortCut({ key: "Delete" });
  }

  constructor(data: Data) {
    this.ctrl = data.ctrl || false;
    this.key = data.key;
  }

  isCtrl(): boolean {
    return this.ctrl;
  }

  getKey(): string {
    return this.key;
  }
}
