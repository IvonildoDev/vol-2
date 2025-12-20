function calcular() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const opcao = document.getElementById('opcao').value;
    const resultadoElement = document.getElementById('resultado');

    // Validação dos campos
    if (!distancia || isNaN(distancia)) {
        alert('Por favor, digite uma distância válida em metros!');
        return;
    }

    if (!opcao) {
        alert('Por favor, selecione um diâmetro de tubo!');
        return;
    }

    let constante;
    let tuboNome;

    // Definir a constante baseada na opção
    switch (opcao) {
        case '1':
            constante = 2.019;
            tuboNome = 'Tubo 2 3/8"';
            break;
        case '2':
            constante = 3.020;
            tuboNome = 'Tubo 2 7/8"';
            break;
        case '3':
            constante = 4.531;
            tuboNome = 'Tubo 3 1/2"';
            break;
        default:
            alert("Opção inválida");
            return;
    }

    // Calcular o resultado em litros
    const resultadoLitros = (distancia * constante).toFixed();

    // Calcular o resultado em barris
    const resultadoBarris = (resultadoLitros / 159).toFixed(2);

    // Mostrar resultado com nova estilização
    resultadoElement.style.display = 'block';
    resultadoElement.innerHTML = `
        <div class="result-card">
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 10px;">Resultado para ${tuboNome} (${distancia}m)</p>
            <div class="result-value"><i class="fas fa-tint"></i> ${resultadoLitros} Litros</div>
            <div class="result-value"><i class="fas fa-oil-can"></i> ${resultadoBarris} BBL</div>
        </div>
    `;

    // Limpar campos após o cálculo (opcional - mantendo como solicitado anteriormente)
    // document.getElementById('distancia').value = '';
    // document.getElementById('opcao').value = '';
}

document.getElementById('btnLimparHistorico').addEventListener('click', function () {
    const resultadoElement = document.getElementById('resultado');
    
    // Limpar campos
    document.getElementById('distancia').value = '';
    document.getElementById('opcao').value = '';

    // Limpar o resultado e esconder container
    resultadoElement.innerHTML = '';
    resultadoElement.style.display = 'none';
});