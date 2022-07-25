import { Watcher } from "./Watcher";

export class Dep<T> {
  private subs: Watcher<T>[] = [];

  public addSub(watcher: Watcher<T>) {
    this.subs.push(watcher);
  }

  public removeSub(watcher: Watcher<T>) {
    this.subs = this.subs.filter((sub) => sub === watcher);
  }

  public notify(value: T) {
    this.subs.forEach((sub) => sub.update(value));
  }
}
