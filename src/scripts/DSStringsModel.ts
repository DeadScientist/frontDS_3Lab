import { sendHTTPRequest } from "./Models/HTTPWorker";
import { BACKEND_DOMAIN_URL } from "../constants/BasicConstants";

export function getAllStringsDS(increated_users_inj:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/dsstring/getall",
            data: {
                created_users_inj: increated_users_inj
            }
        })
            .then(response => {
                resolve(response.data);
            })
    });
}

export function createStringDS(inFirstName: string, inLastName: string, inAge: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/dsstring/create",
            data: {
                first_name: inFirstName,
                last_name: inLastName,
                age: inAge
            }
        })
            .then(response => {
                resolve(response.data);
            })
    });
}

export function deleteStringDS(inId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/dsstring/delete",
            data: {id: inId}
        })
            .then(response => {
                resolve(response.data);
            })
    });
}