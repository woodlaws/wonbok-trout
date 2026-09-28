import type { MetadataRoute } from "next";
import { products } from "@/data/site";
import { siteUrl } from "@/data/config";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/trout","/sauce","/farm","/experience","/travel","/stories","/contact"];return [...routes.map((route)=>({url:`${siteUrl}${route}`,changeFrequency:"monthly" as const,priority:route===""?1:.7})),...products.map((product)=>({url:`${siteUrl}/products/${product.slug}`,changeFrequency:"weekly" as const,priority:.8}))]}
