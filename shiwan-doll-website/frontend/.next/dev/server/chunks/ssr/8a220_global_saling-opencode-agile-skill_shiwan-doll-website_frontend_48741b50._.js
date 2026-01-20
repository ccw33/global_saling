module.exports = [
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/products.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productsApi",
    ()=>productsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/client.js [app-ssr] (ecmascript)");
;
const productsApi = {
    getProducts: async (params = {})=>{
        const queryParams = new URLSearchParams(params).toString();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/products${queryParams ? `?${queryParams}` : ''}`);
    },
    getProductById: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/products/${id}`);
    },
    getCategories: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/products/meta/categories');
    },
    getMasters: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/products/meta/masters');
    }
};
}),
"[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next-intl/dist/esm/development/react-client/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/use-intl/dist/esm/development/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/lib/api/products.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function ProductsPage() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])('products');
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [masters, setMasters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        category: '',
        master: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'created_at'
    });
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        limit: 24,
        total: 0,
        totalPages: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, [
        filters,
        pagination.page
    ]);
    const fetchData = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const [productsData, categoriesData, mastersData] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsApi"].getProducts({
                    ...filters,
                    page: pagination.page,
                    limit: pagination.limit
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsApi"].getCategories(),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$lib$2f$api$2f$products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productsApi"].getMasters()
            ]);
            setProducts(productsData.products || []);
            setCategories(categoriesData.categories || []);
            setMasters(mastersData.masters || []);
            setPagination(productsData.pagination || pagination);
        } catch (err) {
            setError('Failed to fetch products');
        } finally{
            setLoading(false);
        }
    };
    const handleFilterChange = (key, value)=>{
        setFilters({
            ...filters,
            [key]: value
        });
        setPagination({
            ...pagination,
            page: 1
        });
    };
    const getProductUrl = (productId)=>{
        const name = products.find((p)=>p.id === productId)?.name || 'product';
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        return `/${locale}/products/${productId}/${slug}`;
    };
    const getProductName = (product)=>{
        if (locale === 'zh-CN' || locale === 'zh-TW') {
            return locale === 'zh-TW' ? product.nameZhTw || product.name : product.name;
        }
        return product.nameEn || product.name;
    };
    const getProductDescription = (product)=>{
        if (locale === 'zh-CN' || locale === 'zh-TW') {
            return locale === 'zh-TW' ? product.descriptionZhTw || product.description : product.description;
        }
        return product.descriptionEn || product.description;
    };
    if (loading && products.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-6",
                        children: t('title')
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-lg shadow-md mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-2",
                                                children: t('filter.all')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 117,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: filters.category,
                                                onChange: (e)=>handleFilterChange('category', e.target.value),
                                                className: "w-full border border-gray-300 rounded px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: t('filter.all')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 17
                                                    }, this),
                                                    categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: category,
                                                            children: t(`filter.${category}`)
                                                        }, category, false, {
                                                            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-2",
                                                children: t('filterByMaster')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: filters.master,
                                                onChange: (e)=>handleFilterChange('master', e.target.value),
                                                className: "w-full border border-gray-300 rounded px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: t('allMasters')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 17
                                                    }, this),
                                                    masters.map((master)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: master,
                                                            children: master
                                                        }, master, false, {
                                                            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-2",
                                                children: t('priceRange')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: t('from'),
                                                        value: filters.minPrice,
                                                        onChange: (e)=>handleFilterChange('minPrice', e.target.value),
                                                        className: "w-1/2 border border-gray-300 rounded px-3 py-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        placeholder: t('to'),
                                                        value: filters.maxPrice,
                                                        onChange: (e)=>handleFilterChange('maxPrice', e.target.value),
                                                        className: "w-1/2 border border-gray-300 rounded px-3 py-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-2",
                                                children: t('sortBy')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: filters.sortBy,
                                                onChange: (e)=>handleFilterChange('sortBy', e.target.value),
                                                className: "w-full border border-gray-300 rounded px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "created_at",
                                                        children: t('sortBy')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price_asc",
                                                        children: t('priceAsc')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price_desc",
                                                        children: t('priceDesc')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFilters({
                                            category: '',
                                            master: '',
                                            minPrice: '',
                                            maxPrice: '',
                                            sortBy: 'created_at'
                                        }),
                                    className: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50",
                                    children: t('clear')
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "No products found"
                }, void 0, false, {
                    fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                    lineNumber: 201,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6",
                        children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: getProductUrl(product.id),
                                className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
                                children: [
                                    product.images && product.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-square relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: product.images[0],
                                            alt: getProductName(product),
                                            fill: true,
                                            className: "object-cover",
                                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-lg mb-2 line-clamp-2",
                                                children: getProductName(product)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 text-sm mb-3 line-clamp-2",
                                                children: getProductDescription(product)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl font-bold text-blue-600",
                                                        children: [
                                                            "¥",
                                                            product.price.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-500",
                                                        children: t(`filter.${product.category}`)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, product.id, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 207,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    pagination.totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPagination({
                                        ...pagination,
                                        page: pagination.page - 1
                                    }),
                                disabled: pagination.page === 1,
                                className: "px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-4 py-2 bg-blue-600 text-white rounded",
                                children: [
                                    pagination.page,
                                    " / ",
                                    pagination.totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MyProject$2f$global_saling$2d$opencode$2d$agile$2d$skill$2f$shiwan$2d$doll$2d$website$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPagination({
                                        ...pagination,
                                        page: pagination.page + 1
                                    }),
                                disabled: pagination.page === pagination.totalPages,
                                className: "px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                                lineNumber: 255,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
                        lineNumber: 244,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MyProject/global_saling-opencode-agile-skill/shiwan-doll-website/frontend/app/[locale]/products/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=8a220_global_saling-opencode-agile-skill_shiwan-doll-website_frontend_48741b50._.js.map