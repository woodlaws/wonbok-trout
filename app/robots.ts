import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/config";
export const dynamic = "force-static";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/"},sitemap:`${siteUrl}/sitemap.xml`}}
