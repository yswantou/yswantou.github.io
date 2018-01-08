/*jquery.1.3.2.min.js*/
(function() {
    var W = this,
    ab, F = W.jQuery,
    S = W.$,
    T = W.jQuery = W.$ = function(b, a) {
        return new T.fn.init(b, a)
    },
    M = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
    ac = /^.[^:#\[\.,]*$/;
    T.fn = T.prototype = {
        init: function(e, b) {
            e = e || document;
            if (e.nodeType) {
                this[0] = e;
                this.length = 1;
                this.context = e;
                return this
            }
            if (typeof e === "string") {
                var c = M.exec(e);
                if (c && (c[1] || !b)) {
                    if (c[1]) {
                        e = T.clean([c[1]], b)
                    } else {
                        var a = document.getElementById(c[3]);
                        if (a && a.id != c[3]) {
                            return T().find(e)
                        }
                        var d = T(a || []);
                        d.context = document;
                        d.selector = e;
                        return d
                    }
                } else {
                    return T(b).find(e)
                }
            } else {
                if (T.isFunction(e)) {
                    return T(document).ready(e)
                }
            }
            if (e.selector && e.context) {
                this.selector = e.selector;
                this.context = e.context
            }
            return this.setArray(T.isArray(e) ? e: T.makeArray(e))
        },
        selector: "",
        jquery: "1.3.2",
        size: function() {
            return this.length
        },
        get: function(a) {
            return a === ab ? Array.prototype.slice.call(this) : this[a]
        },
        pushStack: function(c, a, d) {
            var b = T(c);
            b.prevObject = this;
            b.context = this.context;
            if (a === "find") {
                b.selector = this.selector + (this.selector ? " ": "") + d
            } else {
                if (a) {
                    b.selector = this.selector + "." + a + "(" + d + ")"
                }
            }
            return b
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        },
        each: function(a, b) {
            return T.each(this, a, b)
        },
        index: function(a) {
            return T.inArray(a && a.jquery ? a[0] : a, this)
        },
        attr: function(c, a, b) {
            var d = c;
            if (typeof c === "string") {
                if (a === ab) {
                    return this[0] && T[b || "attr"](this[0], c)
                } else {
                    d = {};
                    d[c] = a
                }
            }
            return this.each(function(e) {
                for (c in d) {
                    T.attr(b ? this.style: this, c, T.prop(this, d[c], b, e, c))
                }
            })
        },
        css: function(b, a) {
            if ((b == "width" || b == "height") && parseFloat(a) < 0) {
                a = ab
            }
            return this.attr(b, a, "curCSS")
        },
        text: function(a) {
            if (typeof a !== "object" && a != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a))
            }
            var b = "";
            T.each(a || this,
            function() {
                T.each(this.childNodes,
                function() {
                    if (this.nodeType != 8) {
                        b += this.nodeType != 1 ? this.nodeValue: T.fn.text([this])
                    }
                })
            });
            return b
        },
        wrapAll: function(b) {
            if (this[0]) {
                var a = T(b, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    a.insertBefore(this[0])
                }
                a.map(function() {
                    var c = this;
                    while (c.firstChild) {
                        c = c.firstChild
                    }
                    return c
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(function() {
                T(this).contents().wrapAll(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                T(this).wrapAll(a)
            })
        },
        append: function() {
            return this.domManip(arguments, true,
            function(a) {
                if (this.nodeType == 1) {
                    this.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true,
            function(a) {
                if (this.nodeType == 1) {
                    this.insertBefore(a, this.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, false,
            function(a) {
                this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false,
            function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || T([])
        },
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        find: function(b) {
            if (this.length === 1) {
                var a = this.pushStack([], "find", b);
                a.length = 0;
                T.find(b, this[0], a);
                return a
            } else {
                return this.pushStack(T.unique(T.map(this,
                function(c) {
                    return T.find(b, c)
                })), "find", b)
            }
        },
        clone: function(b) {
            var d = this.map(function() {
                if (!T.support.noCloneEvent && !T.isXMLDoc(this)) {
                    var f = this.outerHTML;
                    if (!f) {
                        var e = this.ownerDocument.createElement("div");
                        e.appendChild(this.cloneNode(true));
                        f = e.innerHTML
                    }
                    return T.clean([f.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (b === true) {
                var a = this.find("*").andSelf(),
                c = 0;
                d.find("*").andSelf().each(function() {
                    if (this.nodeName !== a[c].nodeName) {
                        return
                    }
                    var g = T.data(a[c], "events");
                    for (var e in g) {
                        for (var f in g[e]) {
                            T.event.add(this, e, g[e][f], g[e][f].data)
                        }
                    }
                    c++
                })
            }
            return d
        },
        filter: function(a) {
            return this.pushStack(T.isFunction(a) && T.grep(this,
            function(b, c) {
                return a.call(b, c)
            }) || T.multiFilter(a, T.grep(this,
            function(b) {
                return b.nodeType === 1
            })), "filter", a)
        },
        closest: function(c) {
            var a = T.expr.match.POS.test(c) ? T(c) : null,
            b = 0;
            return this.map(function() {
                var d = this;
                while (d && d.ownerDocument) {
                    if (a ? a.index(d) > -1 : T(d).is(c)) {
                        T.data(d, "closest", b);
                        return d
                    }
                    d = d.parentNode;
                    b++
                }
            })
        },
        not: function(b) {
            if (typeof b === "string") {
                if (ac.test(b)) {
                    return this.pushStack(T.multiFilter(b, this, true), "not", b)
                } else {
                    b = T.multiFilter(b, this)
                }
            }
            var a = b.length && b[b.length - 1] !== ab && !b.nodeType;
            return this.filter(function() {
                return a ? T.inArray(this, b) < 0 : this != b
            })
        },
        add: function(a) {
            return this.pushStack(T.unique(T.merge(this.get(), typeof a === "string" ? T(a) : T.makeArray(a))))
        },
        is: function(a) {
            return !! a && T.multiFilter(a, this).length > 0
        },
        hasClass: function(a) {
            return !! a && this.is("." + a)
        },
        val: function(c) {
            if (c === ab) {
                var i = this[0];
                if (i) {
                    if (T.nodeName(i, "option")) {
                        return (i.attributes.value || {}).specified ? i.value: i.text
                    }
                    if (T.nodeName(i, "select")) {
                        var e = i.selectedIndex,
                        b = [],
                        a = i.options,
                        f = i.type == "select-one";
                        if (e < 0) {
                            return null
                        }
                        for (var h = f ? e: 0, d = f ? e + 1 : a.length; h < d; h++) {
                            var g = a[h];
                            if (g.selected) {
                                c = T(g).val();
                                if (f) {
                                    return c
                                }
                                b.push(c)
                            }
                        }
                        return b
                    }
                    return (i.value || "").replace(/\r/g, "")
                }
                return ab
            }
            if (typeof c === "number") {
                c += ""
            }
            return this.each(function() {
                if (this.nodeType != 1) {
                    return
                }
                if (T.isArray(c) && /radio|checkbox/.test(this.type)) {
                    this.checked = (T.inArray(this.value, c) >= 0 || T.inArray(this.name, c) >= 0)
                } else {
                    if (T.nodeName(this, "select")) {
                        var j = T.makeArray(c);
                        T("option", this).each(function() {
                            this.selected = (T.inArray(this.value, j) >= 0 || T.inArray(this.text, j) >= 0)
                        });
                        if (!j.length) {
                            this.selectedIndex = -1
                        }
                    } else {
                        this.value = c
                    }
                }
            })
        },
        html: function(a) {
            return a === ab ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(a)
        },
        replaceWith: function(a) {
            return this.after(a).remove()
        },
        eq: function(a) {
            return this.slice(a, +a + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(T.map(this,
            function(b, c) {
                return a.call(b, c, b)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        domManip: function(d, a, b) {
            if (this[0]) {
                var e = (this[0].ownerDocument || this[0]).createDocumentFragment(),
                h = T.clean(d, (this[0].ownerDocument || this[0]), e),
                f = e.firstChild;
                if (f) {
                    for (var g = 0,
                    i = this.length; g < i; g++) {
                        b.call(c(this[g], f), this.length > 1 || g > 0 ? e.cloneNode(true) : e)
                    }
                }
                if (h) {
                    T.each(h, E)
                }
            }
            return this;
            function c(k, j) {
                return a && T.nodeName(k, "table") && T.nodeName(j, "tr") ? (k.getElementsByTagName("tbody")[0] || k.appendChild(k.ownerDocument.createElement("tbody"))) : k
            }
        }
    };
    T.fn.init.prototype = T.fn;
    function E(b, a) {
        if (a.src) {
            T.ajax({
                url: a.src,
                async: false,
                dataType: "script"
            })
        } else {
            T.globalEval(a.text || a.textContent || a.innerHTML || "")
        }
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
    }
    function ad() {
        return + new Date
    }
    T.extend = T.fn.extend = function() {
        var c = arguments[0] || {},
        e = 1,
        d = arguments.length,
        h = false,
        f;
        if (typeof c === "boolean") {
            h = c;
            c = arguments[1] || {};
            e = 2
        }
        if (typeof c !== "object" && !T.isFunction(c)) {
            c = {}
        }
        if (d == e) {
            c = this; --e
        }
        for (; e < d; e++) {
            if ((f = arguments[e]) != null) {
                for (var g in f) {
                    var b = c[g],
                    a = f[g];
                    if (c === a) {
                        continue
                    }
                    if (h && a && typeof a === "object" && !a.nodeType) {
                        c[g] = T.extend(h, b || (a.length != null ? [] : {}), a)
                    } else {
                        if (a !== ab) {
                            c[g] = a
                        }
                    }
                }
            }
        }
        return c
    };
    var ag = /z-?index|font-?weight|opacity|zoom|line-?height/i,
    Q = document.defaultView || {},
    L = Object.prototype.toString;
    T.extend({
        noConflict: function(a) {
            W.$ = S;
            if (a) {
                W.jQuery = F
            }
            return T
        },
        isFunction: function(a) {
            return L.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return L.call(a) === "[object Array]"
        },
        isXMLDoc: function(a) {
            return a.nodeType === 9 && a.documentElement.nodeName !== "HTML" || !!a.ownerDocument && T.isXMLDoc(a.ownerDocument)
        },
        globalEval: function(a) {
            if (a && /\S/.test(a)) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                c = document.createElement("script");
                c.type = "text/javascript";
                if (T.support.scriptEval) {
                    c.appendChild(document.createTextNode(a))
                } else {
                    c.text = a
                }
                b.insertBefore(c, b.firstChild);
                b.removeChild(c)
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase()
        },
        each: function(e, a, f) {
            var g, d = 0,
            c = e.length;
            if (f) {
                if (c === ab) {
                    for (g in e) {
                        if (a.apply(e[g], f) === false) {
                            break
                        }
                    }
                } else {
                    for (; d < c;) {
                        if (a.apply(e[d++], f) === false) {
                            break
                        }
                    }
                }
            } else {
                if (c === ab) {
                    for (g in e) {
                        if (a.call(e[g], g, e[g]) === false) {
                            break
                        }
                    }
                } else {
                    for (var b = e[0]; d < c && a.call(b, d, b) !== false; b = e[++d]) {}
                }
            }
            return e
        },
        prop: function(b, a, c, d, e) {
            if (T.isFunction(a)) {
                a = a.call(b, d)
            }
            return typeof a === "number" && c == "curCSS" && !ag.test(e) ? a + "px": a
        },
        className: {
            add: function(b, a) {
                T.each((a || "").split(/\s+/),
                function(d, c) {
                    if (b.nodeType == 1 && !T.className.has(b.className, c)) {
                        b.className += (b.className ? " ": "") + c
                    }
                })
            },
            remove: function(b, a) {
                if (b.nodeType == 1) {
                    b.className = a !== ab ? T.grep(b.className.split(/\s+/),
                    function(c) {
                        return ! T.className.has(a, c)
                    }).join(" ") : ""
                }
            },
            has: function(a, b) {
                return a && T.inArray(b, (a.className || a).toString().split(/\s+/)) > -1
            }
        },
        swap: function(b, c, a) {
            var e = {};
            for (var d in c) {
                e[d] = b.style[d];
                b.style[d] = c[d]
            }
            a.call(b);
            for (var d in c) {
                b.style[d] = e[d]
            }
        },
        css: function(e, g, c, h) {
            if (g == "width" || g == "height") {
                var a, f = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                b = g == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                function d() {
                    a = g == "width" ? e.offsetWidth: e.offsetHeight;
                    if (h === "border") {
                        return
                    }
                    T.each(b,
                    function() {
                        if (!h) {
                            a -= parseFloat(T.curCSS(e, "padding" + this, true)) || 0
                        }
                        if (h === "margin") {
                            a += parseFloat(T.curCSS(e, "margin" + this, true)) || 0
                        } else {
                            a -= parseFloat(T.curCSS(e, "border" + this + "Width", true)) || 0
                        }
                    })
                }
                if (e.offsetWidth !== 0) {
                    d()
                } else {
                    T.swap(e, f, d)
                }
                return Math.max(0, Math.round(a))
            }
            return T.curCSS(e, g, c)
        },
        curCSS: function(e, h, g) {
            var b, i = e.style;
            if (h == "opacity" && !T.support.opacity) {
                b = T.attr(i, "opacity");
                return b == "" ? "1": b
            }
            if (h.match(/float/i)) {
                h = H
            }
            if (!g && i && i[h]) {
                b = i[h]
            } else {
                if (Q.getComputedStyle) {
                    if (h.match(/float/i)) {
                        h = "float"
                    }
                    h = h.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var a = Q.getComputedStyle(e, null);
                    if (a) {
                        b = a.getPropertyValue(h)
                    }
                    if (h == "opacity" && b == "") {
                        b = "1"
                    }
                } else {
                    if (e.currentStyle) {
                        var d = h.replace(/\-(\w)/g,
                        function(k, j) {
                            return j.toUpperCase()
                        });
                        b = e.currentStyle[h] || e.currentStyle[d];
                        if (!/^\d+(px)?$/i.test(b) && /^\d/.test(b)) {
                            var f = i.left,
                            c = e.runtimeStyle.left;
                            e.runtimeStyle.left = e.currentStyle.left;
                            i.left = b || 0;
                            b = i.pixelLeft + "px";
                            i.left = f;
                            e.runtimeStyle.left = c
                        }
                    }
                }
            }
            return b
        },
        clean: function(g, b, d) {
            b = b || document;
            if (typeof b.createElement === "undefined") {
                b = b.ownerDocument || b[0] && b[0].ownerDocument || document
            }
            if (!d && g.length === 1 && typeof g[0] === "string") {
                var e = /^<(\w+)\s*\/?>$/.exec(g[0]);
                if (e) {
                    return [b.createElement(e[1])]
                }
            }
            var f = [],
            h = [],
            a = b.createElement("div");
            T.each(g,
            function(l, i) {
                if (typeof i === "number") {
                    i += ""
                }
                if (!i) {
                    return
                }
                if (typeof i === "string") {
                    i = i.replace(/(<(\w+)[^>]*?)\/>/g,
                    function(q, p, r) {
                        return r.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? q: p + "></" + r + ">"
                    });
                    var m = i.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var k = !m.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !m.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || m.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !m.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!m.indexOf("<td") || !m.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !m.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !T.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    a.innerHTML = k[1] + i + k[2];
                    while (k[0]--) {
                        a = a.lastChild
                    }
                    if (!T.support.tbody) {
                        var j = /<tbody/i.test(i),
                        n = !m.indexOf("<table") && !j ? a.firstChild && a.firstChild.childNodes: k[1] == "<table>" && !j ? a.childNodes: [];
                        for (var o = n.length - 1; o >= 0; --o) {
                            if (T.nodeName(n[o], "tbody") && !n[o].childNodes.length) {
                                n[o].parentNode.removeChild(n[o])
                            }
                        }
                    }
                    if (!T.support.leadingWhitespace && /^\s/.test(i)) {
                        a.insertBefore(b.createTextNode(i.match(/^\s*/)[0]), a.firstChild)
                    }
                    i = T.makeArray(a.childNodes)
                }
                if (i.nodeType) {
                    f.push(i)
                } else {
                    f = T.merge(f, i)
                }
            });
            if (d) {
                for (var c = 0; f[c]; c++) {
                    if (T.nodeName(f[c], "script") && (!f[c].type || f[c].type.toLowerCase() === "text/javascript")) {
                        h.push(f[c].parentNode ? f[c].parentNode.removeChild(f[c]) : f[c])
                    } else {
                        if (f[c].nodeType === 1) {
                            f.splice.apply(f, [c + 1, 0].concat(T.makeArray(f[c].getElementsByTagName("script"))))
                        }
                        d.appendChild(f[c])
                    }
                }
                return h
            }
            return f
        },
        attr: function(c, f, b) {
            if (!c || c.nodeType == 3 || c.nodeType == 8) {
                return ab
            }
            var e = !T.isXMLDoc(c),
            a = b !== ab;
            f = e && T.props[f] || f;
            if (c.tagName) {
                var g = /href|src|style/.test(f);
                if (f == "selected" && c.parentNode) {
                    c.parentNode.selectedIndex
                }
                if (f in c && e && !g) {
                    if (a) {
                        if (f == "type" && T.nodeName(c, "input") && c.parentNode) {
                            throw "type property can't be changed"
                        }
                        c[f] = b
                    }
                    if (T.nodeName(c, "form") && c.getAttributeNode(f)) {
                        return c.getAttributeNode(f).nodeValue
                    }
                    if (f == "tabIndex") {
                        var d = c.getAttributeNode("tabIndex");
                        return d && d.specified ? d.value: c.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : c.nodeName.match(/^(a|area)$/i) && c.href ? 0 : ab
                    }
                    return c[f]
                }
                if (!T.support.style && e && f == "style") {
                    return T.attr(c.style, "cssText", b)
                }
                if (a) {
                    c.setAttribute(f, "" + b)
                }
                var h = !T.support.hrefNormalized && e && g ? c.getAttribute(f, 2) : c.getAttribute(f);
                return h === null ? ab: h
            }
            if (!T.support.opacity && f == "opacity") {
                if (a) {
                    c.zoom = 1;
                    c.filter = (c.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(b) + "" == "NaN" ? "": "alpha(opacity=" + b * 100 + ")")
                }
                return c.filter && c.filter.indexOf("opacity=") >= 0 ? (parseFloat(c.filter.match(/opacity=([^)]*)/)[1]) / 100) + "": ""
            }
            f = f.replace(/-([a-z])/ig,
            function(j, i) {
                return i.toUpperCase()
            });
            if (a) {
                c[f] = b
            }
            return c[f]
        },
        trim: function(a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(a) {
            var c = [];
            if (a != null) {
                var b = a.length;
                if (b == null || typeof a === "string" || T.isFunction(a) || a.setInterval) {
                    c[0] = a
                } else {
                    while (b) {
                        c[--b] = a[b]
                    }
                }
            }
            return c
        },
        inArray: function(b, a) {
            for (var d = 0,
            c = a.length; d < c; d++) {
                if (a[d] === b) {
                    return d
                }
            }
            return - 1
        },
        merge: function(b, e) {
            var d = 0,
            c, a = b.length;
            if (!T.support.getAll) {
                while ((c = e[d++]) != null) {
                    if (c.nodeType != 8) {
                        b[a++] = c
                    }
                }
            } else {
                while ((c = e[d++]) != null) {
                    b[a++] = c
                }
            }
            return b
        },
        unique: function(a) {
            var f = [],
            g = {};
            try {
                for (var e = 0,
                d = a.length; e < d; e++) {
                    var b = T.data(a[e]);
                    if (!g[b]) {
                        g[b] = true;
                        f.push(a[e])
                    }
                }
            } catch(c) {
                f = a
            }
            return f
        },
        grep: function(e, a, f) {
            var d = [];
            for (var c = 0,
            b = e.length; c < b; c++) {
                if (!f != !a(e[c], c)) {
                    d.push(e[c])
                }
            }
            return d
        },
        map: function(f, a) {
            var e = [];
            for (var d = 0,
            c = f.length; d < c; d++) {
                var b = a(f[d], d);
                if (b != null) {
                    e[e.length] = b
                }
            }
            return e.concat.apply([], e)
        }
    });
    var O = navigator.userAgent.toLowerCase();
    T.browser = {
        version: (O.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(O),
        opera: /opera/.test(O),
        msie: /msie/.test(O) && !/opera/.test(O),
        mozilla: /mozilla/.test(O) && !/(compatible|webkit)/.test(O)
    };
    T.each({
        parent: function(a) {
            return a.parentNode
        },
        parents: function(a) {
            return T.dir(a, "parentNode")
        },
        next: function(a) {
            return T.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return T.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return T.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return T.dir(a, "previousSibling")
        },
        siblings: function(a) {
            return T.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return T.sibling(a.firstChild)
        },
        contents: function(a) {
            return T.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: T.makeArray(a.childNodes)
        }
    },
    function(b, a) {
        T.fn[b] = function(d) {
            var c = T.map(this, a);
            if (d && typeof d == "string") {
                c = T.multiFilter(d, c)
            }
            return this.pushStack(T.unique(c), b, d)
        }
    });
    T.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(b, a) {
        T.fn[b] = function(h) {
            var e = [],
            c = T(h);
            for (var d = 0,
            g = c.length; d < g; d++) {
                var f = (d > 0 ? this.clone(true) : this).get();
                T.fn[a].apply(T(c[d]), f);
                e = e.concat(f)
            }
            return this.pushStack(e, b, h)
        }
    });
    T.each({
        removeAttr: function(a) {
            T.attr(this, a, "");
            if (this.nodeType == 1) {
                this.removeAttribute(a)
            }
        },
        addClass: function(a) {
            T.className.add(this, a)
        },
        removeClass: function(a) {
            T.className.remove(this, a)
        },
        toggleClass: function(a, b) {
            if (typeof b !== "boolean") {
                b = !T.className.has(this, a)
            }
            T.className[b ? "add": "remove"](this, a)
        },
        remove: function(a) {
            if (!a || T.filter(a, [this]).length) {
                T("*", this).add([this]).each(function() {
                    T.event.remove(this);
                    T.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        },
        empty: function() {
            T(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    },
    function(b, a) {
        T.fn[b] = function() {
            return this.each(a, arguments)
        }
    });
    function Y(b, a) {
        return b[0] && parseInt(T.curCSS(b[0], a, true), 10) || 0
    }
    var aa = "jQuery" + ad(),
    I = 0,
    R = {};
    T.extend({
        cache: {},
        data: function(c, d, b) {
            c = c == W ? R: c;
            var a = c[aa];
            if (!a) {
                a = c[aa] = ++I
            }
            if (d && !T.cache[a]) {
                T.cache[a] = {}
            }
            if (b !== ab) {
                T.cache[a][d] = b
            }
            return d ? T.cache[a][d] : a
        },
        removeData: function(c, d) {
            c = c == W ? R: c;
            var a = c[aa];
            if (d) {
                if (T.cache[a]) {
                    delete T.cache[a][d];
                    d = "";
                    for (d in T.cache[a]) {
                        break
                    }
                    if (!d) {
                        T.removeData(c)
                    }
                }
            } else {
                try {
                    delete c[aa]
                } catch(b) {
                    if (c.removeAttribute) {
                        c.removeAttribute(aa)
                    }
                }
                delete T.cache[a]
            }
        },
        queue: function(c, d, a) {
            if (c) {
                d = (d || "fx") + "queue";
                var b = T.data(c, d);
                if (!b || T.isArray(a)) {
                    b = T.data(c, d, T.makeArray(a))
                } else {
                    if (a) {
                        b.push(a)
                    }
                }
            }
            return b
        },
        dequeue: function(a, b) {
            var d = T.queue(a, b),
            c = d.shift();
            if (!b || b === "fx") {
                c = d[0]
            }
            if (c !== ab) {
                c.call(a)
            }
        }
    });
    T.fn.extend({
        data: function(d, b) {
            var a = d.split(".");
            a[1] = a[1] ? "." + a[1] : "";
            if (b === ab) {
                var c = this.triggerHandler("getData" + a[1] + "!", [a[0]]);
                if (c === ab && this.length) {
                    c = T.data(this[0], d)
                }
                return c === ab && a[1] ? this.data(a[0]) : c
            } else {
                return this.trigger("setData" + a[1] + "!", [a[0], b]).each(function() {
                    T.data(this, d, b)
                })
            }
        },
        removeData: function(a) {
            return this.each(function() {
                T.removeData(this, a)
            })
        },
        queue: function(b, a) {
            if (typeof b !== "string") {
                a = b;
                b = "fx"
            }
            if (a === ab) {
                return T.queue(this[0], b)
            }
            return this.each(function() {
                var c = T.queue(this, b, a);
                if (b == "fx" && c.length == 1) {
                    c[0].call(this)
                }
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                T.dequeue(this, a)
            })
        }
    }); (function() {
        var b = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        h = 0,
        l = Object.prototype.toString;
        var n = function(r, v, ai, D) {
            ai = ai || [];
            v = v || document;
            if (v.nodeType !== 1 && v.nodeType !== 9) {
                return []
            }
            if (!r || typeof r !== "string") {
                return ai
            }
            var q = [],
            t,
            A,
            x,
            w,
            C,
            u,
            s = true;
            b.lastIndex = 0;
            while ((t = b.exec(r)) !== null) {
                q.push(t[1]);
                if (t[2]) {
                    u = RegExp.rightContext;
                    break
                }
            }
            if (q.length > 1 && g.exec(r)) {
                if (q.length === 2 && k.relative[q[0]]) {
                    A = j(q[0] + q[1], v)
                } else {
                    A = k.relative[q[0]] ? [v] : n(q.shift(), v);
                    while (q.length) {
                        r = q.shift();
                        if (k.relative[r]) {
                            r += q.shift()
                        }
                        A = j(r, A)
                    }
                }
            } else {
                var B = D ? {
                    expr: q.pop(),
                    set: o(D)
                }: n.find(q.pop(), q.length === 1 && v.parentNode ? v.parentNode: v, c(v));
                A = n.filter(B.expr, B.set);
                if (q.length > 0) {
                    x = o(A)
                } else {
                    s = false
                }
                while (q.length) {
                    var y = q.pop(),
                    z = y;
                    if (!k.relative[y]) {
                        y = ""
                    } else {
                        z = q.pop()
                    }
                    if (z == null) {
                        z = v
                    }
                    k.relative[y](x, z, c(v))
                }
            }
            if (!x) {
                x = A
            }
            if (!x) {
                throw "Syntax error, unrecognized expression: " + (y || r)
            }
            if (l.call(x) === "[object Array]") {
                if (!s) {
                    ai.push.apply(ai, x)
                } else {
                    if (v.nodeType === 1) {
                        for (var p = 0; x[p] != null; p++) {
                            if (x[p] && (x[p] === true || x[p].nodeType === 1 && i(v, x[p]))) {
                                ai.push(A[p])
                            }
                        }
                    } else {
                        for (var p = 0; x[p] != null; p++) {
                            if (x[p] && x[p].nodeType === 1) {
                                ai.push(A[p])
                            }
                        }
                    }
                }
            } else {
                o(x, ai)
            }
            if (u) {
                n(u, v, ai, D);
                if (m) {
                    hasDuplicate = false;
                    ai.sort(m);
                    if (hasDuplicate) {
                        for (var p = 1; p < ai.length; p++) {
                            if (ai[p] === ai[p - 1]) {
                                ai.splice(p--, 1)
                            }
                        }
                    }
                }
            }
            return ai
        };
        n.matches = function(q, p) {
            return n(q, null, null, p)
        };
        n.find = function(p, w, x) {
            var q, s;
            if (!p) {
                return []
            }
            for (var t = 0,
            u = k.order.length; t < u; t++) {
                var r = k.order[t],
                s;
                if ((s = k.match[r].exec(p))) {
                    var v = RegExp.leftContext;
                    if (v.substr(v.length - 1) !== "\\") {
                        s[1] = (s[1] || "").replace(/\\/g, "");
                        q = k.find[r](s, w, x);
                        if (q != null) {
                            p = p.replace(k.match[r], "");
                            break
                        }
                    }
                }
            }
            if (!q) {
                q = w.getElementsByTagName("*")
            }
            return {
                set: q,
                expr: p
            }
        };
        n.filter = function(C, D, z, t) {
            var u = C,
            x = [],
            p = D,
            r,
            w,
            q = D && D[0] && c(D[0]);
            while (C && D.length) {
                for (var ai in k.filter) {
                    if ((r = k.match[ai].exec(C)) != null) {
                        var v = k.filter[ai],
                        y,
                        A;
                        w = false;
                        if (p == x) {
                            x = []
                        }
                        if (k.preFilter[ai]) {
                            r = k.preFilter[ai](r, p, z, x, t, q);
                            if (!r) {
                                w = y = true
                            } else {
                                if (r === true) {
                                    continue
                                }
                            }
                        }
                        if (r) {
                            for (var s = 0; (A = p[s]) != null; s++) {
                                if (A) {
                                    y = v(A, r, s, p);
                                    var B = t ^ !!y;
                                    if (z && y != null) {
                                        if (B) {
                                            w = true
                                        } else {
                                            p[s] = false
                                        }
                                    } else {
                                        if (B) {
                                            x.push(A);
                                            w = true
                                        }
                                    }
                                }
                            }
                        }
                        if (y !== ab) {
                            if (!z) {
                                p = x
                            }
                            C = C.replace(k.match[ai], "");
                            if (!w) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (C == u) {
                    if (w == null) {
                        throw "Syntax error, unrecognized expression: " + C
                    } else {
                        break
                    }
                }
                u = C
            }
            return p
        };
        var k = n.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(p) {
                    return p.getAttribute("href")
                }
            },
            relative: {
                "+": function(p, w, q) {
                    var s = typeof w === "string",
                    x = s && !/\W/.test(w),
                    r = s && !x;
                    if (x && !q) {
                        w = w.toUpperCase()
                    }
                    for (var t = 0,
                    u = p.length,
                    v; t < u; t++) {
                        if ((v = p[t])) {
                            while ((v = v.previousSibling) && v.nodeType !== 1) {}
                            p[t] = r || v && v.nodeName === w ? v || false: v === w
                        }
                    }
                    if (r) {
                        n.filter(w, p, true)
                    }
                },
                ">": function(u, r, t) {
                    var w = typeof r === "string";
                    if (w && !/\W/.test(r)) {
                        r = t ? r: r.toUpperCase();
                        for (var q = 0,
                        s = u.length; q < s; q++) {
                            var v = u[q];
                            if (v) {
                                var p = v.parentNode;
                                u[q] = p.nodeName === r ? p: false
                            }
                        }
                    } else {
                        for (var q = 0,
                        s = u.length; q < s; q++) {
                            var v = u[q];
                            if (v) {
                                u[q] = w ? v.parentNode: v.parentNode === r
                            }
                        }
                        if (w) {
                            n.filter(r, u, true)
                        }
                    }
                },
                "": function(p, r, t) {
                    var q = h++,
                    s = a;
                    if (!r.match(/\W/)) {
                        var u = r = t ? r: r.toUpperCase();
                        s = d
                    }
                    s("parentNode", r, q, p, u, t)
                },
                "~": function(p, r, t) {
                    var q = h++,
                    s = a;
                    if (typeof r === "string" && !r.match(/\W/)) {
                        var u = r = t ? r: r.toUpperCase();
                        s = d
                    }
                    s("previousSibling", r, q, p, u, t)
                }
            },
            find: {
                ID: function(r, q, p) {
                    if (typeof q.getElementById !== "undefined" && !p) {
                        var s = q.getElementById(r[1]);
                        return s ? [s] : []
                    }
                },
                NAME: function(q, u, t) {
                    if (typeof u.getElementsByName !== "undefined") {
                        var r = [],
                        v = u.getElementsByName(q[1]);
                        for (var p = 0,
                        s = v.length; p < s; p++) {
                            if (v[p].getAttribute("name") === q[1]) {
                                r.push(v[p])
                            }
                        }
                        return r.length === 0 ? null: r
                    }
                },
                TAG: function(q, p) {
                    return p.getElementsByTagName(q[1])
                }
            },
            preFilter: {
                CLASS: function(p, r, q, s, u, t) {
                    p = " " + p[1].replace(/\\/g, "") + " ";
                    if (t) {
                        return p
                    }
                    for (var w = 0,
                    v; (v = r[w]) != null; w++) {
                        if (v) {
                            if (u ^ (v.className && (" " + v.className + " ").indexOf(p) >= 0)) {
                                if (!q) {
                                    s.push(v)
                                }
                            } else {
                                if (q) {
                                    r[w] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(p) {
                    return p[1].replace(/\\/g, "")
                },
                TAG: function(q, r) {
                    for (var p = 0; r[p] === false; p++) {}
                    return r[p] && c(r[p]) ? q[1] : q[1].toUpperCase()
                },
                CHILD: function(q) {
                    if (q[1] == "nth") {
                        var p = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(q[2] == "even" && "2n" || q[2] == "odd" && "2n+1" || !/\D/.test(q[2]) && "0n+" + q[2] || q[2]);
                        q[2] = (p[1] + (p[2] || 1)) - 0;
                        q[3] = p[3] - 0
                    }
                    q[0] = h++;
                    return q
                },
                ATTR: function(v, r, q, s, u, t) {
                    var p = v[1].replace(/\\/g, "");
                    if (!t && k.attrMap[p]) {
                        v[1] = k.attrMap[p]
                    }
                    if (v[2] === "~=") {
                        v[4] = " " + v[4] + " "
                    }
                    return v
                },
                PSEUDO: function(u, r, q, s, t) {
                    if (u[1] === "not") {
                        if (u[3].match(b).length > 1 || /^\w/.test(u[3])) {
                            u[3] = n(u[3], null, null, r)
                        } else {
                            var p = n.filter(u[3], r, q, true ^ t);
                            if (!q) {
                                s.push.apply(s, p)
                            }
                            return false
                        }
                    } else {
                        if (k.match.POS.test(u[0]) || k.match.CHILD.test(u[0])) {
                            return true
                        }
                    }
                    return u
                },
                POS: function(p) {
                    p.unshift(true);
                    return p
                }
            },
            filters: {
                enabled: function(p) {
                    return p.disabled === false && p.type !== "hidden"
                },
                disabled: function(p) {
                    return p.disabled === true
                },
                checked: function(p) {
                    return p.checked === true
                },
                selected: function(p) {
                    p.parentNode.selectedIndex;
                    return p.selected === true
                },
                parent: function(p) {
                    return !! p.firstChild
                },
                empty: function(p) {
                    return ! p.firstChild
                },
                has: function(p, q, r) {
                    return !! n(r[3], p).length
                },
                header: function(p) {
                    return /h\d/i.test(p.nodeName)
                },
                text: function(p) {
                    return "text" === p.type
                },
                radio: function(p) {
                    return "radio" === p.type
                },
                checkbox: function(p) {
                    return "checkbox" === p.type
                },
                file: function(p) {
                    return "file" === p.type
                },
                password: function(p) {
                    return "password" === p.type
                },
                submit: function(p) {
                    return "submit" === p.type
                },
                image: function(p) {
                    return "image" === p.type
                },
                reset: function(p) {
                    return "reset" === p.type
                },
                button: function(p) {
                    return "button" === p.type || p.nodeName.toUpperCase() === "BUTTON"
                },
                input: function(p) {
                    return /input|select|textarea|button/i.test(p.nodeName)
                }
            },
            setFilters: {
                first: function(p, q) {
                    return q === 0
                },
                last: function(q, r, s, p) {
                    return r === p.length - 1
                },
                even: function(p, q) {
                    return q % 2 === 0
                },
                odd: function(p, q) {
                    return q % 2 === 1
                },
                lt: function(p, q, r) {
                    return q < r[3] - 0
                },
                gt: function(p, q, r) {
                    return q > r[3] - 0
                },
                nth: function(p, q, r) {
                    return r[3] - 0 == q
                },
                eq: function(p, q, r) {
                    return r[3] - 0 == q
                }
            },
            filter: {
                PSEUDO: function(u, q, p, t) {
                    var r = q[1],
                    w = k.filters[r];
                    if (w) {
                        return w(u, p, q, t)
                    } else {
                        if (r === "contains") {
                            return (u.textContent || u.innerText || "").indexOf(q[3]) >= 0
                        } else {
                            if (r === "not") {
                                var v = q[3];
                                for (var p = 0,
                                s = v.length; p < s; p++) {
                                    if (v[p] === u) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                },
                CHILD: function(w, t) {
                    var q = t[1],
                    v = w;
                    switch (q) {
                    case "only":
                    case "first":
                        while (v = v.previousSibling) {
                            if (v.nodeType === 1) {
                                return false
                            }
                        }
                        if (q == "first") {
                            return true
                        }
                        v = w;
                    case "last":
                        while (v = v.nextSibling) {
                            if (v.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case "nth":
                        var u = t[2],
                        x = t[3];
                        if (u == 1 && x == 0) {
                            return true
                        }
                        var r = t[0],
                        y = w.parentNode;
                        if (y && (y.sizcache !== r || !w.nodeIndex)) {
                            var s = 0;
                            for (v = y.firstChild; v; v = v.nextSibling) {
                                if (v.nodeType === 1) {
                                    v.nodeIndex = ++s
                                }
                            }
                            y.sizcache = r
                        }
                        var p = w.nodeIndex - x;
                        if (u == 0) {
                            return p == 0
                        } else {
                            return (p % u == 0 && p / u >= 0)
                        }
                    }
                },
                ID: function(p, q) {
                    return p.nodeType === 1 && p.getAttribute("id") === q
                },
                TAG: function(p, q) {
                    return (q === "*" && p.nodeType === 1) || p.nodeName === q
                },
                CLASS: function(p, q) {
                    return (" " + (p.className || p.getAttribute("class")) + " ").indexOf(q) > -1
                },
                ATTR: function(u, p) {
                    var q = p[1],
                    s = k.attrHandle[q] ? k.attrHandle[q](u) : u[q] != null ? u[q] : u.getAttribute(q),
                    t = s + "",
                    v = p[2],
                    r = p[4];
                    return s == null ? v === "!=": v === "=" ? t === r: v === "*=" ? t.indexOf(r) >= 0 : v === "~=" ? (" " + t + " ").indexOf(r) >= 0 : !r ? t && s !== false: v === "!=" ? t != r: v === "^=" ? t.indexOf(r) === 0 : v === "$=" ? t.substr(t.length - r.length) === r: v === "|=" ? t === r || t.substr(0, r.length + 1) === r + "-": false
                },
                POS: function(u, r, q, t) {
                    var s = r[2],
                    p = k.setFilters[s];
                    if (p) {
                        return p(u, q, r, t)
                    }
                }
            }
        };
        var g = k.match.POS;
        for (var e in k.match) {
            k.match[e] = RegExp(k.match[e].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var o = function(p, q) {
            p = Array.prototype.slice.call(p);
            if (q) {
                q.push.apply(q, p);
                return q
            }
            return p
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch(f) {
            o = function(t, p) {
                var r = p || [];
                if (l.call(t) === "[object Array]") {
                    Array.prototype.push.apply(r, t)
                } else {
                    if (typeof t.length === "number") {
                        for (var q = 0,
                        s = t.length; q < s; q++) {
                            r.push(t[q])
                        }
                    } else {
                        for (var q = 0; t[q]; q++) {
                            r.push(t[q])
                        }
                    }
                }
                return r
            }
        }
        var m;
        if (document.documentElement.compareDocumentPosition) {
            m = function(q, r) {
                var p = q.compareDocumentPosition(r) & 4 ? -1 : q === r ? 0 : 1;
                if (p === 0) {
                    hasDuplicate = true
                }
                return p
            }
        } else {
            if ("sourceIndex" in document.documentElement) {
                m = function(q, r) {
                    var p = q.sourceIndex - r.sourceIndex;
                    if (p === 0) {
                        hasDuplicate = true
                    }
                    return p
                }
            } else {
                if (document.createRange) {
                    m = function(p, r) {
                        var q = p.ownerDocument.createRange(),
                        s = r.ownerDocument.createRange();
                        q.selectNode(p);
                        q.collapse(true);
                        s.selectNode(r);
                        s.collapse(true);
                        var t = q.compareBoundaryPoints(Range.START_TO_END, s);
                        if (t === 0) {
                            hasDuplicate = true
                        }
                        return t
                    }
                }
            }
        } (function() {
            var q = document.createElement("form"),
            p = "script" + (new Date).getTime();
            q.innerHTML = "<input name='" + p + "'/>";
            var r = document.documentElement;
            r.insertBefore(q, r.firstChild);
            if ( !! document.getElementById(p)) {
                k.find.ID = function(v, u, t) {
                    if (typeof u.getElementById !== "undefined" && !t) {
                        var s = u.getElementById(v[1]);
                        return s ? s.id === v[1] || typeof s.getAttributeNode !== "undefined" && s.getAttributeNode("id").nodeValue === v[1] ? [s] : ab: []
                    }
                };
                k.filter.ID = function(t, s) {
                    var u = typeof t.getAttributeNode !== "undefined" && t.getAttributeNode("id");
                    return t.nodeType === 1 && u && u.nodeValue === s
                }
            }
            r.removeChild(q)
        })(); (function() {
            var p = document.createElement("div");
            p.appendChild(document.createComment(""));
            if (p.getElementsByTagName("*").length > 0) {
                k.find.TAG = function(s, t) {
                    var u = t.getElementsByTagName(s[1]);
                    if (s[1] === "*") {
                        var q = [];
                        for (var r = 0; u[r]; r++) {
                            if (u[r].nodeType === 1) {
                                q.push(u[r])
                            }
                        }
                        u = q
                    }
                    return u
                }
            }
            p.innerHTML = "<a href='#'></a>";
            if (p.firstChild && typeof p.firstChild.getAttribute !== "undefined" && p.firstChild.getAttribute("href") !== "#") {
                k.attrHandle.href = function(q) {
                    return q.getAttribute("href", 2)
                }
            }
        })();
        if (document.querySelectorAll) { (function() {
                var q = n,
                p = document.createElement("div");
                p.innerHTML = "<p class='TEST'></p>";
                if (p.querySelectorAll && p.querySelectorAll(".TEST").length === 0) {
                    return
                }
                n = function(u, v, s, r) {
                    v = v || document;
                    if (!r && v.nodeType === 9 && !c(v)) {
                        try {
                            return o(v.querySelectorAll(u), s)
                        } catch(t) {}
                    }
                    return q(u, v, s, r)
                };
                n.find = q.find;
                n.filter = q.filter;
                n.selectors = q.selectors;
                n.matches = q.matches
            })()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) { (function() {
                var p = document.createElement("div");
                p.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (p.getElementsByClassName("e").length === 0) {
                    return
                }
                p.lastChild.className = "e";
                if (p.getElementsByClassName("e").length === 1) {
                    return
                }
                k.order.splice(1, 0, "CLASS");
                k.find.CLASS = function(s, r, q) {
                    if (typeof r.getElementsByClassName !== "undefined" && !q) {
                        return r.getElementsByClassName(s[1])
                    }
                }
            })()
        }
        function d(v, q, r, x, p, y) {
            var z = v == "previousSibling" && !y;
            for (var t = 0,
            u = x.length; t < u; t++) {
                var w = x[t];
                if (w) {
                    if (z && w.nodeType === 1) {
                        w.sizcache = r;
                        w.sizset = t
                    }
                    w = w[v];
                    var s = false;
                    while (w) {
                        if (w.sizcache === r) {
                            s = x[w.sizset];
                            break
                        }
                        if (w.nodeType === 1 && !y) {
                            w.sizcache = r;
                            w.sizset = t
                        }
                        if (w.nodeName === q) {
                            s = w;
                            break
                        }
                        w = w[v]
                    }
                    x[t] = s
                }
            }
        }
        function a(v, q, r, x, p, y) {
            var z = v == "previousSibling" && !y;
            for (var t = 0,
            u = x.length; t < u; t++) {
                var w = x[t];
                if (w) {
                    if (z && w.nodeType === 1) {
                        w.sizcache = r;
                        w.sizset = t
                    }
                    w = w[v];
                    var s = false;
                    while (w) {
                        if (w.sizcache === r) {
                            s = x[w.sizset];
                            break
                        }
                        if (w.nodeType === 1) {
                            if (!y) {
                                w.sizcache = r;
                                w.sizset = t
                            }
                            if (typeof q !== "string") {
                                if (w === q) {
                                    s = true;
                                    break
                                }
                            } else {
                                if (n.filter(q, [w]).length > 0) {
                                    s = w;
                                    break
                                }
                            }
                        }
                        w = w[v]
                    }
                    x[t] = s
                }
            }
        }
        var i = document.compareDocumentPosition ?
        function(p, q) {
            return p.compareDocumentPosition(q) & 16
        }: function(p, q) {
            return p !== q && (p.contains ? p.contains(q) : true)
        };
        var c = function(p) {
            return p.nodeType === 9 && p.documentElement.nodeName !== "HTML" || !!p.ownerDocument && c(p.ownerDocument)
        };
        var j = function(s, u) {
            var p = [],
            w = "",
            v,
            q = u.nodeType ? [u] : u;
            while ((v = k.match.PSEUDO.exec(s))) {
                w += v[0];
                s = s.replace(k.match.PSEUDO, "")
            }
            s = k.relative[s] ? s + "*": s;
            for (var t = 0,
            r = q.length; t < r; t++) {
                n(s, q[t], p)
            }
            return n.filter(w, p)
        };
        T.find = n;
        T.filter = n.filter;
        T.expr = n.selectors;
        T.expr[":"] = T.expr.filters;
        n.selectors.filters.hidden = function(p) {
            return p.offsetWidth === 0 || p.offsetHeight === 0
        };
        n.selectors.filters.visible = function(p) {
            return p.offsetWidth > 0 || p.offsetHeight > 0
        };
        n.selectors.filters.animated = function(p) {
            return T.grep(T.timers,
            function(q) {
                return p === q.elem
            }).length
        };
        T.multiFilter = function(p, r, q) {
            if (q) {
                p = ":not(" + p + ")"
            }
            return n.matches(p, r)
        };
        T.dir = function(q, r) {
            var s = [],
            p = q[r];
            while (p && p != document) {
                if (p.nodeType == 1) {
                    s.push(p)
                }
                p = p[r]
            }
            return s
        };
        T.nth = function(t, s, q, p) {
            s = s || 1;
            var r = 0;
            for (; t; t = t[q]) {
                if (t.nodeType == 1 && ++r == s) {
                    break
                }
            }
            return t
        };
        T.sibling = function(p, q) {
            var r = [];
            for (; p; p = p.nextSibling) {
                if (p.nodeType == 1 && p != q) {
                    r.push(p)
                }
            }
            return r
        };
        return;
        W.Sizzle = n
    })();
    T.event = {
        add: function(c, f, d, a) {
            if (c.nodeType == 3 || c.nodeType == 8) {
                return
            }
            if (c.setInterval && c != W) {
                c = W
            }
            if (!d.guid) {
                d.guid = this.guid++
            }
            if (a !== ab) {
                var e = d;
                d = this.proxy(e);
                d.data = a
            }
            var g = T.data(c, "events") || T.data(c, "events", {}),
            b = T.data(c, "handle") || T.data(c, "handle",
            function() {
                return typeof T !== "undefined" && !T.event.triggered ? T.event.handle.apply(arguments.callee.elem, arguments) : ab
            });
            b.elem = c;
            T.each(f.split(/\s+/),
            function(k, j) {
                var i = j.split(".");
                j = i.shift();
                d.type = i.slice().sort().join(".");
                var h = g[j];
                if (T.event.specialAll[j]) {
                    T.event.specialAll[j].setup.call(c, a, i)
                }
                if (!h) {
                    h = g[j] = {};
                    if (!T.event.special[j] || T.event.special[j].setup.call(c, a, i) === false) {
                        if (c.addEventListener) {
                            c.addEventListener(j, b, false)
                        } else {
                            if (c.attachEvent) {
                                c.attachEvent("on" + j, b)
                            }
                        }
                    }
                }
                h[d.guid] = d;
                T.event.global[j] = true
            });
            c = null
        },
        guid: 1,
        global: {},
        remove: function(b, e, c) {
            if (b.nodeType == 3 || b.nodeType == 8) {
                return
            }
            var f = T.data(b, "events"),
            g,
            h;
            if (f) {
                if (e === ab || (typeof e === "string" && e.charAt(0) == ".")) {
                    for (var d in f) {
                        this.remove(b, d + (e || ""))
                    }
                } else {
                    if (e.type) {
                        c = e.handler;
                        e = e.type
                    }
                    T.each(e.split(/\s+/),
                    function(m, k) {
                        var i = k.split(".");
                        k = i.shift();
                        var l = RegExp("(^|\\.)" + i.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (f[k]) {
                            if (c) {
                                delete f[k][c.guid]
                            } else {
                                for (var j in f[k]) {
                                    if (l.test(f[k][j].type)) {
                                        delete f[k][j]
                                    }
                                }
                            }
                            if (T.event.specialAll[k]) {
                                T.event.specialAll[k].teardown.call(b, i)
                            }
                            for (g in f[k]) {
                                break
                            }
                            if (!g) {
                                if (!T.event.special[k] || T.event.special[k].teardown.call(b, i) === false) {
                                    if (b.removeEventListener) {
                                        b.removeEventListener(k, T.data(b, "handle"), false)
                                    } else {
                                        if (b.detachEvent) {
                                            b.detachEvent("on" + k, T.data(b, "handle"))
                                        }
                                    }
                                }
                                g = null;
                                delete f[k]
                            }
                        }
                    })
                }
                for (g in f) {
                    break
                }
                if (!g) {
                    var a = T.data(b, "handle");
                    if (a) {
                        a.elem = null
                    }
                    T.removeData(b, "events");
                    T.removeData(b, "handle")
                }
            }
        },
        trigger: function(d, b, e, h) {
            var f = d.type || d;
            if (!h) {
                d = typeof d === "object" ? d[aa] ? d: T.extend(T.Event(f), d) : T.Event(f);
                if (f.indexOf("!") >= 0) {
                    d.type = f = f.slice(0, -1);
                    d.exclusive = true
                }
                if (!e) {
                    d.stopPropagation();
                    if (this.global[f]) {
                        T.each(T.cache,
                        function() {
                            if (this.events && this.events[f]) {
                                T.event.trigger(d, b, this.handle.elem)
                            }
                        })
                    }
                }
                if (!e || e.nodeType == 3 || e.nodeType == 8) {
                    return ab
                }
                d.result = ab;
                d.target = e;
                b = T.makeArray(b);
                b.unshift(d)
            }
            d.currentTarget = e;
            var c = T.data(e, "handle");
            if (c) {
                c.apply(e, b)
            }
            if ((!e[f] || (T.nodeName(e, "a") && f == "click")) && e["on" + f] && e["on" + f].apply(e, b) === false) {
                d.result = false
            }
            if (!h && e[f] && !d.isDefaultPrevented() && !(T.nodeName(e, "a") && f == "click")) {
                this.triggered = true;
                try {
                    e[f]()
                } catch(a) {}
            }
            this.triggered = false;
            if (!d.isPropagationStopped()) {
                var g = e.parentNode || e.ownerDocument;
                if (g) {
                    T.event.trigger(d, b, g, true)
                }
            }
        },
        handle: function(b) {
            var c, h;
            b = arguments[0] = T.event.fix(b || W.event);
            b.currentTarget = this;
            var a = b.type.split(".");
            b.type = a.shift();
            c = !a.length && !b.exclusive;
            var d = RegExp("(^|\\.)" + a.slice().sort().join(".*\\.") + "(\\.|$)");
            h = (T.data(this, "events") || {})[b.type];
            for (var f in h) {
                var e = h[f];
                if (c || d.test(e.type)) {
                    b.handler = e;
                    b.data = e.data;
                    var g = e.apply(this, arguments);
                    if (g !== ab) {
                        b.result = g;
                        if (g === false) {
                            b.preventDefault();
                            b.stopPropagation()
                        }
                    }
                    if (b.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(c) {
            if (c[aa]) {
                return c
            }
            var e = c;
            c = T.Event(e);
            for (var d = this.props.length,
            a; d;) {
                a = this.props[--d];
                c[a] = e[a]
            }
            if (!c.target) {
                c.target = c.srcElement || document
            }
            if (c.target.nodeType == 3) {
                c.target = c.target.parentNode
            }
            if (!c.relatedTarget && c.fromElement) {
                c.relatedTarget = c.fromElement == c.target ? c.toElement: c.fromElement
            }
            if (c.pageX == null && c.clientX != null) {
                var b = document.documentElement,
                f = document.body;
                c.pageX = c.clientX + (b && b.scrollLeft || f && f.scrollLeft || 0) - (b.clientLeft || 0);
                c.pageY = c.clientY + (b && b.scrollTop || f && f.scrollTop || 0) - (b.clientTop || 0)
            }
            if (!c.which && ((c.charCode || c.charCode === 0) ? c.charCode: c.keyCode)) {
                c.which = c.charCode || c.keyCode
            }
            if (!c.metaKey && c.ctrlKey) {
                c.metaKey = c.ctrlKey
            }
            if (!c.which && c.button) {
                c.which = (c.button & 1 ? 1 : (c.button & 2 ? 3 : (c.button & 4 ? 2 : 0)))
            }
            return c
        },
        proxy: function(a, b) {
            b = b ||
            function() {
                return a.apply(this, arguments)
            };
            b.guid = a.guid = a.guid || b.guid || this.guid++;
            return b
        },
        special: {
            ready: {
                setup: P,
                teardown: function() {}
            }
        },
        specialAll: {
            live: {
                setup: function(b, a) {
                    T.event.add(this, a[0], af)
                },
                teardown: function(a) {
                    if (a.length) {
                        var c = 0,
                        b = RegExp("(^|\\.)" + a[0] + "(\\.|$)");
                        T.each((T.data(this, "events").live || {}),
                        function() {
                            if (b.test(this.type)) {
                                c++
                            }
                        });
                        if (c < 1) {
                            T.event.remove(this, a[0], af)
                        }
                    }
                }
            }
        }
    };
    T.Event = function(a) {
        if (!this.preventDefault) {
            return new T.Event(a)
        }
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else {
            this.type = a
        }
        this.timeStamp = ad();
        this[aa] = true
    };
    function X() {
        return false
    }
    function J() {
        return true
    }
    T.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.preventDefault) {
                a.preventDefault()
            }
            a.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.stopPropagation) {
                a.stopPropagation()
            }
            a.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = J;
            this.stopPropagation()
        },
        isDefaultPrevented: X,
        isPropagationStopped: X,
        isImmediatePropagationStopped: X
    };
    var ah = function(b) {
        var c = b.relatedTarget;
        while (c && c != this) {
            try {
                c = c.parentNode
            } catch(a) {
                c = this
            }
        }
        if (c != this) {
            b.type = b.data;
            T.event.handle.apply(this, arguments)
        }
    };
    T.each({
        mouseover: "mouseenter",
        mouseout: "mouseleave"
    },
    function(a, b) {
        T.event.special[b] = {
            setup: function() {
                T.event.add(this, a, ah, b)
            },
            teardown: function() {
                T.event.remove(this, a, ah)
            }
        }
    });
    T.fn.extend({
        bind: function(b, a, c) {
            return b == "unload" ? this.one(b, a, c) : this.each(function() {
                T.event.add(this, b, c || a, c && a)
            })
        },
        one: function(b, a, c) {
            var d = T.event.proxy(c || a,
            function(e) {
                T(this).unbind(e, d);
                return (c || a).apply(this, arguments)
            });
            return this.each(function() {
                T.event.add(this, b, d, c && a)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                T.event.remove(this, a, b)
            })
        },
        trigger: function(b, a) {
            return this.each(function() {
                T.event.trigger(b, a, this)
            })
        },
        triggerHandler: function(c, a) {
            if (this[0]) {
                var b = T.Event(c);
                b.preventDefault();
                b.stopPropagation();
                T.event.trigger(b, a, this[0]);
                return b.result
            }
        },
        toggle: function(a) {
            var c = arguments,
            b = 1;
            while (b < c.length) {
                T.event.proxy(a, c[b++])
            }
            return this.click(T.event.proxy(a,
            function(d) {
                this.lastToggle = (this.lastToggle || 0) % b;
                d.preventDefault();
                return c[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function(b, a) {
            return this.mouseenter(b).mouseleave(a)
        },
        ready: function(a) {
            P();
            if (T.isReady) {
                a.call(document, T)
            } else {
                T.readyList.push(a)
            }
            return this
        },
        live: function(a, b) {
            var c = T.event.proxy(b);
            c.guid += this.selector + a;
            T(document).bind(Z(a, this.selector), this.selector, c);
            return this
        },
        die: function(a, b) {
            T(document).unbind(Z(a, this.selector), b ? {
                guid: b.guid + this.selector + a
            }: null);
            return this
        }
    });
    function af(a) {
        var d = RegExp("(^|\\.)" + a.type + "(\\.|$)"),
        b = true,
        c = [];
        T.each(T.data(this, "events").live || [],
        function(g, f) {
            if (d.test(f.type)) {
                var e = T(a.target).closest(f.data)[0];
                if (e) {
                    c.push({
                        elem: e,
                        fn: f
                    })
                }
            }
        });
        c.sort(function(e, f) {
            return T.data(e.elem, "closest") - T.data(f.elem, "closest")
        });
        T.each(c,
        function() {
            if (this.fn.call(this.elem, a, this.fn.data) === false) {
                return (b = false)
            }
        });
        return b
    }
    function Z(a, b) {
        return ["live", a, b.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }
    T.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!T.isReady) {
                T.isReady = true;
                if (T.readyList) {
                    T.each(T.readyList,
                    function() {
                        this.call(document, T)
                    });
                    T.readyList = null
                }
                T(document).triggerHandler("ready")
            }
        }
    });
    var G = false;
    function P() {
        if (G) {
            return
        }
        G = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded",
            function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                T.ready()
            },
            false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange",
                function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        T.ready()
                    }
                });
                if (document.documentElement.doScroll && W == W.top) { (function() {
                        if (T.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch(a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        T.ready()
                    })()
                }
            }
        }
        T.event.add(W, "load", T.ready)
    }
    T.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),
    function(a, b) {
        T.fn[b] = function(c) {
            return c ? this.bind(b, c) : this.trigger(b)
        }
    });
    T(W).bind("unload",
    function() {
        for (var a in T.cache) {
            if (a != 1 && T.cache[a].handle) {
                T.event.remove(T.cache[a].handle.elem)
            }
        }
    }); (function() {
        T.support = {};
        var f = document.documentElement,
        e = document.createElement("script"),
        a = document.createElement("div"),
        b = "script" + (new Date).getTime();
        a.style.display = "none";
        a.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var d = a.getElementsByTagName("*"),
        g = a.getElementsByTagName("a")[0];
        if (!d || !d.length || !g) {
            return
        }
        T.support = {
            leadingWhitespace: a.firstChild.nodeType == 3,
            tbody: !a.getElementsByTagName("tbody").length,
            objectAll: !!a.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!a.getElementsByTagName("link").length,
            style: /red/.test(g.getAttribute("style")),
            hrefNormalized: g.getAttribute("href") === "/a",
            opacity: g.style.opacity === "0.5",
            cssFloat: !!g.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        e.type = "text/javascript";
        try {
            e.appendChild(document.createTextNode("window." + b + "=1;"))
        } catch(c) {}
        f.insertBefore(e, f.firstChild);
        if (W[b]) {
            T.support.scriptEval = true;
            delete W[b]
        }
        f.removeChild(e);
        if (a.attachEvent && a.fireEvent) {
            a.attachEvent("onclick",
            function() {
                T.support.noCloneEvent = false;
                a.detachEvent("onclick", arguments.callee)
            });
            a.cloneNode(true).fireEvent("onclick")
        }
        T(function() {
            var h = document.createElement("div");
            h.style.width = h.style.paddingLeft = "1px";
            document.body.appendChild(h);
            T.boxModel = T.support.boxModel = h.offsetWidth === 2;
            document.body.removeChild(h).style.display = "none"
        })
    })();
    var H = T.support.cssFloat ? "cssFloat": "styleFloat";
    T.props = {
        "for": "htmlFor",
        "class": "className",
        "float": H,
        cssFloat: H,
        styleFloat: H,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    T.fn.extend({
        _load: T.fn.load,
        load: function(e, b, a) {
            if (typeof e !== "string") {
                return this._load(e)
            }
            var c = e.indexOf(" ");
            if (c >= 0) {
                var g = e.slice(c, e.length);
                e = e.slice(0, c)
            }
            var d = "GET";
            if (b) {
                if (T.isFunction(b)) {
                    a = b;
                    b = null
                } else {
                    if (typeof b === "object") {
                        b = T.param(b);
                        d = "POST"
                    }
                }
            }
            var f = this;
            T.ajax({
                url: e,
                type: d,
                dataType: "html",
                data: b,
                complete: function(i, h) {
                    if (h == "success" || h == "notmodified") {
                        f.html(g ? T("<div/>").append(i.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(g) : i.responseText)
                    }
                    if (a) {
                        f.each(a, [i.responseText, h, i])
                    }
                }
            });
            return this
        },
        serialize: function() {
            return T.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? T.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function(c, b) {
                var a = T(this).val();
                return a == null ? null: T.isArray(a) ? T.map(a,
                function(d, e) {
                    return {
                        name: b.name,
                        value: d
                    }
                }) : {
                    name: b.name,
                    value: a
                }
            }).get()
        }
    });
    T.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),
    function(b, a) {
        T.fn[a] = function(c) {
            return this.bind(a, c)
        }
    });
    var N = ad();
    T.extend({
        get: function(d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = null
            }
            return T.ajax({
                type: "GET",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        getScript: function(b, a) {
            return T.get(b, null, a, "script")
        },
        getJSON: function(c, b, a) {
            return T.get(c, b, a, "json")
        },
        post: function(d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = {}
            }
            return T.ajax({
                type: "POST",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        ajaxSetup: function(a) {
            T.extend(T.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return W.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(k) {
            k = T.extend(true, k, T.extend(true, {},
            T.ajaxSettings, k));
            var a, r = /=\?(&|$)/g,
            f, b, q = k.type.toUpperCase();
            if (k.data && k.processData && typeof k.data !== "string") {
                k.data = T.param(k.data)
            }
            if (k.dataType == "jsonp") {
                if (q == "GET") {
                    if (!k.url.match(r)) {
                        k.url += (k.url.match(/\?/) ? "&": "?") + (k.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!k.data || !k.data.match(r)) {
                        k.data = (k.data ? k.data + "&": "") + (k.jsonp || "callback") + "=?"
                    }
                }
                k.dataType = "json"
            }
            if (k.dataType == "json" && (k.data && k.data.match(r) || k.url.match(r))) {
                a = "jsonp" + N++;
                if (k.data) {
                    k.data = (k.data + "").replace(r, "=" + a + "$1")
                }
                k.url = k.url.replace(r, "=" + a + "$1");
                k.dataType = "script";
                W[a] = function(u) {
                    b = u;
                    o();
                    l();
                    W[a] = ab;
                    try {
                        delete W[a]
                    } catch(t) {}
                    if (p) {
                        p.removeChild(d)
                    }
                }
            }
            if (k.dataType == "script" && k.cache == null) {
                k.cache = false
            }
            if (k.cache === false && q == "GET") {
                var s = ad();
                var c = k.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + s + "$2");
                k.url = c + ((c == k.url) ? (k.url.match(/\?/) ? "&": "?") + "_=" + s: "")
            }
            if (k.data && q == "GET") {
                k.url += (k.url.match(/\?/) ? "&": "?") + k.data;
                k.data = null
            }
            if (k.global && !T.active++) {
                T.event.trigger("ajaxStart")
            }
            var g = /^(\w+:)?\/\/([^\/?#]+)/.exec(k.url);
            if (k.dataType == "script" && q == "GET" && g && (g[1] && g[1] != location.protocol || g[2] != location.host)) {
                var p = document.getElementsByTagName("head")[0];
                var d = document.createElement("script");
                d.src = k.url;
                if (k.scriptCharset) {
                    d.charset = k.scriptCharset
                }
                if (!a) {
                    var i = false;
                    d.onload = d.onreadystatechange = function() {
                        if (!i && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            i = true;
                            o();
                            l();
                            d.onload = d.onreadystatechange = null;
                            p.removeChild(d)
                        }
                    }
                }
                p.appendChild(d);
                return ab
            }
            var m = false;
            var n = k.xhr();
            if (k.username) {
                n.open(q, k.url, k.async, k.username, k.password)
            } else {
                n.open(q, k.url, k.async)
            }
            try {
                if (k.data) {
                    n.setRequestHeader("Content-Type", k.contentType)
                }
                if (k.ifModified) {
                    n.setRequestHeader("If-Modified-Since", T.lastModified[k.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                }
                n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                n.setRequestHeader("Accept", k.dataType && k.accepts[k.dataType] ? k.accepts[k.dataType] + ", */*": k.accepts._default)
            } catch(e) {}
            if (k.beforeSend && k.beforeSend(n, k) === false) {
                if (k.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
                n.abort();
                return false
            }
            if (k.global) {
                T.event.trigger("ajaxSend", [n, k])
            }
            var j = function(v) {
                if (n.readyState == 0) {
                    if (h) {
                        clearInterval(h);
                        h = null;
                        if (k.global && !--T.active) {
                            T.event.trigger("ajaxStop")
                        }
                    }
                } else {
                    if (!m && n && (n.readyState == 4 || v == "timeout")) {
                        m = true;
                        if (h) {
                            clearInterval(h);
                            h = null
                        }
                        f = v == "timeout" ? "timeout": !T.httpSuccess(n) ? "error": k.ifModified && T.httpNotModified(n, k.url) ? "notmodified": "success";
                        if (f == "success") {
                            try {
                                b = T.httpData(n, k.dataType, k)
                            } catch(t) {
                                f = "parsererror"
                            }
                        }
                        if (f == "success") {
                            var u;
                            try {
                                u = n.getResponseHeader("Last-Modified")
                            } catch(t) {}
                            if (k.ifModified && u) {
                                T.lastModified[k.url] = u
                            }
                            if (!a) {
                                o()
                            }
                        } else {
                            T.handleError(k, n, f)
                        }
                        l();
                        if (v) {
                            n.abort()
                        }
                        if (k.async) {
                            n = null
                        }
                    }
                }
            };
            if (k.async) {
                var h = setInterval(j, 13);
                if (k.timeout > 0) {
                    setTimeout(function() {
                        if (n && !m) {
                            j("timeout")
                        }
                    },
                    k.timeout)
                }
            }
            try {
                n.send(k.data)
            } catch(e) {
                T.handleError(k, n, null, e)
            }
            if (!k.async) {
                j()
            }
            function o() {
                if (k.success) {
                    k.success(b, f)
                }
                if (k.global) {
                    T.event.trigger("ajaxSuccess", [n, k])
                }
            }
            function l() {
                if (k.complete) {
                    k.complete(n, f)
                }
                if (k.global) {
                    T.event.trigger("ajaxComplete", [n, k])
                }
                if (k.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
            }
            return n
        },
        handleError: function(c, a, d, b) {
            if (c.error) {
                c.error(a, d, b)
            }
            if (c.global) {
                T.event.trigger("ajaxError", [a, c, b])
            }
        },
        active: 0,
        httpSuccess: function(a) {
            try {
                return ! a.status && location.protocol == "file:" || (a.status >= 200 && a.status < 300) || a.status == 304 || a.status == 1223
            } catch(b) {}
            return false
        },
        httpNotModified: function(b, d) {
            try {
                var a = b.getResponseHeader("Last-Modified");
                return b.status == 304 || a == T.lastModified[d]
            } catch(c) {}
            return false
        },
        httpData: function(a, c, d) {
            var e = a.getResponseHeader("content-type"),
            f = c == "xml" || !c && e && e.indexOf("xml") >= 0,
            b = f ? a.responseXML: a.responseText;
            if (f && b.documentElement.tagName == "parsererror") {
                throw "parsererror"
            }
            if (d && d.dataFilter) {
                b = d.dataFilter(b, c)
            }
            if (typeof b === "string") {
                if (c == "script") {
                    T.globalEval(b)
                }
                if (c == "json") {
                    b = W["eval"]("(" + b + ")")
                }
            }
            return b
        },
        param: function(d) {
            var b = [];
            function a(f, e) {
                b[b.length] = encodeURIComponent(f) + "=" + encodeURIComponent(e)
            }
            if (T.isArray(d) || d.jquery) {
                T.each(d,
                function() {
                    a(this.name, this.value)
                })
            } else {
                for (var c in d) {
                    if (T.isArray(d[c])) {
                        T.each(d[c],
                        function() {
                            a(c, this)
                        })
                    } else {
                        a(c, T.isFunction(d[c]) ? d[c]() : d[c])
                    }
                }
            }
            return b.join("&").replace(/%20/g, "+")
        }
    });
    var V = {},
    U, ae = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    function K(b, c) {
        var a = {};
        T.each(ae.concat.apply([], ae.slice(0, c)),
        function() {
            a[this] = b
        });
        return a
    }
    T.fn.extend({
        show: function(c, a) {
            if (c) {
                return this.animate(K("show", 3), c, a)
            } else {
                for (var e = 0,
                g = this.length; e < g; e++) {
                    var h = T.data(this[e], "olddisplay");
                    this[e].style.display = h || "";
                    if (T.css(this[e], "display") === "none") {
                        var f = this[e].tagName,
                        b;
                        if (V[f]) {
                            b = V[f]
                        } else {
                            var d = T("<" + f + " />").appendTo("body");
                            b = d.css("display");
                            if (b === "none") {
                                b = "block"
                            }
                            d.remove();
                            V[f] = b
                        }
                        T.data(this[e], "olddisplay", b)
                    }
                }
                for (var e = 0,
                g = this.length; e < g; e++) {
                    this[e].style.display = T.data(this[e], "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(b, a) {
            if (b) {
                return this.animate(K("hide", 3), b, a)
            } else {
                for (var c = 0,
                d = this.length; c < d; c++) {
                    var e = T.data(this[c], "olddisplay");
                    if (!e && e !== "none") {
                        T.data(this[c], "olddisplay", T.css(this[c], "display"))
                    }
                }
                for (var c = 0,
                d = this.length; c < d; c++) {
                    this[c].style.display = "none"
                }
                return this
            }
        },
        _toggle: T.fn.toggle,
        toggle: function(a, b) {
            var c = typeof a === "boolean";
            return T.isFunction(a) && T.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || c ? this.each(function() {
                var d = c ? a: T(this).is(":hidden");
                T(this)[d ? "show": "hide"]()
            }) : this.animate(K("toggle", 3), a, b)
        },
        fadeTo: function(c, a, b) {
            return this.animate({
                opacity: a
            },
            c, b)
        },
        animate: function(a, d, b, c) {
            var e = T.speed(d, b, c);
            return this[e.queue === false ? "each": "queue"](function() {
                var g = T.extend({},
                e),
                i,
                f = this.nodeType == 1 && T(this).is(":hidden"),
                h = this;
                for (i in a) {
                    if (a[i] == "hide" && f || a[i] == "show" && !f) {
                        return g.complete.call(this)
                    }
                    if ((i == "height" || i == "width") && this.style) {
                        g.display = T.css(this, "display");
                        g.overflow = this.style.overflow
                    }
                }
                if (g.overflow != null) {
                    this.style.overflow = "hidden"
                }
                g.curAnim = T.extend({},
                a);
                T.each(a,
                function(o, k) {
                    var l = new T.fx(h, g, o);
                    if (/toggle|show|hide/.test(k)) {
                        l[k == "toggle" ? f ? "show": "hide": k](a)
                    } else {
                        var m = k.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                        j = l.cur(true) || 0;
                        if (m) {
                            var p = parseFloat(m[2]),
                            n = m[3] || "px";
                            if (n != "px") {
                                h.style[o] = (p || 1) + n;
                                j = ((p || 1) / l.cur(true)) * j;
                                h.style[o] = j + n
                            }
                            if (m[1]) {
                                p = ((m[1] == "-=" ? -1 : 1) * p) + j
                            }
                            l.custom(j, p, n)
                        } else {
                            l.custom(j, k, "")
                        }
                    }
                });
                return true
            })
        },
        stop: function(b, c) {
            var a = T.timers;
            if (b) {
                this.queue([])
            }
            this.each(function() {
                for (var d = a.length - 1; d >= 0; d--) {
                    if (a[d].elem == this) {
                        if (c) {
                            a[d](true)
                        }
                        a.splice(d, 1)
                    }
                }
            });
            if (!c) {
                this.dequeue()
            }
            return this
        }
    });
    T.each({
        slideDown: K("show", 1),
        slideUp: K("hide", 1),
        slideToggle: K("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    },
    function(b, a) {
        T.fn[b] = function(d, c) {
            return this.animate(a, d, c)
        }
    });
    T.extend({
        speed: function(b, a, c) {
            var d = typeof b === "object" ? b: {
                complete: c || !c && a || T.isFunction(b) && b,
                duration: b,
                easing: c && a || a && !T.isFunction(a) && a
            };
            d.duration = T.fx.off ? 0 : typeof d.duration === "number" ? d.duration: T.fx.speeds[d.duration] || T.fx.speeds._default;
            d.old = d.complete;
            d.complete = function() {
                if (d.queue !== false) {
                    T(this).dequeue()
                }
                if (T.isFunction(d.old)) {
                    d.old.call(this)
                }
            };
            return d
        },
        easing: {
            linear: function(b, a, d, c) {
                return d + c * b
            },
            swing: function(b, a, d, c) {
                return (( - Math.cos(b * Math.PI) / 2) + 0.5) * c + d
            }
        },
        timers: [],
        fx: function(b, c, a) {
            this.options = c;
            this.elem = b;
            this.prop = a;
            if (!c.orig) {
                c.orig = {}
            }
        }
    });
    T.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            } (T.fx.step[this.prop] || T.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var b = parseFloat(T.css(this.elem, this.prop, a));
            return b && b > -10000 ? b: parseFloat(T.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(a, b, c) {
            this.startTime = ad();
            this.start = a;
            this.end = b;
            this.unit = c || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var e = this;
            function d(f) {
                return e.step(f)
            }
            d.elem = this.elem;
            if (d() && T.timers.push(d) && !U) {
                U = setInterval(function() {
                    var f = T.timers;
                    for (var g = 0; g < f.length; g++) {
                        if (!f[g]()) {
                            f.splice(g--, 1)
                        }
                    }
                    if (!f.length) {
                        clearInterval(U);
                        U = ab
                    }
                },
                13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            T(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(c) {
            var d = ad();
            if (c || d >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var f = true;
                for (var e in this.options.curAnim) {
                    if (this.options.curAnim[e] !== true) {
                        f = false
                    }
                }
                if (f) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (T.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        T(this.elem).hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var b in this.options.curAnim) {
                            T.attr(this.elem.style, b, this.options.orig[b])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var a = d - this.startTime;
                this.state = a / this.options.duration;
                this.pos = T.easing[this.options.easing || (T.easing.swing ? "swing": "linear")](this.state, a, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    T.extend(T.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                T.attr(a.elem.style, "opacity", a.now)
            },
            _default: function(a) {
                if (a.elem.style && a.elem.style[a.prop] != null) {
                    a.elem.style[a.prop] = a.now + a.unit
                } else {
                    a.elem[a.prop] = a.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        T.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            var f = this[0].getBoundingClientRect(),
            c = this[0].ownerDocument,
            g = c.body,
            h = c.documentElement,
            a = h.clientTop || g.clientTop || 0,
            b = h.clientLeft || g.clientLeft || 0,
            d = f.top + (self.pageYOffset || T.boxModel && h.scrollTop || g.scrollTop) - a,
            e = f.left + (self.pageXOffset || T.boxModel && h.scrollLeft || g.scrollLeft) - b;
            return {
                top: d,
                left: e
            }
        }
    } else {
        T.fn.offset = function() {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            T.offset.initialized || T.offset.initialize();
            var f = this[0],
            i = f.offsetParent,
            j = f,
            a = f.ownerDocument,
            c,
            h = a.documentElement,
            e = a.body,
            d = a.defaultView,
            k = d.getComputedStyle(f, null),
            b = f.offsetTop,
            g = f.offsetLeft;
            while ((f = f.parentNode) && f !== e && f !== h) {
                c = d.getComputedStyle(f, null);
                b -= f.scrollTop,
                g -= f.scrollLeft;
                if (f === i) {
                    b += f.offsetTop,
                    g += f.offsetLeft;
                    if (T.offset.doesNotAddBorder && !(T.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(f.tagName))) {
                        b += parseInt(c.borderTopWidth, 10) || 0,
                        g += parseInt(c.borderLeftWidth, 10) || 0
                    }
                    j = i,
                    i = f.offsetParent
                }
                if (T.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible") {
                    b += parseInt(c.borderTopWidth, 10) || 0,
                    g += parseInt(c.borderLeftWidth, 10) || 0
                }
                k = c
            }
            if (k.position === "relative" || k.position === "static") {
                b += e.offsetTop,
                g += e.offsetLeft
            }
            if (k.position === "fixed") {
                b += Math.max(h.scrollTop, e.scrollTop),
                g += Math.max(h.scrollLeft, e.scrollLeft)
            }
            return {
                top: b,
                left: g
            }
        }
    }
    T.offset = {
        initialize: function() {
            if (this.initialized) {
                return
            }
            var c = document.body,
            i = document.createElement("div"),
            g,
            h,
            a,
            f,
            b,
            j,
            e = c.style.marginTop,
            d = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            b = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (j in b) {
                i.style[j] = b[j]
            }
            i.innerHTML = d;
            c.insertBefore(i, c.firstChild);
            g = i.firstChild,
            h = g.firstChild,
            f = g.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (h.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (f.offsetTop === 5);
            g.style.overflow = "hidden",
            g.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (h.offsetTop === -5);
            c.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (c.offsetTop === 0);
            c.style.marginTop = e;
            c.removeChild(i);
            this.initialized = true
        },
        bodyOffset: function(c) {
            T.offset.initialized || T.offset.initialize();
            var a = c.offsetTop,
            b = c.offsetLeft;
            if (T.offset.doesNotIncludeMarginInBodyOffset) {
                a += parseInt(T.curCSS(c, "marginTop", true), 10) || 0,
                b += parseInt(T.curCSS(c, "marginLeft", true), 10) || 0
            }
            return {
                top: a,
                left: b
            }
        }
    };
    T.fn.extend({
        position: function() {
            var b = 0,
            c = 0,
            e;
            if (this[0]) {
                var d = this.offsetParent(),
                a = this.offset(),
                f = /^body|html$/i.test(d[0].tagName) ? {
                    top: 0,
                    left: 0
                }: d.offset();
                a.top -= Y(this, "marginTop");
                a.left -= Y(this, "marginLeft");
                f.top += Y(d, "borderTopWidth");
                f.left += Y(d, "borderLeftWidth");
                e = {
                    top: a.top - f.top,
                    left: a.left - f.left
                }
            }
            return e
        },
        offsetParent: function() {
            var a = this[0].offsetParent || document.body;
            while (a && (!/^body|html$/i.test(a.tagName) && T.css(a, "position") == "static")) {
                a = a.offsetParent
            }
            return T(a)
        }
    });
    T.each(["Left", "Top"],
    function(b, c) {
        var a = "scroll" + c;
        T.fn[a] = function(d) {
            if (!this[0]) {
                return null
            }
            return d !== ab ? this.each(function() {
                this == W || this == document ? W.scrollTo(!b ? d: T(W).scrollLeft(), b ? d: T(W).scrollTop()) : this[a] = d
            }) : this[0] == W || this[0] == document ? self[b ? "pageYOffset": "pageXOffset"] || T.boxModel && document.documentElement[a] || document.body[a] : this[0][a]
        }
    });
    T.each(["Height", "Width"],
    function(b, d) {
        var f = b ? "Left": "Top",
        c = b ? "Right": "Bottom",
        e = d.toLowerCase();
        T.fn["inner" + d] = function() {
            return this[0] ? T.css(this[0], e, false, "padding") : null
        };
        T.fn["outer" + d] = function(g) {
            return this[0] ? T.css(this[0], e, false, g ? "margin": "border") : null
        };
        var a = d.toLowerCase();
        T.fn[a] = function(g) {
            return this[0] == W ? document.compatMode == "CSS1Compat" && document.documentElement["client" + d] || document.body["client" + d] : this[0] == document ? Math.max(document.documentElement["client" + d], document.body["scroll" + d], document.documentElement["scroll" + d], document.body["offset" + d], document.documentElement["offset" + d]) : g === ab ? (this.length ? T.css(this[0], a) : null) : this.css(a, typeof g === "string" ? g: g + "px")
        }
    })
})();
/*common.js*/
var SKIN_PATH = "/Skins/Default/";
function $nsw() {}
function $j(e) {
    return $("#" + e)
}
function $v(e, t) {
    if (t == null) {
        var n = $j(e).attr("value");
        return n == null || n == undefined ? "": n
    }
    return $j(e).attr("value", t)
}
function $tv(e) {
    return $.trim($v(e))
}
function getChecked(e) {
    return $("#" + e).attr("checked")
}
function checkRadio(e, t) {
    var n;
    t == null ? n = $(document.body).find("input[type=radio]") : n = $j(t).find("input[type=radio]"),
    n.each(function(t) {
        var n = $(this);
        n.attr("checked", n.attr("value") == e)
    })
}
function getSelectedText(e) {
    var t = $("#" + e + ">option"),
    n = "";
    return t.each(function(e) {
        this.selected && (n = this.text)
    }),
    n
}
function hideDdl(e) {
    var t = ["select", "iframe", "applet", "object"],
    n;
    e != null ? n = $j(e) : n = $(document.body);
    for (var r = 0; r < t.length; ++r) n.find(t[r]).css("visibility", "hidden")
}
function showDdl() {
    var e = ["select", "iframe", "applet", "object"];
    for (var t = 0; t < e.length; ++t) $(e[t]).css("visibility", "visible")
}
function relocation(e) {
    var t;
    typeof e.toString().toLowerCase() == "string" ? t = $j(e) : t = $(e);
    if (t.length == 0) return;
    var n = document.documentElement.scrollTop || document.body.scrollTop,
    r = n - t.height() / 2 + "px";
    t.css({
        "margin-top": r
    })
}
function oran_msg(e, t, n, r, i, s) {
    window.onload = function() {
        $a(e, t, n, r, i, s)
    }
}
function $confirm(e, t, n) {
    hideDdl();
    var r = "消息对话框",
    i = $j("mesbook1_c");
    if (i.length == 0) {
        var s = "<div id='mesbook1_c'><div><img onclick='hideMsg()' id='mesbook1_cImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam' /><span id='mesbook1_cTitle'></span></div>" + "<dl class='b1'>" + "<dt><img id='mesbook1_cIcon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title=''  /></dt>" + "<dd class='l_25' id='mesbook1_cMsg'></dd>" + "<dd class='b' style='visibility:hidden' id='mesbook1_cAutoClose'>此窗口<span id='mesbook1_cDelay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>" + "<dd id='mesbook1_cBtns'>" + "<input type='button' class='b15' value='确 定' />" + "<input type='button' class='b15' value='取 消' />" + "</dd>" + "</dl>" + "</div>";
        $(document.body).append(s)
    }
    var i = $j("mesbook1_c"),
    o = $j("mesbook1_cImgClose"),
    u = $j("mesbook1_cIcon"),
    a = $j("mesbook1_cMsg"),
    f = $j("mesbook1_cAutoClose"),
    l = $j("mesbook1_cDelay"),
    c = $j("mesbook1_cTitle"),
    h = $j("mesbook1_cBtns");
    c.html(r),
    a.html(e);
    var p = SKIN_PATH + "Img/ico_ques.gif";
    u.attr("src", p);
    var d = h.find("input:eq(0)"),
    v = h.find("input:eq(1)");
    d.removeAttr("onclick"),
    v.removeAttr("onclick"),
    t.title != null && d.val(t.title),
    typeof t.toDo == "string" ? d.click(function() {
        location.href = t.toDo
    }) : d.click(function() {
        t.toDo()
    }),
    n.title != null && v.val(n.title),
    typeof n.toDo == "string" ? v.click(function() {
        location.href = n.toDo
    }) : v.click(function() {
        n.toDo()
    }),
    o.removeAttr("onclick"),
    o.click(function() {
        hideConfirm()
    }),
    showFullBg(),
    setCM("mesbook1_c"),
    relocation("mesbook1_c"),
    i.fadeIn(80)
}
function hideConfirm() {
    showDdl();
    var e = $j("mesbook1_c");
    hideFullBg(),
    e.fadeOut(80)
}
function $a(e, t, n, r, i, s) {
    t == null && (t = 2),
    n == null && (n = -1),
    i == null && (i = "消息提示"),
    hideDdl();
    var o = $j("mesbook1");
    if (o.length == 0) {
        var u = "<div id='mesbook1'><div><img style='float:right' onclick='hideMsg()' id='mesbook1ImgClose' src='" + SKIN_PATH + "Img/ico9_close.gif' alt='关闭' class='fr p vam ml5' /><span id='mesbook1Title'></span></div>" + "<dl class='b1'>" + "<dt><img id='mesbook1Icon' src='" + SKIN_PATH + "Img/message_ico_03.gif' alt='' title='' /></dt>" + "<dd class='l_25' id='mesbook1Msg'></dd>" + "<dd class='b' style='visibility:hidden' id='mesbook1AutoClose'>此窗口<span id='mesbook1Delay' style='margin:0 5px;'></span>秒钟后自动关闭。</dd>" + "<dd id='mesbook1Btns'>" + "<input type='button' class='b15' value='关 闭' />" + "</dd>" + "</dl>" + "</div>";
        $(document.body).append(u)
    }
    var o = $j("mesbook1"),
    a = $j("mesbook1ImgClose"),
    f = $j("mesbook1Icon"),
    l = $j("mesbook1Msg"),
    c = $j("mesbook1AutoClose"),
    h = $j("mesbook1Delay"),
    p = $j("mesbook1Title"),
    d = $j("mesbook1Btns");
    p.html(i),
    l.html(e);
    var v = SKIN_PATH + "Img/";
    switch (t) {
    case 1:
        v += "ico_ok.html";
        break;
    case 2:
        v += "ico_info.html";
        break;
    case 3:
        v += "ioc_ques.html";
        break;
    case - 1 : v += "ico_error.html";
        break;
    default:
        v += "ico_normal.html"
    }
    f.attr("src", v);
    var m = d.find("input");
    m.removeAttr("onclick"),
    m.click(function() {
        hideMsg(),
        r != null && $j(r).focus(),
        s != null && s()
    }),
    a.removeAttr("onclick"),
    a.click(function() {
        hideMsg(),
        r != null && $j(r).focus(),
        s != null && s()
    }),
    m.focus(),
    showFullBg(),
    setCM("mesbook1"),
    relocation("mesbook1"),
    o.fadeIn(80)
}
function showMsgPage(e, t, n, r, i, s) {
    if (t == null) t = "Information";
    else switch (t) {
    case 1:
        t = "Successful";
        break;
    case 2:
        t = "Information";
        break;
    case 3:
        t = "Question";
        break;
    case - 1 : t = "Failed";
        break;
    default:
        t = "Information"
    }
    n == null && (n = "index.html"),
    r == null && (r = "首页"),
    i == null && (i = "index.html"),
    s == null && (s = 9),
    e = e.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", ""),
    n = n.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "").replace("http://", "").replace("https:///", ""),
    r = r.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", ""),
    i = i.replace("/<script>/g", "").replace("/</script>/g", "").replace("/</sCript>/g", "").replace("http://", "").replace("https:///", "");
    var o = "/Tools/Message.aspx?result=" + t + "&btntitle=" + encodeURIComponent(r) + "&btnhref=" + encodeURIComponent(n) + "&defaulthref=" + encodeURIComponent(i) + "&delay=" + s + "&msg=" + encodeURIComponent(e);
    location.href = o
}
function hideMsg() {
    showDdl();
    var e = $j("mesbook1");
    hideFullBg(),
    e.fadeOut(80)
}
function setCM(e, t) {
    var n;
    typeof e.toString().toLowerCase() == "string" ? n = $j(e) : n = $(e),
    t == null && (t = 80);
    var r = n.height() / 2,
    i = n.width() / 2;
    n.css({
        top: "50%",
        "margin-top": "-" + r + "px",
        left: "50%",
        "margin-left": "-" + i + "px"
    }),
    n.css({
        position: "absolute",
        "z-index": "999"
    }),
    n.fadeIn(t)
}
function setCMS(e, t) {
    var n;
    typeof e.toString().toLowerCase() == "string" ? n = $j(e) : n = $(e),
    t == null && (t = 80);
    var r = n.height() / 2,
    i = n.width() / 2,
    s = document.documentElement.scrollTop;
    s > 100 ? n.css({
        top: "50%",
        "margin-top": "-" + r + "px",
        left: "50%",
        "margin-left": "-" + i + "px"
    }) : (r = 200, n.css({
        "margin-top": "-" + r + "px",
        left: "50%",
        "margin-left": "-" + i + "px"
    })),
    n.css({
        position: "absolute",
        "z-index": "999"
    }),
    n.fadeIn(t)
}
function showFullBg(e, t, n, r, i, s, o) {
    e == null && (e = "oran_full_bg");
    var u = $j(e);
    if (u.length == 0) {
        var a = "<div style='position:absolute;top:0;left:0;display:none;' id='" + e + "'></div>";
        $(document.body).append(a)
    }
    n == null && (n = .75),
    r == null && (r = "#777"),
    i == null && (i = "9"),
    s == null && (s = 80),
    t == null && (t = !0);
    var u = $j(e),
    f = document.documentElement,
    l = f.scrollWidth,
    c = f.scrollHeight,
    h = f.clientHeight,
    p = f.clientWidth;
    c < h && (c = h),
    l < p && (l = p),
    u.css({
        "z-index": i,
        background: r,
        opacity: n,
        filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=" + n * 100 + ")"
    }),
    u.css({
        height: c,
        width: l
    }),
    t && hideDdl(null, o),
    u.fadeIn(s),
    o != null && o()
}
function hideFullBg(e, t) {
    e == null && (e = "oran_full_bg"),
    t == null && (t = 80);
    var n = $j(e);
    n.fadeOut(t),
    showDdl()
}
function $closeLayer(e, t) {
    $j(e).fadeOut(80,
    function() {
        hideFullBg(t)
    })
}
function limitLength(e) {
    var t = e.value,
    n = parseInt($(e).attr("max")),
    r = e.id,
    i = t.replace(/[^\x00-\xff]/g, "**"),
    s = i.length;
    if (s * 1 <= n * 1) return;
    var o = i.substr(0, n),
    u = 0,
    a = "";
    for (var f = 0; f < o.length; f++) {
        var l = o.substr(f, 1);
        l == "*" && u++
    }
    var c = 0,
    h = i.substr(n * 1 - 1, 1);
    u % 2 == 0 ? (c = u / 2 + (n * 1 - u), a = t.substr(0, c)) : (c = (u - 1) / 2 + (n * 1 - u), a = t.substr(0, c)),
    alert("最大输入" + n + "个字节（相当于" + n / 2 + "个汉字）！"),
    document.getElementById(r).value = a;
    return
}
function $g(e) {
    return document.getElementById(e)
}
function $name(e) {
    return document.getElementsByName(e)
}
function $tag(e, t) {
    var n = e;
    return n != Object && (n = $g(e)),
    n.getElementsByTagName(t)
}
function digiKeyOnly(e) {
    var t = window.event ? event.keyCode: e.which;
    return t < 27 || t > 128 ? !0 : t >= 48 && t <= 57 ? !0 : !1
}
function digiOnly(e) {
    e.value = e.value.replace(/[^0-9]/g, "")
}
function $o(e, t, n, r) {
    if (e == null || e == "") return;
    t == null && (t = "300"),
    n == null && (n = "300"),
    r == null && (r = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0;top=0,left=0"),
    t && (r += ",width=" + t),
    n && (r += ",height=" + n),
    window.open(e, "", r, !1)
}
function emptyText(e) {
    var t;
    e == null ? t = $("body").find("input[type=text]") : t = $j(e).find("input[type=text]");
    var n;
    e == null ? n = $("body").find("input[type=password]") : n = $j(e).find("input[type=password]"),
    t.each(function() {
        $(this).attr("value", "")
    }),
    n.each(function() {
        $(this).attr("value", "")
    }),
    e == null ? t = $("body").find("textarea") : t = $j(e).find("textarea"),
    t.each(function() {
        $(this).attr("value", "")
    })
}
function $qs(e) {
    var t = new Object,
    n = location.search.substring(1),
    r = n.split("&");
    for (var i = 0; i < r.length; ++i) {
        var s = r[i].indexOf("=");
        if (!s) continue;
        var o = r[i].substring(0, s),
        u = r[i].substring(s + 1);
        u = decodeURIComponent(u),
        t[o] = u
    }
    return t[e] == null ? "": t[e]
}
function selectAll(e, t) {
    var n = $tag(t, "input");
    for (var r = 0; r < n.length; ++r) n[r].checked = e.checked
}
function invertSelect(e) {
    var t = $tag(e, "input");
    for (var n = 0; n < t.length; ++n) t[n].checked = !t[n].checked
}
function getPageFilename() {
    var e = location.pathname,
    t = e.lastIndexOf("index.html") + 1,
    n = e.substring(t, e.length);
    return n
}
function getRawUrl() {
    var e = location.href,
    t = e.lastIndexOf("index.html") + 1,
    n = e.substring(t, e.length);
    return t = n.lastIndexOf("#"),
    n = n.substring(0, t),
    n
}
function getIntactRawUrl() {
    var e = location.href,
    t;
    return t = e.lastIndexOf("#"),
    e = e.substring(0, t),
    e
}
function toggleArg(e, t) {
    var n = $$.intactRawUrl(),
    r = n.indexOf("?");
    if (r == -1) return n + "?" + e + "=" + t;
    var i = n.substring(r),
    s = n.substring(0, r),
    o = new RegExp("&?" + e + "=?\\w*\\[?\\w*\\]?\\|?\\d?", "i");
    return i = i.replace(o, ""),
    i.length == 1 ? i += e + "=" + t: i += "&" + e + "=" + t,
    s + i
}
function increase(e, t) {
    t == null && (t = "show");
    var n = $j(e);
    n.animate({
        height: t,
        width: t,
        opacity: t
    },
    "fast")
}
function fadeToggle(e, t) {
    t == null && (t = "fast"),
    $("#" + e).is(":visible") ? $("#" + e).fadeOut(t) : $("#" + e).fadeIn(t)
}
function clearAllElms(e, t) {
    clearDdls(e, t),
    clearTextBoxes(e, t),
    clearRdos(e, t),
    clearChks(e, t)
}
function clearRdos(e, t) {
    t == null && (t = "tfocus");
    var n = $j(e).find("input[type=radio]");
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    })
}
function clearChks(e, t) {
    t == null && (t = "tfocus");
    var n = $j(e).find("input[type=checkbox]");
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    })
}
function clearDdls(e, t) {
    t == null && (t = "tfocus");
    var n = $j(e).find("select");
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    })
}
function clearTextBoxes(e, t) {
    t == null && (t = "tfocus");
    var n = $j(e).find("input[type=text]");
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    });
    var n = $j(e).find("input[type=password]");
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    }),
    n = $j(e).find("textarea"),
    n.focus(function() {
        $(this).addClass(t)
    }),
    n.blur(function() {
        $(this).removeClass(t)
    })
}
function addBookmark(e, t) {
    if (window.sidebar) try {
        window.sidebar.addPanel(_title, e, "")
    } catch(n) {
        alert("加入收藏失败，请使用Ctrl+D进行添加")
    } else if (document.all) window.external.AddFavorite(e, t);
    else if (window.opera && window.print) return ! 0
}
function addBookmark() {
    var e = document.title,
    t = document.URL;
    if (window.sidebar) try {
        window.sidebar.addPanel(e, t, "")
    } catch(n) {
        alert("加入收藏失败，请使用Ctrl+D进行添加")
    } else if (window.opera && window.print) {
        var r = document.createElement("a");
        r.setAttribute("rel", "sidebar"),
        r.setAttribute("href", t),
        r.setAttribute("title", e),
        r.click()
    } else document.all ? window.external.AddFavorite(t, e) : alert("加入收藏失败，请使用Ctrl+D进行添加")
}
function BookMarkit() {
    var e = "http://" + window.location.host,
    t = document.title;
    document.all ? window.external.addFavorite(e, t) : window.sidebar && window.sidebar.addPanel(t, e, "")
}
function setSelectByValue(e, t) {
    var n = $g(e);
    for (var r = 0; r < n.options.length; ++r) {
        var i = n.options[r];
        i.selected = i.value == t
    }
}
function showVerifyCode(e, t, n, r) {
    e == null && (e = "spVerCode"),
    t == null && (t = "spVerCodeMsg"),
    n == null && (n = "imgVerCode"),
    r == null && (r = "spChgVerCode");
    var i = $j(e),
    s = $j(t),
    o = $j(r);
    i.html() == "" && (s.html("正在加载验证码..."), s.show(), i.html("<img src='/Tools/ValidCode.aspx' style='display:none;' id='" + n + "' alt='验证码' />"));
    var u = $j(n);
    u.load(function() {
        s.hide(),
        u.show(),
        o.show()
    })
}
function changeVerCode(e, t) {
    e == null && (e = "imgVerCode"),
    t == null && (t = "spVerCodeMsg");
    var n = $j(e),
    r = $j(t);
    r.html("正在刷新验证码...").show(),
    n.attr({
        src: "/Tools/ValidCode.aspx?x=" + Math.random(),
        alt: "验证码"
    }),
    n.hide(),
    n.load(function() {
        r.hide(),
        n.show()
    })
}
function showProc(e, t) {
    var n = $j("imgProc");
    t == null && (t = !0),
    t ? ($(e).hide(), n.length > 0 && n.remove(), $("<img src='" + SKIN_PATH + "img/processing.gif' id='imgProc' alt='正在处理' />").insertAfter(e)) : ($(e).show(), n.remove())
}
function enlarge(e, t) {
    e == null && (e = !0),
    t == null && (t = "Content");
    var n = $j(t),
    r = parseInt(n.css("font-size")),
    i = e ? r * 1.2 : r / 1.2;
    n.css("font-size", i + "px")
}
function altRow(e, t, n, r) {
    var i = $tag(t, "tr");
    for (var s = e; s < i.length; ++s) {
        var o;
        s % 2 == 0 ? o = r: o = n;
        if (typeof o == "object") for (var u in o) i[s].style[u] = o[u];
        else i[s].className = o
    }
}
function getCheckedVal(e, t) {
    t == null && (t = -1);
    var n = $j(e).find("input:checked"),
    r = "",
    i = !1;
    return n.each(function(e) {
        e > t && (i && (r += ","), r += $(this).val(), i = !0)
    }),
    r
}
function checkAll(e, t) {
    var n = $j(t).find("input[type=checkbox]");
    n.each(function(t) {
        this.checked = e.checked
    })
}
function GetSearchURL(e, t) {
    t == null && (t = getIntactRawUrl());
    var n = e.split("|");
    for (var r = 0; r < n.length; r++) {
        var i = n[r].split(","),
        s,
        o = document.getElementById(i[0]);
        i.length == 2 ? s = i[1] : s = i[0];
        if (o != null) {
            var u = o.value;
            u != null && (t += "&" + s + "=" + encodeURIComponent(u))
        }
    }
    return t
}
function SearchObjectByGet(e, t, n) {
    n == null && (n = !1);
    var r = GetSearchURL(e, t);
    if (n) return r;
    window.location.href = r
}
function SearchObjects(e, t) {
    if (e == "请填写关键词" || e == "请输入关键词") {
        $a("您还没有输入关键词，请填写后查询。");
        return
    }
    if (t == "product") {
        var n = "/Search/Index.aspx?objtype=product&kwd=" + escape(e);
        window.location.href = n
    } else {
        var n = "/Search/News.aspx?objtype=news&kwd=" + escape(e);
        window.location.href = n
    }
}
function GoToURL(e, t) {
    var n;
    n = SetURLField(n, e, t),
    location.href = n
}
function GoToURLByGet(e, t) {
    var n;
    n = location.href,
    n = SetURLField(n, "page", "1"),
    n = SetURLField(n, e, t)
}
function SetURLField(e, t, n) {
    var r;
    r = e.indexOf("?");
    if (r == -1) e += "?" + t + "=" + n;
    else {
        var i = t + "=",
        s = e.indexOf(i);
        s != -1 ? (s += i.length, end = e.indexOf("&", s), end == -1 ? e = e.substring(0, s) + n: e = e.substring(0, s) + n + e.substring(end)) : e = e + "&" + t + "=" + n
    }
    return e
}
function readURLParameter(e) {
    var t = e + "=",
    n = "",
    r = location.href,
    i = r.indexOf(t);
    return i != -1 && (i += t.length, end = r.indexOf("&", i), end == -1 ? n = r.substring(i) : n = r.substring(i, end)),
    n
}
function focusToRemoveText(e) {
    var t = $(e),
    n = t.attr("hadfocused") == "1";
    n || (t.val(""), t.attr("hadfocused", "1"))
}
function SUR_ShowTable(e) {
    var t = "",
    n;
    switch (e.SelectionMode) {
    case 1:
        n = "radio";
        break;
    case 2:
        n = "checkbox"
    }
    switch (e.ShowMode) {
    case 1:
        t = '<div class="survey_1" style="width:' + e.Width + 'px;">' + '<div class="sur_tit" style="width:' + (e.Width - 2) + 'px;">' + e.Title + "</div>" + '<table class="sur_tab" id="SUR_itemTab_' + e.SubjectId + '">';
        for (var r = 0; r < e.Items.length; ++r) {
            var i = e.Items[r],
            s = "SUR_item_" + e.SubjectId + r;
            t += '<tr><td><input name="SUR_item' + e.SubjectId + '" type="' + n + '" value="' + i.id + '" id="' + s + '" /></td>' + '<td><label for="' + s + '">' + i.title + "</label></td>" + "</tr>"
        }
        t += '</table><div class="bot_btn2"><input type="button" value="提交" class="b15" onclick="SUR_senddata(this,' + e.ObjectName + ')" />' + '<input type="button" onclick="window.open(\'/tools/survey.aspx?oid=' + e.SubjectId + '\')" value="查看" class="b16" />' + "</div>" + "</div>"
    }
    document.write(t)
}
function SUR_senddata(e, t) {
    var n = "SUR_post_msg_" + t.SubjectId,
    r = "<span id='" + n + "'>正在提交,请稍后...</span>",
    i = "/ajax.ashx?action=Survey&t=" + Math.random(),
    s = getCheckedVal("SUR_itemTab_" + t.SubjectId);
    if (s == null || s.length == 0) {
        $a("您至少需要选中一个投票项。");
        return
    }
    $(e).after(r).hide(),
    $.post(i, {
        _SUR_SubjectID: t.SubjectId,
        _CheckedItems: s
    },
    function(r) {
        var i = gav(r, "state"),
        s = gav(r, "msg");
        i == "1" ? $confirm("投票成功，感谢您的参与。", {
            title: "确定",
            toDo: function() {
                hideConfirm()
            }
        },
        {
            title: "查看结果",
            toDo: function() {
                window.open("/tools/survey.aspx?oid=" + t.SubjectId),
                hideConfirm()
            }
        }) : $a(s),
        $j(n).remove(),
        $(e).show()
    })
}
function LEW_ShowTable() {
    var e = '<div class="reports" id="LEAVEWORD_cntr" style="margin:0 auto 10px auto;"><h1>留言</h1><table id="LEAVEWORD_tab"><tr><th>* 标题：</th><td><input type="text" size="40" id="LEAVEWORD_txtTitle" /></td></tr><tr><th>* 联系人：</th><td><input type="text" size="10" id="LEAVEWORD_txtContact" /></td></tr><tr><th>联系电话：</th><td><input type="text" size="30" id="LEAVEWORD_txtTel" /></td></tr><tr><th>手机号码：</th><td><input type="text" size="30" id="LEAVEWORD_txtMobile" /></td></tr><tr><th>* 电子邮箱地址：</th><td><input type="text" size="30" id="LEAVEWORD_txtEmail" /></td></tr><tr><th>* 留言分类：</th><td id="LEAVEWORD_tdCats"></td></tr><tr><th>留言内容：</th><td><textarea style="width:230px;height:80px;" id="LEAVEWORD_txtShortDesc"></textarea></td></tr><tr><th>&nbsp;</th><td><input type="button"  value="提交" class="b15" onclick="sendLeaveword(this)" /> </td></tr></table></div>';
    document.write(e),
    fillLeavewordCategories()
}
function PAY_ShowTable() {
    var e = '<div class="reports" id="DIR_PAY_cntr" style="margin:0 auto 10px auto;"><h1>付款</h1><table id="DIR_PAY_tab" style="background:url(' + SKIN_PATH + 'img/Pay_ico.gif) no-repeat right top;width:400px;">' + "<tr>" + "<tr>" + "<th>* 付款方式：</th>" + '<td><select id="DIR_PAY_ddlPayment"><option value="">请选择</option>' + '<option value="alipay">支付宝</option>' + '<option value="99bill">快钱</option>' + "</select>" + "</td>" + "</tr>" + "<th>* 付款人：</th>" + '<td><input type="text" size="20" id="DIR_PAY_txtPayer" /></td>' + "</tr>" + "<tr>" + "<th>* 电子邮箱地址：</th>" + '<td><input type="text" size="20" id="DIR_PAY_txtEmail" /></td>' + "</tr>" + "<tr>" + "<th>联系电话：</th>" + '<td><input type="text" size="20" id="DIR_PAY_txtTel" /></td>' + "</tr>" + "<tr>" + "<th>手机号码：</th>" + '<td><input type="text" size="20" id="DIR_PAY_txtMobile" /></td>' + "</tr>" + "<tr>" + "<th>我公司业务员姓名：</th>" + '<td><input type="text" size="20" id="DIR_PAY_txtSalesManName" /></td>' + "</tr>" + "<tr>" + "<th>* 付款金额：</th>" + '<td><input type="text" size="10" id="DIR_PAY_txtMoney" /></td>' + "</tr>" + "<tr>" + "<th>* 款项用途：</th>" + '<td><input type="text" size="40" id="DIR_PAY_txtUse" /></td>' + "</tr>" + "<tr>" + "<th>&nbsp;</th>" + "<td>" + '<input type="button"  value="提交" class="b15" onclick="directPay(this)" /> ' + "</td>" + "</tr>" + "</table>" + "</div>";
    document.write(e)
}
function LoginCheck(e, t) {
    var n = window.location;
    if (e == undefined || e.length == 0) {
        $a("请输入用户名", "错误提示", "txtUsername");
        return
    }
    if (t == undefined || t.length == 0) {
        $a("请输入密码", "错误提示", "txtPassword");
        return
    }
    $.post("/ajax.ashx?action=logincheck&t=" + Math.random(), {
        username: e,
        password: t
    },
    function(e) {
        gav(e, "state") == "1" ? ($a(gav(e, "msg")), window.location.href = n) : $a(gav(e, "msg"))
    })
}
function xuanze() {
    var e = document.getElementById("seachkeywords").value;
    e == "请输入关键词搜索" && (e = ""),
    window.location.href = "/Search/Index.aspx?objtype=product&kwd=" + e
}
function ChangeFontSize(e, t) {
    $(e).addClass("cur").siblings("a").removeClass("cur"),
    $j("cntrBody").css("font-size", t).find("*").css("font-size", t)
}
function getUrlParms() {
    var e = new Object,
    t = location.search.substring(1),
    n = t.split("&");
    for (var r = 0; r < n.length; r++) {
        var i = n[r].indexOf("=");
        if (i == -1) continue;
        var s = n[r].substring(0, i),
        o = n[r].substring(i + 1);
        e[s] = unescape(o)
    }
    return e
}
var PTN_EMAIL = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
PTN_FLOAT = /\d+(\.\d+)?/;
$(function() {
    $(window).resize(function() {
        relocation("mesbook1"),
        relocation("mesbook1_c")
    }),
    $(window).scroll(function() {
        relocation("mesbook1"),
        relocation("mesbook1_c")
    })
}),
$cookie = function(e, t, n) {
    if (t == null && n == null) {
        var r = e + "=";
        return begin = document.cookie.indexOf(r),
        begin != -1 ? (begin += r.length, end = document.cookie.indexOf(";", begin), end == -1 && (end = document.cookie.length), document.cookie.substring(begin, end)) : null
    }
    if (typeof t == "boolean") $cookie(e, "", -999999);
    else {
        n == null && (n = 99864e5);
        var i = new Date,
        s = new Date,
        o = n;
        s.setTime(i.getTime() + o),
        document.cookie = e + "=" + t + ";expires=" + s.toGMTString()
    }
},
$(function() {
    $("#seachkeywords").val("请输入关键词搜索").css({
        color: "#666"
    }),
    $("#seachkeywords").click(function() {
        $(this).val("").css({
            color: "#000"
        })
    }).blur(function() {
        $.trim($(this).val()) == "" && $(this).val("请输入关键词搜索").css({
            color: "#666"
        })
    })
})
/*ajax.js*/
function helpLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    helpSelectCurrentPosition()
}
function helpSelectCurrentPosition() {
    var a = window.location.href.substring(window.location.href.lastIndexOf(".") + 1).toLowerCase();
    if (a != "html") {
        $(".nr h4[sid='" + SID + "'],.nr li[sid='" + SID + "']").addClass("cur")
    } else {
        $(".nr h4[sid='" + OBJ_ID + "'],.nr li[sid='" + OBJ_ID + "']").addClass("cur");
        if (!$(".nr .cur").size()) {
            $(".nr h4[sid='" + SID + "'],.nr li[sid='" + SID + "']").addClass("cur")
        }
    }
}
function newsLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    getLastArticle();
    getHistory(MARK);
    addHistory(OBJ_ID, MARK);
    getNewProduct()
}
function newsSelectCurrentPosition() {
    $(".nr h4[sid='" + SID + "'],.nr li[sid='" + SID + "']").addClass("cur")
}
function downLoad() {
    hits(DownloadID, "download");
    writeComment(DownloadID, MARK);
    addHistory(DownloadID, MARK);
    getHistory("download");
    getRelevantViewedDownload(DownloadID)
}
function agentLoad() {
    hits(OBJ_ID, MARK);
    getHits(OBJ_ID, MARK);
    getAgentHelpStatic(OBJ_ID);
    helpSelectCurrentPosition()
}
function keepUsername(a, b) {
    var c = $j(b).attr("value");
    if (a != null && c != undefined) {
        if (a) {
            $cookie("__oran__k_username", c, 99999999999)
        } else {
            $cookie("__oran__k_username", false)
        }
        return
    }
    if (!$j("chkKeep").attr("checked")) {
        return
    }
    if (c != undefined) {
        $cookie("__oran__k_username", c, 99999999999)
    }
}
function toggleJobDetail(d, c) {
    var a = $(d).parent().next();
    var b = $(d).parent();
    if (a.is(":visible")) {
        a.slideUp(80);
        b.css({
            background: "url(" + c + "img/ico14.gif) no-repeat 0 5px"
        })
    } else {
        a.slideDown(80);
        b.css({
            background: "url(" + c + "img/ico13.gif) no-repeat 0 5px"
        })
    }
}
function showAllColumns(a) {
    if (a == null) {
        a = true
    }
    if (a) {
        showFullBg()
    }
    setCM("prod_all_columns");
    relocation("prod_all_columns")
}
function hideAllColumns(a) {
    if (a == null) {
        a = true
    }
    if (a) {
        hideFullBg()
    }
    $j("prod_all_columns").fadeOut(80)
}
function showBgProc(a, d) {
    if (d == null) {
        d = "正在处理..."
    }
    var b = "oran_div_processing";
    var c = $j(b);
    if (c.length == 0) {
        $(document.body).append("<div id='" + b + "'><p><img src='" + SKIN_PATH + "img/processing_2.gif' id='imgProc' alt='" + d + "' /></p><p class='mt10'>" + d + "</p></div>")
    }
    c = $j(b);
    if (a == null) {
        a = true
    }
    if (a) {
        showFullBg("oran_full_bg_2");
        setCM(b);
        relocation(b);
        c.fadeIn(80)
    } else {
        c.fadeOut(80);
        hideFullBg("oran_full_bg_2")
    }
}
function gav(d, a) {
    var c = $(d);
    var b = $(c.find("node[key=" + a + "]")).text();
    return b
}
function showLeaveword(c) {
    var a = $j("LEAVEWORD_cntr");
    if (a.length == 0) {
        var b = '<div class="reports" id="LEAVEWORD_cntr"><h1><a href="javascript:void(0)" onclick="$closeLayer(\'LEAVEWORD_cntr\',\'LEAVEWORD____BG\')" class="close2"><img src="' + SKIN_PATH + 'img/close2.gif" alt="关闭" title="关闭" /></a>留言</h1><table id="LEAVEWORD_tab"><tr><th>* 标题：</th><td><input type="text" size="40" id="LEAVEWORD_txtTitle" /></td></tr><tr><th>* 联系人：</th><td><input type="text" size="10" id="LEAVEWORD_txtContact" /></td></tr><tr><th>联系电话：</th><td><input type="text" size="30" id="LEAVEWORD_txtTel" /></td></tr><tr><th>手机号码：</th><td><input type="text" size="30" id="LEAVEWORD_txtMobile" /></td></tr><tr><th>* 电子邮箱地址：</th><td><input type="text" size="30" id="LEAVEWORD_txtEmail" /></td></tr><tr><th>* 留言分类：</th><td id="LEAVEWORD_tdCats"></td></tr><tr><th>留言内容：</th><td><textarea style="width:230px;height:80px;" id="LEAVEWORD_txtShortDesc"></textarea></td></tr><tr><th>&nbsp;</th><td><input type="button"  value="关闭" class="b18 fr" onclick="$(\'#LEAVEWORD_cntr>h1>a\').click()" /> <input type="button"  value="提交" class="b15" onclick="sendLeaveword(this)" /> </td></tr></table></div>';
        $(document.body).append(b);
        fillLeavewordCategories()
    }
    a.show();
    showFullBg("LEAVEWORD____BG", null, null, null, null, null,
    function() {
        $j("LEAVEWORD_cats").css("visibility", "visible")
    });
    setCM("LEAVEWORD_cntr");
    relocation("LEAVEWORD_cntr")
}
var flag = false;
function DrawImage(e, b, a, d) {
    var c = new Image();
    c.src = e.src;
    if (c.width > 0 && c.height > 0) {
        flag = true;
        if (c.width / c.height >= b / a) {
            if (c.width > b) {
                e.width = b;
                e.height = (c.height * b) / c.width
            } else {
                e.width = c.width;
                e.height = c.height
            }
            if (d == 1) {
                if (a > e.height && b > e.width) {
                    e.style.padding = (a - e.height) / 2 + "px 0 0 " + (b - c.width) / 2 + "px"
                } else {
                    if (a > e.height) {
                        e.style.padding = (a - e.height) / 2 + "px 0 0 0"
                    } else {
                        if (b > e.width) {
                            e.style.padding = "0 0 0 " + (b - e.width) / 2 + "px"
                        }
                    }
                }
            }
        } else {
            if (c.height > a) {
                e.height = a;
                e.width = (c.width * a) / c.height
            } else {
                e.width = c.width;
                e.height = c.height
            }
            if (d == 1) {
                if (a > e.height && b > e.width) {
                    e.style.padding = (a - e.height) / 2 + "px 0 0 " + (b - e.width) / 2 + "px"
                } else {
                    if (a > e.height) {
                        e.style.padding = (a - e.height) / 2 + "px 0 0 0"
                    } else {
                        if (b > e.width) {
                            e.style.padding = "0 0 0 " + (b - e.width) / 2 + "px"
                        }
                    }
                }
            }
        }
    }
}
function initCommonHeader() {
    $.get("/ajax.ashx?action=initcommonheader&t=" + Math.random(),
    function(b) {
        var a = gav(b, "showIM");
        showIM(a);
        var c = gav(b, "username");
        if (c.length > 0) {
            $j("commonHeaderGuest").hide();
            $j("commonHeaderUsername").html(c);
            $j("commonHeaderUser").fadeIn(80)
        }
    })
}
function showIM(a) {
    if ($("#bodd").html() != "") {
        if (a == "True") {
            $("#bodd").show();
            $("#kefubtn").hide();
            $("#divOranIm").show()
        } else {
            $("#bodd").hide();
            $("#kefubtn").show();
            $("#divOranIm").hide()
        }
    }
}
function initCommonHeaderKeywords(a) {
    if (a == "") {
        a = "6"
    }
    $.post("/ajax.ashx?action=initcommonheaderkeywords&t=" + Math.random(), {
        s: a
    },
    function(b) {
        $j("commonHeaderkeywords").html(b)
    })
}
function hits(a, b) {
    $.post("/ajax.ashx?action=hits&t=" + Math.random(), {
        oid: a,
        mark: b
    })
}
function addHistory(a, b) {
    $.get("/ajax.ashx?action=addhistory&t=" + Math.random(), {
        oid: a,
        mark: b
    })
}
function getHistory(a) {
    $.post("/ajax.ashx?action=gethistory&t=" + Math.random(), {
        mark: a
    },
    function(b) {
        if (b.length == 0) {
            b = "<li>&nbsp;&nbsp;无浏览历史</li>"
        }
        $j("divHistoryCntr").html(b + "<div class='clear'></div>")
    })
}
function getHits(a, b) {
    $.post("/ajax.ashx?action=gethits", {
        mark: b,
        oid: a
    },
    function(c) {
        $j("cntrHits").html(c)
    })
}
function cleanHistory(b, a) {
    $.post("/ajax.ashx?action=cleanhistory", {
        mark: b
    },
    function(c) {
        $j("divHistoryCntr").html("<li>&nbsp;&nbsp;无浏览历史</li>")
    })
}
function subscription(d, a) {
    if (a == null) {
        a = "txtSubscriptionEmail"
    }
    var c = $.trim($j(a).val());
    var b = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (c.length == 0) {
        $a("E-Mail 不可为空");
        $j(a).focus();
        return false
    }
    if (!b.test(c)) {
        $a("E-Mail 格式错误。");
        $j(a).focus();
        return false
    }
    showProc(d);
    $.post("/ajax.ashx?action=subscription&t=" + Math.random(), {
        email: c
    },
    function(g) {
        var f = gav(g, "state");
        var e = gav(g, "msg");
        if (f == "1") {
            $a(e, 1)
        } else {
            $a(e)
        }
        showProc(d, false)
    })
}
function getSimilarArticle(a) {
    $.post("/ajax.ashx?action=getsmilararticle&t=" + Math.random(), {
        sid: a
    },
    function(b) {
        $j("cntrSimilarArticle").html(b)
    })
}
function getLastArticle() {
    $.post("/ajax.ashx?action=getlastarticle",
    function(a) {
        $j("cntrLastArticle").html(a)
    })
}
function userFeedback(c) {
    var a = $tv("txtFdTitle");
    var b = $tv("txtFdShortDesc");
    if (a.length == 0 || b.length == 0) {
        $a("内容或标题不可为空。");
        return false
    }
    showBgProc(true, "正在提交...");
    $.post("/ajax.ashx?action=userfeedback&t=" + Math.random(), {
        title: a,
        shortDesc: b
    },
    function(f) {
        var e = gav(f, "state");
        var d = gav(f, "msg");
        if (e == "1") {
            showMsgPage("<li>您的意见提交成功，感谢您的意见，有您的支持，我们会做得更好。</li>", 1, "/user/faq.aspx", "意见/反馈", "/user/faq.aspx");
            return
        } else {
            if (d.length > 0) {
                $a(d)
            } else {
                $a(f)
            }
        }
        showBgProc(false)
    })
}
function checkAuthority(b, a) {
    $.post("/ajax.ashx?action=checkauthority&t=" + Math.random(), {
        authIDs: b
    },
    function(c) {
        if (c == "1") {
            $j("div___________Perm").hide();
            document.oncontextmenu = function() {
                return true
            };
            document.onselectstart = function() {
                return true
            }
        } else {
            showMsgPage("您不具有查看 " + a + " 的权限。");
            return
        }
    })
}
function IsURL(c) {
    var b = "^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var a = new RegExp(b);
    if (a.test(c)) {
        return (true)
    } else {
        return (false)
    }
}
function sendInvitation(c) {
    var b = $j(c);
    var a = $j("txtEmail").val();
    if (a == null || a.length == 0) {
        $a("电子邮箱地址不可为空。");
        return
    }
    if (!PTN_EMAIL.test(a)) {
        $a("电子邮箱地址格式不正确。");
        return
    }
    showProc(c);
    $.post("/ajax.ashx?action=SendInvitation&t=" + Math.random(), {
        _email: a
    },
    function(f) {
        var e = gav(f, "state");
        var d = gav(f, "msg");
        if (e == "1") {
            showMsgPage(d, 1, "/user/InviteUserList.aspx", "邀请函列表", "/user/InviteUserList.aspx")
        } else {
            $a(d);
            showProc(c, false)
        }
    })
}
function fillReportCategories() {
    $.get("/ajax.ashx?action=GetReportCategories&t=" + Math.random(),
    function(d) {
        var a = d.split("$$");
        var c = '<option value="">请选择...</option>';
        for (var b = 0; b < a.length; ++b) {
            c += '<option value="' + a[b] + '">' + a[b] + "</option>"
        }
        $j("RPT_tdCats").html('<select id="RPT_cats">' + c + "</select>")
    })
}
function fillLeavewordCategories() {
    $.get("/ajax.ashx?action=GetLeavewordCategories&t=" + Math.random(),
    function(d) {
        var a = d.split("$$");
        var c = '<option value="">请选择...</option>';
        for (var b = 0; b < a.length; ++b) {
            c += '<option value="' + a[b] + '">' + a[b] + "</option>"
        }
        $j("LEAVEWORD_tdCats").html('<select id="LEAVEWORD_cats">' + c + "</select>")
    })
}
function sendLeaveword(a) {
    var h = $j("LEAVEWORD_cats").val();
    var i = $v("LEAVEWORD_txtTitle");
    var c = $v("LEAVEWORD_txtTel");
    var f = $v("LEAVEWORD_txtMobile");
    var d = $v("LEAVEWORD_txtContact");
    var g = $v("LEAVEWORD_txtEmail");
    var e = $v("LEAVEWORD_txtShortDesc");
    var b = "";
    if (i == "") {
        b += "<li>标题不可为空</li>"
    }
    if (d == "") {
        b += "<li>联系人不可为空</li>"
    }
    if (g == "") {
        b += "<li>电子邮箱地址不可为空</li>"
    } else {
        if (!PTN_EMAIL.test(g)) {
            b += "<li>电子邮箱地址格式错误</li>"
        }
    }
    if (h == "") {
        b += "<li>留言类型必选</li>"
    }
    if (b.length > 0) {
        $a(b);
        return
    }
    showProc(a);
    $.post("/ajax.ashx?action=SendLeaveword&t=" + Math.random(), {
        title: i,
        cat: h,
        contact: d,
        email: g,
        shortDesc: e,
        tel: c,
        mobile: f
    },
    function(l) {
        var k = gav(l, "state");
        var j = gav(l, "msg");
        if (k == "1") {
            $a(j, 1)
        } else {
            $a(j)
        }
        showProc(a, false)
    })
}
function sendReprots(g) {
    var c = $j("RPT_cats").val();
    var b = document.title;
    var e = document.URL;
    var f = $v("RPT_txtContact");
    var d = $v("RPT_txtEmail");
    var a = $v("RPT_txtShortDesc");
    if (c.length == 0) {
        $a("请选择报告分类。");
        return
    }
    showProc(g);
    $.post("/ajax.ashx?action=SendReports&t=" + Math.random(), {
        title: b,
        url: e,
        cat: c,
        contact: f,
        email: d,
        shortDesc: a
    },
    function(j) {
        var i = gav(j, "state");
        var h = gav(j, "msg");
        if (i == "1") {
            $a(h, 1)
        } else {
            $a(h)
        }
        showProc(g, false)
    })
}
function getAgentHelpStatic(a) {
    $.post("/ajax.ashx?action=agenthelpsatisfaction&t=" + Math.random(), {
        oid: a
    },
    function(k) {
        var b = [parseInt(gav(k, "1")), parseInt(gav(k, "2")), parseInt(gav(k, "3"))];
        var g = b[0] + b[1] + b[2];
        if (g == 0) {
            g = 1
        }
        var f = 100;
        for (var c = 0; c < b.length; ++c) {
            var e = (b[c] / g).toFixed(2);
            var d = f * e;
            if (d == 0) {
                d = 1
            }
            var j = "<div class='static_graph' style='height:" + d + "px;'></div><div class='static_w'>" + (e * 100).toFixed(2) + "%</div>";
            $j("cntrStatic_" + c).html(j)
        }
    })
}
function submitAgentHelpUse(c, b) {
    showProc(c);
    var a = $("input[name=use]:checked").val();
    $.post("/ajax.ashx?action=agenthelpuseful&t=" + Math.random(), {
        oid: b,
        notion: a
    },
    function(d) {
        if (gav(d, "state") == "0") {
            $a(gav(d, "msg"))
        } else {
            $a(gav(d, "msg"), 1);
            getAgentHelpStatic(b)
        }
        showProc(c, false)
    })
}
function AddApply(a) {
    var b = document.getElementById("TxtType").selectedIndex;
    var c = $tv("TxtUrl");
    var e = $tv("TxtName");
    var d = $tv("TxtPhotoPath");
    var h = $tv("TxtMsg");
    var j = $tv("TxtUserName");
    var f = $tv("TxtTel");
    var g = $tv("TxtEmail");
    var i = $tv("TxtQQ");
    if (c == "" || c == "http://") {
        $a("请输入网址！", "TxtUrl");
        return
    }
    if (e == "") {
        $a("请输入网站名称！", "TxtName");
        return
    }
    if (h.length > 400) {
        $a("网站简况不能大于400字！", "txtUsername");
        return
    }
    $.post("/ajax.ashx?action=apply&t=" + Math.random(), {
        Type: b,
        Url: c,
        Name: e,
        PhotoPath: d,
        Content: h,
        UserName: j,
        Phone: f,
        Email: g,
        QQ: i
    },
    function(k) {
        if (gav(k, "state") == "1") {
            $a(gav(k, "msg"))
        } else {
            $a(gav(k, "msg"))
        }
    })
}
function addDownload(b, a) {
    $.post("/ajax.ashx?action=addDownload&t=" + Math.random(), {
        oid: b
    },
    function(c) {
        if (gav(c, "state") == "1") {
            window.location = a
        } else {
            $a(gav(c, "msg"))
        }
    })
}
function getNewProduct() {
    $.post("/ajax.ashx?action=getnewproduct&t=" + Math.random(),
    function(a) {
        $("#newpro").html(a);
        $("#newpro h5").mouseover(function() {
            $(this).addClass("cur").siblings("h5").removeClass("cur").end().next("dl").show().siblings("dl").hide()
        }).eq(0).trigger("mouseover")
    })
}
function getSubSiteInfos() {
    $.post("/ajax.ashx?action=subsiteinfos&t=" + Math.random(), {
        domain: document.domain
    },
    function(c) {
        var a = gav(c, "phone");
        var b = gav(c, "address");
        $("#phones").html(a)
    })
}
function getSubSiteInfo() {
    $.post("/ajax.ashx?action=subsiteinfo&t=" + Math.random(), {
        domain: document.domain
    },
    function(a) {
        if (a) {
            $("#site ul").html(a)
        } else {
            $("#site").remove()
        }
    })
}
