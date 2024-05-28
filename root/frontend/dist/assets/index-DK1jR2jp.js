(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function Uf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Xa = { exports: {} },
  ho = {},
  Ka = { exports: {} },
  L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yr = Symbol.for("react.element"),
  $f = Symbol.for("react.portal"),
  Bf = Symbol.for("react.fragment"),
  Vf = Symbol.for("react.strict_mode"),
  Wf = Symbol.for("react.profiler"),
  Hf = Symbol.for("react.provider"),
  Qf = Symbol.for("react.context"),
  Xf = Symbol.for("react.forward_ref"),
  Kf = Symbol.for("react.suspense"),
  Gf = Symbol.for("react.memo"),
  Yf = Symbol.for("react.lazy"),
  Ds = Symbol.iterator;
function Zf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ds && e[Ds]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ga = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ya = Object.assign,
  Za = {};
function Kn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Za),
    (this.updater = n || Ga);
}
Kn.prototype.isReactComponent = {};
Kn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Kn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ja() {}
Ja.prototype = Kn.prototype;
function fu(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Za),
    (this.updater = n || Ga);
}
var pu = (fu.prototype = new Ja());
pu.constructor = fu;
Ya(pu, Kn.prototype);
pu.isPureReactComponent = !0;
var Rs = Array.isArray,
  qa = Object.prototype.hasOwnProperty,
  hu = { current: null },
  ba = { key: !0, ref: !0, __self: !0, __source: !0 };
