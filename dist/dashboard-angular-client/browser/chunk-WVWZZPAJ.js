import {
  SLOTS as SLOTS2,
  defineCustomElement as defineCustomElement6
} from "./chunk-DX74DLMZ.js";
import {
  SLOTS,
  defineCustomElement as defineCustomElement4,
  defineCustomElement2 as defineCustomElement5
} from "./chunk-5ONFBRNP.js";
import {
  debounce
} from "./chunk-JBURWZNO.js";
import {
  defineCustomElement as defineCustomElement3
} from "./chunk-465AJW6S.js";
import "./chunk-7EZUGEA5.js";
import "./chunk-X4S4TKMY.js";
import "./chunk-72M5GKY2.js";
import {
  defineCustomElement as defineCustomElement2
} from "./chunk-7ECGKAQ3.js";
import {
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "./chunk-GDL33722.js";
import "./chunk-FKCGCAMX.js";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  updateMessages
} from "./chunk-IS26GY2Q.js";
import {
  componentFocusable,
  setComponentLoaded,
  setUpLoadableComponent
} from "./chunk-4FJCBU32.js";
import {
  connectLocalized,
  disconnectLocalized
} from "./chunk-JBUNIVRU.js";
import {
  defineCustomElement
} from "./chunk-C2JOZR4W.js";
import {
  createObserver
} from "./chunk-BCFQVY5Y.js";
import "./chunk-ETVX3AES.js";
import "./chunk-74MUOVY4.js";
import {
  focusFirstTabbable,
  getElementDir,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement
} from "./chunk-A6NVT5LC.js";
import {
  DEBOUNCE
} from "./chunk-SYPHL3WL.js";
import {
  H,
  Host,
  createEvent,
  forceUpdate,
  h,
  proxyCustomElement
} from "./chunk-FUPSM3TL.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@esri/calcite-components/dist/components/ExpandToggle.js
var groupBufferPx = 2;
var getAverage = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
var geActionDimensions = (actions) => {
  const actionsNotSlotted = actions.filter((action) => action.slot !== SLOTS2.menuActions);
  const actionLen = actionsNotSlotted?.length;
  return {
    actionWidth: actionLen ? getAverage(actionsNotSlotted.map((action) => action.clientWidth || 0)) : 0,
    actionHeight: actionLen ? getAverage(actionsNotSlotted.map((action) => action.clientHeight || 0)) : 0
  };
};
var getMaxActionCount = ({ width, actionWidth, layout, height, actionHeight, groupCount }) => {
  const maxContainerPx = layout === "horizontal" ? width : height;
  const avgItemPx = layout === "horizontal" ? actionWidth : actionHeight;
  return Math.floor((maxContainerPx - groupCount * groupBufferPx) / avgItemPx);
};
var getOverflowCount = ({ layout, actionCount, actionWidth, width, actionHeight, height, groupCount }) => {
  return Math.max(actionCount - getMaxActionCount({ width, actionWidth, layout, height, actionHeight, groupCount }), 0);
};
var queryActions = (el) => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) => action.closest("calcite-action-menu") ? action.slot === SLOTS.trigger : true);
};
var overflowActions = ({ actionGroups, expanded, overflowCount }) => {
  let needToSlotCount = overflowCount;
  actionGroups.reverse().forEach((group) => {
    let slottedWithinGroupCount = 0;
    const groupActions = queryActions(group).reverse();
    groupActions.forEach((groupAction) => {
      if (groupAction.slot === SLOTS2.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });
    if (needToSlotCount > 0) {
      groupActions.some((groupAction) => {
        const unslottedActions = groupActions.filter((action) => !action.slot);
        if (unslottedActions.length > 1 && groupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", SLOTS2.menuActions);
          slottedWithinGroupCount++;
          if (slottedWithinGroupCount > 1) {
            needToSlotCount--;
          }
        }
        return needToSlotCount < 1;
      });
    }
    forceUpdate(group);
  });
};
var ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  return position || el.closest("calcite-shell-panel")?.position || "start";
}
function toggleChildActionText({ el, expanded }) {
  queryActions(el).filter((el2) => el2.slot !== SLOTS2.menuActions).forEach((action) => action.textEnabled = expanded);
  el.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((el2) => el2.expanded = expanded);
}
var setTooltipReference = ({ tooltip, referenceElement, expanded, ref }) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement ? referenceElement : null;
  }
  if (ref) {
    ref(referenceElement);
  }
  return referenceElement;
};
var ExpandToggle = ({ expanded, expandText, collapseText, expandLabel, collapseLabel, toggle, el, position, tooltip, ref, scale }) => {
  const rtl = getElementDir(el) === "rtl";
  const text = expanded ? collapseText : expandText;
  const label = expanded ? collapseLabel : expandLabel;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = h("calcite-action", { icon: expanded ? expandIcon : collapseIcon, id: "expand-toggle", label, onClick: toggle, ref: (referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref }), scale, text, textEnabled: expanded, title: !expanded && !tooltip ? text : null });
  return actionNode;
};

