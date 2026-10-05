import {
  E,
  I,
  N
} from "./chunk-Z6MN6YNZ.js";
import {
  d as d2,
  f,
  j as j2,
  p as p2,
  y
} from "./chunk-57NK2WBT.js";
import "./chunk-FVENEGBH.js";
import {
  m
} from "./chunk-G7W55EH2.js";
import "./chunk-AFSLSJNC.js";
import {
  $
} from "./chunk-VMOWWA2D.js";
import {
  j,
  x
} from "./chunk-OQERHH4D.js";
import "./chunk-IY2B24OB.js";
import {
  et,
  nt,
  ot,
  rt,
  tt
} from "./chunk-EYXQMFFP.js";
import "./chunk-C2FYYQ2H.js";
import "./chunk-22FS2DB4.js";
import "./chunk-CSIYRPBQ.js";
import "./chunk-7FKW5PIK.js";
import "./chunk-CB6ZC7DY.js";
import "./chunk-OCRS2GWK.js";
import "./chunk-2GJ3ZNQP.js";
import "./chunk-KDIKUJSE.js";
import "./chunk-V7HY2IB3.js";
import "./chunk-YW5PLNZN.js";
import {
  c,
  i as i3,
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
import {
  i as i2
} from "./chunk-KDBJKPA2.js";
import "./chunk-MACNJI7G.js";
import "./chunk-J2BM4BJ4.js";
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
  K
} from "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-APUMZG5L.js";
import "./chunk-OHR2EMYV.js";
import {
  p
} from "./chunk-4QNJMPNJ.js";
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
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import {
  G,
  g
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U
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
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/geojson/GeoJSONSourceWorker.js
var D = { hasAttachments: false, capabilities: "query, editing, create, delete, update", useStandardizedQueries: true, supportsCoordinatesQuantization: true, supportsReturningQueryGeometry: true, advancedQueryCapabilities: { supportsQueryAttachments: false, supportsStatistics: true, supportsPercentileStatistics: true, supportsReturningGeometryCentroid: true, supportsQueryWithDistance: true, supportsDistinct: true, supportsReturningQueryExtent: true, supportsReturningGeometryProperties: false, supportsHavingClause: true, supportsOrderBy: true, supportsPagination: true, supportsQueryWithResultType: false, supportsSqlExpression: true, supportsDisjointSpatialRel: true } };
var Q = class {
  constructor() {
    this._queryEngine = null, this._snapshotFeatures = (e) => __async(this, null, function* () {
      const t = yield this._fetch(e);
      return this._createFeatures(t);
    });
  }
  destroy() {
    this._queryEngine?.destroy(), this._queryEngine = this._createDefaultAttributes = null;
  }
  load(_0) {
    return __async(this, arguments, function* (e, t = {}) {
      this._loadOptions = { url: e.url, customParameters: e.customParameters };
      const i4 = [], [r] = yield Promise.all([e.url ? this._fetch(t?.signal) : null, this._checkProjection(e.spatialReference)]), n2 = I(r, { geometryType: e.geometryType }), o2 = e.fields || n2.fields || [], l = null != e.hasZ ? e.hasZ : n2.hasZ, u = n2.geometryType;
      let d3 = e.objectIdField || n2.objectIdFieldName || "__OBJECTID";
      const p3 = e.spatialReference || g;
      let c2 = e.timeInfo;
      o2 === n2.fields && n2.unknownFields.length > 0 && i4.push({ name: "geojson-layer:unknown-field-types", message: "Some fields types couldn't be inferred from the features and were dropped", details: { unknownFields: n2.unknownFields } });
      const y2 = new Z(o2);
      let h = y2.get(d3);
      h ? ("esriFieldTypeString" !== h.type && (h.type = "esriFieldTypeOID"), h.editable = false, h.nullable = false, d3 = h.name) : (h = { alias: d3, name: d3, type: "string" === n2.objectIdFieldType ? "esriFieldTypeString" : "esriFieldTypeOID", editable: false, nullable: false }, o2.unshift(h));
      const _ = {};
      for (const a of o2) {
        if (null == a.name && (a.name = a.alias), null == a.alias && (a.alias = a.name), !a.name)
          throw new s("geojson-layer:invalid-field-name", "field name is missing", { field: a });
        if (!i2.jsonValues.includes(a.type))
          throw new s("geojson-layer:invalid-field-type", `invalid type for field "${a.name}"`, { field: a });
        if (a.name !== h.name) {
          const e2 = H(a);
          void 0 !== e2 && (_[a.name] = e2);
        }
        null == a.length && (a.length = K(a));
      }
      if (c2) {
        if (c2.startTimeField) {
          const e2 = y2.get(c2.startTimeField);
          e2 ? (c2.startTimeField = e2.name, e2.type = "esriFieldTypeDate") : c2.startTimeField = null;
        }
        if (c2.endTimeField) {
          const e2 = y2.get(c2.endTimeField);
          e2 ? (c2.endTimeField = e2.name, e2.type = "esriFieldTypeDate") : c2.endTimeField = null;
        }
        if (c2.trackIdField) {
          const e2 = y2.get(c2.trackIdField);
          e2 ? c2.trackIdField = e2.name : (c2.trackIdField = null, i4.push({ name: "geojson-layer:invalid-timeInfo-trackIdField", message: "trackIdField is missing", details: { timeInfo: c2 } }));
        }
        c2.startTimeField || c2.endTimeField || (i4.push({ name: "geojson-layer:invalid-timeInfo", message: "startTimeField and endTimeField are missing", details: { timeInfo: c2 } }), c2 = null);
      }
      const F = u ? o(u) : void 0, b2 = y2.dateFields.length ? { timeZoneIANA: i } : null, T = { warnings: i4, featureErrors: [], layerDefinition: __spreadProps(__spreadValues({}, D), { drawingInfo: F ?? void 0, templates: c(_), extent: void 0, geometryType: u, objectIdField: d3, fields: o2, hasZ: !!l, timeInfo: c2, dateFieldsTimeReference: b2 }) };
      this._queryEngine = new $({ fieldsIndex: Z.fromLayerJSON({ fields: o2, timeInfo: c2, dateFieldsTimeReference: b2 }), geometryType: u, hasM: false, hasZ: l, objectIdField: d3, spatialReference: p3, timeInfo: c2, featureStore: new m({ geometryType: u, hasM: false, hasZ: l }), cacheSpatialQueries: true });
      const w = this._queryEngine.fieldsIndex.requiredFields.indexOf(h);
      w > -1 && this._queryEngine.fieldsIndex.requiredFields.splice(w, 1), this._createDefaultAttributes = i3(_, d3);
      const q = yield this._createFeatures(r);
      this._objectIdGenerator = this._createObjectIdGenerator(this._queryEngine, q);
      const x2 = this._normalizeFeatures(q, T.featureErrors);
      this._queryEngine.featureStore.addMany(x2);
      const { fullExtent: Q2, timeExtent: v } = yield this._queryEngine.fetchRecomputedExtents();
      if (T.layerDefinition.extent = Q2, v) {
        const { start: e2, end: t2 } = v;
        T.layerDefinition.timeInfo.timeExtent = [e2, t2];
      }
      return T;
    });
  }
  applyEdits(e) {
    return __async(this, null, function* () {
      const { spatialReference: t, geometryType: s2 } = this._queryEngine;
      return yield Promise.all([j2(t, s2), x(e.adds, t), x(e.updates, t)]), yield this._waitSnapshotComplete(), this._applyEdits(e);
    });
  }
  queryFeatures() {
    return __async(this, arguments, function* (e = {}, t = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQuery(e, t.signal);
    });
  }
  queryFeatureCount() {
    return __async(this, arguments, function* (e = {}, t = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForCount(e, t.signal);
    });
  }
  queryObjectIds() {
    return __async(this, arguments, function* (e = {}, t = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForIds(e, t.signal);
    });
  }
  queryExtent() {
    return __async(this, arguments, function* (e = {}, t = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForExtent(e, t.signal);
    });
  }
  querySnapping(_0) {
    return __async(this, arguments, function* (e, t = {}) {
      return yield this._waitSnapshotComplete(), this._queryEngine.executeQueryForSnapping(e, t.signal);
    });
  }
  refresh(e) {
    return __async(this, null, function* () {
      this._loadOptions.customParameters = e, this._snapshotTask?.abort(), this._snapshotTask = d(this._snapshotFeatures), this._snapshotTask.promise.then((e2) => {
        this._queryEngine.featureStore.clear(), this._objectIdGenerator = this._createObjectIdGenerator(this._queryEngine, e2);
        const t = this._normalizeFeatures(e2);
        t && this._queryEngine.featureStore.addMany(t);
      }, (e2) => {
        this._queryEngine.featureStore.clear(), b(e2) || n.getLogger("esri.layers.GeoJSONLayer").error(new s("geojson-layer:refresh", "An error occurred during refresh", { error: e2 }));
      }), yield this._waitSnapshotComplete();
      const { fullExtent: n2, timeExtent: a } = yield this._queryEngine.fetchRecomputedExtents();
      return { extent: n2, timeExtent: a };
    });
  }
  _createFeatures(e) {
    return __async(this, null, function* () {
      if (null == e)
        return [];
      const { geometryType: t, hasZ: s2, objectIdField: i4 } = this._queryEngine, r = N(e, { geometryType: t, hasZ: s2, objectIdField: i4 });
      if (!G(this._queryEngine.spatialReference, g))
        for (const n2 of r)
          null != n2.geometry && (n2.geometry = ot(j(rt(n2.geometry, this._queryEngine.geometryType, this._queryEngine.hasZ, false), g, this._queryEngine.spatialReference)));
      return r;
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
  _fetch(t) {
    return __async(this, null, function* () {
      const { url: s2, customParameters: i4 } = this._loadOptions, r = (yield U(s2 ?? "", { responseType: "json", query: __spreadValues({}, i4), signal: t })).data;
      return E(r), r;
    });
  }
  _normalizeFeatures(e, t) {
    const { objectIdField: s2, fieldsIndex: i4 } = this._queryEngine, r = [];
    for (const n2 of e) {
      const e2 = this._createDefaultAttributes(), a = p2(i4, e2, n2.attributes, true);
      a ? t?.push(a) : (this._assignObjectId(e2, n2.attributes, true), n2.attributes = e2, n2.objectId = e2[s2], r.push(n2));
    }
    return r;
  }
  _applyEdits(e) {
    return __async(this, null, function* () {
      const { adds: t, updates: s2, deletes: i4 } = e, r = { addResults: [], deleteResults: [], updateResults: [], uidToObjectId: {} };
      if (t?.length && this._applyAddEdits(r, t), s2?.length && this._applyUpdateEdits(r, s2), i4?.length) {
        for (const e2 of i4)
          r.deleteResults.push(d2(e2));
        this._queryEngine.featureStore.removeManyById(i4);
      }
      const { fullExtent: n2, timeExtent: a } = yield this._queryEngine.fetchRecomputedExtents();
      return { extent: n2, timeExtent: a, featureEditResults: r };
    });
  }
  _applyAddEdits(e, t) {
    const { addResults: s2 } = e, { geometryType: i4, hasM: r, hasZ: a, objectIdField: o2, spatialReference: l, featureStore: u, fieldsIndex: p3 } = this._queryEngine, c2 = [];
    for (const d3 of t) {
      if (d3.geometry && i4 !== p(d3.geometry)) {
        s2.push(f("Incorrect geometry type."));
        continue;
      }
      const t2 = this._createDefaultAttributes(), r2 = p2(p3, t2, d3.attributes);
      if (r2)
        s2.push(r2);
      else {
        if (this._assignObjectId(t2, d3.attributes), d3.attributes = t2, null != d3.uid) {
          const t3 = d3.attributes[o2];
          e.uidToObjectId[d3.uid] = t3;
        }
        if (null != d3.geometry) {
          const e2 = d3.geometry.spatialReference ?? l;
          d3.geometry = j(y(d3.geometry, e2), e2, l);
        }
        c2.push(d3), s2.push(d2(d3.attributes[o2]));
      }
    }
    u.addMany(et([], c2, i4, a, r, o2));
  }
  _applyUpdateEdits({ updateResults: e }, t) {
    const { geometryType: s2, hasM: i4, hasZ: r, objectIdField: a, spatialReference: o2, featureStore: l, fieldsIndex: u } = this._queryEngine;
    for (const d3 of t) {
      const { attributes: t2, geometry: m2 } = d3, y2 = t2?.[a];
      if (null == y2) {
        e.push(f(`Identifier field ${a} missing`));
        continue;
      }
      if (!l.has(y2)) {
        e.push(f(`Feature with object id ${y2} missing`));
        continue;
      }
      const f2 = nt(l.getFeature(y2), s2, r, i4);
      if (null != m2) {
        if (s2 !== p(m2)) {
          e.push(f("Incorrect geometry type."));
          continue;
        }
        const t3 = m2.spatialReference ?? o2;
        f2.geometry = j(y(m2, t3), t3, o2);
      }
      if (t2) {
        const s3 = p2(u, f2.attributes, t2);
        if (s3) {
          e.push(s3);
          continue;
        }
      }
      l.add(tt(f2, s2, r, i4, a)), e.push(d2(y2));
    }
  }
  _createObjectIdGenerator(e, t) {
    const s2 = e.fieldsIndex.get(e.objectIdField);
    if ("esriFieldTypeString" === s2.type)
      return () => s2.name + "-" + Date.now().toString(16);
    let i4 = Number.NEGATIVE_INFINITY;
    for (const r of t)
      r.objectId && (i4 = Math.max(i4, r.objectId));
    return i4 = Math.max(0, i4) + 1, () => i4++;
  }
  _assignObjectId(e, t, s2 = false) {
    const i4 = this._queryEngine.objectIdField;
    e[i4] = s2 && i4 in t ? t[i4] : this._objectIdGenerator();
  }
  _checkProjection(e) {
    return __async(this, null, function* () {
      try {
        yield x(g, e);
      } catch {
        throw new s("geojson-layer", "Projection not supported");
      }
    });
  }
};
export {
  Q as default
};
//# sourceMappingURL=chunk-CDE6OSKP.js.map