function ec(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      qa.call(t, r) && !ba.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    l.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: Yr,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: hu.current,
  };
}
function Jf(e, t) {
  return {
    $$typeof: Yr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function vu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Yr;
}
function qf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Ns = /\/+/g;
function jo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? qf("" + e.key)
    : t.toString(36);
}
function Rl(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Yr:
          case $f:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + jo(i, 0) : r),
      Rs(l)
        ? ((n = ""),
          e != null && (n = e.replace(Ns, "$&/") + "/"),
          Rl(l, t, n, "", function (a) {
            return a;
          }))
        : l != null &&
          (vu(l) &&
            (l = Jf(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(Ns, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Rs(e)))
    for (var u = 0; u < e.length; u++) {
      o = e[u];
      var s = r + jo(o, u);
      i += Rl(o, t, n, s, l);
    }
  else if (((s = Zf(e)), typeof s == "function"))
    for (e = s.call(e), u = 0; !(o = e.next()).done; )
      (o = o.value), (s = r + jo(o, u++)), (i += Rl(o, t, n, s, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function ul(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Rl(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function bf(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Se = { current: null },
  Nl = { transition: null },
  ep = {
    ReactCurrentDispatcher: Se,
    ReactCurrentBatchConfig: Nl,
    ReactCurrentOwner: hu,
  };
function tc() {
  throw Error("act(...) is not supported in production builds of React.");
}
L.Children = {
  map: ul,
  forEach: function (e, t, n) {
    ul(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ul(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ul(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!vu(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
L.Component = Kn;
L.Fragment = Bf;
L.Profiler = Wf;
L.PureComponent = fu;
L.StrictMode = Vf;
L.Suspense = Kf;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ep;
L.act = tc;
L.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Ya({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = hu.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in t)
      qa.call(t, s) &&
        !ba.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: Yr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
L.createContext = function (e) {
  return (
    (e = {
      $$typeof: Qf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Hf, _context: e }),
    (e.Consumer = e)
  );
};
L.createElement = ec;
L.createFactory = function (e) {
  var t = ec.bind(null, e);
  return (t.type = e), t;
};
L.createRef = function () {
  return { current: null };
};
L.forwardRef = function (e) {
  return { $$typeof: Xf, render: e };
};
L.isValidElement = vu;
L.lazy = function (e) {
  return { $$typeof: Yf, _payload: { _status: -1, _result: e }, _init: bf };
};
L.memo = function (e, t) {
  return { $$typeof: Gf, type: e, compare: t === void 0 ? null : t };
};
L.startTransition = function (e) {
  var t = Nl.transition;
  Nl.transition = {};
  try {
    e();
  } finally {
    Nl.transition = t;
  }
};
L.unstable_act = tc;
L.useCallback = function (e, t) {
  return Se.current.useCallback(e, t);
};
L.useContext = function (e) {
  return Se.current.useContext(e);
};
L.useDebugValue = function () {};
L.useDeferredValue = function (e) {
  return Se.current.useDeferredValue(e);
};
L.useEffect = function (e, t) {
  return Se.current.useEffect(e, t);
};
L.useId = function () {
  return Se.current.useId();
};
L.useImperativeHandle = function (e, t, n) {
  return Se.current.useImperativeHandle(e, t, n);
};
L.useInsertionEffect = function (e, t) {
  return Se.current.useInsertionEffect(e, t);
};
L.useLayoutEffect = function (e, t) {
  return Se.current.useLayoutEffect(e, t);
};
L.useMemo = function (e, t) {
  return Se.current.useMemo(e, t);
};
L.useReducer = function (e, t, n) {
  return Se.current.useReducer(e, t, n);
};
L.useRef = function (e) {
  return Se.current.useRef(e);
};
L.useState = function (e) {
  return Se.current.useState(e);
};
L.useSyncExternalStore = function (e, t, n) {
  return Se.current.useSyncExternalStore(e, t, n);
};
L.useTransition = function () {
  return Se.current.useTransition();
};
L.version = "18.3.1";
Ka.exports = L;
var y = Ka.exports;
const ye = Uf(y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tp = y,
  np = Symbol.for("react.element"),
  rp = Symbol.for("react.fragment"),
  lp = Object.prototype.hasOwnProperty,
  op = tp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  ip = { key: !0, ref: !0, __self: !0, __source: !0 };
function nc(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) lp.call(t, r) && !ip.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: np,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: op.current,
  };
}
ho.Fragment = rp;
ho.jsx = nc;
ho.jsxs = nc;
Xa.exports = ho;
var A = Xa.exports,
  hi = {},
  rc = { exports: {} },
  je = {},
  lc = { exports: {} },
  oc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, P) {
    var z = N.length;
    N.push(P);
    e: for (; 0 < z; ) {
      var B = (z - 1) >>> 1,
        j = N[B];
      if (0 < l(j, P)) (N[B] = P), (N[z] = j), (z = B);
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var P = N[0],
      z = N.pop();
    if (z !== P) {
      N[0] = z;
      e: for (var B = 0, j = N.length, xe = j >>> 1; B < xe; ) {
        var ge = 2 * (B + 1) - 1,
          ct = N[ge],
          J = ge + 1,
          dt = N[J];
        if (0 > l(ct, z))
          J < j && 0 > l(dt, ct)
            ? ((N[B] = dt), (N[J] = z), (B = J))
            : ((N[B] = ct), (N[ge] = z), (B = ge));
        else if (J < j && 0 > l(dt, z)) (N[B] = dt), (N[J] = z), (B = J);
        else break e;
      }
    }
    return P;
  }
  function l(N, P) {
    var z = N.sortIndex - P.sortIndex;
    return z !== 0 ? z : N.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      u = i.now();
    e.unstable_now = function () {
      return i.now() - u;
    };
  }
  var s = [],
    a = [],
    h = 1,
    f = null,
    v = 3,
    g = !1,
    S = !1,
    w = !1,
    R = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var P = n(a); P !== null; ) {
      if (P.callback === null) r(a);
      else if (P.startTime <= N)
        r(a), (P.sortIndex = P.expirationTime), t(s, P);
      else break;
      P = n(a);
    }
  }
  function m(N) {
    if (((w = !1), p(N), !S))
      if (n(s) !== null) (S = !0), Ct(k);
      else {
        var P = n(a);
        P !== null && ue(m, P.startTime - N);
      }
  }
  function k(N, P) {
    (S = !1), w && ((w = !1), d(D), (D = -1)), (g = !0);
    var z = v;
    try {
      for (
        p(P), f = n(s);
        f !== null && (!(f.expirationTime > P) || (N && !I()));

      ) {
        var B = f.callback;
        if (typeof B == "function") {
          (f.callback = null), (v = f.priorityLevel);
          var j = B(f.expirationTime <= P);
          (P = e.unstable_now()),
            typeof j == "function" ? (f.callback = j) : f === n(s) && r(s),
            p(P);
        } else r(s);
        f = n(s);
      }
      if (f !== null) var xe = !0;
      else {
        var ge = n(a);
        ge !== null && ue(m, ge.startTime - P), (xe = !1);
      }
      return xe;
    } finally {
      (f = null), (v = z), (g = !1);
    }
  }
  var C = !1,
    E = null,
    D = -1,
    M = 5,
    T = -1;
  function I() {
    return !(e.unstable_now() - T < M);
  }
  function oe() {
    if (E !== null) {
      var N = e.unstable_now();
      T = N;
      var P = !0;
      try {
        P = E(!0, N);
      } finally {
        P ? ie() : ((C = !1), (E = null));
      }
    } else C = !1;
  }
  var ie;
  if (typeof c == "function")
    ie = function () {
      c(oe);
    };
  else if (typeof MessageChannel < "u") {
    var Te = new MessageChannel(),
      Zt = Te.port2;
    (Te.port1.onmessage = oe),
      (ie = function () {
        Zt.postMessage(null);
      });
  } else
    ie = function () {
      R(oe, 0);
    };
  function Ct(N) {
    (E = N), C || ((C = !0), ie());
  }
  function ue(N, P) {
    D = R(function () {
      N(e.unstable_now());
    }, P);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || g || ((S = !0), Ct(k));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (M = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (N) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = v;
      }
      var z = v;
      v = P;
      try {
        return N();
      } finally {
        v = z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, P) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var z = v;
      v = N;
      try {
        return P();
      } finally {
        v = z;
      }
    }),
    (e.unstable_scheduleCallback = function (N, P, z) {
      var B = e.unstable_now();
      switch (
        (typeof z == "object" && z !== null
          ? ((z = z.delay), (z = typeof z == "number" && 0 < z ? B + z : B))
          : (z = B),
        N)
      ) {
        case 1:
          var j = -1;
          break;
        case 2:
          j = 250;
          break;
        case 5:
          j = 1073741823;
          break;
        case 4:
          j = 1e4;
          break;
        default:
          j = 5e3;
      }
      return (
        (j = z + j),
        (N = {
          id: h++,
          callback: P,
          priorityLevel: N,
          startTime: z,
          expirationTime: j,
          sortIndex: -1,
        }),
        z > B
          ? ((N.sortIndex = z),
            t(a, N),
            n(s) === null &&
              N === n(a) &&
              (w ? (d(D), (D = -1)) : (w = !0), ue(m, z - B)))
          : ((N.sortIndex = j), t(s, N), S || g || ((S = !0), Ct(k))),
        N
      );
    }),
    (e.unstable_shouldYield = I),
    (e.unstable_wrapCallback = function (N) {
      var P = v;
      return function () {
        var z = v;
        v = P;
        try {
          return N.apply(this, arguments);
        } finally {
          v = z;
        }
      };
    });
})(oc);
lc.exports = oc;
var up = lc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sp = y,
  Oe = up;
function x(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var ic = new Set(),
  Tr = {};
function dn(e, t) {
  Un(e, t), Un(e + "Capture", t);
}
function Un(e, t) {
  for (Tr[e] = t, e = 0; e < t.length; e++) ic.add(t[e]);
}
var wt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  vi = Object.prototype.hasOwnProperty,
  ap =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  _s = {},
  Ts = {};
function cp(e) {
  return vi.call(Ts, e)
    ? !0
    : vi.call(_s, e)
    ? !1
    : ap.test(e)
    ? (Ts[e] = !0)
    : ((_s[e] = !0), !1);
}
function dp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function fp(e, t, n, r) {
  if (t === null || typeof t > "u" || dp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ke(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var de = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    de[e] = new ke(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  de[t] = new ke(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  de[e] = new ke(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  de[e] = new ke(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    de[e] = new ke(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  de[e] = new ke(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  de[e] = new ke(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  de[e] = new ke(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  de[e] = new ke(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var gu = /[\-:]([a-z])/g;
function mu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(gu, mu);
    de[t] = new ke(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(gu, mu);
    de[t] = new ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(gu, mu);
  de[t] = new ke(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  de[e] = new ke(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
de.xlinkHref = new ke(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  de[e] = new ke(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function yu(e, t, n, r) {
  var l = de.hasOwnProperty(t) ? de[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (fp(t, n, l, r) && (n = null),
    r || l === null
      ? cp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Et = sp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  sl = Symbol.for("react.element"),
  Sn = Symbol.for("react.portal"),
  kn = Symbol.for("react.fragment"),
  wu = Symbol.for("react.strict_mode"),
  gi = Symbol.for("react.profiler"),
  uc = Symbol.for("react.provider"),
  sc = Symbol.for("react.context"),
  Su = Symbol.for("react.forward_ref"),
  mi = Symbol.for("react.suspense"),
  yi = Symbol.for("react.suspense_list"),
  ku = Symbol.for("react.memo"),
  Pt = Symbol.for("react.lazy"),
  ac = Symbol.for("react.offscreen"),
  Ps = Symbol.iterator;
function or(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ps && e[Ps]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var G = Object.assign,
  Fo;
function pr(e) {
  if (Fo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Fo = (t && t[1]) || "";
    }
  return (
    `
` +
    Fo +
    e
  );
}
var Ao = !1;
function Uo(e, t) {
  if (!e || Ao) return "";
  Ao = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var l = a.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          u = o.length - 1;
        1 <= i && 0 <= u && l[i] !== o[u];

      )
        u--;
      for (; 1 <= i && 0 <= u; i--, u--)
        if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if ((i--, u--, 0 > u || l[i] !== o[u])) {
                var s =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= i && 0 <= u);
          break;
        }
    }
  } finally {
    (Ao = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? pr(e) : "";
}
function pp(e) {
  switch (e.tag) {
    case 5:
      return pr(e.type);
    case 16:
      return pr("Lazy");
    case 13:
      return pr("Suspense");
    case 19:
      return pr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Uo(e.type, !1)), e;
    case 11:
      return (e = Uo(e.type.render, !1)), e;
    case 1:
      return (e = Uo(e.type, !0)), e;
    default:
      return "";
  }
}
function wi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case kn:
      return "Fragment";
    case Sn:
      return "Portal";
    case gi:
      return "Profiler";
    case wu:
      return "StrictMode";
    case mi:
      return "Suspense";
    case yi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case sc:
        return (e.displayName || "Context") + ".Consumer";
      case uc:
        return (e._context.displayName || "Context") + ".Provider";
      case Su:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ku:
        return (
          (t = e.displayName || null), t !== null ? t : wi(e.type) || "Memo"
        );
      case Pt:
        (t = e._payload), (e = e._init);
        try {
          return wi(e(t));
        } catch {}
    }
  return null;
}
function hp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return wi(t);
    case 8:
      return t === wu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Qt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function cc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function vp(e) {
  var t = cc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function al(e) {
  e._valueTracker || (e._valueTracker = vp(e));
}
function dc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = cc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Ul(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Si(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function zs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Qt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function fc(e, t) {
  (t = t.checked), t != null && yu(e, "checked", t, !1);
}
function ki(e, t) {
  fc(e, t);
  var n = Qt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? xi(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && xi(e, t.type, Qt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Ms(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function xi(e, t, n) {
  (t !== "number" || Ul(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var hr = Array.isArray;
function Mn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Qt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ei(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ls(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(x(92));
      if (hr(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Qt(n) };
}
function pc(e, t) {
  var n = Qt(t.value),
    r = Qt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Is(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function hc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ci(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? hc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var cl,
  vc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        cl = cl || document.createElement("div"),
          cl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = cl.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Pr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var mr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  gp = ["Webkit", "ms", "Moz", "O"];
Object.keys(mr).forEach(function (e) {
  gp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (mr[t] = mr[e]);
  });
});
function gc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (mr.hasOwnProperty(e) && mr[e])
    ? ("" + t).trim()
    : t + "px";
}
function mc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = gc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var mp = G(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Di(e, t) {
  if (t) {
    if (mp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function Ri(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ni = null;
function xu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var _i = null,
  Ln = null,
  In = null;
function Os(e) {
  if ((e = qr(e))) {
    if (typeof _i != "function") throw Error(x(280));
    var t = e.stateNode;
    t && ((t = wo(t)), _i(e.stateNode, e.type, t));
  }
}
function yc(e) {
  Ln ? (In ? In.push(e) : (In = [e])) : (Ln = e);
}
function wc() {
  if (Ln) {
    var e = Ln,
      t = In;
    if (((In = Ln = null), Os(e), t)) for (e = 0; e < t.length; e++) Os(t[e]);
  }
}
function Sc(e, t) {
  return e(t);
}
function kc() {}
var $o = !1;
function xc(e, t, n) {
  if ($o) return e(t, n);
  $o = !0;
  try {
    return Sc(e, t, n);
  } finally {
    ($o = !1), (Ln !== null || In !== null) && (kc(), wc());
  }
}
function zr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = wo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var Ti = !1;
if (wt)
  try {
    var ir = {};
    Object.defineProperty(ir, "passive", {
      get: function () {
        Ti = !0;
      },
    }),
      window.addEventListener("test", ir, ir),
      window.removeEventListener("test", ir, ir);
  } catch {
    Ti = !1;
  }
function yp(e, t, n, r, l, o, i, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (h) {
    this.onError(h);
  }
}
var yr = !1,
  $l = null,
  Bl = !1,
  Pi = null,
  wp = {
    onError: function (e) {
      (yr = !0), ($l = e);
    },
  };
function Sp(e, t, n, r, l, o, i, u, s) {
  (yr = !1), ($l = null), yp.apply(wp, arguments);
}
function kp(e, t, n, r, l, o, i, u, s) {
  if ((Sp.apply(this, arguments), yr)) {
    if (yr) {
      var a = $l;
      (yr = !1), ($l = null);
    } else throw Error(x(198));
    Bl || ((Bl = !0), (Pi = a));
  }
}
function fn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ec(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function js(e) {
  if (fn(e) !== e) throw Error(x(188));
}
function xp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = fn(e)), t === null)) throw Error(x(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return js(l), e;
        if (o === r) return js(l), t;
        o = o.sibling;
      }
      throw Error(x(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (u === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (u === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function Cc(e) {
  return (e = xp(e)), e !== null ? Dc(e) : null;
}
function Dc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Dc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Rc = Oe.unstable_scheduleCallback,
  Fs = Oe.unstable_cancelCallback,
  Ep = Oe.unstable_shouldYield,
  Cp = Oe.unstable_requestPaint,
  Z = Oe.unstable_now,
  Dp = Oe.unstable_getCurrentPriorityLevel,
  Eu = Oe.unstable_ImmediatePriority,
  Nc = Oe.unstable_UserBlockingPriority,
  Vl = Oe.unstable_NormalPriority,
  Rp = Oe.unstable_LowPriority,
  _c = Oe.unstable_IdlePriority,
  vo = null,
  st = null;
function Np(e) {
  if (st && typeof st.onCommitFiberRoot == "function")
    try {
      st.onCommitFiberRoot(vo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var qe = Math.clz32 ? Math.clz32 : Pp,
  _p = Math.log,
  Tp = Math.LN2;
function Pp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((_p(e) / Tp) | 0)) | 0;
}
var dl = 64,
  fl = 4194304;
function vr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Wl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? (r = vr(u)) : ((o &= i), o !== 0 && (r = vr(o)));
  } else (i = n & ~l), i !== 0 ? (r = vr(i)) : o !== 0 && (r = vr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - qe(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function zp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Mp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - qe(o),
      u = 1 << i,
      s = l[i];
    s === -1
      ? (!(u & n) || u & r) && (l[i] = zp(u, t))
      : s <= t && (e.expiredLanes |= u),
      (o &= ~u);
  }
}
function zi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Tc() {
  var e = dl;
  return (dl <<= 1), !(dl & 4194240) && (dl = 64), e;
}
function Bo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Zr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - qe(t)),
    (e[t] = n);
}
function Lp(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - qe(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function Cu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - qe(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var U = 0;
function Pc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var zc,
  Du,
  Mc,
  Lc,
  Ic,
  Mi = !1,
  pl = [],
  Ft = null,
  At = null,
  Ut = null,
  Mr = new Map(),
  Lr = new Map(),
  Lt = [],
  Ip =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function As(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ft = null;
      break;
    case "dragenter":
    case "dragleave":
      At = null;
      break;
    case "mouseover":
    case "mouseout":
      Ut = null;
      break;
    case "pointerover":
    case "pointerout":
      Mr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Lr.delete(t.pointerId);
  }
}
function ur(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = qr(t)), t !== null && Du(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Op(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (Ft = ur(Ft, e, t, n, r, l)), !0;
    case "dragenter":
      return (At = ur(At, e, t, n, r, l)), !0;
    case "mouseover":
      return (Ut = ur(Ut, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return Mr.set(o, ur(Mr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), Lr.set(o, ur(Lr.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Oc(e) {
  var t = en(e.target);
  if (t !== null) {
    var n = fn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ec(n)), t !== null)) {
          (e.blockedOn = t),
            Ic(e.priority, function () {
              Mc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function _l(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Li(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Ni = r), n.target.dispatchEvent(r), (Ni = null);
    } else return (t = qr(n)), t !== null && Du(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Us(e, t, n) {
  _l(e) && n.delete(t);
}
function jp() {
  (Mi = !1),
    Ft !== null && _l(Ft) && (Ft = null),
    At !== null && _l(At) && (At = null),
    Ut !== null && _l(Ut) && (Ut = null),
    Mr.forEach(Us),
    Lr.forEach(Us);
}
function sr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Mi ||
      ((Mi = !0),
      Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, jp)));
}
function Ir(e) {
  function t(l) {
    return sr(l, e);
  }
  if (0 < pl.length) {
    sr(pl[0], e);
    for (var n = 1; n < pl.length; n++) {
      var r = pl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Ft !== null && sr(Ft, e),
      At !== null && sr(At, e),
      Ut !== null && sr(Ut, e),
      Mr.forEach(t),
      Lr.forEach(t),
      n = 0;
    n < Lt.length;
    n++
  )
    (r = Lt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Lt.length && ((n = Lt[0]), n.blockedOn === null); )
    Oc(n), n.blockedOn === null && Lt.shift();
}
var On = Et.ReactCurrentBatchConfig,
  Hl = !0;
function Fp(e, t, n, r) {
  var l = U,
    o = On.transition;
  On.transition = null;
  try {
    (U = 1), Ru(e, t, n, r);
  } finally {
    (U = l), (On.transition = o);
  }
}
function Ap(e, t, n, r) {
  var l = U,
    o = On.transition;
  On.transition = null;
  try {
    (U = 4), Ru(e, t, n, r);
  } finally {
    (U = l), (On.transition = o);
  }
}
function Ru(e, t, n, r) {
  if (Hl) {
    var l = Li(e, t, n, r);
    if (l === null) Jo(e, t, r, Ql, n), As(e, r);
    else if (Op(l, e, t, n, r)) r.stopPropagation();
    else if ((As(e, r), t & 4 && -1 < Ip.indexOf(e))) {
      for (; l !== null; ) {
        var o = qr(l);
        if (
          (o !== null && zc(o),
          (o = Li(e, t, n, r)),
          o === null && Jo(e, t, r, Ql, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Jo(e, t, r, null, n);
  }
}
var Ql = null;
function Li(e, t, n, r) {
  if (((Ql = null), (e = xu(r)), (e = en(e)), e !== null))
    if (((t = fn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Ec(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Ql = e), null;
}
function jc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Dp()) {
        case Eu:
          return 1;
        case Nc:
          return 4;
        case Vl:
        case Rp:
          return 16;
        case _c:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ot = null,
  Nu = null,
  Tl = null;
function Fc() {
  if (Tl) return Tl;
  var e,
    t = Nu,
    n = t.length,
    r,
    l = "value" in Ot ? Ot.value : Ot.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Tl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Pl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function hl() {
  return !0;
}
function $s() {
  return !1;
}
function Fe(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? hl
        : $s),
      (this.isPropagationStopped = $s),
      this
    );
  }
  return (
    G(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = hl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = hl));
      },
      persist: function () {},
      isPersistent: hl,
    }),
    t
  );
}
var Gn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  _u = Fe(Gn),
  Jr = G({}, Gn, { view: 0, detail: 0 }),
  Up = Fe(Jr),
  Vo,
  Wo,
  ar,
  go = G({}, Jr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Tu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ar &&
            (ar && e.type === "mousemove"
              ? ((Vo = e.screenX - ar.screenX), (Wo = e.screenY - ar.screenY))
              : (Wo = Vo = 0),
            (ar = e)),
          Vo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Wo;
    },
  }),
  Bs = Fe(go),
  $p = G({}, go, { dataTransfer: 0 }),
  Bp = Fe($p),
  Vp = G({}, Jr, { relatedTarget: 0 }),
  Ho = Fe(Vp),
  Wp = G({}, Gn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Hp = Fe(Wp),
  Qp = G({}, Gn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Xp = Fe(Qp),
  Kp = G({}, Gn, { data: 0 }),
  Vs = Fe(Kp),
  Gp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Yp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Zp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Jp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zp[e]) ? !!t[e] : !1;
}
function Tu() {
  return Jp;
}
var qp = G({}, Jr, {
    key: function (e) {
      if (e.key) {
        var t = Gp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Pl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Yp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Tu,
    charCode: function (e) {
      return e.type === "keypress" ? Pl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Pl(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  bp = Fe(qp),
  eh = G({}, go, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ws = Fe(eh),
  th = G({}, Jr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Tu,
  }),
  nh = Fe(th),
  rh = G({}, Gn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  lh = Fe(rh),
  oh = G({}, go, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  ih = Fe(oh),
  uh = [9, 13, 27, 32],
  Pu = wt && "CompositionEvent" in window,
  wr = null;
wt && "documentMode" in document && (wr = document.documentMode);
var sh = wt && "TextEvent" in window && !wr,
  Ac = wt && (!Pu || (wr && 8 < wr && 11 >= wr)),
  Hs = " ",
  Qs = !1;
function Uc(e, t) {
  switch (e) {
    case "keyup":
      return uh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function $c(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var xn = !1;
function ah(e, t) {
  switch (e) {
    case "compositionend":
      return $c(t);
    case "keypress":
      return t.which !== 32 ? null : ((Qs = !0), Hs);
    case "textInput":
      return (e = t.data), e === Hs && Qs ? null : e;
    default:
      return null;
  }
}
function ch(e, t) {
  if (xn)
    return e === "compositionend" || (!Pu && Uc(e, t))
      ? ((e = Fc()), (Tl = Nu = Ot = null), (xn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ac && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var dh = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Xs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!dh[e.type] : t === "textarea";
}
function Bc(e, t, n, r) {
  yc(r),
    (t = Xl(t, "onChange")),
    0 < t.length &&
      ((n = new _u("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Sr = null,
  Or = null;
function fh(e) {
  qc(e, 0);
}
function mo(e) {
  var t = Dn(e);
  if (dc(t)) return e;
}
function ph(e, t) {
  if (e === "change") return t;
}
var Vc = !1;
if (wt) {
  var Qo;
  if (wt) {
    var Xo = "oninput" in document;
    if (!Xo) {
      var Ks = document.createElement("div");
      Ks.setAttribute("oninput", "return;"),
        (Xo = typeof Ks.oninput == "function");
    }
    Qo = Xo;
  } else Qo = !1;
  Vc = Qo && (!document.documentMode || 9 < document.documentMode);
}
function Gs() {
  Sr && (Sr.detachEvent("onpropertychange", Wc), (Or = Sr = null));
}
function Wc(e) {
  if (e.propertyName === "value" && mo(Or)) {
    var t = [];
    Bc(t, Or, e, xu(e)), xc(fh, t);
  }
}
function hh(e, t, n) {
  e === "focusin"
    ? (Gs(), (Sr = t), (Or = n), Sr.attachEvent("onpropertychange", Wc))
    : e === "focusout" && Gs();
}
function vh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return mo(Or);
}
function gh(e, t) {
  if (e === "click") return mo(t);
}
function mh(e, t) {
  if (e === "input" || e === "change") return mo(t);
}
function yh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var et = typeof Object.is == "function" ? Object.is : yh;
function jr(e, t) {
  if (et(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!vi.call(t, l) || !et(e[l], t[l])) return !1;
  }
  return !0;
}
function Ys(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Zs(e, t) {
  var n = Ys(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ys(n);
  }
}
function Hc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Hc(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Qc() {
  for (var e = window, t = Ul(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ul(e.document);
  }
  return t;
}
function zu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function wh(e) {
  var t = Qc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Hc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && zu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Zs(n, o));
        var i = Zs(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Sh = wt && "documentMode" in document && 11 >= document.documentMode,
  En = null,
  Ii = null,
  kr = null,
  Oi = !1;
function Js(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oi ||
    En == null ||
    En !== Ul(r) ||
    ((r = En),
    "selectionStart" in r && zu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (kr && jr(kr, r)) ||
      ((kr = r),
      (r = Xl(Ii, "onSelect")),
      0 < r.length &&
        ((t = new _u("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = En))));
}
function vl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Cn = {
    animationend: vl("Animation", "AnimationEnd"),
    animationiteration: vl("Animation", "AnimationIteration"),
    animationstart: vl("Animation", "AnimationStart"),
    transitionend: vl("Transition", "TransitionEnd"),
  },
  Ko = {},
  Xc = {};
wt &&
  ((Xc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Cn.animationend.animation,
    delete Cn.animationiteration.animation,
    delete Cn.animationstart.animation),
  "TransitionEvent" in window || delete Cn.transitionend.transition);
function yo(e) {
  if (Ko[e]) return Ko[e];
  if (!Cn[e]) return e;
  var t = Cn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Xc) return (Ko[e] = t[n]);
  return e;
}
var Kc = yo("animationend"),
  Gc = yo("animationiteration"),
  Yc = yo("animationstart"),
  Zc = yo("transitionend"),
  Jc = new Map(),
  qs =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Kt(e, t) {
  Jc.set(e, t), dn(t, [e]);
}
for (var Go = 0; Go < qs.length; Go++) {
  var Yo = qs[Go],
    kh = Yo.toLowerCase(),
    xh = Yo[0].toUpperCase() + Yo.slice(1);
  Kt(kh, "on" + xh);
}
Kt(Kc, "onAnimationEnd");
Kt(Gc, "onAnimationIteration");
Kt(Yc, "onAnimationStart");
Kt("dblclick", "onDoubleClick");
Kt("focusin", "onFocus");
Kt("focusout", "onBlur");
Kt(Zc, "onTransitionEnd");
Un("onMouseEnter", ["mouseout", "mouseover"]);
Un("onMouseLeave", ["mouseout", "mouseover"]);
Un("onPointerEnter", ["pointerout", "pointerover"]);
Un("onPointerLeave", ["pointerout", "pointerover"]);
dn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
dn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
dn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
dn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
dn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
dn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var gr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Eh = new Set("cancel close invalid load scroll toggle".split(" ").concat(gr));
function bs(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), kp(r, t, void 0, e), (e.currentTarget = null);
}
function qc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i],
            s = u.instance,
            a = u.currentTarget;
          if (((u = u.listener), s !== o && l.isPropagationStopped())) break e;
          bs(l, u, a), (o = s);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((u = r[i]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== o && l.isPropagationStopped())
          )
            break e;
          bs(l, u, a), (o = s);
        }
    }
  }
  if (Bl) throw ((e = Pi), (Bl = !1), (Pi = null), e);
}
function W(e, t) {
  var n = t[$i];
  n === void 0 && (n = t[$i] = new Set());
  var r = e + "__bubble";
  n.has(r) || (bc(t, e, 2, !1), n.add(r));
}
function Zo(e, t, n) {
  var r = 0;
  t && (r |= 4), bc(n, e, r, t);
}
var gl = "_reactListening" + Math.random().toString(36).slice(2);
function Fr(e) {
  if (!e[gl]) {
    (e[gl] = !0),
      ic.forEach(function (n) {
        n !== "selectionchange" && (Eh.has(n) || Zo(n, !1, e), Zo(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[gl] || ((t[gl] = !0), Zo("selectionchange", !1, t));
  }
}
function bc(e, t, n, r) {
  switch (jc(t)) {
    case 1:
      var l = Fp;
      break;
    case 4:
      l = Ap;
      break;
    default:
      l = Ru;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !Ti ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Jo(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var s = i.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = i.stateNode.containerInfo),
              s === l || (s.nodeType === 8 && s.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; u !== null; ) {
          if (((i = en(u)), i === null)) return;
          if (((s = i.tag), s === 5 || s === 6)) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  xc(function () {
    var a = o,
      h = xu(n),
      f = [];
    e: {
      var v = Jc.get(e);
      if (v !== void 0) {
        var g = _u,
          S = e;
        switch (e) {
          case "keypress":
            if (Pl(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = bp;
            break;
          case "focusin":
            (S = "focus"), (g = Ho);
            break;
          case "focusout":
            (S = "blur"), (g = Ho);
            break;
          case "beforeblur":
          case "afterblur":
            g = Ho;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Bs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Bp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = nh;
            break;
          case Kc:
          case Gc:
          case Yc:
            g = Hp;
            break;
          case Zc:
            g = lh;
            break;
          case "scroll":
            g = Up;
            break;
          case "wheel":
            g = ih;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Xp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Ws;
        }
        var w = (t & 4) !== 0,
          R = !w && e === "scroll",
          d = w ? (v !== null ? v + "Capture" : null) : v;
        w = [];
        for (var c = a, p; c !== null; ) {
          p = c;
          var m = p.stateNode;
          if (
            (p.tag === 5 &&
              m !== null &&
              ((p = m),
              d !== null && ((m = zr(c, d)), m != null && w.push(Ar(c, m, p)))),
            R)
          )
            break;
          c = c.return;
        }
        0 < w.length &&
          ((v = new g(v, S, null, n, h)), f.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          v &&
            n !== Ni &&
            (S = n.relatedTarget || n.fromElement) &&
            (en(S) || S[St]))
        )
          break e;
        if (
          (g || v) &&
          ((v =
            h.window === h
              ? h
              : (v = h.ownerDocument)
              ? v.defaultView || v.parentWindow
              : window),
          g
            ? ((S = n.relatedTarget || n.toElement),
              (g = a),
              (S = S ? en(S) : null),
              S !== null &&
                ((R = fn(S)), S !== R || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((g = null), (S = a)),
          g !== S)
        ) {
          if (
            ((w = Bs),
            (m = "onMouseLeave"),
            (d = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = Ws),
              (m = "onPointerLeave"),
              (d = "onPointerEnter"),
              (c = "pointer")),
            (R = g == null ? v : Dn(g)),
            (p = S == null ? v : Dn(S)),
            (v = new w(m, c + "leave", g, n, h)),
            (v.target = R),
            (v.relatedTarget = p),
            (m = null),
            en(h) === a &&
              ((w = new w(d, c + "enter", S, n, h)),
              (w.target = p),
              (w.relatedTarget = R),
              (m = w)),
            (R = m),
            g && S)
          )
            t: {
              for (w = g, d = S, c = 0, p = w; p; p = wn(p)) c++;
              for (p = 0, m = d; m; m = wn(m)) p++;
              for (; 0 < c - p; ) (w = wn(w)), c--;
              for (; 0 < p - c; ) (d = wn(d)), p--;
              for (; c--; ) {
                if (w === d || (d !== null && w === d.alternate)) break t;
                (w = wn(w)), (d = wn(d));
              }
              w = null;
            }
          else w = null;
          g !== null && ea(f, v, g, w, !1),
            S !== null && R !== null && ea(f, R, S, w, !0);
        }
      }
      e: {
        if (
          ((v = a ? Dn(a) : window),
          (g = v.nodeName && v.nodeName.toLowerCase()),
          g === "select" || (g === "input" && v.type === "file"))
        )
          var k = ph;
        else if (Xs(v))
          if (Vc) k = mh;
          else {
            k = vh;
            var C = hh;
          }
        else
          (g = v.nodeName) &&
            g.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (k = gh);
        if (k && (k = k(e, a))) {
          Bc(f, k, n, h);
          break e;
        }
        C && C(e, v, a),
          e === "focusout" &&
            (C = v._wrapperState) &&
            C.controlled &&
            v.type === "number" &&
            xi(v, "number", v.value);
      }
      switch (((C = a ? Dn(a) : window), e)) {
        case "focusin":
          (Xs(C) || C.contentEditable === "true") &&
            ((En = C), (Ii = a), (kr = null));
          break;
        case "focusout":
          kr = Ii = En = null;
          break;
        case "mousedown":
          Oi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Oi = !1), Js(f, n, h);
          break;
        case "selectionchange":
          if (Sh) break;
        case "keydown":
        case "keyup":
          Js(f, n, h);
      }
      var E;
      if (Pu)
        e: {
          switch (e) {
            case "compositionstart":
              var D = "onCompositionStart";
              break e;
            case "compositionend":
              D = "onCompositionEnd";
              break e;
            case "compositionupdate":
              D = "onCompositionUpdate";
              break e;
          }
          D = void 0;
        }
      else
        xn
          ? Uc(e, n) && (D = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (D = "onCompositionStart");
      D &&
        (Ac &&
          n.locale !== "ko" &&
          (xn || D !== "onCompositionStart"
            ? D === "onCompositionEnd" && xn && (E = Fc())
            : ((Ot = h),
              (Nu = "value" in Ot ? Ot.value : Ot.textContent),
              (xn = !0))),
        (C = Xl(a, D)),
        0 < C.length &&
          ((D = new Vs(D, e, null, n, h)),
          f.push({ event: D, listeners: C }),
          E ? (D.data = E) : ((E = $c(n)), E !== null && (D.data = E)))),
        (E = sh ? ah(e, n) : ch(e, n)) &&
          ((a = Xl(a, "onBeforeInput")),
          0 < a.length &&
            ((h = new Vs("onBeforeInput", "beforeinput", null, n, h)),
            f.push({ event: h, listeners: a }),
            (h.data = E)));
    }
    qc(f, t);
  });
}
function Ar(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Xl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = zr(e, n)),
      o != null && r.unshift(Ar(e, o, l)),
      (o = zr(e, t)),
      o != null && r.push(Ar(e, o, l))),
      (e = e.return);
  }
  return r;
}
function wn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ea(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 &&
      a !== null &&
      ((u = a),
      l
        ? ((s = zr(n, o)), s != null && i.unshift(Ar(n, s, u)))
        : l || ((s = zr(n, o)), s != null && i.push(Ar(n, s, u)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Ch = /\r\n?/g,
  Dh = /\u0000|\uFFFD/g;
function ta(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Ch,
      `
`
    )
    .replace(Dh, "");
}
function ml(e, t, n) {
  if (((t = ta(t)), ta(e) !== t && n)) throw Error(x(425));
}
function Kl() {}
var ji = null,
  Fi = null;
function Ai(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ui = typeof setTimeout == "function" ? setTimeout : void 0,
  Rh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  na = typeof Promise == "function" ? Promise : void 0,
  Nh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof na < "u"
      ? function (e) {
          return na.resolve(null).then(e).catch(_h);
        }
      : Ui;
function _h(e) {
  setTimeout(function () {
    throw e;
  });
}
function qo(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), Ir(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Ir(t);
}
function $t(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ra(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Yn = Math.random().toString(36).slice(2),
  ut = "__reactFiber$" + Yn,
  Ur = "__reactProps$" + Yn,
  St = "__reactContainer$" + Yn,
  $i = "__reactEvents$" + Yn,
  Th = "__reactListeners$" + Yn,
  Ph = "__reactHandles$" + Yn;
function en(e) {
  var t = e[ut];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[St] || n[ut])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = ra(e); e !== null; ) {
          if ((n = e[ut])) return n;
          e = ra(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function qr(e) {
  return (
    (e = e[ut] || e[St]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Dn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function wo(e) {
  return e[Ur] || null;
}
var Bi = [],
  Rn = -1;
function Gt(e) {
  return { current: e };
}
function H(e) {
  0 > Rn || ((e.current = Bi[Rn]), (Bi[Rn] = null), Rn--);
}
function V(e, t) {
  Rn++, (Bi[Rn] = e.current), (e.current = t);
}
var Xt = {},
  ve = Gt(Xt),
  De = Gt(!1),
  on = Xt;
function $n(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Xt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Re(e) {
  return (e = e.childContextTypes), e != null;
}
function Gl() {
  H(De), H(ve);
}
function la(e, t, n) {
  if (ve.current !== Xt) throw Error(x(168));
  V(ve, t), V(De, n);
}
function ed(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(x(108, hp(e) || "Unknown", l));
  return G({}, n, r);
}
function Yl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Xt),
    (on = ve.current),
    V(ve, e),
    V(De, De.current),
    !0
  );
}
function oa(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n
    ? ((e = ed(e, t, on)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      H(De),
      H(ve),
      V(ve, e))
    : H(De),
    V(De, n);
}
var vt = null,
  So = !1,
  bo = !1;
function td(e) {
  vt === null ? (vt = [e]) : vt.push(e);
}
function zh(e) {
  (So = !0), td(e);
}
function Yt() {
  if (!bo && vt !== null) {
    bo = !0;
    var e = 0,
      t = U;
    try {
      var n = vt;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (vt = null), (So = !1);
    } catch (l) {
      throw (vt !== null && (vt = vt.slice(e + 1)), Rc(Eu, Yt), l);
    } finally {
      (U = t), (bo = !1);
    }
  }
  return null;
}
var Nn = [],
  _n = 0,
  Zl = null,
  Jl = 0,
  $e = [],
  Be = 0,
  un = null,
  gt = 1,
  mt = "";
function Jt(e, t) {
  (Nn[_n++] = Jl), (Nn[_n++] = Zl), (Zl = e), (Jl = t);
}
function nd(e, t, n) {
  ($e[Be++] = gt), ($e[Be++] = mt), ($e[Be++] = un), (un = e);
  var r = gt;
  e = mt;
  var l = 32 - qe(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - qe(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (gt = (1 << (32 - qe(t) + l)) | (n << l) | r),
      (mt = o + e);
  } else (gt = (1 << o) | (n << l) | r), (mt = e);
}
function Mu(e) {
  e.return !== null && (Jt(e, 1), nd(e, 1, 0));
}
function Lu(e) {
  for (; e === Zl; )
    (Zl = Nn[--_n]), (Nn[_n] = null), (Jl = Nn[--_n]), (Nn[_n] = null);
  for (; e === un; )
    (un = $e[--Be]),
      ($e[Be] = null),
      (mt = $e[--Be]),
      ($e[Be] = null),
      (gt = $e[--Be]),
      ($e[Be] = null);
}
var Ie = null,
  Le = null,
  Q = !1,
  Je = null;
function rd(e, t) {
  var n = Ve(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function ia(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ie = e), (Le = $t(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ie = e), (Le = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = un !== null ? { id: gt, overflow: mt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ve(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ie = e),
            (Le = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Vi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Wi(e) {
  if (Q) {
    var t = Le;
    if (t) {
      var n = t;
      if (!ia(e, t)) {
        if (Vi(e)) throw Error(x(418));
        t = $t(n.nextSibling);
        var r = Ie;
        t && ia(e, t)
          ? rd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Ie = e));
      }
    } else {
      if (Vi(e)) throw Error(x(418));
      (e.flags = (e.flags & -4097) | 2), (Q = !1), (Ie = e);
    }
  }
}
function ua(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ie = e;
}
function yl(e) {
  if (e !== Ie) return !1;
  if (!Q) return ua(e), (Q = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ai(e.type, e.memoizedProps))),
    t && (t = Le))
  ) {
    if (Vi(e)) throw (ld(), Error(x(418)));
    for (; t; ) rd(e, t), (t = $t(t.nextSibling));
  }
  if ((ua(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Le = $t(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = Ie ? $t(e.stateNode.nextSibling) : null;
  return !0;
}
function ld() {
  for (var e = Le; e; ) e = $t(e.nextSibling);
}
function Bn() {
  (Le = Ie = null), (Q = !1);
}
function Iu(e) {
  Je === null ? (Je = [e]) : Je.push(e);
}
var Mh = Et.ReactCurrentBatchConfig;
function cr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var u = l.refs;
            i === null ? delete u[o] : (u[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function wl(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      x(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function sa(e) {
  var t = e._init;
  return t(e._payload);
}
function od(e) {
  function t(d, c) {
    if (e) {
      var p = d.deletions;
      p === null ? ((d.deletions = [c]), (d.flags |= 16)) : p.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), (c = c.sibling);
    return null;
  }
  function r(d, c) {
    for (d = new Map(); c !== null; )
      c.key !== null ? d.set(c.key, c) : d.set(c.index, c), (c = c.sibling);
    return d;
  }
  function l(d, c) {
    return (d = Ht(d, c)), (d.index = 0), (d.sibling = null), d;
  }
  function o(d, c, p) {
    return (
      (d.index = p),
      e
        ? ((p = d.alternate),
          p !== null
            ? ((p = p.index), p < c ? ((d.flags |= 2), c) : p)
            : ((d.flags |= 2), c))
        : ((d.flags |= 1048576), c)
    );
  }
  function i(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, c, p, m) {
    return c === null || c.tag !== 6
      ? ((c = ii(p, d.mode, m)), (c.return = d), c)
      : ((c = l(c, p)), (c.return = d), c);
  }
  function s(d, c, p, m) {
    var k = p.type;
    return k === kn
      ? h(d, c, p.props.children, m, p.key)
      : c !== null &&
        (c.elementType === k ||
          (typeof k == "object" &&
            k !== null &&
            k.$$typeof === Pt &&
            sa(k) === c.type))
      ? ((m = l(c, p.props)), (m.ref = cr(d, c, p)), (m.return = d), m)
      : ((m = Fl(p.type, p.key, p.props, null, d.mode, m)),
        (m.ref = cr(d, c, p)),
        (m.return = d),
        m);
  }
  function a(d, c, p, m) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = ui(p, d.mode, m)), (c.return = d), c)
      : ((c = l(c, p.children || [])), (c.return = d), c);
  }
  function h(d, c, p, m, k) {
    return c === null || c.tag !== 7
      ? ((c = ln(p, d.mode, m, k)), (c.return = d), c)
      : ((c = l(c, p)), (c.return = d), c);
  }
  function f(d, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = ii("" + c, d.mode, p)), (c.return = d), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case sl:
          return (
            (p = Fl(c.type, c.key, c.props, null, d.mode, p)),
            (p.ref = cr(d, null, c)),
            (p.return = d),
            p
          );
        case Sn:
          return (c = ui(c, d.mode, p)), (c.return = d), c;
        case Pt:
          var m = c._init;
          return f(d, m(c._payload), p);
      }
      if (hr(c) || or(c))
        return (c = ln(c, d.mode, p, null)), (c.return = d), c;
      wl(d, c);
    }
    return null;
  }
  function v(d, c, p, m) {
    var k = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return k !== null ? null : u(d, c, "" + p, m);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case sl:
          return p.key === k ? s(d, c, p, m) : null;
        case Sn:
          return p.key === k ? a(d, c, p, m) : null;
        case Pt:
          return (k = p._init), v(d, c, k(p._payload), m);
      }
      if (hr(p) || or(p)) return k !== null ? null : h(d, c, p, m, null);
      wl(d, p);
    }
    return null;
  }
  function g(d, c, p, m, k) {
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return (d = d.get(p) || null), u(c, d, "" + m, k);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case sl:
          return (d = d.get(m.key === null ? p : m.key) || null), s(c, d, m, k);
        case Sn:
          return (d = d.get(m.key === null ? p : m.key) || null), a(c, d, m, k);
        case Pt:
          var C = m._init;
          return g(d, c, p, C(m._payload), k);
      }
      if (hr(m) || or(m)) return (d = d.get(p) || null), h(c, d, m, k, null);
      wl(c, m);
    }
    return null;
  }
  function S(d, c, p, m) {
    for (
      var k = null, C = null, E = c, D = (c = 0), M = null;
      E !== null && D < p.length;
      D++
    ) {
      E.index > D ? ((M = E), (E = null)) : (M = E.sibling);
      var T = v(d, E, p[D], m);
      if (T === null) {
        E === null && (E = M);
        break;
      }
      e && E && T.alternate === null && t(d, E),
        (c = o(T, c, D)),
        C === null ? (k = T) : (C.sibling = T),
        (C = T),
        (E = M);
    }
    if (D === p.length) return n(d, E), Q && Jt(d, D), k;
    if (E === null) {
      for (; D < p.length; D++)
        (E = f(d, p[D], m)),
          E !== null &&
            ((c = o(E, c, D)), C === null ? (k = E) : (C.sibling = E), (C = E));
      return Q && Jt(d, D), k;
    }
    for (E = r(d, E); D < p.length; D++)
      (M = g(E, d, D, p[D], m)),
        M !== null &&
          (e && M.alternate !== null && E.delete(M.key === null ? D : M.key),
          (c = o(M, c, D)),
          C === null ? (k = M) : (C.sibling = M),
          (C = M));
    return (
      e &&
        E.forEach(function (I) {
          return t(d, I);
        }),
      Q && Jt(d, D),
      k
    );
  }
  function w(d, c, p, m) {
    var k = or(p);
    if (typeof k != "function") throw Error(x(150));
    if (((p = k.call(p)), p == null)) throw Error(x(151));
    for (
      var C = (k = null), E = c, D = (c = 0), M = null, T = p.next();
      E !== null && !T.done;
      D++, T = p.next()
    ) {
      E.index > D ? ((M = E), (E = null)) : (M = E.sibling);
      var I = v(d, E, T.value, m);
      if (I === null) {
        E === null && (E = M);
        break;
      }
      e && E && I.alternate === null && t(d, E),
        (c = o(I, c, D)),
        C === null ? (k = I) : (C.sibling = I),
        (C = I),
        (E = M);
    }
    if (T.done) return n(d, E), Q && Jt(d, D), k;
    if (E === null) {
      for (; !T.done; D++, T = p.next())
        (T = f(d, T.value, m)),
          T !== null &&
            ((c = o(T, c, D)), C === null ? (k = T) : (C.sibling = T), (C = T));
      return Q && Jt(d, D), k;
    }
    for (E = r(d, E); !T.done; D++, T = p.next())
      (T = g(E, d, D, T.value, m)),
        T !== null &&
          (e && T.alternate !== null && E.delete(T.key === null ? D : T.key),
          (c = o(T, c, D)),
          C === null ? (k = T) : (C.sibling = T),
          (C = T));
    return (
      e &&
        E.forEach(function (oe) {
          return t(d, oe);
        }),
      Q && Jt(d, D),
      k
    );
  }
  function R(d, c, p, m) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === kn &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case sl:
          e: {
            for (var k = p.key, C = c; C !== null; ) {
              if (C.key === k) {
                if (((k = p.type), k === kn)) {
                  if (C.tag === 7) {
                    n(d, C.sibling),
                      (c = l(C, p.props.children)),
                      (c.return = d),
                      (d = c);
                    break e;
                  }
                } else if (
                  C.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === Pt &&
                    sa(k) === C.type)
                ) {
                  n(d, C.sibling),
                    (c = l(C, p.props)),
                    (c.ref = cr(d, C, p)),
                    (c.return = d),
                    (d = c);
                  break e;
                }
                n(d, C);
                break;
              } else t(d, C);
              C = C.sibling;
            }
            p.type === kn
              ? ((c = ln(p.props.children, d.mode, m, p.key)),
                (c.return = d),
                (d = c))
              : ((m = Fl(p.type, p.key, p.props, null, d.mode, m)),
                (m.ref = cr(d, c, p)),
                (m.return = d),
                (d = m));
          }
          return i(d);
        case Sn:
          e: {
            for (C = p.key; c !== null; ) {
              if (c.key === C)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(d, c.sibling),
                    (c = l(c, p.children || [])),
                    (c.return = d),
                    (d = c);
                  break e;
                } else {
                  n(d, c);
                  break;
                }
              else t(d, c);
              c = c.sibling;
            }
            (c = ui(p, d.mode, m)), (c.return = d), (d = c);
          }
          return i(d);
        case Pt:
          return (C = p._init), R(d, c, C(p._payload), m);
      }
      if (hr(p)) return S(d, c, p, m);
      if (or(p)) return w(d, c, p, m);
      wl(d, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(d, c.sibling), (c = l(c, p)), (c.return = d), (d = c))
          : (n(d, c), (c = ii(p, d.mode, m)), (c.return = d), (d = c)),
        i(d))
      : n(d, c);
  }
  return R;
}
var Vn = od(!0),
  id = od(!1),
  ql = Gt(null),
  bl = null,
  Tn = null,
  Ou = null;
function ju() {
  Ou = Tn = bl = null;
}
function Fu(e) {
  var t = ql.current;
  H(ql), (e._currentValue = t);
}
function Hi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function jn(e, t) {
  (bl = e),
    (Ou = Tn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ce = !0), (e.firstContext = null));
}
function He(e) {
  var t = e._currentValue;
  if (Ou !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Tn === null)) {
      if (bl === null) throw Error(x(308));
      (Tn = e), (bl.dependencies = { lanes: 0, firstContext: e });
    } else Tn = Tn.next = e;
  return t;
}
var tn = null;
function Au(e) {
  tn === null ? (tn = [e]) : tn.push(e);
}
function ud(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Au(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    kt(e, r)
  );
}
function kt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var zt = !1;
function Uu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function sd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function yt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Bt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), F & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      kt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Au(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    kt(e, n)
  );
}
function zl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Cu(e, n);
  }
}
function aa(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function eo(e, t, n, r) {
  var l = e.updateQueue;
  zt = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u,
      a = s.next;
    (s.next = null), i === null ? (o = a) : (i.next = a), (i = s);
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (u = h.lastBaseUpdate),
      u !== i &&
        (u === null ? (h.firstBaseUpdate = a) : (u.next = a),
        (h.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var f = l.baseState;
    (i = 0), (h = a = s = null), (u = o);
    do {
      var v = u.lane,
        g = u.eventTime;
      if ((r & v) === v) {
        h !== null &&
          (h = h.next =
            {
              eventTime: g,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var S = e,
            w = u;
          switch (((v = t), (g = n), w.tag)) {
            case 1:
              if (((S = w.payload), typeof S == "function")) {
                f = S.call(g, f, v);
                break e;
              }
              f = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = w.payload),
                (v = typeof S == "function" ? S.call(g, f, v) : S),
                v == null)
              )
                break e;
              f = G({}, f, v);
              break e;
            case 2:
              zt = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (v = l.effects),
          v === null ? (l.effects = [u]) : v.push(u));
      } else
        (g = {
          eventTime: g,
          lane: v,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          h === null ? ((a = h = g), (s = f)) : (h = h.next = g),
          (i |= v);
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        (v = u),
          (u = v.next),
          (v.next = null),
          (l.lastBaseUpdate = v),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (h === null && (s = f),
      (l.baseState = s),
      (l.firstBaseUpdate = a),
      (l.lastBaseUpdate = h),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (an |= i), (e.lanes = i), (e.memoizedState = f);
  }
}
function ca(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(x(191, l));
        l.call(r);
      }
    }
}
var br = {},
  at = Gt(br),
  $r = Gt(br),
  Br = Gt(br);
function nn(e) {
  if (e === br) throw Error(x(174));
  return e;
}
function $u(e, t) {
  switch ((V(Br, t), V($r, e), V(at, br), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ci(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ci(t, e));
  }
  H(at), V(at, t);
}
function Wn() {
  H(at), H($r), H(Br);
}
function ad(e) {
  nn(Br.current);
  var t = nn(at.current),
    n = Ci(t, e.type);
  t !== n && (V($r, e), V(at, n));
}
function Bu(e) {
  $r.current === e && (H(at), H($r));
}
var X = Gt(0);
function to(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var ei = [];
function Vu() {
  for (var e = 0; e < ei.length; e++)
    ei[e]._workInProgressVersionPrimary = null;
  ei.length = 0;
}
var Ml = Et.ReactCurrentDispatcher,
  ti = Et.ReactCurrentBatchConfig,
  sn = 0,
  K = null,
  b = null,
  ne = null,
  no = !1,
  xr = !1,
  Vr = 0,
  Lh = 0;
function fe() {
  throw Error(x(321));
}
function Wu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!et(e[n], t[n])) return !1;
  return !0;
}
function Hu(e, t, n, r, l, o) {
  if (
    ((sn = o),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ml.current = e === null || e.memoizedState === null ? Fh : Ah),
    (e = n(r, l)),
    xr)
  ) {
    o = 0;
    do {
      if (((xr = !1), (Vr = 0), 25 <= o)) throw Error(x(301));
      (o += 1),
        (ne = b = null),
        (t.updateQueue = null),
        (Ml.current = Uh),
        (e = n(r, l));
    } while (xr);
  }
  if (
    ((Ml.current = ro),
    (t = b !== null && b.next !== null),
    (sn = 0),
    (ne = b = K = null),
    (no = !1),
    t)
  )
    throw Error(x(300));
  return e;
}
function Qu() {
  var e = Vr !== 0;
  return (Vr = 0), e;
}
function it() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ne === null ? (K.memoizedState = ne = e) : (ne = ne.next = e), ne;
}
function Qe() {
  if (b === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = b.next;
  var t = ne === null ? K.memoizedState : ne.next;
  if (t !== null) (ne = t), (b = e);
  else {
    if (e === null) throw Error(x(310));
    (b = e),
      (e = {
        memoizedState: b.memoizedState,
        baseState: b.baseState,
        baseQueue: b.baseQueue,
        queue: b.queue,
        next: null,
      }),
      ne === null ? (K.memoizedState = ne = e) : (ne = ne.next = e);
  }
  return ne;
}
function Wr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ni(e) {
  var t = Qe(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = b,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var u = (i = null),
      s = null,
      a = o;
    do {
      var h = a.lane;
      if ((sn & h) === h)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var f = {
          lane: h,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        s === null ? ((u = s = f), (i = r)) : (s = s.next = f),
          (K.lanes |= h),
          (an |= h);
      }
      a = a.next;
    } while (a !== null && a !== o);
    s === null ? (i = r) : (s.next = u),
      et(r, t.memoizedState) || (Ce = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (K.lanes |= o), (an |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ri(e) {
  var t = Qe(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    et(o, t.memoizedState) || (Ce = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function cd() {}
function dd(e, t) {
  var n = K,
    r = Qe(),
    l = t(),
    o = !et(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (Ce = !0)),
    (r = r.queue),
    Xu(hd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ne !== null && ne.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Hr(9, pd.bind(null, n, r, l, t), void 0, null),
      le === null)
    )
      throw Error(x(349));
    sn & 30 || fd(n, t, l);
  }
  return l;
}
function fd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function pd(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), vd(t) && gd(e);
}
function hd(e, t, n) {
  return n(function () {
    vd(t) && gd(e);
  });
}
function vd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !et(e, n);
  } catch {
    return !0;
  }
}
function gd(e) {
  var t = kt(e, 1);
  t !== null && be(t, e, 1, -1);
}
function da(e) {
  var t = it();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = jh.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function Hr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function md() {
  return Qe().memoizedState;
}
function Ll(e, t, n, r) {
  var l = it();
  (K.flags |= e),
    (l.memoizedState = Hr(1 | t, n, void 0, r === void 0 ? null : r));
}
function ko(e, t, n, r) {
  var l = Qe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (b !== null) {
    var i = b.memoizedState;
    if (((o = i.destroy), r !== null && Wu(r, i.deps))) {
      l.memoizedState = Hr(t, n, o, r);
      return;
    }
  }
  (K.flags |= e), (l.memoizedState = Hr(1 | t, n, o, r));
}
function fa(e, t) {
  return Ll(8390656, 8, e, t);
}
function Xu(e, t) {
  return ko(2048, 8, e, t);
}
function yd(e, t) {
  return ko(4, 2, e, t);
}
function wd(e, t) {
  return ko(4, 4, e, t);
}
function Sd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function kd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), ko(4, 4, Sd.bind(null, t, e), n)
  );
}
function Ku() {}
function xd(e, t) {
  var n = Qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Wu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Ed(e, t) {
  var n = Qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Wu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Cd(e, t, n) {
  return sn & 21
    ? (et(n, t) || ((n = Tc()), (K.lanes |= n), (an |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ce = !0)), (e.memoizedState = n));
}
function Ih(e, t) {
  var n = U;
  (U = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ti.transition;
  ti.transition = {};
  try {
    e(!1), t();
  } finally {
    (U = n), (ti.transition = r);
  }
}
function Dd() {
  return Qe().memoizedState;
}
function Oh(e, t, n) {
  var r = Wt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Rd(e))
  )
    Nd(t, n);
  else if (((n = ud(e, t, n, r)), n !== null)) {
    var l = we();
    be(n, e, r, l), _d(n, t, r);
  }
}
function jh(e, t, n) {
  var r = Wt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Rd(e)) Nd(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          u = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), et(u, i))) {
          var s = t.interleaved;
          s === null
            ? ((l.next = l), Au(t))
            : ((l.next = s.next), (s.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = ud(e, t, l, r)),
      n !== null && ((l = we()), be(n, e, r, l), _d(n, t, r));
  }
}
function Rd(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function Nd(e, t) {
  xr = no = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function _d(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Cu(e, n);
  }
}
var ro = {
    readContext: He,
    useCallback: fe,
    useContext: fe,
    useEffect: fe,
    useImperativeHandle: fe,
    useInsertionEffect: fe,
    useLayoutEffect: fe,
    useMemo: fe,
    useReducer: fe,
    useRef: fe,
    useState: fe,
    useDebugValue: fe,
    useDeferredValue: fe,
    useTransition: fe,
    useMutableSource: fe,
    useSyncExternalStore: fe,
    useId: fe,
    unstable_isNewReconciler: !1,
  },
  Fh = {
    readContext: He,
    useCallback: function (e, t) {
      return (it().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: He,
    useEffect: fa,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ll(4194308, 4, Sd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ll(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ll(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = it();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = it();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Oh.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = it();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: da,
    useDebugValue: Ku,
    useDeferredValue: function (e) {
      return (it().memoizedState = e);
    },
    useTransition: function () {
      var e = da(!1),
        t = e[0];
      return (e = Ih.bind(null, e[1])), (it().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        l = it();
      if (Q) {
        if (n === void 0) throw Error(x(407));
        n = n();
      } else {
        if (((n = t()), le === null)) throw Error(x(349));
        sn & 30 || fd(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        fa(hd.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Hr(9, pd.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = it(),
        t = le.identifierPrefix;
      if (Q) {
        var n = mt,
          r = gt;
        (n = (r & ~(1 << (32 - qe(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Vr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Lh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Ah = {
    readContext: He,
    useCallback: xd,
    useContext: He,
    useEffect: Xu,
    useImperativeHandle: kd,
    useInsertionEffect: yd,
    useLayoutEffect: wd,
    useMemo: Ed,
    useReducer: ni,
    useRef: md,
    useState: function () {
      return ni(Wr);
    },
    useDebugValue: Ku,
    useDeferredValue: function (e) {
      var t = Qe();
      return Cd(t, b.memoizedState, e);
    },
    useTransition: function () {
      var e = ni(Wr)[0],
        t = Qe().memoizedState;
      return [e, t];
    },
    useMutableSource: cd,
    useSyncExternalStore: dd,
    useId: Dd,
    unstable_isNewReconciler: !1,
  },
  Uh = {
    readContext: He,
    useCallback: xd,
    useContext: He,
    useEffect: Xu,
    useImperativeHandle: kd,
    useInsertionEffect: yd,
    useLayoutEffect: wd,
    useMemo: Ed,
    useReducer: ri,
    useRef: md,
    useState: function () {
      return ri(Wr);
    },
    useDebugValue: Ku,
    useDeferredValue: function (e) {
      var t = Qe();
      return b === null ? (t.memoizedState = e) : Cd(t, b.memoizedState, e);
    },
    useTransition: function () {
      var e = ri(Wr)[0],
        t = Qe().memoizedState;
      return [e, t];
    },
    useMutableSource: cd,
    useSyncExternalStore: dd,
    useId: Dd,
    unstable_isNewReconciler: !1,
  };
function Ye(e, t) {
  if (e && e.defaultProps) {
    (t = G({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Qi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : G({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var xo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? fn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = we(),
      l = Wt(e),
      o = yt(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = Bt(e, o, l)),
      t !== null && (be(t, e, l, r), zl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = we(),
      l = Wt(e),
      o = yt(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Bt(e, o, l)),
      t !== null && (be(t, e, l, r), zl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = we(),
      r = Wt(e),
      l = yt(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = Bt(e, l, r)),
      t !== null && (be(t, e, r, n), zl(t, e, r));
  },
};
function pa(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !jr(n, r) || !jr(l, o)
      : !0
  );
}
function Td(e, t, n) {
  var r = !1,
    l = Xt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = He(o))
      : ((l = Re(t) ? on : ve.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? $n(e, l) : Xt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = xo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function ha(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && xo.enqueueReplaceState(t, t.state, null);
}
function Xi(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Uu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = He(o))
    : ((o = Re(t) ? on : ve.current), (l.context = $n(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Qi(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && xo.enqueueReplaceState(l, l.state, null),
      eo(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Hn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += pp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function li(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ki(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var $h = typeof WeakMap == "function" ? WeakMap : Map;
function Pd(e, t, n) {
  (n = yt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      oo || ((oo = !0), (ru = r)), Ki(e, t);
    }),
    n
  );
}
function zd(e, t, n) {
  (n = yt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Ki(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Ki(e, t),
          typeof r != "function" &&
            (Vt === null ? (Vt = new Set([this])) : Vt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function va(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new $h();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = ev.bind(null, e, t, n)), t.then(e, e));
}
function ga(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ma(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = yt(-1, 1)), (t.tag = 2), Bt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Bh = Et.ReactCurrentOwner,
  Ce = !1;
function me(e, t, n, r) {
  t.child = e === null ? id(t, null, n, r) : Vn(t, e.child, n, r);
}
function ya(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    jn(t, l),
    (r = Hu(e, t, n, r, o, l)),
    (n = Qu()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        xt(e, t, l))
      : (Q && n && Mu(t), (t.flags |= 1), me(e, t, r, l), t.child)
  );
}
function wa(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !ts(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Md(e, t, o, r, l))
      : ((e = Fl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : jr), n(i, r) && e.ref === t.ref)
    )
      return xt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Ht(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Md(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (jr(o, r) && e.ref === t.ref)
      if (((Ce = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ce = !0);
      else return (t.lanes = e.lanes), xt(e, t, l);
  }
  return Gi(e, t, n, r, l);
}
function Ld(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        V(zn, Me),
        (Me |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          V(zn, Me),
          (Me |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        V(zn, Me),
        (Me |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      V(zn, Me),
      (Me |= r);
  return me(e, t, l, n), t.child;
}
function Id(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Gi(e, t, n, r, l) {
  var o = Re(n) ? on : ve.current;
  return (
    (o = $n(t, o)),
    jn(t, l),
    (n = Hu(e, t, n, r, o, l)),
    (r = Qu()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        xt(e, t, l))
      : (Q && r && Mu(t), (t.flags |= 1), me(e, t, n, l), t.child)
  );
}
function Sa(e, t, n, r, l) {
  if (Re(n)) {
    var o = !0;
    Yl(t);
  } else o = !1;
  if ((jn(t, l), t.stateNode === null))
    Il(e, t), Td(t, n, r), Xi(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      u = t.memoizedProps;
    i.props = u;
    var s = i.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = He(a))
      : ((a = Re(n) ? on : ve.current), (a = $n(t, a)));
    var h = n.getDerivedStateFromProps,
      f =
        typeof h == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== r || s !== a) && ha(t, i, r, a)),
      (zt = !1);
    var v = t.memoizedState;
    (i.state = v),
      eo(t, r, i, l),
      (s = t.memoizedState),
      u !== r || v !== s || De.current || zt
        ? (typeof h == "function" && (Qi(t, n, h, r), (s = t.memoizedState)),
          (u = zt || pa(t, n, u, r, v, s, a))
            ? (f ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (i.props = r),
          (i.state = s),
          (i.context = a),
          (r = u))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      sd(e, t),
      (u = t.memoizedProps),
      (a = t.type === t.elementType ? u : Ye(t.type, u)),
      (i.props = a),
      (f = t.pendingProps),
      (v = i.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = He(s))
        : ((s = Re(n) ? on : ve.current), (s = $n(t, s)));
    var g = n.getDerivedStateFromProps;
    (h =
      typeof g == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== f || v !== s) && ha(t, i, r, s)),
      (zt = !1),
      (v = t.memoizedState),
      (i.state = v),
      eo(t, r, i, l);
    var S = t.memoizedState;
    u !== f || v !== S || De.current || zt
      ? (typeof g == "function" && (Qi(t, n, g, r), (S = t.memoizedState)),
        (a = zt || pa(t, n, a, r, v, S, s) || !1)
          ? (h ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, S, s),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, S, s)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
        (i.context = s),
        (r = a))
      : (typeof i.componentDidUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Yi(e, t, n, r, o, l);
}
function Yi(e, t, n, r, l, o) {
  Id(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && oa(t, n, !1), xt(e, t, o);
  (r = t.stateNode), (Bh.current = t);
  var u =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Vn(t, e.child, null, o)), (t.child = Vn(t, null, u, o)))
      : me(e, t, u, o),
    (t.memoizedState = r.state),
    l && oa(t, n, !0),
    t.child
  );
}
function Od(e) {
  var t = e.stateNode;
  t.pendingContext
    ? la(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && la(e, t.context, !1),
    $u(e, t.containerInfo);
}
function ka(e, t, n, r, l) {
  return Bn(), Iu(l), (t.flags |= 256), me(e, t, n, r), t.child;
}
var Zi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ji(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function jd(e, t, n) {
  var r = t.pendingProps,
    l = X.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    u;
  if (
    ((u = i) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    V(X, l & 1),
    e === null)
  )
    return (
      Wi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = Do(i, r, 0, null)),
              (e = ln(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ji(n)),
              (t.memoizedState = Zi),
              e)
            : Gu(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return Vh(e, t, i, r, u, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = Ht(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (o = Ht(u, o)) : ((o = ln(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Ji(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Zi),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Ht(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Gu(e, t) {
  return (
    (t = Do({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Sl(e, t, n, r) {
  return (
    r !== null && Iu(r),
    Vn(t, e.child, null, n),
    (e = Gu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Vh(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = li(Error(x(422)))), Sl(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = Do({ mode: "visible", children: r.children }, l, 0, null)),
        (o = ln(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && Vn(t, e.child, null, i),
        (t.child.memoizedState = Ji(i)),
        (t.memoizedState = Zi),
        o);
  if (!(t.mode & 1)) return Sl(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (o = Error(x(419))), (r = li(o, r, void 0)), Sl(e, t, i, r);
  }
  if (((u = (i & e.childLanes) !== 0), Ce || u)) {
    if (((r = le), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), kt(e, l), be(r, e, l, -1));
    }
    return es(), (r = li(Error(x(421)))), Sl(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = tv.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Le = $t(l.nextSibling)),
      (Ie = t),
      (Q = !0),
      (Je = null),
      e !== null &&
        (($e[Be++] = gt),
        ($e[Be++] = mt),
        ($e[Be++] = un),
        (gt = e.id),
        (mt = e.overflow),
        (un = t)),
      (t = Gu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function xa(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Hi(e.return, t, n);
}
function oi(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function Fd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((me(e, t, r.children, n), (r = X.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && xa(e, n, t);
        else if (e.tag === 19) xa(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((V(X, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && to(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          oi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && to(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        oi(t, !0, n, null, o);
        break;
      case "together":
        oi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Il(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function xt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (an |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Ht(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Ht(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Wh(e, t, n) {
  switch (t.tag) {
    case 3:
      Od(t), Bn();
      break;
    case 5:
      ad(t);
      break;
    case 1:
      Re(t.type) && Yl(t);
      break;
    case 4:
      $u(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      V(ql, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (V(X, X.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? jd(e, t, n)
          : (V(X, X.current & 1),
            (e = xt(e, t, n)),
            e !== null ? e.sibling : null);
      V(X, X.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Fd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        V(X, X.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Ld(e, t, n);
  }
  return xt(e, t, n);
}
var Ad, qi, Ud, $d;
Ad = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
qi = function () {};
Ud = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), nn(at.current);
    var o = null;
    switch (n) {
      case "input":
        (l = Si(e, l)), (r = Si(e, r)), (o = []);
        break;
      case "select":
        (l = G({}, l, { value: void 0 })),
          (r = G({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = Ei(e, l)), (r = Ei(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Kl);
    }
    Di(n, r);
    var i;
    n = null;
    for (a in l)
      if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
        if (a === "style") {
          var u = l[a];
          for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (Tr.hasOwnProperty(a)
              ? o || (o = [])
              : (o = o || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (
        ((u = l != null ? l[a] : void 0),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === "style")
          if (u) {
            for (i in u)
              !u.hasOwnProperty(i) ||
                (s && s.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in s)
              s.hasOwnProperty(i) &&
                u[i] !== s[i] &&
                (n || (n = {}), (n[i] = s[i]));
          } else n || (o || (o = []), o.push(a, n)), (n = s);
        else
          a === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (o = o || []).push(a, s))
            : a === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (o = o || []).push(a, "" + s)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (Tr.hasOwnProperty(a)
                ? (s != null && a === "onScroll" && W("scroll", e),
                  o || u === s || (o = []))
                : (o = o || []).push(a, s));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
$d = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function dr(e, t) {
  if (!Q)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function pe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Hh(e, t, n) {
  var r = t.pendingProps;
  switch ((Lu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return pe(t), null;
    case 1:
      return Re(t.type) && Gl(), pe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Wn(),
        H(De),
        H(ve),
        Vu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (yl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Je !== null && (iu(Je), (Je = null)))),
        qi(e, t),
        pe(t),
        null
      );
    case 5:
      Bu(t);
      var l = nn(Br.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Ud(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return pe(t), null;
        }
        if (((e = nn(at.current)), yl(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[ut] = t), (r[Ur] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              W("cancel", r), W("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              W("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < gr.length; l++) W(gr[l], r);
              break;
            case "source":
              W("error", r);
              break;
            case "img":
            case "image":
            case "link":
              W("error", r), W("load", r);
              break;
            case "details":
              W("toggle", r);
              break;
            case "input":
              zs(r, o), W("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                W("invalid", r);
              break;
            case "textarea":
              Ls(r, o), W("invalid", r);
          }
          Di(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (o.suppressHydrationWarning !== !0 &&
                      ml(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (o.suppressHydrationWarning !== !0 &&
                      ml(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Tr.hasOwnProperty(i) &&
                  u != null &&
                  i === "onScroll" &&
                  W("scroll", r);
            }
          switch (n) {
            case "input":
              al(r), Ms(r, o, !0);
              break;
            case "textarea":
              al(r), Is(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Kl);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = hc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[ut] = t),
            (e[Ur] = r),
            Ad(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = Ri(n, r)), n)) {
              case "dialog":
                W("cancel", e), W("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                W("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < gr.length; l++) W(gr[l], e);
                l = r;
                break;
              case "source":
                W("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                W("error", e), W("load", e), (l = r);
                break;
              case "details":
                W("toggle", e), (l = r);
                break;
              case "input":
                zs(e, r), (l = Si(e, r)), W("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = G({}, r, { value: void 0 })),
                  W("invalid", e);
                break;
              case "textarea":
                Ls(e, r), (l = Ei(e, r)), W("invalid", e);
                break;
              default:
                l = r;
            }
            Di(n, l), (u = l);
            for (o in u)
              if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === "style"
                  ? mc(e, s)
                  : o === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && vc(e, s))
                  : o === "children"
                  ? typeof s == "string"
                    ? (n !== "textarea" || s !== "") && Pr(e, s)
                    : typeof s == "number" && Pr(e, "" + s)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Tr.hasOwnProperty(o)
                      ? s != null && o === "onScroll" && W("scroll", e)
                      : s != null && yu(e, o, s, i));
              }
            switch (n) {
              case "input":
                al(e), Ms(e, r, !1);
                break;
              case "textarea":
                al(e), Is(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Qt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Mn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Mn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Kl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return pe(t), null;
    case 6:
      if (e && t.stateNode != null) $d(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (((n = nn(Br.current)), nn(at.current), yl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[ut] = t),
            (o = r.nodeValue !== n) && ((e = Ie), e !== null))
          )
            switch (e.tag) {
              case 3:
                ml(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ml(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[ut] = t),
            (t.stateNode = r);
      }
      return pe(t), null;
    case 13:
      if (
        (H(X),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Q && Le !== null && t.mode & 1 && !(t.flags & 128))
          ld(), Bn(), (t.flags |= 98560), (o = !1);
        else if (((o = yl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(x(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(x(317));
            o[ut] = t;
          } else
            Bn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          pe(t), (o = !1);
        } else Je !== null && (iu(Je), (Je = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || X.current & 1 ? te === 0 && (te = 3) : es())),
          t.updateQueue !== null && (t.flags |= 4),
          pe(t),
          null);
    case 4:
      return (
        Wn(), qi(e, t), e === null && Fr(t.stateNode.containerInfo), pe(t), null
      );
    case 10:
      return Fu(t.type._context), pe(t), null;
    case 17:
      return Re(t.type) && Gl(), pe(t), null;
    case 19:
      if ((H(X), (o = t.memoizedState), o === null)) return pe(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) dr(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = to(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    dr(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return V(X, (X.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Z() > Qn &&
            ((t.flags |= 128), (r = !0), dr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = to(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              dr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !Q)
            )
              return pe(t), null;
          } else
            2 * Z() - o.renderingStartTime > Qn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), dr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Z()),
          (t.sibling = null),
          (n = X.current),
          V(X, r ? (n & 1) | 2 : n & 1),
          t)
        : (pe(t), null);
    case 22:
    case 23:
      return (
        bu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Me & 1073741824 && (pe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : pe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Qh(e, t) {
  switch ((Lu(t), t.tag)) {
    case 1:
      return (
        Re(t.type) && Gl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Wn(),
        H(De),
        H(ve),
        Vu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Bu(t), null;
    case 13:
      if ((H(X), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(x(340));
        Bn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return H(X), null;
    case 4:
      return Wn(), null;
    case 10:
      return Fu(t.type._context), null;
    case 22:
    case 23:
      return bu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var kl = !1,
  he = !1,
  Xh = typeof WeakSet == "function" ? WeakSet : Set,
  _ = null;
function Pn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Y(e, t, r);
      }
    else n.current = null;
}
function bi(e, t, n) {
  try {
    n();
  } catch (r) {
    Y(e, t, r);
  }
}
var Ea = !1;
function Kh(e, t) {
  if (((ji = Hl), (e = Qc()), zu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            u = -1,
            s = -1,
            a = 0,
            h = 0,
            f = e,
            v = null;
          t: for (;;) {
            for (
              var g;
              f !== n || (l !== 0 && f.nodeType !== 3) || (u = i + l),
                f !== o || (r !== 0 && f.nodeType !== 3) || (s = i + r),
                f.nodeType === 3 && (i += f.nodeValue.length),
                (g = f.firstChild) !== null;

            )
              (v = f), (f = g);
            for (;;) {
              if (f === e) break t;
              if (
                (v === n && ++a === l && (u = i),
                v === o && ++h === r && (s = i),
                (g = f.nextSibling) !== null)
              )
                break;
              (f = v), (v = f.parentNode);
            }
            f = g;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Fi = { focusedElem: e, selectionRange: n }, Hl = !1, _ = t; _ !== null; )
    if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (_ = e);
    else
      for (; _ !== null; ) {
        t = _;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var w = S.memoizedProps,
                    R = S.memoizedState,
                    d = t.stateNode,
                    c = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : Ye(t.type, w),
                      R
                    );
                  d.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(x(163));
            }
        } catch (m) {
          Y(t, t.return, m);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (_ = e);
          break;
        }
        _ = t.return;
      }
  return (S = Ea), (Ea = !1), S;
}
function Er(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && bi(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Eo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function eu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Bd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Bd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[ut], delete t[Ur], delete t[$i], delete t[Th], delete t[Ph])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Vd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ca(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Vd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function tu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Kl));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (tu(e, t, n), e = e.sibling; e !== null; ) tu(e, t, n), (e = e.sibling);
}
function nu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (nu(e, t, n), e = e.sibling; e !== null; ) nu(e, t, n), (e = e.sibling);
}
var ae = null,
  Ze = !1;
function Tt(e, t, n) {
  for (n = n.child; n !== null; ) Wd(e, t, n), (n = n.sibling);
}
function Wd(e, t, n) {
  if (st && typeof st.onCommitFiberUnmount == "function")
    try {
      st.onCommitFiberUnmount(vo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      he || Pn(n, t);
    case 6:
      var r = ae,
        l = Ze;
      (ae = null),
        Tt(e, t, n),
        (ae = r),
        (Ze = l),
        ae !== null &&
          (Ze
            ? ((e = ae),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ae.removeChild(n.stateNode));
      break;
    case 18:
      ae !== null &&
        (Ze
          ? ((e = ae),
            (n = n.stateNode),
            e.nodeType === 8
              ? qo(e.parentNode, n)
              : e.nodeType === 1 && qo(e, n),
            Ir(e))
          : qo(ae, n.stateNode));
      break;
    case 4:
      (r = ae),
        (l = Ze),
        (ae = n.stateNode.containerInfo),
        (Ze = !0),
        Tt(e, t, n),
        (ae = r),
        (Ze = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !he &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && bi(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      Tt(e, t, n);
      break;
    case 1:
      if (
        !he &&
        (Pn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          Y(n, t, u);
        }
      Tt(e, t, n);
      break;
    case 21:
      Tt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((he = (r = he) || n.memoizedState !== null), Tt(e, t, n), (he = r))
        : Tt(e, t, n);
      break;
    default:
      Tt(e, t, n);
  }
}
function Da(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Xh()),
      t.forEach(function (r) {
        var l = nv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ge(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (ae = u.stateNode), (Ze = !1);
              break e;
            case 3:
              (ae = u.stateNode.containerInfo), (Ze = !0);
              break e;
            case 4:
              (ae = u.stateNode.containerInfo), (Ze = !0);
              break e;
          }
          u = u.return;
        }
        if (ae === null) throw Error(x(160));
        Wd(o, i, l), (ae = null), (Ze = !1);
        var s = l.alternate;
        s !== null && (s.return = null), (l.return = null);
      } catch (a) {
        Y(l, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Hd(t, e), (t = t.sibling);
}
function Hd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ge(t, e), ot(e), r & 4)) {
        try {
          Er(3, e, e.return), Eo(3, e);
        } catch (w) {
          Y(e, e.return, w);
        }
        try {
          Er(5, e, e.return);
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      break;
    case 1:
      Ge(t, e), ot(e), r & 512 && n !== null && Pn(n, n.return);
      break;
    case 5:
      if (
        (Ge(t, e),
        ot(e),
        r & 512 && n !== null && Pn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Pr(l, "");
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            u === "input" && o.type === "radio" && o.name != null && fc(l, o),
              Ri(u, i);
            var a = Ri(u, o);
            for (i = 0; i < s.length; i += 2) {
              var h = s[i],
                f = s[i + 1];
              h === "style"
                ? mc(l, f)
                : h === "dangerouslySetInnerHTML"
                ? vc(l, f)
                : h === "children"
                ? Pr(l, f)
                : yu(l, h, f, a);
            }
            switch (u) {
              case "input":
                ki(l, o);
                break;
              case "textarea":
                pc(l, o);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null
                  ? Mn(l, !!o.multiple, g, !1)
                  : v !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Mn(l, !!o.multiple, o.defaultValue, !0)
                      : Mn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[Ur] = o;
          } catch (w) {
            Y(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((Ge(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(x(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (Ge(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ir(t.containerInfo);
        } catch (w) {
          Y(e, e.return, w);
        }
      break;
    case 4:
      Ge(t, e), ot(e);
      break;
    case 13:
      Ge(t, e),
        ot(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Ju = Z())),
        r & 4 && Da(e);
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((he = (a = he) || h), Ge(t, e), (he = a)) : Ge(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !h && e.mode & 1)
        )
          for (_ = e, h = e.child; h !== null; ) {
            for (f = _ = h; _ !== null; ) {
              switch (((v = _), (g = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Er(4, v, v.return);
                  break;
                case 1:
                  Pn(v, v.return);
                  var S = v.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount();
                    } catch (w) {
                      Y(r, n, w);
                    }
                  }
                  break;
                case 5:
                  Pn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Na(f);
                    continue;
                  }
              }
              g !== null ? ((g.return = v), (_ = g)) : Na(f);
            }
            h = h.sibling;
          }
        e: for (h = null, f = e; ; ) {
          if (f.tag === 5) {
            if (h === null) {
              h = f;
              try {
                (l = f.stateNode),
                  a
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((u = f.stateNode),
                      (s = f.memoizedProps.style),
                      (i =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = gc("display", i)));
              } catch (w) {
                Y(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (h === null)
              try {
                f.stateNode.nodeValue = a ? "" : f.memoizedProps;
              } catch (w) {
                Y(e, e.return, w);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            h === f && (h = null), (f = f.return);
          }
          h === f && (h = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ge(t, e), ot(e), r & 4 && Da(e);
      break;
    case 21:
      break;
    default:
      Ge(t, e), ot(e);
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Vd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Pr(l, ""), (r.flags &= -33));
          var o = Ca(e);
          nu(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            u = Ca(e);
          tu(e, u, i);
          break;
        default:
          throw Error(x(161));
      }
    } catch (s) {
      Y(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gh(e, t, n) {
  (_ = e), Qd(e);
}
function Qd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var l = _,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || kl;
      if (!i) {
        var u = l.alternate,
          s = (u !== null && u.memoizedState !== null) || he;
        u = kl;
        var a = he;
        if (((kl = i), (he = s) && !a))
          for (_ = l; _ !== null; )
            (i = _),
              (s = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? _a(l)
                : s !== null
                ? ((s.return = i), (_ = s))
                : _a(l);
        for (; o !== null; ) (_ = o), Qd(o), (o = o.sibling);
        (_ = l), (kl = u), (he = a);
      }
      Ra(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (_ = o)) : Ra(e);
  }
}
function Ra(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              he || Eo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !he)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ye(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && ca(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ca(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate;
                if (a !== null) {
                  var h = a.memoizedState;
                  if (h !== null) {
                    var f = h.dehydrated;
                    f !== null && Ir(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(x(163));
          }
        he || (t.flags & 512 && eu(t));
      } catch (v) {
        Y(t, t.return, v);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (_ = n);
      break;
    }
    _ = t.return;
  }
}
function Na(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (_ = n);
      break;
    }
    _ = t.return;
  }
}
function _a(e) {
  for (; _ !== null; ) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Eo(4, t);
          } catch (s) {
            Y(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Y(t, l, s);
            }
          }
          var o = t.return;
          try {
            eu(t);
          } catch (s) {
            Y(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            eu(t);
          } catch (s) {
            Y(t, i, s);
          }
      }
    } catch (s) {
      Y(t, t.return, s);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (_ = u);
      break;
    }
    _ = t.return;
  }
}
var Yh = Math.ceil,
  lo = Et.ReactCurrentDispatcher,
  Yu = Et.ReactCurrentOwner,
  We = Et.ReactCurrentBatchConfig,
  F = 0,
  le = null,
  q = null,
  ce = 0,
  Me = 0,
  zn = Gt(0),
  te = 0,
  Qr = null,
  an = 0,
  Co = 0,
  Zu = 0,
  Cr = null,
  Ee = null,
  Ju = 0,
  Qn = 1 / 0,
  ht = null,
  oo = !1,
  ru = null,
  Vt = null,
  xl = !1,
  jt = null,
  io = 0,
  Dr = 0,
  lu = null,
  Ol = -1,
  jl = 0;
function we() {
  return F & 6 ? Z() : Ol !== -1 ? Ol : (Ol = Z());
}
function Wt(e) {
  return e.mode & 1
    ? F & 2 && ce !== 0
      ? ce & -ce
      : Mh.transition !== null
      ? (jl === 0 && (jl = Tc()), jl)
      : ((e = U),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : jc(e.type))),
        e)
    : 1;
}
function be(e, t, n, r) {
  if (50 < Dr) throw ((Dr = 0), (lu = null), Error(x(185)));
  Zr(e, n, r),
    (!(F & 2) || e !== le) &&
      (e === le && (!(F & 2) && (Co |= n), te === 4 && It(e, ce)),
      Ne(e, r),
      n === 1 && F === 0 && !(t.mode & 1) && ((Qn = Z() + 500), So && Yt()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  Mp(e, t);
  var r = Wl(e, e === le ? ce : 0);
  if (r === 0)
    n !== null && Fs(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Fs(n), t === 1))
      e.tag === 0 ? zh(Ta.bind(null, e)) : td(Ta.bind(null, e)),
        Nh(function () {
          !(F & 6) && Yt();
        }),
        (n = null);
    else {
      switch (Pc(r)) {
        case 1:
          n = Eu;
          break;
        case 4:
          n = Nc;
          break;
        case 16:
          n = Vl;
          break;
        case 536870912:
          n = _c;
          break;
        default:
          n = Vl;
      }
      n = bd(n, Xd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Xd(e, t) {
  if (((Ol = -1), (jl = 0), F & 6)) throw Error(x(327));
  var n = e.callbackNode;
  if (Fn() && e.callbackNode !== n) return null;
  var r = Wl(e, e === le ? ce : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = uo(e, r);
  else {
    t = r;
    var l = F;
    F |= 2;
    var o = Gd();
    (le !== e || ce !== t) && ((ht = null), (Qn = Z() + 500), rn(e, t));
    do
      try {
        qh();
        break;
      } catch (u) {
        Kd(e, u);
      }
    while (!0);
    ju(),
      (lo.current = o),
      (F = l),
      q !== null ? (t = 0) : ((le = null), (ce = 0), (t = te));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = zi(e)), l !== 0 && ((r = l), (t = ou(e, l)))), t === 1)
    )
      throw ((n = Qr), rn(e, 0), It(e, r), Ne(e, Z()), n);
    if (t === 6) It(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Zh(l) &&
          ((t = uo(e, r)),
          t === 2 && ((o = zi(e)), o !== 0 && ((r = o), (t = ou(e, o)))),
          t === 1))
      )
        throw ((n = Qr), rn(e, 0), It(e, r), Ne(e, Z()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          qt(e, Ee, ht);
          break;
        case 3:
          if (
            (It(e, r), (r & 130023424) === r && ((t = Ju + 500 - Z()), 10 < t))
          ) {
            if (Wl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              we(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Ui(qt.bind(null, e, Ee, ht), t);
            break;
          }
          qt(e, Ee, ht);
          break;
        case 4:
          if ((It(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - qe(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = Z() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Yh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ui(qt.bind(null, e, Ee, ht), r);
            break;
          }
          qt(e, Ee, ht);
          break;
        case 5:
          qt(e, Ee, ht);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return Ne(e, Z()), e.callbackNode === n ? Xd.bind(null, e) : null;
}
function ou(e, t) {
  var n = Cr;
  return (
    e.current.memoizedState.isDehydrated && (rn(e, t).flags |= 256),
    (e = uo(e, t)),
    e !== 2 && ((t = Ee), (Ee = n), t !== null && iu(t)),
    e
  );
}
function iu(e) {
  Ee === null ? (Ee = e) : Ee.push.apply(Ee, e);
}
function Zh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!et(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function It(e, t) {
  for (
    t &= ~Zu,
      t &= ~Co,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - qe(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Ta(e) {
  if (F & 6) throw Error(x(327));
  Fn();
  var t = Wl(e, 0);
  if (!(t & 1)) return Ne(e, Z()), null;
  var n = uo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = zi(e);
    r !== 0 && ((t = r), (n = ou(e, r)));
  }
  if (n === 1) throw ((n = Qr), rn(e, 0), It(e, t), Ne(e, Z()), n);
  if (n === 6) throw Error(x(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    qt(e, Ee, ht),
    Ne(e, Z()),
    null
  );
}
function qu(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    (F = n), F === 0 && ((Qn = Z() + 500), So && Yt());
  }
}
function cn(e) {
  jt !== null && jt.tag === 0 && !(F & 6) && Fn();
  var t = F;
  F |= 1;
  var n = We.transition,
    r = U;
  try {
    if (((We.transition = null), (U = 1), e)) return e();
  } finally {
    (U = r), (We.transition = n), (F = t), !(F & 6) && Yt();
  }
}
function bu() {
  (Me = zn.current), H(zn);
}
function rn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Rh(n)), q !== null))
    for (n = q.return; n !== null; ) {
      var r = n;
      switch ((Lu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Gl();
          break;
        case 3:
          Wn(), H(De), H(ve), Vu();
          break;
        case 5:
          Bu(r);
          break;
        case 4:
          Wn();
          break;
        case 13:
          H(X);
          break;
        case 19:
          H(X);
          break;
        case 10:
          Fu(r.type._context);
          break;
        case 22:
        case 23:
          bu();
      }
      n = n.return;
    }
  if (
    ((le = e),
    (q = e = Ht(e.current, null)),
    (ce = Me = t),
    (te = 0),
    (Qr = null),
    (Zu = Co = an = 0),
    (Ee = Cr = null),
    tn !== null)
  ) {
    for (t = 0; t < tn.length; t++)
      if (((n = tn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    tn = null;
  }
  return e;
}
function Kd(e, t) {
  do {
    var n = q;
    try {
      if ((ju(), (Ml.current = ro), no)) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        no = !1;
      }
      if (
        ((sn = 0),
        (ne = b = K = null),
        (xr = !1),
        (Vr = 0),
        (Yu.current = null),
        n === null || n.return === null)
      ) {
        (te = 1), (Qr = t), (q = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          u = n,
          s = t;
        if (
          ((t = ce),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var a = s,
            h = u,
            f = h.tag;
          if (!(h.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var v = h.alternate;
            v
              ? ((h.updateQueue = v.updateQueue),
                (h.memoizedState = v.memoizedState),
                (h.lanes = v.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var g = ga(i);
          if (g !== null) {
            (g.flags &= -257),
              ma(g, i, u, o, t),
              g.mode & 1 && va(o, a, t),
              (t = g),
              (s = a);
            var S = t.updateQueue;
            if (S === null) {
              var w = new Set();
              w.add(s), (t.updateQueue = w);
            } else S.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              va(o, a, t), es();
              break e;
            }
            s = Error(x(426));
          }
        } else if (Q && u.mode & 1) {
          var R = ga(i);
          if (R !== null) {
            !(R.flags & 65536) && (R.flags |= 256),
              ma(R, i, u, o, t),
              Iu(Hn(s, u));
            break e;
          }
        }
        (o = s = Hn(s, u)),
          te !== 4 && (te = 2),
          Cr === null ? (Cr = [o]) : Cr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var d = Pd(o, s, t);
              aa(o, d);
              break e;
            case 1:
              u = s;
              var c = o.type,
                p = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (Vt === null || !Vt.has(p))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var m = zd(o, u, t);
                aa(o, m);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Zd(n);
    } catch (k) {
      (t = k), q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Gd() {
  var e = lo.current;
  return (lo.current = ro), e === null ? ro : e;
}
function es() {
  (te === 0 || te === 3 || te === 2) && (te = 4),
    le === null || (!(an & 268435455) && !(Co & 268435455)) || It(le, ce);
}
function uo(e, t) {
  var n = F;
  F |= 2;
  var r = Gd();
  (le !== e || ce !== t) && ((ht = null), rn(e, t));
  do
    try {
      Jh();
      break;
    } catch (l) {
      Kd(e, l);
    }
  while (!0);
  if ((ju(), (F = n), (lo.current = r), q !== null)) throw Error(x(261));
  return (le = null), (ce = 0), te;
}
function Jh() {
  for (; q !== null; ) Yd(q);
}
function qh() {
  for (; q !== null && !Ep(); ) Yd(q);
}
function Yd(e) {
  var t = qd(e.alternate, e, Me);
  (e.memoizedProps = e.pendingProps),
    t === null ? Zd(e) : (q = t),
    (Yu.current = null);
}
function Zd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Qh(n, t)), n !== null)) {
        (n.flags &= 32767), (q = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (te = 6), (q = null);
        return;
      }
    } else if (((n = Hh(n, t, Me)), n !== null)) {
      q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function qt(e, t, n) {
  var r = U,
    l = We.transition;
  try {
    (We.transition = null), (U = 1), bh(e, t, n, r);
  } finally {
    (We.transition = l), (U = r);
  }
  return null;
}
function bh(e, t, n, r) {
  do Fn();
  while (jt !== null);
  if (F & 6) throw Error(x(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(x(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Lp(e, o),
    e === le && ((q = le = null), (ce = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      xl ||
      ((xl = !0),
      bd(Vl, function () {
        return Fn(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = We.transition), (We.transition = null);
    var i = U;
    U = 1;
    var u = F;
    (F |= 4),
      (Yu.current = null),
      Kh(e, n),
      Hd(n, e),
      wh(Fi),
      (Hl = !!ji),
      (Fi = ji = null),
      (e.current = n),
      Gh(n),
      Cp(),
      (F = u),
      (U = i),
      (We.transition = o);
  } else e.current = n;
  if (
    (xl && ((xl = !1), (jt = e), (io = l)),
    (o = e.pendingLanes),
    o === 0 && (Vt = null),
    Np(n.stateNode),
    Ne(e, Z()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (oo) throw ((oo = !1), (e = ru), (ru = null), e);
  return (
    io & 1 && e.tag !== 0 && Fn(),
    (o = e.pendingLanes),
    o & 1 ? (e === lu ? Dr++ : ((Dr = 0), (lu = e))) : (Dr = 0),
    Yt(),
    null
  );
}
function Fn() {
  if (jt !== null) {
    var e = Pc(io),
      t = We.transition,
      n = U;
    try {
      if (((We.transition = null), (U = 16 > e ? 16 : e), jt === null))
        var r = !1;
      else {
        if (((e = jt), (jt = null), (io = 0), F & 6)) throw Error(x(331));
        var l = F;
        for (F |= 4, _ = e.current; _ !== null; ) {
          var o = _,
            i = o.child;
          if (_.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (_ = a; _ !== null; ) {
                  var h = _;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Er(8, h, o);
                  }
                  var f = h.child;
                  if (f !== null) (f.return = h), (_ = f);
                  else
                    for (; _ !== null; ) {
                      h = _;
                      var v = h.sibling,
                        g = h.return;
                      if ((Bd(h), h === a)) {
                        _ = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = g), (_ = v);
                        break;
                      }
                      _ = g;
                    }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var w = S.child;
                if (w !== null) {
                  S.child = null;
                  do {
                    var R = w.sibling;
                    (w.sibling = null), (w = R);
                  } while (w !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (_ = i);
          else
            e: for (; _ !== null; ) {
              if (((o = _), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Er(9, o, o.return);
                }
              var d = o.sibling;
              if (d !== null) {
                (d.return = o.return), (_ = d);
                break e;
              }
              _ = o.return;
            }
        }
        var c = e.current;
        for (_ = c; _ !== null; ) {
          i = _;
          var p = i.child;
          if (i.subtreeFlags & 2064 && p !== null) (p.return = i), (_ = p);
          else
            e: for (i = c; _ !== null; ) {
              if (((u = _), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Eo(9, u);
                  }
                } catch (k) {
                  Y(u, u.return, k);
                }
              if (u === i) {
                _ = null;
                break e;
              }
              var m = u.sibling;
              if (m !== null) {
                (m.return = u.return), (_ = m);
                break e;
              }
              _ = u.return;
            }
        }
        if (
          ((F = l), Yt(), st && typeof st.onPostCommitFiberRoot == "function")
        )
          try {
            st.onPostCommitFiberRoot(vo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (U = n), (We.transition = t);
    }
  }
  return !1;
}
function Pa(e, t, n) {
  (t = Hn(n, t)),
    (t = Pd(e, t, 1)),
    (e = Bt(e, t, 1)),
    (t = we()),
    e !== null && (Zr(e, 1, t), Ne(e, t));
}
function Y(e, t, n) {
  if (e.tag === 3) Pa(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Pa(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Vt === null || !Vt.has(r)))
        ) {
          (e = Hn(n, e)),
            (e = zd(t, e, 1)),
            (t = Bt(t, e, 1)),
            (e = we()),
            t !== null && (Zr(t, 1, e), Ne(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function ev(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = we()),
    (e.pingedLanes |= e.suspendedLanes & n),
    le === e &&
      (ce & n) === n &&
      (te === 4 || (te === 3 && (ce & 130023424) === ce && 500 > Z() - Ju)
        ? rn(e, 0)
        : (Zu |= n)),
    Ne(e, t);
}
function Jd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = fl), (fl <<= 1), !(fl & 130023424) && (fl = 4194304))
      : (t = 1));
  var n = we();
  (e = kt(e, t)), e !== null && (Zr(e, t, n), Ne(e, n));
}
function tv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Jd(e, n);
}
function nv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(x(314));
  }
  r !== null && r.delete(t), Jd(e, n);
}
var qd;
qd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || De.current) Ce = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ce = !1), Wh(e, t, n);
      Ce = !!(e.flags & 131072);
    }
  else (Ce = !1), Q && t.flags & 1048576 && nd(t, Jl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Il(e, t), (e = t.pendingProps);
      var l = $n(t, ve.current);
      jn(t, n), (l = Hu(null, t, r, e, l, n));
      var o = Qu();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Re(r) ? ((o = !0), Yl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Uu(t),
            (l.updater = xo),
            (t.stateNode = l),
            (l._reactInternals = t),
            Xi(t, r, e, n),
            (t = Yi(null, t, r, !0, o, n)))
          : ((t.tag = 0), Q && o && Mu(t), me(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Il(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = lv(r)),
          (e = Ye(r, e)),
          l)
        ) {
          case 0:
            t = Gi(null, t, r, e, n);
            break e;
          case 1:
            t = Sa(null, t, r, e, n);
            break e;
          case 11:
            t = ya(null, t, r, e, n);
            break e;
          case 14:
            t = wa(null, t, r, Ye(r.type, e), n);
            break e;
        }
        throw Error(x(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Gi(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Sa(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Od(t), e === null)) throw Error(x(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          sd(e, t),
          eo(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = Hn(Error(x(423)), t)), (t = ka(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = Hn(Error(x(424)), t)), (t = ka(e, t, r, n, l));
            break e;
          } else
            for (
              Le = $t(t.stateNode.containerInfo.firstChild),
                Ie = t,
                Q = !0,
                Je = null,
                n = id(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Bn(), r === l)) {
            t = xt(e, t, n);
            break e;
          }
          me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ad(t),
        e === null && Wi(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Ai(r, l) ? (i = null) : o !== null && Ai(r, o) && (t.flags |= 32),
        Id(e, t),
        me(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Wi(t), null;
    case 13:
      return jd(e, t, n);
    case 4:
      return (
        $u(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Vn(t, null, r, n)) : me(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        ya(e, t, r, l, n)
      );
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          V(ql, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (et(o.value, i)) {
            if (o.children === l.children && !De.current) {
              t = xt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var u = o.dependencies;
              if (u !== null) {
                i = o.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (o.tag === 1) {
                      (s = yt(-1, n & -n)), (s.tag = 2);
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var h = a.pending;
                        h === null
                          ? (s.next = s)
                          : ((s.next = h.next), (h.next = s)),
                          (a.pending = s);
                      }
                    }
                    (o.lanes |= n),
                      (s = o.alternate),
                      s !== null && (s.lanes |= n),
                      Hi(o.return, n, t),
                      (u.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(x(341));
                (i.lanes |= n),
                  (u = i.alternate),
                  u !== null && (u.lanes |= n),
                  Hi(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        me(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        jn(t, n),
        (l = He(l)),
        (r = r(l)),
        (t.flags |= 1),
        me(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ye(r, t.pendingProps)),
        (l = Ye(r.type, l)),
        wa(e, t, r, l, n)
      );
    case 15:
      return Md(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Il(e, t),
        (t.tag = 1),
        Re(r) ? ((e = !0), Yl(t)) : (e = !1),
        jn(t, n),
        Td(t, r, l),
        Xi(t, r, l, n),
        Yi(null, t, r, !0, e, n)
      );
    case 19:
      return Fd(e, t, n);
    case 22:
      return Ld(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function bd(e, t) {
  return Rc(e, t);
}
function rv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ve(e, t, n, r) {
  return new rv(e, t, n, r);
}
function ts(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function lv(e) {
  if (typeof e == "function") return ts(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Su)) return 11;
    if (e === ku) return 14;
  }
  return 2;
}
function Ht(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ve(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Fl(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) ts(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case kn:
        return ln(n.children, l, o, t);
      case wu:
        (i = 8), (l |= 8);
        break;
      case gi:
        return (
          (e = Ve(12, n, t, l | 2)), (e.elementType = gi), (e.lanes = o), e
        );
      case mi:
        return (e = Ve(13, n, t, l)), (e.elementType = mi), (e.lanes = o), e;
      case yi:
        return (e = Ve(19, n, t, l)), (e.elementType = yi), (e.lanes = o), e;
      case ac:
        return Do(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case uc:
              i = 10;
              break e;
            case sc:
              i = 9;
              break e;
            case Su:
              i = 11;
              break e;
            case ku:
              i = 14;
              break e;
            case Pt:
              (i = 16), (r = null);
              break e;
          }
        throw Error(x(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ve(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function ln(e, t, n, r) {
  return (e = Ve(7, e, r, t)), (e.lanes = n), e;
}
function Do(e, t, n, r) {
  return (
    (e = Ve(22, e, r, t)),
    (e.elementType = ac),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ii(e, t, n) {
  return (e = Ve(6, e, null, t)), (e.lanes = n), e;
}
function ui(e, t, n) {
  return (
    (t = Ve(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function ov(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Bo(0)),
    (this.expirationTimes = Bo(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Bo(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function ns(e, t, n, r, l, o, i, u, s) {
  return (
    (e = new ov(e, t, n, u, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Ve(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Uu(o),
    e
  );
}
function iv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Sn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function ef(e) {
  if (!e) return Xt;
  e = e._reactInternals;
  e: {
    if (fn(e) !== e || e.tag !== 1) throw Error(x(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Re(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Re(n)) return ed(e, n, t);
  }
  return t;
}
function tf(e, t, n, r, l, o, i, u, s) {
  return (
    (e = ns(n, r, !0, e, l, o, i, u, s)),
    (e.context = ef(null)),
    (n = e.current),
    (r = we()),
    (l = Wt(n)),
    (o = yt(r, l)),
    (o.callback = t ?? null),
    Bt(n, o, l),
    (e.current.lanes = l),
    Zr(e, l, r),
    Ne(e, r),
    e
  );
}
function Ro(e, t, n, r) {
  var l = t.current,
    o = we(),
    i = Wt(l);
  return (
    (n = ef(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = yt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Bt(l, t, i)),
    e !== null && (be(e, l, i, o), zl(e, l, i)),
    i
  );
}
function so(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function za(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function rs(e, t) {
  za(e, t), (e = e.alternate) && za(e, t);
}
function uv() {
  return null;
}
var nf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ls(e) {
  this._internalRoot = e;
}
No.prototype.render = ls.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  Ro(e, t, null, null);
};
No.prototype.unmount = ls.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    cn(function () {
      Ro(null, e, null, null);
    }),
      (t[St] = null);
  }
};
function No(e) {
  this._internalRoot = e;
}
No.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Lc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Lt.length && t !== 0 && t < Lt[n].priority; n++);
    Lt.splice(n, 0, e), n === 0 && Oc(e);
  }
};
function os(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function _o(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ma() {}
function sv(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var a = so(i);
        o.call(a);
      };
    }
    var i = tf(t, r, e, 0, null, !1, !1, "", Ma);
    return (
      (e._reactRootContainer = i),
      (e[St] = i.current),
      Fr(e.nodeType === 8 ? e.parentNode : e),
      cn(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var a = so(s);
      u.call(a);
    };
  }
  var s = ns(e, 0, !1, null, null, !1, !1, "", Ma);
  return (
    (e._reactRootContainer = s),
    (e[St] = s.current),
    Fr(e.nodeType === 8 ? e.parentNode : e),
    cn(function () {
      Ro(t, s, n, r);
    }),
    s
  );
}
function To(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var s = so(i);
        u.call(s);
      };
    }
    Ro(t, i, e, l);
  } else i = sv(n, t, e, l, r);
  return so(i);
}
zc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = vr(t.pendingLanes);
        n !== 0 &&
          (Cu(t, n | 1), Ne(t, Z()), !(F & 6) && ((Qn = Z() + 500), Yt()));
      }
      break;
    case 13:
      cn(function () {
        var r = kt(e, 1);
        if (r !== null) {
          var l = we();
          be(r, e, 1, l);
        }
      }),
        rs(e, 1);
  }
};
Du = function (e) {
  if (e.tag === 13) {
    var t = kt(e, 134217728);
    if (t !== null) {
      var n = we();
      be(t, e, 134217728, n);
    }
    rs(e, 134217728);
  }
};
Mc = function (e) {
  if (e.tag === 13) {
    var t = Wt(e),
      n = kt(e, t);
    if (n !== null) {
      var r = we();
      be(n, e, t, r);
    }
    rs(e, t);
  }
};
Lc = function () {
  return U;
};
Ic = function (e, t) {
  var n = U;
  try {
    return (U = e), t();
  } finally {
    U = n;
  }
};
_i = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ki(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = wo(r);
            if (!l) throw Error(x(90));
            dc(r), ki(r, l);
          }
        }
      }
      break;
    case "textarea":
      pc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Mn(e, !!n.multiple, t, !1);
  }
};
Sc = qu;
kc = cn;
var av = { usingClientEntryPoint: !1, Events: [qr, Dn, wo, yc, wc, qu] },
  fr = {
    findFiberByHostInstance: en,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  cv = {
    bundleType: fr.bundleType,
    version: fr.version,
    rendererPackageName: fr.rendererPackageName,
    rendererConfig: fr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Et.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Cc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: fr.findFiberByHostInstance || uv,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var El = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!El.isDisabled && El.supportsFiber)
    try {
      (vo = El.inject(cv)), (st = El);
    } catch {}
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = av;
je.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!os(t)) throw Error(x(200));
  return iv(e, t, null, n);
};
je.createRoot = function (e, t) {
  if (!os(e)) throw Error(x(299));
  var n = !1,
    r = "",
    l = nf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = ns(e, 1, !1, null, null, n, !1, r, l)),
    (e[St] = t.current),
    Fr(e.nodeType === 8 ? e.parentNode : e),
    new ls(t)
  );
};
je.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(x(188))
      : ((e = Object.keys(e).join(",")), Error(x(268, e)));
  return (e = Cc(t)), (e = e === null ? null : e.stateNode), e;
};
je.flushSync = function (e) {
  return cn(e);
};
je.hydrate = function (e, t, n) {
  if (!_o(t)) throw Error(x(200));
  return To(null, e, t, !0, n);
};
je.hydrateRoot = function (e, t, n) {
  if (!os(e)) throw Error(x(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = nf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = tf(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[St] = t.current),
    Fr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new No(t);
};
je.render = function (e, t, n) {
  if (!_o(t)) throw Error(x(200));
  return To(null, e, t, !1, n);
};
je.unmountComponentAtNode = function (e) {
  if (!_o(e)) throw Error(x(40));
  return e._reactRootContainer
    ? (cn(function () {
        To(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[St] = null);
        });
      }),
      !0)
    : !1;
};
je.unstable_batchedUpdates = qu;
je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!_o(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return To(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function rf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rf);
    } catch (e) {
      console.error(e);
    }
}
rf(), (rc.exports = je);
var bt = rc.exports,
  La = bt;
(hi.createRoot = La.createRoot), (hi.hydrateRoot = La.hydrateRoot);
function dv() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return y.useMemo(
    () => (r) => {
      t.forEach((l) => l(r));
    },
    t
  );
}
const Po =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Zn(e) {
  const t = Object.prototype.toString.call(e);
  return t === "[object Window]" || t === "[object global]";
}
function is(e) {
  return "nodeType" in e;
}
function _e(e) {
  var t, n;
  return e
    ? Zn(e)
      ? e
      : is(e) &&
        (t = (n = e.ownerDocument) == null ? void 0 : n.defaultView) != null
      ? t
      : window
    : window;
}
function us(e) {
  const { Document: t } = _e(e);
  return e instanceof t;
}
function el(e) {
  return Zn(e) ? !1 : e instanceof _e(e).HTMLElement;
}
function lf(e) {
  return e instanceof _e(e).SVGElement;
}
function Jn(e) {
  return e
    ? Zn(e)
      ? e.document
      : is(e)
      ? us(e)
        ? e
        : el(e) || lf(e)
        ? e.ownerDocument
        : document
      : document
    : document;
}
const tt = Po ? y.useLayoutEffect : y.useEffect;
function ss(e) {
  const t = y.useRef(e);
  return (
    tt(() => {
      t.current = e;
    }),
    y.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++)
        r[l] = arguments[l];
      return t.current == null ? void 0 : t.current(...r);
    }, [])
  );
}
function fv() {
  const e = y.useRef(null),
    t = y.useCallback((r, l) => {
      e.current = setInterval(r, l);
    }, []),
    n = y.useCallback(() => {
      e.current !== null && (clearInterval(e.current), (e.current = null));
    }, []);
  return [t, n];
}
function Xr(e, t) {
  t === void 0 && (t = [e]);
  const n = y.useRef(e);
  return (
    tt(() => {
      n.current !== e && (n.current = e);
    }, t),
    n
  );
}
function tl(e, t) {
  const n = y.useRef();
  return y.useMemo(() => {
    const r = e(n.current);
    return (n.current = r), r;
  }, [...t]);
}
function ao(e) {
  const t = ss(e),
    n = y.useRef(null),
    r = y.useCallback((l) => {
      l !== n.current && (t == null || t(l, n.current)), (n.current = l);
    }, []);
  return [n, r];
}
function uu(e) {
  const t = y.useRef();
  return (
    y.useEffect(() => {
      t.current = e;
    }, [e]),
    t.current
  );
}
let si = {};
function nl(e, t) {
  return y.useMemo(() => {
    if (t) return t;
    const n = si[e] == null ? 0 : si[e] + 1;
    return (si[e] = n), e + "-" + n;
  }, [e, t]);
}
function of(e) {
  return function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), l = 1;
      l < n;
      l++
    )
      r[l - 1] = arguments[l];
    return r.reduce(
      (o, i) => {
        const u = Object.entries(i);
        for (const [s, a] of u) {
          const h = o[s];
          h != null && (o[s] = h + e * a);
        }
        return o;
      },
      { ...t }
    );
  };
}
const An = of(1),
  Kr = of(-1);
function pv(e) {
  return "clientX" in e && "clientY" in e;
}
function as(e) {
  if (!e) return !1;
  const { KeyboardEvent: t } = _e(e.target);
  return t && e instanceof t;
}
function hv(e) {
  if (!e) return !1;
  const { TouchEvent: t } = _e(e.target);
  return t && e instanceof t;
}
function su(e) {
  if (hv(e)) {
    if (e.touches && e.touches.length) {
      const { clientX: t, clientY: n } = e.touches[0];
      return { x: t, y: n };
    } else if (e.changedTouches && e.changedTouches.length) {
      const { clientX: t, clientY: n } = e.changedTouches[0];
      return { x: t, y: n };
    }
  }
  return pv(e) ? { x: e.clientX, y: e.clientY } : null;
}
const Xn = Object.freeze({
    Translate: {
      toString(e) {
        if (!e) return;
        const { x: t, y: n } = e;
        return (
          "translate3d(" +
          (t ? Math.round(t) : 0) +
          "px, " +
          (n ? Math.round(n) : 0) +
          "px, 0)"
        );
      },
    },
    Scale: {
      toString(e) {
        if (!e) return;
        const { scaleX: t, scaleY: n } = e;
        return "scaleX(" + t + ") scaleY(" + n + ")";
      },
    },
    Transform: {
      toString(e) {
        if (e)
          return [Xn.Translate.toString(e), Xn.Scale.toString(e)].join(" ");
      },
    },
    Transition: {
      toString(e) {
        let { property: t, duration: n, easing: r } = e;
        return t + " " + n + "ms " + r;
      },
    },
  }),
  Ia =
    "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function vv(e) {
  return e.matches(Ia) ? e : e.querySelector(Ia);
}
const gv = { display: "none" };
function mv(e) {
  let { id: t, value: n } = e;
  return ye.createElement("div", { id: t, style: gv }, n);
}
function yv(e) {
  let { id: t, announcement: n, ariaLiveType: r = "assertive" } = e;
  const l = {
    position: "fixed",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap",
  };
  return ye.createElement(
    "div",
    { id: t, style: l, role: "status", "aria-live": r, "aria-atomic": !0 },
    n
  );
}
function wv() {
  const [e, t] = y.useState("");
  return {
    announce: y.useCallback((r) => {
      r != null && t(r);
    }, []),
    announcement: e,
  };
}
const uf = y.createContext(null);
function Sv(e) {
  const t = y.useContext(uf);
  y.useEffect(() => {
    if (!t)
      throw new Error(
        "useDndMonitor must be used within a children of <DndContext>"
      );
    return t(e);
  }, [e, t]);
}
function kv() {
  const [e] = y.useState(() => new Set()),
    t = y.useCallback((r) => (e.add(r), () => e.delete(r)), [e]);
  return [
    y.useCallback(
      (r) => {
        let { type: l, event: o } = r;
        e.forEach((i) => {
          var u;
          return (u = i[l]) == null ? void 0 : u.call(i, o);
        });
      },
      [e]
    ),
    t,
  ];
}
const xv = {
    draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
  },
  Ev = {
    onDragStart(e) {
      let { active: t } = e;
      return "Picked up draggable item " + t.id + ".";
    },
    onDragOver(e) {
      let { active: t, over: n } = e;
      return n
        ? "Draggable item " +
            t.id +
            " was moved over droppable area " +
            n.id +
            "."
        : "Draggable item " + t.id + " is no longer over a droppable area.";
    },
    onDragEnd(e) {
      let { active: t, over: n } = e;
      return n
        ? "Draggable item " + t.id + " was dropped over droppable area " + n.id
        : "Draggable item " + t.id + " was dropped.";
    },
    onDragCancel(e) {
      let { active: t } = e;
      return "Dragging was cancelled. Draggable item " + t.id + " was dropped.";
    },
  };
function Cv(e) {
  let {
    announcements: t = Ev,
    container: n,
    hiddenTextDescribedById: r,
    screenReaderInstructions: l = xv,
  } = e;
  const { announce: o, announcement: i } = wv(),
    u = nl("DndLiveRegion"),
    [s, a] = y.useState(!1);
  if (
    (y.useEffect(() => {
      a(!0);
    }, []),
    Sv(
      y.useMemo(
        () => ({
          onDragStart(f) {
            let { active: v } = f;
            o(t.onDragStart({ active: v }));
          },
          onDragMove(f) {
            let { active: v, over: g } = f;
            t.onDragMove && o(t.onDragMove({ active: v, over: g }));
          },
          onDragOver(f) {
            let { active: v, over: g } = f;
            o(t.onDragOver({ active: v, over: g }));
          },
          onDragEnd(f) {
            let { active: v, over: g } = f;
            o(t.onDragEnd({ active: v, over: g }));
          },
          onDragCancel(f) {
            let { active: v, over: g } = f;
            o(t.onDragCancel({ active: v, over: g }));
          },
        }),
        [o, t]
      )
    ),
    !s)
  )
    return null;
  const h = ye.createElement(
    ye.Fragment,
    null,
    ye.createElement(mv, { id: r, value: l.draggable }),
    ye.createElement(yv, { id: u, announcement: i })
  );
  return n ? bt.createPortal(h, n) : h;
}
var ee;
(function (e) {
  (e.DragStart = "dragStart"),
    (e.DragMove = "dragMove"),
    (e.DragEnd = "dragEnd"),
    (e.DragCancel = "dragCancel"),
    (e.DragOver = "dragOver"),
    (e.RegisterDroppable = "registerDroppable"),
    (e.SetDroppableDisabled = "setDroppableDisabled"),
    (e.UnregisterDroppable = "unregisterDroppable");
})(ee || (ee = {}));
function co() {}
function ai(e, t) {
  return y.useMemo(() => ({ sensor: e, options: t ?? {} }), [e, t]);
}
function Dv() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return y.useMemo(() => [...t].filter((r) => r != null), [...t]);
}
const nt = Object.freeze({ x: 0, y: 0 });
function sf(e, t) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function af(e, t) {
  let {
      data: { value: n },
    } = e,
    {
      data: { value: r },
    } = t;
  return n - r;
}
function Rv(e, t) {
  let {
      data: { value: n },
    } = e,
    {
      data: { value: r },
    } = t;
  return r - n;
}
function Oa(e) {
  let { left: t, top: n, height: r, width: l } = e;
  return [
    { x: t, y: n },
    { x: t + l, y: n },
    { x: t, y: n + r },
    { x: t + l, y: n + r },
  ];
}
function cf(e, t) {
  if (!e || e.length === 0) return null;
  const [n] = e;
  return n[t];
}
function ja(e, t, n) {
  return (
    t === void 0 && (t = e.left),
    n === void 0 && (n = e.top),
    { x: t + e.width * 0.5, y: n + e.height * 0.5 }
  );
}
const Nv = (e) => {
    let { collisionRect: t, droppableRects: n, droppableContainers: r } = e;
    const l = ja(t, t.left, t.top),
      o = [];
    for (const i of r) {
      const { id: u } = i,
        s = n.get(u);
      if (s) {
        const a = sf(ja(s), l);
        o.push({ id: u, data: { droppableContainer: i, value: a } });
      }
    }
    return o.sort(af);
  },
  _v = (e) => {
    let { collisionRect: t, droppableRects: n, droppableContainers: r } = e;
    const l = Oa(t),
      o = [];
    for (const i of r) {
      const { id: u } = i,
        s = n.get(u);
      if (s) {
        const a = Oa(s),
          h = l.reduce((v, g, S) => v + sf(a[S], g), 0),
          f = Number((h / 4).toFixed(4));
        o.push({ id: u, data: { droppableContainer: i, value: f } });
      }
    }
    return o.sort(af);
  };
function Tv(e, t) {
  const n = Math.max(t.top, e.top),
    r = Math.max(t.left, e.left),
    l = Math.min(t.left + t.width, e.left + e.width),
    o = Math.min(t.top + t.height, e.top + e.height),
    i = l - r,
    u = o - n;
  if (r < l && n < o) {
    const s = t.width * t.height,
      a = e.width * e.height,
      h = i * u,
      f = h / (s + a - h);
    return Number(f.toFixed(4));
  }
  return 0;
}
const Pv = (e) => {
  let { collisionRect: t, droppableRects: n, droppableContainers: r } = e;
  const l = [];
  for (const o of r) {
    const { id: i } = o,
      u = n.get(i);
    if (u) {
      const s = Tv(u, t);
      s > 0 && l.push({ id: i, data: { droppableContainer: o, value: s } });
    }
  }
  return l.sort(Rv);
};
function zv(e, t, n) {
  return {
    ...e,
    scaleX: t && n ? t.width / n.width : 1,
    scaleY: t && n ? t.height / n.height : 1,
  };
}
function df(e, t) {
  return e && t ? { x: e.left - t.left, y: e.top - t.top } : nt;
}
function Mv(e) {
  return function (n) {
    for (
      var r = arguments.length, l = new Array(r > 1 ? r - 1 : 0), o = 1;
      o < r;
      o++
    )
      l[o - 1] = arguments[o];
    return l.reduce(
      (i, u) => ({
        ...i,
        top: i.top + e * u.y,
        bottom: i.bottom + e * u.y,
        left: i.left + e * u.x,
        right: i.right + e * u.x,
      }),
      { ...n }
    );
  };
}
const Lv = Mv(1);
function Iv(e) {
  if (e.startsWith("matrix3d(")) {
    const t = e.slice(9, -1).split(/, /);
    return { x: +t[12], y: +t[13], scaleX: +t[0], scaleY: +t[5] };
  } else if (e.startsWith("matrix(")) {
    const t = e.slice(7, -1).split(/, /);
    return { x: +t[4], y: +t[5], scaleX: +t[0], scaleY: +t[3] };
  }
  return null;
}
function Ov(e, t, n) {
  const r = Iv(t);
  if (!r) return e;
  const { scaleX: l, scaleY: o, x: i, y: u } = r,
    s = e.left - i - (1 - l) * parseFloat(n),
    a = e.top - u - (1 - o) * parseFloat(n.slice(n.indexOf(" ") + 1)),
    h = l ? e.width / l : e.width,
    f = o ? e.height / o : e.height;
  return { width: h, height: f, top: a, right: s + h, bottom: a + f, left: s };
}
const jv = { ignoreTransform: !1 };
function qn(e, t) {
  t === void 0 && (t = jv);
  let n = e.getBoundingClientRect();
  if (t.ignoreTransform) {
    const { transform: a, transformOrigin: h } = _e(e).getComputedStyle(e);
    a && (n = Ov(n, a, h));
  }
  const { top: r, left: l, width: o, height: i, bottom: u, right: s } = n;
  return { top: r, left: l, width: o, height: i, bottom: u, right: s };
}
function Fa(e) {
  return qn(e, { ignoreTransform: !0 });
}
function Fv(e) {
  const t = e.innerWidth,
    n = e.innerHeight;
  return { top: 0, left: 0, right: t, bottom: n, width: t, height: n };
}
function Av(e, t) {
  return (
    t === void 0 && (t = _e(e).getComputedStyle(e)), t.position === "fixed"
  );
}
function Uv(e, t) {
  t === void 0 && (t = _e(e).getComputedStyle(e));
  const n = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((l) => {
    const o = t[l];
    return typeof o == "string" ? n.test(o) : !1;
  });
}
function zo(e, t) {
  const n = [];
  function r(l) {
    if ((t != null && n.length >= t) || !l) return n;
    if (us(l) && l.scrollingElement != null && !n.includes(l.scrollingElement))
      return n.push(l.scrollingElement), n;
    if (!el(l) || lf(l) || n.includes(l)) return n;
    const o = _e(e).getComputedStyle(l);
    return l !== e && Uv(l, o) && n.push(l), Av(l, o) ? n : r(l.parentNode);
  }
  return e ? r(e) : n;
}
function ff(e) {
  const [t] = zo(e, 1);
  return t ?? null;
}
function ci(e) {
  return !Po || !e
    ? null
    : Zn(e)
    ? e
    : is(e)
    ? us(e) || e === Jn(e).scrollingElement
      ? window
      : el(e)
      ? e
      : null
    : null;
}
function pf(e) {
  return Zn(e) ? e.scrollX : e.scrollLeft;
}
function hf(e) {
  return Zn(e) ? e.scrollY : e.scrollTop;
}
function au(e) {
  return { x: pf(e), y: hf(e) };
}
var re;
(function (e) {
  (e[(e.Forward = 1)] = "Forward"), (e[(e.Backward = -1)] = "Backward");
})(re || (re = {}));
function vf(e) {
  return !Po || !e ? !1 : e === document.scrollingElement;
}
function gf(e) {
  const t = { x: 0, y: 0 },
    n = vf(e)
      ? { height: window.innerHeight, width: window.innerWidth }
      : { height: e.clientHeight, width: e.clientWidth },
    r = { x: e.scrollWidth - n.width, y: e.scrollHeight - n.height },
    l = e.scrollTop <= t.y,
    o = e.scrollLeft <= t.x,
    i = e.scrollTop >= r.y,
    u = e.scrollLeft >= r.x;
  return {
    isTop: l,
    isLeft: o,
    isBottom: i,
    isRight: u,
    maxScroll: r,
    minScroll: t,
  };
}
const $v = { x: 0.2, y: 0.2 };
function Bv(e, t, n, r, l) {
  let { top: o, left: i, right: u, bottom: s } = n;
  r === void 0 && (r = 10), l === void 0 && (l = $v);
  const { isTop: a, isBottom: h, isLeft: f, isRight: v } = gf(e),
    g = { x: 0, y: 0 },
    S = { x: 0, y: 0 },
    w = { height: t.height * l.y, width: t.width * l.x };
  return (
    !a && o <= t.top + w.height
      ? ((g.y = re.Backward),
        (S.y = r * Math.abs((t.top + w.height - o) / w.height)))
      : !h &&
        s >= t.bottom - w.height &&
        ((g.y = re.Forward),
        (S.y = r * Math.abs((t.bottom - w.height - s) / w.height))),
    !v && u >= t.right - w.width
      ? ((g.x = re.Forward),
        (S.x = r * Math.abs((t.right - w.width - u) / w.width)))
      : !f &&
        i <= t.left + w.width &&
        ((g.x = re.Backward),
        (S.x = r * Math.abs((t.left + w.width - i) / w.width))),
    { direction: g, speed: S }
  );
}
function Vv(e) {
  if (e === document.scrollingElement) {
    const { innerWidth: o, innerHeight: i } = window;
    return { top: 0, left: 0, right: o, bottom: i, width: o, height: i };
  }
  const { top: t, left: n, right: r, bottom: l } = e.getBoundingClientRect();
  return {
    top: t,
    left: n,
    right: r,
    bottom: l,
    width: e.clientWidth,
    height: e.clientHeight,
  };
}
function mf(e) {
  return e.reduce((t, n) => An(t, au(n)), nt);
}
function Wv(e) {
  return e.reduce((t, n) => t + pf(n), 0);
}
function Hv(e) {
  return e.reduce((t, n) => t + hf(n), 0);
}
function Qv(e, t) {
  if ((t === void 0 && (t = qn), !e)) return;
  const { top: n, left: r, bottom: l, right: o } = t(e);
  ff(e) &&
    (l <= 0 || o <= 0 || n >= window.innerHeight || r >= window.innerWidth) &&
    e.scrollIntoView({ block: "center", inline: "center" });
}
const Xv = [
  ["x", ["left", "right"], Wv],
  ["y", ["top", "bottom"], Hv],
];
class cs {
  constructor(t, n) {
    (this.rect = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.right = void 0),
      (this.left = void 0);
    const r = zo(n),
      l = mf(r);
    (this.rect = { ...t }), (this.width = t.width), (this.height = t.height);
    for (const [o, i, u] of Xv)
      for (const s of i)
        Object.defineProperty(this, s, {
          get: () => {
            const a = u(r),
              h = l[o] - a;
            return this.rect[s] + h;
          },
          enumerable: !0,
        });
    Object.defineProperty(this, "rect", { enumerable: !1 });
  }
}
class Rr {
  constructor(t) {
    (this.target = void 0),
      (this.listeners = []),
      (this.removeAll = () => {
        this.listeners.forEach((n) => {
          var r;
          return (r = this.target) == null
            ? void 0
            : r.removeEventListener(...n);
        });
      }),
      (this.target = t);
  }
  add(t, n, r) {
    var l;
    (l = this.target) == null || l.addEventListener(t, n, r),
      this.listeners.push([t, n, r]);
  }
}
function Kv(e) {
  const { EventTarget: t } = _e(e);
  return e instanceof t ? e : Jn(e);
}
function di(e, t) {
  const n = Math.abs(e.x),
    r = Math.abs(e.y);
  return typeof t == "number"
    ? Math.sqrt(n ** 2 + r ** 2) > t
    : "x" in t && "y" in t
    ? n > t.x && r > t.y
    : "x" in t
    ? n > t.x
    : "y" in t
    ? r > t.y
    : !1;
}
var Ue;
(function (e) {
  (e.Click = "click"),
    (e.DragStart = "dragstart"),
    (e.Keydown = "keydown"),
    (e.ContextMenu = "contextmenu"),
    (e.Resize = "resize"),
    (e.SelectionChange = "selectionchange"),
    (e.VisibilityChange = "visibilitychange");
})(Ue || (Ue = {}));
function Aa(e) {
  e.preventDefault();
}
function Gv(e) {
  e.stopPropagation();
}
var O;
(function (e) {
  (e.Space = "Space"),
    (e.Down = "ArrowDown"),
    (e.Right = "ArrowRight"),
    (e.Left = "ArrowLeft"),
    (e.Up = "ArrowUp"),
    (e.Esc = "Escape"),
    (e.Enter = "Enter");
})(O || (O = {}));
const yf = {
    start: [O.Space, O.Enter],
    cancel: [O.Esc],
    end: [O.Space, O.Enter],
  },
  Yv = (e, t) => {
    let { currentCoordinates: n } = t;
    switch (e.code) {
      case O.Right:
        return { ...n, x: n.x + 25 };
      case O.Left:
        return { ...n, x: n.x - 25 };
      case O.Down:
        return { ...n, y: n.y + 25 };
      case O.Up:
        return { ...n, y: n.y - 25 };
    }
  };
class ds {
  constructor(t) {
    (this.props = void 0),
      (this.autoScrollEnabled = !1),
      (this.referenceCoordinates = void 0),
      (this.listeners = void 0),
      (this.windowListeners = void 0),
      (this.props = t);
    const {
      event: { target: n },
    } = t;
    (this.props = t),
      (this.listeners = new Rr(Jn(n))),
      (this.windowListeners = new Rr(_e(n))),
      (this.handleKeyDown = this.handleKeyDown.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      this.attach();
  }
  attach() {
    this.handleStart(),
      this.windowListeners.add(Ue.Resize, this.handleCancel),
      this.windowListeners.add(Ue.VisibilityChange, this.handleCancel),
      setTimeout(() => this.listeners.add(Ue.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const { activeNode: t, onStart: n } = this.props,
      r = t.node.current;
    r && Qv(r), n(nt);
  }
  handleKeyDown(t) {
    if (as(t)) {
      const { active: n, context: r, options: l } = this.props,
        {
          keyboardCodes: o = yf,
          coordinateGetter: i = Yv,
          scrollBehavior: u = "smooth",
        } = l,
        { code: s } = t;
      if (o.end.includes(s)) {
        this.handleEnd(t);
        return;
      }
      if (o.cancel.includes(s)) {
        this.handleCancel(t);
        return;
      }
      const { collisionRect: a } = r.current,
        h = a ? { x: a.left, y: a.top } : nt;
      this.referenceCoordinates || (this.referenceCoordinates = h);
      const f = i(t, { active: n, context: r.current, currentCoordinates: h });
      if (f) {
        const v = Kr(f, h),
          g = { x: 0, y: 0 },
          { scrollableAncestors: S } = r.current;
        for (const w of S) {
          const R = t.code,
            {
              isTop: d,
              isRight: c,
              isLeft: p,
              isBottom: m,
              maxScroll: k,
              minScroll: C,
            } = gf(w),
            E = Vv(w),
            D = {
              x: Math.min(
                R === O.Right ? E.right - E.width / 2 : E.right,
                Math.max(R === O.Right ? E.left : E.left + E.width / 2, f.x)
              ),
              y: Math.min(
                R === O.Down ? E.bottom - E.height / 2 : E.bottom,
                Math.max(R === O.Down ? E.top : E.top + E.height / 2, f.y)
              ),
            },
            M = (R === O.Right && !c) || (R === O.Left && !p),
            T = (R === O.Down && !m) || (R === O.Up && !d);
          if (M && D.x !== f.x) {
            const I = w.scrollLeft + v.x,
              oe = (R === O.Right && I <= k.x) || (R === O.Left && I >= C.x);
            if (oe && !v.y) {
              w.scrollTo({ left: I, behavior: u });
              return;
            }
            oe
              ? (g.x = w.scrollLeft - I)
              : (g.x = R === O.Right ? w.scrollLeft - k.x : w.scrollLeft - C.x),
              g.x && w.scrollBy({ left: -g.x, behavior: u });
            break;
          } else if (T && D.y !== f.y) {
            const I = w.scrollTop + v.y,
              oe = (R === O.Down && I <= k.y) || (R === O.Up && I >= C.y);
            if (oe && !v.x) {
              w.scrollTo({ top: I, behavior: u });
              return;
            }
            oe
              ? (g.y = w.scrollTop - I)
              : (g.y = R === O.Down ? w.scrollTop - k.y : w.scrollTop - C.y),
              g.y && w.scrollBy({ top: -g.y, behavior: u });
            break;
          }
        }
        this.handleMove(t, An(Kr(f, this.referenceCoordinates), g));
      }
    }
  }
  handleMove(t, n) {
    const { onMove: r } = this.props;
    t.preventDefault(), r(n);
  }
  handleEnd(t) {
    const { onEnd: n } = this.props;
    t.preventDefault(), this.detach(), n();
  }
  handleCancel(t) {
    const { onCancel: n } = this.props;
    t.preventDefault(), this.detach(), n();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
ds.activators = [
  {
    eventName: "onKeyDown",
    handler: (e, t, n) => {
      let { keyboardCodes: r = yf, onActivation: l } = t,
        { active: o } = n;
      const { code: i } = e.nativeEvent;
      if (r.start.includes(i)) {
        const u = o.activatorNode.current;
        return u && e.target !== u
          ? !1
          : (e.preventDefault(), l == null || l({ event: e.nativeEvent }), !0);
      }
      return !1;
    },
  },
];
function Ua(e) {
  return !!(e && "distance" in e);
}
function $a(e) {
  return !!(e && "delay" in e);
}
class fs {
  constructor(t, n, r) {
    var l;
    r === void 0 && (r = Kv(t.event.target)),
      (this.props = void 0),
      (this.events = void 0),
      (this.autoScrollEnabled = !0),
      (this.document = void 0),
      (this.activated = !1),
      (this.initialCoordinates = void 0),
      (this.timeoutId = null),
      (this.listeners = void 0),
      (this.documentListeners = void 0),
      (this.windowListeners = void 0),
      (this.props = t),
      (this.events = n);
    const { event: o } = t,
      { target: i } = o;
    (this.props = t),
      (this.events = n),
      (this.document = Jn(i)),
      (this.documentListeners = new Rr(this.document)),
      (this.listeners = new Rr(r)),
      (this.windowListeners = new Rr(_e(i))),
      (this.initialCoordinates = (l = su(o)) != null ? l : nt),
      (this.handleStart = this.handleStart.bind(this)),
      (this.handleMove = this.handleMove.bind(this)),
      (this.handleEnd = this.handleEnd.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      (this.handleKeydown = this.handleKeydown.bind(this)),
      (this.removeTextSelection = this.removeTextSelection.bind(this)),
      this.attach();
  }
  attach() {
    const {
      events: t,
      props: {
        options: { activationConstraint: n, bypassActivationConstraint: r },
      },
    } = this;
    if (
      (this.listeners.add(t.move.name, this.handleMove, { passive: !1 }),
      this.listeners.add(t.end.name, this.handleEnd),
      this.windowListeners.add(Ue.Resize, this.handleCancel),
      this.windowListeners.add(Ue.DragStart, Aa),
      this.windowListeners.add(Ue.VisibilityChange, this.handleCancel),
      this.windowListeners.add(Ue.ContextMenu, Aa),
      this.documentListeners.add(Ue.Keydown, this.handleKeydown),
      n)
    ) {
      if (
        r != null &&
        r({
          event: this.props.event,
          activeNode: this.props.activeNode,
          options: this.props.options,
        })
      )
        return this.handleStart();
      if ($a(n)) {
        this.timeoutId = setTimeout(this.handleStart, n.delay);
        return;
      }
      if (Ua(n)) return;
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(),
      this.windowListeners.removeAll(),
      setTimeout(this.documentListeners.removeAll, 50),
      this.timeoutId !== null &&
        (clearTimeout(this.timeoutId), (this.timeoutId = null));
  }
  handleStart() {
    const { initialCoordinates: t } = this,
      { onStart: n } = this.props;
    t &&
      ((this.activated = !0),
      this.documentListeners.add(Ue.Click, Gv, { capture: !0 }),
      this.removeTextSelection(),
      this.documentListeners.add(Ue.SelectionChange, this.removeTextSelection),
      n(t));
  }
  handleMove(t) {
    var n;
    const { activated: r, initialCoordinates: l, props: o } = this,
      {
        onMove: i,
        options: { activationConstraint: u },
      } = o;
    if (!l) return;
    const s = (n = su(t)) != null ? n : nt,
      a = Kr(l, s);
    if (!r && u) {
      if (Ua(u)) {
        if (u.tolerance != null && di(a, u.tolerance))
          return this.handleCancel();
        if (di(a, u.distance)) return this.handleStart();
      }
      return $a(u) && di(a, u.tolerance) ? this.handleCancel() : void 0;
    }
    t.cancelable && t.preventDefault(), i(s);
  }
  handleEnd() {
    const { onEnd: t } = this.props;
    this.detach(), t();
  }
  handleCancel() {
    const { onCancel: t } = this.props;
    this.detach(), t();
  }
  handleKeydown(t) {
    t.code === O.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var t;
    (t = this.document.getSelection()) == null || t.removeAllRanges();
  }
}
const Zv = { move: { name: "pointermove" }, end: { name: "pointerup" } };
class ps extends fs {
  constructor(t) {
    const { event: n } = t,
      r = Jn(n.target);
    super(t, Zv, r);
  }
}
ps.activators = [
  {
    eventName: "onPointerDown",
    handler: (e, t) => {
      let { nativeEvent: n } = e,
        { onActivation: r } = t;
      return !n.isPrimary || n.button !== 0
        ? !1
        : (r == null || r({ event: n }), !0);
    },
  },
];
const Jv = { move: { name: "mousemove" }, end: { name: "mouseup" } };
var cu;
(function (e) {
  e[(e.RightClick = 2)] = "RightClick";
})(cu || (cu = {}));
class qv extends fs {
  constructor(t) {
    super(t, Jv, Jn(t.event.target));
  }
}
qv.activators = [
  {
    eventName: "onMouseDown",
    handler: (e, t) => {
      let { nativeEvent: n } = e,
        { onActivation: r } = t;
      return n.button === cu.RightClick
        ? !1
        : (r == null || r({ event: n }), !0);
    },
  },
];
const fi = { move: { name: "touchmove" }, end: { name: "touchend" } };
class wf extends fs {
  constructor(t) {
    super(t, fi);
  }
  static setup() {
    return (
      window.addEventListener(fi.move.name, t, { capture: !1, passive: !1 }),
      function () {
        window.removeEventListener(fi.move.name, t);
      }
    );
    function t() {}
  }
}
wf.activators = [
  {
    eventName: "onTouchStart",
    handler: (e, t) => {
      let { nativeEvent: n } = e,
        { onActivation: r } = t;
      const { touches: l } = n;
      return l.length > 1 ? !1 : (r == null || r({ event: n }), !0);
    },
  },
];
var Nr;
(function (e) {
  (e[(e.Pointer = 0)] = "Pointer"),
    (e[(e.DraggableRect = 1)] = "DraggableRect");
})(Nr || (Nr = {}));
var fo;
(function (e) {
  (e[(e.TreeOrder = 0)] = "TreeOrder"),
    (e[(e.ReversedTreeOrder = 1)] = "ReversedTreeOrder");
})(fo || (fo = {}));
function bv(e) {
  let {
    acceleration: t,
    activator: n = Nr.Pointer,
    canScroll: r,
    draggingRect: l,
    enabled: o,
    interval: i = 5,
    order: u = fo.TreeOrder,
    pointerCoordinates: s,
    scrollableAncestors: a,
    scrollableAncestorRects: h,
    delta: f,
    threshold: v,
  } = e;
  const g = tg({ delta: f, disabled: !o }),
    [S, w] = fv(),
    R = y.useRef({ x: 0, y: 0 }),
    d = y.useRef({ x: 0, y: 0 }),
    c = y.useMemo(() => {
      switch (n) {
        case Nr.Pointer:
          return s ? { top: s.y, bottom: s.y, left: s.x, right: s.x } : null;
        case Nr.DraggableRect:
          return l;
      }
    }, [n, l, s]),
    p = y.useRef(null),
    m = y.useCallback(() => {
      const C = p.current;
      if (!C) return;
      const E = R.current.x * d.current.x,
        D = R.current.y * d.current.y;
      C.scrollBy(E, D);
    }, []),
    k = y.useMemo(() => (u === fo.TreeOrder ? [...a].reverse() : a), [u, a]);
  y.useEffect(() => {
    if (!o || !a.length || !c) {
      w();
      return;
    }
    for (const C of k) {
      if ((r == null ? void 0 : r(C)) === !1) continue;
      const E = a.indexOf(C),
        D = h[E];
      if (!D) continue;
      const { direction: M, speed: T } = Bv(C, D, c, t, v);
      for (const I of ["x", "y"]) g[I][M[I]] || ((T[I] = 0), (M[I] = 0));
      if (T.x > 0 || T.y > 0) {
        w(), (p.current = C), S(m, i), (R.current = T), (d.current = M);
        return;
      }
    }
    (R.current = { x: 0, y: 0 }), (d.current = { x: 0, y: 0 }), w();
  }, [
    t,
    m,
    r,
    w,
    o,
    i,
    JSON.stringify(c),
    JSON.stringify(g),
    S,
    a,
    k,
    h,
    JSON.stringify(v),
  ]);
}
const eg = {
  x: { [re.Backward]: !1, [re.Forward]: !1 },
  y: { [re.Backward]: !1, [re.Forward]: !1 },
};
function tg(e) {
  let { delta: t, disabled: n } = e;
  const r = uu(t);
  return tl(
    (l) => {
      if (n || !r || !l) return eg;
      const o = { x: Math.sign(t.x - r.x), y: Math.sign(t.y - r.y) };
      return {
        x: {
          [re.Backward]: l.x[re.Backward] || o.x === -1,
          [re.Forward]: l.x[re.Forward] || o.x === 1,
        },
        y: {
          [re.Backward]: l.y[re.Backward] || o.y === -1,
          [re.Forward]: l.y[re.Forward] || o.y === 1,
        },
      };
    },
    [n, t, r]
  );
}
function ng(e, t) {
  const n = t !== null ? e.get(t) : void 0,
    r = n ? n.node.current : null;
  return tl(
    (l) => {
      var o;
      return t === null ? null : (o = r ?? l) != null ? o : null;
    },
    [r, t]
  );
}
function rg(e, t) {
  return y.useMemo(
    () =>
      e.reduce((n, r) => {
        const { sensor: l } = r,
          o = l.activators.map((i) => ({
            eventName: i.eventName,
            handler: t(i.handler, r),
          }));
        return [...n, ...o];
      }, []),
    [e, t]
  );
}
var Gr;
(function (e) {
  (e[(e.Always = 0)] = "Always"),
    (e[(e.BeforeDragging = 1)] = "BeforeDragging"),
    (e[(e.WhileDragging = 2)] = "WhileDragging");
})(Gr || (Gr = {}));
var du;
(function (e) {
  e.Optimized = "optimized";
})(du || (du = {}));
const Ba = new Map();
function lg(e, t) {
  let { dragging: n, dependencies: r, config: l } = t;
  const [o, i] = y.useState(null),
    { frequency: u, measure: s, strategy: a } = l,
    h = y.useRef(e),
    f = R(),
    v = Xr(f),
    g = y.useCallback(
      function (d) {
        d === void 0 && (d = []),
          !v.current &&
            i((c) =>
              c === null ? d : c.concat(d.filter((p) => !c.includes(p)))
            );
      },
      [v]
    ),
    S = y.useRef(null),
    w = tl(
      (d) => {
        if (f && !n) return Ba;
        if (!d || d === Ba || h.current !== e || o != null) {
          const c = new Map();
          for (let p of e) {
            if (!p) continue;
            if (o && o.length > 0 && !o.includes(p.id) && p.rect.current) {
              c.set(p.id, p.rect.current);
              continue;
            }
            const m = p.node.current,
              k = m ? new cs(s(m), m) : null;
            (p.rect.current = k), k && c.set(p.id, k);
          }
          return c;
        }
        return d;
      },
      [e, o, n, f, s]
    );
  return (
    y.useEffect(() => {
      h.current = e;
    }, [e]),
    y.useEffect(() => {
      f || g();
    }, [n, f]),
    y.useEffect(() => {
      o && o.length > 0 && i(null);
    }, [JSON.stringify(o)]),
    y.useEffect(() => {
      f ||
        typeof u != "number" ||
        S.current !== null ||
        (S.current = setTimeout(() => {
          g(), (S.current = null);
        }, u));
    }, [u, f, g, ...r]),
    {
      droppableRects: w,
      measureDroppableContainers: g,
      measuringScheduled: o != null,
    }
  );
  function R() {
    switch (a) {
      case Gr.Always:
        return !1;
      case Gr.BeforeDragging:
        return n;
      default:
        return !n;
    }
  }
}
function Sf(e, t) {
  return tl(
    (n) => (e ? n || (typeof t == "function" ? t(e) : e) : null),
    [t, e]
  );
}
function og(e, t) {
  return Sf(e, t);
}
function ig(e) {
  let { callback: t, disabled: n } = e;
  const r = ss(t),
    l = y.useMemo(() => {
      if (n || typeof window > "u" || typeof window.MutationObserver > "u")
        return;
      const { MutationObserver: o } = window;
      return new o(r);
    }, [r, n]);
  return y.useEffect(() => () => l == null ? void 0 : l.disconnect(), [l]), l;
}
function Mo(e) {
  let { callback: t, disabled: n } = e;
  const r = ss(t),
    l = y.useMemo(() => {
      if (n || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const { ResizeObserver: o } = window;
      return new o(r);
    }, [n]);
  return y.useEffect(() => () => l == null ? void 0 : l.disconnect(), [l]), l;
}
function ug(e) {
  return new cs(qn(e), e);
}
function Va(e, t, n) {
  t === void 0 && (t = ug);
  const [r, l] = y.useReducer(u, null),
    o = ig({
      callback(s) {
        if (e)
          for (const a of s) {
            const { type: h, target: f } = a;
            if (
              h === "childList" &&
              f instanceof HTMLElement &&
              f.contains(e)
            ) {
              l();
              break;
            }
          }
      },
    }),
    i = Mo({ callback: l });
  return (
    tt(() => {
      l(),
        e
          ? (i == null || i.observe(e),
            o == null ||
              o.observe(document.body, { childList: !0, subtree: !0 }))
          : (i == null || i.disconnect(), o == null || o.disconnect());
    }, [e]),
    r
  );
  function u(s) {
    if (!e) return null;
    if (e.isConnected === !1) {
      var a;
      return (a = s ?? n) != null ? a : null;
    }
    const h = t(e);
    return JSON.stringify(s) === JSON.stringify(h) ? s : h;
  }
}
function sg(e) {
  const t = Sf(e);
  return df(e, t);
}
const Wa = [];
function ag(e) {
  const t = y.useRef(e),
    n = tl(
      (r) =>
        e
          ? r &&
            r !== Wa &&
            e &&
            t.current &&
            e.parentNode === t.current.parentNode
            ? r
            : zo(e)
          : Wa,
      [e]
    );
  return (
    y.useEffect(() => {
      t.current = e;
    }, [e]),
    n
  );
}
function cg(e) {
  const [t, n] = y.useState(null),
    r = y.useRef(e),
    l = y.useCallback((o) => {
      const i = ci(o.target);
      i && n((u) => (u ? (u.set(i, au(i)), new Map(u)) : null));
    }, []);
  return (
    y.useEffect(() => {
      const o = r.current;
      if (e !== o) {
        i(o);
        const u = e
          .map((s) => {
            const a = ci(s);
            return a
              ? (a.addEventListener("scroll", l, { passive: !0 }), [a, au(a)])
              : null;
          })
          .filter((s) => s != null);
        n(u.length ? new Map(u) : null), (r.current = e);
      }
      return () => {
        i(e), i(o);
      };
      function i(u) {
        u.forEach((s) => {
          const a = ci(s);
          a == null || a.removeEventListener("scroll", l);
        });
      }
    }, [l, e]),
    y.useMemo(
      () =>
        e.length
          ? t
            ? Array.from(t.values()).reduce((o, i) => An(o, i), nt)
            : mf(e)
          : nt,
      [e, t]
    )
  );
}
function Ha(e, t) {
  t === void 0 && (t = []);
  const n = y.useRef(null);
  return (
    y.useEffect(() => {
      n.current = null;
    }, t),
    y.useEffect(() => {
      const r = e !== nt;
      r && !n.current && (n.current = e), !r && n.current && (n.current = null);
    }, [e]),
    n.current ? Kr(e, n.current) : nt
  );
}
function dg(e) {
  y.useEffect(
    () => {
      if (!Po) return;
      const t = e.map((n) => {
        let { sensor: r } = n;
        return r.setup == null ? void 0 : r.setup();
      });
      return () => {
        for (const n of t) n == null || n();
      };
    },
    e.map((t) => {
      let { sensor: n } = t;
      return n;
    })
  );
}
function fg(e, t) {
  return y.useMemo(
    () =>
      e.reduce((n, r) => {
        let { eventName: l, handler: o } = r;
        return (
          (n[l] = (i) => {
            o(i, t);
          }),
          n
        );
      }, {}),
    [e, t]
  );
}
function kf(e) {
  return y.useMemo(() => (e ? Fv(e) : null), [e]);
}
const pi = [];
function pg(e, t) {
  t === void 0 && (t = qn);
  const [n] = e,
    r = kf(n ? _e(n) : null),
    [l, o] = y.useReducer(u, pi),
    i = Mo({ callback: o });
  return (
    e.length > 0 && l === pi && o(),
    tt(() => {
      e.length
        ? e.forEach((s) => (i == null ? void 0 : i.observe(s)))
        : (i == null || i.disconnect(), o());
    }, [e]),
    l
  );
  function u() {
    return e.length ? e.map((s) => (vf(s) ? r : new cs(t(s), s))) : pi;
  }
}
function hg(e) {
  if (!e) return null;
  if (e.children.length > 1) return e;
  const t = e.children[0];
  return el(t) ? t : e;
}
function vg(e) {
  let { measure: t } = e;
  const [n, r] = y.useState(null),
    l = y.useCallback(
      (a) => {
        for (const { target: h } of a)
          if (el(h)) {
            r((f) => {
              const v = t(h);
              return f ? { ...f, width: v.width, height: v.height } : v;
            });
            break;
          }
      },
      [t]
    ),
    o = Mo({ callback: l }),
    i = y.useCallback(
      (a) => {
        const h = hg(a);
        o == null || o.disconnect(),
          h && (o == null || o.observe(h)),
          r(h ? t(h) : null);
      },
      [t, o]
    ),
    [u, s] = ao(i);
  return y.useMemo(() => ({ nodeRef: u, rect: n, setRef: s }), [n, u, s]);
}
const gg = [
    { sensor: ps, options: {} },
    { sensor: ds, options: {} },
  ],
  mg = { current: {} },
  Al = {
    draggable: { measure: Fa },
    droppable: {
      measure: Fa,
      strategy: Gr.WhileDragging,
      frequency: du.Optimized,
    },
    dragOverlay: { measure: qn },
  };
class _r extends Map {
  get(t) {
    var n;
    return t != null && (n = super.get(t)) != null ? n : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((t) => {
      let { disabled: n } = t;
      return !n;
    });
  }
  getNodeFor(t) {
    var n, r;
    return (n = (r = this.get(t)) == null ? void 0 : r.node.current) != null
      ? n
      : void 0;
  }
}
const yg = {
    activatorEvent: null,
    active: null,
    activeNode: null,
    activeNodeRect: null,
    collisions: null,
    containerNodeRect: null,
    draggableNodes: new Map(),
    droppableRects: new Map(),
    droppableContainers: new _r(),
    over: null,
    dragOverlay: { nodeRef: { current: null }, rect: null, setRef: co },
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    measuringConfiguration: Al,
    measureDroppableContainers: co,
    windowRect: null,
    measuringScheduled: !1,
  },
  wg = {
    activatorEvent: null,
    activators: [],
    active: null,
    activeNodeRect: null,
    ariaDescribedById: { draggable: "" },
    dispatch: co,
    draggableNodes: new Map(),
    over: null,
    measureDroppableContainers: co,
  },
  Lo = y.createContext(wg),
  xf = y.createContext(yg);
function Sg() {
  return {
    draggable: {
      active: null,
      initialCoordinates: { x: 0, y: 0 },
      nodes: new Map(),
      translate: { x: 0, y: 0 },
    },
    droppable: { containers: new _r() },
  };
}
function kg(e, t) {
  switch (t.type) {
    case ee.DragStart:
      return {
        ...e,
        draggable: {
          ...e.draggable,
          initialCoordinates: t.initialCoordinates,
          active: t.active,
        },
      };
    case ee.DragMove:
      return e.draggable.active
        ? {
            ...e,
            draggable: {
              ...e.draggable,
              translate: {
                x: t.coordinates.x - e.draggable.initialCoordinates.x,
                y: t.coordinates.y - e.draggable.initialCoordinates.y,
              },
            },
          }
        : e;
    case ee.DragEnd:
    case ee.DragCancel:
      return {
        ...e,
        draggable: {
          ...e.draggable,
          active: null,
          initialCoordinates: { x: 0, y: 0 },
          translate: { x: 0, y: 0 },
        },
      };
    case ee.RegisterDroppable: {
      const { element: n } = t,
        { id: r } = n,
        l = new _r(e.droppable.containers);
      return (
        l.set(r, n), { ...e, droppable: { ...e.droppable, containers: l } }
      );
    }
    case ee.SetDroppableDisabled: {
      const { id: n, key: r, disabled: l } = t,
        o = e.droppable.containers.get(n);
      if (!o || r !== o.key) return e;
      const i = new _r(e.droppable.containers);
      return (
        i.set(n, { ...o, disabled: l }),
        { ...e, droppable: { ...e.droppable, containers: i } }
      );
    }
    case ee.UnregisterDroppable: {
      const { id: n, key: r } = t,
        l = e.droppable.containers.get(n);
      if (!l || r !== l.key) return e;
      const o = new _r(e.droppable.containers);
      return (
        o.delete(n), { ...e, droppable: { ...e.droppable, containers: o } }
      );
    }
    default:
      return e;
  }
}
function xg(e) {
  let { disabled: t } = e;
  const { active: n, activatorEvent: r, draggableNodes: l } = y.useContext(Lo),
    o = uu(r),
    i = uu(n == null ? void 0 : n.id);
  return (
    y.useEffect(() => {
      if (!t && !r && o && i != null) {
        if (!as(o) || document.activeElement === o.target) return;
        const u = l.get(i);
        if (!u) return;
        const { activatorNode: s, node: a } = u;
        if (!s.current && !a.current) return;
        requestAnimationFrame(() => {
          for (const h of [s.current, a.current]) {
            if (!h) continue;
            const f = vv(h);
            if (f) {
              f.focus();
              break;
            }
          }
        });
      }
    }, [r, t, l, i, o]),
    null
  );
}
function Eg(e, t) {
  let { transform: n, ...r } = t;
  return e != null && e.length
    ? e.reduce((l, o) => o({ transform: l, ...r }), n)
    : n;
}
function Cg(e) {
  return y.useMemo(
    () => ({
      draggable: { ...Al.draggable, ...(e == null ? void 0 : e.draggable) },
      droppable: { ...Al.droppable, ...(e == null ? void 0 : e.droppable) },
      dragOverlay: {
        ...Al.dragOverlay,
        ...(e == null ? void 0 : e.dragOverlay),
      },
    }),
    [
      e == null ? void 0 : e.draggable,
      e == null ? void 0 : e.droppable,
      e == null ? void 0 : e.dragOverlay,
    ]
  );
}
function Dg(e) {
  let { activeNode: t, measure: n, initialRect: r, config: l = !0 } = e;
  const o = y.useRef(!1),
    { x: i, y: u } = typeof l == "boolean" ? { x: l, y: l } : l;
  tt(() => {
    if ((!i && !u) || !t) {
      o.current = !1;
      return;
    }
    if (o.current || !r) return;
    const a = t == null ? void 0 : t.node.current;
    if (!a || a.isConnected === !1) return;
    const h = n(a),
      f = df(h, r);
    if (
      (i || (f.x = 0),
      u || (f.y = 0),
      (o.current = !0),
      Math.abs(f.x) > 0 || Math.abs(f.y) > 0)
    ) {
      const v = ff(a);
      v && v.scrollBy({ top: f.y, left: f.x });
    }
  }, [t, i, u, r, n]);
}
const Ef = y.createContext({ ...nt, scaleX: 1, scaleY: 1 });
var Mt;
(function (e) {
  (e[(e.Uninitialized = 0)] = "Uninitialized"),
    (e[(e.Initializing = 1)] = "Initializing"),
    (e[(e.Initialized = 2)] = "Initialized");
})(Mt || (Mt = {}));
const Rg = y.memo(function (t) {
    var n, r, l, o;
    let {
      id: i,
      accessibility: u,
      autoScroll: s = !0,
      children: a,
      sensors: h = gg,
      collisionDetection: f = Pv,
      measuring: v,
      modifiers: g,
      ...S
    } = t;
    const w = y.useReducer(kg, void 0, Sg),
      [R, d] = w,
      [c, p] = kv(),
      [m, k] = y.useState(Mt.Uninitialized),
      C = m === Mt.Initialized,
      {
        draggable: { active: E, nodes: D, translate: M },
        droppable: { containers: T },
      } = R,
      I = E ? D.get(E) : null,
      oe = y.useRef({ initial: null, translated: null }),
      ie = y.useMemo(() => {
        var se;
        return E != null
          ? {
              id: E,
              data: (se = I == null ? void 0 : I.data) != null ? se : mg,
              rect: oe,
            }
          : null;
      }, [E, I]),
      Te = y.useRef(null),
      [Zt, Ct] = y.useState(null),
      [ue, N] = y.useState(null),
      P = Xr(S, Object.values(S)),
      z = nl("DndDescribedBy", i),
      B = y.useMemo(() => T.getEnabled(), [T]),
      j = Cg(v),
      {
        droppableRects: xe,
        measureDroppableContainers: ge,
        measuringScheduled: ct,
      } = lg(B, { dragging: C, dependencies: [M.x, M.y], config: j.droppable }),
      J = ng(D, E),
      dt = y.useMemo(() => (ue ? su(ue) : null), [ue]),
      Dt = Af(),
      ft = og(J, j.draggable.measure);
    Dg({
      activeNode: E ? D.get(E) : null,
      config: Dt.layoutShiftCompensation,
      initialRect: ft,
      measure: j.draggable.measure,
    });
    const $ = Va(J, j.draggable.measure, ft),
      bn = Va(J ? J.parentElement : null),
      rt = y.useRef({
        activatorEvent: null,
        active: null,
        activeNode: J,
        collisionRect: null,
        collisions: null,
        droppableRects: xe,
        draggableNodes: D,
        draggingNode: null,
        draggingNodeRect: null,
        droppableContainers: T,
        over: null,
        scrollableAncestors: [],
        scrollAdjustedTranslate: null,
      }),
      pn = T.getNodeFor((n = rt.current.over) == null ? void 0 : n.id),
      pt = vg({ measure: j.dragOverlay.measure }),
      hn = (r = pt.nodeRef.current) != null ? r : J,
      vn = C ? ((l = pt.rect) != null ? l : $) : null,
      gs = !!(pt.nodeRef.current && pt.rect),
      ms = sg(gs ? null : $),
      Io = kf(hn ? _e(hn) : null),
      Rt = ag(C ? pn ?? J : null),
      rl = pg(Rt),
      ll = Eg(g, {
        transform: { x: M.x - ms.x, y: M.y - ms.y, scaleX: 1, scaleY: 1 },
        activatorEvent: ue,
        active: ie,
        activeNodeRect: $,
        containerNodeRect: bn,
        draggingNodeRect: vn,
        over: rt.current.over,
        overlayNodeRect: pt.rect,
        scrollableAncestors: Rt,
        scrollableAncestorRects: rl,
        windowRect: Io,
      }),
      ys = dt ? An(dt, M) : null,
      ws = cg(Rt),
      zf = Ha(ws),
      Mf = Ha(ws, [$]),
      gn = An(ll, zf),
      mn = vn ? Lv(vn, ll) : null,
      er =
        ie && mn
          ? f({
              active: ie,
              collisionRect: mn,
              droppableRects: xe,
              droppableContainers: B,
              pointerCoordinates: ys,
            })
          : null,
      Ss = cf(er, "id"),
      [Nt, ks] = y.useState(null),
      Lf = gs ? ll : An(ll, Mf),
      If = zv(Lf, (o = Nt == null ? void 0 : Nt.rect) != null ? o : null, $),
      xs = y.useCallback(
        (se, Pe) => {
          let { sensor: ze, options: _t } = Pe;
          if (Te.current == null) return;
          const Ae = D.get(Te.current);
          if (!Ae) return;
          const Xe = se.nativeEvent,
            lt = new ze({
              active: Te.current,
              activeNode: Ae,
              event: Xe,
              options: _t,
              context: rt,
              onStart(Ke) {
                const tr = Te.current;
                if (tr == null) return;
                const nr = D.get(tr);
                if (!nr) return;
                const { onDragStart: ol } = P.current,
                  il = { active: { id: tr, data: nr.data, rect: oe } };
                bt.unstable_batchedUpdates(() => {
                  ol == null || ol(il),
                    k(Mt.Initializing),
                    d({
                      type: ee.DragStart,
                      initialCoordinates: Ke,
                      active: tr,
                    }),
                    c({ type: "onDragStart", event: il });
                });
              },
              onMove(Ke) {
                d({ type: ee.DragMove, coordinates: Ke });
              },
              onEnd: yn(ee.DragEnd),
              onCancel: yn(ee.DragCancel),
            });
          bt.unstable_batchedUpdates(() => {
            Ct(lt), N(se.nativeEvent);
          });
          function yn(Ke) {
            return async function () {
              const {
                active: nr,
                collisions: ol,
                over: il,
                scrollAdjustedTranslate: Cs,
              } = rt.current;
              let rr = null;
              if (nr && Cs) {
                const { cancelDrop: lr } = P.current;
                (rr = {
                  activatorEvent: Xe,
                  active: nr,
                  collisions: ol,
                  delta: Cs,
                  over: il,
                }),
                  Ke === ee.DragEnd &&
                    typeof lr == "function" &&
                    (await Promise.resolve(lr(rr))) &&
                    (Ke = ee.DragCancel);
              }
              (Te.current = null),
                bt.unstable_batchedUpdates(() => {
                  d({ type: Ke }),
                    k(Mt.Uninitialized),
                    ks(null),
                    Ct(null),
                    N(null);
                  const lr = Ke === ee.DragEnd ? "onDragEnd" : "onDragCancel";
                  if (rr) {
                    const Oo = P.current[lr];
                    Oo == null || Oo(rr), c({ type: lr, event: rr });
                  }
                });
            };
          }
        },
        [D]
      ),
      Of = y.useCallback(
        (se, Pe) => (ze, _t) => {
          const Ae = ze.nativeEvent,
            Xe = D.get(_t);
          if (Te.current !== null || !Xe || Ae.dndKit || Ae.defaultPrevented)
            return;
          const lt = { active: Xe };
          se(ze, Pe.options, lt) === !0 &&
            ((Ae.dndKit = { capturedBy: Pe.sensor }),
            (Te.current = _t),
            xs(ze, Pe));
        },
        [D, xs]
      ),
      Es = rg(h, Of);
    dg(h),
      tt(() => {
        $ && m === Mt.Initializing && k(Mt.Initialized);
      }, [$, m]),
      y.useEffect(() => {
        const { onDragMove: se } = P.current,
          {
            active: Pe,
            activatorEvent: ze,
            collisions: _t,
            over: Ae,
          } = rt.current;
        if (!Pe || !ze) return;
        const Xe = {
          active: Pe,
          activatorEvent: ze,
          collisions: _t,
          delta: { x: gn.x, y: gn.y },
          over: Ae,
        };
        bt.unstable_batchedUpdates(() => {
          se == null || se(Xe), c({ type: "onDragMove", event: Xe });
        });
      }, [gn.x, gn.y]),
      y.useEffect(() => {
        const {
          active: se,
          activatorEvent: Pe,
          collisions: ze,
          droppableContainers: _t,
          scrollAdjustedTranslate: Ae,
        } = rt.current;
        if (!se || Te.current == null || !Pe || !Ae) return;
        const { onDragOver: Xe } = P.current,
          lt = _t.get(Ss),
          yn =
            lt && lt.rect.current
              ? {
                  id: lt.id,
                  rect: lt.rect.current,
                  data: lt.data,
                  disabled: lt.disabled,
                }
              : null,
          Ke = {
            active: se,
            activatorEvent: Pe,
            collisions: ze,
            delta: { x: Ae.x, y: Ae.y },
            over: yn,
          };
        bt.unstable_batchedUpdates(() => {
          ks(yn), Xe == null || Xe(Ke), c({ type: "onDragOver", event: Ke });
        });
      }, [Ss]),
      tt(() => {
        (rt.current = {
          activatorEvent: ue,
          active: ie,
          activeNode: J,
          collisionRect: mn,
          collisions: er,
          droppableRects: xe,
          draggableNodes: D,
          draggingNode: hn,
          draggingNodeRect: vn,
          droppableContainers: T,
          over: Nt,
          scrollableAncestors: Rt,
          scrollAdjustedTranslate: gn,
        }),
          (oe.current = { initial: vn, translated: mn });
      }, [ie, J, er, mn, D, hn, vn, xe, T, Nt, Rt, gn]),
      bv({
        ...Dt,
        delta: M,
        draggingRect: mn,
        pointerCoordinates: ys,
        scrollableAncestors: Rt,
        scrollableAncestorRects: rl,
      });
    const jf = y.useMemo(
        () => ({
          active: ie,
          activeNode: J,
          activeNodeRect: $,
          activatorEvent: ue,
          collisions: er,
          containerNodeRect: bn,
          dragOverlay: pt,
          draggableNodes: D,
          droppableContainers: T,
          droppableRects: xe,
          over: Nt,
          measureDroppableContainers: ge,
          scrollableAncestors: Rt,
          scrollableAncestorRects: rl,
          measuringConfiguration: j,
          measuringScheduled: ct,
          windowRect: Io,
        }),
        [ie, J, $, ue, er, bn, pt, D, T, xe, Nt, ge, Rt, rl, j, ct, Io]
      ),
      Ff = y.useMemo(
        () => ({
          activatorEvent: ue,
          activators: Es,
          active: ie,
          activeNodeRect: $,
          ariaDescribedById: { draggable: z },
          dispatch: d,
          draggableNodes: D,
          over: Nt,
          measureDroppableContainers: ge,
        }),
        [ue, Es, ie, $, d, z, D, Nt, ge]
      );
    return ye.createElement(
      uf.Provider,
      { value: p },
      ye.createElement(
        Lo.Provider,
        { value: Ff },
        ye.createElement(
          xf.Provider,
          { value: jf },
          ye.createElement(Ef.Provider, { value: If }, a)
        ),
        ye.createElement(xg, {
          disabled: (u == null ? void 0 : u.restoreFocus) === !1,
        })
      ),
      ye.createElement(Cv, { ...u, hiddenTextDescribedById: z })
    );
    function Af() {
      const se = (Zt == null ? void 0 : Zt.autoScrollEnabled) === !1,
        Pe = typeof s == "object" ? s.enabled === !1 : s === !1,
        ze = C && !se && !Pe;
      return typeof s == "object" ? { ...s, enabled: ze } : { enabled: ze };
    }
  }),
  Ng = y.createContext(null),
  Qa = "button",
  _g = "Droppable";
function Tg(e) {
  let { id: t, data: n, disabled: r = !1, attributes: l } = e;
  const o = nl(_g),
    {
      activators: i,
      activatorEvent: u,
      active: s,
      activeNodeRect: a,
      ariaDescribedById: h,
      draggableNodes: f,
      over: v,
    } = y.useContext(Lo),
    {
      role: g = Qa,
      roleDescription: S = "draggable",
      tabIndex: w = 0,
    } = l ?? {},
    R = (s == null ? void 0 : s.id) === t,
    d = y.useContext(R ? Ef : Ng),
    [c, p] = ao(),
    [m, k] = ao(),
    C = fg(i, t),
    E = Xr(n);
  tt(
    () => (
      f.set(t, { id: t, key: o, node: c, activatorNode: m, data: E }),
      () => {
        const M = f.get(t);
        M && M.key === o && f.delete(t);
      }
    ),
    [f, t]
  );
  const D = y.useMemo(
    () => ({
      role: g,
      tabIndex: w,
      "aria-disabled": r,
      "aria-pressed": R && g === Qa ? !0 : void 0,
      "aria-roledescription": S,
      "aria-describedby": h.draggable,
    }),
    [r, g, w, R, S, h.draggable]
  );
  return {
    active: s,
    activatorEvent: u,
    activeNodeRect: a,
    attributes: D,
    isDragging: R,
    listeners: r ? void 0 : C,
    node: c,
    over: v,
    setNodeRef: p,
    setActivatorNodeRef: k,
    transform: d,
  };
}
function Pg() {
  return y.useContext(xf);
}
const zg = "Droppable",
  Mg = { timeout: 25 };
function Lg(e) {
  let { data: t, disabled: n = !1, id: r, resizeObserverConfig: l } = e;
  const o = nl(zg),
    {
      active: i,
      dispatch: u,
      over: s,
      measureDroppableContainers: a,
    } = y.useContext(Lo),
    h = y.useRef({ disabled: n }),
    f = y.useRef(!1),
    v = y.useRef(null),
    g = y.useRef(null),
    { disabled: S, updateMeasurementsFor: w, timeout: R } = { ...Mg, ...l },
    d = Xr(w ?? r),
    c = y.useCallback(() => {
      if (!f.current) {
        f.current = !0;
        return;
      }
      g.current != null && clearTimeout(g.current),
        (g.current = setTimeout(() => {
          a(Array.isArray(d.current) ? d.current : [d.current]),
            (g.current = null);
        }, R));
    }, [R]),
    p = Mo({ callback: c, disabled: S || !i }),
    m = y.useCallback(
      (D, M) => {
        p && (M && (p.unobserve(M), (f.current = !1)), D && p.observe(D));
      },
      [p]
    ),
    [k, C] = ao(m),
    E = Xr(t);
  return (
    y.useEffect(() => {
      !p ||
        !k.current ||
        (p.disconnect(), (f.current = !1), p.observe(k.current));
    }, [k, p]),
    tt(
      () => (
        u({
          type: ee.RegisterDroppable,
          element: { id: r, key: o, disabled: n, node: k, rect: v, data: E },
        }),
        () => u({ type: ee.UnregisterDroppable, key: o, id: r })
      ),
      [r]
    ),
    y.useEffect(() => {
      n !== h.current.disabled &&
        (u({ type: ee.SetDroppableDisabled, id: r, key: o, disabled: n }),
        (h.current.disabled = n));
    }, [r, o, n, u]),
    {
      active: i,
      rect: v,
      isOver: (s == null ? void 0 : s.id) === r,
      node: k,
      over: s,
      setNodeRef: C,
    }
  );
}
function hs(e, t, n) {
  const r = e.slice();
  return r.splice(n < 0 ? r.length + n : n, 0, r.splice(t, 1)[0]), r;
}
function Ig(e, t) {
  return e.reduce((n, r, l) => {
    const o = t.get(r);
    return o && (n[l] = o), n;
  }, Array(e.length));
}
function Cl(e) {
  return e !== null && e >= 0;
}
function Og(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function jg(e) {
  return typeof e == "boolean" ? { draggable: e, droppable: e } : e;
}
const vs = (e) => {
    let { rects: t, activeIndex: n, overIndex: r, index: l } = e;
    const o = hs(t, r, n),
      i = t[l],
      u = o[l];
    return !u || !i
      ? null
      : {
          x: u.left - i.left,
          y: u.top - i.top,
          scaleX: u.width / i.width,
          scaleY: u.height / i.height,
        };
  },
  Dl = { scaleX: 1, scaleY: 1 },
  Fg = (e) => {
    var t;
    let {
      activeIndex: n,
      activeNodeRect: r,
      index: l,
      rects: o,
      overIndex: i,
    } = e;
    const u = (t = o[n]) != null ? t : r;
    if (!u) return null;
    if (l === n) {
      const a = o[i];
      return a
        ? {
            x: 0,
            y: n < i ? a.top + a.height - (u.top + u.height) : a.top - u.top,
            ...Dl,
          }
        : null;
    }
    const s = Ag(o, l, n);
    return l > n && l <= i
      ? { x: 0, y: -u.height - s, ...Dl }
      : l < n && l >= i
      ? { x: 0, y: u.height + s, ...Dl }
      : { x: 0, y: 0, ...Dl };
  };
function Ag(e, t, n) {
  const r = e[t],
    l = e[t - 1],
    o = e[t + 1];
  return r
    ? n < t
      ? l
        ? r.top - (l.top + l.height)
        : o
        ? o.top - (r.top + r.height)
        : 0
      : o
      ? o.top - (r.top + r.height)
      : l
      ? r.top - (l.top + l.height)
      : 0
    : 0;
}
const Cf = "Sortable",
  Df = ye.createContext({
    activeIndex: -1,
    containerId: Cf,
    disableTransforms: !1,
    items: [],
    overIndex: -1,
    useDragOverlay: !1,
    sortedRects: [],
    strategy: vs,
    disabled: { draggable: !1, droppable: !1 },
  });
function Rf(e) {
  let { children: t, id: n, items: r, strategy: l = vs, disabled: o = !1 } = e;
  const {
      active: i,
      dragOverlay: u,
      droppableRects: s,
      over: a,
      measureDroppableContainers: h,
    } = Pg(),
    f = nl(Cf, n),
    v = u.rect !== null,
    g = y.useMemo(
      () => r.map((C) => (typeof C == "object" && "id" in C ? C.id : C)),
      [r]
    ),
    S = i != null,
    w = i ? g.indexOf(i.id) : -1,
    R = a ? g.indexOf(a.id) : -1,
    d = y.useRef(g),
    c = !Og(g, d.current),
    p = (R !== -1 && w === -1) || c,
    m = jg(o);
  tt(() => {
    c && S && h(g);
  }, [c, g, S, h]),
    y.useEffect(() => {
      d.current = g;
    }, [g]);
  const k = y.useMemo(
    () => ({
      activeIndex: w,
      containerId: f,
      disabled: m,
      disableTransforms: p,
      items: g,
      overIndex: R,
      useDragOverlay: v,
      sortedRects: Ig(g, s),
      strategy: l,
    }),
    [w, f, m.draggable, m.droppable, p, g, R, s, v, l]
  );
  return ye.createElement(Df.Provider, { value: k }, t);
}
const Ug = (e) => {
    let { id: t, items: n, activeIndex: r, overIndex: l } = e;
    return hs(n, r, l).indexOf(t);
  },
  $g = (e) => {
    let {
      containerId: t,
      isSorting: n,
      wasDragging: r,
      index: l,
      items: o,
      newIndex: i,
      previousItems: u,
      previousContainerId: s,
      transition: a,
    } = e;
    return !a || !r || (u !== o && l === i) ? !1 : n ? !0 : i !== l && t === s;
  },
  Bg = { duration: 200, easing: "ease" },
  Nf = "transform",
  Vg = Xn.Transition.toString({ property: Nf, duration: 0, easing: "linear" }),
  Wg = { roleDescription: "sortable" };
function Hg(e) {
  let { disabled: t, index: n, node: r, rect: l } = e;
  const [o, i] = y.useState(null),
    u = y.useRef(n);
  return (
    tt(() => {
      if (!t && n !== u.current && r.current) {
        const s = l.current;
        if (s) {
          const a = qn(r.current, { ignoreTransform: !0 }),
            h = {
              x: s.left - a.left,
              y: s.top - a.top,
              scaleX: s.width / a.width,
              scaleY: s.height / a.height,
            };
          (h.x || h.y) && i(h);
        }
      }
      n !== u.current && (u.current = n);
    }, [t, n, r, l]),
    y.useEffect(() => {
      o && i(null);
    }, [o]),
    o
  );
}
function _f(e) {
  let {
    animateLayoutChanges: t = $g,
    attributes: n,
    disabled: r,
    data: l,
    getNewIndex: o = Ug,
    id: i,
    strategy: u,
    resizeObserverConfig: s,
    transition: a = Bg,
  } = e;
  const {
      items: h,
      containerId: f,
      activeIndex: v,
      disabled: g,
      disableTransforms: S,
      sortedRects: w,
      overIndex: R,
      useDragOverlay: d,
      strategy: c,
    } = y.useContext(Df),
    p = Qg(r, g),
    m = h.indexOf(i),
    k = y.useMemo(
      () => ({ sortable: { containerId: f, index: m, items: h }, ...l }),
      [f, l, m, h]
    ),
    C = y.useMemo(() => h.slice(h.indexOf(i)), [h, i]),
    {
      rect: E,
      node: D,
      isOver: M,
      setNodeRef: T,
    } = Lg({
      id: i,
      data: k,
      disabled: p.droppable,
      resizeObserverConfig: { updateMeasurementsFor: C, ...s },
    }),
    {
      active: I,
      activatorEvent: oe,
      activeNodeRect: ie,
      attributes: Te,
      setNodeRef: Zt,
      listeners: Ct,
      isDragging: ue,
      over: N,
      setActivatorNodeRef: P,
      transform: z,
    } = Tg({
      id: i,
      data: k,
      attributes: { ...Wg, ...n },
      disabled: p.draggable,
    }),
    B = dv(T, Zt),
    j = !!I,
    xe = j && !S && Cl(v) && Cl(R),
    ge = !d && ue,
    ct = ge && xe ? z : null,
    dt = xe
      ? ct ??
        (u ?? c)({
          rects: w,
          activeNodeRect: ie,
          activeIndex: v,
          overIndex: R,
          index: m,
        })
      : null,
    Dt =
      Cl(v) && Cl(R) ? o({ id: i, items: h, activeIndex: v, overIndex: R }) : m,
    ft = I == null ? void 0 : I.id,
    $ = y.useRef({ activeId: ft, items: h, newIndex: Dt, containerId: f }),
    bn = h !== $.current.items,
    rt = t({
      active: I,
      containerId: f,
      isDragging: ue,
      isSorting: j,
      id: i,
      index: m,
      items: h,
      newIndex: $.current.newIndex,
      previousItems: $.current.items,
      previousContainerId: $.current.containerId,
      transition: a,
      wasDragging: $.current.activeId != null,
    }),
    pn = Hg({ disabled: !rt, index: m, node: D, rect: E });
  return (
    y.useEffect(() => {
      j && $.current.newIndex !== Dt && ($.current.newIndex = Dt),
        f !== $.current.containerId && ($.current.containerId = f),
        h !== $.current.items && ($.current.items = h);
    }, [j, Dt, f, h]),
    y.useEffect(() => {
      if (ft === $.current.activeId) return;
      if (ft && !$.current.activeId) {
        $.current.activeId = ft;
        return;
      }
      const hn = setTimeout(() => {
        $.current.activeId = ft;
      }, 50);
      return () => clearTimeout(hn);
    }, [ft]),
    {
      active: I,
      activeIndex: v,
      attributes: Te,
      data: k,
      rect: E,
      index: m,
      newIndex: Dt,
      items: h,
      isOver: M,
      isSorting: j,
      isDragging: ue,
      listeners: Ct,
      node: D,
      overIndex: R,
      over: N,
      setNodeRef: B,
      setActivatorNodeRef: P,
      setDroppableNodeRef: T,
      setDraggableNodeRef: Zt,
      transform: pn ?? dt,
      transition: pt(),
    }
  );
  function pt() {
    if (pn || (bn && $.current.newIndex === m)) return Vg;
    if (!((ge && !as(oe)) || !a) && (j || rt))
      return Xn.Transition.toString({ ...a, property: Nf });
  }
}
function Qg(e, t) {
  var n, r;
  return typeof e == "boolean"
    ? { draggable: e, droppable: !1 }
    : {
        draggable:
          (n = e == null ? void 0 : e.draggable) != null ? n : t.draggable,
        droppable:
          (r = e == null ? void 0 : e.droppable) != null ? r : t.droppable,
      };
}
function po(e) {
  if (!e) return !1;
  const t = e.data.current;
  return !!(
    t &&
    "sortable" in t &&
    typeof t.sortable == "object" &&
    "containerId" in t.sortable &&
    "items" in t.sortable &&
    "index" in t.sortable
  );
}
const Xg = [O.Down, O.Right, O.Up, O.Left],
  Kg = (e, t) => {
    let {
      context: {
        active: n,
        collisionRect: r,
        droppableRects: l,
        droppableContainers: o,
        over: i,
        scrollableAncestors: u,
      },
    } = t;
    if (Xg.includes(e.code)) {
      if ((e.preventDefault(), !n || !r)) return;
      const s = [];
      o.getEnabled().forEach((f) => {
        if (!f || (f != null && f.disabled)) return;
        const v = l.get(f.id);
        if (v)
          switch (e.code) {
            case O.Down:
              r.top < v.top && s.push(f);
              break;
            case O.Up:
              r.top > v.top && s.push(f);
              break;
            case O.Left:
              r.left > v.left && s.push(f);
              break;
            case O.Right:
              r.left < v.left && s.push(f);
              break;
          }
      });
      const a = _v({
        active: n,
        collisionRect: r,
        droppableRects: l,
        droppableContainers: s,
        pointerCoordinates: null,
      });
      let h = cf(a, "id");
      if (
        (h === (i == null ? void 0 : i.id) && a.length > 1 && (h = a[1].id),
        h != null)
      ) {
        const f = o.get(n.id),
          v = o.get(h),
          g = v ? l.get(v.id) : null,
          S = v == null ? void 0 : v.node.current;
        if (S && g && f && v) {
          const R = zo(S).some((C, E) => u[E] !== C),
            d = Tf(f, v),
            c = Gg(f, v),
            p =
              R || !d
                ? { x: 0, y: 0 }
                : {
                    x: c ? r.width - g.width : 0,
                    y: c ? r.height - g.height : 0,
                  },
            m = { x: g.left, y: g.top };
          return p.x && p.y ? m : Kr(m, p);
        }
      }
    }
  };
function Tf(e, t) {
  return !po(e) || !po(t)
    ? !1
    : e.data.current.sortable.containerId ===
        t.data.current.sortable.containerId;
}
function Gg(e, t) {
  return !po(e) || !po(t) || !Tf(e, t)
    ? !1
    : e.data.current.sortable.index < t.data.current.sortable.index;
}
const Pf = ({
    id: e,
    title: t,
    imageUrl: n,
    releaseDate: r,
    genres: l,
    rating: o,
    certification: i,
    rank: u,
  }) => {
    const {
        attributes: s,
        listeners: a,
        setNodeRef: h,
        transform: f,
        transition: v,
      } = _f({ id: e }),
      g = {
        transition: v,
        transform: Xn.Transform.toString(f),
        opacity: u === -1 ? 0.5 : 1,
        border: u === -1 ? "2px dashed red" : "none",
      },
      [S, w] = y.useState(!1),
      R = y.useRef({ isDragging: !1, mouseDownTime: null }),
      p = {
        ...a,
        onMouseDown: () => {
          R.current.mouseDownTime = Date.now();
        },
        onMouseUp: () => {
          Date.now() - R.current.mouseDownTime < 200 &&
            !R.current.isDragging &&
            w(!S),
            (R.current.isDragging = !1);
        },
        onDragStart: () => {
          R.current.isDragging = !0;
        },
        onDragEnd: () => {
          R.current.isDragging = !1;
        },
      };
    return A.jsxs("div", {
      ref: h,
      ...s,
      ...p,
      style: g,
      className: `movie ${S ? "flipped" : ""}`,
      onClick: (m) => m.stopPropagation(),
      children: [
        A.jsx("div", {
          className: "front",
          children: A.jsx("img", {
            src: n,
            alt: t,
            style: { width: "200px", height: "300px" },
          }),
        }),
        A.jsxs("div", {
          className: "back",
          children: [
            A.jsx("h2", { children: t }),
            A.jsxs("p", { children: ["Release Date: ", r] }),
            A.jsxs("p", { children: ["Genres: ", l.join(", ")] }),
            A.jsxs("p", { children: ["Rating: ", o] }),
            A.jsxs("p", { children: ["Certification: ", i] }),
          ],
        }),
      ],
    });
  },
  Yg = ({ movies: e }) =>
    A.jsx("div", {
      className: "column",
      children: A.jsx(Rf, {
        items: e.map((t) => t.id),
        strategy: Fg,
        id: "movies",
        children: e.map((t) =>
          A.jsx(
            Pf,
            {
              id: t.id,
              title: t.title,
              imageUrl: t.imageUrl,
              releaseDate: t.releaseDate,
              genres: t.genres,
              rating: t.rating,
              certification: t.certification,
            },
            t.id
          )
        ),
      }),
    }),
  Zg = ({ id: e, rank: t, children: n }) => {
    var a;
    const r = !n,
      {
        attributes: l,
        listeners: o,
        setNodeRef: i,
        isDragging: u,
      } = _f({ id: e, data: { type: "droppable", rank: t }, disabled: r }),
      s = {
        transform: Xn.Translate.toString(
          (a = l.style) == null ? void 0 : a.transform
        ),
        position: "relative",
        zIndex: 2,
      };
    return A.jsxs("div", {
      ref: i,
      ...l,
      ...o,
      className: "droppable-container",
      style: s,
      "data-container-id": `rank-slot-${t}`,
      children: [
        n &&
          A.jsx("div", {
            className: "movie-container",
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            },
            children: A.jsx(Pf, {
              id: n.id,
              title: n.title,
              imageUrl: n.imageUrl,
              releaseDate: n.releaseDate,
              genres: n.genres,
              rating: n.rating,
              certification: n.certification,
            }),
          }),
        A.jsx("div", {
          className: "droppable-area",
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          },
          children: A.jsx("div", {
            className: "placeholder-content",
            style: { visibility: n ? "hidden" : "visible" },
            children: "Drop here",
          }),
        }),
        A.jsxs("div", {
          className: "rank-label",
          style: {
            position: "absolute",
            bottom: -20,
            width: "100%",
            textAlign: "center",
            pointerEvents: "auto",
          },
          children: ["Rank ", t + 1],
        }),
      ],
    });
  },
  Jg = ({ movies: e }) => {
    const t = Array.from({ length: 10 }, (n, r) => {
      const l = `rank-slot-${r}`,
        o = e.find((i) => i.rank === r);
      return { id: l, movie: o, rank: r };
    });
    return A.jsx("div", {
      className: "ranking-grid",
      children: A.jsx(Rf, {
        items: t.map((n) => n.id),
        strategy: vs,
        children: t.map((n) =>
          A.jsx(Zg, { id: n.id, rank: n.rank, children: n.movie }, n.id)
        ),
      }),
    });
  };
function qg() {
  const [e, t] = y.useState([
      {
        id: "1",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "2",
        title: "The Shawshank Redemption",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        releaseDate: "1994",
        genres: ["Drama"],
        rating: 9.3,
        certification: "R",
        rank: -1,
      },
      {
        id: "3",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "4",
        title: "The Shawshank Redemption",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        releaseDate: "1994",
        genres: ["Drama"],
        rating: 9.3,
        certification: "R",
        rank: -1,
      },
      {
        id: "5",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "21",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "22",
        title: "The Shawshank Redemption",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        releaseDate: "1994",
        genres: ["Drama"],
        rating: 9.3,
        certification: "R",
        rank: -1,
      },
      {
        id: "23",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "24",
        title: "The Shawshank Redemption",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        releaseDate: "1994",
        genres: ["Drama"],
        rating: 9.3,
        certification: "R",
        rank: -1,
      },
      {
        id: "25",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
      {
        id: "26",
        title: "Forest Gump",
        imageUrl:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: "11/09/2002",
        genres: ["Drama", "Romance"],
        rating: 8.8,
        certification: "PG-13",
        rank: -1,
      },
    ]),
    [n, r] = y.useState([]),
    l = (u) => e.findIndex((s) => s.id === u),
    o = (u) => {
      const { active: s, over: a } = u;
      if ((console.log("Ranked Movies at start:", n), !a)) {
        console.error("Drop event missing target.");
        return;
      }
      const h = s.id,
        f = a.id;
      if ((console.log(`Drag End Event from ${h} to ${f}`), h === f)) return;
      let v = [...e];
      if (!h.startsWith("rank-slot") && !f.startsWith("rank-slot")) {
        console.log("Reordering movies within the grid");
        const d = l(h),
          c = l(f);
        if (d > -1 && c > -1) {
          (v = hs(v, d, c)), t(v);
          return;
        }
      }
      let g = new Array(10).fill(null);
      n.forEach((d, c) => {
        d && d.rank !== void 0 && d.rank !== -1 && (g[d.rank] = d);
      }),
        console.log("Initial ranked movies:", g);
      const S = h.startsWith("rank-slot")
          ? parseInt(h.split("-")[2], 10)
          : v.findIndex((d) => d.id === h),
        w = f.startsWith("rank-slot") ? parseInt(f.split("-")[2], 10) : -1;
      if ((console.log(`fromIndex: ${S}, toIndex: ${w}`), S !== -1)) {
        const d = h.startsWith("rank-slot") ? g : v,
          c = d[S];
        if (((d[S] = null), w !== -1)) {
          const p = g[w];
          p &&
            (console.log("Swapping movies in rank slots"),
            (g[S] = p),
            (p.rank = S)),
            (g[w] = { ...c, rank: w });
        } else v.push({ ...c, rank: -1 });
      }
      const R = g.filter((d) => d !== null);
      console.log("Final ranked movies:", R),
        console.log("Final movies:", v),
        console.log("Final ranked movies state:", g),
        t(v.filter((d) => d !== null)),
        r(R);
    },
    i = Dv(ai(ps), ai(wf), ai(ds, { coordinateGetter: Kg }));
  return A.jsxs("div", {
    className: "App",
    children: [
      A.jsx("div", {
        className: "header",
        children: A.jsx("h1", { children: "Movie Ranker" }),
      }),
      A.jsx("div", {
        className: "content",
        children: A.jsxs(Rg, {
          sensors: i,
          onDragEnd: o,
          collisionDetection: Nv,
          children: [A.jsx(Jg, { movies: n }), A.jsx(Yg, { movies: e })],
        }),
      }),
    ],
  });
}
hi.createRoot(document.getElementById("root")).render(
  A.jsx(ye.StrictMode, { children: A.jsx(qg, {}) })
);
