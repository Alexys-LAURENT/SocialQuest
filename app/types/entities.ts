export type Profile = {
  id_user: string;
  updated_at?: string;
  username: string;
  prenom: string;
  nom: string;
  email: string;
  a_propos?: string;
  avatar_url?: string;
  xp: number;
  social_coins: number;
  banner_url?: string;
  theme: string;
  niveaux: {
    xp_fin: number;
    libelle: number;
    xp_debut: number;
    id_niveau: string;
  };
  isFollowed?: boolean;
  followers_count: { count: number }[];
  following_count: { count: number }[];
};

export type Post = {
  id_post: string;
  id_user: string;
  id_guilde?: string;
  parent_post_id?: string;
  titre?: string;
  contenu: string;
  created_at?: string;
  images?: string[];
};

export type ExtendedPost = Post & {
  creator_id_user: string;
  creator_username: string;
  creator_avatar_url: string;
  creator_a_propos: string;
  creator_banner_url?: string;
  creator_niveau_libelle: number;
  guilde_nom: string;
  guilde_avatar_url: string;
  likes_count: number;
  user_liked_post: boolean;
  answers_count: number;
  createdAtFormated: string;
  parent_post_username?: string;
};

export type DiscussionTab = {
  id_discussion: string;
  nom: string;
  is_group: boolean;
  image_url?: string;
  created_by: string;
  profiles: {
    id_user: string;
    username: string;
    avatar_url?: string;
  }[];
  dernier_message?: {
    contenu: string;
    created_at: string;
  };
};

export type Message = {
  id_message: string;
  created_at: string;
  id_user: string;
  contenu: string;
  isDeleted: boolean;
  profiles: {
    username: string;
  };
};

export type ProfileInDiscussion = {
  id_user: string;
  username: string;
  avatar_url: string;
};

export type NextReward = {
  items: {
    nom: string;
    type: string;
    damage?: number;
    id_item: string;
    image_url: string;
  };
};

export type Notification = {
  id_notification: string;
  created_at: string;
  id_user: string;
  image_url?: string;
  message: string;
  is_read: boolean;
  titre?: string;
  link?: string;
};

export type Guilde = {
  id_guilde: string;
  nom: string;
  description: string;
  created_at: string;
  avatar_url?: string;
  banner_url?: string;
  total_members: number;
};

export type GuildePage = {
  isUserInGuilde: boolean;
  id_guilde: string;
  nom: string;
  description: string;
  avatar_url: string;
  banner_url: string;
  created_by: string;
  moderators: [
    {
      id_user: string;
    },
  ];
};

export type Moderator = { is_admin: boolean; username: string; avatar_url: string };
export type Member = { is_moderator: boolean; id_user: string; username: string; avatar_url: string };

export type Item = {
  id_item_user: string;
  id_user: string;
  id_item: string;
  is_favorite?: boolean;
  is_equiped: boolean;
  count: number;
  items: {
    nom: string;
    id_item: string;
    created_at: string;
    type: 'Bannière' | 'Badge' | 'Arme';
    image_url: string;
    damage?: number;
    description: string;
  };
};

export type shopSearchParmas = {
  name?: string | string[];
  price: string | string[];
  order?: string | string[];
  type?: string | string[];
};

export type itemShop = {
  seller_infos: {
    id_user: string;
    username: string;
    avatar_url: string;
  };
  timestamp: string;
  timestampFormatted?: string;
  prix: number;
  item_infos: {
    id_item: string;
    type: string;
    image_url: string;
    damage: number | null;
    nom: string;
    description: string;
    rarete: string;
  };
};

export type latestSale = {
  prix: number;
  timestamp: string;
  item_infos: {
    id_item: string;
    image_url: string;
    nom: string;
  };
};

export type bestSellingItem = {
  nom: string;
  image_url: string;
  description: string;
};

export type GuildWar = {
  id_guild_war: string;
  requested_at: string;
  responsed_at?: string;
  status: 'En attente' | 'En cours' | 'Refusé' | 'Terminé';
  participationsGuildWhoAsk: any[];
  participationsGuildWhoReceived: any[];
  item_1: {
    nom: string;
    image_url: string;
    rarete: string;
    type: string;
  };
  item_2?: {
    nom: string;
    image_url: string;
    rarete: string;
    type: string;
  };
  item_3?: {
    nom: string;
    image_url: string;
    rarete: string;
    type: string;
  };
  item_4?: {
    nom: string;
    image_url: string;
    rarete: string;
    type: string;
  };
  item_5?: {
    nom: string;
    image_url: string;
    rarete: string;
    type: string;
  };
  guild_who_asked_infos: {
    id_guilde: string;
    nom: string;
    avatar_url: string;
  };
  guild_who_received_infos: {
    id_guilde: string;
    nom: string;
    avatar_url: string;
  };
};

export type HebdoMission = {
  id_mission_de_la_semaine: string;
  started_at: string;
  ends_at: string;
  goal: number;
  current: number;
  libelle: string;
  rpc_name: string;
  items_info: MissionItemInfos[];
  done: boolean;
};

export type EternalMission = {
  id_missions: string;
  goal: number;
  current: number;
  libelle: string;
  rpc_name: string;
  items_info: MissionItemInfos[];
  done: boolean;
};

export type MissionItemInfos = {
  nom: string;
  type: string;
  image_url: string;
};
