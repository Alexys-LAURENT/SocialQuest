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


export type DiscussionTab = {

    id_discussion: string,
    nom: string,
    is_group: boolean,
    image_url?: string,
    created_by: string,
    profiles:
    {
        id_user: string,
        username: string,
        avatar_url?: string
    }[],
    dernier_message?: {
        contenu: string,
        created_at: string
    }

}

export type Message = {
    id_message: string,
    created_at: string,
    id_user: string,
    contenu: string,
    isDeleted: boolean,
    profiles: {
        username: string
    }
}

export type ProfileInDiscussion = {
    id_user: string,
    username: string,
    avatar_url: string
}