const CAPACIDADES = {
    '1': { litrosPorMetro: 2.019, nome: 'Tubo 2 3/8"' },
    '2': { litrosPorMetro: 3.020, nome: 'Tubo 2 7/8"' },
    '3': { litrosPorMetro: 4.531, nome: 'Tubo 3 1/2"' }
};
const LITROS_POR_BARRIL = 159;

const el = {
    distancia: document.getElementById('distancia'),
    opcao: document.getElementById('opcao'),
    campoDistancia: document.getElementById('campoDistancia'),
    campoTubo: document.getElementById('campoTubo'),
    erroDistancia: document.getElementById('erroDistancia'),
    erroTubo: document.getElementById('erroTubo'),
    resumo: document.getElementById('resumo'),
    litros: document.getElementById('valLitros'),
    barris: document.getElementById('valBarris'),
    linhas: document.querySelectorAll('#tabelaTubos tbody tr')
};

const fmt = (n, casas) => n.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
});

function marcarErro(campo, msgEl, msg) {
    campo.classList.toggle('invalid', Boolean(msg));
    msgEl.textContent = msg || '';
}

function destacarLinha(opcao) {
    el.linhas.forEach(tr => tr.classList.toggle('on', tr.dataset.tubo === opcao));
}

function mostrarValor(elemento, texto) {
    elemento.textContent = texto;
    elemento.classList.remove('empty', 'fresh');
    void elemento.offsetWidth; // reinicia a animação
    elemento.classList.add('fresh');
}

function calcular() {
    const distancia = parseFloat(el.distancia.value);
    const opcao = el.opcao.value;

    const distanciaOk = Number.isFinite(distancia) && distancia > 0;
    marcarErro(el.campoDistancia, el.erroDistancia,
        distanciaOk ? '' : 'Digite a profundidade em metros, maior que zero.');
    marcarErro(el.campoTubo, el.erroTubo,
        opcao ? '' : 'Selecione o diâmetro do tubo.');

    if (!distanciaOk) { el.distancia.focus(); return; }
    if (!opcao) { el.opcao.focus(); return; }

    const tubo = CAPACIDADES[opcao];
    const litros = Math.round(distancia * tubo.litrosPorMetro);
    const barris = litros / LITROS_POR_BARRIL;

    destacarLinha(opcao);
    el.resumo.textContent = `${tubo.nome} · ${fmt(distancia, distancia % 1 ? 2 : 0)} m`;
    mostrarValor(el.litros, fmt(litros, 0));
    mostrarValor(el.barris, fmt(barris, 2));
}

function limpar() {
    el.distancia.value = '';
    el.opcao.value = '';
    marcarErro(el.campoDistancia, el.erroDistancia, '');
    marcarErro(el.campoTubo, el.erroTubo, '');
    destacarLinha('');
    el.resumo.textContent = 'Aguardando dados';
    [el.litros, el.barris].forEach(v => {
        v.textContent = '––';
        v.classList.add('empty');
        v.classList.remove('fresh');
    });
    el.distancia.focus();
}

document.getElementById('formCalc').addEventListener('submit', e => {
    e.preventDefault();
    calcular();
});
document.getElementById('btnLimparHistorico').addEventListener('click', limpar);
el.opcao.addEventListener('change', () => destacarLinha(el.opcao.value));
