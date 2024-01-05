export type Profile = {
    id_user: string,
    updated_at?: string,
    username: string
    prenom: string,
    nom: string,
    a_propos?: string,
    avatar_url?: string,
    xp: number,
    social_coin: number
    banner_url?: string
}

export type Post = {
    id_post: string,
    id_user: string,
    id_guilde?: string,
    parent?: string,
    titre?: string,
    contenu: string,
    created_at?: string
}

export type ExtendedPost = Post & {
    profiles: {
        username: string,
        avatar_url?: string
        a_propos?: string
    },
    guildes: {
        nom: string,
        avatar_url?: string
    },
    likesCount: number,
    userLikedPost: boolean,
    answersCount: number
}
