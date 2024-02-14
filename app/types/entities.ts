export type Profile = {
    id_user: string,
    updated_at?: string,
    username: string
    prenom: string,
    nom: string,
    a_propos?: string,
    avatar_url?: string,
    xp: number,
    social_coins: number,
    banner_url?: string,
    theme: string,
    niveaux: {
        xp_fin: number,
        libelle: number,
        xp_debut: number,
        id_niveau: string
    }
    isFollowed?: boolean
}

export type Post = {
    id_post: string,
    id_user: string,
    id_guilde?: string,
    parent?: string,
    titre?: string,
    contenu: string,
    created_at?: string,
    images?: string[]
}

export type ExtendedPost = Post & {
    profiles: {
        username: string,
        avatar_url?: string
        a_propos?: string,
        banner_url?: string
    },
    guildes: {
        nom: string,
        avatar_url?: string
    },
    likesCount: number,
    userLikedPost: boolean,
    answersCount: number,
    createdAtFormated: string,
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

export type NextReward = {
    items: {
        nom: string,
        type: string,
        damage?: number,
        id_item: string,
        image_url: string
    }
}

export type Notification = {
    id_notification: string,
    created_at: string,
    id_user: string,
    image_url?: string,
    message: string,
    is_read: boolean,
    titre?: string,
    link?: string
}

export type Item = {
    id_item_user: string,
    id_user: string,
    id_item: string,
    is_favorite?: boolean,
    is_equiped: boolean,
    items: {
        nom: string,
        id_item: string,
        created_at: string,
        type: "Bannière" | "Badge" | "Arme",
        image_url: string,
        damage?: number,
        description: string
    }
}