const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-formapagamento');

async function carregarFormaPagamento() {
    if (!id) return;

    document.getElementById('titulo-pagina').innerText =
        'Editar Forma de Pagamento';

    try {
        const response = await fetch(
            `${API_BASE_URL}/FormasPagamento/${id}`
        );

        if (!response.ok) {
            throw new Error('Erro ao carregar forma de pagamento');
        }

        const formaPagamento = await response.json();

        document.getElementById('nome').value =
            formaPagamento.nome;

        document.getElementById('status').value =
            formaPagamento.ativo.toString();

    } catch (error) {
        console.error('Erro ao carregar forma de pagamento:', error);
        alert('Erro ao carregar os dados da forma de pagamento.');
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const statusValue = document.getElementById('status').value;

    if (!nome || statusValue === '') {
        alert('Preencha todos os campos obrigatórios.');
        return;
    }

    const ativo = statusValue === 'true';

    const formaPagamentoDados = {
        id: id ? parseInt(id) : 0,
        nome: nome,
        ativo: ativo
    };

    const method = id ? 'PUT' : 'POST';

    const url = id
        ? `${API_BASE_URL}/FormasPagamento/${id}`
        : `${API_BASE_URL}/FormasPagamento`;

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && {
                    Authorization: `Bearer ${token}`
                })
            },
            body: JSON.stringify(formaPagamentoDados)
        });

        if (!response.ok) {
            const erro = await response.text();
            console.error(erro);
            throw new Error('Erro ao salvar forma de pagamento');
        }

        alert('Forma de pagamento salva com sucesso!');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar a forma de pagamento.');
    }
});

carregarFormaPagamento();