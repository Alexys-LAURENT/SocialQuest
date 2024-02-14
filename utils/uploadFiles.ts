import { createClient } from "./supabase/client";

export async function uploadFiles(files: { file: File }[], bucket: string) {
    const supabase = createClient()
    var FILES_PATH = [] as string[]

    await Promise.all(files.map(async (image) => {

        const fileExt = image.file.name.split('.').pop()
        const fileName = image.file.name.split('.').slice(0, -1).join('.').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const newFileName = `${fileName}.${Math.random()}.${fileExt}`
        const filePath = `${newFileName}`

        const { data, error } = await supabase
            .storage
            .from('images_posts')
            .upload(filePath, image.file)

        if (data?.path) {
            FILES_PATH.push(data?.path)
        }

        if (error) {

            await Promise.all(FILES_PATH.map(async (path) => {
                const { data, error } = await supabase
                    .storage
                    .from('images_posts')
                    .remove([path])
                if (error) {
                    console.error(error)
                }
            }))

            console.error(error)
            return false
        }
    })
    )
    return FILES_PATH
}