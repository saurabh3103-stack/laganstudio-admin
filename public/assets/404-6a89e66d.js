var Ir = Object.defineProperty;
var Lr = (i, e, t) =>
  e in i
    ? Ir(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (i[e] = t);
var S = (i, e, t) => (Lr(i, typeof e != "symbol" ? e + "" : e, t), t);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerPolicy && (s.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = t(r);
    fetch(r.href, s);
  }
})();
var G = "top",
  se = "bottom",
  oe = "right",
  Q = "left",
  Ai = "auto",
  ft = [G, se, oe, Q],
  Ge = "start",
  ut = "end",
  Tr = "clippingParents",
  kn = "viewport",
  st = "popper",
  Mr = "reference",
  Fi = ft.reduce(function (i, e) {
    return i.concat([e + "-" + Ge, e + "-" + ut]);
  }, []),
  In = [].concat(ft, [Ai]).reduce(function (i, e) {
    return i.concat([e, e + "-" + Ge, e + "-" + ut]);
  }, []),
  Dr = "beforeRead",
  zr = "read",
  Pr = "afterRead",
  Hr = "beforeMain",
  $r = "main",
  Vr = "afterMain",
  Fr = "beforeWrite",
  Rr = "write",
  jr = "afterWrite",
  Nr = [Dr, zr, Pr, Hr, $r, Vr, Fr, Rr, jr];
function fe(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function ee(i) {
  if (i == null) return window;
  if (i.toString() !== "[object Window]") {
    var e = i.ownerDocument;
    return (e && e.defaultView) || window;
  }
  return i;
}
function $e(i) {
  var e = ee(i).Element;
  return i instanceof e || i instanceof Element;
}
function re(i) {
  var e = ee(i).HTMLElement;
  return i instanceof e || i instanceof HTMLElement;
}
function Ci(i) {
  if (typeof ShadowRoot > "u") return !1;
  var e = ee(i).ShadowRoot;
  return i instanceof e || i instanceof ShadowRoot;
}
function Wr(i) {
  var e = i.state;
  Object.keys(e.elements).forEach(function (t) {
    var n = e.styles[t] || {},
      r = e.attributes[t] || {},
      s = e.elements[t];
    !re(s) ||
      !fe(s) ||
      (Object.assign(s.style, n),
      Object.keys(r).forEach(function (o) {
        var a = r[o];
        a === !1 ? s.removeAttribute(o) : s.setAttribute(o, a === !0 ? "" : a);
      }));
  });
}
function Br(i) {
  var e = i.state,
    t = {
      popper: {
        position: e.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: { position: "absolute" },
      reference: {}
    };
  return (
    Object.assign(e.elements.popper.style, t.popper),
    (e.styles = t),
    e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow),
    function () {
      Object.keys(e.elements).forEach(function (n) {
        var r = e.elements[n],
          s = e.attributes[n] || {},
          o = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : t[n]),
          a = o.reduce(function (l, c) {
            return (l[c] = ""), l;
          }, {});
        !re(r) ||
          !fe(r) ||
          (Object.assign(r.style, a),
          Object.keys(s).forEach(function (l) {
            r.removeAttribute(l);
          }));
      });
    }
  );
}
const Ln = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Wr,
  effect: Br,
  requires: ["computeStyles"]
};
function he(i) {
  return i.split("-")[0];
}
var He = Math.max,
  Vt = Math.min,
  Qe = Math.round;
function di() {
  var i = navigator.userAgentData;
  return i != null && i.brands && Array.isArray(i.brands)
    ? i.brands
        .map(function (e) {
          return e.brand + "/" + e.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function Tn() {
  return !/^((?!chrome|android).)*safari/i.test(di());
}
function Je(i, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var n = i.getBoundingClientRect(),
    r = 1,
    s = 1;
  e &&
    re(i) &&
    ((r = (i.offsetWidth > 0 && Qe(n.width) / i.offsetWidth) || 1),
    (s = (i.offsetHeight > 0 && Qe(n.height) / i.offsetHeight) || 1));
  var o = $e(i) ? ee(i) : window,
    a = o.visualViewport,
    l = !Tn() && t,
    c = (n.left + (l && a ? a.offsetLeft : 0)) / r,
    d = (n.top + (l && a ? a.offsetTop : 0)) / s,
    p = n.width / r,
    h = n.height / s;
  return {
    width: p,
    height: h,
    top: d,
    right: c + p,
    bottom: d + h,
    left: c,
    x: c,
    y: d
  };
}
function ki(i) {
  var e = Je(i),
    t = i.offsetWidth,
    n = i.offsetHeight;
  return (
    Math.abs(e.width - t) <= 1 && (t = e.width),
    Math.abs(e.height - n) <= 1 && (n = e.height),
    { x: i.offsetLeft, y: i.offsetTop, width: t, height: n }
  );
}
function Mn(i, e) {
  var t = e.getRootNode && e.getRootNode();
  if (i.contains(e)) return !0;
  if (t && Ci(t)) {
    var n = e;
    do {
      if (n && i.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function be(i) {
  return ee(i).getComputedStyle(i);
}
function qr(i) {
  return ["table", "td", "th"].indexOf(fe(i)) >= 0;
}
function Ce(i) {
  return (($e(i) ? i.ownerDocument : i.document) || window.document)
    .documentElement;
}
function Yt(i) {
  return fe(i) === "html"
    ? i
    : i.assignedSlot || i.parentNode || (Ci(i) ? i.host : null) || Ce(i);
}
function Ri(i) {
  return !re(i) || be(i).position === "fixed" ? null : i.offsetParent;
}
function Ur(i) {
  var e = /firefox/i.test(di()),
    t = /Trident/i.test(di());
  if (t && re(i)) {
    var n = be(i);
    if (n.position === "fixed") return null;
  }
  var r = Yt(i);
  for (Ci(r) && (r = r.host); re(r) && ["html", "body"].indexOf(fe(r)) < 0; ) {
    var s = be(r);
    if (
      s.transform !== "none" ||
      s.perspective !== "none" ||
      s.contain === "paint" ||
      ["transform", "perspective"].indexOf(s.willChange) !== -1 ||
      (e && s.willChange === "filter") ||
      (e && s.filter && s.filter !== "none")
    )
      return r;
    r = r.parentNode;
  }
  return null;
}
function vt(i) {
  for (var e = ee(i), t = Ri(i); t && qr(t) && be(t).position === "static"; )
    t = Ri(t);
  return t &&
    (fe(t) === "html" || (fe(t) === "body" && be(t).position === "static"))
    ? e
    : t || Ur(i) || e;
}
function Ii(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function lt(i, e, t) {
  return He(i, Vt(e, t));
}
function Yr(i, e, t) {
  var n = lt(i, e, t);
  return n > t ? t : n;
}
function Dn() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function zn(i) {
  return Object.assign({}, Dn(), i);
}
function Pn(i, e) {
  return e.reduce(function (t, n) {
    return (t[n] = i), t;
  }, {});
}
var Xr = function (e, t) {
  return (
    (e =
      typeof e == "function"
        ? e(Object.assign({}, t.rects, { placement: t.placement }))
        : e),
    zn(typeof e != "number" ? e : Pn(e, ft))
  );
};
function Kr(i) {
  var e,
    t = i.state,
    n = i.name,
    r = i.options,
    s = t.elements.arrow,
    o = t.modifiersData.popperOffsets,
    a = he(t.placement),
    l = Ii(a),
    c = [Q, oe].indexOf(a) >= 0,
    d = c ? "height" : "width";
  if (!(!s || !o)) {
    var p = Xr(r.padding, t),
      h = ki(s),
      g = l === "y" ? G : Q,
      m = l === "y" ? se : oe,
      _ =
        t.rects.reference[d] + t.rects.reference[l] - o[l] - t.rects.popper[d],
      b = o[l] - t.rects.reference[l],
      w = vt(s),
      y = w ? (l === "y" ? w.clientHeight || 0 : w.clientWidth || 0) : 0,
      A = _ / 2 - b / 2,
      u = p[g],
      I = y - h[d] - p[m],
      v = y / 2 - h[d] / 2 + A,
      x = lt(u, v, I),
      E = l;
    t.modifiersData[n] = ((e = {}), (e[E] = x), (e.centerOffset = x - v), e);
  }
}
function Gr(i) {
  var e = i.state,
    t = i.options,
    n = t.element,
    r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null &&
    ((typeof r == "string" && ((r = e.elements.popper.querySelector(r)), !r)) ||
      (Mn(e.elements.popper, r) && (e.elements.arrow = r)));
}
const Qr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Kr,
  effect: Gr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ze(i) {
  return i.split("-")[1];
}
var Jr = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Zr(i, e) {
  var t = i.x,
    n = i.y,
    r = e.devicePixelRatio || 1;
  return { x: Qe(t * r) / r || 0, y: Qe(n * r) / r || 0 };
}
function ji(i) {
  var e,
    t = i.popper,
    n = i.popperRect,
    r = i.placement,
    s = i.variation,
    o = i.offsets,
    a = i.position,
    l = i.gpuAcceleration,
    c = i.adaptive,
    d = i.roundOffsets,
    p = i.isFixed,
    h = o.x,
    g = h === void 0 ? 0 : h,
    m = o.y,
    _ = m === void 0 ? 0 : m,
    b = typeof d == "function" ? d({ x: g, y: _ }) : { x: g, y: _ };
  (g = b.x), (_ = b.y);
  var w = o.hasOwnProperty("x"),
    y = o.hasOwnProperty("y"),
    A = Q,
    u = G,
    I = window;
  if (c) {
    var v = vt(t),
      x = "clientHeight",
      E = "clientWidth";
    if (
      (v === ee(t) &&
        ((v = Ce(t)),
        be(v).position !== "static" &&
          a === "absolute" &&
          ((x = "scrollHeight"), (E = "scrollWidth"))),
      (v = v),
      r === G || ((r === Q || r === oe) && s === ut))
    ) {
      u = se;
      var L = p && v === I && I.visualViewport ? I.visualViewport.height : v[x];
      (_ -= L - n.height), (_ *= l ? 1 : -1);
    }
    if (r === Q || ((r === G || r === se) && s === ut)) {
      A = oe;
      var C = p && v === I && I.visualViewport ? I.visualViewport.width : v[E];
      (g -= C - n.width), (g *= l ? 1 : -1);
    }
  }
  var D = Object.assign({ position: a }, c && Jr),
    R = d === !0 ? Zr({ x: g, y: _ }, ee(t)) : { x: g, y: _ };
  if (((g = R.x), (_ = R.y), l)) {
    var V;
    return Object.assign(
      {},
      D,
      ((V = {}),
      (V[u] = y ? "0" : ""),
      (V[A] = w ? "0" : ""),
      (V.transform =
        (I.devicePixelRatio || 1) <= 1
          ? "translate(" + g + "px, " + _ + "px)"
          : "translate3d(" + g + "px, " + _ + "px, 0)"),
      V)
    );
  }
  return Object.assign(
    {},
    D,
    ((e = {}),
    (e[u] = y ? _ + "px" : ""),
    (e[A] = w ? g + "px" : ""),
    (e.transform = ""),
    e)
  );
}
function es(i) {
  var e = i.state,
    t = i.options,
    n = t.gpuAcceleration,
    r = n === void 0 ? !0 : n,
    s = t.adaptive,
    o = s === void 0 ? !0 : s,
    a = t.roundOffsets,
    l = a === void 0 ? !0 : a,
    c = {
      placement: he(e.placement),
      variation: Ze(e.placement),
      popper: e.elements.popper,
      popperRect: e.rects.popper,
      gpuAcceleration: r,
      isFixed: e.options.strategy === "fixed"
    };
  e.modifiersData.popperOffsets != null &&
    (e.styles.popper = Object.assign(
      {},
      e.styles.popper,
      ji(
        Object.assign({}, c, {
          offsets: e.modifiersData.popperOffsets,
          position: e.options.strategy,
          adaptive: o,
          roundOffsets: l
        })
      )
    )),
    e.modifiersData.arrow != null &&
      (e.styles.arrow = Object.assign(
        {},
        e.styles.arrow,
        ji(
          Object.assign({}, c, {
            offsets: e.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l
          })
        )
      )),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      "data-popper-placement": e.placement
    }));
}
const ts = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: es,
  data: {}
};
var Ct = { passive: !0 };
function is(i) {
  var e = i.state,
    t = i.instance,
    n = i.options,
    r = n.scroll,
    s = r === void 0 ? !0 : r,
    o = n.resize,
    a = o === void 0 ? !0 : o,
    l = ee(e.elements.popper),
    c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return (
    s &&
      c.forEach(function (d) {
        d.addEventListener("scroll", t.update, Ct);
      }),
    a && l.addEventListener("resize", t.update, Ct),
    function () {
      s &&
        c.forEach(function (d) {
          d.removeEventListener("scroll", t.update, Ct);
        }),
        a && l.removeEventListener("resize", t.update, Ct);
    }
  );
}
const ns = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: is,
  data: {}
};
var rs = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Tt(i) {
  return i.replace(/left|right|bottom|top/g, function (e) {
    return rs[e];
  });
}
var ss = { start: "end", end: "start" };
function Ni(i) {
  return i.replace(/start|end/g, function (e) {
    return ss[e];
  });
}
function Li(i) {
  var e = ee(i),
    t = e.pageXOffset,
    n = e.pageYOffset;
  return { scrollLeft: t, scrollTop: n };
}
function Ti(i) {
  return Je(Ce(i)).left + Li(i).scrollLeft;
}
function os(i, e) {
  var t = ee(i),
    n = Ce(i),
    r = t.visualViewport,
    s = n.clientWidth,
    o = n.clientHeight,
    a = 0,
    l = 0;
  if (r) {
    (s = r.width), (o = r.height);
    var c = Tn();
    (c || (!c && e === "fixed")) && ((a = r.offsetLeft), (l = r.offsetTop));
  }
  return { width: s, height: o, x: a + Ti(i), y: l };
}
function as(i) {
  var e,
    t = Ce(i),
    n = Li(i),
    r = (e = i.ownerDocument) == null ? void 0 : e.body,
    s = He(
      t.scrollWidth,
      t.clientWidth,
      r ? r.scrollWidth : 0,
      r ? r.clientWidth : 0
    ),
    o = He(
      t.scrollHeight,
      t.clientHeight,
      r ? r.scrollHeight : 0,
      r ? r.clientHeight : 0
    ),
    a = -n.scrollLeft + Ti(i),
    l = -n.scrollTop;
  return (
    be(r || t).direction === "rtl" &&
      (a += He(t.clientWidth, r ? r.clientWidth : 0) - s),
    { width: s, height: o, x: a, y: l }
  );
}
function Mi(i) {
  var e = be(i),
    t = e.overflow,
    n = e.overflowX,
    r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + n);
}
function Hn(i) {
  return ["html", "body", "#document"].indexOf(fe(i)) >= 0
    ? i.ownerDocument.body
    : re(i) && Mi(i)
    ? i
    : Hn(Yt(i));
}
function ct(i, e) {
  var t;
  e === void 0 && (e = []);
  var n = Hn(i),
    r = n === ((t = i.ownerDocument) == null ? void 0 : t.body),
    s = ee(n),
    o = r ? [s].concat(s.visualViewport || [], Mi(n) ? n : []) : n,
    a = e.concat(o);
  return r ? a : a.concat(ct(Yt(o)));
}
function ui(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function ls(i, e) {
  var t = Je(i, !1, e === "fixed");
  return (
    (t.top = t.top + i.clientTop),
    (t.left = t.left + i.clientLeft),
    (t.bottom = t.top + i.clientHeight),
    (t.right = t.left + i.clientWidth),
    (t.width = i.clientWidth),
    (t.height = i.clientHeight),
    (t.x = t.left),
    (t.y = t.top),
    t
  );
}
function Wi(i, e, t) {
  return e === kn ? ui(os(i, t)) : $e(e) ? ls(e, t) : ui(as(Ce(i)));
}
function cs(i) {
  var e = ct(Yt(i)),
    t = ["absolute", "fixed"].indexOf(be(i).position) >= 0,
    n = t && re(i) ? vt(i) : i;
  return $e(n)
    ? e.filter(function (r) {
        return $e(r) && Mn(r, n) && fe(r) !== "body";
      })
    : [];
}
function ds(i, e, t, n) {
  var r = e === "clippingParents" ? cs(i) : [].concat(e),
    s = [].concat(r, [t]),
    o = s[0],
    a = s.reduce(function (l, c) {
      var d = Wi(i, c, n);
      return (
        (l.top = He(d.top, l.top)),
        (l.right = Vt(d.right, l.right)),
        (l.bottom = Vt(d.bottom, l.bottom)),
        (l.left = He(d.left, l.left)),
        l
      );
    }, Wi(i, o, n));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function $n(i) {
  var e = i.reference,
    t = i.element,
    n = i.placement,
    r = n ? he(n) : null,
    s = n ? Ze(n) : null,
    o = e.x + e.width / 2 - t.width / 2,
    a = e.y + e.height / 2 - t.height / 2,
    l;
  switch (r) {
    case G:
      l = { x: o, y: e.y - t.height };
      break;
    case se:
      l = { x: o, y: e.y + e.height };
      break;
    case oe:
      l = { x: e.x + e.width, y: a };
      break;
    case Q:
      l = { x: e.x - t.width, y: a };
      break;
    default:
      l = { x: e.x, y: e.y };
  }
  var c = r ? Ii(r) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (s) {
      case Ge:
        l[c] = l[c] - (e[d] / 2 - t[d] / 2);
        break;
      case ut:
        l[c] = l[c] + (e[d] / 2 - t[d] / 2);
        break;
    }
  }
  return l;
}
function pt(i, e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.placement,
    r = n === void 0 ? i.placement : n,
    s = t.strategy,
    o = s === void 0 ? i.strategy : s,
    a = t.boundary,
    l = a === void 0 ? Tr : a,
    c = t.rootBoundary,
    d = c === void 0 ? kn : c,
    p = t.elementContext,
    h = p === void 0 ? st : p,
    g = t.altBoundary,
    m = g === void 0 ? !1 : g,
    _ = t.padding,
    b = _ === void 0 ? 0 : _,
    w = zn(typeof b != "number" ? b : Pn(b, ft)),
    y = h === st ? Mr : st,
    A = i.rects.popper,
    u = i.elements[m ? y : h],
    I = ds($e(u) ? u : u.contextElement || Ce(i.elements.popper), l, d, o),
    v = Je(i.elements.reference),
    x = $n({ reference: v, element: A, strategy: "absolute", placement: r }),
    E = ui(Object.assign({}, A, x)),
    L = h === st ? E : v,
    C = {
      top: I.top - L.top + w.top,
      bottom: L.bottom - I.bottom + w.bottom,
      left: I.left - L.left + w.left,
      right: L.right - I.right + w.right
    },
    D = i.modifiersData.offset;
  if (h === st && D) {
    var R = D[r];
    Object.keys(C).forEach(function (V) {
      var J = [oe, se].indexOf(V) >= 0 ? 1 : -1,
        Z = [G, se].indexOf(V) >= 0 ? "y" : "x";
      C[V] += R[Z] * J;
    });
  }
  return C;
}
function us(i, e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.placement,
    r = t.boundary,
    s = t.rootBoundary,
    o = t.padding,
    a = t.flipVariations,
    l = t.allowedAutoPlacements,
    c = l === void 0 ? In : l,
    d = Ze(n),
    p = d
      ? a
        ? Fi
        : Fi.filter(function (m) {
            return Ze(m) === d;
          })
      : ft,
    h = p.filter(function (m) {
      return c.indexOf(m) >= 0;
    });
  h.length === 0 && (h = p);
  var g = h.reduce(function (m, _) {
    return (
      (m[_] = pt(i, { placement: _, boundary: r, rootBoundary: s, padding: o })[
        he(_)
      ]),
      m
    );
  }, {});
  return Object.keys(g).sort(function (m, _) {
    return g[m] - g[_];
  });
}
function ps(i) {
  if (he(i) === Ai) return [];
  var e = Tt(i);
  return [Ni(i), e, Ni(e)];
}
function hs(i) {
  var e = i.state,
    t = i.options,
    n = i.name;
  if (!e.modifiersData[n]._skip) {
    for (
      var r = t.mainAxis,
        s = r === void 0 ? !0 : r,
        o = t.altAxis,
        a = o === void 0 ? !0 : o,
        l = t.fallbackPlacements,
        c = t.padding,
        d = t.boundary,
        p = t.rootBoundary,
        h = t.altBoundary,
        g = t.flipVariations,
        m = g === void 0 ? !0 : g,
        _ = t.allowedAutoPlacements,
        b = e.options.placement,
        w = he(b),
        y = w === b,
        A = l || (y || !m ? [Tt(b)] : ps(b)),
        u = [b].concat(A).reduce(function (ve, ae) {
          return ve.concat(
            he(ae) === Ai
              ? us(e, {
                  placement: ae,
                  boundary: d,
                  rootBoundary: p,
                  padding: c,
                  flipVariations: m,
                  allowedAutoPlacements: _
                })
              : ae
          );
        }, []),
        I = e.rects.reference,
        v = e.rects.popper,
        x = new Map(),
        E = !0,
        L = u[0],
        C = 0;
      C < u.length;
      C++
    ) {
      var D = u[C],
        R = he(D),
        V = Ze(D) === Ge,
        J = [G, se].indexOf(R) >= 0,
        Z = J ? "width" : "height",
        W = pt(e, {
          placement: D,
          boundary: d,
          rootBoundary: p,
          altBoundary: h,
          padding: c
        }),
        B = J ? (V ? oe : Q) : V ? se : G;
      I[Z] > v[Z] && (B = Tt(B));
      var j = Tt(B),
        ce = [];
      if (
        (s && ce.push(W[R] <= 0),
        a && ce.push(W[B] <= 0, W[j] <= 0),
        ce.every(function (ve) {
          return ve;
        }))
      ) {
        (L = D), (E = !1);
        break;
      }
      x.set(D, ce);
    }
    if (E)
      for (
        var de = m ? 3 : 1,
          ke = function (ae) {
            var me = u.find(function (je) {
              var ge = x.get(je);
              if (ge)
                return ge.slice(0, ae).every(function (Ne) {
                  return Ne;
                });
            });
            if (me) return (L = me), "break";
          },
          ue = de;
        ue > 0;
        ue--
      ) {
        var Ie = ke(ue);
        if (Ie === "break") break;
      }
    e.placement !== L &&
      ((e.modifiersData[n]._skip = !0), (e.placement = L), (e.reset = !0));
  }
}
const fs = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: hs,
  requiresIfExists: ["offset"],
  data: { _skip: !1 }
};
function Bi(i, e, t) {
  return (
    t === void 0 && (t = { x: 0, y: 0 }),
    {
      top: i.top - e.height - t.y,
      right: i.right - e.width + t.x,
      bottom: i.bottom - e.height + t.y,
      left: i.left - e.width - t.x
    }
  );
}
function qi(i) {
  return [G, oe, se, Q].some(function (e) {
    return i[e] >= 0;
  });
}
function vs(i) {
  var e = i.state,
    t = i.name,
    n = e.rects.reference,
    r = e.rects.popper,
    s = e.modifiersData.preventOverflow,
    o = pt(e, { elementContext: "reference" }),
    a = pt(e, { altBoundary: !0 }),
    l = Bi(o, n),
    c = Bi(a, r, s),
    d = qi(l),
    p = qi(c);
  (e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: d,
    hasPopperEscaped: p
  }),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      "data-popper-reference-hidden": d,
      "data-popper-escaped": p
    }));
}
const ms = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: vs
};
function gs(i, e, t) {
  var n = he(i),
    r = [Q, G].indexOf(n) >= 0 ? -1 : 1,
    s = typeof t == "function" ? t(Object.assign({}, e, { placement: i })) : t,
    o = s[0],
    a = s[1];
  return (
    (o = o || 0),
    (a = (a || 0) * r),
    [Q, oe].indexOf(n) >= 0 ? { x: a, y: o } : { x: o, y: a }
  );
}
function ys(i) {
  var e = i.state,
    t = i.options,
    n = i.name,
    r = t.offset,
    s = r === void 0 ? [0, 0] : r,
    o = In.reduce(function (d, p) {
      return (d[p] = gs(p, e.rects, s)), d;
    }, {}),
    a = o[e.placement],
    l = a.x,
    c = a.y;
  e.modifiersData.popperOffsets != null &&
    ((e.modifiersData.popperOffsets.x += l),
    (e.modifiersData.popperOffsets.y += c)),
    (e.modifiersData[n] = o);
}
const _s = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ys
};
function bs(i) {
  var e = i.state,
    t = i.name;
  e.modifiersData[t] = $n({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ws = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: bs,
  data: {}
};
function xs(i) {
  return i === "x" ? "y" : "x";
}
function Es(i) {
  var e = i.state,
    t = i.options,
    n = i.name,
    r = t.mainAxis,
    s = r === void 0 ? !0 : r,
    o = t.altAxis,
    a = o === void 0 ? !1 : o,
    l = t.boundary,
    c = t.rootBoundary,
    d = t.altBoundary,
    p = t.padding,
    h = t.tether,
    g = h === void 0 ? !0 : h,
    m = t.tetherOffset,
    _ = m === void 0 ? 0 : m,
    b = pt(e, { boundary: l, rootBoundary: c, padding: p, altBoundary: d }),
    w = he(e.placement),
    y = Ze(e.placement),
    A = !y,
    u = Ii(w),
    I = xs(u),
    v = e.modifiersData.popperOffsets,
    x = e.rects.reference,
    E = e.rects.popper,
    L =
      typeof _ == "function"
        ? _(Object.assign({}, e.rects, { placement: e.placement }))
        : _,
    C =
      typeof L == "number"
        ? { mainAxis: L, altAxis: L }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, L),
    D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
    R = { x: 0, y: 0 };
  if (v) {
    if (s) {
      var V,
        J = u === "y" ? G : Q,
        Z = u === "y" ? se : oe,
        W = u === "y" ? "height" : "width",
        B = v[u],
        j = B + b[J],
        ce = B - b[Z],
        de = g ? -E[W] / 2 : 0,
        ke = y === Ge ? x[W] : E[W],
        ue = y === Ge ? -E[W] : -x[W],
        Ie = e.elements.arrow,
        ve = g && Ie ? ki(Ie) : { width: 0, height: 0 },
        ae = e.modifiersData["arrow#persistent"]
          ? e.modifiersData["arrow#persistent"].padding
          : Dn(),
        me = ae[J],
        je = ae[Z],
        ge = lt(0, x[W], ve[W]),
        Ne = A
          ? x[W] / 2 - de - ge - me - C.mainAxis
          : ke - ge - me - C.mainAxis,
        we = A
          ? -x[W] / 2 + de + ge + je + C.mainAxis
          : ue + ge + je + C.mainAxis,
        We = e.elements.arrow && vt(e.elements.arrow),
        mt = We ? (u === "y" ? We.clientTop || 0 : We.clientLeft || 0) : 0,
        et = (V = D == null ? void 0 : D[u]) != null ? V : 0,
        gt = B + Ne - et - mt,
        yt = B + we - et,
        tt = lt(g ? Vt(j, gt) : j, B, g ? He(ce, yt) : ce);
      (v[u] = tt), (R[u] = tt - B);
    }
    if (a) {
      var it,
        _t = u === "x" ? G : Q,
        bt = u === "x" ? se : oe,
        ye = v[I],
        xe = I === "y" ? "height" : "width",
        nt = ye + b[_t],
        Le = ye - b[bt],
        rt = [G, Q].indexOf(w) !== -1,
        wt = (it = D == null ? void 0 : D[I]) != null ? it : 0,
        xt = rt ? nt : ye - x[xe] - E[xe] - wt + C.altAxis,
        Et = rt ? ye + x[xe] + E[xe] - wt - C.altAxis : Le,
        Ot = g && rt ? Yr(xt, ye, Et) : lt(g ? xt : nt, ye, g ? Et : Le);
      (v[I] = Ot), (R[I] = Ot - ye);
    }
    e.modifiersData[n] = R;
  }
}
const Os = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Es,
  requiresIfExists: ["offset"]
};
function Ss(i) {
  return { scrollLeft: i.scrollLeft, scrollTop: i.scrollTop };
}
function As(i) {
  return i === ee(i) || !re(i) ? Li(i) : Ss(i);
}
function Cs(i) {
  var e = i.getBoundingClientRect(),
    t = Qe(e.width) / i.offsetWidth || 1,
    n = Qe(e.height) / i.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function ks(i, e, t) {
  t === void 0 && (t = !1);
  var n = re(e),
    r = re(e) && Cs(e),
    s = Ce(e),
    o = Je(i, r, t),
    a = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (n || (!n && !t)) &&
      ((fe(e) !== "body" || Mi(s)) && (a = As(e)),
      re(e)
        ? ((l = Je(e, !0)), (l.x += e.clientLeft), (l.y += e.clientTop))
        : s && (l.x = Ti(s))),
    {
      x: o.left + a.scrollLeft - l.x,
      y: o.top + a.scrollTop - l.y,
      width: o.width,
      height: o.height
    }
  );
}
function Is(i) {
  var e = new Map(),
    t = new Set(),
    n = [];
  i.forEach(function (s) {
    e.set(s.name, s);
  });
  function r(s) {
    t.add(s.name);
    var o = [].concat(s.requires || [], s.requiresIfExists || []);
    o.forEach(function (a) {
      if (!t.has(a)) {
        var l = e.get(a);
        l && r(l);
      }
    }),
      n.push(s);
  }
  return (
    i.forEach(function (s) {
      t.has(s.name) || r(s);
    }),
    n
  );
}
function Ls(i) {
  var e = Is(i);
  return Nr.reduce(function (t, n) {
    return t.concat(
      e.filter(function (r) {
        return r.phase === n;
      })
    );
  }, []);
}
function Ts(i) {
  var e;
  return function () {
    return (
      e ||
        (e = new Promise(function (t) {
          Promise.resolve().then(function () {
            (e = void 0), t(i());
          });
        })),
      e
    );
  };
}
function Ms(i) {
  var e = i.reduce(function (t, n) {
    var r = t[n.name];
    return (
      (t[n.name] = r
        ? Object.assign({}, r, n, {
            options: Object.assign({}, r.options, n.options),
            data: Object.assign({}, r.data, n.data)
          })
        : n),
      t
    );
  }, {});
  return Object.keys(e).map(function (t) {
    return e[t];
  });
}
var Ui = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Yi() {
  for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
    e[t] = arguments[t];
  return !e.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Ds(i) {
  i === void 0 && (i = {});
  var e = i,
    t = e.defaultModifiers,
    n = t === void 0 ? [] : t,
    r = e.defaultOptions,
    s = r === void 0 ? Ui : r;
  return function (a, l, c) {
    c === void 0 && (c = s);
    var d = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Ui, s),
        modifiersData: {},
        elements: { reference: a, popper: l },
        attributes: {},
        styles: {}
      },
      p = [],
      h = !1,
      g = {
        state: d,
        setOptions: function (w) {
          var y = typeof w == "function" ? w(d.options) : w;
          _(),
            (d.options = Object.assign({}, s, d.options, y)),
            (d.scrollParents = {
              reference: $e(a)
                ? ct(a)
                : a.contextElement
                ? ct(a.contextElement)
                : [],
              popper: ct(l)
            });
          var A = Ls(Ms([].concat(n, d.options.modifiers)));
          return (
            (d.orderedModifiers = A.filter(function (u) {
              return u.enabled;
            })),
            m(),
            g.update()
          );
        },
        forceUpdate: function () {
          if (!h) {
            var w = d.elements,
              y = w.reference,
              A = w.popper;
            if (Yi(y, A)) {
              (d.rects = {
                reference: ks(y, vt(A), d.options.strategy === "fixed"),
                popper: ki(A)
              }),
                (d.reset = !1),
                (d.placement = d.options.placement),
                d.orderedModifiers.forEach(function (C) {
                  return (d.modifiersData[C.name] = Object.assign({}, C.data));
                });
              for (var u = 0; u < d.orderedModifiers.length; u++) {
                if (d.reset === !0) {
                  (d.reset = !1), (u = -1);
                  continue;
                }
                var I = d.orderedModifiers[u],
                  v = I.fn,
                  x = I.options,
                  E = x === void 0 ? {} : x,
                  L = I.name;
                typeof v == "function" &&
                  (d = v({ state: d, options: E, name: L, instance: g }) || d);
              }
            }
          }
        },
        update: Ts(function () {
          return new Promise(function (b) {
            g.forceUpdate(), b(d);
          });
        }),
        destroy: function () {
          _(), (h = !0);
        }
      };
    if (!Yi(a, l)) return g;
    g.setOptions(c).then(function (b) {
      !h && c.onFirstUpdate && c.onFirstUpdate(b);
    });
    function m() {
      d.orderedModifiers.forEach(function (b) {
        var w = b.name,
          y = b.options,
          A = y === void 0 ? {} : y,
          u = b.effect;
        if (typeof u == "function") {
          var I = u({ state: d, name: w, instance: g, options: A }),
            v = function () {};
          p.push(I || v);
        }
      });
    }
    function _() {
      p.forEach(function (b) {
        return b();
      }),
        (p = []);
    }
    return g;
  };
}
var zs = [ns, ws, ts, Ln, _s, fs, Os, Qr, ms],
  Ps = Ds({ defaultModifiers: zs }),
  Hs = "tippy-box",
  Vn = "tippy-content",
  $s = "tippy-backdrop",
  Fn = "tippy-arrow",
  Rn = "tippy-svg-arrow",
  ze = { passive: !0, capture: !0 },
  jn = function () {
    return document.body;
  };
