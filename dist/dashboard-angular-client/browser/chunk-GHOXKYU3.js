import {
  c
} from "./chunk-G6ITGPKN.js";
import {
  e as e3,
  n as n2
} from "./chunk-FVENEGBH.js";
import {
  m
} from "./chunk-G7W55EH2.js";
import "./chunk-AFSLSJNC.js";
import {
  $
} from "./chunk-VMOWWA2D.js";
import {
  x
} from "./chunk-OQERHH4D.js";
import "./chunk-IY2B24OB.js";
import "./chunk-EYXQMFFP.js";
import "./chunk-C2FYYQ2H.js";
import {
  e as e2
} from "./chunk-22FS2DB4.js";
import {
  e
} from "./chunk-CSIYRPBQ.js";
import {
  t
} from "./chunk-7FKW5PIK.js";
import "./chunk-CB6ZC7DY.js";
import "./chunk-OCRS2GWK.js";
import "./chunk-2GJ3ZNQP.js";
import "./chunk-KDIKUJSE.js";
import "./chunk-V7HY2IB3.js";
import "./chunk-YW5PLNZN.js";
import {
  i as i2,
  o
} from "./chunk-CINKUSZ7.js";
import "./chunk-23OIU3O7.js";
import "./chunk-AGNOML52.js";
import "./chunk-7XQIAUGY.js";
import "./chunk-N62TCV6V.js";
import {
  Z
} from "./chunk-7JFZMNXX.js";
import "./chunk-5AO6PKWA.js";
import "./chunk-YGERZ2ZN.js";
import "./chunk-IWDEV6HE.js";
import "./chunk-2A6LCWAO.js";
import "./chunk-QSREVAFL.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-MACNJI7G.js";
import {
  O
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-QNED4CTP.js";
import "./chunk-7LQIO4JZ.js";
import "./chunk-LKQQQES5.js";
import "./chunk-GF2XXTDU.js";
import "./chunk-RIFP6ALC.js";
import "./chunk-T5JXEROT.js";
import "./chunk-QLIDKUAN.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-4ZNMWBPP.js";
import {
  H,
  K,
  c as c2
} from "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-APUMZG5L.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-XVLLO5NS.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-SOEKEBD6.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import {
  i
} from "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import {
  d
} from "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  M
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  G,
  g,
  w
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  I,
  U,
  bt
} from "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import {
  b
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/csv/csv.js
var r = /^\s*"([\S\s]*)"\s*$/;
var l = /""/g;
var o2 = "\n";
var s2 = [",", " ", ";", "|", "	"];
function* u(e4, t2, n3) {
  let i3 = 0;
  for (; i3 <= e4.length; ) {
    const r2 = e4.indexOf(t2, i3), l2 = e4.substring(i3, r2 > -1 ? r2 : void 0);
    i3 += l2.length + t2.length, n3 && !l2.trim() || (yield l2);
  }
}
function c3(e4) {
  const t2 = e4.includes("\r\n") ? "\r\n" : o2;
  return u(e4, t2, true);
}
function d2(e4, t2) {
  return u(e4, t2, false);
}
function f2(e4, t2, n3) {
  e4 = e4.trim(), t2 = t2?.trim();
  const i3 = [], r2 = Array.from(/* @__PURE__ */ new Set([n3?.delimiter, ...s2])).filter((e5) => null != e5);
  for (const o3 of r2) {
    const n4 = m2(e4, o3).length, r3 = m2(t2, o3).length ?? n4;
    n4 > 1 && i3.push({ weight: Math.min(n4, r3), delimiter: o3 });
  }
  const l2 = i3.sort(({ weight: e5 }, { weight: t3 }) => t3 - e5).map(({ delimiter: e5 }) => e5);
  for (const o3 of l2) {
    const t3 = h(g2(e4, o3).names, n3?.longitudeField, n3?.latitudeField);
    if (t3.longitudeFieldName && t3.latitudeFieldName)
      return { delimiter: o3, locationInfo: t3 };
  }
  return { delimiter: l2[0], locationInfo: null };
}
function* a(e4, t2, n3, i3 = () => /* @__PURE__ */ Object.create(null)) {
  const s3 = c3(e4);
  s3.next();
  let u2 = "", f3 = "", a2 = 0, g3 = i3(), m3 = 0;
  e:
    for (const c4 of s3) {
      const e5 = d2(c4, n3);
      for (const o3 of e5)
        if (u2 += f3 + o3, f3 = "", a2 += p(o3), a2 % 2 == 0) {
          if (a2 > 0) {
            const e6 = r.exec(u2);
            if (!e6) {
              g3 = i3(), m3 = 0, u2 = "", a2 = 0;
              continue e;
            }
            g3[t2[m3]] = e6[1].replaceAll(l, '"'), m3++;
          } else
            g3[t2[m3]] = u2, m3++;
          u2 = "", a2 = 0;
        } else
          f3 = n3;
      0 === a2 ? (yield g3, g3 = i3(), m3 = 0) : f3 = o2;
    }
}
function g2(e4, t2) {
  const i3 = m2(e4, t2).filter((e5) => null != e5), r2 = i3.map((e5) => c2(e5));
  for (let n3 = r2.length - 1; n3 >= 0; n3--)
    r2[n3] || (r2.splice(n3, 1), i3.splice(n3, 1));
  return { names: r2, aliases: i3 };
}
function m2(e4, t2) {
  if (!e4?.length)
    return [];
  const n3 = [];
  let i3 = "", o3 = "", s3 = 0;
  const u2 = d2(e4, t2);
  for (const c4 of u2)
    if (i3 += o3 + c4, o3 = "", s3 += p(c4), s3 % 2 == 0) {
      if (s3 > 0) {
        const e5 = r.exec(i3);
        e5 && n3.push(e5[1].replaceAll(l, '"'));
      } else
        n3.push(i3);
      i3 = "", s3 = 0;
    } else
      o3 = t2;
  return n3;
}
function p(e4) {
  let t2 = 0, n3 = 0;
  for (n3 = e4.indexOf('"', n3); n3 >= 0; )
    t2++, n3 = e4.indexOf('"', n3 + 1);
  return t2;
}
function h(e4, t2, i3) {
  t2 = c2(t2)?.toLowerCase(), i3 = c2(i3)?.toLowerCase();
  const r2 = e4.map((e5) => e5.toLowerCase()), l2 = t2 ? e4[r2.indexOf(t2)] : null, o3 = i3 ? e4[r2.indexOf(i3)] : null;
  return { longitudeFieldName: l2 || e4[r2.indexOf(F.find((e5) => r2.includes(e5)))], latitudeFieldName: o3 || e4[r2.indexOf(y.find((e5) => r2.includes(e5)))] };
}
function b2(e4, t2, n3, r2, l2) {
  const o3 = [], s3 = a(e4, n3, t2), u2 = [];
  for (const i3 of s3) {
    if (10 === u2.length)
      break;
    u2.push(i3);
  }
  for (let c4 = 0; c4 < n3.length; c4++) {
    const e5 = n3[c4], t3 = r2[c4];
    if (e5 === l2.longitudeFieldName || e5 === l2.latitudeFieldName)
      o3.push({ name: e5, type: "esriFieldTypeDouble", alias: t3 });
    else {
      let n4;
      switch (N(u2.map((t4) => t4[e5]))) {
        case "integer":
          n4 = "esriFieldTypeInteger";
          break;
        case "double":
          n4 = "esriFieldTypeDouble";
          break;
        case "date":
          n4 = "esriFieldTypeDate";
          break;
        default:
          n4 = "esriFieldTypeString";
      }
      o3.push({ name: e5, type: n4, alias: t3, length: K(n4) });
    }
  }
  return o3;
}
function N(t2) {
  if (!t2.length)
    return "string";
  const n3 = /[^+\-.,0-9]/;
  return t2.map((t3) => {
    if ("" !== t3) {
      if (!n3.test(t3)) {
        let e4 = x2(t3);
        if (!isNaN(e4))
          return /[.,]/.test(t3) || !Number.isInteger(e4) || e4 > 214783647 || e4 < -214783648 ? "double" : "integer";
        if (t3.includes("E")) {
          if (e4 = Number(t3), !Number.isNaN(e4))
            return "double";
          if (t3.includes(",") && (t3 = t3.replace(",", "."), e4 = Number(t3), !Number.isNaN(e4)))
            return "double";
        }
      }
      return e3(t3) ? "date" : "string";
    }
  }).reduce((e4, t3) => void 0 === e4 ? t3 : void 0 === t3 ? e4 : e4 === t3 ? t3 : "string" === e4 || "string" === t3 ? "string" : "double" === e4 || "double" === t3 ? "double" : void 0);
}
var x2 = function() {
  const e4 = c(), n3 = new RegExp("^" + e4.regexp + "$"), i3 = new RegExp("[" + e4.group + "\\s\\xa0]", "g"), r2 = e4.factor;
  return (t2) => {
    const l2 = n3.exec(t2);
    if (e4.factor = r2, !l2)
      return NaN;
    let o3 = l2[1];
    if (!l2[1]) {
      if (!l2[2])
        return NaN;
      o3 = l2[2], e4.factor *= -1;
    }
    return o3 = o3.replace(i3, "").replace(e4.decimal, "."), +o3 * e4.factor;
  };
}();
var y = ["lat", "latitude", "latitude83", "latdecdeg", "lat_dd", "y", "ycenter", "point_y"];
var F = ["lon", "lng", "long", "longitude", "longitude83", "longdecdeg", "long_dd", "x", "xcenter", "point_x"];

