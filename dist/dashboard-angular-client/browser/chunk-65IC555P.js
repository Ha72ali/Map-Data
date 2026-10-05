import {
  e as e2
} from "./chunk-ZT67NY4U.js";
import {
  j
} from "./chunk-XJBIIRXZ.js";
import {
  z
} from "./chunk-EZCWLJZT.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js
var p = (p2) => {
  let n = class extends p2 {
    constructor() {
      super(...arguments), this.copyright = null, this.minScale = 0, this.maxScale = 0, this.spatialReference = null, this.tileInfo = null, this.tilemapCache = null;
    }
    destroy() {
      this.tilemapCache?.destroy?.();
    }
    readMinScale(e3, o2) {
      return null != o2.minLOD && null != o2.maxLOD ? e3 : 0;
    }
    readMaxScale(e3, o2) {
      return null != o2.minLOD && null != o2.maxLOD ? e3 : 0;
    }
    get supportsBlankTile() {
      return this.version >= 10.2;
    }
    readTilemapCache(e3, o2, r) {
      const t = o2.capabilities?.includes("Tilemap");
      let { minLOD: a2, maxLOD: p3, minScale: n2, maxScale: c } = o2;
      if (null == a2 && null == p3 && 0 !== n2 && 0 !== c) {
        const e4 = (e5) => Math.round(1e4 * e5) / 1e4;
        n2 = e4(n2 || o2.tileInfo.lods[0].scale), c = e4(c || o2.tileInfo.lods[o2.tileInfo.lods.length - 1].scale);
        for (const r2 of o2.tileInfo.lods) {
          const o3 = e4(r2.scale);
          a2 = o3 >= n2 ? r2.level : a2, p3 = o3 >= c ? r2.level : p3;
        }
      }
      if (t)
        return new j({ layer: this, minLOD: a2, maxLOD: p3 });
      if (o2.tileInfo) {
        const e4 = new z();
        return e4.read(o2.tileInfo, r), new e2(e4, a2, p3);
      }
      return null;
    }
  };
  return e([y({ json: { read: { source: "copyrightText" } } })], n.prototype, "copyright", void 0), e([y()], n.prototype, "minScale", void 0), e([o("service", "minScale")], n.prototype, "readMinScale", null), e([y()], n.prototype, "maxScale", void 0), e([o("service", "maxScale")], n.prototype, "readMaxScale", null), e([y({ type: f })], n.prototype, "spatialReference", void 0), e([y({ readOnly: true })], n.prototype, "supportsBlankTile", null), e([y({ type: z })], n.prototype, "tileInfo", void 0), e([y()], n.prototype, "tilemapCache", void 0), e([o("service", "tilemapCache", ["capabilities", "tileInfo"])], n.prototype, "readTilemapCache", null), e([y()], n.prototype, "version", void 0), n = e([a("esri.layers.mixins.ArcGISCachedService")], n), n;
};

export {
  p
};
//# sourceMappingURL=chunk-65IC555P.js.map
