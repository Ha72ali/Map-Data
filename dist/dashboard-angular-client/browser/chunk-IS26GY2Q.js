import {
  getSupportedLocale
} from "./chunk-JBUNIVRU.js";
import {
  isBrowser
} from "./chunk-ETVX3AES.js";
import {
  getAssetPath
} from "./chunk-FUPSM3TL.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@esri/calcite-components/dist/components/t9n.js
var componentLangToMessageBundleCache = {};
function getMessageBundle(lang, component) {
  return __async(this, null, function* () {
    const key = `${component}_${lang}`;
    if (componentLangToMessageBundleCache[key]) {
      return componentLangToMessageBundleCache[key];
    }
    componentLangToMessageBundleCache[key] = fetch(getAssetPath(`./assets/${component}/t9n/messages_${lang}.json`)).then((resp) => {
      if (!resp.ok) {
        throwMessageFetchError();
      }
      return resp.json();
    }).catch(() => throwMessageFetchError());
    return componentLangToMessageBundleCache[key];
  });
}
function throwMessageFetchError() {
  throw new Error("could not fetch component message bundle");
}
function mergeMessages(component) {
  component.messages = __spreadValues(__spreadValues({}, component.defaultMessages), component.messageOverrides);
}
function noop() {
}
function setUpMessages(component) {
  return __async(this, null, function* () {
    component.defaultMessages = yield fetchMessages(component, component.effectiveLocale);
    mergeMessages(component);
  });
}
function fetchMessages(component, lang) {
  return __async(this, null, function* () {
    if (!isBrowser()) {
      return {};
    }
    const { el } = component;
    const tag = el.tagName.toLowerCase();
    const componentName = tag.replace("calcite-", "");
    return getMessageBundle(getSupportedLocale(lang, "t9n"), componentName);
  });
}
function updateMessages(component, lang) {
  return __async(this, null, function* () {
    component.defaultMessages = yield fetchMessages(component, lang);
    mergeMessages(component);
  });
}
function connectMessages(component) {
  component.onMessagesChange = defaultOnMessagesChange;
}
function disconnectMessages(component) {
  component.onMessagesChange = noop;
}
function defaultOnMessagesChange() {
  mergeMessages(this);
}

export {
  setUpMessages,
  updateMessages,
  connectMessages,
  disconnectMessages
};
/*! Bundled license information:

@esri/calcite-components/dist/components/t9n.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-IS26GY2Q.js.map
