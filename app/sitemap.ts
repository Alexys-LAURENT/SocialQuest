import { getAllUsernames } from "@/utils/sitemap/getAllUsernames";
import { getAllPosts } from "@/utils/sitemap/getAllPosts";
import { getAllGuildes } from "@/utils/sitemap/getAllGuildes";

const staticRoutes = [
    "/",
    "/login",
    "/messages",
    "/parametres",
    "/missions",
    "/magasin",
]


export default async function sitemap() {

    const [allUsernames, allPosts, allGuildes] = await Promise.all([
        getAllUsernames(),
        getAllPosts(),
        getAllGuildes()
    ])

    const staticRoutesMap = staticRoutes.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}${item}`,
            lastModified: new Date(),
        }
    })


    const usernames = allUsernames.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${item.username}`,
            lastModified: new Date(),
        }
    })

    const inventaires = allUsernames.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${item.username}/inventaire`,
            lastModified: new Date(),
        }
    })

    const posts = allPosts.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/p/${item.id_post}`,
            lastModified: new Date(),
        }
    })

    const guildes = allGuildes.map((item) => {
        return {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/g/${item.nom}`,
            lastModified: new Date(),
        }
    })

    return [
        ...staticRoutesMap,
        ...usernames,
        ...inventaires,
        ...posts,
        ...guildes,
    ]
}