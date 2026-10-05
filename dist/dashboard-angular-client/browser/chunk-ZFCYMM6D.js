import {
  K,
  ee,
  oe
} from "./chunk-JTNOZHEF.js";
import "./chunk-66EJ3NTS.js";
import {
  E,
  N
} from "./chunk-Z6MN6YNZ.js";
import {
  p
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
  ot,
  rt
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
import "./chunk-LRQVNXVW.js";
import "./chunk-OXKKAHFH.js";
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
import "./chunk-EQ4EANPC.js";
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
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import {
  G
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import {
  s3 as s2
} from "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import {
  b,
  s as s3
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
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/WFSSourceWorker.js
var w = "esri.layers.WFSLayer";
var R = class {
  constructor() {
    this._customParameters = null, this._queryEngine = null, this._supportsPagination = true;
  }
  destroy() {
    this._queryEngine?.destroy(), this._queryEngine = null;
  }
  load(_0) {
    return __async(this, arguments, function* (e, r = {}) {
      const { getFeatureUrl: s4, getFeatureOutputFormat: o, fields: n2, geometryType: i2, featureType: u, maxRecordCount: c, maxTotalRecordCount: p2, maxPageCount: d2, objectIdField: g, customParameters: y } = e, { spatialReference: _, getFeatureSpatialReference: w2 } = oe(s4, u, e.spatialReference);
      try {
        yield x(w2, _);
      } catch {
        throw new s("unsupported-projection", "Projection not supported", { inSpatialReference: w2, outSpatialReference: _ });
      }
      s3(r), this._customParameters = y, this._featureType = u, this._fieldsIndex = Z.fromLayerJSON({ fields: n2, dateFieldsTimeReference: n2.some((e2) => "esriFieldTypeDate" === e2.type) ? { timeZoneIANA: i } : null }), this._geometryType = i2, this._getFeatureUrl = s4, this._getFeatureOutputFormat = o, this._getFeatureSpatialReference = w2, this._maxRecordCount = c, this._maxTotalRecordCount = p2, this._maxPageCount = d2, this._objectIdField = g, this._spatialReference = _;
      let R2 = yield this._snapshotFeatures(r);
      if (R2.errors.length > 0 && (this._supportsPagination = false, R2 = yield this._snapshotFeatures(r), R2.errors.length > 0))
        throw R2.errors[0];
      return this._queryEngine = new $({ fieldsIndex: this._fieldsIndex, geometryType: i2, hasM: false, hasZ: false, objectIdField: g, spatialReference: _, timeInfo: null, featureStore: new m({ geometryType: i2, hasM: false, hasZ: false }) }), this._queryEngine.featureStore.addMany(R2.features), { warnings: T(R2), extent: (yield this._queryEngine.fetchRecomputedExtents()).fullExtent };
    });
  }
  applyEdits() {
    return __async(this, null, function* () {
      throw new s("wfs-source:editing-not-supported", "applyEdits() is not supported on WFSLayer");
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
  refresh(t) {
    return __async(this, null, function* () {
      return this._customParameters = t.customParameters, this._maxRecordCount = t.maxRecordCount, this._maxTotalRecordCount = t.maxTotalRecordCount, this._maxPageCount = t.maxPageCount, this._snapshotTask?.abort(), this._snapshotTask = d((e) => this._snapshotFeatures({ signal: e })), this._snapshotTask.promise.then((e) => {
        this._queryEngine.featureStore.clear(), this._queryEngine.featureStore.addMany(e.features);
        for (const t2 of T(e))
          n.getLogger(w).warn(new s2("wfs-layer:refresh-warning", t2.message, t2.details));
        e.errors?.length && n.getLogger(w).warn(new s2("wfs-layer:refresh-error", "Refresh completed with errors", { errors: e.errors }));
      }, () => {
        this._queryEngine.featureStore.clear();
      }), yield this._waitSnapshotComplete(), { extent: (yield this._queryEngine.fetchRecomputedExtents()).fullExtent };
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
  _snapshotFeatures(e) {
    return __async(this, null, function* () {
      const t = e?.signal, r = this._maxTotalRecordCount, o = this._maxPageCount, n2 = this._supportsPagination ? yield ee(this._getFeatureUrl, this._featureType.typeName, { customParameters: this._customParameters, signal: t }) : void 0;
      let i2 = [];
      const u = [];
      if (null == n2)
        try {
          i2 = yield this._singleQuery(t);
        } catch (l) {
          b(l) || u.push(l);
        }
      else {
        const e2 = Math.min(n2, r), a = F(this, Math.max(1, Math.min(Math.ceil(e2 / this._maxRecordCount), o)), t);
        yield Promise.allSettled(Array.from({ length: 10 }).map(() => S(a, i2, u)));
      }
      return s3(t), { features: i2, totalRecordCount: n2, maxTotalRecordCount: r, maxPageCount: o, errors: u };
    });
  }
  _singleQuery(e) {
    return __async(this, null, function* () {
      const t = yield K(this._getFeatureUrl, this._featureType.typeName, this._getFeatureSpatialReference, this._getFeatureOutputFormat, { customParameters: this._customParameters, signal: e });
      return this._processGeoJSON(t, { signal: e });
    });
  }
  _pageQuery(e, t) {
    return __async(this, null, function* () {
      const r = e * this._maxRecordCount, a = yield K(this._getFeatureUrl, this._featureType.typeName, this._getFeatureSpatialReference, this._getFeatureOutputFormat, { customParameters: this._customParameters, startIndex: r, count: this._maxRecordCount, signal: t });
      return this._processGeoJSON(a, { startIndex: r, signal: t });
    });
  }
  _processGeoJSON(e, t) {
    E(e, this._getFeatureSpatialReference.wkid);
    const { startIndex: r, signal: s4 } = t;
    s3(s4);
    const o = N(e, { geometryType: this._geometryType, hasZ: false, objectIdField: this._objectIdField });
    if (!G(this._spatialReference, this._getFeatureSpatialReference))
      for (const a of o)
        null != a.geometry && (a.geometry = ot(j(rt(a.geometry, this._geometryType, false, false), this._getFeatureSpatialReference, this._spatialReference)));
    let l = r ?? 1;
    for (const a of o) {
      const e2 = {};
      p(this._fieldsIndex, e2, a.attributes, true), a.attributes = e2, null == e2[this._objectIdField] && (a.objectId = e2[this._objectIdField] = l++);
    }
    return o;
  }
};
function* F(e, t, r) {
  for (let a = 0; a < t; a++)
    yield e._pageQuery(a, r);
}
function S(e, t, r) {
  return __async(this, null, function* () {
    let a = e.next();
    for (; !a.done; ) {
      try {
        const e2 = yield a.value;
        t.push(...e2);
      } catch (o) {
        b(o) || r.push(o);
      }
      a = e.next();
    }
  });
}
function T(e) {
  const t = [];
  return null != e.totalRecordCount && (e.features.length < e.totalRecordCount && t.push({ name: "wfs-layer:maxRecordCount-too-low", message: `Could only fetch ${e.features.length} of ${e.totalRecordCount} in ${e.maxPageCount} queries. Try increasing the value of WFSLayer.maxRecordCount.`, details: { recordCount: e.features.length, totalRecordCount: e.totalRecordCount } }), e.totalRecordCount > e.maxTotalRecordCount && t.push({ name: "wfs-layer:large-dataset", message: `The number of ${e.totalRecordCount} features exceeds the maximum allowed of ${e.maxTotalRecordCount}.`, details: { recordCount: e.features.length, totalRecordCount: e.totalRecordCount, maxTotalRecordCount: e.maxTotalRecordCount } })), t;
}
export {
  R as default
};
//# sourceMappingURL=chunk-ZFCYMM6D.js.map
