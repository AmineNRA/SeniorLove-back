import Picture from "../models/Picture.js";
import { Op } from "sequelize";
import sequelize from "../config/database.js";
import sharp from "sharp";


const imagesServices = async (pictures, type, id) => {
    try {
        //Si les images sont pour le profile on sait qu'il y a une position à respecter et qu'il n'y a pas besoin de modifier les images
        if (type === 'profile') {

            // On va séparer les images en trois tableaux
            const existingImages = [];
            const newImages = [];
            const imagesToDelete = [];
            let uploadedImages = [];

            // Pour chaque image on va vérifier si elle est nouvelle, supprimé ou existante
            pictures.forEach(picture => {
                if (picture.url === "delete") {
                    imagesToDelete.push(picture.position)
                }
                else if (picture.url.includes("base64")) {
                    picture.url = picture.url.split(";base64,").pop()
                    newImages.push(picture)
                }
                else {
                    existingImages.push(picture)
                }
            })


            // Suppression des images obsolète
            if (imagesToDelete.length > 0) {
                await Picture.destroy({
                    where: {
                        profile_id: id,
                        position: { [Op.in]: imagesToDelete }
                    }
                })
            }

            // Envoie des images sur notre cdn
            if (newImages.length > 0) {

                const resizedNewImages = await Promise.all(newImages.map(async (newImage) => {
                    const resizedImageBuffer = await sharp(Buffer.from(newImage.url, 'base64'))
                        .resize(400, 400)
                        .toBuffer();
                    newImage.url = resizedImageBuffer.toString('base64')

                    return newImage;
                }));
                console.log(resizedNewImages)
                uploadedImages = await Promise.all(resizedNewImages.map(async (image) => {
                    try {
                        const response = await fetch('https://api.imgbb.com/1/upload', {
                            method: "POST",
                            body: new URLSearchParams({
                                key: process.env.CDN,
                                image: image.url
                            })
                        });

                        if (!response.ok) {
                            throw new Error(`Erreur lors de l'upload de l'image: ${response.status}`);
                        }

                        const data = await response.json();
                        if (!data.success) {
                            throw new Error(data.error?.message || "Erreur lors de l'upload sur imgbb");
                        }

                        return { url: data.data.display_url, position: image.position };
                    } catch (error) {
                        console.error(`Erreur pour l'image à la position ${image.position}:`, error);
                        throw error;
                    }
                }));
            }

            if (uploadedImages.length > 0) {
                await Picture.bulkCreate(uploadedImages.map(img => ({
                    profile_id: id,
                    url: img.url,
                    position: img.position
                })))
            }

            return { success: true, existingImages, uploadedImages };
        }
        //Si l'image est pour l'event, il faut la modifier pour avoir l'image entière et la thumbnail image
        else if (type === 'event') {
            // Utilisation de sharp pour modifier l'image pour qu'elle soit dans les dimensions de thumbnail image
            const resizedImageBuffer = await sharp(Buffer.from(pictures, 'base64'))
                .resize(393, 360)
                .toBuffer();

            //Fetch pour envoyer nos deux images sur notre cdn
            const [fullImageResponse, thumbnailResponse] = await Promise.all([
                // Upload full_image
                fetch('https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    body: new URLSearchParams({
                        key: process.env.CDN,
                        image: pictures
                    })
                }),
                // Upload thumbnail_image
                fetch('https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    body: new URLSearchParams({
                        key: process.env.CDN,
                        image: resizedImageBuffer.toString('base64')
                    })
                })
            ]);

            // On récupère la réponse et on l'a transforme pour qu'on puisse la lire
            const [fullImageData, thumbnailData] = await Promise.all([
                fullImageResponse.json(),
                thumbnailResponse.json()
            ])

            return { fullImageResponse: fullImageData.data.display_url, thumbnailResponse: thumbnailData.data.display_url };
        }
    } catch (error) {
        console.error("Erreur lors de la gestion des images:", error);
        throw error;
    }
}

export default imagesServices;