// node_modules/@esri/calcite-components/dist/components/calcite-action-bar.js
var CSS = {
  actionGroupEnd: "action-group--end"
};
var SLOTS3 = {
  actionsEnd: "actions-end",
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
};
var actionBarCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{pointer-events:auto;display:inline-flex;align-self:stretch;gap:var(--calcite-action-bar-items-space, 0)}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]){overflow-y:auto}:host([layout=vertical]):host([expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]){overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:var(--calcite-border-width-sm)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}";
var CalciteActionBarStyle0 = actionBarCss;
var ActionBar = /* @__PURE__ */ proxyCustomElement(class ActionBar2 extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 6);
    this.mutationObserver = createObserver("mutation", () => {
      const { el, expanded } = this;
      toggleChildActionText({ el, expanded });
      this.overflowActions();
    });
    this.resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));
    this.actionMenuOpenHandler = (event) => {
      if (event.target.menuOpen) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.resizeHandlerEntries = (entries) => {
      entries.forEach(this.resizeHandler);
    };
    this.resizeHandler = (entry) => {
      const { width, height } = entry.contentRect;
      this.resize({ width, height });
    };
    this.resize = debounce(({ width, height }) => {
      const { el, expanded, expandDisabled, layout, overflowActionsDisabled } = this;
      if (overflowActionsDisabled || layout === "vertical" && !height || layout === "horizontal" && !width) {
        return;
      }
      const actions = queryActions(el);
      const actionCount = expandDisabled ? actions.length : actions.length + 1;
      const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
      this.setGroupLayout(actionGroups);
      const groupCount = this.hasActionsEnd || this.hasBottomActions || !expandDisabled ? actionGroups.length + 1 : actionGroups.length;
      const { actionHeight, actionWidth } = geActionDimensions(actions);
      const overflowCount = getOverflowCount({
        layout,
        actionCount,
        actionHeight,
        actionWidth,
        height,
        width,
        groupCount
      });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    }, DEBOUNCE.resize);
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
      this.calciteActionBarToggle.emit();
    };
    this.handleDefaultSlotChange = (event) => {
      const groups = slotChangeGetAssignedElements(event).filter((el) => el.matches("calcite-action-group"));
      this.setGroupLayout(groups);
    };
    this.handleActionsEndSlotChange = (event) => {
      this.hasActionsEnd = slotChangeHasAssignedElement(event);
    };
    this.handleBottomActionsSlotChange = (event) => {
      this.hasBottomActions = slotChangeHasAssignedElement(event);
    };
    this.handleTooltipSlotChange = (event) => {
      const tooltips = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
      this.expandTooltip = tooltips[0];
    };
    this.actionsEndGroupLabel = void 0;
    this.expandDisabled = false;
    this.expanded = false;
    this.layout = "vertical";
    this.overflowActionsDisabled = false;
    this.overlayPositioning = "absolute";
    this.position = void 0;
    this.scale = void 0;
    this.messages = void 0;
    this.messageOverrides = void 0;
    this.effectiveLocale = void 0;
    this.hasActionsEnd = false;
    this.hasBottomActions = false;
    this.expandTooltip = void 0;
    this.defaultMessages = void 0;
  }
  expandHandler() {
    this.overflowActions();
  }
  expandedHandler() {
    const { el, expanded } = this;
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }
  layoutHandler() {
    this.updateGroups();
  }
  overflowDisabledHandler(overflowActionsDisabled) {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }
    this.resizeObserver?.observe(this.el);
    this.overflowActions();
  }
  onMessagesChange() {
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentDidLoad() {
    const { el, expanded } = this;
    setComponentLoaded(this);
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }
  connectedCallback() {
    const { el, expanded } = this;
    connectLocalized(this);
    connectMessages(this);
    toggleChildActionText({ el, expanded });
    this.mutationObserver?.observe(el, { childList: true, subtree: true });
    if (!this.overflowActionsDisabled) {
      this.resizeObserver?.observe(el);
    }
    this.overflowActions();
    connectConditionalSlotComponent(this);
  }
  componentWillLoad() {
    return __async(this, null, function* () {
      setUpLoadableComponent(this);
      yield setUpMessages(this);
    });
  }
  disconnectedCallback() {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Overflows actions that won't fit into menus.
   *
   * @internal
   */
  overflowActions() {
    return __async(this, null, function* () {
      this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
    });
  }
  /**
   * Sets focus on the component's first focusable element.
   */
  setFocus() {
    return __async(this, null, function* () {
      yield componentFocusable(this);
      focusFirstTabbable(this.el);
    });
  }
  updateGroups() {
    this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group")));
  }
  setGroupLayout(groups) {
    groups.forEach((group) => group.layout = this.layout);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, el, position, toggleExpand, scale, layout, messages, actionsEndGroupLabel, overlayPositioning } = this;
    const expandToggleNode = !expandDisabled ? h(ExpandToggle, { collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded, position, scale, toggle: toggleExpand, tooltip: this.expandTooltip }) : null;
    return h("calcite-action-group", { class: CSS.actionGroupEnd, hidden: this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions), label: actionsEndGroupLabel, layout, overlayPositioning, scale }, h("slot", { name: SLOTS3.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), h("slot", { name: SLOTS3.bottomActions, onSlotchange: this.handleBottomActionsSlotChange }), h("slot", { name: SLOTS3.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode);
  }
  render() {
    return h(Host, { key: "ff6e365531a0ed2032864bb0777910c3932e9c6b", onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("slot", { key: "f12b2f455752a62ee32b65224bed385940135a49", onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup());
  }
  static get assetsDirs() {
    return ["assets"];
  }
  get el() {
    return this;
  }
  static get watchers() {
    return {
      "expandDisabled": ["expandHandler"],
      "expanded": ["expandedHandler"],
      "layout": ["layoutHandler"],
      "overflowActionsDisabled": ["overflowDisabledHandler"],
      "messageOverrides": ["onMessagesChange"],
      "effectiveLocale": ["effectiveLocaleChange"]
    };
  }
  static get style() {
    return CalciteActionBarStyle0;
  }
}, [1, "calcite-action-bar", {
  "actionsEndGroupLabel": [1, "actions-end-group-label"],
  "expandDisabled": [516, "expand-disabled"],
  "expanded": [1540],
  "layout": [513],
  "overflowActionsDisabled": [516, "overflow-actions-disabled"],
  "overlayPositioning": [513, "overlay-positioning"],
  "position": [513],
  "scale": [513],
  "messages": [1040],
  "messageOverrides": [1040],
  "effectiveLocale": [32],
  "hasActionsEnd": [32],
  "hasBottomActions": [32],
  "expandTooltip": [32],
  "defaultMessages": [32],
  "overflowActions": [64],
  "setFocus": [64]
}, void 0, {
  "expandDisabled": ["expandHandler"],
  "expanded": ["expandedHandler"],
  "layout": ["layoutHandler"],
  "overflowActionsDisabled": ["overflowDisabledHandler"],
  "messageOverrides": ["onMessagesChange"],
  "effectiveLocale": ["effectiveLocaleChange"]
}]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-action-bar", "calcite-action", "calcite-action-group", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-popover"];
  components.forEach((tagName) => {
    switch (tagName) {
      case "calcite-action-bar":
        if (!customElements.get(tagName)) {
          customElements.define(tagName, ActionBar);
        }
        break;
      case "calcite-action":
        if (!customElements.get(tagName)) {
          defineCustomElement3();
        }
        break;
      case "calcite-action-group":
        if (!customElements.get(tagName)) {
          defineCustomElement6();
        }
        break;
      case "calcite-action-menu":
        if (!customElements.get(tagName)) {
          defineCustomElement5();
        }
        break;
      case "calcite-icon":
        if (!customElements.get(tagName)) {
          defineCustomElement();
        }
        break;
      case "calcite-loader":
        if (!customElements.get(tagName)) {
          defineCustomElement2();
        }
        break;
      case "calcite-popover":
        if (!customElements.get(tagName)) {
          defineCustomElement4();
        }
        break;
    }
  });
}
defineCustomElement$1();
var CalciteActionBar = ActionBar;
var defineCustomElement7 = defineCustomElement$1;
export {
  CalciteActionBar,
  defineCustomElement7 as defineCustomElement
};
/*! Bundled license information:

@esri/calcite-components/dist/components/ExpandToggle.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)

@esri/calcite-components/dist/components/calcite-action-bar.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-WVWZZPAJ.js.map
