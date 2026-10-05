import {
  createObserver
} from "./chunk-BCFQVY5Y.js";
import {
  isBrowser
} from "./chunk-ETVX3AES.js";
import {
  getElementDir,
  toAriaBoolean
} from "./chunk-A6NVT5LC.js";
import {
  H,
  Host,
  getAssetPath,
  h,
  proxyCustomElement
} from "./chunk-FUPSM3TL.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@esri/calcite-components/dist/components/icon.js
var CSS = {
  icon: "icon",
  flipRtl: "flip-rtl"
};
var iconCache = {};
var requestCache = {};
var scaleToPx = {
  s: 16,
  m: 24,
  l: 32
};
function generateIconId({ icon, scale }) {
  const size = scaleToPx[scale];
  const name = normalizeIconName(icon);
  const filled = name.charAt(name.length - 1) === "F";
  const iconName = filled ? name.substring(0, name.length - 1) : name;
  return `${iconName}${size}${filled ? "F" : ""}`;
}
function fetchIcon(props) {
  return __async(this, null, function* () {
    const cachedIconKey = generateIconId(props);
    const cachedIconData = getCachedIconDataByKey(cachedIconKey);
    if (cachedIconData) {
      return cachedIconData;
    }
    if (!requestCache[cachedIconKey]) {
      requestCache[cachedIconKey] = fetch(getAssetPath(`./assets/icon/${cachedIconKey}.json`)).then((resp) => resp.json()).catch(() => {
        console.error(`"${cachedIconKey}" is not a valid calcite-ui-icon name`);
        return "";
      });
    }
    const path = yield requestCache[cachedIconKey];
    iconCache[cachedIconKey] = path;
    return path;
  });
}
function getCachedIconData(props) {
  return getCachedIconDataByKey(generateIconId(props));
}
function getCachedIconDataByKey(id) {
  return iconCache[id];
}
function normalizeIconName(name) {
  const numberLeadingName = !isNaN(Number(name.charAt(0)));
  const parts = name.split("-");
  const kebabCased = parts.length > 0;
  if (kebabCased) {
    const firstNonDigitInPartPattern = /[a-z]/i;
    name = parts.map((part, partIndex) => {
      return part.replace(firstNonDigitInPartPattern, function replacer(match, offset) {
        const isFirstCharInName = partIndex === 0 && offset === 0;
        if (isFirstCharInName) {
          return match;
        }
        return match.toUpperCase();
      });
    }).join("");
  }
  return numberLeadingName ? `i${name}` : name;
}
var iconCss = ":host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}";
var CalciteIconStyle0 = iconCss;
var Icon = /* @__PURE__ */ proxyCustomElement(class Icon2 extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.icon = null;
    this.flipRtl = false;
    this.scale = "m";
    this.textLabel = void 0;
    this.pathData = void 0;
    this.visible = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (!this.visible) {
      this.waitUntilVisible(() => {
        this.visible = true;
        this.loadIconPathData();
      });
    }
  }
  disconnectedCallback() {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
  }
  render() {
    const { el, flipRtl, pathData, scale, textLabel } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];
    const semantic = !!textLabel;
    const paths = [].concat(pathData || "");
    return h(Host, { key: "724265acdc6fb528bf7b25d7ec445c73a63f4c8e", "aria-hidden": toAriaBoolean(!semantic), "aria-label": semantic ? textLabel : null, role: semantic ? "img" : null }, h("svg", { key: "864ee2d80bebd282543ba5d94c57f84b48a6204d", "aria-hidden": "true", class: {
      [CSS.flipRtl]: dir === "rtl" && flipRtl,
      svg: true
    }, fill: "currentColor", height: "100%", viewBox: `0 0 ${size} ${size}`, width: "100%", xmlns: "http://www.w3.org/2000/svg" }, paths.map((path) => typeof path === "string" ? h("path", { d: path }) : h("path", { d: path.d, opacity: "opacity" in path ? path.opacity : 1 }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  loadIconPathData() {
    return __async(this, null, function* () {
      const { icon, scale, visible } = this;
      if (!isBrowser() || !icon || !visible) {
        return;
      }
      const fetchIconProps = { icon, scale };
      const pathData = getCachedIconData(fetchIconProps) || (yield fetchIcon(fetchIconProps));
      if (icon !== this.icon) {
        return;
      }
      this.pathData = pathData;
    });
  }
  waitUntilVisible(callback) {
    this.intersectionObserver = createObserver("intersection", (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = null;
          callback();
        }
      });
    }, { rootMargin: "50px" });
    if (!this.intersectionObserver) {
      callback();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  static get assetsDirs() {
    return ["assets"];
  }
  get el() {
    return this;
  }
  static get watchers() {
    return {
      "icon": ["loadIconPathData"],
      "scale": ["loadIconPathData"]
    };
  }
  static get style() {
    return CalciteIconStyle0;
  }
}, [1, "calcite-icon", {
  "icon": [513],
  "flipRtl": [516, "flip-rtl"],
  "scale": [513],
  "textLabel": [1, "text-label"],
  "pathData": [32],
  "visible": [32]
}, void 0, {
  "icon": ["loadIconPathData"],
  "scale": ["loadIconPathData"]
}]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-icon"];
  components.forEach((tagName) => {
    switch (tagName) {
      case "calcite-icon":
        if (!customElements.get(tagName)) {
          customElements.define(tagName, Icon);
        }
        break;
    }
  });
}
defineCustomElement();

export {
  Icon,
  defineCustomElement
};
/*! Bundled license information:

@esri/calcite-components/dist/components/icon.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-C2JOZR4W.js.map
