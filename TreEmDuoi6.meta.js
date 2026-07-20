// ==UserScript==
// @name         TreEmDuoi6
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Nut Thao tac nhanh (menu: Kham lam sang, Cap nhat phien ban, Tac gia)
// @author       Auto-generated
// @match        https://quanlyskcd.medinet.org.vn/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_openInTab
// @grant        unsafeWindow
// @updateURL    https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.meta.js
// @downloadURL  https://raw.githubusercontent.com/Guitar72/Ted6/refs/heads/main/TreEmDuoi6.user.js
// ==/UserScript==

// ==Changelog==
// 1.5 | 2026-07-20 | Đổi 3 mục Phản xạ bú / Phản xạ nắm / Phản xạ Moro trong "Khám lâm sàng" thành "Có"
// 1.4 | 2026-07-20 | Đổi tên nút thành "Thao tác nhanh TE <6T", cố định vị trí luôn ngay trước nút "Lưu" (không bị nhảy ra sau nữa)
// 1.3 | 2026-07-19 | Nút cài đặt phiên bản mới giờ mở thẳng Tampermonkey > Tiện ích (GM_openInTab), URL đã tự động copy sẵn
// 1.2 | 2026-07-19 | Thêm mục "Khám lâm sàng" tự động chọn 48 trường radio trong form Khám lâm sàng trẻ dưới 6 tuổi
// 1.1 | 2026-07-19 | Đổi nút về lại "Thao tác nhanh" dạng dropdown menu với 2 mục: Cập nhật phiên bản, Tác giả
// 1.0 | 2026-07-19 | Phiên bản đầu tiên: nút chèn trước "Lưu", hệ thống license bảo mật (machine-id + mã kích hoạt)
// ==/Changelog==
