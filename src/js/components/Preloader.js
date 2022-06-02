import Component from "../classes/Component";
import gsap from "gsap";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        numberWrapper: ".preloader__number__wrapper",
        numberText: ".preloader__number",
      },
    });

    this.images = [...document.querySelectorAll("[data-src]")];

    this.length = 0;

    // this.createTransition();
    this.createLoader();
  }

  // createTransition() {
  //   this.transition.show();
  // }

  createLoader() {
    this.images.forEach((image) => {
      const media = new window.Image();
      const src = image.getAttribute("data-src");
      media.crossOrigin = "anonymous";
      media.src = src;

      media.onload = (_) => {
        image.setAttribute("src", src);
        this.onAssetLoaded();
      };
    });
  }

  onAssetLoaded() {
    this.length += 1;

    const percent = this.length / this.images.length;

    const wrapperWidth = this.elements.numberWrapper.offsetWidth;
    const numberWidth = this.elements.numberText.offsetWidth;
    const width = wrapperWidth - numberWidth - 20;

    const translateX = width * percent;

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;

    gsap.to(this.elements.numberText, {
      duration: 0.2,
      ease: "none",
      x: translateX,
    });

    if (percent === 1) {
      setTimeout(() => {
        this.onLoaded();
      }, 1000);
    }
  }

  onLoaded() {
    this.emit("completed");
    const tl = gsap.timeline({
      onComplete: () => {
        this.destroy();
      },
    });

    tl.to(this.element, {
      duration: 0.5,
      autoAlpha: 0,
      ease: "power3.out",
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
