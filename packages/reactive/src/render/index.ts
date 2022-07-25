export class Render<T> {
  public constructor(
    private el: HTMLElement,
    private render: (data: T) => string
  ) {}

  public update(value: T) {
    this.el.innerHTML = this.render(value);
  }
}
