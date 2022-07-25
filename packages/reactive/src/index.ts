/**
 * @file 普通响应式数据渲染 hello world
 */
import { Dep } from "./pattern/Dep";
import { Observer } from "./pattern/Observer";
import { Watcher } from "./pattern/Watcher";
import { Render } from "./render";

const renderer = new Render(
  document.getElementById("app")!,
  (value: string) => `<div>${value}</div>`
);

const watcher = new Watcher((value: string) => {
  renderer.update(value);
});

const dep = new Dep<string>();
dep.addSub(watcher);

const observer = new Observer<string>("nothing", dep);

setTimeout(() => {
  /**
   * 模拟延迟修改数据
   */
  observer.setState("hello world");
}, 3000);
