/**
 * @file 普通响应式数据渲染 hello world
 */
import { View } from "./View";

const view = new View({
  data: {
    msg: "yooo",
  },
  render: (data) => `<div>${data.msg}</div>`,
  mount: document.getElementById("app")!,
});

setTimeout(() => {
  /**
   * 模拟延迟修改数据
   */
  view.$data.msg = "hello world, yooo";
}, 3000);
