var Fu = Object.defineProperty, Lu = (n, e, t) => e in n ? Fu(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Ir = (n, e, t) => (Lu(n, typeof e != "symbol" ? e + "" : e, t), t);
function Iu(n, e) {
  const t = /* @__PURE__ */ Object.create(null), r = n.split(",");
  for (let i = 0; i < r.length; i++)
    t[r[i]] = !0;
  return e ? (i) => !!t[i.toLowerCase()] : (i) => !!t[i];
}
function $a(n) {
  if (Ie(n)) {
    const e = {};
    for (let t = 0; t < n.length; t++) {
      const r = n[t], i = ki(r) ? $u(r) : $a(r);
      if (i)
        for (const s in i)
          e[s] = i[s];
    }
    return e;
  } else if (ki(n) || Pr(n))
    return n;
}
const Nu = /;(?![^(]*\))/g, Bu = /:(.+)/;
function $u(n) {
  const e = {};
  return n.split(Nu).forEach((t) => {
    if (t) {
      const r = t.split(Bu);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function Ya(n) {
  let e = "";
  if (ki(n))
    e = n;
  else if (Ie(n))
    for (let t = 0; t < n.length; t++) {
      const r = Ya(n[t]);
      r && (e += r + " ");
    }
  else if (Pr(n))
    for (const t in n)
      n[t] && (e += t + " ");
  return e.trim();
}
function Yu(n, e) {
  if (n.length !== e.length)
    return !1;
  let t = !0;
  for (let r = 0; t && r < n.length; r++)
    t = yi(n[r], e[r]);
  return t;
}
function yi(n, e) {
  if (n === e)
    return !0;
  let t = Xo(n), r = Xo(e);
  if (t || r)
    return t && r ? n.getTime() === e.getTime() : !1;
  if (t = Ie(n), r = Ie(e), t || r)
    return t && r ? Yu(n, e) : !1;
  if (t = Pr(n), r = Pr(e), t || r) {
    if (!t || !r)
      return !1;
    const i = Object.keys(n).length, s = Object.keys(e).length;
    if (i !== s)
      return !1;
    for (const o in n) {
      const a = n.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (a && !l || !a && l || !yi(n[o], e[o]))
        return !1;
    }
  }
  return String(n) === String(e);
}
function _s(n, e) {
  return n.findIndex((t) => yi(t, e));
}
const Vu = Object.assign, Xu = (n, e) => {
  const t = n.indexOf(e);
  t > -1 && n.splice(t, 1);
}, Hu = Object.prototype.hasOwnProperty, ho = (n, e) => Hu.call(n, e), Ie = Array.isArray, ds = (n) => Va(n) === "[object Map]", Xo = (n) => n instanceof Date, ki = (n) => typeof n == "string", _o = (n) => typeof n == "symbol", Pr = (n) => n !== null && typeof n == "object", Wu = Object.prototype.toString, Va = (n) => Wu.call(n), Uu = (n) => Va(n).slice(8, -1), po = (n) => ki(n) && n !== "NaN" && n[0] !== "-" && "" + parseInt(n, 10) === n, Xa = (n) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (t) => e[t] || (e[t] = n(t));
}, qu = /-(\w)/g, Gu = Xa((n) => n.replace(qu, (e, t) => t ? t.toUpperCase() : "")), ju = /\B([A-Z])/g, Ha = Xa((n) => n.replace(ju, "-$1").toLowerCase()), Ku = (n, e) => !Object.is(n, e), Ho = (n) => {
  const e = parseFloat(n);
  return isNaN(e) ? n : e;
};
let Qu;
function Wa(n, e) {
  e = e || Qu, e && e.active && e.effects.push(n);
}
const Ua = (n) => {
  const e = new Set(n);
  return e.w = 0, e.n = 0, e;
}, qa = (n) => (n.w & Cr) > 0, Ga = (n) => (n.n & Cr) > 0, Zu = ({ deps: n }) => {
  if (n.length)
    for (let e = 0; e < n.length; e++)
      n[e].w |= Cr;
}, Ju = (n) => {
  const { deps: e } = n;
  if (e.length) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      qa(i) && !Ga(i) ? i.delete(n) : e[t++] = i, i.w &= ~Cr, i.n &= ~Cr;
    }
    e.length = t;
  }
}, Ds = /* @__PURE__ */ new WeakMap();
let Vi = 0, Cr = 1;
const Rs = 30, Ni = [];
let Wr;
const Ln = Symbol(""), Wo = Symbol("");
class ef {
  constructor(e, t = null, r) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], Wa(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!Ni.includes(this))
      try {
        return Ni.push(Wr = this), sf(), Cr = 1 << ++Vi, Vi <= Rs ? Zu(this) : Uo(this), this.fn();
      } finally {
        Vi <= Rs && Ju(this), Cr = 1 << --Vi, ja(), Ni.pop();
        const e = Ni.length;
        Wr = e > 0 ? Ni[e - 1] : void 0;
      }
  }
  stop() {
    this.active && (Uo(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Uo(n) {
  const { deps: e } = n;
  if (e.length) {
    for (let t = 0; t < e.length; t++)
      e[t].delete(n);
    e.length = 0;
  }
}
function tf(n, e) {
  n.effect && (n = n.effect.fn);
  const t = new ef(n);
  e && (Vu(t, e), e.scope && Wa(t, e.scope)), (!e || !e.lazy) && t.run();
  const r = t.run.bind(t);
  return r.effect = t, r;
}
function rf(n) {
  n.effect.stop();
}
let Pi = !0;
const go = [];
function nf() {
  go.push(Pi), Pi = !1;
}
function sf() {
  go.push(Pi), Pi = !0;
}
function ja() {
  const n = go.pop();
  Pi = n === void 0 ? !0 : n;
}
function ss(n, e, t) {
  if (!of())
    return;
  let r = Ds.get(n);
  r || Ds.set(n, r = /* @__PURE__ */ new Map());
  let i = r.get(t);
  i || r.set(t, i = Ua()), af(i);
}
function of() {
  return Pi && Wr !== void 0;
}
function af(n, e) {
  let t = !1;
  Vi <= Rs ? Ga(n) || (n.n |= Cr, t = !qa(n)) : t = !n.has(Wr), t && (n.add(Wr), Wr.deps.push(n));
}
function zs(n, e, t, r, i, s) {
  const o = Ds.get(n);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (t === "length" && Ie(n))
    o.forEach((l, u) => {
      (u === "length" || u >= r) && a.push(l);
    });
  else
    switch (t !== void 0 && a.push(o.get(t)), e) {
      case "add":
        Ie(n) ? po(t) && a.push(o.get("length")) : (a.push(o.get(Ln)), ds(n) && a.push(o.get(Wo)));
        break;
      case "delete":
        Ie(n) || (a.push(o.get(Ln)), ds(n) && a.push(o.get(Wo)));
        break;
      case "set":
        ds(n) && a.push(o.get(Ln));
        break;
    }
  if (a.length === 1)
    a[0] && qo(a[0]);
  else {
    const l = [];
    for (const u of a)
      u && l.push(...u);
    qo(Ua(l));
  }
}
function qo(n, e) {
  for (const t of Ie(n) ? n : [...n])
    (t !== Wr || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
const lf = Iu("__proto__,__v_isRef,__isVue"), Ka = new Set(Object.getOwnPropertyNames(Symbol).map((n) => Symbol[n]).filter(_o)), uf = Qa(), ff = Qa(!0), Go = cf();
function cf() {
  const n = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    n[e] = function(...t) {
      const r = Ur(this);
      for (let s = 0, o = this.length; s < o; s++)
        ss(r, "get", s + "");
      const i = r[e](...t);
      return i === -1 || i === !1 ? r[e](...t.map(Ur)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    n[e] = function(...t) {
      nf();
      const r = Ur(this)[e].apply(this, t);
      return ja(), r;
    };
  }), n;
}
function Qa(n = !1, e = !1) {
  return function(t, r, i) {
    if (r === "__v_isReactive")
      return !n;
    if (r === "__v_isReadonly")
      return n;
    if (r === "__v_raw" && i === (n ? e ? xf : Ja : e ? vf : Za).get(t))
      return t;
    const s = Ie(t);
    if (!n && s && ho(Go, r))
      return Reflect.get(Go, r, i);
    const o = Reflect.get(t, r, i);
    return (_o(r) ? Ka.has(r) : lf(r)) || (n || ss(t, "get", r), e) ? o : Fs(o) ? !s || !po(r) ? o.value : o : Pr(o) ? n ? Tf(o) : os(o) : o;
  };
}
const hf = _f();
function _f(n = !1) {
  return function(e, t, r, i) {
    let s = e[t];
    if (!n && !Sf(r) && (r = Ur(r), s = Ur(s), !Ie(e) && Fs(s) && !Fs(r)))
      return s.value = r, !0;
    const o = Ie(e) && po(t) ? Number(t) < e.length : ho(e, t), a = Reflect.set(e, t, r, i);
    return e === Ur(i) && (o ? Ku(r, s) && zs(e, "set", t, r) : zs(e, "add", t, r)), a;
  };
}
function df(n, e) {
  const t = ho(n, e);
  n[e];
  const r = Reflect.deleteProperty(n, e);
  return r && t && zs(n, "delete", e, void 0), r;
}
function pf(n, e) {
  const t = Reflect.has(n, e);
  return (!_o(e) || !Ka.has(e)) && ss(n, "has", e), t;
}
function gf(n) {
  return ss(n, "iterate", Ie(n) ? "length" : Ln), Reflect.ownKeys(n);
}
const mf = { get: uf, set: hf, deleteProperty: df, has: pf, ownKeys: gf }, yf = { get: ff, set(n, e) {
  return !0;
}, deleteProperty(n, e) {
  return !0;
} }, Za = /* @__PURE__ */ new WeakMap(), vf = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap(), xf = /* @__PURE__ */ new WeakMap();
function bf(n) {
  switch (n) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function wf(n) {
  return n.__v_skip || !Object.isExtensible(n) ? 0 : bf(Uu(n));
}
function os(n) {
  return n && n.__v_isReadonly ? n : el(n, !1, mf, null, Za);
}
function Tf(n) {
  return el(n, !0, yf, null, Ja);
}
function el(n, e, t, r, i) {
  if (!Pr(n) || n.__v_raw && !(e && n.__v_isReactive))
    return n;
  const s = i.get(n);
  if (s)
    return s;
  const o = wf(n);
  if (o === 0)
    return n;
  const a = new Proxy(n, o === 2 ? r : t);
  return i.set(n, a), a;
}
function Sf(n) {
  return !!(n && n.__v_isReadonly);
}
function Ur(n) {
  const e = n && n.__v_raw;
  return e ? Ur(e) : n;
}
function Fs(n) {
  return !!(n && n.__v_isRef === !0);
}
Promise.resolve();
let Ls = !1;
const Un = [], kf = Promise.resolve(), as = (n) => kf.then(n), jo = (n) => {
  Un.includes(n) || Un.push(n), Ls || (Ls = !0, as(Pf));
}, Pf = () => {
  for (const n of Un)
    n();
  Un.length = 0, Ls = !1;
}, Cf = /^(spellcheck|draggable|form|list|type)$/, Is = ({ el: n, get: e, effect: t, arg: r, modifiers: i }) => {
  let s;
  r === "class" && (n._class = n.className), t(() => {
    let o = e();
    if (r)
      i != null && i.camel && (r = Gu(r)), ps(n, r, o, s);
    else {
      for (const a in o)
        ps(n, a, o[a], s && s[a]);
      for (const a in s)
        (!o || !(a in o)) && ps(n, a, null);
    }
    s = o;
  });
}, ps = (n, e, t, r) => {
  if (e === "class")
    n.setAttribute("class", Ya(n._class ? [n._class, t] : t) || "");
  else if (e === "style") {
    t = $a(t);
    const { style: i } = n;
    if (!t)
      n.removeAttribute("style");
    else if (ki(t))
      t !== r && (i.cssText = t);
    else {
      for (const s in t)
        Ns(i, s, t[s]);
      if (r && !ki(r))
        for (const s in r)
          t[s] == null && Ns(i, s, "");
    }
  } else
    !(n instanceof SVGElement) && e in n && !Cf.test(e) ? (n[e] = t, e === "value" && (n._value = t)) : e === "true-value" ? n._trueValue = t : e === "false-value" ? n._falseValue = t : t != null ? n.setAttribute(e, t) : n.removeAttribute(e);
}, Ko = /\s*!important$/, Ns = (n, e, t) => {
  Ie(t) ? t.forEach((r) => Ns(n, e, r)) : e.startsWith("--") ? n.setProperty(e, t) : Ko.test(t) ? n.setProperty(Ha(e), t.replace(Ko, ""), "important") : n[e] = t;
}, mr = (n, e) => {
  const t = n.getAttribute(e);
  return t != null && n.removeAttribute(e), t;
}, pr = (n, e, t, r) => {
  n.addEventListener(e, t, r);
}, Of = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Mf = ["ctrl", "shift", "alt", "meta"], Ef = { stop: (n) => n.stopPropagation(), prevent: (n) => n.preventDefault(), self: (n) => n.target !== n.currentTarget, ctrl: (n) => !n.ctrlKey, shift: (n) => !n.shiftKey, alt: (n) => !n.altKey, meta: (n) => !n.metaKey, left: (n) => "button" in n && n.button !== 0, middle: (n) => "button" in n && n.button !== 1, right: (n) => "button" in n && n.button !== 2, exact: (n, e) => Mf.some((t) => n[`${t}Key`] && !e[t]) }, tl = ({ el: n, get: e, exp: t, arg: r, modifiers: i }) => {
  if (!r)
    return;
  let s = Of.test(t) ? e(`(e => ${t}(e))`) : e(`($event => { ${t} })`);
  if (r === "vue:mounted") {
    as(s);
    return;
  } else if (r === "vue:unmounted")
    return () => s();
  if (i) {
    r === "click" && (i.right && (r = "contextmenu"), i.middle && (r = "mouseup"));
    const o = s;
    s = (a) => {
      if (!("key" in a && !(Ha(a.key) in i))) {
        for (const l in i) {
          const u = Ef[l];
          if (u && u(a, i))
            return;
        }
        return o(a);
      }
    };
  }
  pr(n, r, s, i);
}, Af = ({ el: n, get: e, effect: t }) => {
  const r = n.style.display;
  t(() => {
    n.style.display = e() ? r : "none";
  });
}, rl = ({ el: n, get: e, effect: t }) => {
  t(() => {
    n.textContent = il(e());
  });
}, il = (n) => n == null ? "" : Pr(n) ? JSON.stringify(n, null, 2) : String(n), Df = ({ el: n, get: e, effect: t }) => {
  t(() => {
    n.innerHTML = e();
  });
}, Rf = ({ el: n, exp: e, get: t, effect: r, modifiers: i }) => {
  const s = n.type, o = t(`(val) => { ${e} = val }`), { trim: a, number: l = s === "number" } = i || {};
  if (n.tagName === "SELECT") {
    const u = n;
    pr(n, "change", () => {
      const f = Array.prototype.filter.call(u.options, (h) => h.selected).map((h) => l ? Ho(dr(h)) : dr(h));
      o(u.multiple ? f : f[0]);
    }), r(() => {
      const f = t(), h = u.multiple;
      for (let d = 0, c = u.options.length; d < c; d++) {
        const p = u.options[d], _ = dr(p);
        if (h)
          Ie(f) ? p.selected = _s(f, _) > -1 : p.selected = f.has(_);
        else if (yi(dr(p), f)) {
          u.selectedIndex !== d && (u.selectedIndex = d);
          return;
        }
      }
      !h && u.selectedIndex !== -1 && (u.selectedIndex = -1);
    });
  } else if (s === "checkbox") {
    pr(n, "change", () => {
      const f = t(), h = n.checked;
      if (Ie(f)) {
        const d = dr(n), c = _s(f, d), p = c !== -1;
        if (h && !p)
          o(f.concat(d));
        else if (!h && p) {
          const _ = [...f];
          _.splice(c, 1), o(_);
        }
      } else
        o(Qo(n, h));
    });
    let u;
    r(() => {
      const f = t();
      Ie(f) ? n.checked = _s(f, dr(n)) > -1 : f !== u && (n.checked = yi(f, Qo(n, !0))), u = f;
    });
  } else if (s === "radio") {
    pr(n, "change", () => {
      o(dr(n));
    });
    let u;
    r(() => {
      const f = t();
      f !== u && (n.checked = yi(f, dr(n)));
    });
  } else {
    const u = (f) => a ? f.trim() : l ? Ho(f) : f;
    pr(n, "compositionstart", zf), pr(n, "compositionend", Ff), pr(n, i != null && i.lazy ? "change" : "input", () => {
      n.composing || o(u(n.value));
    }), a && pr(n, "change", () => {
      n.value = n.value.trim();
    }), r(() => {
      if (n.composing)
        return;
      const f = n.value, h = t();
      document.activeElement === n && u(f) === h || f !== h && (n.value = h);
    });
  }
}, dr = (n) => "_value" in n ? n._value : n.value, Qo = (n, e) => {
  const t = e ? "_trueValue" : "_falseValue";
  return t in n ? n[t] : e;
}, zf = (n) => {
  n.target.composing = !0;
}, Ff = (n) => {
  const e = n.target;
  e.composing && (e.composing = !1, Lf(e, "input"));
}, Lf = (n, e) => {
  const t = document.createEvent("HTMLEvents");
  t.initEvent(e, !0, !0), n.dispatchEvent(t);
}, Zo = /* @__PURE__ */ Object.create(null), un = (n, e, t) => nl(n, `return(${e})`, t), nl = (n, e, t) => {
  const r = Zo[e] || (Zo[e] = If(e));
  try {
    return r(n, t);
  } catch (i) {
    console.error(i);
  }
}, If = (n) => {
  try {
    return new Function("$data", "$el", `with($data){${n}}`);
  } catch (e) {
    return console.error(`${e.message} in expression: ${n}`), () => {
    };
  }
}, Nf = ({ el: n, ctx: e, exp: t, effect: r }) => {
  as(() => r(() => nl(e.scope, t, n)));
}, Bf = { bind: Is, on: tl, show: Af, text: rl, html: Df, model: Rf, effect: Nf }, $f = (n, e, t) => {
  const r = n.parentElement, i = new Comment("v-if");
  r.insertBefore(i, n);
  const s = [{ exp: e, el: n }];
  let o, a;
  for (; (o = n.nextElementSibling) && (a = null, mr(o, "v-else") === "" || (a = mr(o, "v-else-if"))); )
    r.removeChild(o), s.push({ exp: a, el: o });
  const l = n.nextSibling;
  r.removeChild(n);
  let u, f = -1;
  const h = () => {
    u && (r.insertBefore(i, u.el), u.remove(), u = void 0);
  };
  return t.effect(() => {
    for (let d = 0; d < s.length; d++) {
      const { exp: c, el: p } = s[d];
      if (!c || un(t.scope, c)) {
        d !== f && (h(), u = new mo(p, t), u.insert(r, i), r.removeChild(i), f = d);
        return;
      }
    }
    f = -1, h();
  }), l;
}, Yf = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Jo = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Vf = /^\(|\)$/g, Xf = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, Hf = (n, e, t) => {
  const r = e.match(Yf);
  if (!r)
    return;
  const i = n.nextSibling, s = n.parentElement, o = new Text("");
  s.insertBefore(o, n), s.removeChild(n);
  const a = r[2].trim();
  let l = r[1].trim().replace(Vf, "").trim(), u, f = !1, h, d, c = "key", p = n.getAttribute(c) || n.getAttribute(c = ":key") || n.getAttribute(c = "v-bind:key");
  p && (n.removeAttribute(c), c === "key" && (p = JSON.stringify(p)));
  let _;
  (_ = l.match(Jo)) && (l = l.replace(Jo, "").trim(), h = _[1].trim(), _[2] && (d = _[2].trim())), (_ = l.match(Xf)) && (u = _[1].split(",").map((y) => y.trim()), f = l[0] === "[");
  let m = !1, w, b, P;
  const x = (y) => {
    const O = /* @__PURE__ */ new Map(), T = [];
    if (Ie(y))
      for (let k = 0; k < y.length; k++)
        T.push(S(O, y[k], k));
    else if (typeof y == "number")
      for (let k = 0; k < y; k++)
        T.push(S(O, k + 1, k));
    else if (Pr(y)) {
      let k = 0;
      for (const D in y)
        T.push(S(O, y[D], k++, D));
    }
    return [T, O];
  }, S = (y, O, T, k) => {
    const D = {};
    u ? u.forEach((I, N) => D[I] = O[f ? N : I]) : D[l] = O, k ? (h && (D[h] = k), d && (D[d] = T)) : h && (D[h] = T);
    const M = ll(t, D), F = p ? un(M.scope, p) : T;
    return y.set(F, T), M.key = F, M;
  }, C = (y, O) => {
    const T = new mo(n, y);
    return T.key = y.key, T.insert(s, O), T;
  };
  return t.effect(() => {
    const y = un(t.scope, a), O = P;
    if ([b, P] = x(y), !m)
      w = b.map((T) => C(T, o)), m = !0;
    else {
      for (let F = 0; F < w.length; F++)
        P.has(w[F].key) || w[F].remove();
      const T = [];
      let k = b.length, D, M;
      for (; k--; ) {
        const F = b[k], I = O.get(F.key);
        let N;
        I == null ? N = C(F, D ? D.el : o) : (N = w[I], Object.assign(N.ctx.scope, F.scope), I !== k && (w[I + 1] !== D || M === D) && (M = N, N.insert(s, D ? D.el : o))), T.unshift(D = N);
      }
      w = T;
    }
  }), i;
}, sl = ({ el: n, ctx: { scope: { $refs: e } }, get: t, effect: r }) => {
  let i;
  return r(() => {
    const s = t();
    e[s] = n, i && s !== i && delete e[i], i = s;
  }), () => {
    i && delete e[i];
  };
}, Wf = /^(?:v-|:|@)/, Uf = /\.([\w-]+)/g;
let Bs = !1;
const ol = (n, e) => {
  const t = n.nodeType;
  if (t === 1) {
    const r = n;
    if (r.hasAttribute("v-pre"))
      return;
    mr(r, "v-cloak");
    let i;
    if (i = mr(r, "v-if"))
      return $f(r, i, e);
    if (i = mr(r, "v-for"))
      return Hf(r, i, e);
    if ((i = mr(r, "v-scope")) || i === "") {
      const a = i ? un(e.scope, i) : {};
      e = ll(e, a), a.$template && qf(r, a.$template);
    }
    const s = mr(r, "v-once") != null;
    s && (Bs = !0), (i = mr(r, "ref")) && $s(r, sl, `"${i}"`, e), ea(r, e);
    const o = [];
    for (const { name: a, value: l } of [...r.attributes])
      Wf.test(a) && a !== "v-cloak" && (a === "v-model" ? o.unshift([a, l]) : a[0] === "@" || /^v-on\b/.test(a) ? o.push([a, l]) : ta(r, a, l, e));
    for (const [a, l] of o)
      ta(r, a, l, e);
    s && (Bs = !1);
  } else if (t === 3) {
    const r = n.data;
    if (r.includes(e.delimiters[0])) {
      let i = [], s = 0, o;
      for (; o = e.delimitersRE.exec(r); ) {
        const a = r.slice(s, o.index);
        a && i.push(JSON.stringify(a)), i.push(`$s(${o[1]})`), s = o.index + o[0].length;
      }
      s < r.length && i.push(JSON.stringify(r.slice(s))), $s(n, rl, i.join("+"), e);
    }
  } else
    t === 11 && ea(n, e);
}, ea = (n, e) => {
  let t = n.firstChild;
  for (; t; )
    t = ol(t, e) || t.nextSibling;
}, ta = (n, e, t, r) => {
  let i, s, o;
  if (e = e.replace(Uf, (a, l) => ((o || (o = {}))[l] = !0, "")), e[0] === ":")
    i = Is, s = e.slice(1);
  else if (e[0] === "@")
    i = tl, s = e.slice(1);
  else {
    const a = e.indexOf(":"), l = a > 0 ? e.slice(2, a) : e.slice(2);
    i = Bf[l] || r.dirs[l], s = a > 0 ? e.slice(a + 1) : void 0;
  }
  i && (i === Is && s === "ref" && (i = sl), $s(n, i, t, r, s, o), n.removeAttribute(e));
}, $s = (n, e, t, r, i, s) => {
  const o = e({ el: n, get: (a = t) => un(r.scope, a, n), effect: r.effect, ctx: r, exp: t, arg: i, modifiers: s });
  o && r.cleanups.push(o);
}, qf = (n, e) => {
  if (e[0] === "#") {
    const t = document.querySelector(e);
    n.appendChild(t.content.cloneNode(!0));
    return;
  }
  n.innerHTML = e;
}, al = (n) => {
  const e = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...n, scope: n ? n.scope : os({}), dirs: n ? n.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (t) => {
    if (Bs)
      return jo(t), t;
    const r = tf(t, { scheduler: () => jo(r) });
    return e.effects.push(r), r;
  } };
  return e;
}, ll = (n, e = {}) => {
  const t = n.scope, r = Object.create(t);
  Object.defineProperties(r, Object.getOwnPropertyDescriptors(e)), r.$refs = Object.create(t.$refs);
  const i = os(new Proxy(r, { set(s, o, a, l) {
    return l === i && !s.hasOwnProperty(o) ? Reflect.set(t, o, a) : Reflect.set(s, o, a, l);
  } }));
  return ul(i), { ...n, scope: i };
}, ul = (n) => {
  for (const e of Object.keys(n))
    typeof n[e] == "function" && (n[e] = n[e].bind(n));
};
class mo {
  constructor(e, t, r = !1) {
    Ir(this, "template"), Ir(this, "ctx"), Ir(this, "key"), Ir(this, "parentCtx"), Ir(this, "isFragment"), Ir(this, "start"), Ir(this, "end"), this.isFragment = e instanceof HTMLTemplateElement, r ? this.template = e : this.isFragment ? this.template = e.content.cloneNode(!0) : this.template = e.cloneNode(!0), r ? this.ctx = t : (this.parentCtx = t, t.blocks.push(this), this.ctx = al(t)), ol(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(e, t = null) {
    if (this.isFragment)
      if (this.start) {
        let r = this.start, i;
        for (; r && (i = r.nextSibling, e.insertBefore(r, t), r !== this.end); )
          r = i;
      } else
        this.start = new Text(""), this.end = new Text(""), e.insertBefore(this.end, t), e.insertBefore(this.start, this.end), e.insertBefore(this.template, this.end);
    else
      e.insertBefore(this.template, t);
  }
  remove() {
    if (this.parentCtx && Xu(this.parentCtx.blocks, this), this.start) {
      const e = this.start.parentNode;
      let t = this.start, r;
      for (; t && (r = t.nextSibling, e.removeChild(t), t !== this.end); )
        t = r;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((e) => {
      e.teardown();
    }), this.ctx.effects.forEach(rf), this.ctx.cleanups.forEach((e) => e());
  }
}
const ra = (n) => n.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), fl = (n) => {
  const e = al();
  if (n && (e.scope = os(n), ul(e.scope), n.$delimiters)) {
    const [r, i] = e.delimiters = n.$delimiters;
    e.delimitersRE = new RegExp(ra(r) + "([^]+?)" + ra(i), "g");
  }
  e.scope.$s = il, e.scope.$nextTick = as, e.scope.$refs = /* @__PURE__ */ Object.create(null);
  let t;
  return { directive(r, i) {
    return i ? (e.dirs[r] = i, this) : e.dirs[r];
  }, mount(r) {
    if (typeof r == "string" && (r = document.querySelector(r), !r))
      return;
    r = r || document.documentElement;
    let i;
    return r.hasAttribute("v-scope") ? i = [r] : i = [...r.querySelectorAll("[v-scope]")].filter((s) => !s.matches("[v-scope] [v-scope]")), i.length || (i = [r]), t = i.map((s) => new mo(s, e, !0)), this;
  }, unmount() {
    t.forEach((r) => r.teardown());
  } };
}, ia = document.currentScript;
ia && ia.hasAttribute("init") && fl().mount();
function tr(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function cl(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e;
}
/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var wt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Ci = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, yo, We, oe, Ot = 1e8, te = 1 / Ot, Ys = Math.PI * 2, Gf = Ys / 4, jf = 0, hl = Math.sqrt, Kf = Math.cos, Qf = Math.sin, De = function(e) {
  return typeof e == "string";
}, _e = function(e) {
  return typeof e == "function";
}, or = function(e) {
  return typeof e == "number";
}, vo = function(e) {
  return typeof e > "u";
}, Qt = function(e) {
  return typeof e == "object";
}, at = function(e) {
  return e !== !1;
}, xo = function() {
  return typeof window < "u";
}, Tn = function(e) {
  return _e(e) || De(e);
}, _l = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ue = Array.isArray, Vs = /(?:-?\.?\d|\.)+/gi, dl = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, pi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, gs = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, pl = /[+-]=-?[.\d]+/, gl = /[^,'"\[\]\s]+/gi, Zf = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ue, Ht, Xs, bo, Tt = {}, qn = {}, ml, yl = function(e) {
  return (qn = ei(e, Tt)) && ct;
}, wo = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, fn = function(e, t) {
  return !t && console.warn(e);
}, vl = function(e, t) {
  return e && (Tt[e] = t) && qn && (qn[e] = t) || Tt;
}, cn = function() {
  return 0;
}, Jf = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, In = {
  suppressEvents: !0,
  kill: !1
}, ec = {
  suppressEvents: !0
}, To = {}, Tr = [], Hs = {}, xl, yt = {}, ms = {}, na = 30, Nn = [], So = "", ko = function(e) {
  var t = e[0], r, i;
  if (Qt(t) || _e(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
    for (i = Nn.length; i-- && !Nn[i].targetTest(t); )
      ;
    r = Nn[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new Hl(e[i], r))) || e.splice(i, 1);
  return e;
}, qr = function(e) {
  return e._gsap || ko(Mt(e))[0]._gsap;
}, bl = function(e, t, r) {
  return (r = e[t]) && _e(r) ? e[t]() : vo(r) && e.getAttribute && e.getAttribute(t) || r;
}, lt = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, me = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ae = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, vi = function(e, t) {
  var r = t.charAt(0), i = parseFloat(t.substr(2));
  return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i;
}, tc = function(e, t) {
  for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, Gn = function() {
  var e = Tr.length, t = Tr.slice(0), r, i;
  for (Hs = {}, Tr.length = 0, r = 0; r < e; r++)
    i = t[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, wl = function(e, t, r, i) {
  Tr.length && !We && Gn(), e.render(t, r, i || We && t < 0 && (e._initted || e._startAt)), Tr.length && !We && Gn();
}, Tl = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(gl).length < 2 ? t : De(e) ? e.trim() : e;
}, Sl = function(e) {
  return e;
}, At = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, rc = function(e) {
  return function(t, r) {
    for (var i in r)
      i in t || i === "duration" && e || i === "ease" || (t[i] = r[i]);
  };
}, ei = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, sa = function n(e, t) {
  for (var r in t)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = Qt(t[r]) ? n(e[r] || (e[r] = {}), t[r]) : t[r]);
  return e;
}, jn = function(e, t) {
  var r = {}, i;
  for (i in e)
    i in t || (r[i] = e[i]);
  return r;
}, Ki = function(e) {
  var t = e.parent || ue, r = e.keyframes ? rc(Ue(e.keyframes)) : At;
  if (at(e.inherit))
    for (; t; )
      r(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, ic = function(e, t) {
  for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r]; )
    ;
  return r < 0;
}, kl = function(e, t, r, i, s) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var o = e[i], a;
  if (s)
    for (a = t[s]; o && o[s] > a; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = o, t.parent = t._dp = e, t;
}, ls = function(e, t, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var s = t._prev, o = t._next;
  s ? s._next = o : e[r] === t && (e[r] = o), o ? o._prev = s : e[i] === t && (e[i] = s), t._next = t._prev = t.parent = null;
}, Or = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Gr = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, nc = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, Ws = function(e, t, r, i) {
  return e._startAt && (We ? e._startAt.revert(In) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, i));
}, sc = function n(e) {
  return !e || e._ts && n(e.parent);
}, oa = function(e) {
  return e._repeat ? Oi(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Oi = function(e, t) {
  var r = Math.floor(e /= t);
  return e && r === e ? r - 1 : r;
}, Kn = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, us = function(e) {
  return e._end = Ae(e._start + (e._tDur / Math.abs(e._ts || e._rts || te) || 0));
}, fs = function(e, t) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = Ae(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), us(e), r._dirty || Gr(r, e)), e;
}, Pl = function(e, t) {
  var r;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = Kn(e.rawTime(), t), (!t._dur || vn(0, t.totalDuration(), r) - t._tTime > te) && t.render(r, !0)), Gr(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -te;
  }
}, Ut = function(e, t, r, i) {
  return t.parent && Or(t), t._start = Ae((or(r) ? r : r || e !== ue ? kt(e, r, t) : e._time) + t._delay), t._end = Ae(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), kl(e, t, "_first", "_last", e._sort ? "_start" : 0), Us(t) || (e._recent = t), i || Pl(e, t), e._ts < 0 && fs(e, e._tTime), e;
}, Cl = function(e, t) {
  return (Tt.ScrollTrigger || wo("scrollTrigger", t)) && Tt.ScrollTrigger.create(t, e);
}, Ol = function(e, t, r, i, s) {
  if (Co(e, t, s), !e._initted)
    return 1;
  if (!r && e._pt && !We && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && xl !== vt.frame)
    return Tr.push(e), e._lazy = [s, i], 1;
}, oc = function n(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || n(t));
}, Us = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, ac = function(e, t, r, i) {
  var s = e.ratio, o = t < 0 || !t && (!e._start && oc(e) && !(!e._initted && Us(e)) || (e._ts < 0 || e._dp._ts < 0) && !Us(e)) ? 0 : 1, a = e._rDelay, l = 0, u, f, h;
  if (a && e._repeat && (l = vn(0, e._tDur, t), f = Oi(l, a), e._yoyo && f & 1 && (o = 1 - o), f !== Oi(e._tTime, a) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || We || i || e._zTime === te || !t && e._zTime) {
    if (!e._initted && Ol(e, t, i, r, l))
      return;
    for (h = e._zTime, e._zTime = t || (r ? te : 0), r || (r = t && !h), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, u = e._pt; u; )
      u.r(o, u.d), u = u._next;
    t < 0 && Ws(e, t, r, !0), e._onUpdate && !r && bt(e, "onUpdate"), l && e._repeat && !r && e.parent && bt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && Or(e, 1), !r && !We && (bt(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else
    e._zTime || (e._zTime = t);
}, lc = function(e, t, r) {
  var i;
  if (r > t)
    for (i = e._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > t)
        return i;
      i = i._next;
    }
  else
    for (i = e._last; i && i._start >= r; ) {
      if (i.data === "isPause" && i._start < t)
        return i;
      i = i._prev;
    }
}, Mi = function(e, t, r, i) {
  var s = e._repeat, o = Ae(t) || 0, a = e._tTime / e._tDur;
  return a && !i && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : Ae(o * (s + 1) + e._rDelay * s) : o, a > 0 && !i && fs(e, e._tTime = e._tDur * a), e.parent && us(e), r || Gr(e.parent, e), e;
}, aa = function(e) {
  return e instanceof rt ? Gr(e) : Mi(e, e._dur);
}, uc = {
  _start: 0,
  endTime: cn,
  totalDuration: cn
}, kt = function n(e, t, r) {
  var i = e.labels, s = e._recent || uc, o = e.duration() >= Ot ? s.endTime(!1) : e._dur, a, l, u;
  return De(t) && (isNaN(t) || t in i) ? (l = t.charAt(0), u = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (u ? (a < 0 ? s : r).totalDuration() / 100 : 1)) : a < 0 ? (t in i || (i[t] = o), i[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), u && r && (l = l / 100 * (Ue(r) ? r[0] : r).totalDuration()), a > 1 ? n(e, t.substr(0, a - 1), r) + l : o + l)) : t == null ? o : +t;
}, Qi = function(e, t, r) {
  var i = or(t[1]), s = (i ? 2 : 1) + (e < 2 ? 0 : 1), o = t[s], a, l;
  if (i && (o.duration = t[1]), o.parent = r, e) {
    for (a = o, l = r; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = at(l.vars.inherit) && l.parent;
    o.immediateRender = at(a.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[s - 1];
  }
  return new Te(t[0], o, t[s + 1]);
}, Ar = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, vn = function(e, t, r) {
  return r < e ? e : r > t ? t : r;
}, He = function(e, t) {
  return !De(e) || !(t = Zf.exec(e)) ? "" : t[1];
}, fc = function(e, t, r) {
  return Ar(r, function(i) {
    return vn(e, t, i);
  });
}, qs = [].slice, Ml = function(e, t) {
  return e && Qt(e) && "length" in e && (!t && !e.length || e.length - 1 in e && Qt(e[0])) && !e.nodeType && e !== Ht;
}, cc = function(e, t, r) {
  return r === void 0 && (r = []), e.forEach(function(i) {
    var s;
    return De(i) && !t || Ml(i, 1) ? (s = r).push.apply(s, Mt(i)) : r.push(i);
  }) || r;
}, Mt = function(e, t, r) {
  return oe && !t && oe.selector ? oe.selector(e) : De(e) && !r && (Xs || !Ei()) ? qs.call((t || bo).querySelectorAll(e), 0) : Ue(e) ? cc(e, r) : Ml(e) ? qs.call(e, 0) : e ? [e] : [];
}, Gs = function(e) {
  return e = Mt(e)[0] || fn("Invalid scope") || {}, function(t) {
    var r = e.current || e.nativeElement || e;
    return Mt(t, r.querySelectorAll ? r : r === e ? fn("Invalid scope") || bo.createElement("div") : e);
  };
}, El = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Al = function(e) {
  if (_e(e))
    return e;
  var t = Qt(e) ? e : {
    each: e
  }, r = jr(t.ease), i = t.from || 0, s = parseFloat(t.base) || 0, o = {}, a = i > 0 && i < 1, l = isNaN(i) || a, u = t.axis, f = i, h = i;
  return De(i) ? f = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !a && l && (f = i[0], h = i[1]), function(d, c, p) {
    var _ = (p || t).length, m = o[_], w, b, P, x, S, C, y, O, T;
    if (!m) {
      if (T = t.grid === "auto" ? 0 : (t.grid || [1, Ot])[1], !T) {
        for (y = -Ot; y < (y = p[T++].getBoundingClientRect().left) && T < _; )
          ;
        T < _ && T--;
      }
      for (m = o[_] = [], w = l ? Math.min(T, _) * f - 0.5 : i % T, b = T === Ot ? 0 : l ? _ * h / T - 0.5 : i / T | 0, y = 0, O = Ot, C = 0; C < _; C++)
        P = C % T - w, x = b - (C / T | 0), m[C] = S = u ? Math.abs(u === "y" ? x : P) : hl(P * P + x * x), S > y && (y = S), S < O && (O = S);
      i === "random" && El(m), m.max = y - O, m.min = O, m.v = _ = (parseFloat(t.amount) || parseFloat(t.each) * (T > _ ? _ - 1 : u ? u === "y" ? _ / T : T : Math.max(T, _ / T)) || 0) * (i === "edges" ? -1 : 1), m.b = _ < 0 ? s - _ : s, m.u = He(t.amount || t.each) || 0, r = r && _ < 0 ? Yl(r) : r;
    }
    return _ = (m[d] - m.min) / m.max || 0, Ae(m.b + (r ? r(_) : _) * m.v) + m.u;
  };
}, js = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var i = Ae(Math.round(parseFloat(r) / e) * e * t);
    return (i - i % 1) / t + (or(r) ? 0 : He(r));
  };
}, Dl = function(e, t) {
  var r = Ue(e), i, s;
  return !r && Qt(e) && (i = r = e.radius || Ot, e.values ? (e = Mt(e.values), (s = !or(e[0])) && (i *= i)) : e = js(e.increment)), Ar(t, r ? _e(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= i ? s : o;
  } : function(o) {
    for (var a = parseFloat(s ? o.x : o), l = parseFloat(s ? o.y : 0), u = Ot, f = 0, h = e.length, d, c; h--; )
      s ? (d = e[h].x - a, c = e[h].y - l, d = d * d + c * c) : d = Math.abs(e[h] - a), d < u && (u = d, f = h);
    return f = !i || u <= i ? e[f] : o, s || f === o || or(o) ? f : f + He(o);
  } : js(e));
}, Rl = function(e, t, r, i) {
  return Ar(Ue(e) ? !t : r === !0 ? !!(r = 0) : !i, function() {
    return Ue(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) * r * i) / i;
  });
}, hc = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(i) {
    return t.reduce(function(s, o) {
      return o(s);
    }, i);
  };
}, _c = function(e, t) {
  return function(r) {
    return e(parseFloat(r)) + (t || He(r));
  };
}, dc = function(e, t, r) {
  return Fl(e, t, 0, 1, r);
}, zl = function(e, t, r) {
  return Ar(r, function(i) {
    return e[~~t(i)];
  });
}, pc = function n(e, t, r) {
  var i = t - e;
  return Ue(e) ? zl(e, n(0, e.length), t) : Ar(r, function(s) {
    return (i + (s - e) % i) % i + e;
  });
}, gc = function n(e, t, r) {
  var i = t - e, s = i * 2;
  return Ue(e) ? zl(e, n(0, e.length - 1), t) : Ar(r, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > i ? s - o : o);
  });
}, hn = function(e) {
  for (var t = 0, r = "", i, s, o, a; ~(i = e.indexOf("random(", t)); )
    o = e.indexOf(")", i), a = e.charAt(i + 7) === "[", s = e.substr(i + 7, o - i - 7).match(a ? gl : Vs), r += e.substr(t, i - t) + Rl(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5), t = o + 1;
  return r + e.substr(t, e.length - t);
}, Fl = function(e, t, r, i, s) {
  var o = t - e, a = i - r;
  return Ar(s, function(l) {
    return r + ((l - e) / o * a || 0);
  });
}, mc = function n(e, t, r, i) {
  var s = isNaN(e + t) ? 0 : function(c) {
    return (1 - c) * e + c * t;
  };
  if (!s) {
    var o = De(e), a = {}, l, u, f, h, d;
    if (r === !0 && (i = 1) && (r = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (Ue(e) && !Ue(t)) {
      for (f = [], h = e.length, d = h - 2, u = 1; u < h; u++)
        f.push(n(e[u - 1], e[u]));
      h--, s = function(p) {
        p *= h;
        var _ = Math.min(d, ~~p);
        return f[_](p - _);
      }, r = t;
    } else
      i || (e = ei(Ue(e) ? [] : {}, e));
    if (!f) {
      for (l in t)
        Po.call(a, e, l, "get", t[l]);
      s = function(p) {
        return Eo(p, a) || (o ? e.p : e);
      };
    }
  }
  return Ar(r, s);
}, la = function(e, t, r) {
  var i = e.labels, s = Ot, o, a, l;
  for (o in i)
    a = i[o] - t, a < 0 == !!r && a && s > (a = Math.abs(a)) && (l = o, s = a);
  return l;
}, bt = function(e, t, r) {
  var i = e.vars, s = i[t], o = oe, a = e._ctx, l, u, f;
  if (s)
    return l = i[t + "Params"], u = i.callbackScope || e, r && Tr.length && Gn(), a && (oe = a), f = l ? s.apply(u, l) : s.call(u), oe = o, f;
}, Xi = function(e) {
  return Or(e), e.scrollTrigger && e.scrollTrigger.kill(!!We), e.progress() < 1 && bt(e, "onInterrupt"), e;
}, gi, Ll = [], Il = function(e) {
  if (e)
    if (e = !e.name && e.default || e, xo() || e.headless) {
      var t = e.name, r = _e(e), i = t && !r && e.init ? function() {
        this._props = [];
      } : e, s = {
        init: cn,
        render: Eo,
        add: Po,
        kill: Rc,
        modifier: Dc,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Mo,
        aliases: {},
        register: 0
      };
      if (Ei(), e !== i) {
        if (yt[t])
          return;
        At(i, At(jn(e, s), o)), ei(i.prototype, ei(s, jn(e, o))), yt[i.prop = t] = i, e.targetTest && (Nn.push(i), To[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      vl(t, i), e.register && e.register(ct, i, ut);
    } else
      Ll.push(e);
}, ee = 255, Hi = {
  aqua: [0, ee, ee],
  lime: [0, ee, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ee],
  navy: [0, 0, 128],
  white: [ee, ee, ee],
  olive: [128, 128, 0],
  yellow: [ee, ee, 0],
  orange: [ee, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ee, 0, 0],
  pink: [ee, 192, 203],
  cyan: [0, ee, ee],
  transparent: [ee, ee, ee, 0]
}, ys = function(e, t, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * ee + 0.5 | 0;
}, Nl = function(e, t, r) {
  var i = e ? or(e) ? [e >> 16, e >> 8 & ee, e & ee] : 0 : Hi.black, s, o, a, l, u, f, h, d, c, p;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Hi[e])
      i = Hi[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), a = e.charAt(3), e = "#" + s + s + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & ee, i & ee, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & ee, e & ee];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = p = e.match(Vs), !t)
        l = +i[0] % 360 / 360, u = +i[1] / 100, f = +i[2] / 100, o = f <= 0.5 ? f * (u + 1) : f + u - f * u, s = f * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = ys(l + 1 / 3, s, o), i[1] = ys(l, s, o), i[2] = ys(l - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return i = e.match(dl), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(Vs) || Hi.transparent;
    i = i.map(Number);
  }
  return t && !p && (s = i[0] / ee, o = i[1] / ee, a = i[2] / ee, h = Math.max(s, o, a), d = Math.min(s, o, a), f = (h + d) / 2, h === d ? l = u = 0 : (c = h - d, u = f > 0.5 ? c / (2 - h - d) : c / (h + d), l = h === s ? (o - a) / c + (o < a ? 6 : 0) : h === o ? (a - s) / c + 2 : (s - o) / c + 4, l *= 60), i[0] = ~~(l + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(f * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, Bl = function(e) {
  var t = [], r = [], i = -1;
  return e.split(Sr).forEach(function(s) {
    var o = s.match(pi) || [];
    t.push.apply(t, o), r.push(i += o.length + 1);
  }), t.c = r, t;
}, ua = function(e, t, r) {
  var i = "", s = (e + i).match(Sr), o = t ? "hsla(" : "rgba(", a = 0, l, u, f, h;
  if (!s)
    return e;
  if (s = s.map(function(d) {
    return (d = Nl(d, t, 1)) && o + (t ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), r && (f = Bl(e), l = r.c, l.join(i) !== f.c.join(i)))
    for (u = e.replace(Sr, "1").split(pi), h = u.length - 1; a < h; a++)
      i += u[a] + (~l.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (f.length ? f : s.length ? s : r).shift());
  if (!u)
    for (u = e.split(Sr), h = u.length - 1; a < h; a++)
      i += u[a] + s[a];
  return i + u[h];
}, Sr = function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Hi)
    n += "|" + e + "\\b";
  return new RegExp(n + ")", "gi");
}(), yc = /hsl[a]?\(/, $l = function(e) {
  var t = e.join(" "), r;
  if (Sr.lastIndex = 0, Sr.test(t))
    return r = yc.test(t), e[1] = ua(e[1], r), e[0] = ua(e[0], r, Bl(e[1])), !0;
}, _n, vt = function() {
  var n = Date.now, e = 500, t = 33, r = n(), i = r, s = 1e3 / 240, o = s, a = [], l, u, f, h, d, c, p = function _(m) {
    var w = n() - i, b = m === !0, P, x, S, C;
    if ((w > e || w < 0) && (r += w - t), i += w, S = i - r, P = S - o, (P > 0 || b) && (C = ++h.frame, d = S - h.time * 1e3, h.time = S = S / 1e3, o += P + (P >= s ? 4 : s - P), x = 1), b || (l = u(_)), x)
      for (c = 0; c < a.length; c++)
        a[c](S, d, C, m);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return d / (1e3 / (m || 60));
    },
    wake: function() {
      ml && (!Xs && xo() && (Ht = Xs = window, bo = Ht.document || {}, Tt.gsap = ct, (Ht.gsapVersions || (Ht.gsapVersions = [])).push(ct.version), yl(qn || Ht.GreenSockGlobals || !Ht.gsap && Ht || {}), Ll.forEach(Il)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && h.sleep(), u = f || function(m) {
        return setTimeout(m, o - h.time * 1e3 + 1 | 0);
      }, _n = 1, p(2));
    },
    sleep: function() {
      (f ? cancelAnimationFrame : clearTimeout)(l), _n = 0, u = cn;
    },
    lagSmoothing: function(m, w) {
      e = m || 1 / 0, t = Math.min(w || 33, e);
    },
    fps: function(m) {
      s = 1e3 / (m || 240), o = h.time * 1e3 + s;
    },
    add: function(m, w, b) {
      var P = w ? function(x, S, C, y) {
        m(x, S, C, y), h.remove(P);
      } : m;
      return h.remove(m), a[b ? "unshift" : "push"](P), Ei(), P;
    },
    remove: function(m, w) {
      ~(w = a.indexOf(m)) && a.splice(w, 1) && c >= w && c--;
    },
    _listeners: a
  }, h;
}(), Ei = function() {
  return !_n && vt.wake();
}, j = {}, vc = /^[\d.\-M][\d.\-,\s]/, xc = /["']/g, bc = function(e) {
  for (var t = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], s = 1, o = r.length, a, l, u; s < o; s++)
    l = r[s], a = s !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), t[i] = isNaN(u) ? u.replace(xc, "").trim() : +u, i = l.substr(a + 1).trim();
  return t;
}, wc = function(e) {
  var t = e.indexOf("(") + 1, r = e.indexOf(")"), i = e.indexOf("(", t);
  return e.substring(t, ~i && i < r ? e.indexOf(")", r + 1) : r);
}, Tc = function(e) {
  var t = (e + "").split("("), r = j[t[0]];
  return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [bc(t[1])] : wc(e).split(",").map(Tl)) : j._CE && vc.test(e) ? j._CE("", e) : r;
}, Yl = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Vl = function n(e, t) {
  for (var r = e._first, i; r; )
    r instanceof rt ? n(r, t) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== t && (r.timeline ? n(r.timeline, t) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = t)), r = r._next;
}, jr = function(e, t) {
  return e && (_e(e) ? e : j[e] || Tc(e)) || t;
}, si = function(e, t, r, i) {
  r === void 0 && (r = function(l) {
    return 1 - t(1 - l);
  }), i === void 0 && (i = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var s = {
    easeIn: t,
    easeOut: r,
    easeInOut: i
  }, o;
  return lt(e, function(a) {
    j[a] = Tt[a] = s, j[o = a.toLowerCase()] = r;
    for (var l in s)
      j[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = j[a + "." + l] = s[l];
  }), s;
}, Xl = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, vs = function n(e, t, r) {
  var i = t >= 1 ? t : 1, s = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = s / Ys * (Math.asin(1 / i) || 0), a = function(f) {
    return f === 1 ? 1 : i * Math.pow(2, -10 * f) * Qf((f - o) * s) + 1;
  }, l = e === "out" ? a : e === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Xl(a);
  return s = Ys / s, l.config = function(u, f) {
    return n(e, u, f);
  }, l;
}, xs = function n(e, t) {
  t === void 0 && (t = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, i = e === "out" ? r : e === "in" ? function(s) {
    return 1 - r(1 - s);
  } : Xl(r);
  return i.config = function(s) {
    return n(e, s);
  }, i;
};
lt("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, e) {
  var t = e < 5 ? e + 1 : e;
  si(n + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, t);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2;
  });
});
j.Linear.easeNone = j.none = j.Linear.easeIn;
si("Elastic", vs("in"), vs("out"), vs());
(function(n, e) {
  var t = 1 / e, r = 2 * t, i = 2.5 * t, s = function(a) {
    return a < t ? n * a * a : a < r ? n * Math.pow(a - 1.5 / e, 2) + 0.75 : a < i ? n * (a -= 2.25 / e) * a + 0.9375 : n * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  si("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
si("Expo", function(n) {
  return n ? Math.pow(2, 10 * (n - 1)) : 0;
});
si("Circ", function(n) {
  return -(hl(1 - n * n) - 1);
});
si("Sine", function(n) {
  return n === 1 ? 1 : -Kf(n * Gf) + 1;
});
si("Back", xs("in"), xs("out"), xs());
j.SteppedEase = j.steps = Tt.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e, i = e + (t ? 0 : 1), s = t ? 1 : 0, o = 1 - te;
    return function(a) {
      return ((i * vn(0, o, a) | 0) + s) * r;
    };
  }
};
Ci.ease = j["quad.out"];
lt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return So += n + "," + n + "Params,";
});
var Hl = function(e, t) {
  this.id = jf++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : bl, this.set = t ? t.getSetter : Mo;
}, dn = /* @__PURE__ */ function() {
  function n(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Mi(this, +t.duration, 1, 1), this.data = t.data, oe && (this._ctx = oe, oe.data.push(this)), _n || vt.wake();
  }
  var e = n.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Mi(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, i) {
    if (Ei(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (fs(this, r), !s._dp || s.parent || Pl(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ut(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === te || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), wl(this, r, i)), this;
  }, e.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + oa(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, e.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + oa(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, i) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, i) : this._repeat ? Oi(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -te ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? Kn(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -te ? 0 : this._rts, this.totalTime(vn(-Math.abs(this._delay), this._tDur, s), i !== !1), us(this), nc(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ei(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== te && (this._tTime -= te)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Ut(i, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (at(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Kn(i.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = ec);
    var i = We;
    return We = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), We = i, this;
  }, e.globalTime = function(r) {
    for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
      s = i._start + s / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, aa(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, aa(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, i) {
    return this.totalTime(kt(this, r), at(i));
  }, e.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, at(i));
  }, e.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, e.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -te : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -te, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, i = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= i && s < this.endTime(!0) - te);
  }, e.eventCallback = function(r, i, s) {
    var o = this.vars;
    return arguments.length > 1 ? (i ? (o[r] = i, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var i = this;
    return new Promise(function(s) {
      var o = _e(r) ? r : Sl, a = function() {
        var u = i.then;
        i.then = null, _e(o) && (o = o(i)) && (o.then || o === i) && (i.then = u), s(o), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? a() : i._prom = a;
    });
  }, e.kill = function() {
    Xi(this);
  }, n;
}();
At(dn.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -te,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var rt = /* @__PURE__ */ function(n) {
  cl(e, n);
  function e(r, i) {
    var s;
    return r === void 0 && (r = {}), s = n.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = at(r.sortChildren), ue && Ut(r.parent || ue, tr(s), i), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && Cl(tr(s), r.scrollTrigger), s;
  }
  var t = e.prototype;
  return t.to = function(i, s, o) {
    return Qi(0, arguments, this), this;
  }, t.from = function(i, s, o) {
    return Qi(1, arguments, this), this;
  }, t.fromTo = function(i, s, o, a) {
    return Qi(2, arguments, this), this;
  }, t.set = function(i, s, o) {
    return s.duration = 0, s.parent = this, Ki(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new Te(i, s, kt(this, o), 1), this;
  }, t.call = function(i, s, o) {
    return Ut(this, Te.delayedCall(0, i, s), o);
  }, t.staggerTo = function(i, s, o, a, l, u, f) {
    return o.duration = s, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = f, o.parent = this, new Te(i, o, kt(this, l)), this;
  }, t.staggerFrom = function(i, s, o, a, l, u, f) {
    return o.runBackwards = 1, Ki(o).immediateRender = at(o.immediateRender), this.staggerTo(i, s, o, a, l, u, f);
  }, t.staggerFromTo = function(i, s, o, a, l, u, f, h) {
    return a.startAt = o, Ki(a).immediateRender = at(a.immediateRender), this.staggerTo(i, s, a, l, u, f, h);
  }, t.render = function(i, s, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = i <= 0 ? 0 : Ae(i), h = this._zTime < 0 != i < 0 && (this._initted || !u), d, c, p, _, m, w, b, P, x, S, C, y;
    if (this !== ue && f > l && i >= 0 && (f = l), f !== this._tTime || o || h) {
      if (a !== this._time && u && (f += this._time - a, i += this._time - a), d = f, x = this._start, P = this._ts, w = !P, h && (u || (a = this._zTime), (i || !s) && (this._zTime = i)), this._repeat) {
        if (C = this._yoyo, m = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(m * 100 + i, s, o);
        if (d = Ae(f % m), f === l ? (_ = this._repeat, d = u) : (_ = ~~(f / m), _ && _ === f / m && (d = u, _--), d > u && (d = u)), S = Oi(this._tTime, m), !a && this._tTime && S !== _ && this._tTime - S * m - this._dur <= 0 && (S = _), C && _ & 1 && (d = u - d, y = 1), _ !== S && !this._lock) {
          var O = C && S & 1, T = O === (C && _ & 1);
          if (_ < S && (O = !O), a = O ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (y ? 0 : Ae(_ * m)), s, !u)._lock = 0, this._tTime = f, !s && this.parent && bt(this, "onRepeat"), this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, T && (this._lock = 2, a = O ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !y && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          Vl(this, y);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (b = lc(this, Ae(a), Ae(d)), b && (f -= d - (d = b._start))), this._tTime = f, this._time = d, this._act = !P, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, a = 0), !a && d && !s && !_ && (bt(this, "onStart"), this._tTime !== f))
        return this;
      if (d >= a && i >= 0)
        for (c = this._first; c; ) {
          if (p = c._next, (c._act || d >= c._start) && c._ts && b !== c) {
            if (c.parent !== this)
              return this.render(i, s, o);
            if (c.render(c._ts > 0 ? (d - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (d - c._start) * c._ts, s, o), d !== this._time || !this._ts && !w) {
              b = 0, p && (f += this._zTime = -te);
              break;
            }
          }
          c = p;
        }
      else {
        c = this._last;
        for (var k = i < 0 ? i : d; c; ) {
          if (p = c._prev, (c._act || k <= c._end) && c._ts && b !== c) {
            if (c.parent !== this)
              return this.render(i, s, o);
            if (c.render(c._ts > 0 ? (k - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (k - c._start) * c._ts, s, o || We && (c._initted || c._startAt)), d !== this._time || !this._ts && !w) {
              b = 0, p && (f += this._zTime = k ? -te : te);
              break;
            }
          }
          c = p;
        }
      }
      if (b && !s && (this.pause(), b.render(d >= a ? 0 : -te)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = x, us(this), this.render(i, s, o);
      this._onUpdate && !s && bt(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && a) && (x === this._start || Math.abs(P) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && Or(this, 1), !s && !(i < 0 && !a) && (f || a || !l) && (bt(this, f === l && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(i, s) {
    var o = this;
    if (or(s) || (s = kt(this, s, i)), !(i instanceof dn)) {
      if (Ue(i))
        return i.forEach(function(a) {
          return o.add(a, s);
        }), this;
      if (De(i))
        return this.addLabel(i, s);
      if (_e(i))
        i = Te.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Ut(this, i, s) : this;
  }, t.getChildren = function(i, s, o, a) {
    i === void 0 && (i = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), a === void 0 && (a = -Ot);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof Te ? s && l.push(u) : (o && l.push(u), i && l.push.apply(l, u.getChildren(!0, s, o)))), u = u._next;
    return l;
  }, t.getById = function(i) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === i)
        return s[o];
  }, t.remove = function(i) {
    return De(i) ? this.removeLabel(i) : _e(i) ? this.killTweensOf(i) : (ls(this, i), i === this._recent && (this._recent = this._last), Gr(this));
  }, t.totalTime = function(i, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ae(vt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, s), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(i, s) {
    return this.labels[i] = kt(this, s), this;
  }, t.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, t.addPause = function(i, s, o) {
    var a = Te.delayedCall(0, s || cn, o);
    return a.data = "isPause", this._hasPause = 1, Ut(this, a, kt(this, i));
  }, t.removePause = function(i) {
    var s = this._first;
    for (i = kt(this, i); s; )
      s._start === i && s.data === "isPause" && Or(s), s = s._next;
  }, t.killTweensOf = function(i, s, o) {
    for (var a = this.getTweensOf(i, o), l = a.length; l--; )
      yr !== a[l] && a[l].kill(i, s);
    return this;
  }, t.getTweensOf = function(i, s) {
    for (var o = [], a = Mt(i), l = this._first, u = or(s), f; l; )
      l instanceof Te ? tc(l._targets, a) && (u ? (!yr || l._initted && l._ts) && l.globalTime(0) <= s && l.globalTime(l.totalDuration()) > s : !s || l.isActive()) && o.push(l) : (f = l.getTweensOf(a, s)).length && o.push.apply(o, f), l = l._next;
    return o;
  }, t.tweenTo = function(i, s) {
    s = s || {};
    var o = this, a = kt(o, i), l = s, u = l.startAt, f = l.onStart, h = l.onStartParams, d = l.immediateRender, c, p = Te.to(o, At({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || te,
      onStart: function() {
        if (o.pause(), !c) {
          var m = s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          p._dur !== m && Mi(p, m, 0, 1).render(p._time, !0, !0), c = 1;
        }
        f && f.apply(p, h || []);
      }
    }, s));
    return d ? p.render(0) : p;
  }, t.tweenFromTo = function(i, s, o) {
    return this.tweenTo(s, At({
      startAt: {
        time: kt(this, i)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(i) {
    return i === void 0 && (i = this._time), la(this, kt(this, i));
  }, t.previousLabel = function(i) {
    return i === void 0 && (i = this._time), la(this, kt(this, i), 1);
  }, t.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + te);
  }, t.shiftChildren = function(i, s, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, u; a; )
      a._start >= o && (a._start += i, a._end += i), a = a._next;
    if (s)
      for (u in l)
        l[u] >= o && (l[u] += i);
    return Gr(this);
  }, t.invalidate = function(i) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(i), s = s._next;
    return n.prototype.invalidate.call(this, i);
  }, t.clear = function(i) {
    i === void 0 && (i = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Gr(this);
  }, t.totalDuration = function(i) {
    var s = 0, o = this, a = o._last, l = Ot, u, f, h;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (h = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), f = a._start, f > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Ut(o, a, f - a._delay, 1)._lock = 0) : l = f, f < 0 && a._ts && (s -= f, (!h && !o._dp || h && h.smoothChildTiming) && (o._start += f / o._ts, o._time -= f, o._tTime -= f), o.shiftChildren(-f, !1, -1 / 0), l = 0), a._end > s && a._ts && (s = a._end), a = u;
      Mi(o, o === ue && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(i) {
    if (ue._ts && (wl(ue, Kn(i, ue)), xl = vt.frame), vt.frame >= na) {
      na += wt.autoSleep || 120;
      var s = ue._first;
      if ((!s || !s._ts) && wt.autoSleep && vt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || vt.sleep();
      }
    }
  }, e;
}(dn);
At(rt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Sc = function(e, t, r, i, s, o, a) {
  var l = new ut(this._pt, e, t, 0, 1, Kl, null, s), u = 0, f = 0, h, d, c, p, _, m, w, b;
  for (l.b = r, l.e = i, r += "", i += "", (w = ~i.indexOf("random(")) && (i = hn(i)), o && (b = [r, i], o(b, e, t), r = b[0], i = b[1]), d = r.match(gs) || []; h = gs.exec(i); )
    p = h[0], _ = i.substring(u, h.index), c ? c = (c + 1) % 5 : _.substr(-5) === "rgba(" && (c = 1), p !== d[f++] && (m = parseFloat(d[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: _ || f === 1 ? _ : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? vi(m, p) - m : parseFloat(p) - m,
      m: c && c < 4 ? Math.round : 0
    }, u = gs.lastIndex);
  return l.c = u < i.length ? i.substring(u, i.length) : "", l.fp = a, (pl.test(i) || w) && (l.e = 0), this._pt = l, l;
}, Po = function(e, t, r, i, s, o, a, l, u, f) {
  _e(i) && (i = i(s || 0, e, o));
  var h = e[t], d = r !== "get" ? r : _e(h) ? u ? e[t.indexOf("set") || !_e(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](u) : e[t]() : h, c = _e(h) ? u ? Mc : Gl : Oo, p;
  if (De(i) && (~i.indexOf("random(") && (i = hn(i)), i.charAt(1) === "=" && (p = vi(d, i) + (He(d) || 0), (p || p === 0) && (i = p))), !f || d !== i || Ks)
    return !isNaN(d * i) && i !== "" ? (p = new ut(this._pt, e, t, +d || 0, i - (d || 0), typeof h == "boolean" ? Ac : jl, 0, c), u && (p.fp = u), a && p.modifier(a, this, e), this._pt = p) : (!h && !(t in e) && wo(t, i), Sc.call(this, e, t, d, i, c, l || wt.stringFilter, u));
}, kc = function(e, t, r, i, s) {
  if (_e(e) && (e = Zi(e, s, t, r, i)), !Qt(e) || e.style && e.nodeType || Ue(e) || _l(e))
    return De(e) ? Zi(e, s, t, r, i) : e;
  var o = {}, a;
  for (a in e)
    o[a] = Zi(e[a], s, t, r, i);
  return o;
}, Wl = function(e, t, r, i, s, o) {
  var a, l, u, f;
  if (yt[e] && (a = new yt[e]()).init(s, a.rawVars ? t[e] : kc(t[e], i, s, o, r), r, i, o) !== !1 && (r._pt = l = new ut(r._pt, s, e, 0, 1, a.render, a, 0, a.priority), r !== gi))
    for (u = r._ptLookup[r._targets.indexOf(s)], f = a._props.length; f--; )
      u[a._props[f]] = l;
  return a;
}, yr, Ks, Co = function n(e, t, r) {
  var i = e.vars, s = i.ease, o = i.startAt, a = i.immediateRender, l = i.lazy, u = i.onUpdate, f = i.runBackwards, h = i.yoyoEase, d = i.keyframes, c = i.autoRevert, p = e._dur, _ = e._startAt, m = e._targets, w = e.parent, b = w && w.data === "nested" ? w.vars.targets : m, P = e._overwrite === "auto" && !yo, x = e.timeline, S, C, y, O, T, k, D, M, F, I, N, W, L;
  if (x && (!d || !s) && (s = "none"), e._ease = jr(s, Ci.ease), e._yEase = h ? Yl(jr(h === !0 ? s : h, Ci.ease)) : 0, h && e._yoyo && !e._repeat && (h = e._yEase, e._yEase = e._ease, e._ease = h), e._from = !x && !!i.runBackwards, !x || d && !i.stagger) {
    if (M = m[0] ? qr(m[0]).harness : 0, W = M && i[M.prop], S = jn(i, To), _ && (_._zTime < 0 && _.progress(1), t < 0 && f && a && !c ? _.render(-1, !0) : _.revert(f && p ? In : Jf), _._lazy = 0), o) {
      if (Or(e._startAt = Te.set(m, At({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !_ && at(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return bt(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (We || !a && !c) && e._startAt.revert(In), a && p && t <= 0 && r <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (f && p && !_) {
      if (t && (a = !1), y = At({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !_ && at(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, S), W && (y[M.prop] = W), Or(e._startAt = Te.set(m, y)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (We ? e._startAt.revert(In) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        n(e._startAt, te, te);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = p && at(l) || l && !p, C = 0; C < m.length; C++) {
      if (T = m[C], D = T._gsap || ko(m)[C]._gsap, e._ptLookup[C] = I = {}, Hs[D.id] && Tr.length && Gn(), N = b === m ? C : b.indexOf(T), M && (F = new M()).init(T, W || S, e, N, b) !== !1 && (e._pt = O = new ut(e._pt, T, F.name, 0, 1, F.render, F, 0, F.priority), F._props.forEach(function(K) {
        I[K] = O;
      }), F.priority && (k = 1)), !M || W)
        for (y in S)
          yt[y] && (F = Wl(y, S, e, N, T, b)) ? F.priority && (k = 1) : I[y] = O = Po.call(e, T, y, "get", S[y], N, b, 0, i.stringFilter);
      e._op && e._op[C] && e.kill(T, e._op[C]), P && e._pt && (yr = e, ue.killTweensOf(T, I, e.globalTime(t)), L = !e.parent, yr = 0), e._pt && l && (Hs[D.id] = 1);
    }
    k && Ql(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !L, d && t <= 0 && x.render(Ot, !0, !0);
}, Pc = function(e, t, r, i, s, o, a, l) {
  var u = (e._pt && e._ptCache || (e._ptCache = {}))[t], f, h, d, c;
  if (!u)
    for (u = e._ptCache[t] = [], d = e._ptLookup, c = e._targets.length; c--; ) {
      if (f = d[c][t], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== t && f.fp !== t; )
          f = f._next;
      if (!f)
        return Ks = 1, e.vars[t] = "+=0", Co(e, a), Ks = 0, l ? fn(t + " not eligible for reset") : 1;
      u.push(f);
    }
  for (c = u.length; c--; )
    h = u[c], f = h._pt || h, f.s = (i || i === 0) && !s ? i : f.s + (i || 0) + o * f.c, f.c = r - f.s, h.e && (h.e = me(r) + He(h.e)), h.b && (h.b = f.s + He(h.b));
}, Cc = function(e, t) {
  var r = e[0] ? qr(e[0]).harness : 0, i = r && r.aliases, s, o, a, l;
  if (!i)
    return t;
  s = ei({}, t);
  for (o in i)
    if (o in s)
      for (l = i[o].split(","), a = l.length; a--; )
        s[l[a]] = s[o];
  return s;
}, Oc = function(e, t, r, i) {
  var s = t.ease || i || "power1.inOut", o, a;
  if (Ue(t))
    a = r[e] || (r[e] = []), t.forEach(function(l, u) {
      return a.push({
        t: u / (t.length - 1) * 100,
        v: l,
        e: s
      });
    });
  else
    for (o in t)
      a = r[o] || (r[o] = []), o === "ease" || a.push({
        t: parseFloat(e),
        v: t[o],
        e: s
      });
}, Zi = function(e, t, r, i, s) {
  return _e(e) ? e.call(t, r, i, s) : De(e) && ~e.indexOf("random(") ? hn(e) : e;
}, Ul = So + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", ql = {};
lt(Ul + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return ql[n] = 1;
});
var Te = /* @__PURE__ */ function(n) {
  cl(e, n);
  function e(r, i, s, o) {
    var a;
    typeof i == "number" && (s.duration = i, i = s, s = null), a = n.call(this, o ? i : Ki(i)) || this;
    var l = a.vars, u = l.duration, f = l.delay, h = l.immediateRender, d = l.stagger, c = l.overwrite, p = l.keyframes, _ = l.defaults, m = l.scrollTrigger, w = l.yoyoEase, b = i.parent || ue, P = (Ue(r) || _l(r) ? or(r[0]) : "length" in i) ? [r] : Mt(r), x, S, C, y, O, T, k, D;
    if (a._targets = P.length ? ko(P) : fn("GSAP target " + r + " not found. https://gsap.com", !wt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = c, p || d || Tn(u) || Tn(f)) {
      if (i = a.vars, x = a.timeline = new rt({
        data: "nested",
        defaults: _ || {},
        targets: b && b.data === "nested" ? b.vars.targets : P
      }), x.kill(), x.parent = x._dp = tr(a), x._start = 0, d || Tn(u) || Tn(f)) {
        if (y = P.length, k = d && Al(d), Qt(d))
          for (O in d)
            ~Ul.indexOf(O) && (D || (D = {}), D[O] = d[O]);
        for (S = 0; S < y; S++)
          C = jn(i, ql), C.stagger = 0, w && (C.yoyoEase = w), D && ei(C, D), T = P[S], C.duration = +Zi(u, tr(a), S, T, P), C.delay = (+Zi(f, tr(a), S, T, P) || 0) - a._delay, !d && y === 1 && C.delay && (a._delay = f = C.delay, a._start += f, C.delay = 0), x.to(T, C, k ? k(S, T, P) : 0), x._ease = j.none;
        x.duration() ? u = f = 0 : a.timeline = 0;
      } else if (p) {
        Ki(At(x.vars.defaults, {
          ease: "none"
        })), x._ease = jr(p.ease || i.ease || "none");
        var M = 0, F, I, N;
        if (Ue(p))
          p.forEach(function(W) {
            return x.to(P, W, ">");
          }), x.duration();
        else {
          C = {};
          for (O in p)
            O === "ease" || O === "easeEach" || Oc(O, p[O], C, p.easeEach);
          for (O in C)
            for (F = C[O].sort(function(W, L) {
              return W.t - L.t;
            }), M = 0, S = 0; S < F.length; S++)
              I = F[S], N = {
                ease: I.e,
                duration: (I.t - (S ? F[S - 1].t : 0)) / 100 * u
              }, N[O] = I.v, x.to(P, N, M), M += N.duration;
          x.duration() < u && x.to({}, {
            duration: u - x.duration()
          });
        }
      }
      u || a.duration(u = x.duration());
    } else
      a.timeline = 0;
    return c === !0 && !yo && (yr = tr(a), ue.killTweensOf(P), yr = 0), Ut(b, tr(a), s), i.reversed && a.reverse(), i.paused && a.paused(!0), (h || !u && !p && a._start === Ae(b._time) && at(h) && sc(tr(a)) && b.data !== "nested") && (a._tTime = -te, a.render(Math.max(0, -f) || 0)), m && Cl(tr(a), m), a;
  }
  var t = e.prototype;
  return t.render = function(i, s, o) {
    var a = this._time, l = this._tDur, u = this._dur, f = i < 0, h = i > l - te && !f ? l : i < te ? 0 : i, d, c, p, _, m, w, b, P, x;
    if (!u)
      ac(this, i, s, o);
    else if (h !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (d = h, P = this.timeline, this._repeat) {
        if (_ = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(_ * 100 + i, s, o);
        if (d = Ae(h % _), h === l ? (p = this._repeat, d = u) : (p = ~~(h / _), p && p === Ae(h / _) && (d = u, p--), d > u && (d = u)), w = this._yoyo && p & 1, w && (x = this._yEase, d = u - d), m = Oi(this._tTime, _), d === a && !o && this._initted && p === m)
          return this._tTime = h, this;
        p !== m && (P && this._yEase && Vl(P, w), this.vars.repeatRefresh && !w && !this._lock && this._time !== _ && this._initted && (this._lock = o = 1, this.render(Ae(_ * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Ol(this, f ? i : d, o, s, h))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && p !== m))
          return this;
        if (u !== this._dur)
          return this.render(i, s, o);
      }
      if (this._tTime = h, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = b = (x || this._ease)(d / u), this._from && (this.ratio = b = 1 - b), d && !a && !s && !p && (bt(this, "onStart"), this._tTime !== h))
        return this;
      for (c = this._pt; c; )
        c.r(b, c.d), c = c._next;
      P && P.render(i < 0 ? i : P._dur * P._ease(d / this._dur), s, o) || this._startAt && (this._zTime = i), this._onUpdate && !s && (f && Ws(this, i, s, o), bt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !s && this.parent && bt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (f && !this._onUpdate && Ws(this, i, !0, !0), (i || !u) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && Or(this, 1), !s && !(f && !a) && (h || a || w) && (bt(this, h === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, t.resetTo = function(i, s, o, a, l) {
    _n || vt.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || Co(this, u), f = this._ease(u / this._dur), Pc(this, i, s, o, a, f, u, l) ? this.resetTo(i, s, o, a, 1) : (fs(this, 0), this.parent || kl(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(i, s) {
    if (s === void 0 && (s = "all"), !i && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? Xi(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, s, yr && yr.vars.overwrite !== !0)._first || Xi(this), this.parent && o !== this.timeline.totalDuration() && Mi(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = i ? Mt(i) : a, u = this._ptLookup, f = this._pt, h, d, c, p, _, m, w;
    if ((!s || s === "all") && ic(a, l))
      return s === "all" && (this._pt = 0), Xi(this);
    for (h = this._op = this._op || [], s !== "all" && (De(s) && (_ = {}, lt(s, function(b) {
      return _[b] = 1;
    }), s = _), s = Cc(a, s)), w = a.length; w--; )
      if (~l.indexOf(a[w])) {
        d = u[w], s === "all" ? (h[w] = s, p = d, c = {}) : (c = h[w] = h[w] || {}, p = s);
        for (_ in p)
          m = d && d[_], m && ((!("kill" in m.d) || m.d.kill(_) === !0) && ls(this, m, "_pt"), delete d[_]), c !== "all" && (c[_] = 1);
      }
    return this._initted && !this._pt && f && Xi(this), this;
  }, e.to = function(i, s) {
    return new e(i, s, arguments[2]);
  }, e.from = function(i, s) {
    return Qi(1, arguments);
  }, e.delayedCall = function(i, s, o, a) {
    return new e(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, e.fromTo = function(i, s, o) {
    return Qi(2, arguments);
  }, e.set = function(i, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(i, s);
  }, e.killTweensOf = function(i, s, o) {
    return ue.killTweensOf(i, s, o);
  }, e;
}(dn);
At(Te.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
lt("staggerTo,staggerFrom,staggerFromTo", function(n) {
  Te[n] = function() {
    var e = new rt(), t = qs.call(arguments, 0);
    return t.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), e[n].apply(e, t);
  };
});
var Oo = function(e, t, r) {
  return e[t] = r;
}, Gl = function(e, t, r) {
  return e[t](r);
}, Mc = function(e, t, r, i) {
  return e[t](i.fp, r);
}, Ec = function(e, t, r) {
  return e.setAttribute(t, r);
}, Mo = function(e, t) {
  return _e(e[t]) ? Gl : vo(e[t]) && e.setAttribute ? Ec : Oo;
}, jl = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Ac = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Kl = function(e, t) {
  var r = t._pt, i = "";
  if (!e && t.b)
    i = t.b;
  else if (e === 1 && t.e)
    i = t.e;
  else {
    for (; r; )
      i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + i, r = r._next;
    i += t.c;
  }
  t.set(t.t, t.p, i, t);
}, Eo = function(e, t) {
  for (var r = t._pt; r; )
    r.r(e, r.d), r = r._next;
}, Dc = function(e, t, r, i) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === i && s.modifier(e, t, r), s = o;
}, Rc = function(e) {
  for (var t = this._pt, r, i; t; )
    i = t._next, t.p === e && !t.op || t.op === e ? ls(this, t, "_pt") : t.dep || (r = 1), t = i;
  return !r;
}, zc = function(e, t, r, i) {
  i.mSet(e, t, i.m.call(i.tween, r, i.mt), i);
}, Ql = function(e) {
  for (var t = e._pt, r, i, s, o; t; ) {
    for (r = t._next, i = s; i && i.pr > t.pr; )
      i = i._next;
    (t._prev = i ? i._prev : o) ? t._prev._next = t : s = t, (t._next = i) ? i._prev = t : o = t, t = r;
  }
  e._pt = s;
}, ut = /* @__PURE__ */ function() {
  function n(t, r, i, s, o, a, l, u, f) {
    this.t = r, this.s = s, this.c = o, this.p = i, this.r = a || jl, this.d = l || this, this.set = u || Oo, this.pr = f || 0, this._next = t, t && (t._prev = this);
  }
  var e = n.prototype;
  return e.modifier = function(r, i, s) {
    this.mSet = this.mSet || this.set, this.set = zc, this.m = r, this.mt = s, this.tween = i;
  }, n;
}();
lt(So + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return To[n] = 1;
});
Tt.TweenMax = Tt.TweenLite = Te;
Tt.TimelineLite = Tt.TimelineMax = rt;
ue = new rt({
  sortChildren: !1,
  defaults: Ci,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
wt.stringFilter = $l;
var Kr = [], Bn = {}, Fc = [], fa = 0, Lc = 0, bs = function(e) {
  return (Bn[e] || Fc).map(function(t) {
    return t();
  });
}, Qs = function() {
  var e = Date.now(), t = [];
  e - fa > 2 && (bs("matchMediaInit"), Kr.forEach(function(r) {
    var i = r.queries, s = r.conditions, o, a, l, u;
    for (a in i)
      o = Ht.matchMedia(i[a]).matches, o && (l = 1), o !== s[a] && (s[a] = o, u = 1);
    u && (r.revert(), l && t.push(r));
  }), bs("matchMediaRevert"), t.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), fa = e, bs("matchMedia"));
}, Zl = /* @__PURE__ */ function() {
  function n(t, r) {
    this.selector = r && Gs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Lc++, t && this.add(t);
  }
  var e = n.prototype;
  return e.add = function(r, i, s) {
    _e(r) && (s = i, i = r, r = _e);
    var o = this, a = function() {
      var u = oe, f = o.selector, h;
      return u && u !== o && u.data.push(o), s && (o.selector = Gs(s)), oe = o, h = i.apply(o, arguments), _e(h) && o._r.push(h), oe = u, o.selector = f, o.isReverted = !1, h;
    };
    return o.last = a, r === _e ? a(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = a : a;
  }, e.ignore = function(r) {
    var i = oe;
    oe = null, r(this), oe = i;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof Te && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, i) {
    var s = this;
    if (r ? function() {
      for (var a = s.getTweens(), l = s.data.length, u; l--; )
        u = s.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(f) {
          return a.splice(a.indexOf(f), 1);
        }));
      for (a.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, h) {
        return h.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(r);
      }), l = s.data.length; l--; )
        u = s.data[l], u instanceof rt ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof Te) && u.revert && u.revert(r);
      s._r.forEach(function(f) {
        return f(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), i)
      for (var o = Kr.length; o--; )
        Kr[o].id === this.id && Kr.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, n;
}(), Ic = /* @__PURE__ */ function() {
  function n(t) {
    this.contexts = [], this.scope = t, oe && oe.data.push(this);
  }
  var e = n.prototype;
  return e.add = function(r, i, s) {
    Qt(r) || (r = {
      matches: r
    });
    var o = new Zl(0, s || this.scope), a = o.conditions = {}, l, u, f;
    oe && !o.selector && (o.selector = oe.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
    for (u in r)
      u === "all" ? f = 1 : (l = Ht.matchMedia(r[u]), l && (Kr.indexOf(o) < 0 && Kr.push(o), (a[u] = l.matches) && (f = 1), l.addListener ? l.addListener(Qs) : l.addEventListener("change", Qs)));
    return f && i(o, function(h) {
      return o.add(null, h);
    }), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(i) {
      return i.kill(r, !0);
    });
  }, n;
}(), Qn = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    t.forEach(function(i) {
      return Il(i);
    });
  },
  timeline: function(e) {
    return new rt(e);
  },
  getTweensOf: function(e, t) {
    return ue.getTweensOf(e, t);
  },
  getProperty: function(e, t, r, i) {
    De(e) && (e = Mt(e)[0]);
    var s = qr(e || {}).get, o = r ? Sl : Tl;
    return r === "native" && (r = ""), e && (t ? o((yt[t] && yt[t].get || s)(e, t, r, i)) : function(a, l, u) {
      return o((yt[a] && yt[a].get || s)(e, a, l, u));
    });
  },
  quickSetter: function(e, t, r) {
    if (e = Mt(e), e.length > 1) {
      var i = e.map(function(f) {
        return ct.quickSetter(f, t, r);
      }), s = i.length;
      return function(f) {
        for (var h = s; h--; )
          i[h](f);
      };
    }
    e = e[0] || {};
    var o = yt[t], a = qr(e), l = a.harness && (a.harness.aliases || {})[t] || t, u = o ? function(f) {
      var h = new o();
      gi._pt = 0, h.init(e, r ? f + r : f, gi, 0, [e]), h.render(1, h), gi._pt && Eo(1, gi);
    } : a.set(e, l);
    return o ? u : function(f) {
      return u(e, l, r ? f + r : f, a, 1);
    };
  },
  quickTo: function(e, t, r) {
    var i, s = ct.to(e, ei((i = {}, i[t] = "+=0.1", i.paused = !0, i), r || {})), o = function(l, u, f) {
      return s.resetTo(t, l, u, f);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return ue.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = jr(e.ease, Ci.ease)), sa(Ci, e || {});
  },
  config: function(e) {
    return sa(wt, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, r = e.effect, i = e.plugins, s = e.defaults, o = e.extendTimeline;
    (i || "").split(",").forEach(function(a) {
      return a && !yt[a] && !Tt[a] && fn(t + " effect requires " + a + " plugin.");
    }), ms[t] = function(a, l, u) {
      return r(Mt(a), At(l || {}, s), u);
    }, o && (rt.prototype[t] = function(a, l, u) {
      return this.add(ms[t](a, Qt(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(e, t) {
    j[e] = jr(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? jr(e, t) : j;
  },
  getById: function(e) {
    return ue.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var r = new rt(e), i, s;
    for (r.smoothChildTiming = at(e.smoothChildTiming), ue.remove(r), r._dp = 0, r._time = r._tTime = ue._time, i = ue._first; i; )
      s = i._next, (t || !(!i._dur && i instanceof Te && i.vars.onComplete === i._targets[0])) && Ut(r, i, i._start - i._delay), i = s;
    return Ut(ue, r, 0), r;
  },
  context: function(e, t) {
    return e ? new Zl(e, t) : oe;
  },
  matchMedia: function(e) {
    return new Ic(e);
  },
  matchMediaRefresh: function() {
    return Kr.forEach(function(e) {
      var t = e.conditions, r, i;
      for (i in t)
        t[i] && (t[i] = !1, r = 1);
      r && e.revert();
    }) || Qs();
  },
  addEventListener: function(e, t) {
    var r = Bn[e] || (Bn[e] = []);
    ~r.indexOf(t) || r.push(t);
  },
  removeEventListener: function(e, t) {
    var r = Bn[e], i = r && r.indexOf(t);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: pc,
    wrapYoyo: gc,
    distribute: Al,
    random: Rl,
    snap: Dl,
    normalize: dc,
    getUnit: He,
    clamp: fc,
    splitColor: Nl,
    toArray: Mt,
    selector: Gs,
    mapRange: Fl,
    pipe: hc,
    unitize: _c,
    interpolate: mc,
    shuffle: El
  },
  install: yl,
  effects: ms,
  ticker: vt,
  updateRoot: rt.updateRoot,
  plugins: yt,
  globalTimeline: ue,
  core: {
    PropTween: ut,
    globals: vl,
    Tween: Te,
    Timeline: rt,
    Animation: dn,
    getCache: qr,
    _removeLinkedListItem: ls,
    reverting: function() {
      return We;
    },
    context: function(e) {
      return e && oe && (oe.data.push(e), e._ctx = oe), oe;
    },
    suppressOverwrites: function(e) {
      return yo = e;
    }
  }
};
lt("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return Qn[n] = Te[n];
});
vt.add(rt.updateRoot);
gi = Qn.to({}, {
  duration: 0
});
var Nc = function(e, t) {
  for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
    r = r._next;
  return r;
}, Bc = function(e, t) {
  var r = e._targets, i, s, o;
  for (i in t)
    for (s = r.length; s--; )
      o = e._ptLookup[s][i], o && (o = o.d) && (o._pt && (o = Nc(o, i)), o && o.modifier && o.modifier(t[i], e, r[s], i));
}, ws = function(e, t) {
  return {
    name: e,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, s, o) {
      o._onInit = function(a) {
        var l, u;
        if (De(s) && (l = {}, lt(s, function(f) {
          return l[f] = 1;
        }), s = l), t) {
          l = {};
          for (u in s)
            l[u] = t(s[u]);
          s = l;
        }
        Bc(a, s);
      };
    }
  };
}, ct = Qn.registerPlugin({
  name: "attr",
  init: function(e, t, r, i, s) {
    var o, a, l;
    this.tween = r;
    for (o in t)
      l = e.getAttribute(o) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[o], i, s, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var r = t._pt; r; )
      We ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  init: function(e, t) {
    for (var r = t.length; r--; )
      this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
  }
}, ws("roundProps", js), ws("modifiers"), ws("snap", Dl)) || Qn;
Te.version = rt.version = ct.version = "3.12.5";
ml = 1;
xo() && Ei();
j.Power0;
j.Power1;
j.Power2;
j.Power3;
j.Power4;
j.Linear;
j.Quad;
j.Cubic;
j.Quart;
j.Quint;
j.Strong;
j.Elastic;
j.Back;
j.SteppedEase;
j.Bounce;
j.Sine;
j.Expo;
j.Circ;
/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var ca, vr, xi, Ao, Xr, ha, Do, $c = function() {
  return typeof window < "u";
}, ar = {}, $r = 180 / Math.PI, bi = Math.PI / 180, fi = Math.atan2, _a = 1e8, Ro = /([A-Z])/g, Yc = /(left|right|width|margin|padding|x)/i, Vc = /[\s,\(]\S/, qt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Zs = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Xc = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Hc = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Wc = function(e, t) {
  var r = t.s + t.c * e;
  t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
}, Jl = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, eu = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, Uc = function(e, t, r) {
  return e.style[t] = r;
}, qc = function(e, t, r) {
  return e.style.setProperty(t, r);
}, Gc = function(e, t, r) {
  return e._gsap[t] = r;
}, jc = function(e, t, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, Kc = function(e, t, r, i, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, Qc = function(e, t, r, i, s) {
  var o = e._gsap;
  o[t] = r, o.renderTransform(s, o);
}, fe = "transform", ft = fe + "Origin", Zc = function n(e, t) {
  var r = this, i = this.target, s = i.style, o = i._gsap;
  if (e in ar && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = qt[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return r.tfm[a] = rr(i, a);
      }) : this.tfm[e] = o.x ? o[e] : rr(i, e), e === ft && (this.tfm.zOrigin = o.zOrigin);
    else
      return qt.transform.split(",").forEach(function(a) {
        return n.call(r, a, t);
      });
    if (this.props.indexOf(fe) >= 0)
      return;
    o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(ft, t, "")), e = fe;
  }
  (s || t) && this.props.push(e, t, s[e]);
}, tu = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Jc = function() {
  var e = this.props, t = this.target, r = t.style, i = t._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? t[e[s]] = e[s + 2] : e[s + 2] ? r[e[s]] = e[s + 2] : r.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(Ro, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      i[o] = this.tfm[o];
    i.svg && (i.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), s = Do(), (!s || !s.isStart) && !r[fe] && (tu(r), i.zOrigin && r[ft] && (r[ft] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, ru = function(e, t) {
  var r = {
    target: e,
    props: [],
    revert: Jc,
    save: Zc
  };
  return e._gsap || ct.core.getCache(e), t && t.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, iu, Js = function(e, t) {
  var r = vr.createElementNS ? vr.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : vr.createElement(e);
  return r && r.style ? r : vr.createElement(e);
}, jt = function n(e, t, r) {
  var i = getComputedStyle(e);
  return i[t] || i.getPropertyValue(t.replace(Ro, "-$1").toLowerCase()) || i.getPropertyValue(t) || !r && n(e, Ai(t) || t, 1) || "";
}, da = "O,Moz,ms,Ms,Webkit".split(","), Ai = function(e, t, r) {
  var i = t || Xr, s = i.style, o = 5;
  if (e in s && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(da[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? da[o] : "") + e;
}, eo = function() {
  $c() && window.document && (ca = window, vr = ca.document, xi = vr.documentElement, Xr = Js("div") || {
    style: {}
  }, Js("div"), fe = Ai(fe), ft = fe + "Origin", Xr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", iu = !!Ai("perspective"), Do = ct.core.reverting, Ao = 1);
}, Ts = function n(e) {
  var t = Js("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, i = this.nextSibling, s = this.style.cssText, o;
  if (xi.appendChild(t), t.appendChild(this), this.style.display = "block", e)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = n;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), xi.removeChild(t), this.style.cssText = s, o;
}, pa = function(e, t) {
  for (var r = t.length; r--; )
    if (e.hasAttribute(t[r]))
      return e.getAttribute(t[r]);
}, nu = function(e) {
  var t;
  try {
    t = e.getBBox();
  } catch {
    t = Ts.call(e, !0);
  }
  return t && (t.width || t.height) || e.getBBox === Ts || (t = Ts.call(e, !0)), t && !t.width && !t.x && !t.y ? {
    x: +pa(e, ["x", "cx", "x1"]) || 0,
    y: +pa(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, su = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && nu(e));
}, ti = function(e, t) {
  if (t) {
    var r = e.style, i;
    t in ar && t !== ft && (t = fe), r.removeProperty ? (i = t.substr(0, 2), (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(i === "--" ? t : t.replace(Ro, "-$1").toLowerCase())) : r.removeAttribute(t);
  }
}, xr = function(e, t, r, i, s, o) {
  var a = new ut(e._pt, t, r, 0, 1, o ? eu : Jl);
  return e._pt = a, a.b = i, a.e = s, e._props.push(r), a;
}, ga = {
  deg: 1,
  rad: 1,
  turn: 1
}, eh = {
  grid: 1,
  flex: 1
}, Mr = function n(e, t, r, i) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", a = Xr.style, l = Yc.test(t), u = e.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), h = 100, d = i === "px", c = i === "%", p, _, m, w;
  if (i === o || !s || ga[i] || ga[o])
    return s;
  if (o !== "px" && !d && (s = n(e, t, r, "px")), w = e.getCTM && su(e), (c || o === "%") && (ar[t] || ~t.indexOf("adius")))
    return p = w ? e.getBBox()[l ? "width" : "height"] : e[f], me(c ? s / p * h : s / 100 * p);
  if (a[l ? "width" : "height"] = h + (d ? o : i), _ = ~t.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, w && (_ = (e.ownerSVGElement || {}).parentNode), (!_ || _ === vr || !_.appendChild) && (_ = vr.body), m = _._gsap, m && c && m.width && l && m.time === vt.time && !m.uncache)
    return me(s / m.width * h);
  if (c && (t === "height" || t === "width")) {
    var b = e.style[t];
    e.style[t] = h + i, p = e[f], b ? e.style[t] = b : ti(e, t);
  } else
    (c || o === "%") && !eh[jt(_, "display")] && (a.position = jt(e, "position")), _ === e && (a.position = "static"), _.appendChild(Xr), p = Xr[f], _.removeChild(Xr), a.position = "absolute";
  return l && c && (m = qr(_), m.time = vt.time, m.width = _[f]), me(d ? p * s / h : p && s ? h / p * s : 0);
}, rr = function(e, t, r, i) {
  var s;
  return Ao || eo(), t in qt && t !== "transform" && (t = qt[t], ~t.indexOf(",") && (t = t.split(",")[0])), ar[t] && t !== "transform" ? (s = gn(e, i), s = t !== "transformOrigin" ? s[t] : s.svg ? s.origin : Jn(jt(e, ft)) + " " + s.zOrigin + "px") : (s = e.style[t], (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) && (s = Zn[t] && Zn[t](e, t, r) || jt(e, t) || bl(e, t) || (t === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? Mr(e, t, s, r) + r : s;
}, th = function(e, t, r, i) {
  if (!r || r === "none") {
    var s = Ai(t, e, 1), o = s && jt(e, s, 1);
    o && o !== r ? (t = s, r = o) : t === "borderColor" && (r = jt(e, "borderTopColor"));
  }
  var a = new ut(this._pt, e.style, t, 0, 1, Kl), l = 0, u = 0, f, h, d, c, p, _, m, w, b, P, x, S;
  if (a.b = r, a.e = i, r += "", i += "", i === "auto" && (_ = e.style[t], e.style[t] = i, i = jt(e, t) || i, _ ? e.style[t] = _ : ti(e, t)), f = [r, i], $l(f), r = f[0], i = f[1], d = r.match(pi) || [], S = i.match(pi) || [], S.length) {
    for (; h = pi.exec(i); )
      m = h[0], b = i.substring(l, h.index), p ? p = (p + 1) % 5 : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (p = 1), m !== (_ = d[u++] || "") && (c = parseFloat(_) || 0, x = _.substr((c + "").length), m.charAt(1) === "=" && (m = vi(c, m) + x), w = parseFloat(m), P = m.substr((w + "").length), l = pi.lastIndex - P.length, P || (P = P || wt.units[t] || x, l === i.length && (i += P, a.e += P)), x !== P && (c = Mr(e, t, _, P) || 0), a._pt = {
        _next: a._pt,
        p: b || u === 1 ? b : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: c,
        c: w - c,
        m: p && p < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = l < i.length ? i.substring(l, i.length) : "";
  } else
    a.r = t === "display" && i === "none" ? eu : Jl;
  return pl.test(i) && (a.e = 0), this._pt = a, a;
}, ma = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, rh = function(e) {
  var t = e.split(" "), r = t[0], i = t[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), t[0] = ma[r] || r, t[1] = ma[i] || i, t.join(" ");
}, ih = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var r = t.t, i = r.style, s = t.u, o = r._gsap, a, l, u;
    if (s === "all" || s === !0)
      i.cssText = "", l = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        a = s[u], ar[a] && (l = 1, a = a === "transformOrigin" ? ft : fe), ti(r, a);
    l && (ti(r, fe), o && (o.svg && r.removeAttribute("transform"), gn(r, 1), o.uncache = 1, tu(i)));
  }
}, Zn = {
  clearProps: function(e, t, r, i, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new ut(e._pt, t, r, 0, 0, ih);
      return o.u = i, o.pr = -10, o.tween = s, e._props.push(r), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, pn = [1, 0, 0, 1, 0, 0], ou = {}, au = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, ya = function(e) {
  var t = jt(e, fe);
  return au(t) ? pn : t.substr(7).match(dl).map(me);
}, zo = function(e, t) {
  var r = e._gsap || qr(e), i = e.style, s = ya(e), o, a, l, u;
  return r.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, s = [l.a, l.b, l.c, l.d, l.e, l.f], s.join(",") === "1,0,0,1,0,0" ? pn : s) : (s === pn && !e.offsetParent && e !== xi && !r.svg && (l = i.display, i.display = "block", o = e.parentNode, (!o || !e.offsetParent) && (u = 1, a = e.nextElementSibling, xi.appendChild(e)), s = ya(e), l ? i.display = l : ti(e, "display"), u && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : xi.removeChild(e))), t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, to = function(e, t, r, i, s, o) {
  var a = e._gsap, l = s || zo(e, !0), u = a.xOrigin || 0, f = a.yOrigin || 0, h = a.xOffset || 0, d = a.yOffset || 0, c = l[0], p = l[1], _ = l[2], m = l[3], w = l[4], b = l[5], P = t.split(" "), x = parseFloat(P[0]) || 0, S = parseFloat(P[1]) || 0, C, y, O, T;
  r ? l !== pn && (y = c * m - p * _) && (O = x * (m / y) + S * (-_ / y) + (_ * b - m * w) / y, T = x * (-p / y) + S * (c / y) - (c * b - p * w) / y, x = O, S = T) : (C = nu(e), x = C.x + (~P[0].indexOf("%") ? x / 100 * C.width : x), S = C.y + (~(P[1] || P[0]).indexOf("%") ? S / 100 * C.height : S)), i || i !== !1 && a.smooth ? (w = x - u, b = S - f, a.xOffset = h + (w * c + b * _) - w, a.yOffset = d + (w * p + b * m) - b) : a.xOffset = a.yOffset = 0, a.xOrigin = x, a.yOrigin = S, a.smooth = !!i, a.origin = t, a.originIsAbsolute = !!r, e.style[ft] = "0px 0px", o && (xr(o, a, "xOrigin", u, x), xr(o, a, "yOrigin", f, S), xr(o, a, "xOffset", h, a.xOffset), xr(o, a, "yOffset", d, a.yOffset)), e.setAttribute("data-svg-origin", x + " " + S);
}, gn = function(e, t) {
  var r = e._gsap || new Hl(e);
  if ("x" in r && !t && !r.uncache)
    return r;
  var i = e.style, s = r.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(e), u = jt(e, ft) || "0", f, h, d, c, p, _, m, w, b, P, x, S, C, y, O, T, k, D, M, F, I, N, W, L, K, re, g, ie, qe, Dt, ce, Re;
  return f = h = d = _ = m = w = b = P = x = 0, c = p = 1, r.svg = !!(e.getCTM && su(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (i[fe] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[fe] !== "none" ? l[fe] : "")), i.scale = i.rotate = i.translate = "none"), y = zo(e, r.svg), r.svg && (r.uncache ? (K = e.getBBox(), u = r.xOrigin - K.x + "px " + (r.yOrigin - K.y) + "px", L = "") : L = !t && e.getAttribute("data-svg-origin"), to(e, L || u, !!L || r.originIsAbsolute, r.smooth !== !1, y)), S = r.xOrigin || 0, C = r.yOrigin || 0, y !== pn && (D = y[0], M = y[1], F = y[2], I = y[3], f = N = y[4], h = W = y[5], y.length === 6 ? (c = Math.sqrt(D * D + M * M), p = Math.sqrt(I * I + F * F), _ = D || M ? fi(M, D) * $r : 0, b = F || I ? fi(F, I) * $r + _ : 0, b && (p *= Math.abs(Math.cos(b * bi))), r.svg && (f -= S - (S * D + C * F), h -= C - (S * M + C * I))) : (Re = y[6], Dt = y[7], g = y[8], ie = y[9], qe = y[10], ce = y[11], f = y[12], h = y[13], d = y[14], O = fi(Re, qe), m = O * $r, O && (T = Math.cos(-O), k = Math.sin(-O), L = N * T + g * k, K = W * T + ie * k, re = Re * T + qe * k, g = N * -k + g * T, ie = W * -k + ie * T, qe = Re * -k + qe * T, ce = Dt * -k + ce * T, N = L, W = K, Re = re), O = fi(-F, qe), w = O * $r, O && (T = Math.cos(-O), k = Math.sin(-O), L = D * T - g * k, K = M * T - ie * k, re = F * T - qe * k, ce = I * k + ce * T, D = L, M = K, F = re), O = fi(M, D), _ = O * $r, O && (T = Math.cos(O), k = Math.sin(O), L = D * T + M * k, K = N * T + W * k, M = M * T - D * k, W = W * T - N * k, D = L, N = K), m && Math.abs(m) + Math.abs(_) > 359.9 && (m = _ = 0, w = 180 - w), c = me(Math.sqrt(D * D + M * M + F * F)), p = me(Math.sqrt(W * W + Re * Re)), O = fi(N, W), b = Math.abs(O) > 2e-4 ? O * $r : 0, x = ce ? 1 / (ce < 0 ? -ce : ce) : 0), r.svg && (L = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !au(jt(e, fe)), L && e.setAttribute("transform", L))), Math.abs(b) > 90 && Math.abs(b) < 270 && (s ? (c *= -1, b += _ <= 0 ? 180 : -180, _ += _ <= 0 ? 180 : -180) : (p *= -1, b += b <= 0 ? 180 : -180)), t = t || r.uncache, r.x = f - ((r.xPercent = f && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = h - ((r.yPercent = h && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = d + o, r.scaleX = me(c), r.scaleY = me(p), r.rotation = me(_) + a, r.rotationX = me(m) + a, r.rotationY = me(w) + a, r.skewX = b + a, r.skewY = P + a, r.transformPerspective = x + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || !t && r.zOrigin || 0) && (i[ft] = Jn(u)), r.xOffset = r.yOffset = 0, r.force3D = wt.force3D, r.renderTransform = r.svg ? sh : iu ? lu : nh, r.uncache = 0, r;
}, Jn = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Ss = function(e, t, r) {
  var i = He(t);
  return me(parseFloat(t) + parseFloat(Mr(e, "x", r + "px", i))) + i;
}, nh = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, lu(e, t);
}, Nr = "0deg", Bi = "0px", Br = ") ", lu = function(e, t) {
  var r = t || this, i = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.z, u = r.rotation, f = r.rotationY, h = r.rotationX, d = r.skewX, c = r.skewY, p = r.scaleX, _ = r.scaleY, m = r.transformPerspective, w = r.force3D, b = r.target, P = r.zOrigin, x = "", S = w === "auto" && e && e !== 1 || w === !0;
  if (P && (h !== Nr || f !== Nr)) {
    var C = parseFloat(f) * bi, y = Math.sin(C), O = Math.cos(C), T;
    C = parseFloat(h) * bi, T = Math.cos(C), o = Ss(b, o, y * T * -P), a = Ss(b, a, -Math.sin(C) * -P), l = Ss(b, l, O * T * -P + P);
  }
  m !== Bi && (x += "perspective(" + m + Br), (i || s) && (x += "translate(" + i + "%, " + s + "%) "), (S || o !== Bi || a !== Bi || l !== Bi) && (x += l !== Bi || S ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Br), u !== Nr && (x += "rotate(" + u + Br), f !== Nr && (x += "rotateY(" + f + Br), h !== Nr && (x += "rotateX(" + h + Br), (d !== Nr || c !== Nr) && (x += "skew(" + d + ", " + c + Br), (p !== 1 || _ !== 1) && (x += "scale(" + p + ", " + _ + Br), b.style[fe] = x || "translate(0, 0)";
}, sh = function(e, t) {
  var r = t || this, i = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.rotation, u = r.skewX, f = r.skewY, h = r.scaleX, d = r.scaleY, c = r.target, p = r.xOrigin, _ = r.yOrigin, m = r.xOffset, w = r.yOffset, b = r.forceCSS, P = parseFloat(o), x = parseFloat(a), S, C, y, O, T;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= bi, u *= bi, S = Math.cos(l) * h, C = Math.sin(l) * h, y = Math.sin(l - u) * -d, O = Math.cos(l - u) * d, u && (f *= bi, T = Math.tan(u - f), T = Math.sqrt(1 + T * T), y *= T, O *= T, f && (T = Math.tan(f), T = Math.sqrt(1 + T * T), S *= T, C *= T)), S = me(S), C = me(C), y = me(y), O = me(O)) : (S = h, O = d, C = y = 0), (P && !~(o + "").indexOf("px") || x && !~(a + "").indexOf("px")) && (P = Mr(c, "x", o, "px"), x = Mr(c, "y", a, "px")), (p || _ || m || w) && (P = me(P + p - (p * S + _ * y) + m), x = me(x + _ - (p * C + _ * O) + w)), (i || s) && (T = c.getBBox(), P = me(P + i / 100 * T.width), x = me(x + s / 100 * T.height)), T = "matrix(" + S + "," + C + "," + y + "," + O + "," + P + "," + x + ")", c.setAttribute("transform", T), b && (c.style[fe] = T);
}, oh = function(e, t, r, i, s) {
  var o = 360, a = De(s), l = parseFloat(s) * (a && ~s.indexOf("rad") ? $r : 1), u = l - i, f = i + u + "deg", h, d;
  return a && (h = s.split("_")[1], h === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), h === "cw" && u < 0 ? u = (u + o * _a) % o - ~~(u / o) * o : h === "ccw" && u > 0 && (u = (u - o * _a) % o - ~~(u / o) * o)), e._pt = d = new ut(e._pt, t, r, i, u, Xc), d.e = f, d.u = "deg", e._props.push(r), d;
}, va = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, ah = function(e, t, r) {
  var i = va({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, a, l, u, f, h, d, c, p;
  i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[fe] = t, a = gn(r, 1), ti(r, fe), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[fe], o[fe] = t, a = gn(r, 1), o[fe] = u);
  for (l in ar)
    u = i[l], f = a[l], u !== f && s.indexOf(l) < 0 && (c = He(u), p = He(f), h = c !== p ? Mr(r, l, u, p) : parseFloat(u), d = parseFloat(f), e._pt = new ut(e._pt, a, l, h, d - h, Zs), e._pt.u = p || 0, e._props.push(l));
  va(a, i);
};
lt("padding,margin,Width,Radius", function(n, e) {
  var t = "Top", r = "Right", i = "Bottom", s = "Left", o = (e < 3 ? [t, r, i, s] : [t + s, t + r, i + r, i + s]).map(function(a) {
    return e < 2 ? n + a : "border" + a + n;
  });
  Zn[e > 1 ? "border" + n : n] = function(a, l, u, f, h) {
    var d, c;
    if (arguments.length < 4)
      return d = o.map(function(p) {
        return rr(a, p, u);
      }), c = d.join(" "), c.split(d[0]).length === 5 ? d[0] : c;
    d = (f + "").split(" "), c = {}, o.forEach(function(p, _) {
      return c[p] = d[_] = d[_] || d[(_ - 1) / 2 | 0];
    }), a.init(l, c, h);
  };
});
var uu = {
  name: "css",
  register: eo,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, r, i, s) {
    var o = this._props, a = e.style, l = r.vars.startAt, u, f, h, d, c, p, _, m, w, b, P, x, S, C, y, O;
    Ao || eo(), this.styles = this.styles || ru(e), O = this.styles.props, this.tween = r;
    for (_ in t)
      if (_ !== "autoRound" && (f = t[_], !(yt[_] && Wl(_, t, r, i, e, s)))) {
        if (c = typeof f, p = Zn[_], c === "function" && (f = f.call(r, i, e, s), c = typeof f), c === "string" && ~f.indexOf("random(") && (f = hn(f)), p)
          p(this, e, _, f, r) && (y = 1);
        else if (_.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(_) + "").trim(), f += "", Sr.lastIndex = 0, Sr.test(u) || (m = He(u), w = He(f)), w ? m !== w && (u = Mr(e, _, u, w) + w) : m && (f += m), this.add(a, "setProperty", u, f, i, s, 0, 0, _), o.push(_), O.push(_, 0, a[_]);
        else if (c !== "undefined") {
          if (l && _ in l ? (u = typeof l[_] == "function" ? l[_].call(r, i, e, s) : l[_], De(u) && ~u.indexOf("random(") && (u = hn(u)), He(u + "") || u === "auto" || (u += wt.units[_] || He(rr(e, _)) || ""), (u + "").charAt(1) === "=" && (u = rr(e, _))) : u = rr(e, _), d = parseFloat(u), b = c === "string" && f.charAt(1) === "=" && f.substr(0, 2), b && (f = f.substr(2)), h = parseFloat(f), _ in qt && (_ === "autoAlpha" && (d === 1 && rr(e, "visibility") === "hidden" && h && (d = 0), O.push("visibility", 0, a.visibility), xr(this, a, "visibility", d ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), _ !== "scale" && _ !== "transform" && (_ = qt[_], ~_.indexOf(",") && (_ = _.split(",")[0]))), P = _ in ar, P) {
            if (this.styles.save(_), x || (S = e._gsap, S.renderTransform && !t.parseTransform || gn(e, t.parseTransform), C = t.smoothOrigin !== !1 && S.smooth, x = this._pt = new ut(this._pt, a, fe, 0, 1, S.renderTransform, S, 0, -1), x.dep = 1), _ === "scale")
              this._pt = new ut(this._pt, S, "scaleY", S.scaleY, (b ? vi(S.scaleY, b + h) : h) - S.scaleY || 0, Zs), this._pt.u = 0, o.push("scaleY", _), _ += "X";
            else if (_ === "transformOrigin") {
              O.push(ft, 0, a[ft]), f = rh(f), S.svg ? to(e, f, 0, C, 0, this) : (w = parseFloat(f.split(" ")[2]) || 0, w !== S.zOrigin && xr(this, S, "zOrigin", S.zOrigin, w), xr(this, a, _, Jn(u), Jn(f)));
              continue;
            } else if (_ === "svgOrigin") {
              to(e, f, 1, C, 0, this);
              continue;
            } else if (_ in ou) {
              oh(this, S, _, d, b ? vi(d, b + f) : f);
              continue;
            } else if (_ === "smoothOrigin") {
              xr(this, S, "smooth", S.smooth, f);
              continue;
            } else if (_ === "force3D") {
              S[_] = f;
              continue;
            } else if (_ === "transform") {
              ah(this, f, e);
              continue;
            }
          } else
            _ in a || (_ = Ai(_) || _);
          if (P || (h || h === 0) && (d || d === 0) && !Vc.test(f) && _ in a)
            m = (u + "").substr((d + "").length), h || (h = 0), w = He(f) || (_ in wt.units ? wt.units[_] : m), m !== w && (d = Mr(e, _, u, w)), this._pt = new ut(this._pt, P ? S : a, _, d, (b ? vi(d, b + h) : h) - d, !P && (w === "px" || _ === "zIndex") && t.autoRound !== !1 ? Wc : Zs), this._pt.u = w || 0, m !== w && w !== "%" && (this._pt.b = u, this._pt.r = Hc);
          else if (_ in a)
            th.call(this, e, _, u, b ? b + f : f);
          else if (_ in e)
            this.add(e, _, u || e[_], b ? b + f : f, i, s);
          else if (_ !== "parseTransform") {
            wo(_, f);
            continue;
          }
          P || (_ in a ? O.push(_, 0, a[_]) : O.push(_, 1, u || e[_])), o.push(_);
        }
      }
    y && Ql(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Do())
      for (var r = t._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      t.styles.revert();
  },
  get: rr,
  aliases: qt,
  getSetter: function(e, t, r) {
    var i = qt[t];
    return i && i.indexOf(",") < 0 && (t = i), t in ar && t !== ft && (e._gsap.x || rr(e, "x")) ? r && ha === r ? t === "scale" ? jc : Gc : (ha = r || {}) && (t === "scale" ? Kc : Qc) : e.style && !vo(e.style[t]) ? Uc : ~t.indexOf("-") ? qc : Mo(e, t);
  },
  core: {
    _removeProperty: ti,
    _getMatrix: zo
  }
};
ct.utils.checkPrefix = Ai;
ct.core.getStyleSaver = ru;
(function(n, e, t, r) {
  var i = lt(n + "," + e + "," + t, function(s) {
    ar[s] = 1;
  });
  lt(e, function(s) {
    wt.units[s] = "deg", ou[s] = 1;
  }), qt[i[13]] = n + "," + e, lt(r, function(s) {
    var o = s.split(":");
    qt[o[1]] = i[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
lt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  wt.units[n] = "px";
});
ct.registerPlugin(uu);
var gt = ct.registerPlugin(uu) || ct;
gt.core.Tween;
function lh(n) {
  return {
    siteHeader: null,
    menuOpen: !1,
    submenuOpen: !1,
    scrollPosition: 0,
    displayMenu: !0,
    menuIsScrolling: !1,
    toggleMenu() {
      this.menuOpen = !this.menuOpen, this.menuOpen ? document.body.style.overflow = "hidden" : (document.body.style.overflow = "auto", this.closeAllSubmenus());
    },
    scrollEvent(e) {
      this.siteHeader = e, window.addEventListener("scroll", () => {
        window.scrollY > 100 ? (this.menuIsScrolling = !0, window.scrollY < this.scrollPosition ? this.displayMenu !== !0 && this.toggleHeader(e, !0) : this.displayMenu !== !1 && this.toggleHeader(e, !1)) : this.menuIsScrolling = !1, this.scrollPosition = window.scrollY, this.submenuOpen && this.closeAllSubmenus();
      });
    },
    toggleHeader(e, t) {
      this.displayMenu = t, this.displayMenu ? gt.to(e, {
        duration: 0.5,
        y: 0,
        ease: "power2.out"
      }) : gt.to(e, {
        duration: 0.5,
        y: -e.offsetHeight,
        ease: "power2.out"
      });
    },
    toggleSubmenu(e) {
      const t = e.nextElementSibling, r = e.getAttribute("aria-expanded") === "true" || !1;
      if (this.submenuOpen && window.innerWidth >= 1024 && this.closeAllSubmenus(), r)
        this.submenuOpen = !1, t.style.height = 0, t.setAttribute("aria-hidden", !0);
      else {
        this.submenuOpen = !0;
        const i = t.scrollHeight;
        t.style.height = i + "px", t.setAttribute("aria-hidden", !1);
      }
      e.setAttribute("aria-expanded", !r);
    },
    closeAllSubmenus() {
      const e = this.siteHeader.querySelectorAll(".site-header__submenu"), t = this.siteHeader.querySelectorAll(".btn-submenu");
      e.length !== 0 && t.length !== 0 && (e.forEach((r) => {
        r.style.height = 0, r.setAttribute("aria-hidden", !0);
      }), t.forEach((r) => {
        r.setAttribute("aria-expanded", !1);
      }));
    }
  };
}
function xa(n, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
  }
}
function uh(n, e, t) {
  return e && xa(n.prototype, e), t && xa(n, t), n;
}
/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Le, $n, xt, br, wr, wi, fu, Yr, Ji, cu, nr, Bt, hu, _u = function() {
  return Le || typeof window < "u" && (Le = window.gsap) && Le.registerPlugin && Le;
}, du = 1, mi = [], H = [], Kt = [], en = Date.now, ro = function(e, t) {
  return t;
}, fh = function() {
  var e = Ji.core, t = e.bridge || {}, r = e._scrollers, i = e._proxies;
  r.push.apply(r, H), i.push.apply(i, Kt), H = r, Kt = i, ro = function(o, a) {
    return t[o](a);
  };
}, kr = function(e, t) {
  return ~Kt.indexOf(e) && Kt[Kt.indexOf(e) + 1][t];
}, tn = function(e) {
  return !!~cu.indexOf(e);
}, Ze = function(e, t, r, i, s) {
  return e.addEventListener(t, r, {
    passive: i !== !1,
    capture: !!s
  });
}, Qe = function(e, t, r, i) {
  return e.removeEventListener(t, r, !!i);
}, Sn = "scrollLeft", kn = "scrollTop", io = function() {
  return nr && nr.isPressed || H.cache++;
}, es = function(e, t) {
  var r = function i(s) {
    if (s || s === 0) {
      du && (xt.history.scrollRestoration = "manual");
      var o = nr && nr.isPressed;
      s = i.v = Math.round(s) || (nr && nr.iOS ? 1 : 0), e(s), i.cacheID = H.cache, o && ro("ss", s);
    } else
      (t || H.cache !== i.cacheID || ro("ref")) && (i.cacheID = H.cache, i.v = e());
    return i.v + i.offset;
  };
  return r.offset = 0, e && r;
}, it = {
  s: Sn,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: es(function(n) {
    return arguments.length ? xt.scrollTo(n, Pe.sc()) : xt.pageXOffset || br[Sn] || wr[Sn] || wi[Sn] || 0;
  })
}, Pe = {
  s: kn,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: it,
  sc: es(function(n) {
    return arguments.length ? xt.scrollTo(it.sc(), n) : xt.pageYOffset || br[kn] || wr[kn] || wi[kn] || 0;
  })
}, ot = function(e, t) {
  return (t && t._ctx && t._ctx.selector || Le.utils.toArray)(e)[0] || (typeof e == "string" && Le.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Er = function(e, t) {
  var r = t.s, i = t.sc;
  tn(e) && (e = br.scrollingElement || wr);
  var s = H.indexOf(e), o = i === Pe.sc ? 1 : 2;
  !~s && (s = H.push(e) - 1), H[s + o] || Ze(e, "scroll", io);
  var a = H[s + o], l = a || (H[s + o] = es(kr(e, r), !0) || (tn(e) ? i : es(function(u) {
    return arguments.length ? e[r] = u : e[r];
  })));
  return l.target = e, a || (l.smooth = Le.getProperty(e, "scrollBehavior") === "smooth"), l;
}, no = function(e, t, r) {
  var i = e, s = e, o = en(), a = o, l = t || 50, u = Math.max(500, l * 3), f = function(p, _) {
    var m = en();
    _ || m - o > l ? (s = i, i = p, a = o, o = m) : r ? i += p : i = s + (p - s) / (m - a) * (o - a);
  }, h = function() {
    s = i = r ? 0 : i, a = o = 0;
  }, d = function(p) {
    var _ = a, m = s, w = en();
    return (p || p === 0) && p !== i && f(p), o === a || w - a > u ? 0 : (i + (r ? m : -m)) / ((r ? w : o) - _) * 1e3;
  };
  return {
    update: f,
    reset: h,
    getVelocity: d
  };
}, $i = function(e, t) {
  return t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, ba = function(e) {
  var t = Math.max.apply(Math, e), r = Math.min.apply(Math, e);
  return Math.abs(t) >= Math.abs(r) ? t : r;
}, pu = function() {
  Ji = Le.core.globals().ScrollTrigger, Ji && Ji.core && fh();
}, gu = function(e) {
  return Le = e || _u(), !$n && Le && typeof document < "u" && document.body && (xt = window, br = document, wr = br.documentElement, wi = br.body, cu = [xt, br, wr, wi], Le.utils.clamp, hu = Le.core.context || function() {
  }, Yr = "onpointerenter" in wi ? "pointer" : "mouse", fu = ye.isTouch = xt.matchMedia && xt.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in xt || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Bt = ye.eventTypes = ("ontouchstart" in wr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in wr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return du = 0;
  }, 500), pu(), $n = 1), $n;
};
it.op = Pe;
H.cache = 0;
var ye = /* @__PURE__ */ function() {
  function n(t) {
    this.init(t);
  }
  var e = n.prototype;
  return e.init = function(r) {
    $n || gu(Le) || console.warn("Please gsap.registerPlugin(Observer)"), Ji || pu();
    var i = r.tolerance, s = r.dragMinimum, o = r.type, a = r.target, l = r.lineHeight, u = r.debounce, f = r.preventDefault, h = r.onStop, d = r.onStopDelay, c = r.ignore, p = r.wheelSpeed, _ = r.event, m = r.onDragStart, w = r.onDragEnd, b = r.onDrag, P = r.onPress, x = r.onRelease, S = r.onRight, C = r.onLeft, y = r.onUp, O = r.onDown, T = r.onChangeX, k = r.onChangeY, D = r.onChange, M = r.onToggleX, F = r.onToggleY, I = r.onHover, N = r.onHoverEnd, W = r.onMove, L = r.ignoreCheck, K = r.isNormalizer, re = r.onGestureStart, g = r.onGestureEnd, ie = r.onWheel, qe = r.onEnable, Dt = r.onDisable, ce = r.onClick, Re = r.scrollSpeed, Ge = r.capture, ve = r.allowClicks, je = r.lockAxis, Ne = r.onLockAxis;
    this.target = a = ot(a) || wr, this.vars = r, c && (c = Le.utils.toArray(c)), i = i || 1e-9, s = s || 0, p = p || 1, Re = Re || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(xt.getComputedStyle(wi).lineHeight) || 22);
    var lr, Ke, Rt, Q, de, st, ht, v = this, _t = 0, Zt = 0, ur = r.passive || !f, xe = Er(a, it), fr = Er(a, Pe), Dr = xe(), oi = fr(), Ce = ~o.indexOf("touch") && !~o.indexOf("pointer") && Bt[0] === "pointerdown", cr = tn(a), pe = a.ownerDocument || br, zt = [0, 0, 0], St = [0, 0, 0], Jt = 0, Ri = function() {
      return Jt = en();
    }, be = function(z, Z) {
      return (v.event = z) && c && ~c.indexOf(z.target) || Z && Ce && z.pointerType !== "touch" || L && L(z, Z);
    }, xn = function() {
      v._vx.reset(), v._vy.reset(), Ke.pause(), h && h(v);
    }, hr = function() {
      var z = v.deltaX = ba(zt), Z = v.deltaY = ba(St), E = Math.abs(z) >= i, Y = Math.abs(Z) >= i;
      D && (E || Y) && D(v, z, Z, zt, St), E && (S && v.deltaX > 0 && S(v), C && v.deltaX < 0 && C(v), T && T(v), M && v.deltaX < 0 != _t < 0 && M(v), _t = v.deltaX, zt[0] = zt[1] = zt[2] = 0), Y && (O && v.deltaY > 0 && O(v), y && v.deltaY < 0 && y(v), k && k(v), F && v.deltaY < 0 != Zt < 0 && F(v), Zt = v.deltaY, St[0] = St[1] = St[2] = 0), (Q || Rt) && (W && W(v), Rt && (b(v), Rt = !1), Q = !1), st && !(st = !1) && Ne && Ne(v), de && (ie(v), de = !1), lr = 0;
    }, ai = function(z, Z, E) {
      zt[E] += z, St[E] += Z, v._vx.update(z), v._vy.update(Z), u ? lr || (lr = requestAnimationFrame(hr)) : hr();
    }, li = function(z, Z) {
      je && !ht && (v.axis = ht = Math.abs(z) > Math.abs(Z) ? "x" : "y", st = !0), ht !== "y" && (zt[2] += z, v._vx.update(z, !0)), ht !== "x" && (St[2] += Z, v._vy.update(Z, !0)), u ? lr || (lr = requestAnimationFrame(hr)) : hr();
    }, _r = function(z) {
      if (!be(z, 1)) {
        z = $i(z, f);
        var Z = z.clientX, E = z.clientY, Y = Z - v.x, R = E - v.y, B = v.isDragging;
        v.x = Z, v.y = E, (B || Math.abs(v.startX - Z) >= s || Math.abs(v.startY - E) >= s) && (b && (Rt = !0), B || (v.isDragging = !0), li(Y, R), B || m && m(v));
      }
    }, Rr = v.onPress = function($) {
      be($, 1) || $ && $.button || (v.axis = ht = null, Ke.pause(), v.isPressed = !0, $ = $i($), _t = Zt = 0, v.startX = v.x = $.clientX, v.startY = v.y = $.clientY, v._vx.reset(), v._vy.reset(), Ze(K ? a : pe, Bt[1], _r, ur, !0), v.deltaX = v.deltaY = 0, P && P(v));
    }, X = v.onRelease = function($) {
      if (!be($, 1)) {
        Qe(K ? a : pe, Bt[1], _r, !0);
        var z = !isNaN(v.y - v.startY), Z = v.isDragging, E = Z && (Math.abs(v.x - v.startX) > 3 || Math.abs(v.y - v.startY) > 3), Y = $i($);
        !E && z && (v._vx.reset(), v._vy.reset(), f && ve && Le.delayedCall(0.08, function() {
          if (en() - Jt > 300 && !$.defaultPrevented) {
            if ($.target.click)
              $.target.click();
            else if (pe.createEvent) {
              var R = pe.createEvent("MouseEvents");
              R.initMouseEvent("click", !0, !0, xt, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, !1, !1, !1, !1, 0, null), $.target.dispatchEvent(R);
            }
          }
        })), v.isDragging = v.isGesturing = v.isPressed = !1, h && Z && !K && Ke.restart(!0), w && Z && w(v), x && x(v, E);
      }
    }, zr = function(z) {
      return z.touches && z.touches.length > 1 && (v.isGesturing = !0) && re(z, v.isDragging);
    }, Ft = function() {
      return (v.isGesturing = !1) || g(v);
    }, Lt = function(z) {
      if (!be(z)) {
        var Z = xe(), E = fr();
        ai((Z - Dr) * Re, (E - oi) * Re, 1), Dr = Z, oi = E, h && Ke.restart(!0);
      }
    }, It = function(z) {
      if (!be(z)) {
        z = $i(z, f), ie && (de = !0);
        var Z = (z.deltaMode === 1 ? l : z.deltaMode === 2 ? xt.innerHeight : 1) * p;
        ai(z.deltaX * Z, z.deltaY * Z, 0), h && !K && Ke.restart(!0);
      }
    }, Fr = function(z) {
      if (!be(z)) {
        var Z = z.clientX, E = z.clientY, Y = Z - v.x, R = E - v.y;
        v.x = Z, v.y = E, Q = !0, h && Ke.restart(!0), (Y || R) && li(Y, R);
      }
    }, ui = function(z) {
      v.event = z, I(v);
    }, er = function(z) {
      v.event = z, N(v);
    }, zi = function(z) {
      return be(z) || $i(z, f) && ce(v);
    };
    Ke = v._dc = Le.delayedCall(d || 0.25, xn).pause(), v.deltaX = v.deltaY = 0, v._vx = no(0, 50, !0), v._vy = no(0, 50, !0), v.scrollX = xe, v.scrollY = fr, v.isDragging = v.isGesturing = v.isPressed = !1, hu(this), v.enable = function($) {
      return v.isEnabled || (Ze(cr ? pe : a, "scroll", io), o.indexOf("scroll") >= 0 && Ze(cr ? pe : a, "scroll", Lt, ur, Ge), o.indexOf("wheel") >= 0 && Ze(a, "wheel", It, ur, Ge), (o.indexOf("touch") >= 0 && fu || o.indexOf("pointer") >= 0) && (Ze(a, Bt[0], Rr, ur, Ge), Ze(pe, Bt[2], X), Ze(pe, Bt[3], X), ve && Ze(a, "click", Ri, !0, !0), ce && Ze(a, "click", zi), re && Ze(pe, "gesturestart", zr), g && Ze(pe, "gestureend", Ft), I && Ze(a, Yr + "enter", ui), N && Ze(a, Yr + "leave", er), W && Ze(a, Yr + "move", Fr)), v.isEnabled = !0, $ && $.type && Rr($), qe && qe(v)), v;
    }, v.disable = function() {
      v.isEnabled && (mi.filter(function($) {
        return $ !== v && tn($.target);
      }).length || Qe(cr ? pe : a, "scroll", io), v.isPressed && (v._vx.reset(), v._vy.reset(), Qe(K ? a : pe, Bt[1], _r, !0)), Qe(cr ? pe : a, "scroll", Lt, Ge), Qe(a, "wheel", It, Ge), Qe(a, Bt[0], Rr, Ge), Qe(pe, Bt[2], X), Qe(pe, Bt[3], X), Qe(a, "click", Ri, !0), Qe(a, "click", zi), Qe(pe, "gesturestart", zr), Qe(pe, "gestureend", Ft), Qe(a, Yr + "enter", ui), Qe(a, Yr + "leave", er), Qe(a, Yr + "move", Fr), v.isEnabled = v.isPressed = v.isDragging = !1, Dt && Dt(v));
    }, v.kill = v.revert = function() {
      v.disable();
      var $ = mi.indexOf(v);
      $ >= 0 && mi.splice($, 1), nr === v && (nr = 0);
    }, mi.push(v), K && tn(a) && (nr = v), v.enable(_);
  }, uh(n, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), n;
}();
ye.version = "3.12.5";
ye.create = function(n) {
  return new ye(n);
};
ye.register = gu;
ye.getAll = function() {
  return mi.slice();
};
ye.getById = function(n) {
  return mi.filter(function(e) {
    return e.vars.id === n;
  })[0];
};
_u() && Le.registerPlugin(ye);
/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var A, _i, G, le, $t, ne, mu, ts, mn, rn, Wi, Pn, Ve, cs, so, et, wa, Ta, di, yu, ks, vu, Je, oo, xu, bu, gr, ao, Fo, Ti, Lo, rs, lo, Ps, Cn = 1, Xe = Date.now, Cs = Xe(), Et = 0, Ui = 0, Sa = function(e, t, r) {
  var i = mt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return r["_" + t + "Clamp"] = i, i ? e.substr(6, e.length - 7) : e;
}, ka = function(e, t) {
  return t && (!mt(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, ch = function n() {
  return Ui && requestAnimationFrame(n);
}, Pa = function() {
  return cs = 1;
}, Ca = function() {
  return cs = 0;
}, Wt = function(e) {
  return e;
}, qi = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, wu = function() {
  return typeof window < "u";
}, Tu = function() {
  return A || wu() && (A = window.gsap) && A.registerPlugin && A;
}, ri = function(e) {
  return !!~mu.indexOf(e);
}, Su = function(e) {
  return (e === "Height" ? Lo : G["inner" + e]) || $t["client" + e] || ne["client" + e];
}, ku = function(e) {
  return kr(e, "getBoundingClientRect") || (ri(e) ? function() {
    return Wn.width = G.innerWidth, Wn.height = Lo, Wn;
  } : function() {
    return ir(e);
  });
}, hh = function(e, t, r) {
  var i = r.d, s = r.d2, o = r.a;
  return (o = kr(e, "getBoundingClientRect")) ? function() {
    return o()[i];
  } : function() {
    return (t ? Su(s) : e["client" + s]) || 0;
  };
}, _h = function(e, t) {
  return !t || ~Kt.indexOf(e) ? ku(e) : function() {
    return Wn;
  };
}, Gt = function(e, t) {
  var r = t.s, i = t.d2, s = t.d, o = t.a;
  return Math.max(0, (r = "scroll" + i) && (o = kr(e, r)) ? o() - ku(e)()[s] : ri(e) ? ($t[r] || ne[r]) - Su(i) : e[r] - e["offset" + i]);
}, On = function(e, t) {
  for (var r = 0; r < di.length; r += 3)
    (!t || ~t.indexOf(di[r + 1])) && e(di[r], di[r + 1], di[r + 2]);
}, mt = function(e) {
  return typeof e == "string";
}, nt = function(e) {
  return typeof e == "function";
}, Gi = function(e) {
  return typeof e == "number";
}, Vr = function(e) {
  return typeof e == "object";
}, Yi = function(e, t, r) {
  return e && e.progress(t ? 0 : 1) && r && e.pause();
}, Os = function(e, t) {
  if (e.enabled) {
    var r = e._ctx ? e._ctx.add(function() {
      return t(e);
    }) : t(e);
    r && r.totalTime && (e.callbackAnimation = r);
  }
}, ci = Math.abs, Pu = "left", Cu = "top", Io = "right", No = "bottom", Qr = "width", Zr = "height", nn = "Right", sn = "Left", on = "Top", an = "Bottom", we = "padding", Pt = "margin", Di = "Width", Bo = "Height", ke = "px", Ct = function(e) {
  return G.getComputedStyle(e);
}, dh = function(e) {
  var t = Ct(e).position;
  e.style.position = t === "absolute" || t === "fixed" ? t : "relative";
}, Oa = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, ir = function(e, t) {
  var r = t && Ct(e)[so] !== "matrix(1, 0, 0, 1, 0, 0)" && A.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), i = e.getBoundingClientRect();
  return r && r.progress(0).kill(), i;
}, is = function(e, t) {
  var r = t.d2;
  return e["offset" + r] || e["client" + r] || 0;
}, Ou = function(e) {
  var t = [], r = e.labels, i = e.duration(), s;
  for (s in r)
    t.push(r[s] / i);
  return t;
}, ph = function(e) {
  return function(t) {
    return A.utils.snap(Ou(e), t);
  };
}, $o = function(e) {
  var t = A.utils.snap(e), r = Array.isArray(e) && e.slice(0).sort(function(i, s) {
    return i - s;
  });
  return r ? function(i, s, o) {
    o === void 0 && (o = 1e-3);
    var a;
    if (!s)
      return t(i);
    if (s > 0) {
      for (i -= o, a = 0; a < r.length; a++)
        if (r[a] >= i)
          return r[a];
      return r[a - 1];
    } else
      for (a = r.length, i += o; a--; )
        if (r[a] <= i)
          return r[a];
    return r[0];
  } : function(i, s, o) {
    o === void 0 && (o = 1e-3);
    var a = t(i);
    return !s || Math.abs(a - i) < o || a - i < 0 == s < 0 ? a : t(s < 0 ? i - e : i + e);
  };
}, gh = function(e) {
  return function(t, r) {
    return $o(Ou(e))(t, r.direction);
  };
}, Mn = function(e, t, r, i) {
  return r.split(",").forEach(function(s) {
    return e(t, s, i);
  });
}, Ee = function(e, t, r, i, s) {
  return e.addEventListener(t, r, {
    passive: !i,
    capture: !!s
  });
}, Me = function(e, t, r, i) {
  return e.removeEventListener(t, r, !!i);
}, En = function(e, t, r) {
  r = r && r.wheelHandler, r && (e(t, "wheel", r), e(t, "touchmove", r));
}, Ma = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, An = {
  toggleActions: "play",
  anticipatePin: 0
}, ns = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Yn = function(e, t) {
  if (mt(e)) {
    var r = e.indexOf("="), i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
    ~r && (e.indexOf("%") > r && (i *= t / 100), e = e.substr(0, r - 1)), e = i + (e in ns ? ns[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
  }
  return e;
}, Dn = function(e, t, r, i, s, o, a, l) {
  var u = s.startColor, f = s.endColor, h = s.fontSize, d = s.indent, c = s.fontWeight, p = le.createElement("div"), _ = ri(r) || kr(r, "pinType") === "fixed", m = e.indexOf("scroller") !== -1, w = _ ? ne : r, b = e.indexOf("start") !== -1, P = b ? u : f, x = "border-color:" + P + ";font-size:" + h + ";color:" + P + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return x += "position:" + ((m || l) && _ ? "fixed;" : "absolute;"), (m || l || !_) && (x += (i === Pe ? Io : No) + ":" + (o + parseFloat(d)) + "px;"), a && (x += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), p._isStart = b, p.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), p.style.cssText = x, p.innerText = t || t === 0 ? e + "-" + t : e, w.children[0] ? w.insertBefore(p, w.children[0]) : w.appendChild(p), p._offset = p["offset" + i.op.d2], Vn(p, 0, i, b), p;
}, Vn = function(e, t, r, i) {
  var s = {
    display: "block"
  }, o = r[i ? "os2" : "p2"], a = r[i ? "p2" : "os2"];
  e._isFlipped = i, s[r.a + "Percent"] = i ? -100 : 0, s[r.a] = i ? "1px" : 0, s["border" + o + Di] = 1, s["border" + a + Di] = 0, s[r.p] = t + "px", A.set(e, s);
}, V = [], uo = {}, yn, Ea = function() {
  return Xe() - Et > 34 && (yn || (yn = requestAnimationFrame(sr)));
}, hi = function() {
  (!Je || !Je.isPressed || Je.startX > ne.clientWidth) && (H.cache++, Je ? yn || (yn = requestAnimationFrame(sr)) : sr(), Et || ni("scrollStart"), Et = Xe());
}, Ms = function() {
  bu = G.innerWidth, xu = G.innerHeight;
}, ji = function() {
  H.cache++, !Ve && !vu && !le.fullscreenElement && !le.webkitFullscreenElement && (!oo || bu !== G.innerWidth || Math.abs(G.innerHeight - xu) > G.innerHeight * 0.25) && ts.restart(!0);
}, ii = {}, mh = [], Mu = function n() {
  return Me(U, "scrollEnd", n) || Hr(!0);
}, ni = function(e) {
  return ii[e] && ii[e].map(function(t) {
    return t();
  }) || mh;
}, pt = [], Eu = function(e) {
  for (var t = 0; t < pt.length; t += 5)
    (!e || pt[t + 4] && pt[t + 4].query === e) && (pt[t].style.cssText = pt[t + 1], pt[t].getBBox && pt[t].setAttribute("transform", pt[t + 2] || ""), pt[t + 3].uncache = 1);
}, Yo = function(e, t) {
  var r;
  for (et = 0; et < V.length; et++)
    r = V[et], r && (!t || r._ctx === t) && (e ? r.kill(1) : r.revert(!0, !0));
  rs = !0, t && Eu(t), t || ni("revert");
}, Au = function(e, t) {
  H.cache++, (t || !tt) && H.forEach(function(r) {
    return nt(r) && r.cacheID++ && (r.rec = 0);
  }), mt(e) && (G.history.scrollRestoration = Fo = e);
}, tt, Jr = 0, Aa, yh = function() {
  if (Aa !== Jr) {
    var e = Aa = Jr;
    requestAnimationFrame(function() {
      return e === Jr && Hr(!0);
    });
  }
}, Du = function() {
  ne.appendChild(Ti), Lo = !Je && Ti.offsetHeight || G.innerHeight, ne.removeChild(Ti);
}, Da = function(e) {
  return mn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t) {
    return t.style.display = e ? "none" : "block";
  });
}, Hr = function(e, t) {
  if (Et && !e && !rs) {
    Ee(U, "scrollEnd", Mu);
    return;
  }
  Du(), tt = U.isRefreshing = !0, H.forEach(function(i) {
    return nt(i) && ++i.cacheID && (i.rec = i());
  });
  var r = ni("refreshInit");
  yu && U.sort(), t || Yo(), H.forEach(function(i) {
    nt(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), V.slice(0).forEach(function(i) {
    return i.refresh();
  }), rs = !1, V.forEach(function(i) {
    if (i._subPinOffset && i.pin) {
      var s = i.vars.horizontal ? "offsetWidth" : "offsetHeight", o = i.pin[s];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - o), i.refresh();
    }
  }), lo = 1, Da(!0), V.forEach(function(i) {
    var s = Gt(i.scroller, i._dir), o = i.vars.end === "max" || i._endClamp && i.end > s, a = i._startClamp && i.start >= s;
    (o || a) && i.setPositions(a ? s - 1 : i.start, o ? Math.max(a ? s : i.start + 1, s) : i.end, !0);
  }), Da(!1), lo = 0, r.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), H.forEach(function(i) {
    nt(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Au(Fo, 1), ts.pause(), Jr++, tt = 2, sr(2), V.forEach(function(i) {
    return nt(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), tt = U.isRefreshing = !1, ni("refresh");
}, fo = 0, Xn = 1, ln, sr = function(e) {
  if (e === 2 || !tt && !rs) {
    U.isUpdating = !0, ln && ln.update(0);
    var t = V.length, r = Xe(), i = r - Cs >= 50, s = t && V[0].scroll();
    if (Xn = fo > s ? -1 : 1, tt || (fo = s), i && (Et && !cs && r - Et > 200 && (Et = 0, ni("scrollEnd")), Wi = Cs, Cs = r), Xn < 0) {
      for (et = t; et-- > 0; )
        V[et] && V[et].update(0, i);
      Xn = 1;
    } else
      for (et = 0; et < t; et++)
        V[et] && V[et].update(0, i);
    U.isUpdating = !1;
  }
  yn = 0;
}, co = [Pu, Cu, No, Io, Pt + an, Pt + nn, Pt + on, Pt + sn, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Hn = co.concat([Qr, Zr, "boxSizing", "max" + Di, "max" + Bo, "position", Pt, we, we + on, we + nn, we + an, we + sn]), vh = function(e, t, r) {
  Si(r);
  var i = e._gsap;
  if (i.spacerIsNative)
    Si(i.spacerState);
  else if (e._gsap.swappedIn) {
    var s = t.parentNode;
    s && (s.insertBefore(e, t), s.removeChild(t));
  }
  e._gsap.swappedIn = !1;
}, Es = function(e, t, r, i) {
  if (!e._gsap.swappedIn) {
    for (var s = co.length, o = t.style, a = e.style, l; s--; )
      l = co[s], o[l] = r[l];
    o.position = r.position === "absolute" ? "absolute" : "relative", r.display === "inline" && (o.display = "inline-block"), a[No] = a[Io] = "auto", o.flexBasis = r.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[Qr] = is(e, it) + ke, o[Zr] = is(e, Pe) + ke, o[we] = a[Pt] = a[Cu] = a[Pu] = "0", Si(i), a[Qr] = a["max" + Di] = r[Qr], a[Zr] = a["max" + Bo] = r[Zr], a[we] = r[we], e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, xh = /([A-Z])/g, Si = function(e) {
  if (e) {
    var t = e.t.style, r = e.length, i = 0, s, o;
    for ((e.t._gsap || A.core.getCache(e.t)).uncache = 1; i < r; i += 2)
      o = e[i + 1], s = e[i], o ? t[s] = o : t[s] && t.removeProperty(s.replace(xh, "-$1").toLowerCase());
  }
}, Rn = function(e) {
  for (var t = Hn.length, r = e.style, i = [], s = 0; s < t; s++)
    i.push(Hn[s], r[Hn[s]]);
  return i.t = e, i;
}, bh = function(e, t, r) {
  for (var i = [], s = e.length, o = r ? 8 : 0, a; o < s; o += 2)
    a = e[o], i.push(a, a in t ? t[a] : e[o + 1]);
  return i.t = e.t, i;
}, Wn = {
  left: 0,
  top: 0
}, Ra = function(e, t, r, i, s, o, a, l, u, f, h, d, c, p) {
  nt(e) && (e = e(l)), mt(e) && e.substr(0, 3) === "max" && (e = d + (e.charAt(4) === "=" ? Yn("0" + e.substr(3), r) : 0));
  var _ = c ? c.time() : 0, m, w, b;
  if (c && c.seek(0), isNaN(e) || (e = +e), Gi(e))
    c && (e = A.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, e)), a && Vn(a, r, i, !0);
  else {
    nt(t) && (t = t(l));
    var P = (e || "0").split(" "), x, S, C, y;
    b = ot(t, l) || ne, x = ir(b) || {}, (!x || !x.left && !x.top) && Ct(b).display === "none" && (y = b.style.display, b.style.display = "block", x = ir(b), y ? b.style.display = y : b.style.removeProperty("display")), S = Yn(P[0], x[i.d]), C = Yn(P[1] || "0", r), e = x[i.p] - u[i.p] - f + S + s - C, a && Vn(a, C, i, r - C < 20 || a._isStart && C > 20), r -= r - C;
  }
  if (p && (l[p] = e || -1e-3, e < 0 && (e = 0)), o) {
    var O = e + r, T = o._isStart;
    m = "scroll" + i.d2, Vn(o, O, i, T && O > 20 || !T && (h ? Math.max(ne[m], $t[m]) : o.parentNode[m]) <= O + 1), h && (u = ir(a), h && (o.style[i.op.p] = u[i.op.p] - i.op.m - o._offset + ke));
  }
  return c && b && (m = ir(b), c.seek(d), w = ir(b), c._caScrollDist = m[i.p] - w[i.p], e = e / c._caScrollDist * d), c && c.seek(_), c ? e : Math.round(e);
}, wh = /(webkit|moz|length|cssText|inset)/i, za = function(e, t, r, i) {
  if (e.parentNode !== t) {
    var s = e.style, o, a;
    if (t === ne) {
      e._stOrig = s.cssText, a = Ct(e);
      for (o in a)
        !+o && !wh.test(o) && a[o] && typeof s[o] == "string" && o !== "0" && (s[o] = a[o]);
      s.top = r, s.left = i;
    } else
      s.cssText = e._stOrig;
    A.core.getCache(e).uncache = 1, t.appendChild(e);
  }
}, Ru = function(e, t, r) {
  var i = t, s = i;
  return function(o) {
    var a = Math.round(e());
    return a !== i && a !== s && Math.abs(a - i) > 3 && Math.abs(a - s) > 3 && (o = a, r && r()), s = i, i = o, o;
  };
}, zn = function(e, t, r) {
  var i = {};
  i[t.p] = "+=" + r, A.set(e, i);
}, Fa = function(e, t) {
  var r = Er(e, t), i = "_scroll" + t.p2, s = function o(a, l, u, f, h) {
    var d = o.tween, c = l.onComplete, p = {};
    u = u || r();
    var _ = Ru(r, u, function() {
      d.kill(), o.tween = 0;
    });
    return h = f && h || 0, f = f || a - u, d && d.kill(), l[i] = a, l.inherit = !1, l.modifiers = p, p[i] = function() {
      return _(u + f * d.ratio + h * d.ratio * d.ratio);
    }, l.onUpdate = function() {
      H.cache++, o.tween && sr();
    }, l.onComplete = function() {
      o.tween = 0, c && c.call(d);
    }, d = o.tween = A.to(e, l), d;
  };
  return e[i] = r, r.wheelHandler = function() {
    return s.tween && s.tween.kill() && (s.tween = 0);
  }, Ee(e, "wheel", r.wheelHandler), U.isTouch && Ee(e, "touchmove", r.wheelHandler), s;
}, U = /* @__PURE__ */ function() {
  function n(t, r) {
    _i || n.register(A) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), ao(this), this.init(t, r);
  }
  var e = n.prototype;
  return e.init = function(r, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Ui) {
      this.update = this.refresh = this.kill = Wt;
      return;
    }
    r = Oa(mt(r) || Gi(r) || r.nodeType ? {
      trigger: r
    } : r, An);
    var s = r, o = s.onUpdate, a = s.toggleClass, l = s.id, u = s.onToggle, f = s.onRefresh, h = s.scrub, d = s.trigger, c = s.pin, p = s.pinSpacing, _ = s.invalidateOnRefresh, m = s.anticipatePin, w = s.onScrubComplete, b = s.onSnapComplete, P = s.once, x = s.snap, S = s.pinReparent, C = s.pinSpacer, y = s.containerAnimation, O = s.fastScrollEnd, T = s.preventOverlaps, k = r.horizontal || r.containerAnimation && r.horizontal !== !1 ? it : Pe, D = !h && h !== 0, M = ot(r.scroller || G), F = A.core.getCache(M), I = ri(M), N = ("pinType" in r ? r.pinType : kr(M, "pinType") || I && "fixed") === "fixed", W = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack], L = D && r.toggleActions.split(" "), K = "markers" in r ? r.markers : An.markers, re = I ? 0 : parseFloat(Ct(M)["border" + k.p2 + Di]) || 0, g = this, ie = r.onRefreshInit && function() {
      return r.onRefreshInit(g);
    }, qe = hh(M, I, k), Dt = _h(M, I), ce = 0, Re = 0, Ge = 0, ve = Er(M, k), je, Ne, lr, Ke, Rt, Q, de, st, ht, v, _t, Zt, ur, xe, fr, Dr, oi, Ce, cr, pe, zt, St, Jt, Ri, be, xn, hr, ai, li, _r, Rr, X, zr, Ft, Lt, It, Fr, ui, er;
    if (g._startClamp = g._endClamp = !1, g._dir = k, m *= 45, g.scroller = M, g.scroll = y ? y.time.bind(y) : ve, Ke = ve(), g.vars = r, i = i || r.animation, "refreshPriority" in r && (yu = 1, r.refreshPriority === -9999 && (ln = g)), F.tweenScroll = F.tweenScroll || {
      top: Fa(M, Pe),
      left: Fa(M, it)
    }, g.tweenTo = je = F.tweenScroll[k.p], g.scrubDuration = function(E) {
      zr = Gi(E) && E, zr ? X ? X.duration(E) : X = A.to(i, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: zr,
        paused: !0,
        onComplete: function() {
          return w && w(g);
        }
      }) : (X && X.progress(1).kill(), X = 0);
    }, i && (i.vars.lazy = !1, i._initted && !g.isReverted || i.vars.immediateRender !== !1 && r.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), g.animation = i.pause(), i.scrollTrigger = g, g.scrubDuration(h), _r = 0, l || (l = i.vars.id)), x && ((!Vr(x) || x.push) && (x = {
      snapTo: x
    }), "scrollBehavior" in ne.style && A.set(I ? [ne, $t] : M, {
      scrollBehavior: "auto"
    }), H.forEach(function(E) {
      return nt(E) && E.target === (I ? le.scrollingElement || $t : M) && (E.smooth = !1);
    }), lr = nt(x.snapTo) ? x.snapTo : x.snapTo === "labels" ? ph(i) : x.snapTo === "labelsDirectional" ? gh(i) : x.directional !== !1 ? function(E, Y) {
      return $o(x.snapTo)(E, Xe() - Re < 500 ? 0 : Y.direction);
    } : A.utils.snap(x.snapTo), Ft = x.duration || {
      min: 0.1,
      max: 2
    }, Ft = Vr(Ft) ? rn(Ft.min, Ft.max) : rn(Ft, Ft), Lt = A.delayedCall(x.delay || zr / 2 || 0.1, function() {
      var E = ve(), Y = Xe() - Re < 500, R = je.tween;
      if ((Y || Math.abs(g.getVelocity()) < 10) && !R && !cs && ce !== E) {
        var B = (E - Q) / xe, Oe = i && !D ? i.totalProgress() : B, q = Y ? 0 : (Oe - Rr) / (Xe() - Wi) * 1e3 || 0, ge = A.utils.clamp(-B, 1 - B, ci(q / 2) * q / 0.185), Be = B + (x.inertia === !1 ? 0 : ge), he, se, J = x, Nt = J.onStart, ae = J.onInterrupt, dt = J.onComplete;
        if (he = lr(Be, g), Gi(he) || (he = Be), se = Math.round(Q + he * xe), E <= de && E >= Q && se !== E) {
          if (R && !R._initted && R.data <= ci(se - E))
            return;
          x.inertia === !1 && (ge = he - B), je(se, {
            duration: Ft(ci(Math.max(ci(Be - Oe), ci(he - Oe)) * 0.185 / q / 0.05 || 0)),
            ease: x.ease || "power3",
            data: ci(se - E),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Lt.restart(!0) && ae && ae(g);
            },
            onComplete: function() {
              g.update(), ce = ve(), i && (X ? X.resetTo("totalProgress", he, i._tTime / i._tDur) : i.progress(he)), _r = Rr = i && !D ? i.totalProgress() : g.progress, b && b(g), dt && dt(g);
            }
          }, E, ge * xe, se - E - ge * xe), Nt && Nt(g, je.tween);
        }
      } else
        g.isActive && ce !== E && Lt.restart(!0);
    }).pause()), l && (uo[l] = g), d = g.trigger = ot(d || c !== !0 && c), er = d && d._gsap && d._gsap.stRevert, er && (er = er(g)), c = c === !0 ? d : ot(c), mt(a) && (a = {
      targets: d,
      className: a
    }), c && (p === !1 || p === Pt || (p = !p && c.parentNode && c.parentNode.style && Ct(c.parentNode).display === "flex" ? !1 : we), g.pin = c, Ne = A.core.getCache(c), Ne.spacer ? fr = Ne.pinState : (C && (C = ot(C), C && !C.nodeType && (C = C.current || C.nativeElement), Ne.spacerIsNative = !!C, C && (Ne.spacerState = Rn(C))), Ne.spacer = Ce = C || le.createElement("div"), Ce.classList.add("pin-spacer"), l && Ce.classList.add("pin-spacer-" + l), Ne.pinState = fr = Rn(c)), r.force3D !== !1 && A.set(c, {
      force3D: !0
    }), g.spacer = Ce = Ne.spacer, li = Ct(c), Ri = li[p + k.os2], pe = A.getProperty(c), zt = A.quickSetter(c, k.a, ke), Es(c, Ce, li), oi = Rn(c)), K) {
      Zt = Vr(K) ? Oa(K, Ma) : Ma, v = Dn("scroller-start", l, M, k, Zt, 0), _t = Dn("scroller-end", l, M, k, Zt, 0, v), cr = v["offset" + k.op.d2];
      var zi = ot(kr(M, "content") || M);
      st = this.markerStart = Dn("start", l, zi, k, Zt, cr, 0, y), ht = this.markerEnd = Dn("end", l, zi, k, Zt, cr, 0, y), y && (ui = A.quickSetter([st, ht], k.a, ke)), !N && !(Kt.length && kr(M, "fixedMarkers") === !0) && (dh(I ? ne : M), A.set([v, _t], {
        force3D: !0
      }), xn = A.quickSetter(v, k.a, ke), ai = A.quickSetter(_t, k.a, ke));
    }
    if (y) {
      var $ = y.vars.onUpdate, z = y.vars.onUpdateParams;
      y.eventCallback("onUpdate", function() {
        g.update(0, 0, 1), $ && $.apply(y, z || []);
      });
    }
    if (g.previous = function() {
      return V[V.indexOf(g) - 1];
    }, g.next = function() {
      return V[V.indexOf(g) + 1];
    }, g.revert = function(E, Y) {
      if (!Y)
        return g.kill(!0);
      var R = E !== !1 || !g.enabled, B = Ve;
      R !== g.isReverted && (R && (It = Math.max(ve(), g.scroll.rec || 0), Ge = g.progress, Fr = i && i.progress()), st && [st, ht, v, _t].forEach(function(Oe) {
        return Oe.style.display = R ? "none" : "block";
      }), R && (Ve = g, g.update(R)), c && (!S || !g.isActive) && (R ? vh(c, Ce, fr) : Es(c, Ce, Ct(c), be)), R || g.update(R), Ve = B, g.isReverted = R);
    }, g.refresh = function(E, Y, R, B) {
      if (!((Ve || !g.enabled) && !Y)) {
        if (c && E && Et) {
          Ee(n, "scrollEnd", Mu);
          return;
        }
        !tt && ie && ie(g), Ve = g, je.tween && !R && (je.tween.kill(), je.tween = 0), X && X.pause(), _ && i && i.revert({
          kill: !1
        }).invalidate(), g.isReverted || g.revert(!0, !0), g._subPinOffset = !1;
        var Oe = qe(), q = Dt(), ge = y ? y.duration() : Gt(M, k), Be = xe <= 0.01, he = 0, se = B || 0, J = Vr(R) ? R.end : r.end, Nt = r.endTrigger || d, ae = Vr(R) ? R.start : r.start || (r.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"), dt = g.pinnedContainer = r.pinnedContainer && ot(r.pinnedContainer, g), Yt = d && Math.max(0, V.indexOf(g)) || 0, ze = Yt, Fe, $e, Lr, bn, Ye, Se, Vt, hs, Vo, Fi, Xt, Li, wn;
        for (K && Vr(R) && (Li = A.getProperty(v, k.p), wn = A.getProperty(_t, k.p)); ze--; )
          Se = V[ze], Se.end || Se.refresh(0, 1) || (Ve = g), Vt = Se.pin, Vt && (Vt === d || Vt === c || Vt === dt) && !Se.isReverted && (Fi || (Fi = []), Fi.unshift(Se), Se.revert(!0, !0)), Se !== V[ze] && (Yt--, ze--);
        for (nt(ae) && (ae = ae(g)), ae = Sa(ae, "start", g), Q = Ra(ae, d, Oe, k, ve(), st, v, g, q, re, N, ge, y, g._startClamp && "_startClamp") || (c ? -1e-3 : 0), nt(J) && (J = J(g)), mt(J) && !J.indexOf("+=") && (~J.indexOf(" ") ? J = (mt(ae) ? ae.split(" ")[0] : "") + J : (he = Yn(J.substr(2), Oe), J = mt(ae) ? ae : (y ? A.utils.mapRange(0, y.duration(), y.scrollTrigger.start, y.scrollTrigger.end, Q) : Q) + he, Nt = d)), J = Sa(J, "end", g), de = Math.max(Q, Ra(J || (Nt ? "100% 0" : ge), Nt, Oe, k, ve() + he, ht, _t, g, q, re, N, ge, y, g._endClamp && "_endClamp")) || -1e-3, he = 0, ze = Yt; ze--; )
          Se = V[ze], Vt = Se.pin, Vt && Se.start - Se._pinPush <= Q && !y && Se.end > 0 && (Fe = Se.end - (g._startClamp ? Math.max(0, Se.start) : Se.start), (Vt === d && Se.start - Se._pinPush < Q || Vt === dt) && isNaN(ae) && (he += Fe * (1 - Se.progress)), Vt === c && (se += Fe));
        if (Q += he, de += he, g._startClamp && (g._startClamp += he), g._endClamp && !tt && (g._endClamp = de || -1e-3, de = Math.min(de, Gt(M, k))), xe = de - Q || (Q -= 0.01) && 1e-3, Be && (Ge = A.utils.clamp(0, 1, A.utils.normalize(Q, de, It))), g._pinPush = se, st && he && (Fe = {}, Fe[k.a] = "+=" + he, dt && (Fe[k.p] = "-=" + ve()), A.set([st, ht], Fe)), c && !(lo && g.end >= Gt(M, k)))
          Fe = Ct(c), bn = k === Pe, Lr = ve(), St = parseFloat(pe(k.a)) + se, !ge && de > 1 && (Xt = (I ? le.scrollingElement || $t : M).style, Xt = {
            style: Xt,
            value: Xt["overflow" + k.a.toUpperCase()]
          }, I && Ct(ne)["overflow" + k.a.toUpperCase()] !== "scroll" && (Xt.style["overflow" + k.a.toUpperCase()] = "scroll")), Es(c, Ce, Fe), oi = Rn(c), $e = ir(c, !0), hs = N && Er(M, bn ? it : Pe)(), p ? (be = [p + k.os2, xe + se + ke], be.t = Ce, ze = p === we ? is(c, k) + xe + se : 0, ze && (be.push(k.d, ze + ke), Ce.style.flexBasis !== "auto" && (Ce.style.flexBasis = ze + ke)), Si(be), dt && V.forEach(function(Ii) {
            Ii.pin === dt && Ii.vars.pinSpacing !== !1 && (Ii._subPinOffset = !0);
          }), N && ve(It)) : (ze = is(c, k), ze && Ce.style.flexBasis !== "auto" && (Ce.style.flexBasis = ze + ke)), N && (Ye = {
            top: $e.top + (bn ? Lr - Q : hs) + ke,
            left: $e.left + (bn ? hs : Lr - Q) + ke,
            boxSizing: "border-box",
            position: "fixed"
          }, Ye[Qr] = Ye["max" + Di] = Math.ceil($e.width) + ke, Ye[Zr] = Ye["max" + Bo] = Math.ceil($e.height) + ke, Ye[Pt] = Ye[Pt + on] = Ye[Pt + nn] = Ye[Pt + an] = Ye[Pt + sn] = "0", Ye[we] = Fe[we], Ye[we + on] = Fe[we + on], Ye[we + nn] = Fe[we + nn], Ye[we + an] = Fe[we + an], Ye[we + sn] = Fe[we + sn], Dr = bh(fr, Ye, S), tt && ve(0)), i ? (Vo = i._initted, ks(1), i.render(i.duration(), !0, !0), Jt = pe(k.a) - St + xe + se, hr = Math.abs(xe - Jt) > 1, N && hr && Dr.splice(Dr.length - 2, 2), i.render(0, !0, !0), Vo || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), ks(0)) : Jt = xe, Xt && (Xt.value ? Xt.style["overflow" + k.a.toUpperCase()] = Xt.value : Xt.style.removeProperty("overflow-" + k.a));
        else if (d && ve() && !y)
          for ($e = d.parentNode; $e && $e !== ne; )
            $e._pinOffset && (Q -= $e._pinOffset, de -= $e._pinOffset), $e = $e.parentNode;
        Fi && Fi.forEach(function(Ii) {
          return Ii.revert(!1, !0);
        }), g.start = Q, g.end = de, Ke = Rt = tt ? It : ve(), !y && !tt && (Ke < It && ve(It), g.scroll.rec = 0), g.revert(!1, !0), Re = Xe(), Lt && (ce = -1, Lt.restart(!0)), Ve = 0, i && D && (i._initted || Fr) && i.progress() !== Fr && i.progress(Fr || 0, !0).render(i.time(), !0, !0), (Be || Ge !== g.progress || y || _) && (i && !D && i.totalProgress(y && Q < -1e-3 && !Ge ? A.utils.normalize(Q, de, 0) : Ge, !0), g.progress = Be || (Ke - Q) / xe === Ge ? 0 : Ge), c && p && (Ce._pinOffset = Math.round(g.progress * Jt)), X && X.invalidate(), isNaN(Li) || (Li -= A.getProperty(v, k.p), wn -= A.getProperty(_t, k.p), zn(v, k, Li), zn(st, k, Li - (B || 0)), zn(_t, k, wn), zn(ht, k, wn - (B || 0))), Be && !tt && g.update(), f && !tt && !ur && (ur = !0, f(g), ur = !1);
      }
    }, g.getVelocity = function() {
      return (ve() - Rt) / (Xe() - Wi) * 1e3 || 0;
    }, g.endAnimation = function() {
      Yi(g.callbackAnimation), i && (X ? X.progress(1) : i.paused() ? D || Yi(i, g.direction < 0, 1) : Yi(i, i.reversed()));
    }, g.labelToScroll = function(E) {
      return i && i.labels && (Q || g.refresh() || Q) + i.labels[E] / i.duration() * xe || 0;
    }, g.getTrailing = function(E) {
      var Y = V.indexOf(g), R = g.direction > 0 ? V.slice(0, Y).reverse() : V.slice(Y + 1);
      return (mt(E) ? R.filter(function(B) {
        return B.vars.preventOverlaps === E;
      }) : R).filter(function(B) {
        return g.direction > 0 ? B.end <= Q : B.start >= de;
      });
    }, g.update = function(E, Y, R) {
      if (!(y && !R && !E)) {
        var B = tt === !0 ? It : g.scroll(), Oe = E ? 0 : (B - Q) / xe, q = Oe < 0 ? 0 : Oe > 1 ? 1 : Oe || 0, ge = g.progress, Be, he, se, J, Nt, ae, dt, Yt;
        if (Y && (Rt = Ke, Ke = y ? ve() : B, x && (Rr = _r, _r = i && !D ? i.totalProgress() : q)), m && c && !Ve && !Cn && Et && (!q && Q < B + (B - Rt) / (Xe() - Wi) * m ? q = 1e-4 : q === 1 && de > B + (B - Rt) / (Xe() - Wi) * m && (q = 0.9999)), q !== ge && g.enabled) {
          if (Be = g.isActive = !!q && q < 1, he = !!ge && ge < 1, ae = Be !== he, Nt = ae || !!q != !!ge, g.direction = q > ge ? 1 : -1, g.progress = q, Nt && !Ve && (se = q && !ge ? 0 : q === 1 ? 1 : ge === 1 ? 2 : 3, D && (J = !ae && L[se + 1] !== "none" && L[se + 1] || L[se], Yt = i && (J === "complete" || J === "reset" || J in i))), T && (ae || Yt) && (Yt || h || !i) && (nt(T) ? T(g) : g.getTrailing(T).forEach(function(Lr) {
            return Lr.endAnimation();
          })), D || (X && !Ve && !Cn ? (X._dp._time - X._start !== X._time && X.render(X._dp._time - X._start), X.resetTo ? X.resetTo("totalProgress", q, i._tTime / i._tDur) : (X.vars.totalProgress = q, X.invalidate().restart())) : i && i.totalProgress(q, !!(Ve && (Re || E)))), c) {
            if (E && p && (Ce.style[p + k.os2] = Ri), !N)
              zt(qi(St + Jt * q));
            else if (Nt) {
              if (dt = !E && q > ge && de + 1 > B && B + 1 >= Gt(M, k), S)
                if (!E && (Be || dt)) {
                  var ze = ir(c, !0), Fe = B - Q;
                  za(c, ne, ze.top + (k === Pe ? Fe : 0) + ke, ze.left + (k === Pe ? 0 : Fe) + ke);
                } else
                  za(c, Ce);
              Si(Be || dt ? Dr : oi), hr && q < 1 && Be || zt(St + (q === 1 && !dt ? Jt : 0));
            }
          }
          x && !je.tween && !Ve && !Cn && Lt.restart(!0), a && (ae || P && q && (q < 1 || !Ps)) && mn(a.targets).forEach(function(Lr) {
            return Lr.classList[Be || P ? "add" : "remove"](a.className);
          }), o && !D && !E && o(g), Nt && !Ve ? (D && (Yt && (J === "complete" ? i.pause().totalProgress(1) : J === "reset" ? i.restart(!0).pause() : J === "restart" ? i.restart(!0) : i[J]()), o && o(g)), (ae || !Ps) && (u && ae && Os(g, u), W[se] && Os(g, W[se]), P && (q === 1 ? g.kill(!1, 1) : W[se] = 0), ae || (se = q === 1 ? 1 : 3, W[se] && Os(g, W[se]))), O && !Be && Math.abs(g.getVelocity()) > (Gi(O) ? O : 2500) && (Yi(g.callbackAnimation), X ? X.progress(1) : Yi(i, J === "reverse" ? 1 : !q, 1))) : D && o && !Ve && o(g);
        }
        if (ai) {
          var $e = y ? B / y.duration() * (y._caScrollDist || 0) : B;
          xn($e + (v._isFlipped ? 1 : 0)), ai($e);
        }
        ui && ui(-B / y.duration() * (y._caScrollDist || 0));
      }
    }, g.enable = function(E, Y) {
      g.enabled || (g.enabled = !0, Ee(M, "resize", ji), I || Ee(M, "scroll", hi), ie && Ee(n, "refreshInit", ie), E !== !1 && (g.progress = Ge = 0, Ke = Rt = ce = ve()), Y !== !1 && g.refresh());
    }, g.getTween = function(E) {
      return E && je ? je.tween : X;
    }, g.setPositions = function(E, Y, R, B) {
      if (y) {
        var Oe = y.scrollTrigger, q = y.duration(), ge = Oe.end - Oe.start;
        E = Oe.start + ge * E / q, Y = Oe.start + ge * Y / q;
      }
      g.refresh(!1, !1, {
        start: ka(E, R && !!g._startClamp),
        end: ka(Y, R && !!g._endClamp)
      }, B), g.update();
    }, g.adjustPinSpacing = function(E) {
      if (be && E) {
        var Y = be.indexOf(k.d) + 1;
        be[Y] = parseFloat(be[Y]) + E + ke, be[1] = parseFloat(be[1]) + E + ke, Si(be);
      }
    }, g.disable = function(E, Y) {
      if (g.enabled && (E !== !1 && g.revert(!0, !0), g.enabled = g.isActive = !1, Y || X && X.pause(), It = 0, Ne && (Ne.uncache = 1), ie && Me(n, "refreshInit", ie), Lt && (Lt.pause(), je.tween && je.tween.kill() && (je.tween = 0)), !I)) {
        for (var R = V.length; R--; )
          if (V[R].scroller === M && V[R] !== g)
            return;
        Me(M, "resize", ji), I || Me(M, "scroll", hi);
      }
    }, g.kill = function(E, Y) {
      g.disable(E, Y), X && !Y && X.kill(), l && delete uo[l];
      var R = V.indexOf(g);
      R >= 0 && V.splice(R, 1), R === et && Xn > 0 && et--, R = 0, V.forEach(function(B) {
        return B.scroller === g.scroller && (R = 1);
      }), R || tt || (g.scroll.rec = 0), i && (i.scrollTrigger = null, E && i.revert({
        kill: !1
      }), Y || i.kill()), st && [st, ht, v, _t].forEach(function(B) {
        return B.parentNode && B.parentNode.removeChild(B);
      }), ln === g && (ln = 0), c && (Ne && (Ne.uncache = 1), R = 0, V.forEach(function(B) {
        return B.pin === c && R++;
      }), R || (Ne.spacer = 0)), r.onKill && r.onKill(g);
    }, V.push(g), g.enable(!1, !1), er && er(g), i && i.add && !xe) {
      var Z = g.update;
      g.update = function() {
        g.update = Z, Q || de || g.refresh();
      }, A.delayedCall(0.01, g.update), xe = 0.01, Q = de = 0;
    } else
      g.refresh();
    c && yh();
  }, n.register = function(r) {
    return _i || (A = r || Tu(), wu() && window.document && n.enable(), _i = Ui), _i;
  }, n.defaults = function(r) {
    if (r)
      for (var i in r)
        An[i] = r[i];
    return An;
  }, n.disable = function(r, i) {
    Ui = 0, V.forEach(function(o) {
      return o[i ? "kill" : "disable"](r);
    }), Me(G, "wheel", hi), Me(le, "scroll", hi), clearInterval(Pn), Me(le, "touchcancel", Wt), Me(ne, "touchstart", Wt), Mn(Me, le, "pointerdown,touchstart,mousedown", Pa), Mn(Me, le, "pointerup,touchend,mouseup", Ca), ts.kill(), On(Me);
    for (var s = 0; s < H.length; s += 3)
      En(Me, H[s], H[s + 1]), En(Me, H[s], H[s + 2]);
  }, n.enable = function() {
    if (G = window, le = document, $t = le.documentElement, ne = le.body, A && (mn = A.utils.toArray, rn = A.utils.clamp, ao = A.core.context || Wt, ks = A.core.suppressOverwrites || Wt, Fo = G.history.scrollRestoration || "auto", fo = G.pageYOffset, A.core.globals("ScrollTrigger", n), ne)) {
      Ui = 1, Ti = document.createElement("div"), Ti.style.height = "100vh", Ti.style.position = "absolute", Du(), ch(), ye.register(A), n.isTouch = ye.isTouch, gr = ye.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), oo = ye.isTouch === 1, Ee(G, "wheel", hi), mu = [G, le, $t, ne], A.matchMedia ? (n.matchMedia = function(l) {
        var u = A.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, A.addEventListener("matchMediaInit", function() {
        return Yo();
      }), A.addEventListener("matchMediaRevert", function() {
        return Eu();
      }), A.addEventListener("matchMedia", function() {
        Hr(0, 1), ni("matchMedia");
      }), A.matchMedia("(orientation: portrait)", function() {
        return Ms(), Ms;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Ms(), Ee(le, "scroll", hi);
      var r = ne.style, i = r.borderTopStyle, s = A.core.Animation.prototype, o, a;
      for (s.revert || Object.defineProperty(s, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), r.borderTopStyle = "solid", o = ir(ne), Pe.m = Math.round(o.top + Pe.sc()) || 0, it.m = Math.round(o.left + it.sc()) || 0, i ? r.borderTopStyle = i : r.removeProperty("border-top-style"), Pn = setInterval(Ea, 250), A.delayedCall(0.5, function() {
        return Cn = 0;
      }), Ee(le, "touchcancel", Wt), Ee(ne, "touchstart", Wt), Mn(Ee, le, "pointerdown,touchstart,mousedown", Pa), Mn(Ee, le, "pointerup,touchend,mouseup", Ca), so = A.utils.checkPrefix("transform"), Hn.push(so), _i = Xe(), ts = A.delayedCall(0.2, Hr).pause(), di = [le, "visibilitychange", function() {
        var l = G.innerWidth, u = G.innerHeight;
        le.hidden ? (wa = l, Ta = u) : (wa !== l || Ta !== u) && ji();
      }, le, "DOMContentLoaded", Hr, G, "load", Hr, G, "resize", ji], On(Ee), V.forEach(function(l) {
        return l.enable(0, 1);
      }), a = 0; a < H.length; a += 3)
        En(Me, H[a], H[a + 1]), En(Me, H[a], H[a + 2]);
    }
  }, n.config = function(r) {
    "limitCallbacks" in r && (Ps = !!r.limitCallbacks);
    var i = r.syncInterval;
    i && clearInterval(Pn) || (Pn = i) && setInterval(Ea, i), "ignoreMobileResize" in r && (oo = n.isTouch === 1 && r.ignoreMobileResize), "autoRefreshEvents" in r && (On(Me) || On(Ee, r.autoRefreshEvents || "none"), vu = (r.autoRefreshEvents + "").indexOf("resize") === -1);
  }, n.scrollerProxy = function(r, i) {
    var s = ot(r), o = H.indexOf(s), a = ri(s);
    ~o && H.splice(o, a ? 6 : 2), i && (a ? Kt.unshift(G, i, ne, i, $t, i) : Kt.unshift(s, i));
  }, n.clearMatchMedia = function(r) {
    V.forEach(function(i) {
      return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0);
    });
  }, n.isInViewport = function(r, i, s) {
    var o = (mt(r) ? ot(r) : r).getBoundingClientRect(), a = o[s ? Qr : Zr] * i || 0;
    return s ? o.right - a > 0 && o.left + a < G.innerWidth : o.bottom - a > 0 && o.top + a < G.innerHeight;
  }, n.positionInViewport = function(r, i, s) {
    mt(r) && (r = ot(r));
    var o = r.getBoundingClientRect(), a = o[s ? Qr : Zr], l = i == null ? a / 2 : i in ns ? ns[i] * a : ~i.indexOf("%") ? parseFloat(i) * a / 100 : parseFloat(i) || 0;
    return s ? (o.left + l) / G.innerWidth : (o.top + l) / G.innerHeight;
  }, n.killAll = function(r) {
    if (V.slice(0).forEach(function(s) {
      return s.vars.id !== "ScrollSmoother" && s.kill();
    }), r !== !0) {
      var i = ii.killAll || [];
      ii = {}, i.forEach(function(s) {
        return s();
      });
    }
  }, n;
}();
U.version = "3.12.5";
U.saveStyles = function(n) {
  return n ? mn(n).forEach(function(e) {
    if (e && e.style) {
      var t = pt.indexOf(e);
      t >= 0 && pt.splice(t, 5), pt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), A.core.getCache(e), ao());
    }
  }) : pt;
};
U.revert = function(n, e) {
  return Yo(!n, e);
};
U.create = function(n, e) {
  return new U(n, e);
};
U.refresh = function(n) {
  return n ? ji() : (_i || U.register()) && Hr(!0);
};
U.update = function(n) {
  return ++H.cache && sr(n === !0 ? 2 : 0);
};
U.clearScrollMemory = Au;
U.maxScroll = function(n, e) {
  return Gt(n, e ? it : Pe);
};
U.getScrollFunc = function(n, e) {
  return Er(ot(n), e ? it : Pe);
};
U.getById = function(n) {
  return uo[n];
};
U.getAll = function() {
  return V.filter(function(n) {
    return n.vars.id !== "ScrollSmoother";
  });
};
U.isScrolling = function() {
  return !!Et;
};
U.snapDirectional = $o;
U.addEventListener = function(n, e) {
  var t = ii[n] || (ii[n] = []);
  ~t.indexOf(e) || t.push(e);
};
U.removeEventListener = function(n, e) {
  var t = ii[n], r = t && t.indexOf(e);
  r >= 0 && t.splice(r, 1);
};
U.batch = function(n, e) {
  var t = [], r = {}, i = e.interval || 0.016, s = e.batchMax || 1e9, o = function(u, f) {
    var h = [], d = [], c = A.delayedCall(i, function() {
      f(h, d), h = [], d = [];
    }).pause();
    return function(p) {
      h.length || c.restart(!0), h.push(p.trigger), d.push(p), s <= h.length && c.progress(1);
    };
  }, a;
  for (a in e)
    r[a] = a.substr(0, 2) === "on" && nt(e[a]) && a !== "onRefreshInit" ? o(a, e[a]) : e[a];
  return nt(s) && (s = s(), Ee(U, "refresh", function() {
    return s = e.batchMax();
  })), mn(n).forEach(function(l) {
    var u = {};
    for (a in r)
      u[a] = r[a];
    u.trigger = l, t.push(U.create(u));
  }), t;
};
var La = function(e, t, r, i) {
  return t > i ? e(i) : t < 0 && e(0), r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1;
}, As = function n(e, t) {
  t === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = t === !0 ? "auto" : t ? "pan-" + t + (ye.isTouch ? " pinch-zoom" : "") : "none", e === $t && n(ne, t);
}, Fn = {
  auto: 1,
  scroll: 1
}, Th = function(e) {
  var t = e.event, r = e.target, i = e.axis, s = (t.changedTouches ? t.changedTouches[0] : t).target, o = s._gsap || A.core.getCache(s), a = Xe(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; s && s !== ne && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !(Fn[(l = Ct(s)).overflowY] || Fn[l.overflowX])); )
      s = s.parentNode;
    o._isScroll = s && s !== r && !ri(s) && (Fn[(l = Ct(s)).overflowY] || Fn[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || i === "x") && (t.stopPropagation(), t._gsapAllow = !0);
}, zu = function(e, t, r, i) {
  return ye.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: t,
    onWheel: i = i && Th,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return r && Ee(le, ye.eventTypes[0], Na, !1, !0);
    },
    onDisable: function() {
      return Me(le, ye.eventTypes[0], Na, !0);
    }
  });
}, Sh = /(input|label|select|textarea)/i, Ia, Na = function(e) {
  var t = Sh.test(e.target.tagName);
  (t || Ia) && (e._gsapAllow = !0, Ia = t);
}, kh = function(e) {
  Vr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var t = e, r = t.normalizeScrollX, i = t.momentum, s = t.allowNestedScroll, o = t.onRelease, a, l, u = ot(e.target) || $t, f = A.core.globals().ScrollSmoother, h = f && f.get(), d = gr && (e.content && ot(e.content) || h && e.content !== !1 && !h.smooth() && h.content()), c = Er(u, Pe), p = Er(u, it), _ = 1, m = (ye.isTouch && G.visualViewport ? G.visualViewport.scale * G.visualViewport.width : G.outerWidth) / G.innerWidth, w = 0, b = nt(i) ? function() {
    return i(a);
  } : function() {
    return i || 2.8;
  }, P, x, S = zu(u, e.type, !0, s), C = function() {
    return x = !1;
  }, y = Wt, O = Wt, T = function() {
    l = Gt(u, Pe), O = rn(gr ? 1 : 0, l), r && (y = rn(0, Gt(u, it))), P = Jr;
  }, k = function() {
    d._gsap.y = qi(parseFloat(d._gsap.y) + c.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, D = function() {
    if (x) {
      requestAnimationFrame(C);
      var K = qi(a.deltaY / 2), re = O(c.v - K);
      if (d && re !== c.v + c.offset) {
        c.offset = re - c.v;
        var g = qi((parseFloat(d && d._gsap.y) || 0) - c.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)", d._gsap.y = g + "px", c.cacheID = H.cache, sr();
      }
      return !0;
    }
    c.offset && k(), x = !0;
  }, M, F, I, N, W = function() {
    T(), M.isActive() && M.vars.scrollY > l && (c() > l ? M.progress(1) && c(l) : M.resetTo("scrollY", l));
  };
  return d && A.set(d, {
    y: "+=0"
  }), e.ignoreCheck = function(L) {
    return gr && L.type === "touchmove" && D() || _ > 1.05 && L.type !== "touchstart" || a.isGesturing || L.touches && L.touches.length > 1;
  }, e.onPress = function() {
    x = !1;
    var L = _;
    _ = qi((G.visualViewport && G.visualViewport.scale || 1) / m), M.pause(), L !== _ && As(u, _ > 1.01 ? !0 : r ? !1 : "x"), F = p(), I = c(), T(), P = Jr;
  }, e.onRelease = e.onGestureStart = function(L, K) {
    if (c.offset && k(), !K)
      N.restart(!0);
    else {
      H.cache++;
      var re = b(), g, ie;
      r && (g = p(), ie = g + re * 0.05 * -L.velocityX / 0.227, re *= La(p, g, ie, Gt(u, it)), M.vars.scrollX = y(ie)), g = c(), ie = g + re * 0.05 * -L.velocityY / 0.227, re *= La(c, g, ie, Gt(u, Pe)), M.vars.scrollY = O(ie), M.invalidate().duration(re).play(0.01), (gr && M.vars.scrollY >= l || g >= l - 1) && A.to({}, {
        onUpdate: W,
        duration: re
      });
    }
    o && o(L);
  }, e.onWheel = function() {
    M._ts && M.pause(), Xe() - w > 1e3 && (P = 0, w = Xe());
  }, e.onChange = function(L, K, re, g, ie) {
    if (Jr !== P && T(), K && r && p(y(g[2] === K ? F + (L.startX - L.x) : p() + K - g[1])), re) {
      c.offset && k();
      var qe = ie[2] === re, Dt = qe ? I + L.startY - L.y : c() + re - ie[1], ce = O(Dt);
      qe && Dt !== ce && (I += ce - Dt), c(ce);
    }
    (re || K) && sr();
  }, e.onEnable = function() {
    As(u, r ? !1 : "x"), U.addEventListener("refresh", W), Ee(G, "resize", W), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = p.smooth = !1), S.enable();
  }, e.onDisable = function() {
    As(u, !0), Me(G, "resize", W), U.removeEventListener("refresh", W), S.kill();
  }, e.lockAxis = e.lockAxis !== !1, a = new ye(e), a.iOS = gr, gr && !c() && c(1), gr && A.ticker.add(Wt), N = a._dc, M = A.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: r ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Ru(c, c(), function() {
        return M.pause();
      })
    },
    onUpdate: sr,
    onComplete: N.vars.onComplete
  }), a;
};
U.sort = function(n) {
  return V.sort(n || function(e, t) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (t.start + (t.vars.refreshPriority || 0) * -1e6);
  });
};
U.observe = function(n) {
  return new ye(n);
};
U.normalizeScroll = function(n) {
  if (typeof n > "u")
    return Je;
  if (n === !0 && Je)
    return Je.enable();
  if (n === !1) {
    Je && Je.kill(), Je = n;
    return;
  }
  var e = n instanceof ye ? n : kh(n);
  return Je && Je.target === e.target && Je.kill(), ri(e.target) && (Je = e), e;
};
U.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: no,
  _inputObserver: zu,
  _scrollers: H,
  _proxies: Kt,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Et || ni("scrollStart"), Et = Xe();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Ve;
    }
  }
};
Tu() && A.registerPlugin(U);
gt.registerPlugin(U);
class Ph {
  constructor() {
    this.parallaxActive = !1, this.initParallax();
  }
  initParallax() {
    const e = document.querySelectorAll("[data-parallax]");
    e.length && (window.innerWidth >= 1024 && (this.parallaxActive = !0, e.forEach((t) => {
      this.animateParallax(t);
    })), window.addEventListener("resize", () => {
      window.innerWidth >= 1024 && !this.parallaxActive ? (console.log("active parallax"), this.parallaxActive = !0, e.forEach((t) => {
        this.animateParallax(t);
      })) : window.innerWidth < 1024 && this.parallaxActive && (console.log("desactive parallax"), this.parallaxActive = !1, e.forEach((t) => {
        const r = t.querySelector("img");
        r ? (gt.killTweensOf(r), gt.set(r, { clearProps: "all" })) : (gt.killTweensOf(t), gt.set(t, { clearProps: "all" }));
      })), console.log("resize", this.parallaxActive);
    }));
  }
  animateParallax(e) {
    const t = e.dataset.speed ? parseFloat(e.dataset.speed) : 5, r = e.querySelector("img");
    let i;
    r ? i = r : i = e, gt.set(i, {
      scale: e.dataset.scale ? parseFloat(e.dataset.scale) : 1
    }), e.dataset.position == "top" ? (gt.set(i, { scale: 1 }), gt.to(i, {
      y: `${t * (window.innerHeight / 100)}`,
      ease: "none",
      scrollTrigger: {
        trigger: e.parentElement,
        scrub: !0,
        start: "top top",
        end: "bottom top"
      }
    })) : gt.fromTo(
      i,
      {
        y: `-${t * (window.innerHeight / 100)}`
      },
      {
        y: `${t * (window.innerHeight / 100)}`,
        ease: "none",
        scrollTrigger: {
          trigger: e.parentElement,
          scrub: !0,
          start: "top bottom",
          end: "bottom top"
        }
      }
    );
  }
}
class Ba {
  constructor(e) {
    this.buttons = document.querySelectorAll(e), this.buttons.forEach((t) => {
      this.addOverShape(t), t.addEventListener("mouseenter", () => this.overEffect(t, !0)), t.addEventListener("mouseleave", () => this.overEffect(t, !1));
    });
  }
  addOverShape(e) {
    e.innerHTML += `<svg class="btn__shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
        </svg>`;
  }
  overEffect(e, t) {
    const r = e.querySelector("path"), i = gt.timeline();
    t ? (i.to(r, {
      attr: { d: "M 0 100 V 90 Q 50 0 100 90 V 100 z" },
      ease: "power1.in",
      duration: 0.13
    }), i.to(r, {
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      ease: "power1.out",
      duration: 0.18
    })) : (i.to(r, {
      attr: { d: "M 0 100 V 90 Q 50 0 100 90 V 100 z" },
      ease: "power1.in",
      duration: 0.18
    }), i.to(r, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      ease: "power1.out",
      duration: 0.13
    }));
  }
  destroy() {
    this.buttons.forEach((e) => {
      e.removeEventListener("mouseenter", () => this.overEffect(e, !0)), e.removeEventListener("mouseleave", () => this.overEffect(e, !1));
    });
  }
}
fl({
  $delimiters: ["[[", "]]"],
  Menu: lh
}).mount();
const Ch = () => {
  new Ph(), new Ba(".btn-primary"), new Ba(".btn-secondary");
};
document.addEventListener("DOMContentLoaded", () => {
  Ch();
});
