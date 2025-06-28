// Função principal para calcular o saldo de vitórias e determinar o nível do jogador
function calcularRankeadas(vitorias, derrotas) {
  // 1. Variáveis: Declarando variáveis para armazenar o saldo e o nível do jogador.
  let saldoVitorias;
  let nivel;

  // 2. Operadores: Calculando o saldo de vitórias usando o operador de subtração.
  saldoVitorias = vitorias - derrotas;

  // 3. Estruturas de Decisões (If-Else If-Else):
  // Determinando o nível do jogador com base na quantidade de vitórias.
  // Note que aqui as condições são avaliadas em ordem.

  if (vitorias < 10) {
    // Se o número de vitórias for menor que 10, o nível é Ferro.
    nivel = "Ferro";
  } else if (vitorias >= 11 && vitorias <= 20) {
    // Se o número de vitórias estiver entre 11 e 20, o nível é Bronze.
    nivel = "Bronze";
  } else if (vitorias >= 21 && vitorias <= 50) {
    // Se o número de vitórias estiver entre 21 e 50, o nível é Prata.
    nivel = "Prata";
  } else if (vitorias >= 51 && vitorias <= 80) {
    // Se o número de vitórias estiver entre 51 e 80, o nível é Ouro.
    nivel = "Ouro";
  } else if (vitorias >= 81 && vitorias <= 90) {
    // Se o número de vitórias estiver entre 81 e 90, o nível é Diamante.
    nivel = "Diamante";
  } else if (vitorias >= 91 && vitorias <= 100) {
    // Se o número de vitórias estiver entre 91 e 100, o nível é Lendário.
    nivel = "Lendário";
  } else if (vitorias >= 101) {
    // Se o número de vitórias for maior ou igual a 101, o nível é Imortal.
    nivel = "Imortal";
  } else {
    // Caso nenhuma das condições anteriores seja satisfeita (situação inesperada, como vitórias negativas),
    // definimos um nível padrão ou tratamos como erro.
    nivel = "Indefinido (verifique os valores de entrada)";
  }

  // 4. Retorno da Função:
  // Retornando um objeto com o saldo de vitórias e o nível do jogador.
  // Isso facilita a manipulação dos dois valores fora da função.
  return {
    saldo: saldoVitorias,
    nivel: nivel
  };
}

// --- Exemplos de Uso ---

// Exemplo 1: Jogador com poucas vitórias
let jogador1Vitorias = 5;
let jogador1Derrotas = 3;
let resultadoJogador1 = calcularRankeadas(jogador1Vitorias, jogador1Derrotas);
// 5. Saída: Exibindo a mensagem final para o jogador 1.
console.log(`O Herói tem de saldo de ${resultadoJogador1.saldo} e está no nível de ${resultadoJogador1.nivel}`);
// Saída esperada: "O Herói tem de saldo de 2 e está no nível de Ferro"

console.log("--------------------"); // Separador para clareza

// Exemplo 2: Jogador no nível Ouro
let jogador2Vitorias = 65;
let jogador2Derrotas = 20;
let resultadoJogador2 = calcularRankeadas(jogador2Vitorias, jogador2Derrotas);
console.log(`O Herói tem de saldo de ${resultadoJogador2.saldo} e está no nível de ${resultadoJogador2.nivel}`);
// Saída esperada: "O Herói tem de saldo de 45 e está no nível de Ouro"

console.log("--------------------"); // Separador para clareza

// Exemplo 3: Jogador no nível Imortal
let jogador3Vitorias = 120;
let jogador3Derrotas = 15;
let resultadoJogador3 = calcularRankeadas(jogador3Vitorias, jogador3Derrotas);
console.log(`O Herói tem de saldo de ${resultadoJogador3.saldo} e está no nível de ${resultadoJogador3.nivel}`);
// Saída esperada: "O Herói tem de saldo de 105 e está no nível de Imortal"

console.log("--------------------"); // Separador para clareza

// Exemplo 4: Jogador com vitórias no limite inferior de um nível (ex: Bronze)
let jogador4Vitorias = 11;
let jogador4Derrotas = 5;
let resultadoJogador4 = calcularRankeadas(jogador4Vitorias, jogador4Derrotas);
console.log(`O Herói tem de saldo de ${resultadoJogador4.saldo} e está no nível de ${resultadoJogador4.nivel}`);
// Saída esperada: "O Herói tem de saldo de 6 e está no nível de Bronze"

console.log("--------------------"); // Separador para clareza

// Exemplo 5: Simulação de laço de repetição para testar múltiplos cenários
console.log("--- Testando vários cenários com laço de repetição ---");
for (let i = 0; i <= 110; i += 10) { // Incrementa as vitórias de 10 em 10
  let vit = i;
  let der = Math.floor(i / 4); // Derrotas arbitrárias para variar o saldo
  let res = calcularRankeadas(vit, der);
  console.log(`Vitórias: ${vit}, Derrotas: ${der} -> Saldo: ${res.saldo}, Nível: ${res.nivel}`);
}
