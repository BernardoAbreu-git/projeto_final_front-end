import api from "../services/Api";

export default async function Delete({ route, id }) {

    try {

        const response = await api.delete(`/${route}/${id}`);

        return response.data;

    } catch (error) {

        console.log("Erro:", error);

    }

}
