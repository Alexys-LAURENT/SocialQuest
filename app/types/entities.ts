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
}

export type Post = {
    id_post: string,
    id_user: string,
    parent?: string,
    titre?: string,
    contenu: string,
    created_at?: string
}
