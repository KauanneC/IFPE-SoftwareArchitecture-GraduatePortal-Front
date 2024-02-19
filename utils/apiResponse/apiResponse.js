import axios from 'axios';

const api = axios.create({  // Fixo
    baseURL: "http://localhost:8000/api/response",
});

export async function sendResponse(responseData) {
    try {
        const response = await api.post('', responseData, {
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

        let mensagem = 'Erro ao enviar resposta';
        if (error.response && error.response.data && error.response.data.message) {
            mensagem = error.response.data.message;
        }

        return { statusCode: error.response.status || 400, mensagem };
    }
}

export async function getAllResponses(userId, formType) {
    try {
        const response = await api.get(`/${userId}/${formType}`, {
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

        let mensagem = 'Erro ao retornar respostas';
        if (error.response && error.response.data && error.response.data.msg) {
            mensagem = error.response.data.msg;
        }

        return { statusCode: error.response.status || 404, mensagem };
    }
}

export async function getPdf(userId) {
    try {
        const apiUrl = `https://sua-api.com/getPdf/${userId}`; // Substitua pela URL correta
        const response = await axios.get(apiUrl, {
            responseType: 'blob', // Indica que a resposta é um blob (por exemplo, um arquivo PDF)
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf', // Indica que você aceita um PDF como resposta
            },
        });

        const statusCode = response.status;
        console.log('statusCode:', statusCode);

        if (statusCode === 200) {
            // Cria um URL para o blob e o abre em uma nova janela
            const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(pdfUrl);
        } else {
            throw new Error('Erro na requisição.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);

        let mensagem = 'Erro ao retornar PDF';
        if (error.response && error.response.data && error.response.data.msg) {
            mensagem = error.response.data.msg;
        }

        throw new Error(mensagem);
    }
}