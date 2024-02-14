import { createClient } from "./supabase/client";

export async function uploadFile(files: { file: File }[], bucket: string) {
    const supabase = createClient()
    console.log(files)
    var FILES_PATH = [] as string[]
    await Promise.all(files.map(async (image) => {
        console.log(image)
        console.log(image.file)
        console.log(image.file.name)

        const fileExt = image.file.name.split('.').pop()
        const fileName = image.file.name.split('.').slice(0, -1).join('.').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const newFileName = `${fileName}.${Math.random()}.${fileExt}`
        const filePath = `${newFileName}`
        console.log(newFileName)

        const { data, error } = await supabase
            .storage
            .from('images_posts')
            .upload(filePath, image.file)

        console.log(data)
        if (data?.path) {
            console.log(data.path)
            FILES_PATH.push(data?.path)
            console.log(FILES_PATH)
        }

        if (error) {
            console.error(error)
            return false
        }
    })
    )
    return FILES_PATH
}