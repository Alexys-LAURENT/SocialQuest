import { getAllUsernames } from "@/utils/sitemap/getAllUsernames";
import { getAllPosts } from "@/utils/sitemap/getAllPosts";
import { getAllGuildes } from "@/utils/sitemap/getAllGuildes";
import { MetadataRoute } from "next";

const staticRoutes = [
    "/",
    "/login",
    "/messages",
    "/parametres",
    "/missions",
    "/magasin",
]


export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {

    const [allUsernames, allPosts, allGuildes] = await Promise.all([
        getAllUsernames(),
        getAllPosts(),
        getAllGuildes()
    ])

    const staticRoutesMap = staticRoutes.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}${item}`,
            lastModified: new Date(),
        } as unknown as MetadataRoute.Sitemap
    })


    const usernames = allUsernames.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${item.username}`,
            lastModified: new Date(),
        } as unknown as MetadataRoute.Sitemap
    })

    const inventaires = allUsernames.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${item.username}/inventaire`,
            lastModified: new Date(),
        } as unknown as MetadataRoute.Sitemap
    })

    const posts = allPosts.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/p/${item.id_post}`,
            lastModified: new Date(),
        } as unknown as MetadataRoute.Sitemap
    })

    const guildes = allGuildes.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/g/${item.nom}`,
            lastModified: new Date(),
        } as unknown as MetadataRoute.Sitemap
    })

    return [
        ...staticRoutesMap,
        ...usernames,
        ...inventaires,
        ...posts,
        ...guildes,
    ]
}