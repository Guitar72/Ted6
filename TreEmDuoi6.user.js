// ==UserScript==
// @name         TreEmDuoi6
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Nut Thao tac nhanh (menu: Kham lam sang, Cap nhat phien ban, Tac gia)
// @author       Auto-generated
// @match        https://quanlyskcd.medinet.org.vn/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        unsafeWindow
// @updateURL    https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.meta.js
// @downloadURL  https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Fix: lay cac class Event tu unsafeWindow de hoat dong dung trong sandbox Tampermonkey
    var _pageWin = (typeof unsafeWindow !== 'undefined' && unsafeWindow) ? unsafeWindow : window;

    // ================================================================
    //  TIEN ICH CHUNG
    // ================================================================

    function showToast(msg, type) {
        var TOAST_ID = '_ted6_toast';
        var old = document.getElementById(TOAST_ID);
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.id = TOAST_ID;
        toast.textContent = msg;
        var bg = type === 'error' ? '#c62828' : (type === 'warn' ? '#e65100' : '#1565c0');
        Object.assign(toast.style, {
            position: 'fixed', bottom: '24px', right: '24px', zIndex: '2147483647',
            background: bg, color: '#fff', padding: '12px 18px', borderRadius: '10px',
            fontFamily: 'Segoe UI, Arial, sans-serif', fontSize: '14px', fontWeight: '600',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)', maxWidth: '320px',
        });
        document.body.appendChild(toast);
        setTimeout(function () { toast.remove(); }, 3000);
    }

    // ================================================================
    //  HE THONG LICENSE
    //  - Machine ID: fingerprint trinh duyet (chi doc, khong the gia mao)
    //  - License code: do TAC GIA tao bang trang HTML rieng (secret key chi tac gia biet)
    //  - Han dung: het cuoi thang. Neu kich hoat tu ngay 20 tro di -> cong them 1 thang
    //  - Script chi VERIFY, nguoi dung KHONG the tu sinh license hop le
    // ================================================================
    var LICENSE_KEY = '_ted6_license_v1';

    function _djb2(str) {
        var h = 5381;
        for (var i = 0; i < str.length; i++) {
            h = (((h << 5) + h) ^ str.charCodeAt(i)) & 0xffffffff;
        }
        return (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
    }

    function _fpWebGL() {
        try {
            var canvas = document.createElement('canvas');
            var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'nogl';
            var dbg = gl.getExtension('WEBGL_debug_renderer_info');
            var vendor   = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)   : gl.getParameter(gl.VENDOR);
            var renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
            return (vendor || '') + '|' + (renderer || '');
        } catch (e) { return 'errgl'; }
    }

    function _fpCanvas() {
        try {
            var canvas = document.createElement('canvas');
            canvas.width = 240; canvas.height = 40;
            var ctx = canvas.getContext('2d');
            if (!ctx) return 'noctx';
            ctx.textBaseline = 'top';
            ctx.font = '15px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(0, 0, 90, 22);
            ctx.fillStyle = '#069';
            ctx.fillText('TreEmDuoi6 \u00c1\u00c2\u00caO \u0111\u1eb7c 0123', 2, 16);
            ctx.fillStyle = 'rgba(102, 200, 0, 0.65)';
            ctx.fillText('TreEmDuoi6 \u00c1\u00c2\u00caO \u0111\u1eb7c 0123', 4, 19);
            return canvas.toDataURL();
        } catch (e) { return 'errcanvas'; }
    }

    function _fpFonts() {
        try {
            if (!document.body) return 'nobody';
            var testFonts = [
                'Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Tahoma',
                'Segoe UI', 'Calibri', 'Cambria', 'Consolas', 'Comic Sans MS',
                'Vni-Times', 'VNI-Times', '.VnTime', 'UTM Avo', 'Roboto Condensed',
            ];
            var baseFonts = ['monospace', 'sans-serif', 'serif'];
            var testString = 'mmmmmmmmmmlli0123';
            var span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.left = '-9999px';
            span.style.top = '-9999px';
            span.style.fontSize = '72px';
            span.textContent = testString;
            document.body.appendChild(span);
            var baseWidths = {};
            baseFonts.forEach(function (bf) {
                span.style.fontFamily = bf;
                baseWidths[bf] = span.offsetWidth;
            });
            var detected = [];
            testFonts.forEach(function (font) {
                var found = baseFonts.some(function (bf) {
                    span.style.fontFamily = '"' + font + '", ' + bf;
                    return span.offsetWidth !== baseWidths[bf];
                });
                if (found) detected.push(font);
            });
            document.body.removeChild(span);
            return detected.join(',');
        } catch (e) { return 'errfont'; }
    }

    function getMachineId() {
        var raw = [
            navigator.platform || '',
            (screen.width || 0) + 'x' + (screen.height || 0),
            (screen.availWidth || 0) + 'x' + (screen.availHeight || 0),
            (screen.colorDepth || 0) + '',
            (window.devicePixelRatio || 1) + '',
            navigator.language || '',
            (navigator.languages || []).join(','),
            (navigator.hardwareConcurrency || 0) + '',
            (navigator.deviceMemory || 0) + '',
            (navigator.maxTouchPoints || 0) + '',
            (new Date().getTimezoneOffset()) + '',
            _fpWebGL(),
            _fpCanvas(),
            _fpFonts(),
        ].join('||');
        return 'MID-' + _djb2(raw);
    }

    function formatDDMMYYYY(date) {
        var d = String(date.getDate()).padStart(2, '0');
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var y = date.getFullYear();
        return d + '-' + m + '-' + y;
    }

    function getLicense() {
        try {
            var gmVal = GM_getValue(LICENSE_KEY, null);
            if (gmVal) return typeof gmVal === 'string' ? JSON.parse(gmVal) : gmVal;
            var raw = localStorage.getItem(LICENSE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                GM_setValue(LICENSE_KEY, parsed);
                localStorage.removeItem(LICENSE_KEY);
                return parsed;
            }
            return null;
        } catch (e) { return null; }
    }

    function saveLicense(licenseCode, expiry, tier) {
        try {
            GM_setValue(LICENSE_KEY, {
                code: licenseCode,
                expiry: expiry,
                tier: tier,
                machineId: getMachineId(),
            });
        } catch (e) {}
    }

    // Cau truc ma: 3 ky tu dau la prefix tier, 5 ky tu sau la djb2
    // PRO + djb2( machineId + '|' + YYYY-MM + '|PRO|MTT2025' )  -> het cuoi thang
    // LIT + djb2( machineId + '|' + YYYY-MM + '|LITE|MTT2025' ) -> het cuoi thang
    // LIW + djb2( machineId + '|LIWEEKLY|MTT2025' )              -> +7 ngay tu luc kich hoat
    // TRI + djb2( machineId + '|TRIAL|MTT2025' )                 -> +120 phut tu luc kich hoat
    function verifyLicenseCode(code, machineId) {
        var up = code.toUpperCase().replace(/\s/g, '');
        var prefix = up.substring(0, 3);
        var tierMap = { PRO: 'pro', LIT: 'lite', LIW: 'lite_weekly', TRI: 'trial' };
        var saltMap = { PRO: 'PRO', LIT: 'LITE', LIW: 'LIWEEKLY', TRI: 'TRIAL' };
        if (!tierMap[prefix]) return false;

        var now = new Date();

        if (prefix === 'LIW') {
            var expected = prefix + _djb2(machineId + '|LIWEEKLY|MTT2025').substring(0, 5);
            if (up !== expected) return false;
            var expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
            return { tier: 'lite_weekly', expiry: expiry };
        }

        if (prefix === 'TRI') {
            var expectedTri = prefix + _djb2(machineId + '|TRIAL|MTT2025').substring(0, 5);
            if (up !== expectedTri) return false;
            var expiryTri = new Date(now.getTime() + 120 * 60 * 1000).toISOString();
            return { tier: 'trial', expiry: expiryTri };
        }

        var ym1 = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        var prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        var ym0 = prev.getFullYear() + '-' + String(prev.getMonth() + 1).padStart(2, '0');

        for (var i = 0; i < 2; i++) {
            var ym = i === 0 ? ym1 : ym0;
            var expected = prefix + _djb2(machineId + '|' + ym + '|' + saltMap[prefix] + '|MTT2025').substring(0, 5);
            if (up === expected) {
                var parts = ym.split('-');
                var y = parseInt(parts[0]), m = parseInt(parts[1]);
                var nm = m + 1 > 12 ? 1 : m + 1;
                var ny = m + 1 > 12 ? y + 1 : y;
                var expiryDate = new Date(ny, nm - 1, 1, 0, 0, 0, 0).toISOString();
                return { tier: tierMap[prefix], expiry: expiryDate };
            }
        }
        return false;
    }

    function getLicenseTier() {
        var lic = getLicense();
        if (!lic) return null;
        if (new Date(lic.expiry) <= new Date()) return null;
        var up = (lic.code || '').toUpperCase();
        var prefix = up.substring(0, 3);
        var tierMap = { PRO: 'pro', LIT: 'lite', LIW: 'lite_weekly', TRI: 'trial' };
        return tierMap[prefix] || null;
    }

    function isLicenseValid() {
        return getLicenseTier() !== null;
    }

    // Popup nhap license code (dung ca khi chua kich hoat lan dau lan khi het han)
    function showLicensePopup() {
        var POPUP_ID = '_ted6_license_popup';
        if (document.getElementById(POPUP_ID)) return;

        var mid = getMachineId();
        var lic = getLicense();
        var isExp = lic && new Date(lic.expiry) <= new Date();

        var overlay = document.createElement('div');
        overlay.id = POPUP_ID;
        Object.assign(overlay.style, {
            position: 'fixed', inset: '0', zIndex: '2147483647',
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            backdropFilter: 'blur(5px)',
        });

        var card = document.createElement('div');
        Object.assign(card.style, {
            background: '#fff', borderRadius: '18px',
            padding: '30px 28px 26px', maxWidth: '390px', width: '92vw',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
            textAlign: 'center', position: 'relative',
        });

        var closeX = document.createElement('button');
        closeX.textContent = '\u00d7';
        Object.assign(closeX.style, {
            position: 'absolute', top: '12px', right: '16px',
            background: 'none', border: 'none', fontSize: '24px',
            cursor: 'pointer', color: '#bbb', lineHeight: '1', padding: '0',
        });
        closeX.onclick = function () { overlay.remove(); };
        card.appendChild(closeX);

        var iconEl = document.createElement('div');
        iconEl.textContent = isExp ? '\ud83d\udd12' : '\ud83d\udd11';
        Object.assign(iconEl.style, { fontSize: '44px', marginBottom: '10px' });
        card.appendChild(iconEl);

        var titleEl = document.createElement('div');
        titleEl.textContent = isExp ? 'License \u0111\u00e3 h\u1ebft h\u1ea1n' : 'Ch\u01b0a k\u00edch ho\u1ea1t';
        Object.assign(titleEl.style, {
            fontSize: '20px', fontWeight: '800',
            color: isExp ? '#c62828' : '#e65100',
            marginBottom: '6px',
        });
        card.appendChild(titleEl);

        var subMsg = document.createElement('div');
        subMsg.innerHTML = 'Vui l\u00f2ng li\u00ean h\u1ec7 t\u00e1c gi\u1ea3 \u0111\u1ec3 \u0111\u01b0\u1ee3c c\u1ea5p m\u00e3.';
        Object.assign(subMsg.style, {
            fontSize: '14px', color: '#666', lineHeight: '2', marginBottom: '18px',
        });
        card.appendChild(subMsg);

        var midBox = document.createElement('div');
        Object.assign(midBox.style, {
            background: '#f5f7fa', borderRadius: '10px',
            padding: '10px 14px', marginBottom: '16px',
            textAlign: 'left', border: '1px solid #e0e4ea',
        });
        midBox.innerHTML =
            '<div style="font-size:11px;color:#999;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">M\u00e3 m\u00e1y c\u1ee7a b\u1ea1n</div>' +
            '<div style="display:flex;align-items:center;gap:8px">' +
            '<b style="font-size:15px;color:#1565c0;letter-spacing:1px;flex:1">' + mid + '</b>' +
            '<button id="_ted6_copy_mid" style="padding:5px 10px;background:#1565c0;color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-weight:600;white-space:nowrap">\ud83d\udccb Sao ch\u00e9p</button>' +
            '</div>';
        card.appendChild(midBox);

        setTimeout(function () {
            var copyMidBtn = document.getElementById('_ted6_copy_mid');
            if (!copyMidBtn) return;
            copyMidBtn.addEventListener('click', function () {
                try { GM_setClipboard(mid); } catch (e) {
                    try {
                        var ta = document.createElement('textarea');
                        ta.value = mid; document.body.appendChild(ta);
                        ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
                    } catch (e2) {}
                }
                copyMidBtn.textContent = '\u2705 \u0110\u00e3 sao!';
                setTimeout(function () { copyMidBtn.textContent = '\ud83d\udccb Sao ch\u00e9p'; }, 1800);
            });
        }, 50);

        var divEl = document.createElement('div');
        Object.assign(divEl.style, { height: '1px', background: '#eee', marginBottom: '16px' });
        card.appendChild(divEl);

        var codeLabel = document.createElement('div');
        codeLabel.textContent = 'Nh\u1eadp m\u00e3 license \u0111\u01b0\u1ee3c c\u1ea5p:';
        Object.assign(codeLabel.style, {
            fontSize: '13px', color: '#555', marginBottom: '8px',
            textAlign: 'left', fontWeight: '600',
        });
        card.appendChild(codeLabel);

        var codeInput = document.createElement('input');
        codeInput.type = 'text';
        codeInput.placeholder = 'VD: A1B2C3D4';
        codeInput.maxLength = 20;
        Object.assign(codeInput.style, {
            width: '100%', padding: '11px 14px', border: '2px solid #ddd',
            borderRadius: '10px', fontSize: '16px', outline: 'none',
            textAlign: 'center', letterSpacing: '2px', fontWeight: '700',
            textTransform: 'uppercase', boxSizing: 'border-box', marginBottom: '6px',
        });
        codeInput.addEventListener('focus', function () { codeInput.style.borderColor = '#1565c0'; });
        codeInput.addEventListener('blur', function () { codeInput.style.borderColor = '#ddd'; });
        codeInput.addEventListener('input', function () { codeInput.value = codeInput.value.toUpperCase(); });
        card.appendChild(codeInput);

        var errEl = document.createElement('div');
        errEl.textContent = '';
        Object.assign(errEl.style, {
            fontSize: '13px', color: '#c62828', minHeight: '20px',
            marginBottom: '10px', textAlign: 'left',
        });
        card.appendChild(errEl);

        var activateBtn = document.createElement('button');
        activateBtn.textContent = '\u2705 K\u00edch ho\u1ea1t';
        Object.assign(activateBtn.style, {
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg,#1565c0,#0d47a1)',
            color: '#fff', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '800', cursor: 'pointer',
        });
        activateBtn.addEventListener('click', function () {
            var code = codeInput.value.trim().toUpperCase().replace(/\s/g, '');
            if (!code) { errEl.textContent = '\u26a0\ufe0f Vui l\u00f2ng nh\u1eadp m\u00e3!'; return; }
            var result = verifyLicenseCode(code, mid);
            if (result) {
                saveLicense(code, result.expiry, result.tier);
                var tierLabels = {
                    pro: '\ud83d\udc51 Pro', lite: '\ud83d\udcdd Lite',
                    lite_weekly: '\ud83d\udcdd Lite Weekly', trial: '\u23f3 Trial',
                };
                var tierColors = {
                    pro: '#0d47a1', lite: '#2e7d32',
                    lite_weekly: '#558b2f', trial: '#e65100',
                };
                var tierLabel = tierLabels[result.tier] || result.tier;
                var expDate = new Date(result.expiry);
                var expStr;
                if (result.tier === 'trial') {
                    expStr = '\u23f3 120 ph\u00fat (h\u1ebft l\u00fac ' +
                        expDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ')';
                } else if (result.tier === 'lite_weekly') {
                    expStr = '\u0110\u1ebfn ' + formatDDMMYYYY(expDate);
                } else {
                    var lastValidDay = new Date(expDate.getTime() - 1);
                    expStr = '\u0110\u1ebfn ' + formatDDMMYYYY(lastValidDay);
                }
                activateBtn.textContent = '\ud83c\udf89 K\u00edch ho\u1ea1t th\u00e0nh c\u00f4ng!';
                activateBtn.style.background = tierColors[result.tier] || '#1565c0';
                setTimeout(function () {
                    overlay.remove();
                    showToast('\ud83d\udd11 ' + tierLabel + ' \u2014 h\u1ea1n d\u00f9ng: ' + expStr);
                }, 1000);
            } else {
                errEl.textContent = '\u274c M\u00e3 kh\u00f4ng h\u1ee3p l\u1ec7 ho\u1eb7c sai m\u00e1y!';
                codeInput.style.borderColor = '#c62828';
                setTimeout(function () { codeInput.style.borderColor = '#ddd'; errEl.textContent = ''; }, 2500);
            }
        });
        codeInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') activateBtn.click(); });
        card.appendChild(activateBtn);

        overlay.appendChild(card);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
        setTimeout(function () { codeInput.focus(); }, 100);
    }

    // ================================================================
    //  NUT "THAO TAC NHANH" - chen ngay truoc nut "Luu", bam vao mo menu
    //  gom 2 muc: "Cap nhat phien ban" va "Tac gia"
    // ================================================================
    var BTN_ID    = '_ted6_btn';
    var WRAPPER_ID = '_ted6_wrapper';
    var MENU_ID    = '_ted6_menu';
    var CURRENT_VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) || '1.1';
    var _menuStyleInjected = false;

    function injectMenuStyle() {
        if (_menuStyleInjected || document.getElementById('_ted6_style')) return;
        _menuStyleInjected = true;
        var s = document.createElement('style');
        s.id = '_ted6_style';
        s.textContent =
            '#' + MENU_ID + '{display:none;position:fixed;z-index:2000000;background:#fff;' +
            'border:1px solid #d1d5db;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,0.22);' +
            'min-width:230px;padding:8px;flex-direction:column;gap:6px;font-family:Segoe UI, Arial, sans-serif;}' +
            '._ted6_item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;' +
            'border-width:1.5px;border-style:solid;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;' +
            'text-align:left;background:#fff;transition:opacity 0.2s,transform 0.1s;}' +
            '._ted6_item:hover{opacity:0.78;transform:translateX(2px);}' +
            '._ted6_item:active{transform:scale(0.97);}';
        document.head.appendChild(s);
    }

    // ---- Cau hinh nguon kiem tra cap nhat ----
    var UPDATE_RAW_URL  = 'https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.user.js';
    var UPDATE_META_URL = 'https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.meta.js';

    function ted6ExtractVersion(text) {
        var m = text.match(/@version\s+([\d.]+)/);
        return m ? m[1] : null;
    }
    function ted6VersionGt(a, b) {
        var pa = a.split('.').map(Number);
        var pb = b.split('.').map(Number);
        for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
            var na = pa[i] || 0, nb = pb[i] || 0;
            if (na > nb) return true;
            if (na < nb) return false;
        }
        return false;
    }
    // Doc khoi "==Changelog==" ... "==/Changelog==" trong file meta - moi
    // dong dang: // X.Y.Z | YYYY-MM-DD | Mo ta 1 \u2022 Mo ta 2 ...
    function ted6ExtractChangelog(text) {
        var block = text.match(/==Changelog==([\s\S]*?)==\/Changelog==/);
        if (!block) return [];
        var entries = [];
        block[1].split('\n').forEach(function (line) {
            var m = line.match(/^\s*\/\/\s*([\d.]+)\s*\|\s*([^|]*)\|\s*(.+?)\s*$/);
            if (m) entries.push({ version: m[1], date: m[2].trim(), desc: m[3].trim() });
        });
        return entries;
    }
    function ted6EscHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function ted6BuildChangelogHtml(entries, curVer) {
        var newer = entries.filter(function (e) { return ted6VersionGt(e.version, curVer); });
        if (!newer.length) return '';
        return newer.map(function (e) {
            var items = e.desc.split('\u2022').map(function (s) { return s.trim(); }).filter(Boolean);
            return '<div style="margin-bottom:10px">' +
                '<div style="font-weight:700;color:#0369a1;font-size:13px;margin-bottom:4px">' +
                    '\ud83c\udd95 v' + ted6EscHtml(e.version) + (e.date ? ' \u2014 ' + ted6EscHtml(e.date) : '') +
                '</div>' +
                '<ul style="margin:0;padding-left:18px;font-size:13.5px;color:#374151;line-height:1.7">' +
                    items.map(function (it) { return '<li>' + ted6EscHtml(it) + '</li>'; }).join('') +
                '</ul>' +
            '</div>';
        }).join('');
    }

    // ---- Popup "Cap nhat phien ban" ----
    function showUpdatePopup() {
        var MODAL_ID = '_ted6_update_modal';
        if (document.getElementById(MODAL_ID)) return;

        var overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        Object.assign(overlay.style, {
            position: 'fixed', inset: '0', zIndex: '9999999',
            background: 'rgba(0,0,0,0.55)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            backdropFilter: 'blur(4px)',
        });
        var card = document.createElement('div');
        Object.assign(card.style, {
            background: '#fff', borderRadius: '18px',
            padding: '0', width: '420px', maxWidth: '94vw',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            position: 'relative', overflow: 'hidden',
        });

        var header = document.createElement('div');
        Object.assign(header.style, {
            background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
            padding: '20px 24px 18px',
            display: 'flex', alignItems: 'center', gap: '12px',
        });
        var headerIcon = document.createElement('span');
        headerIcon.textContent = '\ud83d\udd04';
        Object.assign(headerIcon.style, { fontSize: '28px', lineHeight: '1' });
        var headerText = document.createElement('div');
        var headerTitle = document.createElement('div');
        headerTitle.textContent = 'C\u1eadp nh\u1eadt phi\u00ean b\u1ea3n';
        Object.assign(headerTitle.style, { fontSize: '20px', fontWeight: '700', color: '#fff', lineHeight: '1.2' });
        var headerSub = document.createElement('div');
        headerSub.textContent = 'TreEmDuoi6 Script';
        Object.assign(headerSub.style, { fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' });
        headerText.appendChild(headerTitle);
        headerText.appendChild(headerSub);
        header.appendChild(headerIcon);
        header.appendChild(headerText);
        card.appendChild(header);

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '\u00d7';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '16px',
            background: 'rgba(255,255,255,0.25)', border: 'none',
            fontSize: '22px', color: '#fff', cursor: 'pointer',
            lineHeight: '1', width: '32px', height: '32px',
            borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontWeight: '300',
        });
        closeBtn.addEventListener('mouseenter', function () { closeBtn.style.background = 'rgba(255,255,255,0.4)'; });
        closeBtn.addEventListener('mouseleave', function () { closeBtn.style.background = 'rgba(255,255,255,0.25)'; });
        closeBtn.addEventListener('click', function () { overlay.remove(); });
        card.appendChild(closeBtn);

        var body = document.createElement('div');
        Object.assign(body.style, { padding: '22px 24px 20px' });

        var verBox = document.createElement('div');
        Object.assign(verBox.style, {
            background: '#f0f9ff', border: '1px solid #bae6fd',
            borderRadius: '10px', padding: '14px 18px',
            marginBottom: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
        });
        var verLabel = document.createElement('span');
        verLabel.textContent = 'Phi\u00ean b\u1ea3n hi\u1ec7n t\u1ea1i';
        Object.assign(verLabel.style, { fontSize: '15px', color: '#374151' });
        var verValue = document.createElement('span');
        verValue.textContent = CURRENT_VERSION;
        Object.assign(verValue.style, {
            fontSize: '18px', fontWeight: '700', color: '#0369a1',
            background: '#e0f2fe', padding: '3px 12px', borderRadius: '20px',
        });
        verBox.appendChild(verLabel);
        verBox.appendChild(verValue);
        body.appendChild(verBox);

        var statusArea = document.createElement('div');
        statusArea.textContent = '\u23f3 \u0110ang ki\u1ec3m tra phi\u00ean b\u1ea3n m\u1edbi...';
        Object.assign(statusArea.style, {
            fontSize: '15px', color: '#6b7280', minHeight: '28px',
            marginBottom: '18px', lineHeight: '1.6',
            padding: '10px 14px', borderRadius: '8px',
            background: '#f9fafb', border: '1px solid #e5e7eb',
            textAlign: 'center',
        });
        body.appendChild(statusArea);

        var changelogBox = document.createElement('div');
        Object.assign(changelogBox.style, {
            display: 'none', background: '#f8fafc',
            border: '1px solid #e2e8f0', borderRadius: '10px',
            padding: '12px 14px', marginBottom: '16px',
            maxHeight: '180px', overflowY: 'auto',
        });
        body.appendChild(changelogBox);

        var installBtn = document.createElement('button');
        installBtn.textContent = '\u2b07\ufe0f C\u00e0i \u0111\u1eb7t phi\u00ean b\u1ea3n m\u1edbi';
        Object.assign(installBtn.style, {
            display: 'none', width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#fff', border: 'none', borderRadius: '10px',
            fontSize: '16px', fontWeight: '700',
            cursor: 'pointer', marginBottom: '10px',
            transition: 'filter 0.15s, transform 0.1s',
            letterSpacing: '0.3px',
        });
        installBtn.addEventListener('mouseenter', function () { installBtn.style.filter = 'brightness(1.1)'; installBtn.style.transform = 'translateY(-1px)'; });
        installBtn.addEventListener('mouseleave', function () { installBtn.style.filter = ''; installBtn.style.transform = 'translateY(0)'; });
        installBtn.addEventListener('click', function () {
            var copied = false;
            try { GM_setClipboard(UPDATE_RAW_URL); copied = true; } catch (e) {
                try {
                    var ta = document.createElement('textarea');
                    ta.value = UPDATE_RAW_URL; document.body.appendChild(ta);
                    ta.select(); document.execCommand('copy');
                    document.body.removeChild(ta);
                    copied = true;
                } catch (e2) {}
            }
            installBtn.style.display = 'none';
            var guide = document.createElement('div');
            Object.assign(guide.style, {
                background: '#fffbeb', border: '2px solid #fbbf24',
                borderRadius: '10px', padding: '14px 16px',
                marginBottom: '10px', fontSize: '14px',
                color: '#92400e', lineHeight: '2.0', textAlign: 'left',
            });
            guide.innerHTML =
                '<b style="font-size:15px">' + (copied ? '\u2705 \u0110\u00e3 copy URL!' : '\ud83d\udccb Sao ch\u00e9p URL b\u00ean d\u01b0\u1edbi') + '</b><br>' +
                '1\ufe0f\u20e3 M\u1edf trang Tampermonkey b\u00ean d\u01b0\u1edbi<br>' +
                '2\ufe0f\u20e3 M\u1ee5c <b>Import t\u1eeb URL</b> \u2192 d\u00e1n URL \u2192 <b>Import</b><br>' +
                '3\ufe0f\u20e3 Nh\u1ea5n <b>C\u00e0i \u0111\u1eb7t</b> \u2192 xong!';
            var urlBox = document.createElement('div');
            Object.assign(urlBox.style, {
                background: '#f3f4f6', border: '1px solid #d1d5db',
                borderRadius: '8px', padding: '8px 10px',
                fontSize: '12px', color: '#374151', wordBreak: 'break-all',
                marginBottom: '10px', fontFamily: 'monospace',
            });
            urlBox.textContent = UPDATE_RAW_URL;
            var openBtn = document.createElement('a');
            openBtn.href = 'https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo';
            openBtn.target = '_blank';
            openBtn.textContent = '\ud83d\udd17 M\u1edf Tampermonkey Dashboard';
            Object.assign(openBtn.style, {
                display: 'block', textAlign: 'center', padding: '10px',
                background: '#0369a1', color: '#fff', borderRadius: '8px',
                textDecoration: 'none', fontSize: '13px', fontWeight: '700',
            });
            body.insertBefore(guide, installBtn);
            body.insertBefore(urlBox, installBtn);
            body.insertBefore(openBtn, installBtn);
        });
        body.appendChild(installBtn);

        card.appendChild(body);
        overlay.appendChild(card);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);

        // ---- goi thuc te kiem tra phien ban moi ----
        var xhr = new XMLHttpRequest();
        xhr.open('GET', UPDATE_META_URL + '?_=' + Date.now(), true);
        xhr.timeout = 10000;
        xhr.onload = function () {
            if (xhr.status !== 200) {
                statusArea.textContent = '\u26a0\ufe0f Kh\u00f4ng th\u1ec3 k\u1ebft n\u1ed1i t\u1edbi ngu\u1ed3n c\u1eadp nh\u1eadt (l\u1ed7i ' + xhr.status + ').';
                return;
            }
            var remoteVersion = ted6ExtractVersion(xhr.responseText);
            if (!remoteVersion) {
                statusArea.textContent = '\u26a0\ufe0f Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c phi\u00ean b\u1ea3n t\u1eeb ngu\u1ed3n c\u1eadp nh\u1eadt.';
                return;
            }
            if (ted6VersionGt(remoteVersion, CURRENT_VERSION)) {
                statusArea.innerHTML = '\ud83c\udd95 C\u00f3 phi\u00ean b\u1ea3n m\u1edbi: <b style="color:#16a34a">' + ted6EscHtml(remoteVersion) + '</b>';
                statusArea.style.background = '#f0fdf4';
                statusArea.style.borderColor = '#86efac';
                statusArea.style.color = '#166534';
                var clHtml = ted6BuildChangelogHtml(ted6ExtractChangelog(xhr.responseText), CURRENT_VERSION);
                if (clHtml) {
                    changelogBox.innerHTML = clHtml;
                    changelogBox.style.display = 'block';
                }
                installBtn.style.display = 'block';
            } else {
                statusArea.textContent = '\u2705 B\u1ea1n \u0111ang d\u00f9ng phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t.';
                statusArea.style.background = '#f0fdf4';
                statusArea.style.borderColor = '#86efac';
                statusArea.style.color = '#166534';
            }
        };
        xhr.onerror = function () {
            statusArea.textContent = '\u274c L\u1ed7i k\u1ebft n\u1ed1i. Ki\u1ec3m tra m\u1ea1ng ho\u1eb7c th\u1eed l\u1ea1i sau.';
        };
        xhr.ontimeout = function () {
            statusArea.textContent = '\u23f1\ufe0f H\u1ebft th\u1eddi gian ch\u1edd. Th\u1eed l\u1ea1i sau.';
        };
        xhr.send();
    }

    // ---- Popup "Tac gia" ----
    function showAuthorPopup() {
        var MODAL_ID = '_ted6_author_modal';
        if (document.getElementById(MODAL_ID)) return;

        var overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.55)', zIndex: '9999999',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            backdropFilter: 'blur(3px)',
        });
        var card = document.createElement('div');
        Object.assign(card.style, {
            background: 'linear-gradient(145deg,#0d47a1 0%,#1565c0 50%,#0d47a1 100%)',
            borderRadius: '18px',
            padding: '32px 28px 26px',
            maxWidth: '380px',
            width: '90vw',
            boxShadow: '0 25px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
        });

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '\u00d7';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '16px',
            background: 'rgba(255,255,255,0.15)', border: 'none',
            borderRadius: '50%', width: '28px', height: '28px',
            color: '#fff', fontSize: '18px', cursor: 'pointer',
            lineHeight: '28px', textAlign: 'center', padding: '0',
        });
        closeBtn.addEventListener('click', function () { overlay.remove(); });
        card.appendChild(closeBtn);

        var icon = document.createElement('div');
        icon.innerHTML = '\ud83d\udc68\u200d\u2695\ufe0f';
        Object.assign(icon.style, { fontSize: '42px', marginBottom: '8px', lineHeight: '1' });
        card.appendChild(icon);

        var name = document.createElement('div');
        name.textContent = 'Ho\u00e0ng Anh Jupiter';
        Object.assign(name.style, {
            fontSize: '22px', fontWeight: '700', letterSpacing: '0.5px',
            marginBottom: '4px', color: '#ffffff',
        });
        card.appendChild(name);

        var div1 = document.createElement('div');
        Object.assign(div1.style, { height: '1px', background: 'rgba(255,255,255,0.15)', margin: '14px 0' });
        card.appendChild(div1);

        var contact = document.createElement('div');
        contact.innerHTML = '\ud83d\udce7 <a href="mailto:bsdha.btu@gmail.com" style="color:#a5b4fc;text-decoration:none;font-weight:600;">bsdha.btu@gmail.com</a>';
        Object.assign(contact.style, { fontSize: '14px', marginBottom: '10px' });
        card.appendChild(contact);

        var copy = document.createElement('div');
        copy.textContent = 'Copyright \u00a9 Hoang Anh Jupiter. All rights reserved';
        Object.assign(copy.style, { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' });
        card.appendChild(copy);

        // License info
        var licInfoBox = document.createElement('div');
        Object.assign(licInfoBox.style, {
            background: 'rgba(255,255,255,0.1)', borderRadius: '10px',
            padding: '12px 14px', marginBottom: '10px', textAlign: 'left',
        });
        var tier = getLicenseTier();
        var lic = getLicense();
        var tierBadgeMap = {
            pro: ' \ud83d\udc51 Pro', lite: ' \ud83d\udcdd Lite',
            lite_weekly: ' \ud83d\udcdd Lite Weekly', trial: ' \u23f3 Trial',
        };
        var tierBadge = tier ? (tierBadgeMap[tier] || '') : '';
        var timeStr = '';
        if (tier && lic && lic.expiry) {
            var expDate = new Date(lic.expiry);
            if (tier === 'trial') {
                var minutesLeft = Math.max(0, Math.round((expDate.getTime() - Date.now()) / 60000));
                timeStr = minutesLeft + ' ph\u00fat';
            } else {
                var daysLeft = Math.max(0, Math.ceil((expDate.getTime() - Date.now()) / 86400000));
                timeStr = daysLeft + ' ng\u00e0y';
            }
        }
        var licStatus = tier
            ? ('\ud83d\udfe2 \u0110\u00e3 k\u00edch ho\u1ea1t' + tierBadge + (timeStr ? (' \u2014 c\u00f2n <b>' + timeStr + '</b>') : ''))
            : '\ud83d\udd34 Ch\u01b0a k\u00edch ho\u1ea1t / \u0110\u00e3 h\u1ebft h\u1ea1n';
        licInfoBox.innerHTML =
            '<div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px">\ud83d\udd11 <b>License</b></div>' +
            '<div style="font-size:14px;color:#fff;margin-bottom:6px">' + licStatus + '</div>' +
            '<div style="font-size:11px;color:rgba(255,255,255,0.5);word-break:break-all">M\u00e3 m\u00e1y: ' + getMachineId() + '</div>';
        card.appendChild(licInfoBox);

        var licBtn = document.createElement('button');
        licBtn.textContent = '\ud83d\udd11 Qu\u1ea3n l\u00fd License';
        Object.assign(licBtn.style, {
            display: 'block', width: '100%', padding: '10px',
            background: 'rgba(255,255,255,0.15)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        });
        licBtn.addEventListener('click', function () {
            overlay.remove();
            showLicensePopup();
        });
        card.appendChild(licBtn);

        overlay.appendChild(card);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    }

    // ================================================================
    //  CHUC NANG: KHAM LAM SANG (tre duoi 6 tuoi) - tu dong chon nhanh
    //  cac radio option trong form "Kham lam sang"
    // ================================================================

    // Cau hinh: ten field (class tren div "h-item ...") => chi so radio
    // option can chon (dem tu 0). Mac dinh hau het chon option dau tien
    // (thuong la "Binh thuong" / "Khong"). Rieng "KhamMieng_RangSuaSauSinh"
    // chon option thu 2 ("Co").
    var KLS_FIELD_MAP = {
        'ToanTrang_MauSacDa': 0,          // Hong hao
        'Da_LongBanTay': 0,               // Binh thuong (khong nhot)
        'DauCo_Thop': 0,                  // Binh thuong
        'DauCo_KichThuoc': 0,             // Binh thuong
        'DauCo_VanDongCo': 0,             // Binh thuong
        'DauCo_KhoiBatThuong': 0,         // Khong
        'Mat_ViTri2Mat': 0,               // Binh thuong
        'Mat_DongTu': 0,                  // Binh thuong
        'Mat_MiMatKetMac': 0,             // Binh thuong
        'LacMat': 0,                      // Khong
        'Tai_TaiVaMangNhi': 0,            // Binh thuong
        'Tai_ThinhLuc': 0,                // Binh thuong
        'Tai_CoKhoiSungSauTai': 0,        // Khong
        'Tai_DauHieuChayMu': 0,           // Khong
        'Mui_HinhDang': 0,                // Binh thuong
        'ChayNuocMui': 0,                 // Khong
        'NghetMui': 0,                    // Khong
        'Hong': 0,                        // Binh thuong
        'KhamMieng_HinhDang': 0,          // Binh thuong
        'KhamMieng_RangSuaSauSinh': 1,    // Co
        'KhamMieng_HinhDangLuoi': 0,      // Binh thuong
        'KhamMieng_DinhThangLuoi': 0,     // Khong
        'KhamMieng_NamMieng': 0,          // Khong
        'KhamMieng_CamNho': 0,            // Khong
        'VetSauMangBamLoTrenRang': 0,     // Khong
        'HoHap_NhipThoKhongDeu': 0,       // Khong
        'HoHap_ThoRutLom': 0,             // Khong
        'HoHap_TiengThoBatThuong': 0,     // Khong
        'HoHap_SuyHoHap': 0,              // Khong
        'HoHap_NghePhoi': 0,              // Binh thuong
        'Tim_ViTriMomTim': 0,             // Binh thuong
        'Tim_MachNgoaiVi': 0,             // Bat ro
        'Tim_NgheTim': 0,                 // Khong
        'Bung_HinhDang': 0,               // Binh thuong
        'Bung_GanLachTo': 0,              // Khong
        'Bung_KhoiBatThuong': 0,          // Khong
        'Bung_LoHauMon': 0,               // Binh thuong
        'Bung_CoQuanSinhDucNgoai': 0,     // Binh thuong
        'CoXuong_VanDongKDX': 0,          // Khong
        'CoXuong_PhanXaBu': 0,            // Khong
        'CoXuong_PhanXaNam': 0,           // Khong
        'CoXuong_PhanXaMoro': 0,          // Khong
        'CoXuong_TruongLuc': 0,           // Binh Thuong
        'CoXuong_KhopHang': 0,            // Binh Thuong
        'CoXuong_PhanXaCo': 0,            // Binh thuong
        'CoXuong_Lung': 0,                // Binh thuong
        'CoXuong_TuChi': 0,               // Binh thuong
        'CoXuong_DangDi': 0,              // Binh thuong
        'CoXuong_DauHinhCoiXuong': 0,     // Khong
    };

    // Chon 1 option trong 1 dx-radio-group dua vao ten class cua field
    function klsSelectRadio(fieldClass, optionIndex) {
        var wrapper = document.querySelector('.h-item.' + CSS.escape(fieldClass));
        if (!wrapper) return { ok: false, reason: 'khong-tim-thay-truong' };

        var radioGroup = wrapper.querySelector('.dx-radiogroup');
        if (!radioGroup) return { ok: false, reason: 'khong-co-radiogroup' };

        var items = radioGroup.querySelectorAll('.dx-item.dx-radiobutton');
        if (!items || !items[optionIndex]) return { ok: false, reason: 'khong-co-option' };

        var target = items[optionIndex];
        if (!target.classList.contains('dx-radiobutton-checked')) {
            target.click();
        }
        return { ok: true };
    }

    function fillKhamLamSang() {
        var done = 0;
        var missed = [];

        Object.keys(KLS_FIELD_MAP).forEach(function (fieldClass) {
            var optionIndex = KLS_FIELD_MAP[fieldClass];
            var result = klsSelectRadio(fieldClass, optionIndex);
            if (result.ok) {
                done++;
            } else {
                missed.push(fieldClass + ' (' + result.reason + ')');
            }
        });

        var total = Object.keys(KLS_FIELD_MAP).length;
        console.log('[TreEmDuoi6 - Kham lam sang] Da dien ' + done + '/' + total + ' truong.');
        if (missed.length) {
            console.warn('[TreEmDuoi6] Khong xu ly duoc cac truong sau:', missed);
        }

        if (done === total) {
            showToast('\u2705 \u0110\u00e3 \u0111i\u1ec1n ' + done + '/' + total + ' tr\u01b0\u1eddng Kh\u00e1m l\u00e2m s\u00e0ng');
        } else if (done > 0) {
            showToast('\u26a0\ufe0f \u0110\u00e3 \u0111i\u1ec1n ' + done + '/' + total + ' tr\u01b0\u1eddng, thi\u1ebfu ' + missed.length + ' tr\u01b0\u1eddng (xem console)', 'warn');
        } else {
            showToast('\u274c Kh\u00f4ng t\u00ecm th\u1ea5y tr\u01b0\u1eddng n\u00e0o \u0111\u1ec3 \u0111i\u1ec1n. Ki\u1ec3m tra l\u1ea1i trang.', 'error');
        }
    }

    // ---- Dropdown menu ----
    var MENU_ITEMS = [
        { emoji: '\ud83d\udc76', label: 'Kh\u00e1m l\u00e2m s\u00e0ng', color: '#6f42c1', fn: fillKhamLamSang },
        { emoji: '\ud83d\udd04', label: 'C\u1eadp nh\u1eadt phi\u00ean b\u1ea3n', color: '#0369a1', fn: showUpdatePopup },
        { emoji: '\ud83d\udc68\u200d\u2695\ufe0f', label: 'T\u00e1c gi\u1ea3', color: '#6a1b9a', fn: showAuthorPopup },
    ];

    function getOrBuildMenu() {
        var existing = document.getElementById(MENU_ID);
        if (existing) return existing;
        injectMenuStyle();
        var menu = document.createElement('div');
        menu.id = MENU_ID;
        MENU_ITEMS.forEach(function (mi) {
            var item = document.createElement('button');
            item.className = '_ted6_item';
            item.style.borderColor = mi.color;
            item.style.color = mi.color;
            item.innerHTML = '<span style="font-size:15px">' + mi.emoji + '</span><span>' + mi.label + '</span>';
            item.addEventListener('click', function (e) {
                e.preventDefault(); e.stopPropagation();
                menu.style.display = 'none';
                mi.fn();
            });
            menu.appendChild(item);
        });
        document.body.appendChild(menu);
        return menu;
    }

    function openMenu(anchorBtn) {
        if (!isLicenseValid()) {
            showLicensePopup();
            return;
        }
        var menu = getOrBuildMenu();
        var rect = anchorBtn.getBoundingClientRect();
        var menuW = 230;
        var top = rect.bottom + 4;
        var left = rect.left;
        if (left + menuW > window.innerWidth - 8) left = rect.right - menuW;
        if (left < 4) left = 4;
        menu.style.top = top + 'px';
        menu.style.left = left + 'px';
        menu.style.display = 'flex';
    }

    document.addEventListener('click', function (e) {
        var menu = document.getElementById(MENU_ID);
        if (!menu || menu.style.display === 'none') return;
        var wrapper = document.getElementById(WRAPPER_ID);
        if (wrapper && wrapper.contains(e.target)) return;
        if (menu.contains(e.target)) return;
        menu.style.display = 'none';
    }, true);

    function buildButton() {
        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.innerHTML = '\u26a1 Thao t\u00e1c nhanh TE <6T <span style="font-size:10px;opacity:0.8">\u25bc</span>';
        btn.title = 'M\u1edf menu thao t\u00e1c nhanh';
        Object.assign(btn.style, {
            padding: '6px 14px',
            background: 'transparent',
            color: '#0369a1',
            border: '1px solid #000',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            transition: 'background 0.15s',
            flexShrink: '0',
            marginRight: '5px',
        });
        btn.addEventListener('mouseenter', function () { btn.style.background = '#e0f2fe'; });
        btn.addEventListener('mouseleave', function () { btn.style.background = 'transparent'; });
        btn.addEventListener('click', function (e) {
            e.preventDefault(); e.stopPropagation();
            var menu = document.getElementById(MENU_ID);
            if (menu && menu.style.display !== 'none') {
                menu.style.display = 'none';
            } else {
                openMenu(btn);
            }
        });

        var wrapper = document.createElement('div');
        wrapper.id = WRAPPER_ID;
        Object.assign(wrapper.style, { display: 'inline-flex', alignItems: 'center', flexShrink: '0' });
        wrapper.appendChild(btn);
        return wrapper;
    }

    // ================================================================
    //  INJECT NUT VAO CONTAINER - chen ngay TRUOC nut "Luu"
    //  Chien luoc: theo doi container moi xuat hien va inject lai ngay
    //  lap tuc (Angular co the xoa/render lai container).
    // ================================================================
    var _injectedContainers = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

    function getDirectParentInContainer(container, el) {
        var node = el;
        while (node && node.parentElement !== container) {
            node = node.parentElement;
        }
        return node || null;
    }

    function tryInjectIntoContainer(container) {
        var saveBtnEl = null;
        container.querySelectorAll('dx-button[aria-label]').forEach(function (btn) {
            if (!saveBtnEl && (btn.getAttribute('aria-label') || '').indexOf('L\u01b0u') !== -1)
                saveBtnEl = btn;
        });
        if (!saveBtnEl) return;

        if (document.getElementById(WRAPPER_ID)) return;

        var saveParent = getDirectParentInContainer(container, saveBtnEl);
        var wrapper = buildButton();
        if (saveParent && saveParent.parentElement === container) {
            container.insertBefore(wrapper, saveParent);
        } else {
            container.insertBefore(wrapper, container.firstChild);
        }
        if (_injectedContainers) _injectedContainers.add(container);
    }

    function scanForContainers() {
        document.querySelectorAll('.footer-dynamic-form_btn_container').forEach(function (container) {
            tryInjectIntoContainer(container);
        });
    }

    function init() {
        scanForContainers();
        var observer = new MutationObserver(function () {
            scanForContainers();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 300);
    } else {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 300); });
    }

})();
