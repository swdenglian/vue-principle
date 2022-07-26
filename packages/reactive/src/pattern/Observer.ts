import { Dep } from "./Dep";

export class Observer<T> {
  public constructor(private val: T, private dep: Dep<T>) {
    this.setState(val);
  }

  public getState() {
    return this.val;
  }

  public setState(value: T) {
    this.val = value;
    this.dep.notify(this.val);
  }
}
