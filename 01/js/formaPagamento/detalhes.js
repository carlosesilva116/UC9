const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento/${id}`);
        const formaPagamento = await response.json();

        document.getElementById('dados-forma-pagamento').innerHTML = `
            <p><strong>ID:</strong> ${formaPagamento.id}</p>
            <p><strong>Nome:</strong> ${formaPagamento.nome}</p>
            <p><strong>Status:</strong> ${formaPagamento.status}</p>
        `;
    } catch (error) {
        document.getElementById('dados-forma-pagamento').innerHTML = `<p style="color: red;">Erro ao carregar detalhes.</p>`;
    }
}

buscarDetalhes();