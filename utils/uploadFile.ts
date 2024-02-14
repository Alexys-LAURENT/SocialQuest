import { createClient } from "./supabase/client";

export async function uploadFile (files:{file:File}[], bucket :string){
    const supabase = createClient()
    console.log(files)
    files.forEach(async (image) => {
        console.log(image)
        console.log(image.file)
        console.log(image.file.name)
    const { data, error } = await supabase
        .storage
        .from('images_posts')
        .upload(image.file.name, image.file)
        
        console.log(data)

        if (error) {
            console.error(error)
            return false
        }
    })
    return true
}