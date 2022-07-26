/**
 * @file 封装订阅发布、劫持数据访问
 */
import { Dep } from "./pattern/Dep";
import { Observer } from "./pattern/Observer";
import { Watcher } from "./pattern/Watcher";
import { Render } from "./render";

interface Options<T> {
  data: T;
  render: (data: T) => string;
  mount: HTMLElement;
}

export class View<T extends Object> {
  public $data: T;

  private data: T;
  private renderer: Render<T>;
  private watcher = new Watcher<T>((data) => {
    this.renderer.update(data);
  });
  private dep = new Dep<T>();
  private observer: Observer<T>;

  public constructor(options: Options<T>) {
    const { data, render, mount } = options;

    this.data = data;

    // 装配订阅发布流程
    this.renderer = new Render(mount, render);
    this.dep.addSub(this.watcher);
    this.observer = new Observer({ ...this.data }, this.dep);

    // 代理源数据
    this.$data = this.initData();
  }

  public initData() {
    return new Proxy(this.data, {
      get(target, prop, reciver) {
        return Reflect.get(target, prop, reciver);
      },
      set: (target, prop, value, reciver) => {
        this.observer.setState({
          ...this.observer.getState(),
          [prop]: value,
        });

        return Reflect.set(target, prop, value, reciver);
      },
    });
  }
}
