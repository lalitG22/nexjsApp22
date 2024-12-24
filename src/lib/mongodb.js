import client from "./mongodbConfig.js";

let isConnected = false;

export async function connectDb() {
    /*Already connected to MongoDB */

    if (isConnected) { return client; }

    try {
        await client.connect();
        isConnected = true;
        return client;
    } catch (error) {
    }
}

export async function disconnectDb() {
    if (client && isConnected) {
        await client.close();
        isConnected = false;
    }
}
