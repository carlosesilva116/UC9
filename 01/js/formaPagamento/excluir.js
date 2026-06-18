const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        
        const formaPagamento = await response.json();

        document.getElementById('dados-forma-pagamento').innerHTML = `
            <h3>${formaPagamento.nome}</h3>
            <p><strong>Status:</strong> ${formaPagamento.status}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-forma-pagamento').innerHTML = `<p style="color: red;">Erro ao carregar dados da forma de pagamento.</p>`;
    }
}

document.getElementById('btn-excluir').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir forma de pagamento');
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert('Erro ao excluir a forma de pagamento. Tente novamente.');
    }
});

buscarDetalhes();