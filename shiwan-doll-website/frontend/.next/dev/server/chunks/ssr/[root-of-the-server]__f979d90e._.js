module.exports = [
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/client.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:9001/api") || 'http://localhost:9001/api';
class ApiClient {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    async post(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    async put(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}
const apiClient = new ApiClient();
const __TURBOPACK__default__export__ = apiClient;
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/client.js [app-rsc] (ecmascript)");
;
;
async function getProducts() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get('/products');
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
async function TestPage() {
    const productsData = await getProducts();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "前后端通信测试"
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    marginBottom: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "API 状态"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "API 地址: ",
                            ("TURBOPACK compile-time value", "http://localhost:9001/api")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: 'green'
                        },
                        children: "✓ 后端连接正常"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    marginBottom: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "商品列表"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    productsData.products && productsData.products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '20px'
                        },
                        children: productsData.products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    border: '1px solid #ddd',
                                    padding: '15px',
                                    borderRadius: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            margin: '0 0 10px 0'
                                        },
                                        children: product.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#666',
                                            margin: '0'
                                        },
                                        children: [
                                            product.description.substring(0, 100),
                                            "..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#e53e3e',
                                            margin: '10px 0 0 0'
                                        },
                                        children: [
                                            "¥",
                                            product.price.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                        lineNumber: 34,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, product.id, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 31,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "暂无商品数据"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "请通过后端 API 添加商品数据"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "分页信息"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    productsData.pagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "当前页: ",
                                    productsData.pagination.page
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "每页数量: ",
                                    productsData.pagination.limit
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "总商品数: ",
                                    productsData.pagination.total
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "总页数: ",
                                    productsData.pagination.totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/api-test/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f979d90e._.js.map