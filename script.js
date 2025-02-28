// Add this at the beginning of your script.js file
document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('.nav-menu').classList.toggle('active');
});

function calcular() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const opcao = document.getElementById('opcao').value;

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

    // Definir a constante baseada na opção
    switch (opcao) {
        case '1':
            constante = 2.019;
            break;
        case '2':
            constante = 3.020;
            break;
        case '3':
            constante = 4.531;
            break;
        default:
            alert("Opção inválida");
            return;
    }

    // Calcular o resultado em litros
    const resultadoLitros = (distancia * constante).toFixed();

    // Calcular o resultado em barris
    const resultadoBarris = (resultadoLitros / 159).toFixed();

    // Mostrar resultado
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <div>Resultado do Cálculo:</div>
        <div>${resultadoLitros} Litros</div>
        <div>${resultadoBarris} BBL</div>
    `;

    // Limpar campos após o cálculo
    document.getElementById('distancia').value = '';
    document.getElementById('opcao').value = '';
}

document.getElementById('btnLimparHistorico').addEventListener('click', function () {
    // Limpar o histórico
    document.getElementById('historico').innerHTML = '';

    // Limpar o resultado
    document.getElementById('resultado').innerHTML = '';
});