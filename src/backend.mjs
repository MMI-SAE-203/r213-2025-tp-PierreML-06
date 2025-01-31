import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090/_/#/collections?collection=pbc_3458190115&filter=&sort=-%40rowid");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
      //  data = ??.map((??) => {
        //    ??= ?? (??, ??);
       // return ??;
   // });
    return data;
} catch (error) {
    console.log('Une erreur est survenue en lisant la liste des maisons', error);
    return [];
}
}