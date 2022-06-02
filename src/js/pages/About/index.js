import Page from "../../classes/Page";
import { delay } from "../../utils/math";

export default class extends Page {
  constructor() {
    super({
      classes: {
        active: "about--active",
      },
      element: ".about",
      elements: {
        wrapper: ".about__wrapper",
      },
    });
  }

  show() {
    this.element.classList.add(this.classes.active);

    return super.show();
  }

  async hide() {
    this.element.classList.remove(this.classes.active);

    await delay(400);

    return super.hide();
  }

  onResize() {
    super.onResize();
  }

  update() {
    super.update();
  }
}
