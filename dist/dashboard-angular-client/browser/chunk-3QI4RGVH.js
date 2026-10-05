import {
  c,
  o as o3
} from "./chunk-XGBDSBC2.js";
import {
  o as o2
} from "./chunk-2AR2ZIQP.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/TimeExtent.js
var u;
var m = u = class extends f {
  static get allTime() {
    return p;
  }
  static get empty() {
    return d;
  }
  static fromArray(t) {
    return new u({ start: null != t[0] ? new Date(t[0]) : t[0], end: null != t[1] ? new Date(t[1]) : t[1] });
  }
  constructor(t) {
    super(t), this.end = null, this.start = null;
  }
  readEnd(t, e2) {
    return null != e2.end ? new Date(e2.end) : null;
  }
  writeEnd(t, e2) {
    e2.end = t?.getTime() ?? null;
  }
  get isAllTime() {
    return this.equals(u.allTime);
  }
  get isEmpty() {
    return this.equals(u.empty);
  }
  readStart(t, e2) {
    return null != e2.start ? new Date(e2.start) : null;
  }
  writeStart(t, e2) {
    e2.start = t?.getTime() ?? null;
  }
  clone() {
    return new u({ end: this.end, start: this.start });
  }
  equals(t) {
    if (!t)
      return false;
    const e2 = this.start?.getTime() ?? this.start, r2 = this.end?.getTime() ?? this.end, s = t.start?.getTime() ?? t.start, n = t.end?.getTime() ?? t.end;
    return e2 === s && r2 === n;
  }
  expandTo(t, e2 = o2) {
    if (this.isEmpty || this.isAllTime)
      return this.clone();
    let n = this.start;
    n && (n = c(n, t, e2));
    let i = this.end;
    if (i) {
      const n2 = c(i, t, e2);
      i = i.getTime() === n2.getTime() ? n2 : o3(n2, 1, t, e2);
    }
    return new u({ start: n, end: i });
  }
  intersection(t) {
    if (!t)
      return this.clone();
    if (this.isEmpty || t.isEmpty)
      return u.empty;
    if (this.isAllTime)
      return t.clone();
    if (t.isAllTime)
      return this.clone();
    const e2 = this.start?.getTime() ?? -1 / 0, r2 = this.end?.getTime() ?? 1 / 0, s = t.start?.getTime() ?? -1 / 0, n = t.end?.getTime() ?? 1 / 0;
    let i, l;
    return s >= e2 && s <= r2 ? i = s : e2 >= s && e2 <= n && (i = e2), r2 >= s && r2 <= n ? l = r2 : n >= e2 && n <= r2 && (l = n), null == i || null == l || isNaN(i) || isNaN(l) ? u.empty : new u({ start: i === -1 / 0 ? null : new Date(i), end: l === 1 / 0 ? null : new Date(l) });
  }
  offset(t, e2, r2 = o2) {
    if (this.isEmpty || this.isAllTime)
      return this.clone();
    const n = new u(), { start: i, end: l } = this;
    return null != i && (n.start = o3(i, t, e2, r2)), null != l && (n.end = o3(l, t, e2, r2)), n;
  }
  toArray() {
    return this.isEmpty ? [void 0, void 0] : [this.start?.getTime() ?? null, this.end?.getTime() ?? null];
  }
  union(t) {
    if (!t || t.isEmpty)
      return this.clone();
    if (this.isEmpty)
      return t.clone();
    if (this.isAllTime || t.isAllTime)
      return p.clone();
    const e2 = null != this.start && null != t.start ? new Date(Math.min(this.start.getTime(), t.start.getTime())) : null, r2 = null != this.end && null != t.end ? new Date(Math.max(this.end.getTime(), t.end.getTime())) : null;
    return new u({ start: e2, end: r2 });
  }
};
e([y({ type: Date, json: { write: { allowNull: true } } })], m.prototype, "end", void 0), e([o("end")], m.prototype, "readEnd", null), e([r("end")], m.prototype, "writeEnd", null), e([y({ readOnly: true, json: { read: false } })], m.prototype, "isAllTime", null), e([y({ readOnly: true, json: { read: false } })], m.prototype, "isEmpty", null), e([y({ type: Date, json: { write: { allowNull: true } } })], m.prototype, "start", void 0), e([o("start")], m.prototype, "readStart", null), e([r("start")], m.prototype, "writeStart", null), m = u = e([a("esri.TimeExtent")], m);
var p = new m();
var d = new m({ start: void 0, end: void 0 });
var c2 = m;

export {
  c2 as c
};
//# sourceMappingURL=chunk-3QI4RGVH.js.map
