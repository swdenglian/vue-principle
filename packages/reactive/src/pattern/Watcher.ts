export class Watcher<T> {
  public constructor(private cb: (value: T) => void) {}
  public update(value: T) {
    this.cb(value);
  }
}
