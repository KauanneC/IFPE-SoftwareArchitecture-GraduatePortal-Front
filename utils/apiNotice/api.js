import axios from 'axios';

const api = axios.create({  // Fixo
    baseURL: "http://localhost:8000/api",
});

export async function createNotice(data, token) {
    console.log(data)

    try {
        const response = await api.post('/notice', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return { statusCode };
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao criar edital';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 400, mensagem };
    }
}

export async function getNotice() { 
    try {
        const response = await api.get("/notice", {
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

export async function removeNotice(id, token) { 
    try {
        const response = await api.delete(`/notice/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const statusCode = response.status;
        const mensagem = response.data.msg;
        return { statusCode, mensagem };
    } catch (error) {
        console.error('Erro na requisição:', error);
        return { statusCode: 400, mensagem }; 
    }
}