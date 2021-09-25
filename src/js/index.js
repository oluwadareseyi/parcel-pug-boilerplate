import AutoBind from "auto-bind";
import each from "lodash/each";

import Case from "./pages/Case";
import Home from "./pages/Home";

class App {
  constructor() {
    AutoBind(this);

    this.url = window.location.pathname;

    this.createCase();
    this.createHome();

    this.pages = {
      "/": this.home,
      "/case": this.case,
    };

    if (this.url.indexOf("/case") > -1) {
      this.page = this.case;
      this.page.onResize();
    } else {
      this.page = this.pages[this.url];
    }

    this.page.show(this.url);

    this.addLinksEventsListeners();
  }

  createHome() {
    this.home = new Home();
  }

  createCase() {
    this.case = new Case();
  }

  async onChange({ push = true, url = null }) {
    url = url.replace(window.location.origin, "");

    if (this.isFetching || this.url === url) return;

    this.isFetching = true;

    this.url = url;

    if (this.canvas) {
      this.canvas.onChange(this.url);
    }

    await this.page.hide();

    if (push) {
      window.history.pushState({}, document.title, url);
    }

    if (this.url.indexOf("/case") > -1) {
      this.page = this.case;
    } else {
      this.page = this.pages[this.url];
    }

    await this.page.show(this.url);

    this.isFetching = false;
  }

  addLinksEventsListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      const isLocal = link.href.indexOf(window.location.origin) > -1;

      if (isLocal) {
        link.onclick = (event) => {
          event.preventDefault();

          this.onChange({
            url: link.href,
          });
        };
      } else if (
        link.href.indexOf("mailto") === -1 &&
        link.href.indexOf("tel") === -1
      ) {
        link.rel = "noopener";
        link.target = "_blank";
      }
    });
  }
}

new App();
