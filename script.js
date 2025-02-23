function calcular() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const opcao = document.getElementById('opcao').value;

    // Validação dos campos
    if (!distancia || isNaN(distancia)) {
        mostrarAlerta('Por favor, digite uma distância válida em metros!', 'erro');
        return;
    }

    if (!opcao) {
        mostrarAlerta('Por favor, selecione um diâmetro de tubo!', 'erro');
        return;
    }

    let resultadoBbl;
    let resultadoLitros;

    // Definir o tipo de cálculo baseado na opção
    switch (opcao) {
        case '1':
            resultadoBbl = Number(((distancia / 1000) * 2.019).toFixed(2));
            resultadoLitros = Number((resultadoBbl * 159).toFixed(2));
            break;
        case '2':
            resultadoBbl = Number(((distancia / 1000) * 3.020).toFixed(2));
            resultadoLitros = Number((resultadoBbl * 159).toFixed(2));
            break;
        case '3':
            resultadoBbl = Number(((distancia / 1000) * 4.513).toFixed(2));
            resultadoLitros = Number((resultadoBbl * 159).toFixed(2));
            break;
        default:
            mostrarAlerta("Opção inválida", 'erro');
            return;
    }

    // Mostrar resultado com ambas as unidades
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <div class="resultado-header">Resultado do Cálculo:</div>
        <div class="resultado-item">
            <i class="fas fa-drum"></i> ${resultadoBbl.toFixed(2)} BBL
        </div>
        <div class="resultado-item">
            <i class="fas fa-tint"></i> ${resultadoLitros.toFixed(2)} Litros
        </div>
    `;

    // Salvar no histórico
    salvarHistorico(distancia, opcao, resultadoBbl, resultadoLitros);

    // Limpar campos após o cálculo
    document.getElementById('distancia').value = '';
    document.getElementById('opcao').value = '';
}

function getDescricaoOpcao(opcao) {
    const descricoes = {
        '1': 'Tubo (2 2/3)',
        '2': 'Tubo (2 7/8)',
        '3': 'Tubo (3 1/2)',
    };
    return descricoes[opcao] || 'Desconhecido';
}

function salvarHistorico(distancia, opcao, resultadoBbl, resultadoLitros) {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const data = new Date().toLocaleString();

    historico.unshift({
        data,
        distancia,
        opcao: getDescricaoOpcao(opcao),
        resultadoBbl,
        resultadoLitros
    });

    localStorage.setItem('historico', JSON.stringify(historico));
    atualizarHistorico();
}

function atualizarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const historicoLista = document.getElementById('historico');
    historicoLista.innerHTML = '';

    historico.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="historico-data"><i class="far fa-clock"></i> ${item.data}</div>
            <div class="historico-info">
                <strong><i class="fas fa-ruler"></i> Distância:</strong> ${Number(item.distancia).toFixed(2)} metros
                <br>
                <strong><i class="fas fa-oil-can"></i> Tipo:</strong> ${item.opcao}
                <br>
                <strong><i class="fas fa-calculator"></i> Resultado:</strong>
                <br>
                <div class="historico-resultado">
                    <div><i class="fas fa-drum"></i> ${Number(item.resultadoBbl).toFixed(2)} BBL</div>
                    <div><i class="fas fa-tint"></i> ${Number(item.resultadoLitros).toFixed(2)} Litros</div>
                </div>
            </div>
        `;
        historicoLista.appendChild(li);
    });
}

function limparHistorico() {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        localStorage.removeItem('historico');
        atualizarHistorico();
        mostrarAlerta('Histórico limpo com sucesso!', 'sucesso');
    }
}

function mostrarAlerta(mensagem, tipo) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alerta alerta-${tipo}`;
    alertaDiv.innerHTML = `
        <i class="fas fa-${tipo === 'erro' ? 'exclamation-circle' : 'check-circle'}"></i>
        ${mensagem}
    `;
    document.body.appendChild(alertaDiv);

    setTimeout(() => {
        alertaDiv.remove();
    }, 3000);
}

// Inicialização
window.onload = function () {
    atualizarHistorico();

    const btnLimpar = document.getElementById('btnLimparHistorico');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparHistorico);
    }
};