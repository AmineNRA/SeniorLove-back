import sequelize from "../config/database.js";
import '../models/associations.js';

import Conversation from "../models/Conversation.js";
import Event from "../models/Event.js";
import Interest from "../models/Interest.js";
import Match from "../models/Match.js";
import Message from "../models/Message.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

try {
    await sequelize.sync({ force: true })

    await Profile.create({
        pseudo: "Alice60",
        gender: "Femme",
        city: "Lille",
        age: 60,
        description: "Amoureuse de la lecture et des balades en pleine nature, je recherche quelqu'un pour partager des moments paisibles et enrichissants.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/k6MYpJVd/alice60.webp"
    })

    await User.create({
        mail: "alice60@gmail.com",
        password: "admin1234",
        profile_id: 1
    });

    await Event.create({
        title: "Balade en forêt et pique-nique convivial",
        tag: "Sortie",
        description: "Venez partager une journée agréable au cœur de la nature, avec une promenade relaxante suivie d’un pique-nique entre amis.",
        date: '2024/12/12',
        time: "10:00",
        street: "Parc National de Fontainebleau",
        city: "Fontainebleau",
        postal_code: 77300,
        thumbnail_image: "https://i.ibb.co/ycK6CGpp/event1.webp",
        full_image: "https://i.ibb.co/p61fGB2G/event-detail1.png",
        max_participant: 15,
        profile_id: 1,
    });


    await Profile.create({
        pseudo: "Brigitte62",
        gender: "Femme",
        city: "Strasbourg",
        age: 62,
        description: "Artiste dans l'âme, je passe mon temps libre à peindre ou à visiter des galeries. Je suis une personne douce et créative.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/NdWLXG8B/brigitte62.webp",
    })

    await User.create({
        mail: "brigitte62@gmail.com",
        password: "admin1234",
        profile_id: 2,
    });

    await Event.create({
        title: "Atelier peinture en plein air",
        tag: "Atelier",
        description: "Exprimez votre créativité en rejoignant notre atelier de peinture en plein air, parfait pour tous les niveaux.",
        date: '2024/12/15',
        time: "14:00",
        street: "Jardin des Tuileries",
        city: "Paris",
        postal_code: "75001",
        max_participant: 10,
        thumbnail_image: "https://i.ibb.co/pBsdrvp2/event2.webp",
        full_image: "https://i.ibb.co/9mX1VPcp/event-detail2.webp",
        profile_id: 2,
    });



    await Profile.create({
        pseudo: "Claudine64",
        gender: "Femme",
        city: "Rennes",
        age: 64,
        description: "Passionnée de cuisine et de danse, j'adore organiser des dîners et des soirées animées. La joie de vivre est ma devise.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/ZzKS7CNw/claudine64.webp",
    })

    await User.create({
        mail: "claudine64@gmail.com",
        password: "admin1234",
        profile_id: 3,
    });

    await Event.create({
        title: "Soirée dansante rétro",
        tag: "Soirée",
        description: "Replongez dans les années 60 avec une soirée dansante animée par un orchestre live.",
        date: '2024/12/20',
        time: "19:00",
        street: "Salle des fêtes Saint-Jean",
        city: "Marseille",
        postal_code: "13000",
        max_participant: 50,
        thumbnail_image: "https://i.ibb.co/cK2XXpb1/event3.webp",
        full_image: "https://i.ibb.co/CKxNQ5JR/event-detail3.webp",
        profile_id: 3,
    });





    await Profile.create({
        pseudo: "Danielle66",
        gender: "Femme",
        city: "Dijon",
        age: 66,
        description: "Passionnée par la couture et le crochet, je suis une personne calme et attentionnée. Je cherche une personne pour partager des discussions profondes et sincères.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/JRRTd6XW/danielle66.webp",
    })

    await User.create({
        mail: "danielle66@gmail.com",
        password: "admin1234",
        profile_id: 4,
    });

    await Event.create({
        title: "Atelier cuisine : spécial plats régionaux",
        tag: "Atelier",
        description: "Découvrez les secrets des plats traditionnels et partagez un moment culinaire convivial.",
        date: '2024/12/10',
        time: "15:00",
        street: "Maison de la Cuisine",
        city: "Lyon",
        postal_code: "69000",
        max_participant: 12,
        thumbnail_image: "https://i.ibb.co/xtHkHmZt/event4.webp",
        full_image: "https://i.ibb.co/8CGgM1x/event-detail4.webp",
        profile_id: 4,
    });


    await Profile.create({
        pseudo: "Evelyne68",
        gender: "Femme",
        city: "Nantes",
        age: 68,
        description: "Fan de théâtre et de chant, j'adore la scène et les arts vivants. Je recherche une personne avec qui vivre des moments culturels intenses.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/KjL3jpBN/evelyne68.webp",
    })

    await User.create({
        mail: "evelyne68@gmail.com",
        password: "admin1234",
        profile_id: 5,
    });

    await Event.create({
        title: "Rencontre littéraire autour d’un café",
        tag: "Rencontre",
        description: "Partagez vos impressions sur le dernier livre que vous avez lu ou découvrez de nouvelles recommandations.",
        date: '2024/12/18',
        time: "16:00",
        street: "Café des Lettres",
        city: "Nantes",
        postal_code: "44000",
        date_validity: '2024/12/18',
        max_participant: 8,
        thumbnail_image: "https://i.ibb.co/Xr6L0LKM/event5.webp",
        full_image: "https://i.ibb.co/PGP5HmMG/event-detail5.webp",
        profile_id: 5,
    });


    await Profile.create({
        pseudo: "Françoise70",
        gender: "Femme",
        city: "Montpellier",
        age: 70,
        description: "Toujours en quête d'aventure, je suis passionnée de voyage et de danse. J'aime découvrir de nouveaux horizons et partager ma joie de vivre.",
        looking_for: "Homme",
        profile_image: "https://i.ibb.co/nM7RQrh8/francoise70.webp",
    })

    await User.create({
        mail: "francoise70@gmail.com",
        password: "admin1234",
        profile_id: 6,
    });

    await Event.create({
        title: "Atelier crochet et tricot",
        tag: "Atelier",
        description: "Perfectionnez vos techniques ou apprenez à créer vos premiers ouvrages dans une ambiance chaleureuse.",
        date: '2024/12/08',
        time: "10:00",
        street: "Centre Culturel Louise Michel",
        city: "Strasbourg",
        postal_code: "67000",
        max_participant: 10,
        thumbnail_image: "https://i.ibb.co/vxHmmnDV/event6.webp",
        full_image: "https://i.ibb.co/wT7w7Z7/event-detail6.webp",
        profile_id: 6,
    });



    await Profile.create({
        pseudo: "Albert60",
        gender: "Homme",
        city: "Lyon",
        age: 60,
        description: "Passionné par l'escalade, je suis ce qu'on peut appeler un épicurien. J'aime partager des moments simples autour d'un bon repas ou d'une balade au grand air.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/tpkSXwXF/albert60.webp",
    })

    await User.create({
        mail: "albert60@gmail.com",
        password: "admin1234",
        profile_id: 7,
    });

    await Event.create({
        title: "Visite guidée du musée des Beaux-Arts",
        tag: "Sortie",
        description: "Plongez dans l'histoire et l'art lors de cette visite guidée du musée, suivie d'une discussion conviviale.",
        date: '2024/12/14',
        time: "13:30",
        street: "Musée des Beaux-Arts",
        city: "Bordeaux",
        postal_code: "33000",
        max_participant: 20,
        thumbnail_image: "https://i.ibb.co/gbt7KD2n/event7.webp",
        full_image: "https://i.ibb.co/VpMfYJ5r/event-detail7.webp",
        profile_id: 7,
    });



    await Profile.create({
        pseudo: "Bernard62",
        gender: "Homme",
        city: "Marseille",
        age: 62,
        description: "Ancien marin, j'aime les histoires de voyages et d'aventures. Je suis quelqu'un de calme et de réfléchi, et je cherche une compagne pour partager les plaisirs simples de la vie.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/RTNQfnLM/bernard62.webp",
    })

    await User.create({
        mail: "bernard62@gmail.com",
        password: "admin1234",
        profile_id: 8,
    });

    await Event.create({
        title: "Pétanque et apéritif au bord de l’eau",
        tag: "Activité",
        description: "Rejoignez-nous pour une après-midi pétanque suivie d'un apéritif convivial au bord de la Garonne.",
        date: '2024/12/16',
        time: "14:30",
        street: "Quais de la Garonne",
        city: "Toulouse",
        postal_code: "31000",
        max_participant: 20,
        thumbnail_image: "https://i.ibb.co/svcCNDxx/event8.webp",
        full_image: "https://i.ibb.co/RpwtNT35/event-detail8.webp",
        profile_id: 8,
    });


    await Profile.create({
        pseudo: "Charles64",
        gender: "Homme",
        city: "Paris",
        age: 64,
        description: "Professeur à la retraite, je suis passionné par l'histoire et les musées. J'aime également les promenades dans les parcs et découvrir de nouvelles expositions.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/qFcxrjjs/charles64.webp",
    })

    await User.create({
        mail: "charles64@gmail.com",
        password: "admin1234",
        profile_id: 9,
    });

    await Event.create({
        title: "Atelier relaxation et méditation",
        tag: "Atelier",
        description: "Apprenez à vous détendre et à méditer pour une meilleure gestion du stress et une sérénité retrouvée.",
        date: '2024/12/22',
        time: "10:00",
        street: "Centre Bien-être Harmonie",
        city: "Nice",
        postal_code: "06000",
        max_participant: 12,
        thumbnail_image: "https://i.ibb.co/Rp3pQnVV/event9.webp",
        full_image: "https://i.ibb.co/dspFw5GL/event-detail9.webp",
        profile_id: 9,
    });


    await Profile.create({
        pseudo: "Daniel66",
        gender: "Homme",
        city: "Bordeaux",
        age: 66,
        description: "Adepte de la nature et des promenades en forêt, je suis aussi passionné de vin et de gastronomie. Je recherche quelqu'un avec qui partager des moments chaleureux.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/zTqGJdDT/daniel66.webp",
    })

    await User.create({
        mail: "daniel66@gmail.com",
        password: "admin1234",
        profile_id: 10,
    });

    await Event.create({
        title: "Soirée jeux de société",
        tag: "Soirée",
        description: "Une soirée pour jouer, partager et s’amuser autour de jeux de société classiques et modernes.",
        date: '2024/12/19',
        time: "18:00",
        street: "Salle Polyvalente Mistral",
        city: "Dijon",
        postal_code: "21000",
        max_participant: 20,
        thumbnail_image: "https://i.ibb.co/KcHknsXX/event10.webp",
        full_image: "https://i.ibb.co/Q7YfzYXS/event-detail10.webp",
        profile_id: 10,
    });


    await Profile.create({
        pseudo: "Edouard68",
        gender: "Homme",
        city: "Nice",
        age: 68,
        description: "J'ai toujours aimé les arts et la culture. Que ce soit une soirée au théâtre ou une discussion sur un roman, je suis toujours prêt à partager.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/JjKpNC0r/edouard68.webp",
    })

    await User.create({
        mail: "edouard68@gmail.com",
        password: "admin1234",
        profile_id: 11,
    });

    await Event.create({
        title: "Atelier théâtre d’improvisation",
        tag: "Atelier",
        description: "Développez votre imagination et votre spontanéité lors de cet atelier d'improvisation théâtrale.",
        date: '2024/12/11',
        time: "17:00",
        street: "Théâtre Municipal",
        city: "Lille",
        postal_code: "59000",
        max_participant: 15,
        thumbnail_image: "https://i.ibb.co/21RbcMB4/event11.webp",
        full_image: "https://i.ibb.co/HpdtLYJ5/event-detail11.webp",
        profile_id: 11,
    });


    await Profile.create({
        pseudo: "François70",
        gender: "Homme",
        city: "Toulouse",
        age: 70,
        description: "Grand-père actif, je suis toujours prêt à faire une partie de pétanque ou à jouer de la guitare. J'aime profiter des petits bonheurs de la vie.",
        looking_for: "Femme",
        profile_image: "https://i.ibb.co/5gHLX8bs/francois70.webp",
    })

    await User.create({
        mail: "francois70@gmail.com",
        password: "admin1234",
        profile_id: 12,
    });

    await Event.create({
        title: "Promenade culturelle et découverte de la ville",
        tag: "Sortie",
        description: "Explorez les lieux emblématiques et méconnus de la ville lors de cette promenade guidée.",
        date: '2024/12/13',
        time: "10:30",
        street: "Place de la Comédie",
        city: "Montpellier",
        postal_code: "34000",
        max_participant: 25,
        thumbnail_image: "https://i.ibb.co/bRK8JF6h/event12.webp",
        full_image: "https://i.ibb.co/jPjPWS3j/event-detail12.webp",
        profile_id: 12,
    });
}
catch (error) {
    console.log(error)
};