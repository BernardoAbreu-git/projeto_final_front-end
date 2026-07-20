import api from "../services/Api";

export default async function Create({ route, data }) {

    try {

        const response = await api.post(`/${route}`, data);

        return response.data;

    } catch (error) {

        console.log("Erro:", error);

    }

}