function Jt(i, e, t) {
  if (Array.isArray(i)) {
    var n = i[e];
    return n ?? (Array.isArray(t) ? t[e] : t);
  }
  return i;
}
function Di(i, e) {
  var t = {}.toString.call(i);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function Nn(i, e) {
  return typeof i == "function" ? i.apply(void 0, e) : i;
}
function Xi(i, e) {
  if (e === 0) return i;
  var t;
  return function (n) {
    clearTimeout(t),
      (t = setTimeout(function () {
        i(n);
      }, e));
  };
}
function Vs(i) {
  return i.split(/\s+/).filter(Boolean);
}
function Ue(i) {
  return [].concat(i);
}
function Ki(i, e) {
  i.indexOf(e) === -1 && i.push(e);
}
function Fs(i) {
  return i.filter(function (e, t) {
    return i.indexOf(e) === t;
  });
}
function Rs(i) {
  return i.split("-")[0];
}
function Ft(i) {
  return [].slice.call(i);
}
function Gi(i) {
  return Object.keys(i).reduce(function (e, t) {
    return i[t] !== void 0 && (e[t] = i[t]), e;
  }, {});
}
function dt() {
  return document.createElement("div");
}
function Xt(i) {
  return ["Element", "Fragment"].some(function (e) {
    return Di(i, e);
  });
}
function js(i) {
  return Di(i, "NodeList");
}
function Ns(i) {
  return Di(i, "MouseEvent");
}
function Ws(i) {
  return !!(i && i._tippy && i._tippy.reference === i);
}
function Bs(i) {
  return Xt(i)
    ? [i]
    : js(i)
    ? Ft(i)
    : Array.isArray(i)
    ? i
    : Ft(document.querySelectorAll(i));
}
function Zt(i, e) {
  i.forEach(function (t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function Qi(i, e) {
  i.forEach(function (t) {
    t && t.setAttribute("data-state", e);
  });
}
function qs(i) {
  var e,
    t = Ue(i),
    n = t[0];
  return n != null && (e = n.ownerDocument) != null && e.body
    ? n.ownerDocument
    : document;
}
function Us(i, e) {
  var t = e.clientX,
    n = e.clientY;
  return i.every(function (r) {
    var s = r.popperRect,
      o = r.popperState,
      a = r.props,
      l = a.interactiveBorder,
      c = Rs(o.placement),
      d = o.modifiersData.offset;
    if (!d) return !0;
    var p = c === "bottom" ? d.top.y : 0,
      h = c === "top" ? d.bottom.y : 0,
      g = c === "right" ? d.left.x : 0,
      m = c === "left" ? d.right.x : 0,
      _ = s.top - n + p > l,
      b = n - s.bottom - h > l,
      w = s.left - t + g > l,
      y = t - s.right - m > l;
    return _ || b || w || y;
  });
}
function ei(i, e, t) {
  var n = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function (r) {
    i[n](r, t);
  });
}
function Ji(i, e) {
  for (var t = e; t; ) {
    var n;
    if (i.contains(t)) return !0;
    t =
      t.getRootNode == null || (n = t.getRootNode()) == null ? void 0 : n.host;
  }
  return !1;
}
var pe = { isTouch: !1 },
  Zi = 0;
function Ys() {
  pe.isTouch ||
    ((pe.isTouch = !0),
    window.performance && document.addEventListener("mousemove", Wn));
}
function Wn() {
  var i = performance.now();
  i - Zi < 20 &&
    ((pe.isTouch = !1), document.removeEventListener("mousemove", Wn)),
    (Zi = i);
}
function Xs() {
  var i = document.activeElement;
  if (Ws(i)) {
    var e = i._tippy;
    i.blur && !e.state.isVisible && i.blur();
  }
}
function Ks() {
  document.addEventListener("touchstart", Ys, ze),
    window.addEventListener("blur", Xs);
}
var Gs = typeof window < "u" && typeof document < "u",
  Qs = Gs ? !!window.msCrypto : !1,
  Js = { animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1 },
  Zs = {
    allowHTML: !1,
    animation: "fade",
    arrow: !0,
    content: "",
    inertia: !1,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
  },
  le = Object.assign(
    {
      appendTo: jn,
      aria: { content: "auto", expanded: "auto" },
      delay: 0,
      duration: [300, 250],
      getReferenceClientRect: null,
      hideOnClick: !0,
      ignoreAttributes: !1,
      interactive: !1,
      interactiveBorder: 2,
      interactiveDebounce: 0,
      moveTransition: "",
      offset: [0, 10],
      onAfterUpdate: function () {},
      onBeforeUpdate: function () {},
      onCreate: function () {},
      onDestroy: function () {},
      onHidden: function () {},
      onHide: function () {},
      onMount: function () {},
      onShow: function () {},
      onShown: function () {},
      onTrigger: function () {},
      onUntrigger: function () {},
      onClickOutside: function () {},
      placement: "top",
      plugins: [],
      popperOptions: {},
      render: null,
      showOnCreate: !1,
      touch: !0,
      trigger: "mouseenter focus",
      triggerTarget: null
    },
    Js,
    Zs
  ),
  eo = Object.keys(le),
  to = function (e) {
    var t = Object.keys(e);
    t.forEach(function (n) {
      le[n] = e[n];
    });
  };
function Bn(i) {
  var e = i.plugins || [],
    t = e.reduce(function (n, r) {
      var s = r.name,
        o = r.defaultValue;
      if (s) {
        var a;
        n[s] = i[s] !== void 0 ? i[s] : (a = le[s]) != null ? a : o;
      }
      return n;
    }, {});
  return Object.assign({}, i, t);
}
function io(i, e) {
  var t = e ? Object.keys(Bn(Object.assign({}, le, { plugins: e }))) : eo,
    n = t.reduce(function (r, s) {
      var o = (i.getAttribute("data-tippy-" + s) || "").trim();
      if (!o) return r;
      if (s === "content") r[s] = o;
      else
        try {
          r[s] = JSON.parse(o);
        } catch {
          r[s] = o;
        }
      return r;
    }, {});
  return n;
}
function en(i, e) {
  var t = Object.assign(
    {},
    e,
    { content: Nn(e.content, [i]) },
    e.ignoreAttributes ? {} : io(i, e.plugins)
  );
  return (
    (t.aria = Object.assign({}, le.aria, t.aria)),
    (t.aria = {
      expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
      content:
        t.aria.content === "auto"
          ? e.interactive
            ? null
            : "describedby"
          : t.aria.content
    }),
    t
  );
}
var no = function () {
  return "innerHTML";
};
function pi(i, e) {
  i[no()] = e;
}
function tn(i) {
  var e = dt();
  return (
    i === !0
      ? (e.className = Fn)
      : ((e.className = Rn), Xt(i) ? e.appendChild(i) : pi(e, i)),
    e
  );
}
function nn(i, e) {
  Xt(e.content)
    ? (pi(i, ""), i.appendChild(e.content))
    : typeof e.content != "function" &&
      (e.allowHTML ? pi(i, e.content) : (i.textContent = e.content));
}
function hi(i) {
  var e = i.firstElementChild,
    t = Ft(e.children);
  return {
    box: e,
    content: t.find(function (n) {
      return n.classList.contains(Vn);
    }),
    arrow: t.find(function (n) {
      return n.classList.contains(Fn) || n.classList.contains(Rn);
    }),
    backdrop: t.find(function (n) {
      return n.classList.contains($s);
    })
  };
}
function qn(i) {
  var e = dt(),
    t = dt();
  (t.className = Hs),
    t.setAttribute("data-state", "hidden"),
    t.setAttribute("tabindex", "-1");
  var n = dt();
  (n.className = Vn),
    n.setAttribute("data-state", "hidden"),
    nn(n, i.props),
    e.appendChild(t),
    t.appendChild(n),
    r(i.props, i.props);
  function r(s, o) {
    var a = hi(e),
      l = a.box,
      c = a.content,
      d = a.arrow;
    o.theme
      ? l.setAttribute("data-theme", o.theme)
      : l.removeAttribute("data-theme"),
      typeof o.animation == "string"
        ? l.setAttribute("data-animation", o.animation)
        : l.removeAttribute("data-animation"),
      o.inertia
        ? l.setAttribute("data-inertia", "")
        : l.removeAttribute("data-inertia"),
      (l.style.maxWidth =
        typeof o.maxWidth == "number" ? o.maxWidth + "px" : o.maxWidth),
      o.role ? l.setAttribute("role", o.role) : l.removeAttribute("role"),
      (s.content !== o.content || s.allowHTML !== o.allowHTML) &&
        nn(c, i.props),
      o.arrow
        ? d
          ? s.arrow !== o.arrow &&
            (l.removeChild(d), l.appendChild(tn(o.arrow)))
          : l.appendChild(tn(o.arrow))
        : d && l.removeChild(d);
  }
  return { popper: e, onUpdate: r };
}
qn.$$tippy = !0;
var ro = 1,
  kt = [],
  ti = [];
function so(i, e) {
  var t = en(i, Object.assign({}, le, Bn(Gi(e)))),
    n,
    r,
    s,
    o = !1,
    a = !1,
    l = !1,
    c = !1,
    d,
    p,
    h,
    g = [],
    m = Xi(gt, t.interactiveDebounce),
    _,
    b = ro++,
    w = null,
    y = Fs(t.plugins),
    A = {
      isEnabled: !0,
      isVisible: !1,
      isDestroyed: !1,
      isMounted: !1,
      isShown: !1
    },
    u = {
      id: b,
      reference: i,
      popper: dt(),
      popperInstance: w,
      props: t,
      state: A,
      plugins: y,
      clearDelayTimeouts: xt,
      setProps: Et,
      setContent: Ot,
      show: Er,
      hide: Or,
      hideWithInteractivity: Sr,
      enable: rt,
      disable: wt,
      unmount: Ar,
      destroy: Cr
    };
  if (!t.render) return u;
  var I = t.render(u),
    v = I.popper,
    x = I.onUpdate;
  v.setAttribute("data-tippy-root", ""),
    (v.id = "tippy-" + u.id),
    (u.popper = v),
    (i._tippy = u),
    (v._tippy = u);
  var E = y.map(function (f) {
      return f.fn(u);
    }),
    L = i.hasAttribute("aria-expanded");
  return (
    We(),
    de(),
    B(),
    j("onCreate", [u]),
    t.showOnCreate && nt(),
    v.addEventListener("mouseenter", function () {
      u.props.interactive && u.state.isVisible && u.clearDelayTimeouts();
    }),
    v.addEventListener("mouseleave", function () {
      u.props.interactive &&
        u.props.trigger.indexOf("mouseenter") >= 0 &&
        J().addEventListener("mousemove", m);
    }),
    u
  );
  function C() {
    var f = u.props.touch;
    return Array.isArray(f) ? f : [f, 0];
  }
  function D() {
    return C()[0] === "hold";
  }
  function R() {
    var f;
    return !!((f = u.props.render) != null && f.$$tippy);
  }
  function V() {
    return _ || i;
  }
  function J() {
    var f = V().parentNode;
    return f ? qs(f) : document;
  }
  function Z() {
    return hi(v);
  }
  function W(f) {
    return (u.state.isMounted && !u.state.isVisible) ||
      pe.isTouch ||
      (d && d.type === "focus")
      ? 0
      : Jt(u.props.delay, f ? 0 : 1, le.delay);
  }
  function B(f) {
    f === void 0 && (f = !1),
      (v.style.pointerEvents = u.props.interactive && !f ? "" : "none"),
      (v.style.zIndex = "" + u.props.zIndex);
  }
  function j(f, O, k) {
    if (
      (k === void 0 && (k = !0),
      E.forEach(function (T) {
        T[f] && T[f].apply(T, O);
      }),
      k)
    ) {
      var M;
      (M = u.props)[f].apply(M, O);
    }
  }
  function ce() {
    var f = u.props.aria;
    if (f.content) {
      var O = "aria-" + f.content,
        k = v.id,
        M = Ue(u.props.triggerTarget || i);
      M.forEach(function (T) {
        var q = T.getAttribute(O);
        if (u.state.isVisible) T.setAttribute(O, q ? q + " " + k : k);
        else {
          var te = q && q.replace(k, "").trim();
          te ? T.setAttribute(O, te) : T.removeAttribute(O);
        }
      });
    }
  }
  function de() {
    if (!(L || !u.props.aria.expanded)) {
      var f = Ue(u.props.triggerTarget || i);
      f.forEach(function (O) {
        u.props.interactive
          ? O.setAttribute(
              "aria-expanded",
              u.state.isVisible && O === V() ? "true" : "false"
            )
          : O.removeAttribute("aria-expanded");
      });
    }
  }
  function ke() {
    J().removeEventListener("mousemove", m),
      (kt = kt.filter(function (f) {
        return f !== m;
      }));
  }
  function ue(f) {
    if (!(pe.isTouch && (l || f.type === "mousedown"))) {
      var O = (f.composedPath && f.composedPath()[0]) || f.target;
      if (!(u.props.interactive && Ji(v, O))) {
        if (
          Ue(u.props.triggerTarget || i).some(function (k) {
            return Ji(k, O);
          })
        ) {
          if (
            pe.isTouch ||
            (u.state.isVisible && u.props.trigger.indexOf("click") >= 0)
          )
            return;
        } else j("onClickOutside", [u, f]);
        u.props.hideOnClick === !0 &&
          (u.clearDelayTimeouts(),
          u.hide(),
          (a = !0),
          setTimeout(function () {
            a = !1;
          }),
          u.state.isMounted || me());
      }
    }
  }
  function Ie() {
    l = !0;
  }
  function ve() {
    l = !1;
  }
  function ae() {
    var f = J();
    f.addEventListener("mousedown", ue, !0),
      f.addEventListener("touchend", ue, ze),
      f.addEventListener("touchstart", ve, ze),
      f.addEventListener("touchmove", Ie, ze);
  }
  function me() {
    var f = J();
    f.removeEventListener("mousedown", ue, !0),
      f.removeEventListener("touchend", ue, ze),
      f.removeEventListener("touchstart", ve, ze),
      f.removeEventListener("touchmove", Ie, ze);
  }
  function je(f, O) {
    Ne(f, function () {
      !u.state.isVisible && v.parentNode && v.parentNode.contains(v) && O();
    });
  }
  function ge(f, O) {
    Ne(f, O);
  }
  function Ne(f, O) {
    var k = Z().box;
    function M(T) {
      T.target === k && (ei(k, "remove", M), O());
    }
    if (f === 0) return O();
    ei(k, "remove", p), ei(k, "add", M), (p = M);
  }
  function we(f, O, k) {
    k === void 0 && (k = !1);
    var M = Ue(u.props.triggerTarget || i);
    M.forEach(function (T) {
      T.addEventListener(f, O, k),
        g.push({ node: T, eventType: f, handler: O, options: k });
    });
  }
  function We() {
    D() &&
      (we("touchstart", et, { passive: !0 }),
      we("touchend", yt, { passive: !0 })),
      Vs(u.props.trigger).forEach(function (f) {
        if (f !== "manual")
          switch ((we(f, et), f)) {
            case "mouseenter":
              we("mouseleave", yt);
              break;
            case "focus":
              we(Qs ? "focusout" : "blur", tt);
              break;
            case "focusin":
              we("focusout", tt);
              break;
          }
      });
  }
  function mt() {
    g.forEach(function (f) {
      var O = f.node,
        k = f.eventType,
        M = f.handler,
        T = f.options;
      O.removeEventListener(k, M, T);
    }),
      (g = []);
  }
  function et(f) {
    var O,
      k = !1;
    if (!(!u.state.isEnabled || it(f) || a)) {
      var M = ((O = d) == null ? void 0 : O.type) === "focus";
      (d = f),
        (_ = f.currentTarget),
        de(),
        !u.state.isVisible &&
          Ns(f) &&
          kt.forEach(function (T) {
            return T(f);
          }),
        f.type === "click" &&
        (u.props.trigger.indexOf("mouseenter") < 0 || o) &&
        u.props.hideOnClick !== !1 &&
        u.state.isVisible
          ? (k = !0)
          : nt(f),
        f.type === "click" && (o = !k),
        k && !M && Le(f);
    }
  }
  function gt(f) {
    var O = f.target,
      k = V().contains(O) || v.contains(O);
    if (!(f.type === "mousemove" && k)) {
      var M = xe()
        .concat(v)
        .map(function (T) {
          var q,
            te = T._tippy,
            Be = (q = te.popperInstance) == null ? void 0 : q.state;
          return Be
            ? {
                popperRect: T.getBoundingClientRect(),
                popperState: Be,
                props: t
              }
            : null;
        })
        .filter(Boolean);
      Us(M, f) && (ke(), Le(f));
    }
  }
  function yt(f) {
    var O = it(f) || (u.props.trigger.indexOf("click") >= 0 && o);
    if (!O) {
      if (u.props.interactive) {
        u.hideWithInteractivity(f);
        return;
      }
      Le(f);
    }
  }
  function tt(f) {
    (u.props.trigger.indexOf("focusin") < 0 && f.target !== V()) ||
      (u.props.interactive && f.relatedTarget && v.contains(f.relatedTarget)) ||
      Le(f);
  }
  function it(f) {
    return pe.isTouch ? D() !== f.type.indexOf("touch") >= 0 : !1;
  }
  function _t() {
    bt();
    var f = u.props,
      O = f.popperOptions,
      k = f.placement,
      M = f.offset,
      T = f.getReferenceClientRect,
      q = f.moveTransition,
      te = R() ? hi(v).arrow : null,
      Be = T
        ? { getBoundingClientRect: T, contextElement: T.contextElement || V() }
        : i,
      Vi = {
        name: "$$tippy",
        enabled: !0,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function (St) {
          var qe = St.state;
          if (R()) {
            var kr = Z(),
              Qt = kr.box;
            ["placement", "reference-hidden", "escaped"].forEach(function (At) {
              At === "placement"
                ? Qt.setAttribute("data-placement", qe.placement)
                : qe.attributes.popper["data-popper-" + At]
                ? Qt.setAttribute("data-" + At, "")
                : Qt.removeAttribute("data-" + At);
            }),
              (qe.attributes.popper = {});
          }
        }
      },
      Te = [
        { name: "offset", options: { offset: M } },
        {
          name: "preventOverflow",
          options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } }
        },
        { name: "flip", options: { padding: 5 } },
        { name: "computeStyles", options: { adaptive: !q } },
        Vi
      ];
    R() &&
      te &&
      Te.push({ name: "arrow", options: { element: te, padding: 3 } }),
      Te.push.apply(Te, (O == null ? void 0 : O.modifiers) || []),
      (u.popperInstance = Ps(
        Be,
        v,
        Object.assign({}, O, { placement: k, onFirstUpdate: h, modifiers: Te })
      ));
  }
  function bt() {
    u.popperInstance && (u.popperInstance.destroy(), (u.popperInstance = null));
  }
  function ye() {
    var f = u.props.appendTo,
      O,
      k = V();
    (u.props.interactive && f === jn) || f === "parent"
      ? (O = k.parentNode)
      : (O = Nn(f, [k])),
      O.contains(v) || O.appendChild(v),
      (u.state.isMounted = !0),
      _t();
  }
  function xe() {
    return Ft(v.querySelectorAll("[data-tippy-root]"));
  }
  function nt(f) {
    u.clearDelayTimeouts(), f && j("onTrigger", [u, f]), ae();
    var O = W(!0),
      k = C(),
      M = k[0],
      T = k[1];
    pe.isTouch && M === "hold" && T && (O = T),
      O
        ? (n = setTimeout(function () {
            u.show();
          }, O))
        : u.show();
  }
  function Le(f) {
    if (
      (u.clearDelayTimeouts(), j("onUntrigger", [u, f]), !u.state.isVisible)
    ) {
      me();
      return;
    }
    if (
      !(
        u.props.trigger.indexOf("mouseenter") >= 0 &&
        u.props.trigger.indexOf("click") >= 0 &&
        ["mouseleave", "mousemove"].indexOf(f.type) >= 0 &&
        o
      )
    ) {
      var O = W(!1);
      O
        ? (r = setTimeout(function () {
            u.state.isVisible && u.hide();
          }, O))
        : (s = requestAnimationFrame(function () {
            u.hide();
          }));
    }
  }
  function rt() {
    u.state.isEnabled = !0;
  }
  function wt() {
    u.hide(), (u.state.isEnabled = !1);
  }
  function xt() {
    clearTimeout(n), clearTimeout(r), cancelAnimationFrame(s);
  }
  function Et(f) {
    if (!u.state.isDestroyed) {
      j("onBeforeUpdate", [u, f]), mt();
      var O = u.props,
        k = en(i, Object.assign({}, O, Gi(f), { ignoreAttributes: !0 }));
      (u.props = k),
        We(),
        O.interactiveDebounce !== k.interactiveDebounce &&
          (ke(), (m = Xi(gt, k.interactiveDebounce))),
        O.triggerTarget && !k.triggerTarget
          ? Ue(O.triggerTarget).forEach(function (M) {
              M.removeAttribute("aria-expanded");
            })
          : k.triggerTarget && i.removeAttribute("aria-expanded"),
        de(),
        B(),
        x && x(O, k),
        u.popperInstance &&
          (_t(),
          xe().forEach(function (M) {
            requestAnimationFrame(M._tippy.popperInstance.forceUpdate);
          })),
        j("onAfterUpdate", [u, f]);
    }
  }
  function Ot(f) {
    u.setProps({ content: f });
  }
  function Er() {
    var f = u.state.isVisible,
      O = u.state.isDestroyed,
      k = !u.state.isEnabled,
      M = pe.isTouch && !u.props.touch,
      T = Jt(u.props.duration, 0, le.duration);
    if (
      !(f || O || k || M) &&
      !V().hasAttribute("disabled") &&
      (j("onShow", [u], !1), u.props.onShow(u) !== !1)
    ) {
      if (
        ((u.state.isVisible = !0),
        R() && (v.style.visibility = "visible"),
        B(),
        ae(),
        u.state.isMounted || (v.style.transition = "none"),
        R())
      ) {
        var q = Z(),
          te = q.box,
          Be = q.content;
        Zt([te, Be], 0);
      }
      (h = function () {
        var Te;
        if (!(!u.state.isVisible || c)) {
          if (
            ((c = !0),
            v.offsetHeight,
            (v.style.transition = u.props.moveTransition),
            R() && u.props.animation)
          ) {
            var Gt = Z(),
              St = Gt.box,
              qe = Gt.content;
            Zt([St, qe], T), Qi([St, qe], "visible");
          }
          ce(),
            de(),
            Ki(ti, u),
            (Te = u.popperInstance) == null || Te.forceUpdate(),
            j("onMount", [u]),
            u.props.animation &&
              R() &&
              ge(T, function () {
                (u.state.isShown = !0), j("onShown", [u]);
              });
        }
      }),
        ye();
    }
  }
  function Or() {
    var f = !u.state.isVisible,
      O = u.state.isDestroyed,
      k = !u.state.isEnabled,
      M = Jt(u.props.duration, 1, le.duration);
    if (!(f || O || k) && (j("onHide", [u], !1), u.props.onHide(u) !== !1)) {
      if (
        ((u.state.isVisible = !1),
        (u.state.isShown = !1),
        (c = !1),
        (o = !1),
        R() && (v.style.visibility = "hidden"),
        ke(),
        me(),
        B(!0),
        R())
      ) {
        var T = Z(),
          q = T.box,
          te = T.content;
        u.props.animation && (Zt([q, te], M), Qi([q, te], "hidden"));
      }
      ce(), de(), u.props.animation ? R() && je(M, u.unmount) : u.unmount();
    }
  }
  function Sr(f) {
    J().addEventListener("mousemove", m), Ki(kt, m), m(f);
  }
  function Ar() {
    u.state.isVisible && u.hide(),
      u.state.isMounted &&
        (bt(),
        xe().forEach(function (f) {
          f._tippy.unmount();
        }),
        v.parentNode && v.parentNode.removeChild(v),
        (ti = ti.filter(function (f) {
          return f !== u;
        })),
        (u.state.isMounted = !1),
        j("onHidden", [u]));
  }
  function Cr() {
    u.state.isDestroyed ||
      (u.clearDelayTimeouts(),
      u.unmount(),
      mt(),
      delete i._tippy,
      (u.state.isDestroyed = !0),
      j("onDestroy", [u]));
  }
}
function Fe(i, e) {
  e === void 0 && (e = {});
  var t = le.plugins.concat(e.plugins || []);
  Ks();
  var n = Object.assign({}, e, { plugins: t }),
    r = Bs(i),
    s = r.reduce(function (o, a) {
      var l = a && so(a, n);
      return l && o.push(l), o;
    }, []);
  return Xt(i) ? s[0] : s;
}
Fe.defaultProps = le;
Fe.setDefaultProps = to;
Fe.currentInput = pe;
Object.assign({}, Ln, {
  effect: function (e) {
    var t = e.state,
      n = {
        popper: {
          position: t.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: { position: "absolute" },
        reference: {}
      };
    Object.assign(t.elements.popper.style, n.popper),
      (t.styles = n),
      t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
  }
});
Fe.setDefaultProps({ render: qn });
const oo = (i, e) =>
    Object.keys(i).reduce((t, n) => ((t[e(i[n], n, i)] = i[n]), t), {}),
  ao = (i) => (i ? (typeof i == "string" ? i : String(i)) : ""),
  lo = (i) => {
    const e = co(i);
    return uo(e);
  };
function co(i) {
  i = ao(i);
  const e = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
  return i.match(e);
}
function uo(i) {
  let e = "";
  for (let t = 0, n = i.length; t < n; t++) {
    let s = i[t].toLowerCase();
    t != 0 && (s = s.substr(0, 1).toUpperCase() + s.substr(1)), (e += s);
  }
  return e;
}
function Re({
  key: i = "instance",
  create: e,
  destroy: t = () => {},
  iterable: n = !1
}) {
  const r = n ? new Map() : new WeakMap(),
    s = (c) => r.get(c),
    o = (c, d) => {
      const p = e(c, d);
      return r.set(c, p), c.dispatchEvent(new Event(`${i}.created`)), p;
    };
  return {
    instances: r,
    getInstance: s,
    createInstance: o,
    getOrCreateInstance: (c, d) => (r.has(c) ? s(c) : o(c, d)),
    destroyInstance: (c) => {
      if (!r.has(c)) return;
      const d = s(c);
      t(d), r.delete(c), c.dispatchEvent(new Event(`${i}.destroyed`));
    }
  };
}
const Ve = (i, e) => {
    const t = Object.assign({}, i.dataset);
    return (
      Object.keys(t).map((n) => {
        if (!n.includes(e)) delete t[n];
        else {
          const r = t[n];
          try {
            const s = JSON.parse(r);
            t[n] = s;
          } catch {}
        }
      }),
      oo(t, (n, r) => (r == e ? r : lo(r.replace(e, ""))))
    );
  },
  po = {
    trigger: "click",
    interactive: !0,
    animation: "shift-toward",
    placement: "bottom-start"
  };
class ho {
  constructor(e, t) {
    S(this, "getContentEl", () => this._contentEl);
    S(this, "has", (e) => {
      this.Scrollbar = e;
    });
    S(this, "dispose", () => {
      this.tippy.destroy(),
        this._toggleEl.dispatchEvent(new Event("dropdown.dispose"));
    });
    S(this, "_handleHide", () => {
      this._toggleEl.dispatchEvent(new Event("dropdown.hide"));
      const { onHide: e } = this._options;
      e && e(this.tippy);
    });
    S(this, "_handleShow", () => {
      this.Scrollbar && this.Scrollbar.dataApi(this._contentEl),
        this._toggleEl.dispatchEvent(new Event("dropdown.show"));
      const { onShow: e } = this._options;
      e && e(this.tippy);
    });
    (this._toggleEl = e),
      (this._contentEl = t.content ? t.content : e.nextElementSibling),
      (this.Scrollbar = null),
      (this._options = { ...po, ...t }),
      (this.tippy = Fe(this._toggleEl, {
        theme: "dropdown",
        ...this._options,
        content: this._contentEl,
        onHide: this._handleHide,
        onShow: this._handleShow
      })),
      this._toggleEl.dispatchEvent(new Event("dropdown.init"));
  }
}
const {
    getInstance: fo,
    createInstance: vo,
    getOrCreateInstance: fi,
    destroyInstance: mo
  } = Re({ create: (i, e = {}) => new ho(i, e), destroy: (i) => i.dispose() }),
  vi = (i) => {
    i.querySelectorAll("[data-dropdown-toggle]").forEach((e) => {
      const t = Ve(e, "dropdown");
      t.toggle && (t.content = document.querySelector(t.toggle)),
        "toggle" in t && delete t.toggle,
        t.appendTo &&
          t.appendTo !== "parent" &&
          (t.appendTo = document.querySelector(t.appendTo)),
        fi(e, t);
    }),
      i.querySelectorAll("[data-popover-toggle]").forEach((e) => {
        const t = Ve(e, "popover");
        (t.theme = "popover"),
          t.toggle && (t.content = document.querySelector(t.toggle)),
          t.appendTo &&
            t.appendTo !== "parent" &&
            (t.appendTo = document.querySelector(t.appendTo)),
          "toggle" in t && delete t.toggle,
          fi(e, t);
      });
  };
document.readyState && document.readyState !== "loading"
  ? vi(document)
  : document.addEventListener("DOMContentLoaded", () => {
      vi(document);
    });
const Rt = {
    getInstance: fo,
    createInstance: vo,
    getOrCreateInstance: fi,
    destroyInstance: mo,
    dataApi: vi
  },
  go = () => {
    const i = document.querySelector("#sidebarNavScroll");
    if (!i) return;
    const e = i.querySelector(".navigation-level__item--active"),
      t = i.querySelector(".navigation__item--active");
    if (!t) return;
    const n = () => {
        const o = e ?? t;
        if (o)
          return (
            o.getBoundingClientRect().top -
            i.getBoundingClientRect().top -
            i.offsetHeight / 2 -
            o.offsetHeight / 2
          );
      },
      r = () => {
        const o = i.querySelector(".simplebar-content-wrapper");
        if (o.scrollTo) {
          o.scrollTo({ top: n(), behavior: "smooth" });
          return;
        }
      },
      s = t.querySelector(".collapse");
    s
      ? s.addEventListener(
          "collapse.shown",
          () => {
            r();
          },
          { once: !0 }
        )
      : r();
  },
  yo = () => {
    var t, n;
    const i = document.getElementById("messagesDropdownToggle");
    (t = Rt.getInstance(i)) == null || t.has(Scrollbar);
    const e = document.getElementById("notificationsDropdownToggle");
    (n = Rt.getInstance(e)) == null || n.has(Scrollbar);
  };
document.addEventListener("DOMContentLoaded", () => {
  go(), yo();
});
var Rd =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Un(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default")
    ? i.default
    : i;
}
var Yn = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (
  i
) {
  (function () {
    var e = (function () {
      function t() {}
      t.prototype = Object.create(null);
      function n(p, h) {
        for (var g = h.length, m = 0; m < g; ++m) c(p, h[m]);
      }
      var r = {}.hasOwnProperty;
      function s(p, h) {
        p[h] = !0;
      }
      function o(p, h) {
        if (
          h.toString !== Object.prototype.toString &&
          !h.toString.toString().includes("[native code]")
        ) {
          p[h.toString()] = !0;
          return;
        }
        for (var g in h) r.call(h, g) && (p[g] = !!h[g]);
      }
      var a = /\s+/;
      function l(p, h) {
        for (var g = h.split(a), m = g.length, _ = 0; _ < m; ++_) p[g[_]] = !0;
      }
      function c(p, h) {
        if (h) {
          var g = typeof h;
          g === "string"
            ? l(p, h)
            : Array.isArray(h)
            ? n(p, h)
            : g === "object"
            ? o(p, h)
            : g === "number" && s(p, h);
        }
      }
      function d() {
        for (var p = arguments.length, h = Array(p), g = 0; g < p; g++)
          h[g] = arguments[g];
        var m = new t();
        n(m, h);
        var _ = [];
        for (var b in m) m[b] && _.push(b);
        return _.join(" ");
      }
      return d;
    })();
    i.exports ? ((e.default = e), (i.exports = e)) : (window.classNames = e);
  })();
})(Yn);
var _o = Yn.exports;
const Xn = Un(_o),
  rn = {
    feather: {
      src: "node_modules/feather-icons/dist/icons",
      attrs: {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.75,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }
    },
    heroiconsOutline: {
      src: "node_modules/heroicons/outline",
      attrs: {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.75,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }
    },
    heroiconsSolid: {
      src: "node_modules/heroicons/solid",
      attrs: {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }
    },
    dripicons: {
      src: "node_modules/dripicons/SVG",
      attrs: {
        width: 92,
        height: 92,
        viewBox: "0 0 92 92",
        fill: "currentColor"
      }
    },
    ionicons: {
      src: "node_modules/ionicons/dist/svg",
      attrs: {
        width: 24,
        height: 24,
        viewBox: "0 0 512 512",
        fill: "currentColor"
      }
    },
    flag: {
      src: "node_modules/flag-icons/flags/1x1",
      attrs: { width: 512, height: 512, viewBox: "0 0 512 512" }
    },
    fc: {
      src: "node_modules/flat-color-icons/svg",
      attrs: {
        width: 48,
        height: 48,
        viewBox: "0 0 48 48",
        fill: "currentColor"
      }
    }
  },
  bo = '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
  wo =
    '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>',
  xo =
    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
  Eo =
    '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
  Oo =
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
  So =
    '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>',
  Ao =
    '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>',
  Co =
    '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',
  ko =
    '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>',
  Io =
    '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>',
  Lo =
    '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
  To =
    '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
  Mo =
    '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
  Do =
    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
  zo =
    '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>',
  Po =
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
  Ho = '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
  $o =
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
  Vo =
    '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
  Fo =
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  Ro =
    '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
  jo = '<polyline points="20 6 9 17 4 12"></polyline>',
  No = '<polyline points="6 9 12 15 18 9"></polyline>',
  Wo = '<polyline points="15 18 9 12 15 6"></polyline>',
  Bo = '<polyline points="9 18 15 12 9 6"></polyline>',
  qo = '<polyline points="18 15 12 9 6 15"></polyline>',
  Uo =
    '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>',
  Yo =
    '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  Xo =
    '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  Ko =
    '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>',
  Go =
    '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>',
  Qo =
    '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
  Jo =
    '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
  Zo =
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
  ea =
    '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
  ta =
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
  ia =
    '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>',
  na =
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
  ra =
    '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',
  sa =
    '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
  oa =
    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
  aa =
    '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>',
  la =
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
  ca =
    '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>',
  da =
    '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
  ua =
    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
  pa =
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
  ha =
    '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>',
  fa =
    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
  va =
    '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>',
  ma =
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
  ga =
    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
  ya =
    '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  _a =
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
  ba =
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
  wa =
    '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
  xa =
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
  Ea =
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  Oa =
    '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
  Sa =
    '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',
  Aa =
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
  Ca =
    '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',
  ka = '<polygon points="5 3 19 12 5 21 5 3"></polygon>',
  Ia =
    '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
  La =
    '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',
  Ta =
    '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>',
  Ma =
    '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>',
  Da =
    '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>',
  za =
    '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  Pa =
    '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
  Ha =
    '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
  $a =
    '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
  Va =
    '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
  Fa =
    '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
  Ra =
    '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
  ja =
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  Na =
    '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>',
  Wa =
    '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',
  Ba =
    '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>',
  qa =
    '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  Ua =
    '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>',
  Ya =
    '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  Xa =
    '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>',
  Ka =
    '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>',
  Ga =
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
  Qa =
    '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>',
  Ja =
    '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
  Za =
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  el =
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  tl =
    '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',
  il =
    '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
  nl =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path>',
  rl =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>',
  sl =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16"></path>',
  ol =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>',
  al =
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>',
  ll =
    '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>',
  cl =
    '<title>Female</title><path d="M430 190c0-95.94-78.06-174-174-174S82 94.06 82 190c0 88.49 66.4 161.77 152 172.61V394h-36a22 22 0 000 44h36v36a22 22 0 0044 0v-36h36a22 22 0 000-44h-36v-31.39c85.6-10.84 152-84.12 152-172.61zm-304 0c0-71.68 58.32-130 130-130s130 58.32 130 130-58.32 130-130 130-130-58.32-130-130z"></path>',
  dl =
    '<title>Image</title><path d="M416 64H96a64.07 64.07 0 00-64 64v256a64.07 64.07 0 0064 64h320a64.07 64.07 0 0064-64V128a64.07 64.07 0 00-64-64zm-80 64a48 48 0 11-48 48 48.05 48.05 0 0148-48zM96 416a32 32 0 01-32-32v-67.63l94.84-84.3a48.06 48.06 0 0165.8 1.9l64.95 64.81L172.37 416zm352-32a32 32 0 01-32 32H217.63l121.42-121.42a47.72 47.72 0 0161.64-.16L448 333.84z"></path>',
  ul =
    '<title>Male</title><path d="M442 48h-90a22 22 0 000 44h36.89l-60.39 60.39c-68.19-52.86-167-48-229.54 14.57C31.12 234.81 31.12 345.19 99 413a174.21 174.21 0 00246 0c62.57-62.58 67.43-161.35 14.57-229.54L420 123.11V160a22 22 0 0044 0V70a22 22 0 00-22-22zM313.92 381.92a130.13 130.13 0 01-183.84 0c-50.69-50.68-50.69-133.16 0-183.84s133.16-50.69 183.84 0 50.69 133.16 0 183.84z"></path>',
  pl =
    '<path fill="#ffce00" d="M0 341.3h512V512H0z"></path><path d="M0 0h512v170.7H0z"></path><path fill="#d00" d="M0 170.7h512v170.6H0z"></path>',
  hl =
    '<g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512v512H0z"></path><path fill="#002654" d="M0 0h170.7v512H0z"></path><path fill="#ce1126" d="M341.3 0H512v512H341.3z"></path></g>',
  fl =
    '<path fill="#e70011" d="M0 0h512v256H0Z"></path><path fill="#fff" d="M0 256h512v256H0Z"></path>',
  vl =
    '<g fill-rule="evenodd"><g stroke-width="1pt"><path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z"></path><path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V315H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0z"></path></g><path fill="#192f5d" d="M0 0h389.1v275.7H0z"></path><path fill="#fff" d="m32.3 11.8 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.9-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6L65 61l-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 67l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6L212 78h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6L277 78h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.5 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.6h11.4zm64.7 0 4 11h11l-9.1 6.7L139 123l-9.4-6.7-9 6.7 3.5-10.7-9.5-6.6h11.8zm65 0 3.5 11h11.4l-9 6.7L204 123l-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.6H191zm65 0 3.5 11h11.4l-9.4 6.7L269 123l-9.5-6.7-9.4 6.7 4-10.7-9.5-6.6H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.6h11.8zM32.7 122.1l3.1 11h11.9l-9.5 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7L139 178l-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7L204 178l-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7L269 178l-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 177.2l3.1 11h11.9l-9.5 6.8 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.8 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.8 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.8 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.8zM32.7 232.4l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4z"></path></g>',
  ml =
    '<polygon fill="#90CAF9" points="40,45 8,45 8,3 30,3 40,13"></polygon><polygon fill="#E1F5FE" points="38.5,14 29,14 29,4.5"></polygon>',
  gl =
    '<path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path><path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>',
  yl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        fc__file: ml,
        fc__folder: gl,
        feather__activity: bo,
        feather__airplay: wo,
        feather__alertCircle: xo,
        feather__alertOctagon: Eo,
        feather__alertTriangle: Oo,
        feather__alignCenter: So,
        feather__alignJustify: Ao,
        feather__alignLeft: Co,
        feather__alignRight: ko,
        feather__archive: Io,
        feather__arrowLeft: Lo,
        feather__barChart2: To,
        feather__bell: Do,
        feather__bellOff: Mo,
        feather__bold: zo,
        feather__bookOpen: Po,
        feather__bookmark: Ho,
        feather__box: $o,
        feather__briefcase: Vo,
        feather__calendar: Fo,
        feather__check: jo,
        feather__checkSquare: Ro,
        feather__chevronDown: No,
        feather__chevronLeft: Wo,
        feather__chevronRight: Bo,
        feather__chevronUp: qo,
        feather__chevronsDown: Uo,
        feather__clock: Yo,
        feather__copy: Xo,
        feather__cornerUpLeft: Ko,
        feather__cornerUpRight: Go,
        feather__creditCard: Qo,
        feather__dollarSign: Jo,
        feather__download: Zo,
        feather__edit: ea,
        feather__facebook: ta,
        feather__feather: ia,
        feather__file: ra,
        feather__fileText: na,
        feather__flag: sa,
        feather__folder: oa,
        feather__gift: aa,
        feather__github: la,
        feather__hardDrive: ca,
        feather__helpCircle: da,
        feather__home: ua,
        feather__image: pa,
        feather__inbox: ha,
        feather__info: fa,
        feather__italic: va,
        feather__layout: ma,
        feather__link: ga,
        feather__lock: ya,
        feather__mail: _a,
        feather__mapPin: ba,
        feather__menu: wa,
        feather__messageCircle: xa,
        feather__messageSquare: Ea,
        feather__moreVertical: Oa,
        feather__paperclip: Sa,
        feather__phone: Aa,
        feather__pieChart: Ca,
        feather__play: ka,
        feather__plus: Ia,
        feather__power: La,
        feather__printer: Ta,
        feather__refreshCw: Ma,
        feather__save: Da,
        feather__search: za,
        feather__send: Pa,
        feather__settings: Ha,
        feather__share2: $a,
        feather__shoppingBag: Va,
        feather__shoppingCart: Fa,
        feather__smile: Ra,
        feather__star: ja,
        feather__table: Na,
        feather__tag: Wa,
        feather__trash: qa,
        feather__trash2: Ba,
        feather__trendingDown: Ua,
        feather__trendingUp: Ya,
        feather__type: Xa,
        feather__underline: Ka,
        feather__upload: Ga,
        feather__user: Za,
        feather__userCheck: Qa,
        feather__userPlus: Ja,
        feather__users: el,
        feather__wind: tl,
        feather__x: il,
        flag__de: pl,
        flag__fr: hl,
        flag__id: fl,
        flag__us: vl,
        heroiconsOutline__cake: nl,
        heroiconsOutline__dotsHorizontal: rl,
        heroiconsOutline__menuAlt1: sl,
        heroiconsOutline__officeBuilding: ol,
        heroiconsOutline__translate: al,
        heroiconsSolid__star: ll,
        ionicons__female: cl,
        ionicons__image: dl,
        ionicons__male: ul
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
class Kn {
  constructor(e, t = {}, n = null) {
    S(this, "toSvg", (e = {}) => {
      const t = {
        xmlns: "http://www.w3.org/2000/svg",
        ...rn[this._vendor].attrs,
        ...this._attrs,
        ...e,
        class: Xn(
          rn[this._vendor].attrs.class,
          this._attrs.class,
          `icon icon--${this._vendor}`,
          e.class
        )
      };
      return `<svg ${_l(t)}>${this._path}</svg>`;
    });
    S(this, "getVendor", () => this._vendor);
    S(this, "_init", () => {
      if (this._path === null) {
        const n = yl[this._iconName];
        if (!n)
          throw new Error(
            `Icon not found: "${this._iconName}". Consider checking on the "icons/index.js" whether the icon is correctly imported`
          );
        this._path = n;
      }
      const [e, t] = this._iconName.split("__");
      (this._vendor = e), (this._icon = t);
    });
    (this._iconName = e),
      (this._vendor = null),
      (this._icon = null),
      (this._attrs = t),
      (this._path = n),
      this._init();
  }
}
function _l(i) {
  return Object.keys(i)
    .map((e) => `${e}="${i[e]}"`)
    .join(" ");
}
function mi(i = document) {
  i.querySelectorAll("[data-icon]").forEach((e) => {
    try {
      const t = e
          .getAttributeNames()
          .reduce(
            (a, l) =>
              l === "data-icon" ? a : { ...a, [l]: e.getAttribute(l) },
            {}
          ),
        r = new Kn(e.dataset.icon, t).toSvg(t),
        o = new DOMParser()
          .parseFromString(r, "image/svg+xml")
          .querySelector("svg");
      e.parentNode.replaceChild(o, e);
    } catch (t) {
      console.error(e, t);
    }
  });
}
const bl = (i, e = {}, t) => new Kn(i, e, t);
document.readyState && document.readyState !== "loading"
  ? mi(document)
  : document.addEventListener("DOMContentLoaded", () => {
      mi(document);
    });
const Pe = { replace: mi, create: bl },
  wl = { showClass: "collapse--show", group: "", transitionDuration: 150 };
class xl {
  constructor(e, t) {
    S(this, "isExpanded", () => this._expandState);
    S(
      this,
      "toggle",
      () => (
        this._targetEl.dispatchEvent(new Event("collapse.toggle")),
        this._expandState ? this.hide() : this.show()
      )
    );
    S(this, "show", () => {
      this._options.group &&
        sn.forEach((e) => {
          e === this || !e.inGroup(this._options.group) || e.hide();
        }),
        (this._expandState = !0),
        this._targetEl.dispatchEvent(new Event("collapse.show")),
        setTimeout(() => {
          this._setHeight(),
            this._targetEl.classList.add(this._options.showClass);
        }, 0),
        setTimeout(() => {
          this._unsetHeight(),
            this._targetEl.dispatchEvent(new Event("collapse.shown"));
        }, this._options.transitionDuration);
    });
    S(this, "hide", () => {
      this._expandState &&
        ((this._expandState = !1),
        this._targetEl.dispatchEvent(new Event("collapse.hide")),
        this._setTransitionDuration(),
        this._setHeight(),
        sn.forEach((e) => {
          e === this || !e.isChildOf(this._targetEl) || e.hide();
        }),
        setTimeout(() => {
          this._targetEl.classList.remove(this._options.showClass),
            this._unsetHeight();
        }, 0),
        setTimeout(() => {
          this._targetEl.dispatchEvent(new Event("collapse.hidden"));
        }, this._options.transitionDuration));
    });
    S(this, "inGroup", (e) => this._options.group === e);
    S(this, "isChildOf", (e) => e.contains(this._targetEl));
    S(this, "dispose", () => {
      this._targetEl.dispatchEvent(new Event("collapse.dispose"));
    });
    S(this, "_setTransitionDuration", () => {
      this._targetEl.style.setProperty(
        "--collapse-duration",
        `${this._options.transitionDuration}ms`
      );
    });
    S(this, "_setHeight", () => {
      this._targetEl.style.setProperty(
        "height",
        `${this._targetEl.scrollHeight}px`
      );
    });
    S(this, "_unsetHeight", () => {
      this._targetEl.style.removeProperty("height");
    });
    (this._targetEl = e),
      (this._options = { ...wl, ...t }),
      (this._expandState = e.classList.contains(this._options.showClass)),
      this._setTransitionDuration();
  }
}
const {
    instances: sn,
    getInstance: El,
    createInstance: Ol,
    getOrCreateInstance: Gn,
    destroyInstance: Sl
  } = Re({
    create: (i, e) => new xl(i, e),
    destroy: (i) => i.dispose(),
    iterable: !0
  }),
  gi = (i) => {
    i.querySelectorAll("[data-collapse-toggle]").forEach((e) => {
      let t;
      if (
        (e.dataset.collapseToggle
          ? (t = document.querySelector(e.dataset.collapseToggle))
          : (t = e.nextElementSibling),
        !t)
      )
        return;
      const n = Ve(t, "collapse"),
        r = Gn(t, n),
        s = (l) => {
          l.preventDefault(), r.toggle();
        };
      e.addEventListener("click", s);
      const o = () => {
        e.setAttribute("aria-expanded", !0);
      };
      t.addEventListener("collapse.show", o);
      const a = () => {
        e.setAttribute("aria-expanded", !1);
      };
      t.addEventListener("collapse.hide", a),
        t.addEventListener("collapse.dispose", () => {
          e.removeEventlistener("click", s),
            t.removeEventlistener("collapse.show", o),
            t.removeEventlistener("collapse.hide", a);
        }),
        e.getAttribute("aria-expanded") === "true" && r.show();
    });
  };
document.readyState && document.readyState !== "loading"
  ? gi(document)
  : document.addEventListener("DOMContentLoaded", () => {
      gi(document);
    });
const Al = {
  getInstance: El,
  createInstance: Ol,
  getOrCreateInstance: Gn,
  destroyInstance: Sl,
  dataApi: gi
};
var Cl = !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  ),
  kl = Cl;