// node_modules/@arcgis/core/layers/graphics/sources/support/CSVSourceWorker.js
var O2 = o("esriGeometryPoint");
var v = ["csv"];
var D = [0, 0];
var k = class {
  constructor(e4, t2) {
    this.x = e4, this.y = t2;
  }
};
var P = class {
  constructor() {
    this._queryEngine = null, this._snapshotFeatures = (e4) => __async(this, null, function* () {
      const t2 = yield this._fetch(e4);
      return this._createFeatures(t2);
    });
  }
  destroy() {
    this._queryEngine?.destroy(), this._queryEngine = null;
  }
  load(_0) {
    return __async(this, arguments, function* (e4, t2 = {}) {
      this._loadOptions = e4;
      const [i3] = yield Promise.all([this._fetch(t2.signal), this._checkProjection(e4?.parsingOptions?.spatialReference)]), n3 = R(i3, e4);
      this._locationInfo = n3.locationInfo, this._delimiter = n3.delimiter, this._queryEngine = this._createQueryEngine(n3);
      const r2 = yield this._createFeatures(i3);
      this._queryEngine.featureStore.addMany(r2);
      const { fullExtent: s3, timeExtent: o3 } = yield this._queryEngine.fetchRecomputedExtents();
      if (n3.layerDefinition.extent = s3, o3) {
        const { start: e5, end: t3 } = o3;
        n3.layerDefinition.timeInfo.timeExtent = [e5, t3];
      }
      return n3;
    });
  }
  applyEdits() {
    return __async(this, null, function* () {
      throw new s("csv-layer:editing-not-supported", "applyEdits() is not supported on CSVLayer");
    });
  }
  queryFeatures() {
    return __async(this, arguments, function* (e4 = {}, t2 = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQuery(e4, t2.signal);
    });
  }
  queryFeatureCount() {
    return __async(this, arguments, function* (e4 = {}, t2 = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForCount(e4, t2.signal);
    });
  }
  queryObjectIds() {
    return __async(this, arguments, function* (e4 = {}, t2 = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForIds(e4, t2.signal);
    });
  }
  queryExtent() {
    return __async(this, arguments, function* (e4 = {}, t2 = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForExtent(e4, t2.signal);
    });
  }
  querySnapping(_0) {
    return __async(this, arguments, function* (e4, t2 = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForSnapping(e4, t2.signal);
    });
  }
  refresh(e4) {
    return __async(this, null, function* () {
      this._loadOptions.customParameters = e4, this._snapshotTask?.abort(), this._snapshotTask = d(this._snapshotFeatures), this._snapshotTask.promise.then((e5) => {
        this._queryEngine.featureStore.clear(), e5 && this._queryEngine.featureStore.addMany(e5);
      }, (e5) => {
        this._queryEngine.featureStore.clear(), b(e5) || n.getLogger("esri.layers.CSVLayer").error(new s("csv-layer:refresh", "An error occurred during refresh", { error: e5 }));
      }), yield this._waitSnapshotComplete();
      const { fullExtent: i3, timeExtent: o3 } = yield this._queryEngine.fetchRecomputedExtents();
      return { extent: i3, timeExtent: o3 };
    });
  }
  _waitSnapshotComplete() {
    return __async(this, null, function* () {
      if (this._snapshotTask && !this._snapshotTask.finished) {
        try {
          yield this._snapshotTask.promise;
        } catch {
        }
        return this._waitSnapshotComplete();
      }
    });
  }
  _fetch(t2) {
    return __async(this, null, function* () {
      const { url: i3, customParameters: r2 } = this._loadOptions;
      if (!i3)
        throw new s("csv-layer:invalid-source", "url not defined");
      const s3 = I(i3);
      return (yield U(s3.path, { query: __spreadValues(__spreadValues({}, s3.query), r2), responseType: "text", signal: t2 })).data;
    });
  }
  _createQueryEngine(e4) {
    const { objectIdField: t2, fields: i3, extent: n3, timeInfo: r2 } = e4.layerDefinition, s3 = new m({ geometryType: "esriGeometryPoint", hasM: false, hasZ: false });
    return new $({ fieldsIndex: Z.fromLayerJSON({ fields: i3, dateFieldsTimeReference: { timeZoneIANA: i } }), geometryType: "esriGeometryPoint", hasM: false, hasZ: false, timeInfo: r2, objectIdField: t2, spatialReference: n3.spatialReference || { wkid: 4326 }, cacheSpatialQueries: true, featureStore: s3 });
  }
  _createFeatures(e4) {
    return __async(this, null, function* () {
      const { latitudeFieldName: t2, longitudeFieldName: n3 } = this._locationInfo, { objectIdField: r2, fieldsIndex: s3, spatialReference: o3 } = this._queryEngine;
      let a2 = [];
      const u2 = [], h2 = s3.fields.filter((e5) => e5.name !== r2).map((e5) => e5.name);
      let g3 = 0;
      const I2 = {};
      for (const i3 of s3.fields)
        if ("esriFieldTypeOID" !== i3.type && "esriFieldTypeGlobalID" !== i3.type) {
          const e5 = H(i3);
          void 0 !== e5 && (I2[i3.name] = e5);
        }
      const w2 = a(e4, h2, this._delimiter, i2(I2, r2));
      for (const l2 of w2) {
        const e5 = this._parseCoordinateValue(l2[t2]), o4 = this._parseCoordinateValue(l2[n3]);
        if (null != o4 && null != e5 && !isNaN(e5) && !isNaN(o4)) {
          l2[t2] = e5, l2[n3] = o4;
          for (const e6 in l2)
            if (e6 !== t2 && e6 !== n3) {
              if (s3.isDateField(e6))
                l2[e6] = n2(l2[e6]);
              else if (s3.isNumericField(e6)) {
                const t3 = x2(l2[e6]);
                isNaN(t3) ? l2[e6] = null : l2[e6] = t3;
              }
            }
          l2[r2] = g3, g3++, a2.push(new k(o4, e5)), u2.push(l2);
        }
      }
      if (!G({ wkid: 4326 }, o3))
        if (w(o3))
          for (const i3 of a2)
            [i3.x, i3.y] = M(i3.x, i3.y, D);
        else
          a2 = O(t, a2, f.WGS84, o3, null, null);
      const E = [];
      for (let i3 = 0; i3 < a2.length; i3++) {
        const { x: e5, y: t3 } = a2[i3], n4 = u2[i3];
        n4[r2] = i3 + 1, E.push(new e2(new e([], [e5, t3]), n4, null, n4[r2]));
      }
      return E;
    });
  }
  _parseCoordinateValue(e4) {
    if (null == e4 || "" === e4)
      return null;
    let t2 = x2(e4);
    return (isNaN(t2) || Math.abs(t2) > 181) && (t2 = parseFloat(e4)), t2;
  }
  _checkProjection(e4) {
    return __async(this, null, function* () {
      try {
        yield x(g, e4);
      } catch {
        throw new s("csv-layer:projection-not-supported", "Projection not supported");
      }
    });
  }
};
function R(e4, t2) {
  const i3 = t2.parsingOptions || {}, r2 = { delimiter: i3.delimiter, layerDefinition: null, locationInfo: { latitudeFieldName: i3.latitudeField, longitudeFieldName: i3.longitudeField } }, s3 = r2.layerDefinition = { name: bt(t2.url, v) || "csv", dateFieldsTimeReference: { timeZoneIANA: i }, drawingInfo: O2, geometryType: "esriGeometryPoint", objectIdField: null, fields: [], timeInfo: i3.timeInfo, extent: { xmin: Number.POSITIVE_INFINITY, ymin: Number.POSITIVE_INFINITY, xmax: Number.NEGATIVE_INFINITY, ymax: Number.NEGATIVE_INFINITY, spatialReference: i3.spatialReference || { wkid: 4326 } } }, o3 = c3(e4), l2 = o3.next().value?.trim(), m3 = o3.next().value?.trim();
  if (!l2)
    throw new s("csv-layer:empty-csv", "CSV is empty", { csv: e4 });
  const { delimiter: c4, locationInfo: d3 } = f2(l2, m3, i3);
  if (!c4)
    throw new s("csv-layer:invalid-delimiter", "Unable to detect the delimiter from CSV", { firstLine: l2, secondLine: m3, parsingOptions: i3 });
  if (!d3)
    throw new s("csv-layer:location-fields-not-found", "Unable to identify latitude and longitude fields from the CSV file", { firstLine: l2, secondLine: m3, parsingOptions: i3 });
  r2.locationInfo = d3, r2.delimiter = c4;
  const { names: u2, aliases: p2 } = g2(l2, c4), f3 = b2(e4, r2.delimiter, u2, p2, r2.locationInfo);
  if (i3.fields?.length) {
    const e5 = new Z(i3.fields);
    for (const t3 of f3) {
      const i4 = e5.get(t3.name);
      i4 && Object.assign(t3, i4);
    }
  }
  if (!f3.some((e5) => "esriFieldTypeOID" === e5.type && (s3.objectIdField = e5.name, true))) {
    const e5 = { name: "__OBJECTID", alias: "__OBJECTID", type: "esriFieldTypeOID", editable: false, nullable: false };
    s3.objectIdField = e5.name, f3.unshift(e5);
  }
  s3.fields = f3;
  const y2 = new Z(s3.fields);
  if (r2.locationInfo && (r2.locationInfo.latitudeFieldName = y2.get(r2.locationInfo.latitudeFieldName).name, r2.locationInfo.longitudeFieldName = y2.get(r2.locationInfo.longitudeFieldName).name), s3.timeInfo) {
    const e5 = s3.timeInfo;
    if (e5.startTimeField) {
      const t3 = y2.get(e5.startTimeField);
      t3 ? (e5.startTimeField = t3.name, t3.type = "esriFieldTypeDate") : e5.startTimeField = null;
    }
    if (e5.endTimeField) {
      const t3 = y2.get(e5.endTimeField);
      t3 ? (e5.endTimeField = t3.name, t3.type = "esriFieldTypeDate") : e5.endTimeField = null;
    }
    if (e5.trackIdField) {
      const t3 = y2.get(e5.trackIdField);
      e5.trackIdField = t3 ? t3.name : null;
    }
    e5.startTimeField || e5.endTimeField || (s3.timeInfo = null);
  }
  return r2;
}
export {
  P as default
};
//# sourceMappingURL=chunk-GHOXKYU3.js.map
