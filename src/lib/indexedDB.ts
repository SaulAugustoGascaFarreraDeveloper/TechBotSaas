import {openDB} from "idb"

const DATABASE_NAME = "ChatBotResponses"
const STORE_NAME = "responses"
const DATABASE_VERSION = 1


export const initDB = async () => {

    /*const dbExists = await checkIfDBExist();
    if (!dbExists) {
        console.log("Database exist, skipping creation.");
        return;
    }*/

    return openDB(DATABASE_NAME,DATABASE_VERSION,{
        upgrade(db){
            if(!db.objectStoreNames.contains(STORE_NAME)){
                db.createObjectStore(STORE_NAME,{
                    keyPath: 'id',
                    autoIncrement: true
                })
            }
        }
    })
}


export const saveResponse = async (response: any) => {
    const db = await initDB()
    await db!.put(STORE_NAME,response)
}

export const getAllResponse = async () => {
    const db = await initDB()
    return db!.getAll(STORE_NAME)
}


export const deleteData = async () => {

    const dbExists = await checkIfDBExist()

    if(!dbExists)
    {
        console.log("Database does not exist, nothing to delete.");
        return
    }

    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(DATABASE_NAME);
        
        request.onsuccess = () => {
            console.log("Database deleted successfully");
            resolve(true);
        };
        
        request.onerror = (event) => {
            console.error("Error deleting database", event);
            reject(event);
        };
        
        request.onblocked = () => {
            console.log("Database deletion blocked");
        };
    });

   

}


export const checkIfDBExist = async () => {

    return new Promise((resolve,reject) => {
        const request = indexedDB.open(DATABASE_NAME)

        request.onsuccess = (event: any) => {
           
            resolve(true);
        };

        request.onerror = () => resolve(false)

        request.onupgradeneeded = () => resolve(false);
            
    })

}