/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-512, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
var hexcase = 0;
function hex_sha512(a) {
    return rstr2hex(rstr_sha512(str2rstr_utf8(a)))
}
function hex_hmac_sha512(a, b) {
    return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(a), str2rstr_utf8(b)))
}
function sha512_vm_test() {
    return hex_sha512("abc").toLowerCase() == "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"
}
function rstr_sha512(a) {
    return binb2rstr(binb_sha512(rstr2binb(a), a.length * 8))
}
function rstr_hmac_sha512(c, f) {
    var e = rstr2binb(c);
    if (e.length > 32) {
        e = binb_sha512(e, c.length * 8)
    }
    var a = Array(32), d = Array(32);
    for (var b = 0; b < 32; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = binb_sha512(a.concat(rstr2binb(f)), 1024 + f.length * 8);
    return binb2rstr(binb_sha512(d.concat(g), 1024 + 512))
}
function rstr2hex(c) {
    try {
        hexcase
    } catch (g) {
        hexcase = 0
    }
    var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var b = "";
    var a;
    for (var d = 0; d < c.length; d++) {
        a = c.charCodeAt(d);
        b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
    }
    return b
}
function str2rstr_utf8(c) {
    var b = "";
    var d = -1;
    var a, e;
    while (++d < c.length) {
        a = c.charCodeAt(d);
        e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
        if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
            a = 65536 + ((a & 1023) << 10) + (e & 1023);
            d++
        }
        if (a <= 127) {
            b += String.fromCharCode(a)
        } else {
            if (a <= 2047) {
                b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))
            } else {
                if (a <= 65535) {
                    b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63))
                } else {
                    if (a <= 2097151) {
                        b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63))
                    }
                }
            }
        }
    }
    return b
}
function rstr2binb(b) {
    var a = Array(b.length >> 2);
    for (var c = 0; c < a.length; c++) {
        a[c] = 0
    }
    for (var c = 0; c < b.length * 8; c += 8) {
        a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (24 - c % 32)
    }
    return a
}
function binb2rstr(b) {
    var a = "";
    for (var c = 0; c < b.length * 32; c += 8) {
        a += String.fromCharCode((b[c >> 5] >>> (24 - c % 32)) & 255)
    }
    return a
}
var sha512_k;
function binb_sha512(p, A) {
    if (sha512_k == undefined) {
        sha512_k = new Array(new int64(1116352408, -685199838), new int64(1899447441, 602891725), new int64(-1245643825, -330482897), new int64(-373957723, -2121671748), new int64(961987163, -213338824), new int64(1508970993, -1241133031), new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736), new int64(-670586216, -1560083902), new int64(310598401, 1164996542), new int64(607225278, 1323610764), new int64(1426881987, -704662302), new int64(1925078388, -226784913), new int64(-2132889090, 991336113), new int64(-1680079193, 633803317), new int64(-1046744716, -815192428), new int64(-459576895, -1628353838), new int64(-272742522, 944711139), new int64(264347078, -1953704523), new int64(604807628, 2007800933), new int64(770255983, 1495990901), new int64(1249150122, 1856431235), new int64(1555081692, -1119749164), new int64(1996064986, -2096016459), new int64(-1740746414, -295247957), new int64(-1473132947, 766784016), new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340), new int64(-958395405, 1034457026), new int64(-710438585, -1828018395), new int64(113926993, -536640913), new int64(338241895, 168717936), new int64(666307205, 1188179964), new int64(773529912, 1546045734), new int64(1294757372, 1522805485), new int64(1396182291, -1651133473), new int64(1695183700, -1951439906), new int64(1986661051, 1014477480), new int64(-2117940946, 1206759142), new int64(-1838011259, 344077627), new int64(-1564481375, 1290863460), new int64(-1474664885, -1136513023), new int64(-1035236496, -789014639), new int64(-949202525, 106217008), new int64(-778901479, -688958952), new int64(-694614492, 1432725776), new int64(-200395387, 1467031594), new int64(275423344, 851169720), new int64(430227734, -1194143544), new int64(506948616, 1363258195), new int64(659060556, -544281703), new int64(883997877, -509917016), new int64(958139571, -976659869), new int64(1322822218, -482243893), new int64(1537002063, 2003034995), new int64(1747873779, -692930397), new int64(1955562222, 1575990012), new int64(2024104815, 1125592928), new int64(-2067236844, -1578062990), new int64(-1933114872, 442776044), new int64(-1866530822, 593698344), new int64(-1538233109, -561857047), new int64(-1090935817, -1295615723), new int64(-965641998, -479046869), new int64(-903397682, -366583396), new int64(-779700025, 566280711), new int64(-354779690, -840897762), new int64(-176337025, -294727304), new int64(116418474, 1914138554), new int64(174292421, -1563912026), new int64(289380356, -1090974290), new int64(460393269, 320620315), new int64(685471733, 587496836), new int64(852142971, 1086792851), new int64(1017036298, 365543100), new int64(1126000580, -1676669620), new int64(1288033470, -885112138), new int64(1501505948, -60457430), new int64(1607167915, 987167468), new int64(1816402316, 1246189591))
    }
    var q = new Array(new int64(1779033703, -205731576), new int64(-1150833019, -2067093701), new int64(1013904242, -23791573), new int64(-1521486534, 1595750129), new int64(1359893119, -1377402159), new int64(-1694144372, 725511199), new int64(528734635, -79577749), new int64(1541459225, 327033209));
    var s = new int64(0, 0), r = new int64(0, 0), J = new int64(0, 0), I = new int64(0, 0), G = new int64(0, 0), F = new int64(0, 0), E = new int64(0, 0), D = new int64(0, 0), C = new int64(0, 0), B = new int64(0, 0), m = new int64(0, 0), l = new int64(0, 0), t = new int64(0, 0), o = new int64(0, 0), z = new int64(0, 0), w = new int64(0, 0), u = new int64(0, 0);
    var v, y;
    var n = new Array(80);
    for (y = 0; y < 80; y++) {
        n[y] = new int64(0, 0)
    }
    p[A >> 5] |= 128 << (24 - (A & 31));
    p[((A + 128 >> 10) << 5) + 31] = A;
    for (y = 0; y < p.length; y += 32) {
        int64copy(J, q[0]);
        int64copy(I, q[1]);
        int64copy(G, q[2]);
        int64copy(F, q[3]);
        int64copy(E, q[4]);
        int64copy(D, q[5]);
        int64copy(C, q[6]);
        int64copy(B, q[7]);
        for (v = 0; v < 16; v++) {
            n[v].h = p[y + 2 * v];
            n[v].l = p[y + 2 * v + 1]
        }
        for (v = 16; v < 80; v++) {
            int64rrot(z, n[v - 2], 19);
            int64revrrot(w, n[v - 2], 29);
            int64shr(u, n[v - 2], 6);
            l.l = z.l ^ w.l ^ u.l;
            l.h = z.h ^ w.h ^ u.h;
            int64rrot(z, n[v - 15], 1);
            int64rrot(w, n[v - 15], 8);
            int64shr(u, n[v - 15], 7);
            m.l = z.l ^ w.l ^ u.l;
            m.h = z.h ^ w.h ^ u.h;
            int64add4(n[v], l, n[v - 7], m, n[v - 16])
        }
        for (v = 0; v < 80; v++) {
            t.l = (E.l & D.l) ^ (~E.l & C.l);
            t.h = (E.h & D.h) ^ (~E.h & C.h);
            int64rrot(z, E, 14);
            int64rrot(w, E, 18);
            int64revrrot(u, E, 9);
            l.l = z.l ^ w.l ^ u.l;
            l.h = z.h ^ w.h ^ u.h;
            int64rrot(z, J, 28);
            int64revrrot(w, J, 2);
            int64revrrot(u, J, 7);
            m.l = z.l ^ w.l ^ u.l;
            m.h = z.h ^ w.h ^ u.h;
            o.l = (J.l & I.l) ^ (J.l & G.l) ^ (I.l & G.l);
            o.h = (J.h & I.h) ^ (J.h & G.h) ^ (I.h & G.h);
            int64add5(s, B, l, t, sha512_k[v], n[v]);
            int64add(r, m, o);
            int64copy(B, C);
            int64copy(C, D);
            int64copy(D, E);
            int64add(E, F, s);
            int64copy(F, G);
            int64copy(G, I);
            int64copy(I, J);
            int64add(J, s, r)
        }
        int64add(q[0], q[0], J);
        int64add(q[1], q[1], I);
        int64add(q[2], q[2], G);
        int64add(q[3], q[3], F);
        int64add(q[4], q[4], E);
        int64add(q[5], q[5], D);
        int64add(q[6], q[6], C);
        int64add(q[7], q[7], B)
    }
    var k = new Array(16);
    for (y = 0; y < 8; y++) {
        k[2 * y] = q[y].h;
        k[2 * y + 1] = q[y].l
    }
    return k
}
function int64(b, a) {
    this.h = b;
    this.l = a
}
function int64copy(b, a) {
    b.h = a.h;
    b.l = a.l
}
function int64rrot(c, a, b) {
    c.l = (a.l >>> b) | (a.h << (32 - b));
    c.h = (a.h >>> b) | (a.l << (32 - b))
}
function int64revrrot(c, a, b) {
    c.l = (a.h >>> b) | (a.l << (32 - b));
    c.h = (a.l >>> b) | (a.h << (32 - b))
}
function int64shr(c, a, b) {
    c.l = (a.l >>> b) | (a.h << (32 - b));
    c.h = (a.h >>> b)
}
function int64add(g, b, f) {
    var d = (b.l & 65535) + (f.l & 65535);
    var c = (b.l >>> 16) + (f.l >>> 16) + (d >>> 16);
    var a = (b.h & 65535) + (f.h & 65535) + (c >>> 16);
    var e = (b.h >>> 16) + (f.h >>> 16) + (a >>> 16);
    g.l = (d & 65535) | (c << 16);
    g.h = (a & 65535) | (e << 16)
}
function int64add4(j, m, l, k, i) {
    var h = (m.l & 65535) + (l.l & 65535) + (k.l & 65535) + (i.l & 65535);
    var g = (m.l >>> 16) + (l.l >>> 16) + (k.l >>> 16) + (i.l >>> 16) + (h >>> 16);
    var f = (m.h & 65535) + (l.h & 65535) + (k.h & 65535) + (i.h & 65535) + (g >>> 16);
    var e = (m.h >>> 16) + (l.h >>> 16) + (k.h >>> 16) + (i.h >>> 16) + (f >>> 16);
    j.l = (h & 65535) | (g << 16);
    j.h = (f & 65535) | (e << 16)
}
function int64add5(l, o, n, m, k, j) {
    var i = (o.l & 65535) + (n.l & 65535) + (m.l & 65535) + (k.l & 65535) + (j.l & 65535);
    var h = (o.l >>> 16) + (n.l >>> 16) + (m.l >>> 16) + (k.l >>> 16) + (j.l >>> 16) + (i >>> 16);
    var g = (o.h & 65535) + (n.h & 65535) + (m.h & 65535) + (k.h & 65535) + (j.h & 65535) + (h >>> 16);
    var f = (o.h >>> 16) + (n.h >>> 16) + (m.h >>> 16) + (k.h >>> 16) + (j.h >>> 16) + (g >>> 16);
    l.l = (i & 65535) | (h << 16);
    l.h = (g & 65535) | (f << 16)
};