const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function calcularNotas(valor, opcao) {
    const notasAltaParaBaixa = [100, 50, 20, 10, 5, 2];
    const notasBaixaParaAlta = [20, 10, 5, 2];
    let restante = valor;
    let contagemNotas = {};
  
    let notas = opcao === 'alta' ? notasAltaParaBaixa : (opcao === 'baixa' ? notasBaixaParaAlta : []);
  
    for (let nota of notas) {
      contagemNotas[nota] = Math.floor(restante / nota);
      restante -= contagemNotas[nota] * nota;
    }
  
    if (restante !== 0 && opcao === 'meio') {
      return calcularNotas(valor, 'baixa');
    }
  
    if (restante !== 0) {
      console.log('Não é possível sacar o valor exato com as notas disponíveis.');
    }
  
    return contagemNotas;
  }
  
  function imprimirDistribuicaoNotas(notas) {
    for (const [nota, quantidade] of Object.entries(notas)) {
      if (quantidade > 0) {
        console.log(`➢ ${quantidade} x ${nota} reais;`);
      }
    }
  }
  
  function principal() {
    readline.question('Nome do colaborador: ', nome => {
      readline.question('Data de admissão (DD/MM/YYYY): ', dataAdmissao => {
        const tempoAdmissao = new Date(dataAdmissao.split('/').reverse().join('-'));
        const diferencaTempo = new Date() - tempoAdmissao;
        const anosTrabalhando = diferencaTempo / (1000 * 60 * 60 * 24 * 365);
  
        if (anosTrabalhando < 5) {
          console.log('Agradecemos seu interesse, mas você não atende os requisitos mínimos do programa.');
          readline.close();
          return;
        }
  
        readline.question('Salário atual: ', salario => {
          readline.question('Valor de empréstimo desejado: ', valorEmprestimo => {
            salario = parseFloat(salario);
            valorEmprestimo = parseFloat(valorEmprestimo);
  
            if (valorEmprestimo > 2 * salario || valorEmprestimo % 2 !== 0) {
              console.log('O valor do empréstimo deve ser até 2 vezes o salário e múltiplo de 2.');
              readline.close();
              return;
            }
  
            console.log(`Valor empréstimo: ${valorEmprestimo} reais`);
  
            console.log('Notas de maior valor:');
            imprimirDistribuicaoNotas(calcularNotas(valorEmprestimo, 'alta'));
  
            console.log('Notas de menor valor:');
            imprimirDistribuicaoNotas(calcularNotas(valorEmprestimo, 'baixa'));
  
            console.log('Notas meio a meio:');
            const valorMetade = valorEmprestimo / 2;
            console.log(`${valorMetade} reais em notas de maior valor:`);
            imprimirDistribuicaoNotas(calcularNotas(valorMetade, 'alta'));
            console.log(`${valorMetade} reais em notas de menor valor:`);
            imprimirDistribuicaoNotas(calcularNotas(valorMetade, 'baixa'));
  
            readline.close();
          });
        });
      });
    });
  }
  
  principal();
  