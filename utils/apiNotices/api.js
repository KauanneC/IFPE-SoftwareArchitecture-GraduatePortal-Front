import axios from "axios";

const api = axios.create({ // Fixo
    baseURL: "http://localhost:8000/api/"
});

export async function getNotices() { // GET
    try {
        const response = await api.get("http://localhost:8000/api/notice", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const statusCode = response.status;
        const data = response.data;
        return { statusCode, data };
    } catch (error) {
        let mensagem = "Erro ao carregar os dados";
        return mensagem;
    }
}