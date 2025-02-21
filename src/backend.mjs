import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090/");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((maison) => {
            maison.image_maison_url = db.files.getURL(maison, maison.image_maison);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await db.collection('maison').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function bySurface(surface) {
    const records = await pb.collection('maison').getFullList({
        filter: `surface > ${surface}`
    });
    return records;
}

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function getAgents() {
    try {
        return await pb.collection("agent").getFullList({
            sort: '-created'
        });
    } catch (error) {
        console.log("Une erreur est survenue en récupérant les agents", error);
        return [];
    }
}

// Récupérer un agent spécifique par son ID
export async function getAgent(id) {
    try {
        return await pb.collection("agent").getOne(id);
    } catch (error) {
        console.log("Une erreur est survenue en récupérant l'agent", error);
        return null;
    }
}

// Ajouter un nouvel agent
export async function addAgent(formData) {
    try {
        const newAgent = await pb.collection("agent").create({
            nom: formData.get("nom"),
            prenom: formData.get("prenom"),
            E_mail: formData.get("E_mail"),
        });
        return {
            success: true,
            message: "Agent ajouté avec succès !"
        };
    } catch (error) {
        console.log("Erreur lors de l'ajout de l'agent", error);
        return {
            success: false,
            message: "Une erreur est survenue lors de l'ajout de l'agent."
        };
    }
}


export async function setFavori(house) {
    await pb.collection('maison').update(house.id, { favori: !house.favori });
}
