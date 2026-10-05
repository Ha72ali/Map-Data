import {
  n,
  t
} from "./chunk-ILME5IF3.js";
import {
  d,
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
  p,
  u
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
import "./chunk-FKXAUXOY.js";
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
  g
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/support/MemorySourceWorker.js
var R = g;
var q = { xmin: -180, ymin: -90, xmax: 180, ymax: 90, spatialReference: g };
var D = { hasAttachments: false, capabilities: "query, editing, create, delete, update", useStandardizedQueries: true, supportsCoordinatesQuantization: true, supportsReturningQueryGeometry: true, advancedQueryCapabilities: { supportsQueryAttachments: false, supportsStatistics: true, supportsPercentileStatistics: true, supportsReturningGeometryCentroid: true, supportsQueryWithDistance: true, supportsDistinct: true, supportsReturningQueryExtent: true, supportsReturningGeometryProperties: false, supportsHavingClause: true, supportsOrderBy: true, supportsPagination: true, supportsQueryWithResultType: false, supportsSqlExpression: true, supportsDisjointSpatialRel: true } };
function O(e) {
  return u(e) ? null != e.z : !!e.hasZ;
}
function w(e) {
  return u(e) ? null != e.m : !!e.hasM;
}
var S = class {
  constructor() {
    this._queryEngine = null, this._nextObjectId = null;
  }
  destroy() {
    this._queryEngine?.destroy(), this._queryEngine = this._createDefaultAttributes = null;
  }
  load(t2) {
    return __async(this, null, function* () {
      const i4 = [], { features: s2 } = t2, n2 = this._inferLayerProperties(s2, t2.fields), r = t2.fields || [], a = null != t2.hasM ? t2.hasM : !!n2.hasM, p3 = null != t2.hasZ ? t2.hasZ : !!n2.hasZ, h = !t2.spatialReference && !n2.spatialReference, g2 = h ? R : t2.spatialReference || n2.spatialReference, I = h ? q : null, F = t2.geometryType || n2.geometryType, b = !F;
      let O2 = t2.objectIdField || n2.objectIdField, w2 = t2.timeInfo;
      const S2 = new Z(r);
      if (!b && (h && i4.push({ name: "feature-layer:spatial-reference-not-found", message: "Spatial reference not provided or found in features. Defaults to WGS84" }), !F))
        throw new s("feature-layer:missing-property", "geometryType not set and couldn't be inferred from the provided features");
      if (!O2)
        throw new s("feature-layer:missing-property", "objectIdField not set and couldn't be found in the provided fields");
      if (n2.objectIdField && O2 !== n2.objectIdField && (i4.push({ name: "feature-layer:duplicated-oid-field", message: `Provided objectIdField "${O2}" doesn't match the field name "${n2.objectIdField}", found in the provided fields` }), O2 = n2.objectIdField), O2 && !n2.objectIdField) {
        const e = S2.get(O2);
        e ? (O2 = e.name, e.type = "esriFieldTypeOID", e.editable = false, e.nullable = false) : r.unshift({ alias: O2, name: O2, type: "esriFieldTypeOID", editable: false, nullable: false });
      }
      for (const o2 of r) {
        if (null == o2.name && (o2.name = o2.alias), null == o2.alias && (o2.alias = o2.name), !o2.name)
          throw new s("feature-layer:invalid-field-name", "field name is missing", { field: o2 });
        if (o2.name === O2 && (o2.type = "esriFieldTypeOID"), !i2.jsonValues.includes(o2.type))
          throw new s("feature-layer:invalid-field-type", `invalid type for field "${o2.name}"`, { field: o2 });
        null == o2.length && (o2.length = K(o2));
      }
      const v = {};
      for (const e of r)
        if ("esriFieldTypeOID" !== e.type && "esriFieldTypeGlobalID" !== e.type) {
          const t3 = H(e);
          void 0 !== t3 && (v[e.name] = t3);
        }
      if (w2) {
        if (w2.startTimeField) {
          const e = S2.get(w2.startTimeField);
          e ? (w2.startTimeField = e.name, e.type = "esriFieldTypeDate") : w2.startTimeField = null;
        }
        if (w2.endTimeField) {
          const e = S2.get(w2.endTimeField);
          e ? (w2.endTimeField = e.name, e.type = "esriFieldTypeDate") : w2.endTimeField = null;
        }
        if (w2.trackIdField) {
          const e = S2.get(w2.trackIdField);
          e ? w2.trackIdField = e.name : (w2.trackIdField = null, i4.push({ name: "feature-layer:invalid-timeInfo-trackIdField", message: "trackIdField is missing", details: { timeInfo: w2 } }));
        }
        w2.startTimeField || w2.endTimeField || (i4.push({ name: "feature-layer:invalid-timeInfo", message: "startTimeField and endTimeField are missing or invalid", details: { timeInfo: w2 } }), w2 = null);
      }
      const Q = S2.dateFields.length ? { timeZoneIANA: t2.dateFieldsTimeZone ?? i } : null;
      this._createDefaultAttributes = i3(v, O2);
      const M = { warnings: i4, featureErrors: [], layerDefinition: __spreadProps(__spreadValues({}, D), { drawingInfo: o(F), templates: c(v), extent: I, geometryType: F, objectIdField: O2, fields: r, hasZ: p3, hasM: a, timeInfo: w2, dateFieldsTimeReference: Q }), assignedObjectIds: {} };
      if (this._queryEngine = new $({ fieldsIndex: Z.fromLayerJSON({ fields: r, timeInfo: w2, dateFieldsTimeReference: Q }), geometryType: F, hasM: a, hasZ: p3, objectIdField: O2, spatialReference: g2, featureStore: new m({ geometryType: F, hasM: a, hasZ: p3 }), timeInfo: w2, cacheSpatialQueries: true }), !s2?.length)
        return this._nextObjectId = t, M;
      const Z2 = n(O2, s2);
      return this._nextObjectId = Z2 + 1, yield x(s2, g2), this._loadInitialFeatures(M, s2);
    });
  }
  applyEdits(e) {
    return __async(this, null, function* () {
      const { spatialReference: t2, geometryType: i4 } = this._queryEngine;
      return yield Promise.all([j2(t2, i4), x(e.adds, t2), x(e.updates, t2)]), this._applyEdits(e);
    });
  }
  queryFeatures(e, t2 = {}) {
    return this._queryEngine.executeQuery(e, t2.signal);
  }
  queryFeatureCount(e, t2 = {}) {
    return this._queryEngine.executeQueryForCount(e, t2.signal);
  }
  queryObjectIds(e, t2 = {}) {
    return this._queryEngine.executeQueryForIds(e, t2.signal);
  }
  queryExtent(e, t2 = {}) {
    return this._queryEngine.executeQueryForExtent(e, t2.signal);
  }
  querySnapping(e, t2 = {}) {
    return this._queryEngine.executeQueryForSnapping(e, t2.signal);
  }
  _inferLayerProperties(e, i4) {
    let s2, n2, r = null, a = null, o2 = null;
    for (const l of e) {
      const e2 = l.geometry;
      if (null != e2 && (r || (r = p(e2)), a || (a = e2.spatialReference), null == s2 && (s2 = O(e2)), null == n2 && (n2 = w(e2)), r && a && null != s2 && null != n2))
        break;
    }
    if (i4 && i4.length) {
      let e2 = null;
      i4.some((t2) => {
        const i5 = "esriFieldTypeOID" === t2.type, s3 = !t2.type && t2.name && "objectid" === t2.name.toLowerCase();
        return e2 = t2, i5 || s3;
      }) && (o2 = e2.name);
    }
    return { geometryType: r, spatialReference: a, objectIdField: o2, hasM: n2, hasZ: s2 };
  }
  _loadInitialFeatures(e, i4) {
    return __async(this, null, function* () {
      const { geometryType: s2, hasM: r, hasZ: a, objectIdField: o2, spatialReference: l, featureStore: u2, fieldsIndex: d2 } = this._queryEngine, f2 = [];
      for (const n2 of i4) {
        if (null != n2.uid && (e.assignedObjectIds[n2.uid] = -1), n2.geometry && s2 !== p(n2.geometry)) {
          e.featureErrors.push(f("Incorrect geometry type."));
          continue;
        }
        const i5 = this._createDefaultAttributes(), r2 = p2(d2, i5, n2.attributes, true);
        r2 ? e.featureErrors.push(r2) : (this._assignObjectId(i5, n2.attributes, true), n2.attributes = i5, null != n2.uid && (e.assignedObjectIds[n2.uid] = n2.attributes[o2]), null != n2.geometry && (n2.geometry = j(n2.geometry, n2.geometry.spatialReference, l)), f2.push(n2));
      }
      u2.addMany(et([], f2, s2, a, r, o2));
      const { fullExtent: c2, timeExtent: m2 } = yield this._queryEngine.fetchRecomputedExtents();
      if (e.layerDefinition.extent = c2, m2) {
        const { start: t2, end: i5 } = m2;
        e.layerDefinition.timeInfo.timeExtent = [t2, i5];
      }
      return e;
    });
  }
  _applyEdits(e) {
    return __async(this, null, function* () {
      const { adds: t2, updates: i4, deletes: s2 } = e, n2 = { addResults: [], deleteResults: [], updateResults: [], uidToObjectId: {} };
      if (t2?.length && this._applyAddEdits(n2, t2), i4?.length && this._applyUpdateEdits(n2, i4), s2?.length) {
        for (const e2 of s2)
          n2.deleteResults.push(d(e2));
        this._queryEngine.featureStore.removeManyById(s2);
      }
      const { fullExtent: r, timeExtent: a } = yield this._queryEngine.fetchRecomputedExtents();
      return { extent: r, timeExtent: a, featureEditResults: n2 };
    });
  }
  _applyAddEdits(e, i4) {
    const { addResults: s2 } = e, { geometryType: r, hasM: a, hasZ: o2, objectIdField: l, spatialReference: u2, featureStore: d2, fieldsIndex: f2 } = this._queryEngine, c2 = [];
    for (const n2 of i4) {
      if (n2.geometry && r !== p(n2.geometry)) {
        s2.push(f("Incorrect geometry type."));
        continue;
      }
      const i5 = this._createDefaultAttributes(), a2 = p2(f2, i5, n2.attributes);
      if (a2)
        s2.push(a2);
      else {
        if (this._assignObjectId(i5, n2.attributes), n2.attributes = i5, null != n2.uid) {
          const t2 = n2.attributes[l];
          e.uidToObjectId[n2.uid] = t2;
        }
        if (null != n2.geometry) {
          const e2 = n2.geometry.spatialReference ?? u2;
          n2.geometry = j(y(n2.geometry, e2), e2, u2);
        }
        c2.push(n2), s2.push(d(n2.attributes[l]));
      }
    }
    d2.addMany(et([], c2, r, o2, a, l));
  }
  _applyUpdateEdits({ updateResults: e }, i4) {
    const { geometryType: s2, hasM: n2, hasZ: o2, objectIdField: l, spatialReference: u2, featureStore: d2, fieldsIndex: f2 } = this._queryEngine;
    for (const c2 of i4) {
      const { attributes: i5, geometry: m2 } = c2, y2 = i5?.[l];
      if (null == y2) {
        e.push(f(`Identifier field ${l} missing`));
        continue;
      }
      if (!d2.has(y2)) {
        e.push(f(`Feature with object id ${y2} missing`));
        continue;
      }
      const h = nt(d2.getFeature(y2), s2, o2, n2);
      if (null != m2) {
        if (s2 !== p(m2)) {
          e.push(f("Incorrect geometry type."));
          continue;
        }
        const i6 = m2.spatialReference ?? u2;
        h.geometry = j(y(m2, i6), i6, u2);
      }
      if (i5) {
        const t2 = p2(f2, h.attributes, i5);
        if (t2) {
          e.push(t2);
          continue;
        }
      }
      d2.add(tt(h, s2, o2, n2, l)), e.push(d(y2));
    }
  }
  _assignObjectId(e, t2, i4 = false) {
    const s2 = this._queryEngine.objectIdField;
    i4 && t2 && isFinite(t2[s2]) ? e[s2] = t2[s2] : e[s2] = this._nextObjectId++;
  }
};
export {
  S as default
};
//# sourceMappingURL=chunk-OHM2J3LE.js.map
