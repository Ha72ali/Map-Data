import {
  f
} from "./chunk-KAYLJTQW.js";
import {
  k
} from "./chunk-OG5YPY7V.js";
import {
  w
} from "./chunk-BYMJUQYJ.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  n
} from "./chunk-V7ZPXZOX.js";
import {
  s
} from "./chunk-BTPDOHVM.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/widgets/support/globalCss.js
var e2 = { anchor: "esri-widget__anchor", anchorDisabled: "esri-widget__anchor--disabled", button: "esri-button", buttonDisabled: "esri-button--disabled", buttonHalf: "esri-button--half", buttonSecondary: "esri-button--secondary", buttonSmall: "esri-button--small", buttonTertiary: "esri-button--tertiary", buttonThird: "esri-button--third", disabled: "esri-disabled", empty: "esri-widget__content--empty", emptyIllustration: "esri-widget__content-illustration--empty", heading: "esri-widget__heading", hidden: "esri-hidden", input: "esri-input", interactive: "esri-interactive", loader: "esri-widget__loader", loaderAnimation: "esri-widget__loader-animation", loaderText: "esri-widget__loader-text", menu: "esri-menu", menuHeader: "esri-menu__header", menuItem: "esri-menu__list-item", menuItemActive: "esri-menu__list-item--active", menuItemFocus: "esri-menu__list-item--focus", menuList: "esri-menu__list", panel: "esri-widget--panel", panelHeightOnly: "esri-widget--panel-height-only", primaryTick: "primary-tick", primaryTickAmPm: "primary-tick__ampm", primaryTickLabel: "primary-tick__label", rotating: "esri-rotating", secondaryTick: "secondary-tick", select: "esri-select", table: "esri-widget__table", widget: "esri-widget", widgetButton: "esri-widget--button", widgetButtonActive: "esri-widget--button-active", widgetDisabled: "esri-widget--disabled" };

// node_modules/@arcgis/core/widgets/support/decorators/vmEvent.js
function e3(e5) {
  return (a3) => {
    a3.hasOwnProperty("_delegatedEventNames") || (a3._delegatedEventNames = a3._delegatedEventNames ? a3._delegatedEventNames.slice() : []);
    const n3 = a3._delegatedEventNames, r3 = Array.isArray(e5) ? e5 : t(e5);
    n3.push(...r3);
  };
}
function t(e5) {
  return e5.split(",").map((e6) => e6.trim());
}

// node_modules/@arcgis/core/geometry/support/geometryUtils.js
function n2(e5) {
  switch (e5?.type) {
    case "point":
      return e5;
    case "extent":
      return e5.center;
    case "polygon":
      return e5.centroid;
    case "multipoint":
    case "polyline":
      return e5.extent?.center;
    default:
      return null;
  }
}
function r(e5, t4) {
  return __async(this, null, function* () {
    if (e5.hasZ || "2d" === t4.type)
      return e5;
    const n3 = t4.map?.ground;
    if (!n3?.layers.length)
      return e5;
    const { geometry: r3 } = yield n3.queryElevation(e5, { cache: t4.basemapTerrain?.elevationQueryCache });
    return r3;
  });
}
function a2(e5, t4, n3) {
  return i(e5.center, t4, n3);
}
function c(e5, t4, n3) {
  switch (e5?.type) {
    case "extent":
      return e5;
    case "multipoint":
    case "polygon":
    case "polyline":
      return e5.extent;
    case "point":
      return i(e5, t4, n3);
    default:
      return null;
  }
}
function i(n3, r3, a3) {
  const c2 = n3.hasZ ? n3.z : void 0;
  if (r3?.map) {
    return (null != a3 ? f(r3, a3) : r3.extent).clone().centerAt(n3).set({ zmax: c2, zmin: c2 });
  }
  const { x: i3, y: o2, spatialReference: u } = n3;
  return new w({ xmin: i3 - 0.25, ymin: o2 - 0.25, xmax: i3 + 0.25, ymax: o2 + 0.25, spatialReference: u, zmin: c2, zmax: c2 });
}

// node_modules/@arcgis/core/widgets/support/legacyIcon.js
var i2 = { checkMark: "esri-icon-check-mark", close: "esri-icon-close", collapse: "esri-icon-collapse", down: "esri-icon-down", downArrow: "esri-icon-down-arrow", dragHorizontal: "esri-icon-drag-horizontal", dragVertical: "esri-icon-drag-vertical", duplicate: "esri-icon-duplicate", expand: "esri-icon-expand", fontFallbackText: "esri-icon-font-fallback-text", forward: "esri-icon-forward", handleVertical: "esri-icon-handle-vertical", icon: "esri-icon", left: "esri-icon-left", loadingIndicator: "esri-icon-loading-indicator", locateCircled: "esri-icon-locate-circled", minus: "esri-icon-minus", noticeTriangle: "esri-icon-notice-triangle", pause: "esri-icon-pause", play: "esri-icon-play", plus: "esri-icon-plus", radioChecked: "esri-icon-radio-checked", radioUnchecked: "esri-icon-radio-unchecked", refresh: "esri-icon-refresh", reverse: "esri-icon-reverse", right: "esri-icon-right", search: "esri-icon-search", swap: "esri-icon-swap", table: "esri-icon-table", trash: "esri-icon-trash", up: "esri-icon-up", upArrow: "esri-icon-up-arrow", upDownArrows: "esri-icon-up-down-arrows", urbanModel: "esri-icon-urban-model", zoomInMagnifyingGlass: "esri-icon-zoom-in-magnifying-glass", zoomToObject: "esri-icon-zoom-to-object" };

// node_modules/@arcgis/core/widgets/support/GoTo.js
var t2 = (t4) => {
  let i3 = class extends t4 {
    constructor(...o2) {
      super(...o2), this.goToOverride = null, this.view = null;
    }
    callGoTo(o2) {
      const { view: e5 } = this;
      return n(e5), this.goToOverride ? this.goToOverride(e5, o2) : e5.goTo(o2.target, o2.options);
    }
  };
  return e([y()], i3.prototype, "goToOverride", void 0), e([y()], i3.prototype, "view", void 0), i3 = e([a("esri.widgets.support.GoTo")], i3), i3;
};

// node_modules/@arcgis/core/widgets/support/decorators/accessibleHandler.js
function t3() {
  return function(n3, t4) {
    if (!n3[t4])
      throw new TypeError(`Cannot auto bind undefined function '${String(t4)}'`);
    return { value: r2(n3[t4]) };
  };
}
function e4(n3) {
  const t4 = n3?.type;
  return n3 instanceof KeyboardEvent || "keyup" === t4 || "keydown" === t4 || "keypress" === t4;
}
function r2(t4) {
  return function(r3, ...o2) {
    e4(r3) ? k(r3.key) && (r3.preventDefault(), r3.stopPropagation(), r3.target.click()) : t4.call(this, r3, ...o2);
  };
}

// node_modules/@arcgis/core/core/a11yUtils.js
var o = () => s.respectPrefersReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export {
  n2 as n,
  r,
  a2 as a,
  c,
  e2 as e,
  i2 as i,
  t3 as t,
  e3 as e2,
  o,
  t2
};
//# sourceMappingURL=chunk-ENW6M73Z.js.map