const zi = Un(kl);
var Il =
  typeof global == "object" && global && global.Object === Object && global;
const Ll = Il;
var Tl = typeof self == "object" && self && self.Object === Object && self,
  Ml = Ll || Tl || Function("return this")();
const Qn = Ml;
var Dl = Qn.Symbol;
const jt = Dl;
var Jn = Object.prototype,
  zl = Jn.hasOwnProperty,
  Pl = Jn.toString,
  ot = jt ? jt.toStringTag : void 0;
function Hl(i) {
  var e = zl.call(i, ot),
    t = i[ot];
  try {
    i[ot] = void 0;
    var n = !0;
  } catch {}
  var r = Pl.call(i);
  return n && (e ? (i[ot] = t) : delete i[ot]), r;
}
var $l = Object.prototype,
  Vl = $l.toString;
function Fl(i) {
  return Vl.call(i);
}
var Rl = "[object Null]",
  jl = "[object Undefined]",
  on = jt ? jt.toStringTag : void 0;
function Nl(i) {
  return i == null
    ? i === void 0
      ? jl
      : Rl
    : on && on in Object(i)
    ? Hl(i)
    : Fl(i);
}
function Wl(i) {
  return i != null && typeof i == "object";
}
var Bl = "[object Symbol]";
function ql(i) {
  return typeof i == "symbol" || (Wl(i) && Nl(i) == Bl);
}
var Ul = /\s/;
function Yl(i) {
  for (var e = i.length; e-- && Ul.test(i.charAt(e)); );
  return e;
}
var Xl = /^\s+/;
function Kl(i) {
  return i && i.slice(0, Yl(i) + 1).replace(Xl, "");
}
function Nt(i) {
  var e = typeof i;
  return i != null && (e == "object" || e == "function");
}
var an = 0 / 0,
  Gl = /^[-+]0x[0-9a-f]+$/i,
  Ql = /^0b[01]+$/i,
  Jl = /^0o[0-7]+$/i,
  Zl = parseInt;
function ln(i) {
  if (typeof i == "number") return i;
  if (ql(i)) return an;
  if (Nt(i)) {
    var e = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = Nt(e) ? e + "" : e;
  }
  if (typeof i != "string") return i === 0 ? i : +i;
  i = Kl(i);
  var t = Ql.test(i);
  return t || Jl.test(i) ? Zl(i.slice(2), t ? 2 : 8) : Gl.test(i) ? an : +i;
}
var ec = function () {
  return Qn.Date.now();
};
const ii = ec;
var tc = "Expected a function",
  ic = Math.max,
  nc = Math.min;
function Mt(i, e, t) {
  var n,
    r,
    s,
    o,
    a,
    l,
    c = 0,
    d = !1,
    p = !1,
    h = !0;
  if (typeof i != "function") throw new TypeError(tc);
  (e = ln(e) || 0),
    Nt(t) &&
      ((d = !!t.leading),
      (p = "maxWait" in t),
      (s = p ? ic(ln(t.maxWait) || 0, e) : s),
      (h = "trailing" in t ? !!t.trailing : h));
  function g(v) {
    var x = n,
      E = r;
    return (n = r = void 0), (c = v), (o = i.apply(E, x)), o;
  }
  function m(v) {
    return (c = v), (a = setTimeout(w, e)), d ? g(v) : o;
  }
  function _(v) {
    var x = v - l,
      E = v - c,
      L = e - x;
    return p ? nc(L, s - E) : L;
  }
  function b(v) {
    var x = v - l,
      E = v - c;
    return l === void 0 || x >= e || x < 0 || (p && E >= s);
  }
  function w() {
    var v = ii();
    if (b(v)) return y(v);
    a = setTimeout(w, _(v));
  }
  function y(v) {
    return (a = void 0), h && n ? g(v) : ((n = r = void 0), o);
  }
  function A() {
    a !== void 0 && clearTimeout(a), (c = 0), (n = l = r = a = void 0);
  }
  function u() {
    return a === void 0 ? o : y(ii());
  }
  function I() {
    var v = ii(),
      x = b(v);
    if (((n = arguments), (r = this), (l = v), x)) {
      if (a === void 0) return m(l);
      if (p) return clearTimeout(a), (a = setTimeout(w, e)), g(l);
    }
    return a === void 0 && (a = setTimeout(w, e)), o;
  }
  return (I.cancel = A), (I.flush = u), I;
}
var rc = "Expected a function";
function sc(i, e, t) {
  var n = !0,
    r = !0;
  if (typeof i != "function") throw new TypeError(rc);
  return (
    Nt(t) &&
      ((n = "leading" in t ? !!t.leading : n),
      (r = "trailing" in t ? !!t.trailing : r)),
    Mt(i, e, { leading: n, maxWait: e, trailing: r })
  );
}
var Xe = function () {
    return (
      (Xe =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++) {
            t = arguments[n];
            for (var s in t)
              Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
          }
          return e;
        }),
      Xe.apply(this, arguments)
    );
  },
  Ye = null,
  cn = null;
