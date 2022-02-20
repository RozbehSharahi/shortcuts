type ActionCallback = () => void;

interface Data {
  label?: string;
  ctrl?: boolean;
  key: string;
  action: ActionCallback;
}

export class ShortCut {
  private readonly ctrl: boolean;
  private readonly key: string;
  private readonly label: string;
  private readonly action: ActionCallback;

  static ctrlS(action: ActionCallback): ShortCut {
    return new ShortCut({ ctrl: true, key: "s", action });
  }

  static escape(action: ActionCallback): ShortCut {
    return new ShortCut({ key: "Escape", action });
  }

  static delete(action: ActionCallback): ShortCut {
    return new ShortCut({ key: "Delete", action });
  }

  constructor(data: Data) {
    this.ctrl = data.ctrl || false;
    this.key = data.key;
    this.label = data.label || "No-Label";
    this.action = data.action;
  }

  isCtrl(): boolean {
    return this.ctrl;
  }

  getKey(): string {
    return this.key;
  }

  getLabel(): string {
    return this.label;
  }

  getAction(): ActionCallback {
    return this.action;
  }

  callAction(): ReturnType<ActionCallback> {
    return this.action();
  }

  match(event: KeyboardEvent): boolean {
    return (
      this.getKey() === event.key &&
      this.isCtrl() === ShortCut.isCtrlKeyEvent(event)
    );
  }

  private static isCtrlKeyEvent(e: KeyboardEvent): boolean {
    return window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey;
  }
}
