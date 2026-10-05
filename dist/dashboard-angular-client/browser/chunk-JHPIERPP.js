import {
  m2 as m
} from "./chunk-EHKCE57B.js";
import {
  _
} from "./chunk-BYMJUQYJ.js";
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

// node_modules/@arcgis/core/rest/knowledgeGraph/GraphObject.js
var t = class extends f {
  constructor(r) {
    super(r), this.properties = null;
  }
};
e([y({ json: { write: true } })], t.prototype, "properties", void 0), t = e([a("esri.rest.knowledgeGraph.GraphObject")], t);
var p = t;

// node_modules/@arcgis/core/rest/knowledgeGraph/GraphNamedObject.js
var s = class extends p {
  constructor(r) {
    super(r), this.typeName = null, this.id = null;
  }
};
e([y({ type: String, json: { write: true } })], s.prototype, "typeName", void 0), e([y({ type: String, json: { write: true } })], s.prototype, "id", void 0), s = e([a("esri.rest.knowledgeGraph.GraphNamedObject")], s);
var p2 = s;

// node_modules/@arcgis/core/rest/knowledgeGraph/Entity.js
var p3 = class extends p2 {
  constructor(o) {
    super(o), this.layoutGeometry = null;
  }
};
e([y({ type: _, json: { write: true } })], p3.prototype, "layoutGeometry", void 0), p3 = e([a("esri.rest.knowledgeGraph.Entity")], p3);
var m2 = p3;

// node_modules/@arcgis/core/rest/knowledgeGraph/ObjectValue.js
var e2 = class extends p {
  constructor(r) {
    super(r);
  }
};
e2 = e([a("esri.rest.knowledgeGraph.ObjectValue")], e2);
var t2 = e2;

// node_modules/@arcgis/core/rest/knowledgeGraph/Path.js
var p4 = class extends f {
  constructor(r) {
    super(r), this.path = null;
  }
};
e([y({ type: [p], json: { write: true } })], p4.prototype, "path", void 0), p4 = e([a("esri.rest.knowledgeGraph.Path")], p4);
var c = p4;

// node_modules/@arcgis/core/rest/knowledgeGraph/Relationship.js
var i = class extends p2 {
  constructor(o) {
    super(o), this.originId = null, this.destinationId = null, this.layoutGeometry = null;
  }
};
e([y({ type: String, json: { write: true } })], i.prototype, "originId", void 0), e([y({ type: String, json: { write: true } })], i.prototype, "destinationId", void 0), e([y({ type: m, json: { write: true } })], i.prototype, "layoutGeometry", void 0), i = e([a("esri.rest.knowledgeGraph.Relationship")], i);
var p5 = i;

export {
  m2 as m,
  t2 as t,
  c,
  p5 as p
};
//# sourceMappingURL=chunk-JHPIERPP.js.map
