import axios from 'axios';

const api = axios.create({  // Fixo
    baseURL: "http://localhost:8000/api/user",
});

export async function createUser(data) {
    try {
        const response = await api.post('', data, {
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

        let mensagem = 'Erro ao criar usuário';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 400, mensagem };
    }
}

export async function getUserByEmail(email) {
    try {
        const response = await api.get(`/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return { statusCode, data: response.data };
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao obter usuário por e-mail';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 404, mensagem };
    }
}

export async function removeUser(id) {
    try {
        const response = await api.delete(`/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const statusCode = response.status;
        console.log('statusCode:', statusCode);

        // Você pode retornar mais informações se necessário
        return { statusCode, data: response.data };
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao remover usuário';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 404, mensagem };
    }
}

export async function getUsersByProfile(profile, page = 1) {
    try {
        const response = await api.get(`/${profile}/${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const statusCode = response.status;
        console.log('statusCode:', statusCode);
        return { statusCode, data: response.data };
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao buscar usuários';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 404, mensagem };
    }
}