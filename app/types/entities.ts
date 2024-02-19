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
    creator_id_user: string,
    creator_username: string,
    creator_avatar_url: string,
    creator_a_propos: string,
    creator_banner_url?: string,
    creator_niveau_libelle: number,
    guilde_nom: string,
    guilde_avatar_url: string,
    likes_count: number,
    user_liked_post: boolean,
    answers_count: number,
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

export type Guilde = {
    id_guilde: string,
    nom: string,
    description: string,
    created_at: string,
    avatar_url?: string,
    banner_url?: string,
    total_members: number
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