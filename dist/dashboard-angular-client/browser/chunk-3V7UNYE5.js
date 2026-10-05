import {
  Heading,
  SLOTS,
  defaultEndMenuPlacement,
  defineCustomElement as defineCustomElement5,
  defineCustomElement2 as defineCustomElement6
} from "./chunk-5ONFBRNP.js";
import "./chunk-JBURWZNO.js";
import {
  defineCustomElement as defineCustomElement4
} from "./chunk-465AJW6S.js";
import {
  InteractiveContainer,
  updateHostInteraction
} from "./chunk-7EZUGEA5.js";
import "./chunk-X4S4TKMY.js";
import {
  defineCustomElement as defineCustomElement3
} from "./chunk-RX2I4UHE.js";
import "./chunk-72M5GKY2.js";
import {
  defineCustomElement as defineCustomElement2
} from "./chunk-7ECGKAQ3.js";
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
  slotChangeHasAssignedElement,
  toAriaBoolean
} from "./chunk-A6NVT5LC.js";
import "./chunk-SYPHL3WL.js";
import {
  H,
  Host,
  createEvent,
  h,
  proxyCustomElement
} from "./chunk-FUPSM3TL.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@esri/calcite-components/dist/components/panel.js
var CSS = {
  actionBarContainer: "action-bar-container",
  backButton: "back-button",
  container: "container",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  header: "header",
  headerContainer: "header-container",
  headerContainerBorderEnd: "header-container--border-end",
  heading: "heading",
  summary: "summary",
  description: "description",
  headerContent: "header-content",
  headerActions: "header-actions",
  headerActionsEnd: "header-actions--end",
  headerActionsStart: "header-actions--start",
  contentWrapper: "content-wrapper",
  fabContainer: "fab-container",
  footer: "footer",
  footerContent: "footer-content",
  footerActions: "footer-actions",
  footerStart: "footer-start",
  footerEnd: "footer-end"
};
var IDS = {
  close: "close",
  collapse: "collapse"
};
var ICONS = {
  close: "x",
  menu: "ellipsis",
  backLeft: "chevron-left",
  backRight: "chevron-right",
  expand: "chevron-down",
  collapse: "chevron-up"
};
var SLOTS2 = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerEnd: "footer-end",
  footerStart: "footer-start",
  footerActions: "footer-actions"
};
var panelCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}:host([scale=s]){--calcite-internal-panel-default-padding:var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding:10px}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-panel-default-padding:var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-lg)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-panel-default-padding:var(--calcite-spacing-xl);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-xxl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0);line-height:1.25rem}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;border-block-start:1px solid var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.container{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-color-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-color-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-color-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;outline-color:transparent;padding:var(--calcite-panel-content-space, 0);background:var(--calcite-panel-background-color, var(--calcite-color-background))}.content-wrapper:focus-visible{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content-top,.content-bottom{padding:var(--calcite-internal-panel-default-padding)}.header-content{flex:1 1 auto;padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-padding)}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-color-border-3);padding:var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-padding))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-padding)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-padding)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-padding)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}";
var CalcitePanelStyle0 = panelCss;
var Panel = /* @__PURE__ */ proxyCustomElement(class Panel2 extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calcitePanelClose = createEvent(this, "calcitePanelClose", 6);
    this.calcitePanelToggle = createEvent(this, "calcitePanelToggle", 6);
    this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 6);
    this.resizeObserver = createObserver("resize", () => this.resizeHandler());
    this.resizeHandler = () => {
      const { panelScrollEl } = this;
      if (!panelScrollEl || typeof panelScrollEl.scrollHeight !== "number" || typeof panelScrollEl.offsetHeight !== "number") {
        return;
      }
      const hasScrollingContent = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight;
      if (hasScrollingContent) {
        panelScrollEl.setAttribute("tabindex", "0");
      } else {
        panelScrollEl.removeAttribute("tabindex");
      }
    };
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.panelKeyDownHandler = (event) => {
      if (this.closable && event.key === "Escape" && !event.defaultPrevented) {
        this.handleUserClose();
        event.preventDefault();
      }
    };
    this.handleUserClose = () => {
      this.closed = true;
      this.calcitePanelClose.emit();
    };
    this.open = () => {
      this.isClosed = false;
    };
    this.close = () => __async(this, null, function* () {
      const beforeClose = this.beforeClose ?? (() => Promise.resolve());
      try {
        yield beforeClose();
      } catch (_error) {
        requestAnimationFrame(() => {
          this.closed = false;
        });
        return;
      }
      this.isClosed = true;
    });
    this.collapse = () => {
      this.collapsed = !this.collapsed;
      this.calcitePanelToggle.emit();
    };
    this.panelScrollHandler = () => {
      this.calcitePanelScroll.emit();
    };
    this.handleHeaderActionsStartSlotChange = (event) => {
      this.hasStartActions = slotChangeHasAssignedElement(event);
    };
    this.handleHeaderActionsEndSlotChange = (event) => {
      this.hasEndActions = slotChangeHasAssignedElement(event);
    };
    this.handleHeaderMenuActionsSlotChange = (event) => {
      this.hasMenuItems = slotChangeHasAssignedElement(event);
    };
    this.handleActionBarSlotChange = (event) => {
      const actionBars = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-bar"));
      actionBars.forEach((actionBar) => actionBar.layout = "horizontal");
      this.hasActionBar = !!actionBars.length;
    };
    this.handleHeaderContentSlotChange = (event) => {
      this.hasHeaderContent = slotChangeHasAssignedElement(event);
    };
    this.handleFabSlotChange = (event) => {
      this.hasFab = slotChangeHasAssignedElement(event);
    };
    this.handleFooterActionsSlotChange = (event) => {
      this.hasFooterActions = slotChangeHasAssignedElement(event);
    };
    this.handleFooterEndSlotChange = (event) => {
      this.hasFooterEndContent = slotChangeHasAssignedElement(event);
    };
    this.handleFooterStartSlotChange = (event) => {
      this.hasFooterStartContent = slotChangeHasAssignedElement(event);
    };
    this.handleFooterSlotChange = (event) => {
      this.hasFooterContent = slotChangeHasAssignedElement(event);
    };
    this.contentBottomSlotChangeHandler = (event) => {
      this.hasContentBottom = slotChangeHasAssignedElement(event);
    };
    this.contentTopSlotChangeHandler = (event) => {
      this.hasContentTop = slotChangeHasAssignedElement(event);
    };
    this.setPanelScrollEl = (el) => {
      this.panelScrollEl = el;
      this.resizeObserver?.disconnect();
      if (el) {
        this.resizeObserver?.observe(el);
        this.resizeHandler();
      }
    };
    this.handleAlertsSlotChange = (event) => {
      slotChangeGetAssignedElements(event)?.map((el) => {
        if (el.nodeName === "CALCITE-ALERT") {
          el.embedded = true;
        }
      });
    };
    this.beforeClose = void 0;
    this.closed = false;
    this.disabled = false;
    this.closable = false;
    this.collapsed = false;
    this.collapseDirection = "down";
    this.collapsible = false;
    this.headingLevel = void 0;
    this.loading = false;
    this.heading = void 0;
    this.description = void 0;
    this.menuFlipPlacements = void 0;
    this.menuOpen = false;
    this.menuPlacement = defaultEndMenuPlacement;
    this.messageOverrides = void 0;
    this.messages = void 0;
    this.overlayPositioning = "absolute";
    this.scale = "m";
    this.isClosed = false;
    this.hasStartActions = false;
    this.hasEndActions = false;
    this.hasMenuItems = false;
    this.hasHeaderContent = false;
    this.hasActionBar = false;
    this.hasContentBottom = false;
    this.hasContentTop = false;
    this.hasFab = false;
    this.hasFooterActions = false;
    this.hasFooterContent = false;
    this.hasFooterEndContent = false;
    this.hasFooterStartContent = false;
    this.defaultMessages = void 0;
    this.effectiveLocale = "";
    this.showHeaderContent = false;
  }
  toggleDialog(value) {
    value ? this.close() : this.open();
  }
  onMessagesChange() {
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
  }
  componentWillLoad() {
    return __async(this, null, function* () {
      setUpLoadableComponent(this);
      this.isClosed = this.closed;
      yield setUpMessages(this);
    });
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  disconnectedCallback() {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Sets focus on the component's first focusable element.
   */
  setFocus() {
    return __async(this, null, function* () {
      yield componentFocusable(this);
      focusFirstTabbable(this.containerEl);
    });
  }
  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns - promise that resolves once the content is scrolled to.
   */
  scrollContentTo(options) {
    return __async(this, null, function* () {
      this.panelScrollEl?.scrollTo(options);
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeaderContent() {
    const { heading, headingLevel, description, hasHeaderContent } = this;
    const headingNode = heading ? h(Heading, { class: CSS.heading, level: headingLevel }, heading) : null;
    const descriptionNode = description ? h("span", { class: CSS.description }, description) : null;
    return !hasHeaderContent && (headingNode || descriptionNode) ? h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, descriptionNode) : null;
  }
  renderActionBar() {
    return h("div", { class: CSS.actionBarContainer, hidden: !this.hasActionBar }, h("slot", { name: SLOTS2.actionBar, onSlotchange: this.handleActionBarSlotChange }));
  }
  renderHeaderSlottedContent() {
    return h("div", { class: CSS.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, h("slot", { name: SLOTS2.headerContent, onSlotchange: this.handleHeaderContentSlotChange }));
  }
  renderHeaderStartActions() {
    const { hasStartActions } = this;
    return h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, h("slot", { name: SLOTS2.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange }));
  }
  renderHeaderActionsEnd() {
    const { hasEndActions, messages, closable, collapsed, collapseDirection, collapsible, hasMenuItems } = this;
    const { collapse, expand, close } = messages;
    const icons = [ICONS.expand, ICONS.collapse];
    if (collapseDirection === "up") {
      icons.reverse();
    }
    const collapseNode = collapsible ? h("calcite-action", { "aria-expanded": toAriaBoolean(!collapsed), "aria-label": collapse, icon: collapsed ? icons[0] : icons[1], id: IDS.collapse, onClick: this.collapse, scale: this.scale, text: collapse, title: collapsed ? expand : collapse }) : null;
    const closeNode = closable ? h("calcite-action", { "aria-label": close, icon: ICONS.close, id: IDS.close, onClick: this.handleUserClose, scale: this.scale, text: close, title: close }) : null;
    const slotNode = h("slot", { name: SLOTS2.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange });
    const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;
    return h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, this.renderMenu(), collapseNode, closeNode);
  }
  renderMenu() {
    const { hasMenuItems, messages, menuOpen, menuFlipPlacements, menuPlacement } = this;
    return h("calcite-action-menu", { flipPlacements: menuFlipPlacements ?? ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: messages.options, open: menuOpen, overlayPositioning: this.overlayPositioning, placement: menuPlacement }, h("calcite-action", { icon: ICONS.menu, scale: this.scale, slot: SLOTS.trigger, text: messages.options }), h("slot", { name: SLOTS2.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange }));
  }
  renderHeaderNode() {
    const { hasHeaderContent, hasStartActions, hasEndActions, closable, collapsible, hasMenuItems, hasActionBar } = this;
    const headerContentNode = this.renderHeaderContent();
    const showHeaderContent = hasHeaderContent || !!headerContentNode || hasStartActions || hasEndActions || collapsible || closable || hasMenuItems;
    this.showHeaderContent = showHeaderContent;
    return h("header", { class: CSS.header, hidden: !(showHeaderContent || hasActionBar) }, h("div", { class: { [CSS.headerContainer]: true, [CSS.headerContainerBorderEnd]: hasActionBar }, hidden: !showHeaderContent }, this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd()), this.renderActionBar(), this.renderContentTop());
  }
  renderFooterNode() {
    const { hasFooterEndContent, hasFooterStartContent, hasFooterContent, hasFooterActions } = this;
    const showFooter = hasFooterStartContent || hasFooterEndContent || hasFooterContent || hasFooterActions;
    return h("footer", { class: CSS.footer, hidden: !showFooter }, h("div", { class: CSS.footerContent, hidden: !hasFooterContent }, h("slot", { name: SLOTS2.footer, onSlotchange: this.handleFooterSlotChange })), h("div", { class: CSS.footerStart, hidden: hasFooterContent || !hasFooterStartContent }, h("slot", { name: SLOTS2.footerStart, onSlotchange: this.handleFooterStartSlotChange })), h("div", { class: CSS.footerEnd, hidden: hasFooterContent || !hasFooterEndContent }, h("slot", { name: SLOTS2.footerEnd, onSlotchange: this.handleFooterEndSlotChange })), h("div", { class: CSS.footerActions, hidden: hasFooterContent || !hasFooterActions }, h("slot", { key: "footer-actions-slot", name: SLOTS2.footerActions, onSlotchange: this.handleFooterActionsSlotChange })));
  }
  renderContent() {
    return h("div", { class: CSS.contentWrapper, hidden: this.collapsible && this.collapsed, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, h("slot", null), this.renderFab());
  }
  renderContentBottom() {
    return h("div", { class: CSS.contentBottom, hidden: !this.hasContentBottom }, h("slot", { name: SLOTS2.contentBottom, onSlotchange: this.contentBottomSlotChangeHandler }));
  }
  renderContentTop() {
    return h("div", { class: CSS.contentTop, hidden: !this.hasContentTop }, h("slot", { name: SLOTS2.contentTop, onSlotchange: this.contentTopSlotChangeHandler }));
  }
  renderFab() {
    return h("div", { class: CSS.fabContainer, hidden: !this.hasFab }, h("slot", { name: SLOTS2.fab, onSlotchange: this.handleFabSlotChange }));
  }
  render() {
    const { disabled, loading, isClosed } = this;
    const panelNode = h("article", { key: "0f439dffdca536eb6973ac386b0566091249aee3", "aria-busy": toAriaBoolean(loading), class: CSS.container, hidden: isClosed, ref: this.setContainerRef }, this.renderHeaderNode(), this.renderContent(), this.renderContentBottom(), this.renderFooterNode(), h("slot", { key: "alerts", name: SLOTS2.alerts, onSlotchange: this.handleAlertsSlotChange }));
    return h(Host, { key: "6e5baec07ecb356871dea038ebc2d5ee2d8ed54f", onKeyDown: this.panelKeyDownHandler }, h(InteractiveContainer, { key: "924cda1799b359f1bb3fb119cebfff5a7349b72d", disabled }, loading ? h("calcite-scrim", { loading }) : null, panelNode));
  }
  static get assetsDirs() {
    return ["assets"];
  }
  get el() {
    return this;
  }
  static get watchers() {
    return {
      "closed": ["toggleDialog"],
      "messageOverrides": ["onMessagesChange"],
      "effectiveLocale": ["effectiveLocaleChange"]
    };
  }
  static get style() {
    return CalcitePanelStyle0;
  }
}, [1, "calcite-panel", {
  "beforeClose": [16],
  "closed": [1540],
  "disabled": [516],
  "closable": [516],
  "collapsed": [516],
  "collapseDirection": [1, "collapse-direction"],
  "collapsible": [516],
  "headingLevel": [514, "heading-level"],
  "loading": [516],
  "heading": [1],
  "description": [1],
  "menuFlipPlacements": [16],
  "menuOpen": [516, "menu-open"],
  "menuPlacement": [513, "menu-placement"],
  "messageOverrides": [1040],
  "messages": [1040],
  "overlayPositioning": [513, "overlay-positioning"],
  "scale": [513],
  "isClosed": [32],
  "hasStartActions": [32],
  "hasEndActions": [32],
  "hasMenuItems": [32],
  "hasHeaderContent": [32],
  "hasActionBar": [32],
  "hasContentBottom": [32],
  "hasContentTop": [32],
  "hasFab": [32],
  "hasFooterActions": [32],
  "hasFooterContent": [32],
  "hasFooterEndContent": [32],
  "hasFooterStartContent": [32],
  "defaultMessages": [32],
  "effectiveLocale": [32],
  "showHeaderContent": [32],
  "setFocus": [64],
  "scrollContentTo": [64]
}, void 0, {
  "closed": ["toggleDialog"],
  "messageOverrides": ["onMessagesChange"],
  "effectiveLocale": ["effectiveLocaleChange"]
}]);
function defineCustomElement7() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-panel", "calcite-action", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-popover", "calcite-scrim"];
  components.forEach((tagName) => {
    switch (tagName) {
      case "calcite-panel":
        if (!customElements.get(tagName)) {
          customElements.define(tagName, Panel);
        }
        break;
      case "calcite-action":
        if (!customElements.get(tagName)) {
          defineCustomElement4();
        }
        break;
      case "calcite-action-menu":
        if (!customElements.get(tagName)) {
          defineCustomElement6();
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
          defineCustomElement5();
        }
        break;
      case "calcite-scrim":
        if (!customElements.get(tagName)) {
          defineCustomElement3();
        }
        break;
    }
  });
}
defineCustomElement7();

