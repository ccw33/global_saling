(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/i18n/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "locales",
    ()=>locales
]);
const locales = [
    'zh-CN',
    'zh-TW',
    'en'
];
const defaultLocale = 'zh-CN';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$i18n$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/i18n/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LanguageSwitcher() {
    _s();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const switchLanguage = (newLocale)=>{
        const currentPath = pathname.replace(`/${locale}`, '');
        router.push(`/${newLocale}${currentPath}`);
    };
    const localeNames = {
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en': 'English'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: locale,
                onChange: (e)=>switchLanguage(e.target.value),
                className: "appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:border-blue-500",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$i18n$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["locales"].map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: loc,
                        children: localeNames[loc]
                    }, loc, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "fill-current h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(LanguageSwitcher, "E8jaVxu5mdwpzK8S3eb/MqBQLUE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = LanguageSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LanguageSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/LanguageSwitcher.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Navbar() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('nav');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const navItems = [
        {
            key: 'home',
            href: '/'
        },
        {
            key: 'products',
            href: '/products'
        },
        {
            key: 'brand',
            href: '/brand'
        },
        {
            key: 'masters',
            href: '/masters'
        },
        {
            key: 'stories',
            href: '/stories'
        }
    ];
    const isActive = (href)=>{
        if (href === '/') {
            return pathname === `/${locale}` || pathname === '/';
        }
        return pathname.startsWith(`/${locale}${href}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-white shadow-sm border-b sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between h-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${locale}`,
                        className: "text-xl font-bold text-gray-900",
                        children: "石湾公仔"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center space-x-8",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${locale}${item.href}`,
                                className: `text-sm font-medium transition-colors ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`,
                                children: t(item.key)
                            }, item.key, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-sm text-gray-700 hover:text-blue-600",
                                children: t('contact')
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/components/Navbar.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(Navbar, "kL/iEB4e3Qm4fU4/YUSS6DQOHwI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=8a220_global_saling-opencode-agile-skill_shiwan-doll-website_frontend_4e67c209._.js.map