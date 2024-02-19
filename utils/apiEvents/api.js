import axios from 'axios';

const api = axios.create({  // Fixo
    baseURL: "http://localhost:8000/api/events",
});

export async function createEvents(data) { // POST
    try {
        const response = await api.post('', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'aplication/json',
            },
        });
        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return { statusCode};
    } catch (error) {
        console.error('Erro na requisição:', error);
        let mensagem = 'Erro ao criar evento';
        return { statusCode: 400, mensagem }; 
    }
} 

export async function getEvents() { // GET
    try {
        const response = await api.get(" ", {
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

export async function updateEvents(id, data) {  // PUT
    try {
        const response = await api.put(`/${id}`, data);
        const statusCode = response.status;
        const responseData = response.data;
        return { statusCode, data: responseData };
    } catch (error) {
        let mensagem = "Erro ao atualizar os dados";
        return mensagem;
    }
}

export async function removeEvents(id) { // DELETE
    try {
        const response = await api.delete(`/${id}`);
        const statusCode = response.status;
        const mensagem = response.data.msg;
        return { statusCode, mensagem };
    } catch (error) {
        console.error('Erro na requisição:', error);
        return { statusCode: 400, mensagem }; 
    }
}