"use server"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/app/types/entities'
import { User } from '@supabase/supabase-js'

export async function getAllDiscussions(userProfil: Profile, user: User) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const idsDiscussions = await supabase.from('discussions_users').select('id_discussion').eq('id_user', user?.id)
    const ids = idsDiscussions.data!.map((item: any) => item.id_discussion)
    const discussions = await supabase.from('discussions_users').select('discussions(id_discussion,nom,is_group,image_url),profiles(id_user, username, avatar_url)').in('id_discussion', ids)


    // Map pour regrouper les données par id_discussion
    const discussionMap = new Map();

    discussions.data!.forEach((item: any) => {
        const discussionId = item.discussions.id_discussion;

        // Si l'id_discussion n'est pas encore dans la map, l'ajouter avec le nom de la discussion
        if (!discussionMap.has(discussionId)) {
            discussionMap.set(discussionId, {
                id_discussion: discussionId,
                nom: item.discussions.nom,
                is_group: item.discussions.is_group,
                image_url: item.discussions.image_url,
                profiles: []
            });
        }

        // Ajouter le profil à la liste des profils de la discussion
        if (item.profiles.username !== userProfil.username) {
            discussionMap.get(discussionId).profiles.push({
                id_user: item.profiles.id_user,
                username: item.profiles.username,
                avatar_url: item.profiles.avatar_url
            });
        }
    });

    // Résultat sous forme de tableau d'objets
    const resultArray = Array.from(discussionMap.values());

    await Promise.all(
        resultArray.map(async (item: any) => {
            const { data } = await supabase
                .from('messages')
                .select('contenu, created_at')
                .eq('id_discussion', item.id_discussion)
                .order('created_at', { ascending: false })
                .limit(1);

            item.dernier_message = data![0]
        })
    );

    console.log(resultArray)

    return resultArray;
}