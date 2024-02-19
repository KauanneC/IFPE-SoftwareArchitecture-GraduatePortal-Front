import axios from "axios";

const api = axios.create({ // Fixo
    baseURL: "http://localhost:8000/api/",
});

export async function changePasswordForgot(data) { // POST
    try {
        const response = await api.post("http://localhost:8000/api/auth/updatepassword", data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const statusCode = response.status;
        const responseData = response.data;
        return { statusCode, data: responseData };
    } catch (error) {
        let mensagem = "Erro ao carregar os dados";
        return { error: mensagem };
    }
}