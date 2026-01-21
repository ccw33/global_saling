const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface Product {
  id: number
  documentId: string
  name: string
  slug: string
  description: string
  story: string
  price: number
  stock: number
  category?: Category
  master?: Master
  images: Media[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Master {
  id: number
  documentId: string
  name: string
  slug: string
  biography: string
  photo: Media
  createdAt: string
  updatedAt: string
}

export interface Blog {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: Media
  publishedDate: string
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  url: string
  width: number
  height: number
  formats?: {
    thumbnail?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    large?: MediaFormat
  }
}

export interface MediaFormat {
  name: string
  url: string
  width: number
  height: number
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
}

async function fetchStrapi<T>(endpoint: string, locale: string = 'zh'): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}?locale=${locale}&populate=*`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }
  return response.json()
}

async function fetchStrapiSingle<T>(endpoint: string, locale: string = 'zh', params?: string): Promise<StrapiSingleResponse<T>> {
  const url = params
    ? `${STRAPI_URL}/api${endpoint}/${params}?locale=${locale}&populate=*`
    : `${STRAPI_URL}/api${endpoint}?locale=${locale}&populate=*`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }
  return response.json()
}

export async function getProducts(locale: string = 'zh', page = 1, pageSize = 6): Promise<StrapiResponse<Product>> {
  try {
    return await fetchStrapi<Product>(`/products?page=${page}&pageSize=${pageSize}`, locale)
  } catch (error) {
    console.error('Error fetching products:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize, pageCount: 0, total: 0 } } }
  }
}

export async function getProductBySlug(slug: string, locale: string = 'zh'): Promise<StrapiSingleResponse<Product> | null> {
  try {
    return await fetchStrapiSingle<Product>('/products', locale, slug)
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategories(locale: string = 'zh'): Promise<StrapiResponse<Category>> {
  try {
    return await fetchStrapi<Category>('/categories', locale)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } }
  }
}

export async function getBlogs(locale: string = 'zh', page = 1, pageSize = 3): Promise<StrapiResponse<Blog>> {
  try {
    return await fetchStrapi<Blog>(`/blogs?page=${page}&pageSize=${pageSize}&sort=publishedDate:desc`, locale)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize, pageCount: 0, total: 0 } } }
  }
}

export async function getBlogBySlug(slug: string, locale: string = 'zh'): Promise<StrapiSingleResponse<Blog> | null> {
  try {
    return await fetchStrapiSingle<Blog>('/blogs', locale, slug)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function getMasters(locale: string = 'zh'): Promise<StrapiResponse<Master>> {
  try {
    return await fetchStrapi<Master>('/masters', locale)
  } catch (error) {
    console.error('Error fetching masters:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } }
  }
}