zi &&
  window.addEventListener("resize", function () {
    cn !== window.devicePixelRatio &&
      ((cn = window.devicePixelRatio), (Ye = null));
  });
function dn() {
  if (Ye === null) {
    if (typeof document > "u") return (Ye = 0), Ye;
    var i = document.body,
      e = document.createElement("div");
    e.classList.add("simplebar-hide-scrollbar"), i.appendChild(e);
    var t = e.getBoundingClientRect().right;
    i.removeChild(e), (Ye = t);
  }
  return Ye;
}
function Zn(i) {
  return !i || !i.ownerDocument || !i.ownerDocument.defaultView
    ? window
    : i.ownerDocument.defaultView;
}
function er(i) {
  return !i || !i.ownerDocument ? document : i.ownerDocument;
}
var tr = function (i) {
  var e = {},
    t = Array.prototype.reduce.call(
      i,
      function (n, r) {
        var s = r.name.match(/data-simplebar-(.+)/);
        if (s) {
          var o = s[1].replace(/\W+(.)/g, function (a, l) {
            return l.toUpperCase();
          });
          switch (r.value) {
            case "true":
              n[o] = !0;
              break;
            case "false":
              n[o] = !1;
              break;
            case void 0:
              n[o] = !0;
              break;
            default:
              n[o] = r.value;
          }
        }
        return n;
      },
      e
    );
  return t;
};
function ir(i, e) {
  var t;
  i && (t = i.classList).add.apply(t, e.split(" "));
}
function nr(i, e) {
  i &&
    e.split(" ").forEach(function (t) {
      i.classList.remove(t);
    });
}
function rr(i) {
  return ".".concat(i.split(" ").join("."));
}
var oc = Object.freeze({
    __proto__: null,
    getElementWindow: Zn,
    getElementDocument: er,
    getOptions: tr,
    addClasses: ir,
    removeClasses: nr,
    classNamesToQuery: rr
  }),
  Ee = Zn,
  ni = er,
  ac = tr,
  Oe = ir,
  Se = nr,
  K = rr,
  Dt = (function () {
    function i(e, t) {
      t === void 0 && (t = {});
      var n = this;
      if (
        ((this.removePreventClickId = null),
        (this.minScrollbarWidth = 20),
        (this.stopScrollDelay = 175),
        (this.isScrolling = !1),
        (this.isMouseEntering = !1),
        (this.scrollXTicking = !1),
        (this.scrollYTicking = !1),
        (this.wrapperEl = null),
        (this.contentWrapperEl = null),
        (this.contentEl = null),
        (this.offsetEl = null),
        (this.maskEl = null),
        (this.placeholderEl = null),
        (this.heightAutoObserverWrapperEl = null),
        (this.heightAutoObserverEl = null),
        (this.rtlHelpers = null),
        (this.scrollbarWidth = 0),
        (this.resizeObserver = null),
        (this.mutationObserver = null),
        (this.elStyles = null),
        (this.isRtl = null),
        (this.mouseX = 0),
        (this.mouseY = 0),
        (this.onMouseMove = function () {}),
        (this.onWindowResize = function () {}),
        (this.onStopScrolling = function () {}),
        (this.onMouseEntered = function () {}),
        (this.onScroll = function () {
          var r = Ee(n.el);
          n.scrollXTicking ||
            (r.requestAnimationFrame(n.scrollX), (n.scrollXTicking = !0)),
            n.scrollYTicking ||
              (r.requestAnimationFrame(n.scrollY), (n.scrollYTicking = !0)),
            n.isScrolling ||
              ((n.isScrolling = !0), Oe(n.el, n.classNames.scrolling)),
            n.showScrollbar("x"),
            n.showScrollbar("y"),
            n.onStopScrolling();
        }),
        (this.scrollX = function () {
          n.axis.x.isOverflowing && n.positionScrollbar("x"),
            (n.scrollXTicking = !1);
        }),
        (this.scrollY = function () {
          n.axis.y.isOverflowing && n.positionScrollbar("y"),
            (n.scrollYTicking = !1);
        }),
        (this._onStopScrolling = function () {
          Se(n.el, n.classNames.scrolling),
            n.options.autoHide && (n.hideScrollbar("x"), n.hideScrollbar("y")),
            (n.isScrolling = !1);
        }),
        (this.onMouseEnter = function () {
          n.isMouseEntering ||
            (Oe(n.el, n.classNames.mouseEntered),
            n.showScrollbar("x"),
            n.showScrollbar("y"),
            (n.isMouseEntering = !0)),
            n.onMouseEntered();
        }),
        (this._onMouseEntered = function () {
          Se(n.el, n.classNames.mouseEntered),
            n.options.autoHide && (n.hideScrollbar("x"), n.hideScrollbar("y")),
            (n.isMouseEntering = !1);
        }),
        (this._onMouseMove = function (r) {
          (n.mouseX = r.clientX),
            (n.mouseY = r.clientY),
            (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
              n.onMouseMoveForAxis("x"),
            (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
              n.onMouseMoveForAxis("y");
        }),
        (this.onMouseLeave = function () {
          n.onMouseMove.cancel(),
            (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
              n.onMouseLeaveForAxis("x"),
            (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
              n.onMouseLeaveForAxis("y"),
            (n.mouseX = -1),
            (n.mouseY = -1);
        }),
        (this._onWindowResize = function () {
          (n.scrollbarWidth = n.getScrollbarWidth()), n.hideNativeScrollbar();
        }),
        (this.onPointerEvent = function (r) {
          if (
            !(
              !n.axis.x.track.el ||
              !n.axis.y.track.el ||
              !n.axis.x.scrollbar.el ||
              !n.axis.y.scrollbar.el
            )
          ) {
            var s, o;
            (n.axis.x.track.rect = n.axis.x.track.el.getBoundingClientRect()),
              (n.axis.y.track.rect = n.axis.y.track.el.getBoundingClientRect()),
              (n.axis.x.isOverflowing || n.axis.x.forceVisible) &&
                (s = n.isWithinBounds(n.axis.x.track.rect)),
              (n.axis.y.isOverflowing || n.axis.y.forceVisible) &&
                (o = n.isWithinBounds(n.axis.y.track.rect)),
              (s || o) &&
                (r.stopPropagation(),
                r.type === "pointerdown" &&
                  r.pointerType !== "touch" &&
                  (s &&
                    ((n.axis.x.scrollbar.rect = n.axis.x.scrollbar.el.getBoundingClientRect()),
                    n.isWithinBounds(n.axis.x.scrollbar.rect)
                      ? n.onDragStart(r, "x")
                      : n.onTrackClick(r, "x")),
                  o &&
                    ((n.axis.y.scrollbar.rect = n.axis.y.scrollbar.el.getBoundingClientRect()),
                    n.isWithinBounds(n.axis.y.scrollbar.rect)
                      ? n.onDragStart(r, "y")
                      : n.onTrackClick(r, "y"))));
          }
        }),
        (this.drag = function (r) {
          var s, o, a, l, c, d, p, h, g, m, _;
          if (!(!n.draggedAxis || !n.contentWrapperEl)) {
            var b,
              w = n.axis[n.draggedAxis].track,
              y =
                (o =
                  (s = w.rect) === null || s === void 0
                    ? void 0
                    : s[n.axis[n.draggedAxis].sizeAttr]) !== null &&
                o !== void 0
                  ? o
                  : 0,
              A = n.axis[n.draggedAxis].scrollbar,
              u =
                (l =
                  (a = n.contentWrapperEl) === null || a === void 0
                    ? void 0
                    : a[n.axis[n.draggedAxis].scrollSizeAttr]) !== null &&
                l !== void 0
                  ? l
                  : 0,
              I = parseInt(
                (d =
                  (c = n.elStyles) === null || c === void 0
                    ? void 0
                    : c[n.axis[n.draggedAxis].sizeAttr]) !== null &&
                  d !== void 0
                  ? d
                  : "0px",
                10
              );
            r.preventDefault(),
              r.stopPropagation(),
              n.draggedAxis === "y" ? (b = r.pageY) : (b = r.pageX);
            var v =
              b -
              ((h =
                (p = w.rect) === null || p === void 0
                  ? void 0
                  : p[n.axis[n.draggedAxis].offsetAttr]) !== null &&
              h !== void 0
                ? h
                : 0) -
              n.axis[n.draggedAxis].dragOffset;
            v =
              n.draggedAxis === "x" && n.isRtl
                ? ((m =
                    (g = w.rect) === null || g === void 0
                      ? void 0
                      : g[n.axis[n.draggedAxis].sizeAttr]) !== null &&
                  m !== void 0
                    ? m
                    : 0) -
                  A.size -
                  v
                : v;
            var x = v / (y - A.size),
              E = x * (u - I);
            n.draggedAxis === "x" &&
              n.isRtl &&
              (E =
                !((_ = i.getRtlHelpers()) === null || _ === void 0) &&
                _.isScrollingToNegative
                  ? -E
                  : E),
              (n.contentWrapperEl[n.axis[n.draggedAxis].scrollOffsetAttr] = E);
          }
        }),
        (this.onEndDrag = function (r) {
          var s = ni(n.el),
            o = Ee(n.el);
          r.preventDefault(),
            r.stopPropagation(),
            Se(n.el, n.classNames.dragging),
            s.removeEventListener("mousemove", n.drag, !0),
            s.removeEventListener("mouseup", n.onEndDrag, !0),
            (n.removePreventClickId = o.setTimeout(function () {
              s.removeEventListener("click", n.preventClick, !0),
                s.removeEventListener("dblclick", n.preventClick, !0),
                (n.removePreventClickId = null);
            }));
        }),
        (this.preventClick = function (r) {
          r.preventDefault(), r.stopPropagation();
        }),
        (this.el = e),
        (this.options = Xe(Xe({}, i.defaultOptions), t)),
        (this.classNames = Xe(
          Xe({}, i.defaultOptions.classNames),
          t.classNames
        )),
        (this.axis = {
          x: {
            scrollOffsetAttr: "scrollLeft",
            sizeAttr: "width",
            scrollSizeAttr: "scrollWidth",
            offsetSizeAttr: "offsetWidth",
            offsetAttr: "left",
            overflowAttr: "overflowX",
            dragOffset: 0,
            isOverflowing: !0,
            forceVisible: !1,
            track: { size: null, el: null, rect: null, isVisible: !1 },
            scrollbar: { size: null, el: null, rect: null, isVisible: !1 }
          },
          y: {
            scrollOffsetAttr: "scrollTop",
            sizeAttr: "height",
            scrollSizeAttr: "scrollHeight",
            offsetSizeAttr: "offsetHeight",
            offsetAttr: "top",
            overflowAttr: "overflowY",
            dragOffset: 0,
            isOverflowing: !0,
            forceVisible: !1,
            track: { size: null, el: null, rect: null, isVisible: !1 },
            scrollbar: { size: null, el: null, rect: null, isVisible: !1 }
          }
        }),
        typeof this.el != "object" || !this.el.nodeName)
      )
        throw new Error(
          "Argument passed to SimpleBar must be an HTML element instead of ".concat(
            this.el
          )
        );
      (this.onMouseMove = sc(this._onMouseMove, 64)),
        (this.onWindowResize = Mt(this._onWindowResize, 64, { leading: !0 })),
        (this.onStopScrolling = Mt(
          this._onStopScrolling,
          this.stopScrollDelay
        )),
        (this.onMouseEntered = Mt(this._onMouseEntered, this.stopScrollDelay)),
        this.init();
    }
    return (
      (i.getRtlHelpers = function () {
        if (i.rtlHelpers) return i.rtlHelpers;
        var e = document.createElement("div");
        e.innerHTML =
          '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var t = e.firstElementChild,
          n = t == null ? void 0 : t.firstElementChild;
        if (!n) return null;
        document.body.appendChild(t), (t.scrollLeft = 0);
        var r = i.getOffset(t),
          s = i.getOffset(n);
        t.scrollLeft = -999;
        var o = i.getOffset(n);
        return (
          document.body.removeChild(t),
          (i.rtlHelpers = {
            isScrollOriginAtZero: r.left !== s.left,
            isScrollingToNegative: s.left !== o.left
          }),
          i.rtlHelpers
        );
      }),
      (i.prototype.getScrollbarWidth = function () {
        try {
          return (this.contentWrapperEl &&
            getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
              .display === "none") ||
            "scrollbarWidth" in document.documentElement.style ||
            "-ms-overflow-style" in document.documentElement.style
            ? 0
            : dn();
        } catch {
          return dn();
        }
      }),
      (i.getOffset = function (e) {
        var t = e.getBoundingClientRect(),
          n = ni(e),
          r = Ee(e);
        return {
          top: t.top + (r.pageYOffset || n.documentElement.scrollTop),
          left: t.left + (r.pageXOffset || n.documentElement.scrollLeft)
        };
      }),
      (i.prototype.init = function () {
        zi &&
          (this.initDOM(),
          (this.rtlHelpers = i.getRtlHelpers()),
          (this.scrollbarWidth = this.getScrollbarWidth()),
          this.recalculate(),
          this.initListeners());
      }),
      (i.prototype.initDOM = function () {
        var e, t;
        (this.wrapperEl = this.el.querySelector(K(this.classNames.wrapper))),
          (this.contentWrapperEl =
            this.options.scrollableNode ||
            this.el.querySelector(K(this.classNames.contentWrapper))),
          (this.contentEl =
            this.options.contentNode ||
            this.el.querySelector(K(this.classNames.contentEl))),
          (this.offsetEl = this.el.querySelector(K(this.classNames.offset))),
          (this.maskEl = this.el.querySelector(K(this.classNames.mask))),
          (this.placeholderEl = this.findChild(
            this.wrapperEl,
            K(this.classNames.placeholder)
          )),
          (this.heightAutoObserverWrapperEl = this.el.querySelector(
            K(this.classNames.heightAutoObserverWrapperEl)
          )),
          (this.heightAutoObserverEl = this.el.querySelector(
            K(this.classNames.heightAutoObserverEl)
          )),
          (this.axis.x.track.el = this.findChild(
            this.el,
            ""
              .concat(K(this.classNames.track))
              .concat(K(this.classNames.horizontal))
          )),
          (this.axis.y.track.el = this.findChild(
            this.el,
            ""
              .concat(K(this.classNames.track))
              .concat(K(this.classNames.vertical))
          )),
          (this.axis.x.scrollbar.el =
            ((e = this.axis.x.track.el) === null || e === void 0
              ? void 0
              : e.querySelector(K(this.classNames.scrollbar))) || null),
          (this.axis.y.scrollbar.el =
            ((t = this.axis.y.track.el) === null || t === void 0
              ? void 0
              : t.querySelector(K(this.classNames.scrollbar))) || null),
          this.options.autoHide ||
            (Oe(this.axis.x.scrollbar.el, this.classNames.visible),
            Oe(this.axis.y.scrollbar.el, this.classNames.visible));
      }),
      (i.prototype.initListeners = function () {
        var e = this,
          t,
          n = Ee(this.el);
        if (
          (this.el.addEventListener("mouseenter", this.onMouseEnter),
          this.el.addEventListener("pointerdown", this.onPointerEvent, !0),
          this.el.addEventListener("mousemove", this.onMouseMove),
          this.el.addEventListener("mouseleave", this.onMouseLeave),
          (t = this.contentWrapperEl) === null ||
            t === void 0 ||
            t.addEventListener("scroll", this.onScroll),
          n.addEventListener("resize", this.onWindowResize),
          !!this.contentEl)
        ) {
          if (window.ResizeObserver) {
            var r = !1,
              s = n.ResizeObserver || ResizeObserver;
            (this.resizeObserver = new s(function () {
              r &&
                n.requestAnimationFrame(function () {
                  e.recalculate();
                });
            })),
              this.resizeObserver.observe(this.el),
              this.resizeObserver.observe(this.contentEl),
              n.requestAnimationFrame(function () {
                r = !0;
              });
          }
          (this.mutationObserver = new n.MutationObserver(function () {
            n.requestAnimationFrame(function () {
              e.recalculate();
            });
          })),
            this.mutationObserver.observe(this.contentEl, {
              childList: !0,
              subtree: !0,
              characterData: !0
            });
        }
      }),
      (i.prototype.recalculate = function () {
        if (
          !(
            !this.heightAutoObserverEl ||
            !this.contentEl ||
            !this.contentWrapperEl ||
            !this.wrapperEl ||
            !this.placeholderEl
          )
        ) {
          var e = Ee(this.el);
          (this.elStyles = e.getComputedStyle(this.el)),
            (this.isRtl = this.elStyles.direction === "rtl");
          var t = this.contentEl.offsetWidth,
            n = this.heightAutoObserverEl.offsetHeight <= 1,
            r = this.heightAutoObserverEl.offsetWidth <= 1 || t > 0,
            s = this.contentWrapperEl.offsetWidth,
            o = this.elStyles.overflowX,
            a = this.elStyles.overflowY;
          (this.contentEl.style.padding = ""
            .concat(this.elStyles.paddingTop, " ")
            .concat(this.elStyles.paddingRight, " ")
            .concat(this.elStyles.paddingBottom, " ")
            .concat(this.elStyles.paddingLeft)),
            (this.wrapperEl.style.margin = "-"
              .concat(this.elStyles.paddingTop, " -")
              .concat(this.elStyles.paddingRight, " -")
              .concat(this.elStyles.paddingBottom, " -")
              .concat(this.elStyles.paddingLeft));
          var l = this.contentEl.scrollHeight,
            c = this.contentEl.scrollWidth;
          (this.contentWrapperEl.style.height = n ? "auto" : "100%"),
            (this.placeholderEl.style.width = r
              ? "".concat(t || c, "px")
              : "auto"),
            (this.placeholderEl.style.height = "".concat(l, "px"));
          var d = this.contentWrapperEl.offsetHeight;
          (this.axis.x.isOverflowing = t !== 0 && c > t),
            (this.axis.y.isOverflowing = l > d),
            (this.axis.x.isOverflowing =
              o === "hidden" ? !1 : this.axis.x.isOverflowing),
            (this.axis.y.isOverflowing =
              a === "hidden" ? !1 : this.axis.y.isOverflowing),
            (this.axis.x.forceVisible =
              this.options.forceVisible === "x" ||
              this.options.forceVisible === !0),
            (this.axis.y.forceVisible =
              this.options.forceVisible === "y" ||
              this.options.forceVisible === !0),
            this.hideNativeScrollbar();
          var p = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
            h = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
          (this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > s - h),
            (this.axis.y.isOverflowing =
              this.axis.y.isOverflowing && l > d - p),
            (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
            (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
            this.axis.x.scrollbar.el &&
              (this.axis.x.scrollbar.el.style.width = "".concat(
                this.axis.x.scrollbar.size,
                "px"
              )),
            this.axis.y.scrollbar.el &&
              (this.axis.y.scrollbar.el.style.height = "".concat(
                this.axis.y.scrollbar.size,
                "px"
              )),
            this.positionScrollbar("x"),
            this.positionScrollbar("y"),
            this.toggleTrackVisibility("x"),
            this.toggleTrackVisibility("y");
        }
      }),
      (i.prototype.getScrollbarSize = function (e) {
        var t, n;
        if (
          (e === void 0 && (e = "y"),
          !this.axis[e].isOverflowing || !this.contentEl)
        )
          return 0;
        var r = this.contentEl[this.axis[e].scrollSizeAttr],
          s =
            (n =
              (t = this.axis[e].track.el) === null || t === void 0
                ? void 0
                : t[this.axis[e].offsetSizeAttr]) !== null && n !== void 0
              ? n
              : 0,
          o = s / r,
          a;
        return (
          (a = Math.max(~~(o * s), this.options.scrollbarMinSize)),
          this.options.scrollbarMaxSize &&
            (a = Math.min(a, this.options.scrollbarMaxSize)),
          a
        );
      }),
      (i.prototype.positionScrollbar = function (e) {
        var t, n, r;
        e === void 0 && (e = "y");
        var s = this.axis[e].scrollbar;
        if (
          !(
            !this.axis[e].isOverflowing ||
            !this.contentWrapperEl ||
            !s.el ||
            !this.elStyles
          )
        ) {
          var o = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
            a =
              ((t = this.axis[e].track.el) === null || t === void 0
                ? void 0
                : t[this.axis[e].offsetSizeAttr]) || 0,
            l = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
            c = this.contentWrapperEl[this.axis[e].scrollOffsetAttr];
          (c =
            e === "x" &&
            this.isRtl &&
            !((n = i.getRtlHelpers()) === null || n === void 0) &&
            n.isScrollOriginAtZero
              ? -c
              : c),
            e === "x" &&
              this.isRtl &&
              (c =
                !((r = i.getRtlHelpers()) === null || r === void 0) &&
                r.isScrollingToNegative
                  ? c
                  : -c);
          var d = c / (o - l),
            p = ~~((a - s.size) * d);
          (p = e === "x" && this.isRtl ? -p + (a - s.size) : p),
            (s.el.style.transform =
              e === "x"
                ? "translate3d(".concat(p, "px, 0, 0)")
                : "translate3d(0, ".concat(p, "px, 0)"));
        }
      }),
      (i.prototype.toggleTrackVisibility = function (e) {
        e === void 0 && (e = "y");
        var t = this.axis[e].track.el,
          n = this.axis[e].scrollbar.el;
        !t ||
          !n ||
          !this.contentWrapperEl ||
          (this.axis[e].isOverflowing || this.axis[e].forceVisible
            ? ((t.style.visibility = "visible"),
              (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                "scroll"),
              this.el.classList.add(
                "".concat(this.classNames.scrollable, "-").concat(e)
              ))
            : ((t.style.visibility = "hidden"),
              (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                "hidden"),
              this.el.classList.remove(
                "".concat(this.classNames.scrollable, "-").concat(e)
              )),
          this.axis[e].isOverflowing
            ? (n.style.display = "block")
            : (n.style.display = "none"));
      }),
      (i.prototype.showScrollbar = function (e) {
        e === void 0 && (e = "y"),
          this.axis[e].isOverflowing &&
            !this.axis[e].scrollbar.isVisible &&
            (Oe(this.axis[e].scrollbar.el, this.classNames.visible),
            (this.axis[e].scrollbar.isVisible = !0));
      }),
      (i.prototype.hideScrollbar = function (e) {
        e === void 0 && (e = "y"),
          this.axis[e].isOverflowing &&
            this.axis[e].scrollbar.isVisible &&
            (Se(this.axis[e].scrollbar.el, this.classNames.visible),
            (this.axis[e].scrollbar.isVisible = !1));
      }),
      (i.prototype.hideNativeScrollbar = function () {
        this.offsetEl &&
          ((this.offsetEl.style[this.isRtl ? "left" : "right"] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
              ? "-".concat(this.scrollbarWidth, "px")
              : "0px"),
          (this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
              ? "-".concat(this.scrollbarWidth, "px")
              : "0px"));
      }),
      (i.prototype.onMouseMoveForAxis = function (e) {
        e === void 0 && (e = "y");
        var t = this.axis[e];
        !t.track.el ||
          !t.scrollbar.el ||
          ((t.track.rect = t.track.el.getBoundingClientRect()),
          (t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect()),
          this.isWithinBounds(t.track.rect)
            ? (this.showScrollbar(e),
              Oe(t.track.el, this.classNames.hover),
              this.isWithinBounds(t.scrollbar.rect)
                ? Oe(t.scrollbar.el, this.classNames.hover)
                : Se(t.scrollbar.el, this.classNames.hover))
            : (Se(t.track.el, this.classNames.hover),
              this.options.autoHide && this.hideScrollbar(e)));
      }),
      (i.prototype.onMouseLeaveForAxis = function (e) {
        e === void 0 && (e = "y"),
          Se(this.axis[e].track.el, this.classNames.hover),
          Se(this.axis[e].scrollbar.el, this.classNames.hover),
          this.options.autoHide && this.hideScrollbar(e);
      }),
      (i.prototype.onDragStart = function (e, t) {
        var n;
        t === void 0 && (t = "y");
        var r = ni(this.el),
          s = Ee(this.el),
          o = this.axis[t].scrollbar,
          a = t === "y" ? e.pageY : e.pageX;
        (this.axis[t].dragOffset =
          a -
          (((n = o.rect) === null || n === void 0
            ? void 0
            : n[this.axis[t].offsetAttr]) || 0)),
          (this.draggedAxis = t),
          Oe(this.el, this.classNames.dragging),
          r.addEventListener("mousemove", this.drag, !0),
          r.addEventListener("mouseup", this.onEndDrag, !0),
          this.removePreventClickId === null
            ? (r.addEventListener("click", this.preventClick, !0),
              r.addEventListener("dblclick", this.preventClick, !0))
            : (s.clearTimeout(this.removePreventClickId),
              (this.removePreventClickId = null));
      }),
      (i.prototype.onTrackClick = function (e, t) {
        var n = this,
          r,
          s,
          o,
          a;
        t === void 0 && (t = "y");
        var l = this.axis[t];
        if (
          !(
            !this.options.clickOnTrack ||
            !l.scrollbar.el ||
            !this.contentWrapperEl
          )
        ) {
          e.preventDefault();
          var c = Ee(this.el);
          this.axis[t].scrollbar.rect = l.scrollbar.el.getBoundingClientRect();
          var d = this.axis[t].scrollbar,
            p =
              (s =
                (r = d.rect) === null || r === void 0
                  ? void 0
                  : r[this.axis[t].offsetAttr]) !== null && s !== void 0
                ? s
                : 0,
            h = parseInt(
              (a =
                (o = this.elStyles) === null || o === void 0
                  ? void 0
                  : o[this.axis[t].sizeAttr]) !== null && a !== void 0
                ? a
                : "0px",
              10
            ),
            g = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
            m = t === "y" ? this.mouseY - p : this.mouseX - p,
            _ = m < 0 ? -1 : 1,
            b = _ === -1 ? g - h : g + h,
            w = 40,
            y = function () {
              n.contentWrapperEl &&
                (_ === -1
                  ? g > b &&
                    ((g -= w),
                    (n.contentWrapperEl[n.axis[t].scrollOffsetAttr] = g),
                    c.requestAnimationFrame(y))
                  : g < b &&
                    ((g += w),
                    (n.contentWrapperEl[n.axis[t].scrollOffsetAttr] = g),
                    c.requestAnimationFrame(y)));
            };
          y();
        }
      }),
      (i.prototype.getContentElement = function () {
        return this.contentEl;
      }),
      (i.prototype.getScrollElement = function () {
        return this.contentWrapperEl;
      }),
      (i.prototype.removeListeners = function () {
        var e = Ee(this.el);
        this.el.removeEventListener("mouseenter", this.onMouseEnter),
          this.el.removeEventListener("pointerdown", this.onPointerEvent, !0),
          this.el.removeEventListener("mousemove", this.onMouseMove),
          this.el.removeEventListener("mouseleave", this.onMouseLeave),
          this.contentWrapperEl &&
            this.contentWrapperEl.removeEventListener("scroll", this.onScroll),
          e.removeEventListener("resize", this.onWindowResize),
          this.mutationObserver && this.mutationObserver.disconnect(),
          this.resizeObserver && this.resizeObserver.disconnect(),
          this.onMouseMove.cancel(),
          this.onWindowResize.cancel(),
          this.onStopScrolling.cancel(),
          this.onMouseEntered.cancel();
      }),
      (i.prototype.unMount = function () {
        this.removeListeners();
      }),
      (i.prototype.isWithinBounds = function (e) {
        return (
          this.mouseX >= e.left &&
          this.mouseX <= e.left + e.width &&
          this.mouseY >= e.top &&
          this.mouseY <= e.top + e.height
        );
      }),
      (i.prototype.findChild = function (e, t) {
        var n =
          e.matches ||
          e.webkitMatchesSelector ||
          e.mozMatchesSelector ||
          e.msMatchesSelector;
        return Array.prototype.filter.call(e.children, function (r) {
          return n.call(r, t);
        })[0];
      }),
      (i.rtlHelpers = null),
      (i.defaultOptions = {
        forceVisible: !1,
        clickOnTrack: !0,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: "scrollable content",
        classNames: {
          contentEl: "simplebar-content",
          contentWrapper: "simplebar-content-wrapper",
          offset: "simplebar-offset",
          mask: "simplebar-mask",
          wrapper: "simplebar-wrapper",
          placeholder: "simplebar-placeholder",
          scrollbar: "simplebar-scrollbar",
          track: "simplebar-track",
          heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
          heightAutoObserverEl: "simplebar-height-auto-observer",
          visible: "simplebar-visible",
          horizontal: "simplebar-horizontal",
          vertical: "simplebar-vertical",
          hover: "simplebar-hover",
          dragging: "simplebar-dragging",
          scrolling: "simplebar-scrolling",
          scrollable: "simplebar-scrollable",
          mouseEntered: "simplebar-mouse-entered"
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: !0
      }),
      (i.getOptions = ac),
      (i.helpers = oc),
      i
    );
  })(),
  yi = function (i, e) {
    return (
      (yi =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }),
      yi(i, e)
    );
  };
function lc(i, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError(
      "Class extends value " + String(e) + " is not a constructor or null"
    );
  yi(i, e);
  function t() {
    this.constructor = i;
  }
  i.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var sr = Dt.helpers,
  ri = sr.getOptions,
  ie = sr.addClasses,
  or = (function (i) {
    lc(e, i);
    function e() {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      var r = i.apply(this, t) || this;
      return e.instances.set(t[0], r), r;
    }
    return (
      (e.initDOMLoadedElements = function () {
        document.removeEventListener(
          "DOMContentLoaded",
          this.initDOMLoadedElements
        ),
          window.removeEventListener("load", this.initDOMLoadedElements),
          Array.prototype.forEach.call(
            document.querySelectorAll("[data-simplebar]"),
            function (t) {
              t.getAttribute("data-simplebar") !== "init" &&
                !e.instances.has(t) &&
                new e(t, ri(t.attributes));
            }
          );
      }),
      (e.removeObserver = function () {
        var t;
        (t = e.globalObserver) === null || t === void 0 || t.disconnect();
      }),
      (e.prototype.initDOM = function () {
        var t = this,
          n,
          r,
          s;
        if (
          !Array.prototype.filter.call(this.el.children, function (l) {
            return l.classList.contains(t.classNames.wrapper);
          }).length
        ) {
          for (
            this.wrapperEl = document.createElement("div"),
              this.contentWrapperEl = document.createElement("div"),
              this.offsetEl = document.createElement("div"),
              this.maskEl = document.createElement("div"),
              this.contentEl = document.createElement("div"),
              this.placeholderEl = document.createElement("div"),
              this.heightAutoObserverWrapperEl = document.createElement("div"),
              this.heightAutoObserverEl = document.createElement("div"),
              ie(this.wrapperEl, this.classNames.wrapper),
              ie(this.contentWrapperEl, this.classNames.contentWrapper),
              ie(this.offsetEl, this.classNames.offset),
              ie(this.maskEl, this.classNames.mask),
              ie(this.contentEl, this.classNames.contentEl),
              ie(this.placeholderEl, this.classNames.placeholder),
              ie(
                this.heightAutoObserverWrapperEl,
                this.classNames.heightAutoObserverWrapperEl
              ),
              ie(
                this.heightAutoObserverEl,
                this.classNames.heightAutoObserverEl
              );
            this.el.firstChild;

          )
            this.contentEl.appendChild(this.el.firstChild);
          this.contentWrapperEl.appendChild(this.contentEl),
            this.offsetEl.appendChild(this.contentWrapperEl),
            this.maskEl.appendChild(this.offsetEl),
            this.heightAutoObserverWrapperEl.appendChild(
              this.heightAutoObserverEl
            ),
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
            this.wrapperEl.appendChild(this.maskEl),
            this.wrapperEl.appendChild(this.placeholderEl),
            this.el.appendChild(this.wrapperEl),
            (n = this.contentWrapperEl) === null ||
              n === void 0 ||
              n.setAttribute("tabindex", "0"),
            (r = this.contentWrapperEl) === null ||
              r === void 0 ||
              r.setAttribute("role", "region"),
            (s = this.contentWrapperEl) === null ||
              s === void 0 ||
              s.setAttribute("aria-label", this.options.ariaLabel);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
          var o = document.createElement("div"),
            a = document.createElement("div");
          ie(o, this.classNames.track),
            ie(a, this.classNames.scrollbar),
            o.appendChild(a),
            (this.axis.x.track.el = o.cloneNode(!0)),
            ie(this.axis.x.track.el, this.classNames.horizontal),
            (this.axis.y.track.el = o.cloneNode(!0)),
            ie(this.axis.y.track.el, this.classNames.vertical),
            this.el.appendChild(this.axis.x.track.el),
            this.el.appendChild(this.axis.y.track.el);
        }
        Dt.prototype.initDOM.call(this),
          this.el.setAttribute("data-simplebar", "init");
      }),
      (e.prototype.unMount = function () {
        Dt.prototype.unMount.call(this), e.instances.delete(this.el);
      }),
      (e.initHtmlApi = function () {
        (this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
          typeof MutationObserver < "u" &&
            ((this.globalObserver = new MutationObserver(e.handleMutations)),
            this.globalObserver.observe(document, {
              childList: !0,
              subtree: !0
            })),
          document.readyState === "complete" ||
          (document.readyState !== "loading" &&
            !document.documentElement.doScroll)
            ? window.setTimeout(this.initDOMLoadedElements)
            : (document.addEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements
              ),
              window.addEventListener("load", this.initDOMLoadedElements));
      }),
      (e.handleMutations = function (t) {
        t.forEach(function (n) {
          n.addedNodes.forEach(function (r) {
            r.nodeType === 1 &&
              (r.hasAttribute("data-simplebar")
                ? !e.instances.has(r) &&
                  document.documentElement.contains(r) &&
                  new e(r, ri(r.attributes))
                : r.querySelectorAll("[data-simplebar]").forEach(function (s) {
                    s.getAttribute("data-simplebar") !== "init" &&
                      !e.instances.has(s) &&
                      document.documentElement.contains(s) &&
                      new e(s, ri(s.attributes));
                  }));
          }),
            n.removedNodes.forEach(function (r) {
              r.nodeType === 1 &&
                (r.getAttribute("data-simplebar") === "init"
                  ? e.instances.has(r) &&
                    !document.documentElement.contains(r) &&
                    e.instances.get(r).unMount()
                  : Array.prototype.forEach.call(
                      r.querySelectorAll('[data-simplebar="init"]'),
                      function (s) {
                        e.instances.has(s) &&
                          !document.documentElement.contains(s) &&
                          e.instances.get(s).unMount();
                      }
                    ));
            });
        });
      }),
      (e.instances = new WeakMap()),
      e
    );
  })(Dt);
zi && or.initHtmlApi();
const {
    getInstance: cc,
    createInstance: ar,
    getOrCreateInstance: dc,
    destroyInstance: uc
  } = Re({ create: (i, e) => new or(i, e), destroy: (i) => i.unMount() }),
  _i = (i) => {
    i.querySelectorAll("[data-scrollbar]").forEach((e) => {
      ar(e, Ve(e, "scrollbar")), e.dispatchEvent(new Event("scrollbar.init"));
    });
  };
document.readyState && document.readyState !== "loading"
  ? _i(document)
  : document.addEventListener("DOMContentLoaded", () => {
      _i(document);
    });
const pc = {
  getInstance: cc,
  createInstance: ar,
  getOrCreateInstance: dc,
  destroyInstance: uc,
  dataApi: _i
};
function hc(i, e) {
  return (e = { exports: {} }), i(e, e.exports), e.exports;
}
var Ae = hc(function (i, e) {
  (function (t) {
    var n = "function",
      r = "isNode",
      s = function (l, c) {
        return typeof l === c;
      },
      o = function (l, c) {
        c !== null &&
          (Array.isArray(c)
            ? c.map(function (d) {
                return o(l, d);
              })
            : (a[r](c) || (c = document.createTextNode(c)), l.appendChild(c)));
      };
    function a(l, c) {
      var d = arguments,
        p = 1,
        h,
        g;
      if (
        ((l = a.isElement(l) ? l : document.createElement(l)),
        s(c, "object") && !a[r](c) && !Array.isArray(c))
      ) {
        p++;
        for (h in c)
          (g = c[h]),
            (h = a.attrMap[h] || h),
            s(h, n) ? h(l, g) : s(g, n) ? (l[h] = g) : l.setAttribute(h, g);
      }
      for (; p < d.length; p++) o(l, d[p]);
      return l;
    }
    (a.attrMap = {}),
      (a.isElement = function (l) {
        return l instanceof Element;
      }),
      (a[r] = function (l) {
        return l instanceof Node;
      }),
      typeof Proxy < "u" &&
        (a.proxy = new Proxy(a, {
          get: function (l, c) {
            return !(c in a) && (a[c] = a.bind(null, c)), a[c];
          }
        })),
      t(a, n);
  })(function (t, n) {
    i.exports = t;
  });
});
const fc = {
  position: "absolute",
  transitionDuration: 300,
  class: "",
  onClick: () => {}
};
class Pi {
  constructor(e, t) {
    S(this, "_init", () => {
      (this._backdropEl = Ae("div", {
        class: Xn("backdrop", this._options.position, this._options.class),
        style: "top: 0; left: 0; height: 100%; width: 100%"
      })),
        (this._parentNode =
          document.body === this._targetEl
            ? document.body
            : this._targetEl.parentNode),
        (this._parentNodePosition = this._parentNode.style.position);
    });
    S(this, "create", () => {
      const { _parentNode: e } = this;
      getComputedStyle(e).getPropertyValue("position") === "static" &&
        (e.style.position = "relative"),
        e.append(this._backdropEl),
        this._backdropEl.addEventListener(
          "click",
          this._handleBackdropElClick,
          !0
        ),
        this._backdropEl.style.setProperty(
          "--backdrop-duration",
          `${this._options.transitionDuration}ms`
        );
    });
    S(this, "show", () => {
      this.create(),
        this._targetIsBody &&
          ((document.body.dataset.modalCount =
            Number(document.body.dataset.modalCount ?? 0) + 1),
          (document.body.style.paddingRight =
            window.innerWidth - document.documentElement.clientWidth + "px"),
          (document.body.style.overflow = "hidden")),
        setTimeout(() => {
          this._backdropEl.classList.add("backdrop--show");
        }, 0);
    });
    S(this, "hide", () => {
      this._backdropEl.removeEventListener(
        "click",
        this._handleBackdropElClick,
        !0
      ),
        this._backdropEl.classList.remove("backdrop--show"),
        setTimeout(() => {
          this._backdropEl.remove(),
            this._parentNodePosition &&
              this._parentNodePosition.style.removeProperty("position"),
            this._targetIsBody &&
              ((document.body.dataset.modalCount -= 1),
              Number(document.body.dataset.modalCount) === 0 &&
                (document.body.removeAttribute("data-modal-count"),
                document.body.style.removeProperty("padding-right"),
                document.body.style.removeProperty("overflow")));
        }, this._options.transitionDuration);
    });
    S(this, "getBackdropEl", () => this._backdropEl);
    S(this, "_handleBackdropElClick", (e) => {
      this._backdropEl === e.target &&
        (this._options.onClick(),
        this._backdropEl.dispatchEvent(new Event("backdrop.click")));
    });
    (this._targetEl = e),
      (this._targetIsBody = e === document.body),
      (this._backdropEl = null),
      (this._parentNode = null),
      (this._parentNodePosition = null),
      (this._options = { ...fc, ...t }),
      this._init();
  }
}
const vc = { expandedClass: "col--expanded", transitionDuration: 250 };
class mc {
  constructor(e, t) {
    S(this, "show", (e = !1) => {
      this._expanded ||
        (this._options.group &&
          gc.forEach((t) => {
            t !== this && t.inGroup(this._options.group) && t.hide(!1);
          }),
        e || this._preTransition(),
        (this._expanded = !0),
        this._targetEl.classList.add(this._options.expandedClass),
        this._options.backdrop.show(),
        this._postTransition());
    });
    S(this, "hide", (e = !0) => {
      this._expanded &&
        (this._preTransition(),
        (this._expanded = !1),
        this._targetEl.classList.remove(this._options.expandedClass),
        e && this._options.backdrop.hide(),
        this._postTransition());
    });
    S(this, "toggle", () => {
      this._expanded ? this.hide() : this.show();
    });
    S(this, "_init", () => {
      getComputedStyle(this._targetEl).getPropertyValue("overflow") !==
        "hidden" && this.show(!0),
        this._targetEl.classList.forEach((e) => {
          e !== this._options.expandedClass &&
            e.includes(this._options.expandedClass) &&
            this._targetEl.classList.remove(e);
        }),
        this._options.backdrop
          .getBackdropEl()
          .addEventListener("backdrop.click", this.hide);
    });
    S(this, "_createShadowEl", () => {
      const e = document.createElement("div");
      return (
        e.classList.add(
          "absolute",
          "z-[-9999]",
          "w-[var(--col-width)]",
          "invisible",
          "translate-x-[9999]"
        ),
        this._targetEl.parentNode.appendChild(e),
        e
      );
    });
    S(
      this,
      "_getExpandedWidth",
      () => (
        this._shadowEl.style.setProperty(
          "--col-width",
          getComputedStyle(this._targetEl).getPropertyValue("--col-width")
        ),
        this._shadowEl.offsetWidth
      )
    );
    S(this, "_preTransition", () => {
      this._targetEl.style.setProperty(
        "--col-duration",
        `${this._options.transitionDuration}ms`
      );
      const e = this._getExpandedWidth();
      this._innerEl.style.width = `${e}px`;
    });
    S(this, "_postTransition", () => {
      setTimeout(() => {
        this._targetEl.style.removeProperty(
          "--col-duration",
          `${this._options.transitionDuration}ms`
        ),
          this._innerEl.style.removeProperty("width");
      }, this._options.transitionDuration);
    });
    S(this, "inGroup", (e) => this._options.group === e);
    (this._targetEl = e),
      (this._shadowEl = this._createShadowEl()),
      (this._innerEl = e.firstElementChild),
      (this._options = { ...vc, ...t }),
      (this._expanded = !1),
      this._init();
  }
}
const {
    instances: gc,
    getInstance: zt,
    createInstance: yc,
    getOrCreateInstance: lr,
    destroyInstance: _c
  } = Re({ create: (i, e) => new mc(i, e), iterable: !0 }),
  bi = (i = document) => {
    const e = new WeakMap();
    i.querySelectorAll(".cols").forEach((t) => {
      e.set(t, new Pi(t.firstElementChild, { class: "cols__backdrop" })),
        t.querySelectorAll(".col").forEach((n) => {
          const r = n.parentNode,
            s = e.get(r),
            o = { ...Ve(n, "col"), backdrop: s };
          lr(n, o);
        });
    }),
      i.querySelectorAll("[data-col-toggle]").forEach((t) => {
        t.addEventListener("click", (n) => {
          n.preventDefault();
          const r = t.dataset.colToggle,
            s = i.getElementById(r);
          zt(s).toggle();
        });
      }),
      i.querySelectorAll("[data-col-show], [data-col-open]").forEach((t) => {
        t.addEventListener("click", (n) => {
          n.preventDefault();
          const r = t.dataset.colShow ?? t.dataset.colOpen,
            s = i.getElementById(r);
          zt(s).show();
        });
      }),
      i.querySelectorAll("[data-col-hide], [data-col-close]").forEach((t) => {
        t.addEventListener("click", (n) => {
          n.preventDefault();
          const r = t.dataset.colHide ?? t.dataset.colClose,
            s = i.getElementById(r);
          zt(s).hide();
        });
      });
  };
document.readyState && document.readyState !== "loading"
  ? bi(document)
  : document.addEventListener("load", () => {
      bi(document);
    });
const bc = {
    getInstance: zt,
    createInstance: yc,
    getOrCreateInstance: lr,
    destroyInstance: _c,
    setup: bi
  },
  wc = { triggerSelector: "[data-dismiss-trigger]" };
class xc {
  constructor(e, t) {
    S(this, "dismiss", () => {
      this.dispose(),
        this._targetEl.dispatchEvent(new Event("dismissible.dismiss")),
        this._targetEl.remove();
    });
    S(this, "dispose", () => {
      this._triggerElems.forEach((e) => {
        e.removeEventListener("click", this.dismiss);
      });
    });
    S(this, "_init", () => {
      this._triggerElems.forEach((e) => {
        e.addEventListener("click", this.dismiss);
      });
    });
    S(this, "_resolveTriggerElems", () =>
      this._targetEl.querySelectorAll(this._options.triggerSelector)
    );
    (this._targetEl = e),
      (this._options = { ...wc, ...t }),
      (this._triggerElems = this._resolveTriggerElems()),
      this._init();
  }
}
const {
    getInstance: Ec,
    createInstance: Oc,
    getOrCreateInstance: cr,
    destroyInstance: dr
  } = Re({ create: (i, e) => new xc(i, e), destroy: (i) => i.dispose() }),
  wi = (i) => {
    i.querySelectorAll("[data-dismissible]").forEach((e) => {
      const t = Ve(e, "dismissible");
      cr(e, t),
        e.addEventListener(
          "dismissible.dismiss",
          () => {
            dr(e);
          },
          { once: !0 }
        );
    });
  };
document.readyState && document.readyState !== "loading"
  ? wi(document)
  : document.addEventListener("DOMContentLoaded", () => {
      wi(document);
    });
const Sc = {
  getInstance: Ec,
  createInstance: Oc,
  getOrCreateInstance: cr,
  destroyInstance: dr,
  dataApi: wi
};
function si(i, e) {
  i.split(/\s+/).forEach((t) => {
    e(t);
  });
}
class Ac {
  constructor() {
    (this._events = void 0), (this._events = {});
  }
  on(e, t) {
    si(e, (n) => {
      const r = this._events[n] || [];
      r.push(t), (this._events[n] = r);
    });
  }
  off(e, t) {
    var n = arguments.length;
    if (n === 0) {
      this._events = {};
      return;
    }
    si(e, (r) => {
      if (n === 1) {
        delete this._events[r];
        return;
      }
      const s = this._events[r];
      s !== void 0 && (s.splice(s.indexOf(t), 1), (this._events[r] = s));
    });
  }
  trigger(e, ...t) {
    var n = this;
    si(e, (r) => {
      const s = n._events[r];
      s !== void 0 &&
        s.forEach((o) => {
          o.apply(n, t);
        });
    });
  }
}
function Cc(i) {
  return (
    (i.plugins = {}),
    class extends i {
      constructor(...e) {
        super(...e),
          (this.plugins = {
            names: [],
            settings: {},
            requested: {},
            loaded: {}
          });
      }
      static define(e, t) {
        i.plugins[e] = { name: e, fn: t };
      }
      initializePlugins(e) {
        var t, n;
        const r = this,
          s = [];
        if (Array.isArray(e))
          e.forEach((o) => {
            typeof o == "string"
              ? s.push(o)
              : ((r.plugins.settings[o.name] = o.options), s.push(o.name));
          });
        else if (e)
          for (t in e)
            e.hasOwnProperty(t) && ((r.plugins.settings[t] = e[t]), s.push(t));
        for (; (n = s.shift()); ) r.require(n);
      }
      loadPlugin(e) {
        var t = this,
          n = t.plugins,
          r = i.plugins[e];
        if (!i.plugins.hasOwnProperty(e))
          throw new Error('Unable to find "' + e + '" plugin');
        (n.requested[e] = !0),
          (n.loaded[e] = r.fn.apply(t, [t.plugins.settings[e] || {}])),
          n.names.push(e);
      }
      require(e) {
        var t = this,
          n = t.plugins;
        if (!t.plugins.loaded.hasOwnProperty(e)) {
          if (n.requested[e])
            throw new Error('Plugin has circular dependency ("' + e + '")');
          t.loadPlugin(e);
        }
        return n.loaded[e];
      }
    }
  );
}
/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */ const Kt = (
    i
  ) => (
    (i = i.filter(Boolean)),
    i.length < 2
      ? i[0] || ""
      : Ic(i) == 1
      ? "[" + i.join("") + "]"
      : "(?:" + i.join("|") + ")"
  ),
  ur = (i) => {
    if (!kc(i)) return i.join("");
    let e = "",
      t = 0;
    const n = () => {
      t > 1 && (e += "{" + t + "}");
    };
    return (
      i.forEach((r, s) => {
        if (r === i[s - 1]) {
          t++;
          return;
        }
        n(), (e += r), (t = 1);
      }),
      n(),
      e
    );
  },
  pr = (i) => {
    let e = Hi(i);
    return Kt(e);
  },
  kc = (i) => new Set(i).size !== i.length,
  ht = (i) => (i + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1"),
  Ic = (i) => i.reduce((e, t) => Math.max(e, Lc(t)), 0),
  Lc = (i) => Hi(i).length,
  Hi = (i) => Array.from(i);
/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */ const hr = (
  i
) => {
  if (i.length === 1) return [[i]];
  let e = [];
  const t = i.substring(1);
  return (
    hr(t).forEach(function (r) {
      let s = r.slice(0);
      (s[0] = i.charAt(0) + s[0]),
        e.push(s),
        (s = r.slice(0)),
        s.unshift(i.charAt(0)),
        e.push(s);
    }),
    e
  );
};
/*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) */ const Tc = [
    [0, 65535]
  ],
  Mc = "[Ì€-Í¯Â·Ê¾Ê¼]";
let Wt, fr;
const Dc = 3,
  $i = {},
  un = {
    "/": "â„âˆ•",
    0: "ß€",
    a: "â±¥ÉÉ‘",
    aa: "êœ³",
    ae: "Ã¦Ç½Ç£",
    ao: "êœµ",
    au: "êœ·",
    av: "êœ¹êœ»",
    ay: "êœ½",
    b: "Æ€É“Æƒ",
    c: "êœ¿ÆˆÈ¼â†„",
    d: "Ä‘É—É–á´…ÆŒê®·ÔÉ¦",
    e: "É›Çá´‡É‡",
    f: "ê¼Æ’",
    g: "Ç¥É êž¡áµ¹ê¿É¢",
    h: "Ä§â±¨â±¶É¥",
    i: "É¨Ä±",
    j: "É‰È·",
    k: "Æ™â±ªêêƒê…êž£",
    l: "Å‚ÆšÉ«â±¡ê‰ê‡êžÉ­",
    m: "É±É¯Ï»",
    n: "êž¥ÆžÉ²êž‘á´ŽÐ»Ô‰",
    o: "Ã¸Ç¿É”Éµê‹êá´‘",
    oe: "Å“",
    oi: "Æ£",
    oo: "ê",
    ou: "È£",
    p: "Æ¥áµ½ê‘ê“ê•Ï",
    q: "ê—ê™É‹",
    r: "ÉÉ½ê›êž§êžƒ",
    s: "ÃŸÈ¿êž©êž…Ê‚",
    t: "Å§Æ­Êˆâ±¦êž‡",
    th: "Ã¾",
    tz: "êœ©",
    u: "Ê‰",
    v: "Ê‹êŸÊŒ",
    vy: "ê¡",
    w: "â±³",
    y: "Æ´Éá»¿",
    z: "Æ¶È¥É€â±¬ê£",
    hv: "Æ•"
  };
for (let i in un) {
  let e = un[i] || "";
  for (let t = 0; t < e.length; t++) {
    let n = e.substring(t, t + 1);
    $i[n] = i;
  }
}
// const zc = new RegExp(Object.keys($i).join("|") + "|" + Mc, "gu"),
//   Pc = (i) => {
//     Wt === void 0 && (Wt = Fc(i || Tc));
//   },
//   pn = (i, e = "NFKD") => i.normalize(e),
//   Bt = (i) => Hi(i).reduce((e, t) => e + Hc(t), ""),
//   Hc = (i) => (
//     (i = pn(i)
//       .toLowerCase()
//       .replace(zc, (e) => $i[e] || "")),
//     pn(i, "NFC")
//   );
function* $c(i) {
  for (const [e, t] of i)
    for (let n = e; n <= t; n++) {
      let r = String.fromCharCode(n),
        s = Bt(r);
      s != r.toLowerCase() &&
        (s.length > Dc ||
          (s.length != 0 && (yield { folded: s, composed: r, code_point: n })));
    }
}
const Vc = (i) => {
    const e = {},
      t = (n, r) => {
        const s = e[n] || new Set(),
          o = new RegExp("^" + pr(s) + "$", "iu");
        r.match(o) || (s.add(ht(r)), (e[n] = s));
      };
    for (let n of $c(i)) t(n.folded, n.folded), t(n.folded, n.composed);
    return e;
  },
  Fc = (i) => {
    const e = Vc(i),
      t = {};
    let n = [];
    for (let s in e) {
      let o = e[s];
      o && (t[s] = pr(o)), s.length > 1 && n.push(ht(s));
    }
    n.sort((s, o) => o.length - s.length);
    const r = Kt(n);
    return (fr = new RegExp("^" + r, "u")), t;
  },
  Rc = (i, e = 1) => {
    let t = 0;
    return (
      (i = i.map((n) => (Wt[n] && (t += n.length), Wt[n] || n))),
      t >= e ? ur(i) : ""
    );
  },
  jc = (i, e = 1) => (
    (e = Math.max(e, i.length - 1)), Kt(hr(i).map((t) => Rc(t, e)))
  ),
  hn = (i, e = !0) => {
    let t = i.length > 1 ? 1 : 0;
    return Kt(
      i.map((n) => {
        let r = [];
        const s = e ? n.length() : n.length() - 1;
        for (let o = 0; o < s; o++) r.push(jc(n.substrs[o] || "", t));
        return ur(r);
      })
    );
  },
  Nc = (i, e) => {
    for (const t of e) {
      if (
        t.start != i.start ||
        t.end != i.end ||
        t.substrs.join("") !== i.substrs.join("")
      )
        continue;
      let n = i.parts;
      const r = (o) => {
        for (const a of n) {
          if (a.start === o.start && a.substr === o.substr) return !1;
          if (
            !(o.length == 1 || a.length == 1) &&
            ((o.start < a.start && o.end > a.start) ||
              (a.start < o.start && a.end > o.start))
          )
            return !0;
        }
        return !1;
      };
      if (!(t.parts.filter(r).length > 0)) return !0;
    }
    return !1;
  };
class qt {
  constructor() {
    (this.parts = []), (this.substrs = []), (this.start = 0), (this.end = 0);
  }
  add(e) {
    e &&
      (this.parts.push(e),
      this.substrs.push(e.substr),
      (this.start = Math.min(e.start, this.start)),
      (this.end = Math.max(e.end, this.end)));
  }
  last() {
    return this.parts[this.parts.length - 1];
  }
  length() {
    return this.parts.length;
  }
  clone(e, t) {
    let n = new qt(),
      r = JSON.parse(JSON.stringify(this.parts)),
      s = r.pop();
    for (const l of r) n.add(l);
    let o = t.substr.substring(0, e - s.start),
      a = o.length;
    return n.add({ start: s.start, end: s.start + a, length: a, substr: o }), n;
  }
}
const Wc = (i) => {
  Pc(), (i = Bt(i));
  let e = "",
    t = [new qt()];
  for (let n = 0; n < i.length; n++) {
    let s = i.substring(n).match(fr);
    const o = i.substring(n, n + 1),
      a = s ? s[0] : null;
    let l = [],
      c = new Set();
    for (const d of t) {
      const p = d.last();
      if (!p || p.length == 1 || p.end <= n)
        if (a) {
          const h = a.length;
          d.add({ start: n, end: n + h, length: h, substr: a }), c.add("1");
        } else
          d.add({ start: n, end: n + 1, length: 1, substr: o }), c.add("2");
      else if (a) {
        let h = d.clone(n, p);
        const g = a.length;
        h.add({ start: n, end: n + g, length: g, substr: a }), l.push(h);
      } else c.add("3");
    }
    if (l.length > 0) {
      l = l.sort((d, p) => d.length() - p.length());
      for (let d of l) Nc(d, t) || t.push(d);
      continue;
    }
    if (n > 0 && c.size == 1 && !c.has("3")) {
      e += hn(t, !1);
      let d = new qt();
      const p = t[0];
      p && d.add(p.last()), (t = [d]);
    }
  }
  return (e += hn(t, !0)), e;
};
/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */ const Bc = (
    i,
    e
  ) => {
    if (i) return i[e];
  },
  qc = (i, e) => {
    if (i) {
      for (var t, n = e.split("."); (t = n.shift()) && (i = i[t]); );
      return i;
    }
  },
  oi = (i, e, t) => {
    var n, r;
    return !i ||
      ((i = i + ""), e.regex == null) ||
      ((r = i.search(e.regex)), r === -1)
      ? 0
      : ((n = e.string.length / i.length), r === 0 && (n += 0.5), n * t);
  },
  ai = (i, e) => {
    var t = i[e];
    if (typeof t == "function") return t;
    t && !Array.isArray(t) && (i[e] = [t]);
  },
  Y = (i, e) => {
    if (Array.isArray(i)) i.forEach(e);
    else for (var t in i) i.hasOwnProperty(t) && e(i[t], t);
  },
  Uc = (i, e) =>
    typeof i == "number" && typeof e == "number"
      ? i > e
        ? 1
        : i < e
        ? -1
        : 0
      : ((i = Bt(i + "").toLowerCase()),
        (e = Bt(e + "").toLowerCase()),
        i > e ? 1 : e > i ? -1 : 0);
/*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) */ class Yc {
  constructor(e, t) {
    (this.items = void 0),
      (this.settings = void 0),
      (this.items = e),
      (this.settings = t || { diacritics: !0 });
  }
  tokenize(e, t, n) {
    if (!e || !e.length) return [];
    const r = [],
      s = e.split(/\s+/);
    var o;
    return (
      n &&
        (o = new RegExp("^(" + Object.keys(n).map(ht).join("|") + "):(.*)$")),
      s.forEach((a) => {
        let l,
          c = null,
          d = null;
        o && (l = a.match(o)) && ((c = l[1]), (a = l[2])),
          a.length > 0 &&
            (this.settings.diacritics ? (d = Wc(a) || null) : (d = ht(a)),
            d && t && (d = "\\b" + d)),
          r.push({
            string: a,
            regex: d ? new RegExp(d, "iu") : null,
            field: c
          });
      }),
      r
    );
  }
  getScoreFunction(e, t) {
    var n = this.prepareSearch(e, t);
    return this._getScoreFunction(n);
  }
  _getScoreFunction(e) {
    const t = e.tokens,
      n = t.length;
    if (!n)
      return function () {
        return 0;
      };
    const r = e.options.fields,
      s = e.weights,
      o = r.length,
      a = e.getAttrFn;
    if (!o)
      return function () {
        return 1;
      };
    const l = (function () {
      return o === 1
        ? function (c, d) {
            const p = r[0].field;
            return oi(a(d, p), c, s[p] || 1);
          }
        : function (c, d) {
            var p = 0;
            if (c.field) {
              const h = a(d, c.field);
              !c.regex && h ? (p += 1 / o) : (p += oi(h, c, 1));
            } else
              Y(s, (h, g) => {
                p += oi(a(d, g), c, h);
              });
            return p / o;
          };
    })();
    return n === 1
      ? function (c) {
          return l(t[0], c);
        }
      : e.options.conjunction === "and"
      ? function (c) {
          var d,
            p = 0;
          for (let h of t) {
            if (((d = l(h, c)), d <= 0)) return 0;
            p += d;
          }
          return p / n;
        }
      : function (c) {
          var d = 0;
          return (
            Y(t, (p) => {
              d += l(p, c);
            }),
            d / n
          );
        };
  }
  getSortFunction(e, t) {
    var n = this.prepareSearch(e, t);
    return this._getSortFunction(n);
  }
  _getSortFunction(e) {
    var t,
      n = [];
    const r = this,
      s = e.options,
      o = !e.query && s.sort_empty ? s.sort_empty : s.sort;
    if (typeof o == "function") return o.bind(this);
    const a = function (d, p) {
      return d === "$score" ? p.score : e.getAttrFn(r.items[p.id], d);
    };
    if (o) for (let c of o) (e.query || c.field !== "$score") && n.push(c);
    if (e.query) {
      t = !0;
      for (let c of n)
        if (c.field === "$score") {
          t = !1;
          break;
        }
      t && n.unshift({ field: "$score", direction: "desc" });
    } else n = n.filter((c) => c.field !== "$score");
    return n.length
      ? function (c, d) {
          var p, h;
          for (let g of n)
            if (
              ((h = g.field),
              (p = (g.direction === "desc" ? -1 : 1) * Uc(a(h, c), a(h, d))),
              p)
            )
              return p;
          return 0;
        }
      : null;
  }
  prepareSearch(e, t) {
    const n = {};
    var r = Object.assign({}, t);
    if ((ai(r, "sort"), ai(r, "sort_empty"), r.fields)) {
      ai(r, "fields");
      const s = [];
      r.fields.forEach((o) => {
        typeof o == "string" && (o = { field: o, weight: 1 }),
          s.push(o),
          (n[o.field] = "weight" in o ? o.weight : 1);
      }),
        (r.fields = s);
    }
    return {
      options: r,
      query: e.toLowerCase().trim(),
      tokens: this.tokenize(e, r.respect_word_boundaries, n),
      total: 0,
      items: [],
      weights: n,
      getAttrFn: r.nesting ? qc : Bc
    };
  }
  search(e, t) {
    var n = this,
      r,
      s;
    (s = this.prepareSearch(e, t)), (t = s.options), (e = s.query);
    const o = t.score || n._getScoreFunction(s);
    e.length
      ? Y(n.items, (l, c) => {
          (r = o(l)),
            (t.filter === !1 || r > 0) && s.items.push({ score: r, id: c });
        })
      : Y(n.items, (l, c) => {
          s.items.push({ score: 1, id: c });
        });
    const a = n._getSortFunction(s);
    return (
      a && s.items.sort(a),
      (s.total = s.items.length),
      typeof t.limit == "number" && (s.items = s.items.slice(0, t.limit)),
      s
    );
  }
}
const Ke = (i, e) => {
    if (Array.isArray(i)) i.forEach(e);
    else for (var t in i) i.hasOwnProperty(t) && e(i[t], t);
  },
  N = (i) => {
    if (i.jquery) return i[0];
    if (i instanceof HTMLElement) return i;
    if (vr(i)) {
      var e = document.createElement("template");
      return (e.innerHTML = i.trim()), e.content.firstChild;
    }
    return document.querySelector(i);
  },
  vr = (i) => typeof i == "string" && i.indexOf("<") > -1,
  Xc = (i) => i.replace(/['"\\]/g, "\\$&"),
  li = (i, e) => {
    var t = document.createEvent("HTMLEvents");
    t.initEvent(e, !0, !1), i.dispatchEvent(t);
  },
  It = (i, e) => {
    Object.assign(i.style, e);
  },
  U = (i, ...e) => {
    var t = mr(e);
    (i = gr(i)),
      i.map((n) => {
        t.map((r) => {
          n.classList.add(r);
        });
      });
  },
  _e = (i, ...e) => {
    var t = mr(e);
    (i = gr(i)),
      i.map((n) => {
        t.map((r) => {
          n.classList.remove(r);
        });
      });
  },
  mr = (i) => {
    var e = [];
    return (
      Ke(i, (t) => {
        typeof t == "string" && (t = t.trim().split(/[\11\12\14\15\40]/)),
          Array.isArray(t) && (e = e.concat(t));
      }),
      e.filter(Boolean)
    );
  },
  gr = (i) => (Array.isArray(i) || (i = [i]), i),
  Pt = (i, e, t) => {
    if (!(t && !t.contains(i)))
      for (; i && i.matches; ) {
        if (i.matches(e)) return i;
        i = i.parentNode;
      }
  },
  fn = (i, e = 0) => (e > 0 ? i[i.length - 1] : i[0]),
  Kc = (i) => Object.keys(i).length === 0,
  Ut = (i, e) => {
    if (!i) return -1;
    e = e || i.nodeName;
    for (var t = 0; (i = i.previousElementSibling); ) i.matches(e) && t++;
    return t;
  },
  H = (i, e) => {
    Ke(e, (t, n) => {
      t == null ? i.removeAttribute(n) : i.setAttribute(n, "" + t);
    });
  },
  xi = (i, e) => {
    i.parentNode && i.parentNode.replaceChild(e, i);
  },
  Gc = (i, e) => {
    if (e === null) return;
    if (typeof e == "string") {
      if (!e.length) return;
      e = new RegExp(e, "i");
    }
    const t = (s) => {
        var o = s.data.match(e);
        if (o && s.data.length > 0) {
          var a = document.createElement("span");
          a.className = "highlight";
          var l = s.splitText(o.index);
          l.splitText(o[0].length);
          var c = l.cloneNode(!0);
          return a.appendChild(c), xi(l, a), 1;
        }
        return 0;
      },
      n = (s) => {
        s.nodeType === 1 &&
          s.childNodes &&
          !/(script|style)/i.test(s.tagName) &&
          (s.className !== "highlight" || s.tagName !== "SPAN") &&
          Array.from(s.childNodes).forEach((o) => {
            r(o);
          });
      },
      r = (s) => (s.nodeType === 3 ? t(s) : (n(s), 0));
    r(i);
  },
  Qc = (i) => {
    var e = i.querySelectorAll("span.highlight");
    Array.prototype.forEach.call(e, function (t) {
      var n = t.parentNode;
      n.replaceChild(t.firstChild, t), n.normalize();
    });
  },
  Jc = 65,
  Zc = 13,
  yr = 27,
  Ei = 37,
  ed = 38,
  _r = 39,
  td = 40,
  vn = 8,
  id = 46,
  Oi = 9,
  nd = typeof navigator > "u" ? !1 : /Mac/.test(navigator.userAgent),
  Lt = nd ? "metaKey" : "ctrlKey";
var mn = {
  options: [],
  optgroups: [],
  plugins: [],
  delimiter: ",",
  splitOn: null,
  persist: !0,
  diacritics: !0,
  create: null,
  createOnBlur: !1,
  createFilter: null,
  highlight: !0,
  openOnFocus: !0,
  shouldOpen: null,
  maxOptions: 50,
  maxItems: null,
  hideSelected: null,
  duplicates: !1,
  addPrecedence: !1,
  selectOnTab: !1,
  preload: null,
  allowEmptyOption: !1,
  loadThrottle: 300,
  loadingClass: "loading",
  dataAttr: null,
  optgroupField: "optgroup",
  valueField: "value",
  labelField: "text",
  disabledField: "disabled",
  optgroupLabelField: "label",
  optgroupValueField: "value",
  lockOptgroupOrder: !1,
  sortField: "$order",
  searchField: ["text"],
  searchConjunction: "and",
  mode: null,
  wrapperClass: "ts-wrapper",
  controlClass: "ts-control",
  dropdownClass: "ts-dropdown",
  dropdownContentClass: "ts-dropdown-content",
  itemClass: "item",
  optionClass: "option",
  dropdownParent: null,
  controlInput: '<input type="text" autocomplete="off" size="1" />',
  copyClassesToDropdown: !1,
  placeholder: null,
  hidePlaceholder: null,
  shouldLoad: function (i) {
    return i.length > 0;
  },
  render: {}
};
const ne = (i) => (typeof i > "u" || i === null ? null : Ht(i)),
  Ht = (i) => (typeof i == "boolean" ? (i ? "1" : "0") : i + ""),
  $t = (i) =>
    (i + "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;"),
  rd = (i, e) => {
    var t;
    return function (n, r) {
      var s = this;
      t && ((s.loading = Math.max(s.loading - 1, 0)), clearTimeout(t)),
        (t = setTimeout(function () {
          (t = null), (s.loadedSearches[n] = !0), i.call(s, n, r);
        }, e));
    };
  },
  gn = (i, e, t) => {
    var n,
      r = i.trigger,
      s = {};
    (i.trigger = function () {
      var o = arguments[0];
      if (e.indexOf(o) !== -1) s[o] = arguments;
      else return r.apply(i, arguments);
    }),
      t.apply(i, []),
      (i.trigger = r);
    for (n of e) n in s && r.apply(i, s[n]);
  },
  sd = (i) => ({
    start: i.selectionStart || 0,
    length: (i.selectionEnd || 0) - (i.selectionStart || 0)
  }),
  z = (i, e = !1) => {
    i && (i.preventDefault(), e && i.stopPropagation());
  },
  F = (i, e, t, n) => {
    i.addEventListener(e, t, n);
  },
  Me = (i, e) => {
    if (!e || !e[i]) return !1;
    var t =
      (e.altKey ? 1 : 0) +
      (e.ctrlKey ? 1 : 0) +
      (e.shiftKey ? 1 : 0) +
      (e.metaKey ? 1 : 0);
    return t === 1;
  },
  ci = (i, e) => {
    const t = i.getAttribute("id");
    return t || (i.setAttribute("id", e), e);
  },
  yn = (i) => i.replace(/[\\"']/g, "\\$&"),
  De = (i, e) => {
    e && i.append(e);
  };
function _n(i, e) {
  var t = Object.assign({}, mn, e),
    n = t.dataAttr,
    r = t.labelField,
    s = t.valueField,
    o = t.disabledField,
    a = t.optgroupField,
    l = t.optgroupLabelField,
    c = t.optgroupValueField,
    d = i.tagName.toLowerCase(),
    p = i.getAttribute("placeholder") || i.getAttribute("data-placeholder");
  if (!p && !t.allowEmptyOption) {
    let _ = i.querySelector('option[value=""]');
    _ && (p = _.textContent);
  }
  var h = {
      placeholder: p,
      options: [],
      optgroups: [],
      items: [],
      maxItems: null
    },
    g = () => {
      var _,
        b = h.options,
        w = {},
        y = 1,
        A = (v) => {
          var x = Object.assign({}, v.dataset),
            E = n && x[n];
          return (
            typeof E == "string" &&
              E.length &&
              (x = Object.assign(x, JSON.parse(E))),
            x
          );
        },
        u = (v, x) => {
          var E = ne(v.value);
          if (E != null && !(!E && !t.allowEmptyOption)) {
            if (w.hasOwnProperty(E)) {
              if (x) {
                var L = w[E][a];
                L
                  ? Array.isArray(L)
                    ? L.push(x)
                    : (w[E][a] = [L, x])
                  : (w[E][a] = x);
              }
            } else {
              var C = A(v);
              (C[r] = C[r] || v.textContent),
                (C[s] = C[s] || E),
                (C[o] = C[o] || v.disabled),
                (C[a] = C[a] || x),
                (C.$option = v),
                (w[E] = C),
                b.push(C);
            }
            v.selected && h.items.push(E);
          }
        },
        I = (v) => {
          var x, E;
          (E = A(v)),
            (E[l] = E[l] || v.getAttribute("label") || ""),
            (E[c] = E[c] || y++),
            (E[o] = E[o] || v.disabled),
            h.optgroups.push(E),
            (x = E[c]),
            Ke(v.children, (L) => {
              u(L, x);
            });
        };
      (h.maxItems = i.hasAttribute("multiple") ? null : 1),
        Ke(i.children, (v) => {
          (_ = v.tagName.toLowerCase()),
            _ === "optgroup" ? I(v) : _ === "option" && u(v);
        });
    },
    m = () => {
      const _ = i.getAttribute(n);
      if (_)
        (h.options = JSON.parse(_)),
          Ke(h.options, (w) => {
            h.items.push(w[s]);
          });
      else {
        var b = i.value.trim() || "";
        if (!t.allowEmptyOption && !b.length) return;
        const w = b.split(t.delimiter);
        Ke(w, (y) => {
          const A = {};
          (A[r] = y), (A[s] = y), h.options.push(A);
        }),
          (h.items = w);
      }
    };
  return d === "select" ? g() : m(), Object.assign({}, mn, h, e);
}
var bn = 0;
class X extends Cc(Ac) {
  constructor(e, t) {
    super(),
      (this.control_input = void 0),
      (this.wrapper = void 0),
      (this.dropdown = void 0),
      (this.control = void 0),
      (this.dropdown_content = void 0),
      (this.focus_node = void 0),
      (this.order = 0),
      (this.settings = void 0),
      (this.input = void 0),
      (this.tabIndex = void 0),
      (this.is_select_tag = void 0),
      (this.rtl = void 0),
      (this.inputId = void 0),
      (this._destroy = void 0),
      (this.sifter = void 0),
      (this.isOpen = !1),
      (this.isDisabled = !1),
      (this.isRequired = void 0),
      (this.isInvalid = !1),
      (this.isValid = !0),
      (this.isLocked = !1),
      (this.isFocused = !1),
      (this.isInputHidden = !1),
      (this.isSetup = !1),
      (this.ignoreFocus = !1),
      (this.ignoreHover = !1),
      (this.hasOptions = !1),
      (this.currentResults = void 0),
      (this.lastValue = ""),
      (this.caretPos = 0),
      (this.loading = 0),
      (this.loadedSearches = {}),
      (this.activeOption = null),
      (this.activeItems = []),
      (this.optgroups = {}),
      (this.options = {}),
      (this.userOptions = {}),
      (this.items = []),
      bn++;
    var n,
      r = N(e);
    if (r.tomselect)
      throw new Error("Tom Select already initialized on this element");
    r.tomselect = this;
    var s = window.getComputedStyle && window.getComputedStyle(r, null);
    n = s.getPropertyValue("direction");
    const o = _n(r, t);
    (this.settings = o),
      (this.input = r),
      (this.tabIndex = r.tabIndex || 0),
      (this.is_select_tag = r.tagName.toLowerCase() === "select"),
      (this.rtl = /rtl/i.test(n)),
      (this.inputId = ci(r, "tomselect-" + bn)),
      (this.isRequired = r.required),
      (this.sifter = new Yc(this.options, { diacritics: o.diacritics })),
      (o.mode = o.mode || (o.maxItems === 1 ? "single" : "multi")),
      typeof o.hideSelected != "boolean" &&
        (o.hideSelected = o.mode === "multi"),
      typeof o.hidePlaceholder != "boolean" &&
        (o.hidePlaceholder = o.mode !== "multi");
    var a = o.createFilter;
    typeof a != "function" &&
      (typeof a == "string" && (a = new RegExp(a)),
      a instanceof RegExp
        ? (o.createFilter = (b) => a.test(b))
        : (o.createFilter = (b) =>
            this.settings.duplicates || !this.options[b])),
      this.initializePlugins(o.plugins),
      this.setupCallbacks(),
      this.setupTemplates();
    const l = N("<div>"),
      c = N("<div>"),
      d = this._render("dropdown"),
      p = N('<div role="listbox" tabindex="-1">'),
      h = this.input.getAttribute("class") || "",
      g = o.mode;
    var m;
    if (
      (U(l, o.wrapperClass, h, g),
      U(c, o.controlClass),
      De(l, c),
      U(d, o.dropdownClass, g),
      o.copyClassesToDropdown && U(d, h),
      U(p, o.dropdownContentClass),
      De(d, p),
      N(o.dropdownParent || l).appendChild(d),
      vr(o.controlInput))
    ) {
      m = N(o.controlInput);
      var _ = ["autocorrect", "autocapitalize", "autocomplete"];
      Y(_, (b) => {
        r.getAttribute(b) && H(m, { [b]: r.getAttribute(b) });
      }),
        (m.tabIndex = -1),
        c.appendChild(m),
        (this.focus_node = m);
    } else
      o.controlInput
        ? ((m = N(o.controlInput)), (this.focus_node = m))
        : ((m = N("<input/>")), (this.focus_node = c));
    (this.wrapper = l),
      (this.dropdown = d),
      (this.dropdown_content = p),
      (this.control = c),
      (this.control_input = m),
      this.setup();
  }
  setup() {
    const e = this,
      t = e.settings,
      n = e.control_input,
      r = e.dropdown,
      s = e.dropdown_content,
      o = e.wrapper,
      a = e.control,
      l = e.input,
      c = e.focus_node,
      d = { passive: !0 },
      p = e.inputId + "-ts-dropdown";
    H(s, { id: p }),
      H(c, {
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": "false",
        "aria-controls": p
      });
    const h = ci(c, e.inputId + "-ts-control"),
      g = "label[for='" + Xc(e.inputId) + "']",
      m = document.querySelector(g),
      _ = e.focus.bind(e);
    if (m) {
      F(m, "click", _), H(m, { for: h });
      const y = ci(m, e.inputId + "-ts-label");
      H(c, { "aria-labelledby": y }), H(s, { "aria-labelledby": y });
    }
    if (((o.style.width = l.style.width), e.plugins.names.length)) {
      const y = "plugin-" + e.plugins.names.join(" plugin-");
      U([o, r], y);
    }
    (t.maxItems === null || t.maxItems > 1) &&
      e.is_select_tag &&
      H(l, { multiple: "multiple" }),
      t.placeholder && H(n, { placeholder: t.placeholder }),
      !t.splitOn &&
        t.delimiter &&
        (t.splitOn = new RegExp("\\s*" + ht(t.delimiter) + "+\\s*")),
      t.load && t.loadThrottle && (t.load = rd(t.load, t.loadThrottle)),
      (e.control_input.type = l.type),
      F(r, "mousemove", () => {
        e.ignoreHover = !1;
      }),
      F(
        r,
        "mouseenter",
        (y) => {
          var A = Pt(y.target, "[data-selectable]", r);
          A && e.onOptionHover(y, A);
        },
        { capture: !0 }
      ),
      F(r, "click", (y) => {
        const A = Pt(y.target, "[data-selectable]");
        A && (e.onOptionSelect(y, A), z(y, !0));
      }),
      F(a, "click", (y) => {
        var A = Pt(y.target, "[data-ts-item]", a);
        if (A && e.onItemSelect(y, A)) {
          z(y, !0);
          return;
        }
        n.value == "" && (e.onClick(), z(y, !0));
      }),
      F(c, "keydown", (y) => e.onKeyDown(y)),
      F(n, "keypress", (y) => e.onKeyPress(y)),
      F(n, "input", (y) => e.onInput(y)),
      F(c, "blur", (y) => e.onBlur(y)),
      F(c, "focus", (y) => e.onFocus(y)),
      F(n, "paste", (y) => e.onPaste(y));
    const b = (y) => {
        const A = y.composedPath()[0];
        if (!o.contains(A) && !r.contains(A)) {
          e.isFocused && e.blur(), e.inputState();
          return;
        }
        A == n && e.isOpen ? y.stopPropagation() : z(y, !0);
      },
      w = () => {
        e.isOpen && e.positionDropdown();
      };
    F(document, "mousedown", b),
      F(window, "scroll", w, d),
      F(window, "resize", w, d),
      (this._destroy = () => {
        document.removeEventListener("mousedown", b),
          window.removeEventListener("scroll", w),
          window.removeEventListener("resize", w),
          m && m.removeEventListener("click", _);
      }),
      (this.revertSettings = { innerHTML: l.innerHTML, tabIndex: l.tabIndex }),
      (l.tabIndex = -1),
      l.insertAdjacentElement("afterend", e.wrapper),
      e.sync(!1),
      (t.items = []),
      delete t.optgroups,
      delete t.options,
      F(l, "invalid", () => {
        e.isValid && ((e.isValid = !1), (e.isInvalid = !0), e.refreshState());
      }),
      e.updateOriginalInput(),
      e.refreshItems(),
      e.close(!1),
      e.inputState(),
      (e.isSetup = !0),
      l.disabled ? e.disable() : e.enable(),
      e.on("change", this.onChange),
      U(l, "tomselected", "ts-hidden-accessible"),
      e.trigger("initialize"),
      t.preload === !0 && e.preload();
  }
  setupOptions(e = [], t = []) {
    this.addOptions(e),
      Y(t, (n) => {
        this.registerOptionGroup(n);
      });
  }
  setupTemplates() {
    var e = this,
      t = e.settings.labelField,
      n = e.settings.optgroupLabelField,
      r = {
        optgroup: (s) => {
          let o = document.createElement("div");
          return (o.className = "optgroup"), o.appendChild(s.options), o;
        },
        optgroup_header: (s, o) =>
          '<div class="optgroup-header">' + o(s[n]) + "</div>",
        option: (s, o) => "<div>" + o(s[t]) + "</div>",
        item: (s, o) => "<div>" + o(s[t]) + "</div>",
        option_create: (s, o) =>
          '<div class="create">Add <strong>' +
          o(s.input) +
          "</strong>&hellip;</div>",
        no_results: () => '<div class="no-results">No results found</div>',
        loading: () => '<div class="spinner"></div>',
        not_loading: () => {},
        dropdown: () => "<div></div>"
      };
    e.settings.render = Object.assign({}, r, e.settings.render);
  }
  setupCallbacks() {
    var e,
      t,
      n = {
        initialize: "onInitialize",
        change: "onChange",
        item_add: "onItemAdd",
        item_remove: "onItemRemove",
        item_select: "onItemSelect",
        clear: "onClear",
        option_add: "onOptionAdd",
        option_remove: "onOptionRemove",
        option_clear: "onOptionClear",
        optgroup_add: "onOptionGroupAdd",
        optgroup_remove: "onOptionGroupRemove",
        optgroup_clear: "onOptionGroupClear",
        dropdown_open: "onDropdownOpen",
        dropdown_close: "onDropdownClose",
        type: "onType",
        load: "onLoad",
        focus: "onFocus",
        blur: "onBlur"
      };
    for (e in n) (t = this.settings[n[e]]), t && this.on(e, t);
  }
  sync(e = !0) {
    const t = this,
      n = e ? _n(t.input, { delimiter: t.settings.delimiter }) : t.settings;
    t.setupOptions(n.options, n.optgroups),
      t.setValue(n.items || [], !0),
      (t.lastQuery = null);
  }
  onClick() {
    var e = this;
    if (e.activeItems.length > 0) {
      e.clearActiveItems(), e.focus();
      return;
    }
    e.isFocused && e.isOpen ? e.blur() : e.focus();
  }
  onMouseDown() {}
  onChange() {
    li(this.input, "input"), li(this.input, "change");
  }
  onPaste(e) {
    var t = this;
    if (t.isInputHidden || t.isLocked) {
      z(e);
      return;
    }
    t.settings.splitOn &&
      setTimeout(() => {
        var n = t.inputValue();
        if (n.match(t.settings.splitOn)) {
          var r = n.trim().split(t.settings.splitOn);
          Y(r, (s) => {
            ne(s) && (this.options[s] ? t.addItem(s) : t.createItem(s));
          });
        }
      }, 0);
  }
  onKeyPress(e) {
    var t = this;
    if (t.isLocked) {
      z(e);
      return;
    }
    var n = String.fromCharCode(e.keyCode || e.which);
    if (
      t.settings.create &&
      t.settings.mode === "multi" &&
      n === t.settings.delimiter
    ) {
      t.createItem(), z(e);
      return;
    }
  }
  onKeyDown(e) {
    var t = this;
    if (((t.ignoreHover = !0), t.isLocked)) {
      e.keyCode !== Oi && z(e);
      return;
    }
    switch (e.keyCode) {
      case Jc:
        if (Me(Lt, e) && t.control_input.value == "") {
          z(e), t.selectAll();
          return;
        }
        break;
      case yr:
        t.isOpen && (z(e, !0), t.close()), t.clearActiveItems();
        return;
      case td:
        if (!t.isOpen && t.hasOptions) t.open();
        else if (t.activeOption) {
          let n = t.getAdjacent(t.activeOption, 1);
          n && t.setActiveOption(n);
        }
        z(e);
        return;
      case ed:
        if (t.activeOption) {
          let n = t.getAdjacent(t.activeOption, -1);
          n && t.setActiveOption(n);
        }
        z(e);
        return;
      case Zc:
        t.canSelect(t.activeOption)
          ? (t.onOptionSelect(e, t.activeOption), z(e))
          : ((t.settings.create && t.createItem()) ||
              (document.activeElement == t.control_input && t.isOpen)) &&
            z(e);
        return;
      case Ei:
        t.advanceSelection(-1, e);
        return;
      case _r:
        t.advanceSelection(1, e);
        return;
      case Oi:
        t.settings.selectOnTab &&
          (t.canSelect(t.activeOption) &&
            (t.onOptionSelect(e, t.activeOption), z(e)),
          t.settings.create && t.createItem() && z(e));
        return;
      case vn:
      case id:
        t.deleteSelection(e);
        return;
    }
    t.isInputHidden && !Me(Lt, e) && z(e);
  }
  onInput(e) {
    var t = this;
    if (!t.isLocked) {
      var n = t.inputValue();
      t.lastValue !== n &&
        ((t.lastValue = n),
        t.settings.shouldLoad.call(t, n) && t.load(n),
        t.refreshOptions(),
        t.trigger("type", n));
    }
  }
  onOptionHover(e, t) {
    this.ignoreHover || this.setActiveOption(t, !1);
  }
  onFocus(e) {
    var t = this,
      n = t.isFocused;
    if (t.isDisabled) {
      t.blur(), z(e);
      return;
    }
    t.ignoreFocus ||
      ((t.isFocused = !0),
      t.settings.preload === "focus" && t.preload(),
      n || t.trigger("focus"),
      t.activeItems.length ||
        (t.showInput(), t.refreshOptions(!!t.settings.openOnFocus)),
      t.refreshState());
  }
  onBlur(e) {
    if (document.hasFocus() !== !1) {
      var t = this;
      if (t.isFocused) {
        (t.isFocused = !1), (t.ignoreFocus = !1);
        var n = () => {
          t.close(),
            t.setActiveItem(),
            t.setCaret(t.items.length),
            t.trigger("blur");
        };
        t.settings.create && t.settings.createOnBlur
          ? t.createItem(null, n)
          : n();
      }
    }
  }
  onOptionSelect(e, t) {
    var n,
      r = this;
    (t.parentElement && t.parentElement.matches("[data-disabled]")) ||
      (t.classList.contains("create")
        ? r.createItem(null, () => {
            r.settings.closeAfterSelect && r.close();
          })
        : ((n = t.dataset.value),
          typeof n < "u" &&
            ((r.lastQuery = null),
            r.addItem(n),
            r.settings.closeAfterSelect && r.close(),
            !r.settings.hideSelected &&
              e.type &&
              /click/.test(e.type) &&
              r.setActiveOption(t))));
  }
  canSelect(e) {
    return !!(this.isOpen && e && this.dropdown_content.contains(e));
  }
  onItemSelect(e, t) {
    var n = this;
    return !n.isLocked && n.settings.mode === "multi"
      ? (z(e), n.setActiveItem(t, e), !0)
      : !1;
  }
  canLoad(e) {
    return !(!this.settings.load || this.loadedSearches.hasOwnProperty(e));
  }
  load(e) {
    const t = this;
    if (!t.canLoad(e)) return;
    U(t.wrapper, t.settings.loadingClass), t.loading++;
    const n = t.loadCallback.bind(t);
    t.settings.load.call(t, e, n);
  }
  loadCallback(e, t) {
    const n = this;
    (n.loading = Math.max(n.loading - 1, 0)),
      (n.lastQuery = null),
      n.clearActiveOption(),
      n.setupOptions(e, t),
      n.refreshOptions(n.isFocused && !n.isInputHidden),
      n.loading || _e(n.wrapper, n.settings.loadingClass),
      n.trigger("load", e, t);
  }
  preload() {
    var e = this.wrapper.classList;
    e.contains("preloaded") || (e.add("preloaded"), this.load(""));
  }
  setTextboxValue(e = "") {
    var t = this.control_input,
      n = t.value !== e;
    n && ((t.value = e), li(t, "update"), (this.lastValue = e));
  }
  getValue() {
    return this.is_select_tag && this.input.hasAttribute("multiple")
      ? this.items
      : this.items.join(this.settings.delimiter);
  }
  setValue(e, t) {
    var n = t ? [] : ["change"];
    gn(this, n, () => {
      this.clear(t), this.addItems(e, t);
    });
  }
  setMaxItems(e) {
    e === 0 && (e = null), (this.settings.maxItems = e), this.refreshState();
  }
  setActiveItem(e, t) {
    var n = this,
      r,
      s,
      o,
      a,
      l,
      c;
    if (n.settings.mode !== "single") {
      if (!e) {
        n.clearActiveItems(), n.isFocused && n.showInput();
        return;
      }
      if (
        ((r = t && t.type.toLowerCase()),
        r === "click" && Me("shiftKey", t) && n.activeItems.length)
      ) {
        for (
          c = n.getLastActive(),
            o = Array.prototype.indexOf.call(n.control.children, c),
            a = Array.prototype.indexOf.call(n.control.children, e),
            o > a && ((l = o), (o = a), (a = l)),
            s = o;
          s <= a;
          s++
        )
          (e = n.control.children[s]),
            n.activeItems.indexOf(e) === -1 && n.setActiveItemClass(e);
        z(t);
      } else
        (r === "click" && Me(Lt, t)) || (r === "keydown" && Me("shiftKey", t))
          ? e.classList.contains("active")
            ? n.removeActiveItem(e)
            : n.setActiveItemClass(e)
          : (n.clearActiveItems(), n.setActiveItemClass(e));
      n.hideInput(), n.isFocused || n.focus();
    }
  }
  setActiveItemClass(e) {
    const t = this,
      n = t.control.querySelector(".last-active");
    n && _e(n, "last-active"),
      U(e, "active last-active"),
      t.trigger("item_select", e),
      t.activeItems.indexOf(e) == -1 && t.activeItems.push(e);
  }
  removeActiveItem(e) {
    var t = this.activeItems.indexOf(e);
    this.activeItems.splice(t, 1), _e(e, "active");
  }
  clearActiveItems() {
    _e(this.activeItems, "active"), (this.activeItems = []);
  }
  setActiveOption(e, t = !0) {
    e !== this.activeOption &&
      (this.clearActiveOption(),
      e &&
        ((this.activeOption = e),
        H(this.focus_node, { "aria-activedescendant": e.getAttribute("id") }),
        H(e, { "aria-selected": "true" }),
        U(e, "active"),
        t && this.scrollToOption(e)));
  }
  scrollToOption(e, t) {
    if (!e) return;
    const n = this.dropdown_content,
      r = n.clientHeight,
      s = n.scrollTop || 0,
      o = e.offsetHeight,
      a = e.getBoundingClientRect().top - n.getBoundingClientRect().top + s;
    a + o > r + s ? this.scroll(a - r + o, t) : a < s && this.scroll(a, t);
  }
  scroll(e, t) {
    const n = this.dropdown_content;
    t && (n.style.scrollBehavior = t),
      (n.scrollTop = e),
      (n.style.scrollBehavior = "");
  }
  clearActiveOption() {
    this.activeOption &&
      (_e(this.activeOption, "active"),
      H(this.activeOption, { "aria-selected": null })),
      (this.activeOption = null),
      H(this.focus_node, { "aria-activedescendant": null });
  }
  selectAll() {
    const e = this;
    if (e.settings.mode === "single") return;
    const t = e.controlChildren();
    t.length &&
      (e.hideInput(),
      e.close(),
      (e.activeItems = t),
      Y(t, (n) => {
        e.setActiveItemClass(n);
      }));
  }
  inputState() {
    var e = this;
    e.control.contains(e.control_input) &&
      (H(e.control_input, { placeholder: e.settings.placeholder }),
      e.activeItems.length > 0 ||
      (!e.isFocused && e.settings.hidePlaceholder && e.items.length > 0)
        ? (e.setTextboxValue(), (e.isInputHidden = !0))
        : (e.settings.hidePlaceholder &&
            e.items.length > 0 &&
            H(e.control_input, { placeholder: "" }),
          (e.isInputHidden = !1)),
      e.wrapper.classList.toggle("input-hidden", e.isInputHidden));
  }
  hideInput() {
    this.inputState();
  }
  showInput() {
    this.inputState();
  }
  inputValue() {
    return this.control_input.value.trim();
  }
  focus() {
    var e = this;
    e.isDisabled ||
      ((e.ignoreFocus = !0),
      e.control_input.offsetWidth
        ? e.control_input.focus()
        : e.focus_node.focus(),
      setTimeout(() => {
        (e.ignoreFocus = !1), e.onFocus();
      }, 0));
  }
  blur() {
    this.focus_node.blur(), this.onBlur();
  }
  getScoreFunction(e) {
    return this.sifter.getScoreFunction(e, this.getSearchOptions());
  }
  getSearchOptions() {
    var e = this.settings,
      t = e.sortField;
    return (
      typeof e.sortField == "string" && (t = [{ field: e.sortField }]),
      {
        fields: e.searchField,
        conjunction: e.searchConjunction,
        sort: t,
        nesting: e.nesting
      }
    );
  }
  search(e) {
    var t,
      n,
      r = this,
      s = this.getSearchOptions();
    if (
      r.settings.score &&
      ((n = r.settings.score.call(r, e)), typeof n != "function")
    )
      throw new Error(
        'Tom Select "score" setting must be a function that returns a function'
      );
    return (
      e !== r.lastQuery
        ? ((r.lastQuery = e),
          (t = r.sifter.search(e, Object.assign(s, { score: n }))),
          (r.currentResults = t))
        : (t = Object.assign({}, r.currentResults)),
      r.settings.hideSelected &&
        (t.items = t.items.filter((o) => {
          let a = ne(o.id);
          return !(a && r.items.indexOf(a) !== -1);
        })),
      t
    );
  }
  refreshOptions(e = !0) {
    var t, n, r, s, o, a, l, c, d, p;
    const h = {},
      g = [];
    var m = this,
      _ = m.inputValue();
    const b = _ === m.lastQuery || (_ == "" && m.lastQuery == null);
    var w = m.search(_),
      y = null,
      A = m.settings.shouldOpen || !1,
      u = m.dropdown_content;
    for (
      b && ((y = m.activeOption), y && (d = y.closest("[data-group]"))),
        s = w.items.length,
        typeof m.settings.maxOptions == "number" &&
          (s = Math.min(s, m.settings.maxOptions)),
        s > 0 && (A = !0),
        t = 0;
      t < s;
      t++
    ) {
      let v = w.items[t];
      if (!v) continue;
      let x = v.id,
        E = m.options[x];
      if (E === void 0) continue;
      let L = Ht(x),
        C = m.getOption(L, !0);
      for (
        m.settings.hideSelected ||
          C.classList.toggle("selected", m.items.includes(L)),
          o = E[m.settings.optgroupField] || "",
          a = Array.isArray(o) ? o : [o],
          n = 0,
          r = a && a.length;
        n < r;
        n++
      ) {
        (o = a[n]), m.optgroups.hasOwnProperty(o) || (o = "");
        let D = h[o];
        D === void 0 && ((D = document.createDocumentFragment()), g.push(o)),
          n > 0 &&
            ((C = C.cloneNode(!0)),
            H(C, { id: E.$id + "-clone-" + n, "aria-selected": null }),
            C.classList.add("ts-cloned"),
            _e(C, "active"),
            m.activeOption &&
              m.activeOption.dataset.value == x &&
              d &&
              d.dataset.group === o.toString() &&
              (y = C)),
          D.appendChild(C),
          (h[o] = D);
      }
    }
    m.settings.lockOptgroupOrder &&
      g.sort((v, x) => {
        const E = m.optgroups[v],
          L = m.optgroups[x],
          C = (E && E.$order) || 0,
          D = (L && L.$order) || 0;
        return C - D;
      }),
      (l = document.createDocumentFragment()),
      Y(g, (v) => {
        let x = h[v];
        if (!x || !x.children.length) return;
        let E = m.optgroups[v];
        if (E !== void 0) {
          let L = document.createDocumentFragment(),
            C = m.render("optgroup_header", E);
          De(L, C), De(L, x);
          let D = m.render("optgroup", { group: E, options: L });
          De(l, D);
        } else De(l, x);
      }),
      (u.innerHTML = ""),
      De(u, l),
      m.settings.highlight &&
        (Qc(u),
        w.query.length &&
          w.tokens.length &&
          Y(w.tokens, (v) => {
            Gc(u, v.regex);
          }));
    var I = (v) => {
      let x = m.render(v, { input: _ });
      return x && ((A = !0), u.insertBefore(x, u.firstChild)), x;
    };
    if (
      (m.loading
        ? I("loading")
        : m.settings.shouldLoad.call(m, _)
        ? w.items.length === 0 && I("no_results")
        : I("not_loading"),
      (c = m.canCreate(_)),
      c && (p = I("option_create")),
      (m.hasOptions = w.items.length > 0 || c),
      A)
    ) {
      if (w.items.length > 0) {
        if (
          (!y &&
            m.settings.mode === "single" &&
            m.items[0] != null &&
            (y = m.getOption(m.items[0])),
          !u.contains(y))
        ) {
          let v = 0;
          p && !m.settings.addPrecedence && (v = 1), (y = m.selectable()[v]);
        }
      } else p && (y = p);
      e && !m.isOpen && (m.open(), m.scrollToOption(y, "auto")),
        m.setActiveOption(y);
    } else m.clearActiveOption(), e && m.isOpen && m.close(!1);
  }
  selectable() {
    return this.dropdown_content.querySelectorAll("[data-selectable]");
  }
  addOption(e, t = !1) {
    const n = this;
    if (Array.isArray(e)) return n.addOptions(e, t), !1;
    const r = ne(e[n.settings.valueField]);
    return r === null || n.options.hasOwnProperty(r)
      ? !1
      : ((e.$order = e.$order || ++n.order),
        (e.$id = n.inputId + "-opt-" + e.$order),
        (n.options[r] = e),
        (n.lastQuery = null),
        t && ((n.userOptions[r] = t), n.trigger("option_add", r, e)),
        r);
  }
  addOptions(e, t = !1) {
    Y(e, (n) => {
      this.addOption(n, t);
    });
  }
  registerOption(e) {
    return this.addOption(e);
  }
  registerOptionGroup(e) {
    var t = ne(e[this.settings.optgroupValueField]);
    return t === null
      ? !1
      : ((e.$order = e.$order || ++this.order), (this.optgroups[t] = e), t);
  }
  addOptionGroup(e, t) {
    var n;
    (t[this.settings.optgroupValueField] = e),
      (n = this.registerOptionGroup(t)) && this.trigger("optgroup_add", n, t);
  }
  removeOptionGroup(e) {
    this.optgroups.hasOwnProperty(e) &&
      (delete this.optgroups[e],
      this.clearCache(),
      this.trigger("optgroup_remove", e));
  }
  clearOptionGroups() {
    (this.optgroups = {}), this.clearCache(), this.trigger("optgroup_clear");
  }
  updateOption(e, t) {
    const n = this;
    var r, s;
    const o = ne(e),
      a = ne(t[n.settings.valueField]);
    if (o === null) return;
    const l = n.options[o];
    if (l == null) return;
    if (typeof a != "string")
      throw new Error("Value must be set in option data");
    const c = n.getOption(o),
      d = n.getItem(o);
    if (
      ((t.$order = t.$order || l.$order),
      delete n.options[o],
      n.uncacheValue(a),
      (n.options[a] = t),
      c)
    ) {
      if (n.dropdown_content.contains(c)) {
        const p = n._render("option", t);
        xi(c, p), n.activeOption === c && n.setActiveOption(p);
      }
      c.remove();
    }
    d &&
      ((s = n.items.indexOf(o)),
      s !== -1 && n.items.splice(s, 1, a),
      (r = n._render("item", t)),
      d.classList.contains("active") && U(r, "active"),
      xi(d, r)),
      (n.lastQuery = null);
  }
  removeOption(e, t) {
    const n = this;
    (e = Ht(e)),
      n.uncacheValue(e),
      delete n.userOptions[e],
      delete n.options[e],
      (n.lastQuery = null),
      n.trigger("option_remove", e),
      n.removeItem(e, t);
  }
  clearOptions(e) {
    const t = (e || this.clearFilter).bind(this);
    (this.loadedSearches = {}), (this.userOptions = {}), this.clearCache();
    const n = {};
    Y(this.options, (r, s) => {
      t(r, s) && (n[s] = r);
    }),
      (this.options = this.sifter.items = n),
      (this.lastQuery = null),
      this.trigger("option_clear");
  }
  clearFilter(e, t) {
    return this.items.indexOf(t) >= 0;
  }
  getOption(e, t = !1) {
    const n = ne(e);
    if (n === null) return null;
    const r = this.options[n];
    if (r != null) {
      if (r.$div) return r.$div;
      if (t) return this._render("option", r);
    }
    return null;
  }
  getAdjacent(e, t, n = "option") {
    var r = this,
      s;
    if (!e) return null;
    n == "item"
      ? (s = r.controlChildren())
      : (s = r.dropdown_content.querySelectorAll("[data-selectable]"));
    for (let o = 0; o < s.length; o++)
      if (s[o] == e) return t > 0 ? s[o + 1] : s[o - 1];
    return null;
  }
  getItem(e) {
    if (typeof e == "object") return e;
    var t = ne(e);
    return t !== null
      ? this.control.querySelector(`[data-value="${yn(t)}"]`)
      : null;
  }
  addItems(e, t) {
    var n = this,
      r = Array.isArray(e) ? e : [e];
    r = r.filter((o) => n.items.indexOf(o) === -1);
    const s = r[r.length - 1];
    r.forEach((o) => {
      (n.isPending = o !== s), n.addItem(o, t);
    });
  }
  addItem(e, t) {
    var n = t ? [] : ["change", "dropdown_close"];
    gn(this, n, () => {
      var r, s;
      const o = this,
        a = o.settings.mode,
        l = ne(e);
      if (
        !(
          l &&
          o.items.indexOf(l) !== -1 &&
          (a === "single" && o.close(),
          a === "single" || !o.settings.duplicates)
        ) &&
        !(l === null || !o.options.hasOwnProperty(l)) &&
        (a === "single" && o.clear(t), !(a === "multi" && o.isFull()))
      ) {
        if (
          ((r = o._render("item", o.options[l])),
          o.control.contains(r) && (r = r.cloneNode(!0)),
          (s = o.isFull()),
          o.items.splice(o.caretPos, 0, l),
          o.insertAtCaret(r),
          o.isSetup)
        ) {
          if (!o.isPending && o.settings.hideSelected) {
            let c = o.getOption(l),
              d = o.getAdjacent(c, 1);
            d && o.setActiveOption(d);
          }
          !o.isPending &&
            !o.settings.closeAfterSelect &&
            o.refreshOptions(o.isFocused && a !== "single"),
            o.settings.closeAfterSelect != !1 && o.isFull()
              ? o.close()
              : o.isPending || o.positionDropdown(),
            o.trigger("item_add", l, r),
            o.isPending || o.updateOriginalInput({ silent: t });
        }
        (!o.isPending || (!s && o.isFull())) &&
          (o.inputState(), o.refreshState());
      }
    });
  }
  removeItem(e = null, t) {
    const n = this;
    if (((e = n.getItem(e)), !e)) return;
    var r, s;
    const o = e.dataset.value;
    (r = Ut(e)),
      e.remove(),
      e.classList.contains("active") &&
        ((s = n.activeItems.indexOf(e)),
        n.activeItems.splice(s, 1),
        _e(e, "active")),
      n.items.splice(r, 1),
      (n.lastQuery = null),
      !n.settings.persist &&
        n.userOptions.hasOwnProperty(o) &&
        n.removeOption(o, t),
      r < n.caretPos && n.setCaret(n.caretPos - 1),
      n.updateOriginalInput({ silent: t }),
      n.refreshState(),
      n.positionDropdown(),
      n.trigger("item_remove", o, e);
  }
  createItem(e = null, t = () => {}) {
    arguments.length === 3 && (t = arguments[2]),
      typeof t != "function" && (t = () => {});
    var n = this,
      r = n.caretPos,
      s;
    if (((e = e || n.inputValue()), !n.canCreate(e))) return t(), !1;
    n.lock();
    var o = !1,
      a = (l) => {
        if ((n.unlock(), !l || typeof l != "object")) return t();
        var c = ne(l[n.settings.valueField]);
        if (typeof c != "string") return t();
        n.setTextboxValue(),
          n.addOption(l, !0),
          n.setCaret(r),
          n.addItem(c),
          t(l),
          (o = !0);
      };
    return (
      typeof n.settings.create == "function"
        ? (s = n.settings.create.call(this, e, a))
        : (s = { [n.settings.labelField]: e, [n.settings.valueField]: e }),
      o || a(s),
      !0
    );
  }
  refreshItems() {
    var e = this;
    (e.lastQuery = null),
      e.isSetup && e.addItems(e.items),
      e.updateOriginalInput(),
      e.refreshState();
  }
  refreshState() {
    const e = this;
    e.refreshValidityState();
    const t = e.isFull(),
      n = e.isLocked;
    e.wrapper.classList.toggle("rtl", e.rtl);
    const r = e.wrapper.classList;
    r.toggle("focus", e.isFocused),
      r.toggle("disabled", e.isDisabled),
      r.toggle("required", e.isRequired),
      r.toggle("invalid", !e.isValid),
      r.toggle("locked", n),
      r.toggle("full", t),
      r.toggle("input-active", e.isFocused && !e.isInputHidden),
      r.toggle("dropdown-active", e.isOpen),
      r.toggle("has-options", Kc(e.options)),
      r.toggle("has-items", e.items.length > 0);
  }
  refreshValidityState() {
    var e = this;
    e.input.validity &&
      ((e.isValid = e.input.validity.valid), (e.isInvalid = !e.isValid));
  }
  isFull() {
    return (
      this.settings.maxItems !== null &&
      this.items.length >= this.settings.maxItems
    );
  }
  updateOriginalInput(e = {}) {
    const t = this;
    var n, r;
    const s = t.input.querySelector('option[value=""]');
    if (t.is_select_tag) {
      let l = function (c, d, p) {
        return (
          c || (c = N('<option value="' + $t(d) + '">' + $t(p) + "</option>")),
          c != s && t.input.append(c),
          o.push(c),
          (c != s || a > 0) && (c.selected = !0),
          c
        );
      };
      const o = [],
        a = t.input.querySelectorAll("option:checked").length;
      t.input.querySelectorAll("option:checked").forEach((c) => {
        c.selected = !1;
      }),
        t.items.length == 0 && t.settings.mode == "single"
          ? l(s, "", "")
          : t.items.forEach((c) => {
              if (
                ((n = t.options[c]),
                (r = n[t.settings.labelField] || ""),
                o.includes(n.$option))
              ) {
                const d = t.input.querySelector(
                  `option[value="${yn(c)}"]:not(:checked)`
                );
                l(d, c, r);
              } else n.$option = l(n.$option, c, r);
            });
    } else t.input.value = t.getValue();
    t.isSetup && (e.silent || t.trigger("change", t.getValue()));
  }
  open() {
    var e = this;
    e.isLocked ||
      e.isOpen ||
      (e.settings.mode === "multi" && e.isFull()) ||
      ((e.isOpen = !0),
      H(e.focus_node, { "aria-expanded": "true" }),
      e.refreshState(),
      It(e.dropdown, { visibility: "hidden", display: "block" }),
      e.positionDropdown(),
      It(e.dropdown, { visibility: "visible", display: "block" }),
      e.focus(),
      e.trigger("dropdown_open", e.dropdown));
  }
  close(e = !0) {
    var t = this,
      n = t.isOpen;
    e &&
      (t.setTextboxValue(),
      t.settings.mode === "single" && t.items.length && t.hideInput()),
      (t.isOpen = !1),
      H(t.focus_node, { "aria-expanded": "false" }),
      It(t.dropdown, { display: "none" }),
      t.settings.hideSelected && t.clearActiveOption(),
      t.refreshState(),
      n && t.trigger("dropdown_close", t.dropdown);
  }
  positionDropdown() {
    if (this.settings.dropdownParent === "body") {
      var e = this.control,
        t = e.getBoundingClientRect(),
        n = e.offsetHeight + t.top + window.scrollY,
        r = t.left + window.scrollX;
      It(this.dropdown, {
        width: t.width + "px",
        top: n + "px",
        left: r + "px"
      });
    }
  }
  clear(e) {
    var t = this;
    if (t.items.length) {
      var n = t.controlChildren();
      Y(n, (r) => {
        t.removeItem(r, !0);
      }),
        t.showInput(),
        e || t.updateOriginalInput(),
        t.trigger("clear");
    }
  }
  insertAtCaret(e) {
    const t = this,
      n = t.caretPos,
      r = t.control;
    r.insertBefore(e, r.children[n] || null), t.setCaret(n + 1);
  }
  deleteSelection(e) {
    var t,
      n,
      r,
      s,
      o = this;
    (t = e && e.keyCode === vn ? -1 : 1), (n = sd(o.control_input));
    const a = [];
    if (o.activeItems.length)
      (s = fn(o.activeItems, t)),
        (r = Ut(s)),
        t > 0 && r++,
        Y(o.activeItems, (l) => a.push(l));
    else if ((o.isFocused || o.settings.mode === "single") && o.items.length) {
      const l = o.controlChildren();
      let c;
      t < 0 && n.start === 0 && n.length === 0
        ? (c = l[o.caretPos - 1])
        : t > 0 && n.start === o.inputValue().length && (c = l[o.caretPos]),
        c !== void 0 && a.push(c);
    }
    if (!o.shouldDelete(a, e)) return !1;
    for (z(e, !0), typeof r < "u" && o.setCaret(r); a.length; )
      o.removeItem(a.pop());
    return o.showInput(), o.positionDropdown(), o.refreshOptions(!1), !0;
  }
  shouldDelete(e, t) {
    const n = e.map((r) => r.dataset.value);
    return !(
      !n.length ||
      (typeof this.settings.onDelete == "function" &&
        this.settings.onDelete(n, t) === !1)
    );
  }
  advanceSelection(e, t) {
    var n,
      r,
      s = this;
    s.rtl && (e *= -1),
      !s.inputValue().length &&
        (Me(Lt, t) || Me("shiftKey", t)
          ? ((n = s.getLastActive(e)),
            n
              ? n.classList.contains("active")
                ? (r = s.getAdjacent(n, e, "item"))
                : (r = n)
              : e > 0
              ? (r = s.control_input.nextElementSibling)
              : (r = s.control_input.previousElementSibling),
            r &&
              (r.classList.contains("active") && s.removeActiveItem(n),
              s.setActiveItemClass(r)))
          : s.moveCaret(e));
  }
  moveCaret(e) {}
  getLastActive(e) {
    let t = this.control.querySelector(".last-active");
    if (t) return t;
    var n = this.control.querySelectorAll(".active");
    if (n) return fn(n, e);
  }
  setCaret(e) {
    this.caretPos = this.items.length;
  }
  controlChildren() {
    return Array.from(this.control.querySelectorAll("[data-ts-item]"));
  }
  lock() {
    (this.isLocked = !0), this.refreshState();
  }
  unlock() {
    (this.isLocked = !1), this.refreshState();
  }
  disable() {
    var e = this;
    (e.input.disabled = !0),
      (e.control_input.disabled = !0),
      (e.focus_node.tabIndex = -1),
      (e.isDisabled = !0),
      this.close(),
      e.lock();
  }
  enable() {
    var e = this;
    (e.input.disabled = !1),
      (e.control_input.disabled = !1),
      (e.focus_node.tabIndex = e.tabIndex),
      (e.isDisabled = !1),
      e.unlock();
  }
  destroy() {
    var e = this,
      t = e.revertSettings;
    e.trigger("destroy"),
      e.off(),
      e.wrapper.remove(),
      e.dropdown.remove(),
      (e.input.innerHTML = t.innerHTML),
      (e.input.tabIndex = t.tabIndex),
      _e(e.input, "tomselected", "ts-hidden-accessible"),
      e._destroy(),
      delete e.input.tomselect;
  }
  render(e, t) {
    var n, r;
    const s = this;
    if (
      typeof this.settings.render[e] != "function" ||
      ((r = s.settings.render[e].call(this, t, $t)), !r)
    )
      return null;
    if (
      ((r = N(r)),
      e === "option" || e === "option_create"
        ? t[s.settings.disabledField]
          ? H(r, { "aria-disabled": "true" })
          : H(r, { "data-selectable": "" })
        : e === "optgroup" &&
          ((n = t.group[s.settings.optgroupValueField]),
          H(r, { "data-group": n }),
          t.group[s.settings.disabledField] && H(r, { "data-disabled": "" })),
      e === "option" || e === "item")
    ) {
      const o = Ht(t[s.settings.valueField]);
      H(r, { "data-value": o }),
        e === "item"
          ? (U(r, s.settings.itemClass), H(r, { "data-ts-item": "" }))
          : (U(r, s.settings.optionClass),
            H(r, { role: "option", id: t.$id }),
            (t.$div = r),
            (s.options[o] = t));
    }
    return r;
  }
  _render(e, t) {
    const n = this.render(e, t);
    if (n == null) throw "HTMLElement expected";
    return n;
  }
  clearCache() {
    Y(this.options, (e) => {
      e.$div && (e.$div.remove(), delete e.$div);
    });
  }
  uncacheValue(e) {
    const t = this.getOption(e);
    t && t.remove();
  }
  canCreate(e) {
    return (
      this.settings.create &&
      e.length > 0 &&
      this.settings.createFilter.call(this, e)
    );
  }
  hook(e, t, n) {
    var r = this,
      s = r[t];
    r[t] = function () {
      var o, a;
      return (
        e === "after" && (o = s.apply(r, arguments)),
        (a = n.apply(r, arguments)),
        e === "instead" ? a : (e === "before" && (o = s.apply(r, arguments)), o)
      );
    };
  }
}
function od() {
  F(this.input, "change", () => {
    this.sync();
  });
}
function ad() {
  var i = this,
    e = i.onOptionSelect;
  i.settings.hideSelected = !1;
  var t = function (r) {
    setTimeout(() => {
      var s = r.querySelector("input");
      s instanceof HTMLInputElement &&
        (r.classList.contains("selected")
          ? (s.checked = !0)
          : (s.checked = !1));
    }, 1);
  };
  i.hook("after", "setupTemplates", () => {
    var n = i.settings.render.option;
    i.settings.render.option = (r, s) => {
      var o = N(n.call(i, r, s)),
        a = document.createElement("input");
      a.addEventListener("click", function (c) {
        z(c);
      }),
        (a.type = "checkbox");
      const l = ne(r[i.settings.valueField]);
      return l && i.items.indexOf(l) > -1 && (a.checked = !0), o.prepend(a), o;
    };
  }),
    i.on("item_remove", (n) => {
      var r = i.getOption(n);
      r && (r.classList.remove("selected"), t(r));
    }),
    i.on("item_add", (n) => {
      var r = i.getOption(n);
      r && t(r);
    }),
    i.hook("instead", "onOptionSelect", (n, r) => {
      if (r.classList.contains("selected")) {
        r.classList.remove("selected"),
          i.removeItem(r.dataset.value),
          i.refreshOptions(),
          z(n, !0);
        return;
      }
      e.call(i, n, r), t(r);
    });
}
function ld(i) {
  const e = this,
    t = Object.assign(
      {
        className: "clear-button",
        title: "Clear All",
        html: (n) =>
          `<div class="${n.className}" title="${n.title}">&#10799;</div>`
      },
      i
    );
  e.on("initialize", () => {
    var n = N(t.html(t));
    n.addEventListener("click", (r) => {
      e.isDisabled ||
        (e.clear(),
        e.settings.mode === "single" &&
          e.settings.allowEmptyOption &&
          e.addItem(""),
        r.preventDefault(),
        r.stopPropagation());
    }),
      e.control.appendChild(n);
  });
}
function cd() {
  var i = this;
  if (!$.fn.sortable)
    throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
  if (i.settings.mode === "multi") {
    var e = i.lock,
      t = i.unlock;
    i.hook("instead", "lock", () => {
      var n = $(i.control).data("sortable");
      return n && n.disable(), e.call(i);
    }),
      i.hook("instead", "unlock", () => {
        var n = $(i.control).data("sortable");
        return n && n.enable(), t.call(i);
      }),
      i.on("initialize", () => {
        var n = $(i.control).sortable({
          items: "[data-value]",
          forcePlaceholderSize: !0,
          disabled: i.isLocked,
          start: (r, s) => {
            s.placeholder.css("width", s.helper.css("width")),
              n.css({ overflow: "visible" });
          },
          stop: () => {
            n.css({ overflow: "hidden" });
            var r = [];
            n.children("[data-value]").each(function () {
              this.dataset.value && r.push(this.dataset.value);
            }),
              i.setValue(r);
          }
        });
      });
  }
}
function dd(i) {
  const e = this,
    t = Object.assign(
      {
        title: "Untitled",
        headerClass: "dropdown-header",
        titleRowClass: "dropdown-header-title",
        labelClass: "dropdown-header-label",
        closeClass: "dropdown-header-close",
        html: (n) =>
          '<div class="' +
          n.headerClass +
          '"><div class="' +
          n.titleRowClass +
          '"><span class="' +
          n.labelClass +
          '">' +
          n.title +
          '</span><a class="' +
          n.closeClass +
          '">&times;</a></div></div>'
      },
      i
    );
  e.on("initialize", () => {
    var n = N(t.html(t)),
      r = n.querySelector("." + t.closeClass);
    r &&
      r.addEventListener("click", (s) => {
        z(s, !0), e.close();
      }),
      e.dropdown.insertBefore(n, e.dropdown.firstChild);
  });
}
function ud() {
  var i = this;
  i.hook("instead", "setCaret", (e) => {
    i.settings.mode === "single" || !i.control.contains(i.control_input)
      ? (e = i.items.length)
      : ((e = Math.max(0, Math.min(i.items.length, e))),
        e != i.caretPos &&
          !i.isPending &&
          i.controlChildren().forEach((t, n) => {
            n < e
              ? i.control_input.insertAdjacentElement("beforebegin", t)
              : i.control.appendChild(t);
          })),
      (i.caretPos = e);
  }),
    i.hook("instead", "moveCaret", (e) => {
      if (!i.isFocused) return;
      const t = i.getLastActive(e);
      if (t) {
        const n = Ut(t);
        i.setCaret(e > 0 ? n + 1 : n), i.setActiveItem(), _e(t, "last-active");
      } else i.setCaret(i.caretPos + e);
    });
}
function pd() {
  const i = this;
  (i.settings.shouldOpen = !0),
    i.hook("before", "setup", () => {
      (i.focus_node = i.control), U(i.control_input, "dropdown-input");
      const e = N('<div class="dropdown-input-wrap">');
      e.append(i.control_input),
        i.dropdown.insertBefore(e, i.dropdown.firstChild);
      const t = N('<input class="items-placeholder" tabindex="-1" />');
      (t.placeholder = i.settings.placeholder || ""), i.control.append(t);
    }),
    i.on("initialize", () => {
      i.control_input.addEventListener("keydown", (t) => {
        switch (t.keyCode) {
          case yr:
            i.isOpen && (z(t, !0), i.close()), i.clearActiveItems();
            return;
          case Oi:
            i.focus_node.tabIndex = -1;
            break;
        }
        return i.onKeyDown.call(i, t);
      }),
        i.on("blur", () => {
          i.focus_node.tabIndex = i.isDisabled ? -1 : i.tabIndex;
        }),
        i.on("dropdown_open", () => {
          i.control_input.focus();
        });
      const e = i.onBlur;
      i.hook("instead", "onBlur", (t) => {
        if (!(t && t.relatedTarget == i.control_input)) return e.call(i);
      }),
        F(i.control_input, "blur", () => i.onBlur()),
        i.hook("before", "close", () => {
          i.isOpen && i.focus_node.focus({ preventScroll: !0 });
        });
    });
}
function hd() {
  var i = this;
  i.on("initialize", () => {
    var e = document.createElement("span"),
      t = i.control_input;
    (e.style.cssText =
      "position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; "),
      i.wrapper.appendChild(e);
    var n = [
      "letterSpacing",
      "fontSize",
      "fontFamily",
      "fontWeight",
      "textTransform"
    ];
    for (const s of n) e.style[s] = t.style[s];
    var r = () => {
      (e.textContent = t.value), (t.style.width = e.clientWidth + "px");
    };
    r(),
      i.on("update item_add item_remove", r),
      F(t, "input", r),
      F(t, "keyup", r),
      F(t, "blur", r),
      F(t, "update", r);
  });
}
function fd() {
  var i = this,
    e = i.deleteSelection;
  this.hook("instead", "deleteSelection", (t) =>
    i.activeItems.length ? e.call(i, t) : !1
  );
}
function vd() {
  this.hook("instead", "setActiveItem", () => {}),
    this.hook("instead", "selectAll", () => {});
}
function md() {
  var i = this,
    e = i.onKeyDown;
  i.hook("instead", "onKeyDown", (t) => {
    var n, r, s, o;
    if (!i.isOpen || !(t.keyCode === Ei || t.keyCode === _r))
      return e.call(i, t);
    (i.ignoreHover = !0),
      (o = Pt(i.activeOption, "[data-group]")),
      (n = Ut(i.activeOption, "[data-selectable]")),
      o &&
        (t.keyCode === Ei ? (o = o.previousSibling) : (o = o.nextSibling),
        o &&
          ((s = o.querySelectorAll("[data-selectable]")),
          (r = s[Math.min(s.length - 1, n)]),
          r && i.setActiveOption(r)));
  });
}
function gd(i) {
  const e = Object.assign(
    { label: "&times;", title: "Remove", className: "remove", append: !0 },
    i
  );
  var t = this;
  if (e.append) {
    var n =
      '<a href="javascript:void(0)" class="' +
      e.className +
      '" tabindex="-1" title="' +
      $t(e.title) +
      '">' +
      e.label +
      "</a>";
    t.hook("after", "setupTemplates", () => {
      var r = t.settings.render.item;
      t.settings.render.item = (s, o) => {
        var a = N(r.call(t, s, o)),
          l = N(n);
        return (
          a.appendChild(l),
          F(l, "mousedown", (c) => {
            z(c, !0);
          }),
          F(l, "click", (c) => {
            z(c, !0),
              !t.isLocked &&
                t.shouldDelete([a], c) &&
                (t.removeItem(a), t.refreshOptions(!1), t.inputState());
          }),
          a
        );
      };
    });
  }
}
function yd(i) {
  const e = this,
    t = Object.assign({ text: (n) => n[e.settings.labelField] }, i);
  e.on("item_remove", function (n) {
    if (e.isFocused && e.control_input.value.trim() === "") {
      var r = e.options[n];
      r && e.setTextboxValue(t.text.call(e, r));
    }
  });
}
function _d() {
  const i = this,
    e = i.canLoad,
    t = i.clearActiveOption,
    n = i.loadCallback;
  var r = {},
    s,
    o = !1,
    a,
    l = [];
  if (
    (i.settings.shouldLoadMore ||
      (i.settings.shouldLoadMore = () => {
        if (s.clientHeight / (s.scrollHeight - s.scrollTop) > 0.9) return !0;
        if (i.activeOption) {
          var h = i.selectable(),
            g = Array.from(h).indexOf(i.activeOption);
          if (g >= h.length - 2) return !0;
        }
        return !1;
      }),
    !i.settings.firstUrl)
  )
    throw "virtual_scroll plugin requires a firstUrl() method";
  i.settings.sortField = [{ field: "$order" }, { field: "$score" }];
  const c = (p) =>
      typeof i.settings.maxOptions == "number" &&
      s.children.length >= i.settings.maxOptions
        ? !1
        : !!(p in r && r[p]),
    d = (p, h) => i.items.indexOf(h) >= 0 || l.indexOf(h) >= 0;
  (i.setNextUrl = (p, h) => {
    r[p] = h;
  }),
    (i.getUrl = (p) => {
      if (p in r) {
        const h = r[p];
        return (r[p] = !1), h;
      }
      return (r = {}), i.settings.firstUrl.call(i, p);
    }),
    i.hook("instead", "clearActiveOption", () => {
      if (!o) return t.call(i);
    }),
    i.hook("instead", "canLoad", (p) => (p in r ? c(p) : e.call(i, p))),
    i.hook("instead", "loadCallback", (p, h) => {
      if (!o) i.clearOptions(d);
      else if (a) {
        const g = p[0];
        g !== void 0 && (a.dataset.value = g[i.settings.valueField]);
      }
      n.call(i, p, h), (o = !1);
    }),
    i.hook("after", "refreshOptions", () => {
      const p = i.lastValue;
      var h;
      c(p)
        ? ((h = i.render("loading_more", { query: p })),
          h && (h.setAttribute("data-selectable", ""), (a = h)))
        : p in r &&
          !s.querySelector(".no-results") &&
          (h = i.render("no_more_results", { query: p })),
        h && (U(h, i.settings.optionClass), s.append(h));
    }),
    i.on("initialize", () => {
      (l = Object.keys(i.options)),
        (s = i.dropdown_content),
        (i.settings.render = Object.assign(
          {},
          {
            loading_more: () =>
              '<div class="loading-more-results">Loading more results ... </div>',
            no_more_results: () =>
              '<div class="no-more-results">No more results</div>'
          },
          i.settings.render
        )),
        s.addEventListener("scroll", () => {
          i.settings.shouldLoadMore.call(i) &&
            c(i.lastValue) &&
            (o || ((o = !0), i.load.call(i, i.lastValue)));
        });
    });
}
X.define("change_listener", od);
X.define("checkbox_options", ad);
X.define("clear_button", ld);
X.define("drag_drop", cd);
X.define("dropdown_header", dd);
X.define("caret_position", ud);
X.define("dropdown_input", pd);
X.define("input_autogrow", hd);
X.define("no_backspace_delete", fd);
X.define("no_active_items", vd);
X.define("optgroup_columns", md);
X.define("remove_button", gd);
X.define("restore_on_backspace", yd);
X.define("virtual_scroll", _d);
const {
    getInstance: bd,
    createInstance: wd,
    getOrCreateInstance: br,
    destroyInstance: xd
  } = Re({ create: (i, e) => new X(i, e), destroy: (i) => i.destroy() }),
  Si = (i) => {
    i.querySelectorAll("[data-select]").forEach((e) => {
      br(e, Ve(e, "select"));
    });
  };
document.readyState && document.readyState !== "loading"
  ? Si(document)
  : document.addEventListener("DOMContentLoaded", () => {
      Si(document);
    });
const wr = {
  getInstance: bd,
  createInstance: wd,
  getOrCreateInstance: br,
  destroyInstance: xd,
  dataApi: Si
};
function wn(i, e, t) {
  t.split(/\s+/).forEach((n) => {
    n && i.classList[e](n);
  });
}
const Ed = {
  name: "scheme",
  defaultValue: "",
  fn(i) {
    const e = i.popper.firstElementChild,
      t = () => {
        var s;
        return !!((s = i.props.render) != null && s.$$tippy);
      };
    function n() {
      (i.props.scheme && !t()) || wn(e, "add", i.props.scheme);
    }
    function r() {
      t() && wn(e, "remove", i.props.scheme);
    }
    return { onCreate: n, onBeforeUpdate: r, onAfterUpdate: n };
  }
};
Fe.setDefaultProps({ plugins: [Ed] });
const Od = {
  text: "",
  theme: "tooltip",
  animation: "shift-toward",
  scheme: "scheme-gray"
};
class Sd {
  constructor(e = null, t = {}) {
    S(this, "getContentEl", () => this._contentEl);
    S(this, "dispose", () => {
      this.tippy.destroy(),
        this._targetEl.dispatchEvent(new Event("tooltip.dispose"));
    });
    S(this, "_resolveContentEl", (e) => {
      const { text: t, content: n } = e;
      return (
        t ||
        (typeof n == "string"
          ? document.querySelector(n)
          : n instanceof Element
          ? n
          : this._targetEl.nextElementSibling)
      );
    });
    S(this, "_forwardableOptions", () => {
      const e = { ...this._options };
      return delete e.text, delete e.content, e;
    });
    (this._targetEl = e),
      (this._contentEl = this._resolveContentEl(t)),
      (this._options = { ...Od, ...t }),
      (this.tippy = Fe(this._targetEl, {
        ...this._forwardableOptions(),
        content: this._contentEl
      }));
  }
}
const {
    getInstance: Ad,
    createInstance: Cd,
    getOrCreateInstance: xr,
    destroyInstance: kd
  } = Re({ create: (i, e) => new Sd(i, e), destroy: (i) => i.dispose() }),
  xn = (i) => {
    i.querySelectorAll("[data-tooltip]").forEach((e) => {
      const t = { text: e.getAttribute("data-tooltip") };
      xr(e, t);
    });
  };
document.readyState && document.readyState !== "loading"
  ? xn(document)
  : document.addEventListener("DOMContentLoaded", () => {
      xn(document);
    });
const at = {
    getInstance: Ad,
    createInstance: Cd,
    getOrCreateInstance: xr,
    destroyInstance: kd
  },
  Id = { showClass: "sidebar--drawer" };
class Ld {
  constructor(e, t) {
    S(this, "toggle", () => {
      this._shown ? this.hide() : this.show();
    });
    S(this, "hide", () => {
      (this._shown = !1),
        this._sidebarEl.classList.remove(this._options.showClass),
        this._backdrop.hide();
    });
    S(this, "show", () => {
      (this._shown = !0),
        this._sidebarEl.classList.add(this._options.showClass),
        this._backdrop.show();
    });
    (this._sidebarEl = e),
      (this._shown = !1),
      (this._backdrop = new Pi(document.body, {
        onClick: this.hide,
        class: "drawer-backdrop"
      })),
      (this._options = { ...Id, ...t });
  }
}
let En;
const On = () => {
  const i = document.querySelector(".sidebar");
  i &&
    ((En = new Ld(i)),
    document.querySelectorAll("[data-drawer-toggle]").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault(), En.toggle();
      });
    }));
};
document.readyState && document.readyState !== "loading"
  ? On()
  : document.addEventListener("DOMContentLoaded", () => {
      On();
    });
class Td {
  constructor(e, t) {
    S(this, "add", (e) => {
      const t = this._isItemActive(e),
        n = this._createItemElement(e, t);
      (e.el = n),
        this._items.push(e),
        this._wrapperEl.append(n),
        t && this._updateActiveUnbookmarked(),
        this._wrapperEl.dispatchEvent(
          new CustomEvent("bookmark.change", { detail: { items: this._items } })
        );
    });
    S(this, "remove", (e) => {
      const t = this._items.find((s) => s.url == e),
        n = this._items.indexOf(t),
        r = this._isItemActive(this._items[n]);
      this._items.splice(n, 1),
        this._removeItemElement(t.el),
        r && this._updateActiveUnbookmarked(),
        this._wrapperEl.dispatchEvent(
          new CustomEvent("bookmark.change", { detail: { items: this._items } })
        );
    });
    S(this, "_populateActiveItem", () => {
      var r, s;
      const e =
          ((r = document.querySelector('meta[name="title"]')) == null
            ? void 0
            : r.content) ??
          document.title ??
          "Untitled",
        t =
          ((s = document.querySelector('meta[name="icon"]')) == null
            ? void 0
            : s.content) ?? "icon--feather_bookmark",
        n = window.location.pathname + window.location.search;
      return { name: e, icon: t, url: n };
    });
    S(this, "_init", (e) => {
      e.forEach((t) => {
        this.add(t);
      }),
        this._updateActiveUnbookmarked();
    });
    S(this, "_createItemElement", (e, t = !1) => {
      const n = Ae("a", { href: e.url, class: "navbar__icon-link" });
      n.innerHTML = Pe.create(e.icon).toSvg();
      const r = Ae("a", {
        href: "javascript:;",
        title: "Unpin",
        class: "bookmark__delete"
      });
      (r.innerHTML = Pe.create("feather__x").toSvg()),
        r.addEventListener(
          "click",
          () => {
            this.remove(e.url);
          },
          { once: !0 }
        );
      const s = Ae("div", { class: "bookmark__tooltip" }, e.name, r),
        o = Ae(
          "div",
          { class: `bookmark__item${t ? " bookmark__item--active" : ""}` },
          n,
          s
        );
      return (
        at.getOrCreateInstance(n, {
          content: s,
          interactive: !0,
          offset: [0, 5],
          appendTo: document.body
        }),
        o
      );
    });
    S(this, "_removeItemElement", (e) => {
      const t = at.getInstance(e.firstElementChild);
      t && t.dispose(), e.remove();
    });
    S(
      this,
      "_activeIsBookmarked",
      () => this._items.findIndex((e) => e.url === this._activeItem.url) >= 0
    );
    S(this, "_updateActiveUnbookmarked", () => {
      let e = this._wrapperEl.querySelector(".bookmark__item--unbookmarked");
      e && this._removeUnbookmarkedItemElement(e),
        !this._activeIsBookmarked() &&
          ((e = this._createUnbookmarkedItemElement()),
          this._wrapperEl.prepend(e));
    });
    S(this, "_createUnbookmarkedItemElement", () => {
      const e = Ae("a", { href: "javascript:;", class: "navbar__icon-link" });
      (e.innerHTML = Pe.create(this._activeItem.icon).toSvg()),
        (e.innerHTML += Pe.create("feather__plus").toSvg()),
        e.addEventListener("click", this._handleAddToBookmarkClick);
      const t = Ae(
          "div",
          { class: "bookmark__tooltip" },
          this._activeItem.name
        ),
        n = Ae(
          "div",
          { class: "bookmark__item bookmark__item--unbookmarked" },
          e,
          t
        );
      return (
        at.getOrCreateInstance(e, {
          content: t,
          offset: [0, 5],
          appendTo: document.body
        }),
        n
      );
    });
    S(this, "_removeUnbookmarkedItemElement", (e) => {
      const t = at.getInstance(e.firstElementChild);
      t && t.dispose(),
        this._wrapperEl
          .querySelector(".navbar__icon-link")
          .removeEventListener("click", this._handleAddToBookmarkClick),
        e.remove();
    });
    S(this, "_handleAddToBookmarkClick", () => {
      this.add(this._activeItem);
    });
    S(this, "_isItemActive", (e) => this._activeItem.url === e.url);
    (this._wrapperEl = e),
      (this._items = []),
      (this._activeItem = this._populateActiveItem()),
      this._init(t);
  }
}
const Sn = () => {
  const i = document.getElementById("bookmark");
  if (!i) return;
  const e = [
    { name: "File Manager", icon: "feather__file", url: "/file-manager.html" },
    { name: "Chat", icon: "feather__messageSquare", url: "/chat.html" },
    { name: "Email", icon: "feather__mail", url: "/email.html" },
    { name: "Contacts", icon: "feather__users", url: "/contacts.html" }
  ];
  new Td(i, e),
    i.addEventListener("bookmark.change", (t) => {
      t.detail.items;
    });
};
document.readyState && document.readyState !== "loading"
  ? Sn()
  : document.addEventListener("DOMContentLoaded", () => {
      Sn();
    });
class Md {
  constructor(e) {
    S(this, "_queries", (e, t) => {
      var n = "/search.json?q=" + encodeURIComponent(e);
      fetch(n)
        .then((r) => r.json())
        .then((r) => {
          t(r);
        })
        .catch(() => {
          t();
        });
    });
    (this._selectEl = e),
      (this._navbarEl = document.querySelector(".navbar")),
      (this._mainEl = document.querySelector(".main")),
      (this._backdrop = new Pi(this._mainEl, { class: "main-backdrop" })),
      (this.tomSelect = wr.getOrCreateInstance(e, {
        valueField: "url",
        labelField: "name",
        searchField: "name",
        placeholder: "Search...",
        openOnFocus: !1,
        highlight: !1,
        onFocus: () => this._navbarEl.classList.add("search-mode"),
        onBlur: () => this._navbarEl.classList.remove("search-mode"),
        onDropdownOpen: () => this._backdrop.show(),
        onDropdownClose: () => this._backdrop.hide(),
        onChange: (t) => (window.location.href = t),
        load: this._queries,
        render: {
          loading() {
            return '<div class="py-3 px-6">Loading...</div>';
          },
          option(t, n) {
            return t.type === "page"
              ? `<div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center text-gray-500">
                ${Pe.create(t.icon).toSvg()}
              </span>
              <div class="px-3 flex-1 leading-tight text-gray-500">
                <span class="text-sm font-bold">${n(t.name)}</span><br />
                <small class="text-xs">${t.url}</small>
              </div>
              <span class="badge scheme-gray">Page</span>
            </div>`
              : "";
          }
        }
      }));
  }
}
const An = () => {
  const i = document.querySelector("#tomSearch");
  i && new Md(i);
};
document.readyState && document.readyState !== "loading"
  ? An()
  : document.addEventListener("DOMContentLoaded", () => {
      An();
    });
const Dd = "modulepreload",
  zd = function (i) {
    return "/" + i;
  },
  Cn = {},
  P = function (e, t, n) {
    if (!t || t.length === 0) return e();
    const r = document.getElementsByTagName("link");
    return Promise.all(
      t.map((s) => {
        if (((s = zd(s)), s in Cn)) return;
        Cn[s] = !0;
        const o = s.endsWith(".css"),
          a = o ? '[rel="stylesheet"]' : "";
        if (!!n)
          for (let d = r.length - 1; d >= 0; d--) {
            const p = r[d];
            if (p.href === s && (!o || p.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${s}"]${a}`)) return;
        const c = document.createElement("link");
        if (
          ((c.rel = o ? "stylesheet" : Dd),
          o || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = s),
          document.head.appendChild(c),
          o)
        )
          return new Promise((d, p) => {
            c.addEventListener("load", d),
              c.addEventListener("error", () =>
                p(new Error(`Unable to preload CSS for ${s}`))
              );
          });
      })
    )
      .then(() => e())
      .catch((s) => {
        const o = new Event("vite:preloadError", { cancelable: !0 });
        if (((o.payload = s), window.dispatchEvent(o), !o.defaultPrevented))
          throw s;
      });
  },
  Pd = Object.assign({
    "../scripts/charts.js": () =>
      P(() => import("./charts-d7aebc1e.js"), [
        "assets/charts-d7aebc1e.js",
        "assets/theme-21339dfc.js"
      ]),
    "../scripts/chat.js": () =>
      P(() => import("./chat-b99bedf5.js"), [
        "assets/chat-b99bedf5.js",
        "assets/layoutSectioned-c8c7f2b3.js"
      ]),
    "../scripts/components/alert.js": () =>
      P(() => import("./alert-060c3356.js"), [
        "assets/alert-060c3356.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/components/badges.js": () =>
      P(() => import("./badges-f19b73ca.js"), [
        "assets/badges-f19b73ca.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/components/buttons.js": () =>
      P(() => import("./buttons-c15cb9d8.js"), [
        "assets/buttons-c15cb9d8.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/components/modal.js": () =>
      P(() => import("./modal-57cb7baf.js"), [
        "assets/modal-57cb7baf.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css",
        "assets/modal-c313b5b0.js"
      ]),
    "../scripts/components/spinner.js": () =>
      P(() => import("./spinner-839a781d.js"), [
        "assets/spinner-839a781d.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/components/tabs.js": () =>
      P(() => import("./tabs-663199b6.js"), [
        "assets/tabs-663199b6.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css",
        "assets/tabs-77825e41.js"
      ]),
    "../scripts/components/toast.js": () =>
      P(() => import("./toast-f1860c34.js"), [
        "assets/toast-f1860c34.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/contacts.js": () =>
      P(() => import("./contacts-74cef834.js"), [
        "assets/contacts-74cef834.js",
        "assets/datepicker-3a3be1c1.js"
      ]),
    "../scripts/dashboardAnalytics.js": () =>
      P(() => import("./dashboardAnalytics-b3a2cf9c.js"), [
        "assets/dashboardAnalytics-b3a2cf9c.js",
        "assets/theme-21339dfc.js"
      ]),
    "../scripts/dashboardEcommerce.js": () =>
      P(() => import("./dashboardEcommerce-a7a1d2de.js"), [
        "assets/dashboardEcommerce-a7a1d2de.js",
        "assets/theme-21339dfc.js"
      ]),
    "../scripts/demo.js": () =>
      P(() => import("./demo-43b77c93.js"), [
        "assets/demo-43b77c93.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/email.js": () =>
      P(() => import("./email-e7f86f05.js"), [
        "assets/email-e7f86f05.js",
        "assets/modal-c313b5b0.js"
      ]),
    "../scripts/fileManager.js": () =>
      P(() => import("./fileManager-020a8010.js"), []),
    "../scripts/forms/dropzone.js": () =>
      P(() => import("./dropzone-92c215eb.js"), [
        "assets/dropzone-92c215eb.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css"
      ]),
    "../scripts/forms/flatpickr.js": () =>
      P(() => import("./flatpickr-4a27c4c1.js"), [
        "assets/flatpickr-4a27c4c1.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css",
        "assets/datepicker-3a3be1c1.js"
      ]),
    "../scripts/forms/layoutSectioned.js": () =>
      P(() => import("./layoutSectioned-c8c7f2b3.js"), []),
    "../scripts/forms/textarea.js": () =>
      P(() => import("./textarea-5dda345e.js"), [
        "assets/textarea-5dda345e.js",
        "assets/copy-2908d810.js",
        "assets/copy-5cf69142.css",
        "assets/layoutSectioned-c8c7f2b3.js"
      ]),
    "../scripts/icons.js": () =>
      P(() => import("./icons-9e1784ed.js"), [
        "assets/icons-9e1784ed.js",
        "assets/tabs-77825e41.js"
      ]),
    "../scripts/layout.js": () =>
      P(() => import("./layout-4279dea2.js"), [
        "assets/layout-4279dea2.js",
        "assets/tabs-77825e41.js"
      ])
  }),
  Hd = (i = document) => {
    i.querySelectorAll("[data-script]").forEach(async (e) => {
      try {
        await Pd[`../scripts/${e.dataset.script}.js`]();
      } catch (t) {
        console.error(t),
          console.error(`${e.dataset.script}.js script cannot be loaded.`);
      }
    });
  };
document.addEventListener("DOMContentLoaded", () => {
  Hd(document);
});
const $d = Object.assign({
    "../../svg/undraw_404.svg": () =>
      P(() => import("./undraw_404-1bcee0e2.js"), []),
    "../../svg/undraw_investment_data.svg": () =>
      P(() => import("./undraw_investment_data-6e0d0099.js"), []),
    "../../svg/undraw_programming.svg": () =>
      P(() => import("./undraw_programming-6dcbc94a.js"), []),
    "../../svg/undraw_server_down.svg": () =>
      P(() => import("./undraw_server_down-cde7a83f.js"), []),
    "../../svg/undraw_stepping_up.svg": () =>
      P(() => import("./undraw_stepping_up-605e6f1f.js"), [])
  }),
  Vd = (i = document) => {
    i.querySelectorAll("svg[data-src]").forEach(async (e) => {
      try {
        const t = await $d[`../../svg/${e.dataset.src}.svg`](),
          r = await (await fetch(t.default)).text(),
          o = new DOMParser().parseFromString(r, "image/svg+xml")
            .firstElementChild;
        [].slice.call(e.attributes).forEach((a) => {
          a.name !== "data-src" && o.setAttribute(a.name, a.value);
        }),
          e.parentNode.replaceChild(o, e);
      } catch {
        console.error(`${e.dataset.script}.svg not found.`);
      }
    });
  };
document.addEventListener("DOMContentLoaded", () => {
  Vd(document);
});
window.Icon = Pe;
window.Collapse = Al;
window.Dropdown = Rt;
window.Scrollbar = pc;
window.Cols = bc;
window.Dismissible = Sc;
window.RichSelect = wr;
window.Tooltip = at;
document.body.style.removeProperty("display");
document.querySelectorAll("[data-dropdown-toggle]").forEach((i) => {
  i.addEventListener(
    "dropdown.show",
    () => {
      const e = Rt.getInstance(i);
      Pe.replace(e.getContentEl());
    },
    { once: !0 }
  );
});
export {
  Pi as B,
  bc as C,
  Sc as D,
  Pe as I,
  pc as S,
  P as _,
  Rd as a,
  Ae as c,
  Un as g,
  Re as m,
  Ve as o
};
