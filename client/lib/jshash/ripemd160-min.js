/*
 * A JavaScript implementation of the RIPEMD-160 Algorithm
 * Version 2.2 Copyright Jeremy Lin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Also http://www.esat.kuleuven.ac.be/~cosicart/pdf/AB-9601/
 */
var hexcase = 0;
function hex_rmd160(a) {
    return rstr2hex(rstr_rmd160(str2rstr_utf8(a)))
}
function hex_hmac_rmd160(a, b) {
    return rstr2hex(rstr_hmac_rmd160(str2rstr_utf8(a), str2rstr_utf8(b)))
}
function rmd160_vm_test() {
    return hex_rmd160("abc").toLowerCase() == "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
}
function rstr_rmd160(a) {
    return binl2rstr(binl_rmd160(rstr2binl(a), a.length * 8))
}
function rstr_hmac_rmd160(c, f) {
    var e = rstr2binl(c);
    if (e.length > 16) {
        e = binl_rmd160(e, c.length * 8)
    }
    var a = Array(16), d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = binl_rmd160(a.concat(rstr2binl(f)), 512 + f.length * 8);
    return binl2rstr(binl_rmd160(d.concat(g), 512 + 160))
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
function rstr2binl(b) {
    var a = Array(b.length >> 2);
    for (var c = 0; c < a.length; c++) {
        a[c] = 0
    }
    for (var c = 0; c < b.length * 8; c += 8) {
        a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32)
    }
    return a
}
function binl2rstr(b) {
    var a = "";
    for (var c = 0; c < b.length * 32; c += 8) {
        a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255)
    }
    return a
}
function binl_rmd160(q, v) {
    q[v >> 5] |= 128 << (v % 32);
    q[(((v + 64) >>> 9) << 4) + 14] = v;
    var l = 1732584193;
    var k = 4023233417;
    var h = 2562383102;
    var g = 271733878;
    var f = 3285377520;
    for (var u = 0; u < q.length; u += 16) {
        var e;
        var c = l, o = k, t = h, d = g, p = f;
        var a = l, m = k, s = h, b = g, n = f;
        for (var r = 0; r <= 79; ++r) {
            e = safe_add(c, rmd160_f(r, o, t, d));
            e = safe_add(e, q[u + rmd160_r1[r]]);
            e = safe_add(e, rmd160_K1(r));
            e = safe_add(bit_rol(e, rmd160_s1[r]), p);
            c = p;
            p = d;
            d = bit_rol(t, 10);
            t = o;
            o = e;
            e = safe_add(a, rmd160_f(79 - r, m, s, b));
            e = safe_add(e, q[u + rmd160_r2[r]]);
            e = safe_add(e, rmd160_K2(r));
            e = safe_add(bit_rol(e, rmd160_s2[r]), n);
            a = n;
            n = b;
            b = bit_rol(s, 10);
            s = m;
            m = e
        }
        e = safe_add(k, safe_add(t, b));
        k = safe_add(h, safe_add(d, n));
        h = safe_add(g, safe_add(p, a));
        g = safe_add(f, safe_add(c, m));
        f = safe_add(l, safe_add(o, s));
        l = e
    }
    return[l, k, h, g, f]
}
function rmd160_f(b, a, d, c) {
    return(0 <= b && b <= 15) ? (a ^ d ^ c) : (16 <= b && b <= 31) ? (a & d) | (~a & c) : (32 <= b && b <= 47) ? (a | ~d) ^ c : (48 <= b && b <= 63) ? (a & c) | (d & ~c) : (64 <= b && b <= 79) ? a ^ (d | ~c) : "rmd160_f: j out of range"
}
function rmd160_K1(a) {
    return(0 <= a && a <= 15) ? 0 : (16 <= a && a <= 31) ? 1518500249 : (32 <= a && a <= 47) ? 1859775393 : (48 <= a && a <= 63) ? 2400959708 : (64 <= a && a <= 79) ? 2840853838 : "rmd160_K1: j out of range"
}
function rmd160_K2(a) {
    return(0 <= a && a <= 15) ? 1352829926 : (16 <= a && a <= 31) ? 1548603684 : (32 <= a && a <= 47) ? 1836072691 : (48 <= a && a <= 63) ? 2053994217 : (64 <= a && a <= 79) ? 0 : "rmd160_K2: j out of range"
}
var rmd160_r1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
var rmd160_r2 = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
var rmd160_s1 = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
var rmd160_s2 = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return(b << 16) | (c & 65535)
}
function bit_rol(a, b) {
    return(a << b) | (a >>> (32 - b))
};