import axios from 'axios';

const api = axios.create({  // Fixo
    baseURL: "http://localhost:8000/api/forms",
});

export async function createFields(data) { // POST
    try {
        const response = await api.post('http://localhost:8000/api/forms', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return { statusCode };
    } catch (error) {
        console.error('Erro na requisição:', error);
        let mensagem = 'Erro ao criar evento';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 400, mensagem }; 
    }
}

export async function getAllFormFields(formType) {
    try {
        const response = await api.get(`/${formType}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        let mensagem = 'Erro ao retornar campos do formulário';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 404, mensagem }; 
    }
}

export async function removeFormFields(id) {
    try {
        const response = await api.delete(`/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const statusCode = response.status;
        console.log('statusCode:', statusCode);

        return { statusCode, mensagem: 'Campo removido com sucesso' };
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao remover campo';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 404, mensagem };
    }
}