// node_modules/@esri/calcite-components/dist/components/calcite-flow-item.js
var CSS2 = {
  backButton: "back-button"
};
var ICONS2 = {
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
var SLOTS3 = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions",
  footerEnd: "footer-end",
  footerStart: "footer-start"
};
var flowItemCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}";
var CalciteFlowItemStyle0 = flowItemCss;
var FlowItem = /* @__PURE__ */ proxyCustomElement(class FlowItem2 extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteFlowItemBack = createEvent(this, "calciteFlowItemBack", 7);
    this.calciteFlowItemScroll = createEvent(this, "calciteFlowItemScroll", 6);
    this.calciteFlowItemClose = createEvent(this, "calciteFlowItemClose", 6);
    this.calciteFlowItemToggle = createEvent(this, "calciteFlowItemToggle", 6);
    this.handleInternalPanelScroll = (event) => {
      if (event.target !== this.containerEl) {
        return;
      }
      event.stopPropagation();
      this.calciteFlowItemScroll.emit();
    };
    this.handleInternalPanelClose = (event) => {
      if (event.target !== this.containerEl) {
        return;
      }
      event.stopPropagation();
      this.closed = true;
      this.calciteFlowItemClose.emit();
    };
    this.handleInternalPanelToggle = (event) => {
      if (event.target !== this.containerEl) {
        return;
      }
      event.stopPropagation();
      this.collapsed = event.target.collapsed;
      this.calciteFlowItemToggle.emit();
    };
    this.backButtonClick = () => {
      this.calciteFlowItemBack.emit();
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.closable = false;
    this.closed = false;
    this.collapsed = false;
    this.collapseDirection = "down";
    this.collapsible = false;
    this.beforeBack = void 0;
    this.beforeClose = void 0;
    this.description = void 0;
    this.disabled = false;
    this.heading = void 0;
    this.headingLevel = void 0;
    this.loading = false;
    this.menuOpen = false;
    this.messageOverrides = void 0;
    this.messages = void 0;
    this.overlayPositioning = "absolute";
    this.scale = "m";
    this.showBackButton = false;
    this.defaultMessages = void 0;
    this.effectiveLocale = "";
  }
  onMessagesChange() {
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
  }
  componentWillLoad() {
    return __async(this, null, function* () {
      yield setUpMessages(this);
      setUpLoadableComponent(this);
    });
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  disconnectedCallback() {
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Sets focus on the component.
   *
   * @returns promise.
   */
  setFocus() {
    return __async(this, null, function* () {
      yield componentFocusable(this);
      const { backButtonEl, containerEl } = this;
      if (backButtonEl) {
        return backButtonEl.setFocus();
      } else if (containerEl) {
        return containerEl.setFocus();
      }
    });
  }
  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns - promise that resolves once the content is scrolled to.
   */
  scrollContentTo(options) {
    return __async(this, null, function* () {
      yield this.containerEl?.scrollContentTo(options);
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, backButtonClick, messages } = this;
    const label = messages.back;
    const icon = rtl ? ICONS2.backRight : ICONS2.backLeft;
    return showBackButton ? h("calcite-action", { "aria-label": label, class: CSS2.backButton, icon, key: "flow-back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: "header-actions-start", text: label, title: label }) : null;
  }
  render() {
    const { collapsed, collapseDirection, collapsible, closable, closed, description, disabled, heading, headingLevel, loading, menuOpen, messages, overlayPositioning, beforeClose } = this;
    return h(Host, { key: "2e7872bb2687db0b67ddbf375f8ec0beaabbda36" }, h(InteractiveContainer, { key: "a9418954405a2cec2092bae3be5d77f02306e3c9", disabled }, h("calcite-panel", { key: "d563c751421bf2d66c03286deaa613e09f585546", beforeClose, closable, closed, collapseDirection, collapsed, collapsible, description, disabled, heading, headingLevel, loading, menuOpen, messageOverrides: messages, onCalcitePanelClose: this.handleInternalPanelClose, onCalcitePanelScroll: this.handleInternalPanelScroll, onCalcitePanelToggle: this.handleInternalPanelToggle, overlayPositioning, ref: this.setContainerRef, scale: this.scale }, this.renderBackButton(), h("slot", { key: "c506ec8bb4debbd6a9da6c7941878de49776f614", name: SLOTS3.actionBar, slot: SLOTS2.actionBar }), h("slot", { key: "e76e55e654ff878acff734bdf387402a9e262159", name: SLOTS3.alerts, slot: SLOTS2.alerts }), h("slot", { key: "f7ab8839d7b101e31087130ebf3e36af1ec7da24", name: SLOTS3.headerActionsStart, slot: SLOTS2.headerActionsStart }), h("slot", { key: "2932c4c15b168732356b8e55fcc3064f5b3f4cf5", name: SLOTS3.headerActionsEnd, slot: SLOTS2.headerActionsEnd }), h("slot", { key: "1ef8a9050683022733695445092f8c626487d87b", name: SLOTS3.headerContent, slot: SLOTS2.headerContent }), h("slot", { key: "24c0ab570a601a6c0edfb0c820e580fd24b158ce", name: SLOTS3.headerMenuActions, slot: SLOTS2.headerMenuActions }), h("slot", { key: "ec55bbe7ba939a6efb35225850c37a1aadb97275", name: SLOTS3.fab, slot: SLOTS2.fab }), h("slot", { key: "aa0bfec47656ef9f7f575cd933897a7909e5badc", name: SLOTS3.contentTop, slot: SLOTS2.contentTop }), h("slot", { key: "e23532d080e2df529c2aeb6af043c6efe7a0ab6d", name: SLOTS3.contentBottom, slot: SLOTS2.contentBottom }), h("slot", { key: "db6ffc0d9300c77067a4c88ab277de685c7713af", name: SLOTS3.footerStart, slot: SLOTS2.footerStart }), h("slot", { key: "5f249356da9292f34c4036d0d0741f048fe999e9", name: SLOTS3.footer, slot: SLOTS2.footer }), h("slot", { key: "7476137bacc0f3be5c97682c5027f74d73254765", name: SLOTS3.footerEnd, slot: SLOTS2.footerEnd }), h("slot", { key: "58f60a46c42a05abe9b100a57d478d991e4f25bc", name: SLOTS3.footerActions, slot: SLOTS2.footerActions }), h("slot", { key: "926a8d94b76b6fcdef6dfd219ba8180c44f81c35" }))));
  }
  static get assetsDirs() {
    return ["assets"];
  }
  get el() {
    return this;
  }
  static get watchers() {
    return {
      "messageOverrides": ["onMessagesChange"],
      "effectiveLocale": ["effectiveLocaleChange"]
    };
  }
  static get style() {
    return CalciteFlowItemStyle0;
  }
}, [1, "calcite-flow-item", {
  "closable": [516],
  "closed": [516],
  "collapsed": [516],
  "collapseDirection": [1, "collapse-direction"],
  "collapsible": [516],
  "beforeBack": [16],
  "beforeClose": [16],
  "description": [1],
  "disabled": [516],
  "heading": [1],
  "headingLevel": [514, "heading-level"],
  "loading": [516],
  "menuOpen": [516, "menu-open"],
  "messageOverrides": [1040],
  "messages": [1040],
  "overlayPositioning": [513, "overlay-positioning"],
  "scale": [513],
  "showBackButton": [4, "show-back-button"],
  "defaultMessages": [32],
  "effectiveLocale": [32],
  "setFocus": [64],
  "scrollContentTo": [64]
}, void 0, {
  "messageOverrides": ["onMessagesChange"],
  "effectiveLocale": ["effectiveLocaleChange"]
}]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-flow-item", "calcite-action", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-panel", "calcite-popover", "calcite-scrim"];
  components.forEach((tagName) => {
    switch (tagName) {
      case "calcite-flow-item":
        if (!customElements.get(tagName)) {
          customElements.define(tagName, FlowItem);
        }
        break;
      case "calcite-action":
        if (!customElements.get(tagName)) {
          defineCustomElement4();
        }
        break;
      case "calcite-action-menu":
        if (!customElements.get(tagName)) {
          defineCustomElement6();
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
      case "calcite-panel":
        if (!customElements.get(tagName)) {
          defineCustomElement7();
        }
        break;
      case "calcite-popover":
        if (!customElements.get(tagName)) {
          defineCustomElement5();
        }
        break;
      case "calcite-scrim":
        if (!customElements.get(tagName)) {
          defineCustomElement3();
        }
        break;
    }
  });
}
defineCustomElement$1();
var CalciteFlowItem = FlowItem;
var defineCustomElement8 = defineCustomElement$1;
export {
  CalciteFlowItem,
  defineCustomElement8 as defineCustomElement
};
/*! Bundled license information:

@esri/calcite-components/dist/components/panel.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)

@esri/calcite-components/dist/components/calcite-flow-item.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-3V7UNYE5.js.map
