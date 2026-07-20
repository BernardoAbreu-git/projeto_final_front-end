import api from "../services/Api";

export default async function Get({ route }) {

    try {

        const response = await api.get(`/${route}`);

        return response.data;

    } catch (error) {

        console.log("Erro: " + error);

    }

}
