import api from "../services/Api";

export default async function Update({ route, id, data }) {

    try {

        const response = await api.put(`/${route}/${id}`, data);

        return response.data;

    } catch (error) {

        console.log("Erro:", error);

    }

}
