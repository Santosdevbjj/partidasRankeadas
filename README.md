## Formação Lógica de Programação · DIO

![DeveloperImagem001](https://github.com/user-attachments/assets/1d95b4a9-dacf-451f-9124-d1762cc752c8)

---

# 🏆 Calculadora de Partidas Rankeadas — Classificação por Saldo em JavaScript

## 1. Problema de Negócio

Sistemas competitivos precisam comunicar progresso de forma clara. Mostrar apenas o número bruto de vitórias não é suficiente — o jogador precisa saber **onde está na hierarquia** e **qual é seu saldo real**, que considera tanto as vitórias conquistadas quanto as derrotas acumuladas.

O desafio técnico é duplo: classificar o jogador com base em vitórias e calcular um saldo independente dessa classificação. Dois dados distintos, produzidos por uma única função, sem misturar responsabilidades.

---

## 2. Contexto

Este projeto foi desenvolvido como desafio prático do módulo de **Lógica de Programação** da DIO. A tarefa: construir uma calculadora que receba vitórias e derrotas de um jogador, calcule o saldo (`vitórias - derrotas`) e determine o nível na hierarquia rankeada — de Ferro a Imortal.

A decisão arquitetural central foi **separar computação de apresentação**: a função `calcularRankeadas` não exibe nada — ela retorna um objeto com os dois valores calculados, e cabe ao código chamador decidir como apresentar o resultado. Esse princípio de separação de responsabilidades é o mesmo que estrutura APIs, microsserviços e qualquer sistema que precisa ser testável e extensível.

---

## 3. Premissas

- O parâmetro `vitorias` determina o **nível** do jogador — o saldo não interfere na classificação.
- O **saldo** é calculado como `vitorias - derrotas` e representa a performance líquida do jogador, podendo ser negativo.
- As faixas de classificação seguem o enunciado do desafio:

| Vitórias | Nível |
|----------|-------|
| < 10 | Ferro |
| 11 – 20 | Bronze |
| 21 – 50 | Prata |
| 51 – 80 | Ouro |
| 81 – 90 | Diamante |
| 91 – 100 | Lendário |
| ≥ 101 | Imortal |

- O bloco `else` final captura entradas inesperadas (como vitórias negativas), retornando `"Indefinido"` em vez de falhar silenciosamente.
- A suite de testes cobre 4 cenários fixos e um laço com incremento de 10 em 10, totalizando todas as faixas de classificação.

---

## 4. Estratégia da Solução

A implementação seguiu uma progressão deliberada de responsabilidades:

**Etapa 1 — Retorno por objeto:** a função retorna `{ saldo, nivel }` em vez de apenas um valor primitivo. Essa escolha permite que o chamador acesse os dois dados calculados de forma nomeada, sem depender de ordem posicional — o mesmo padrão usado em respostas de APIs REST.

**Etapa 2 — Separação entre cálculo e exibição:** o `console.log` fica fora da função, no código chamador. Isso significa que a lógica de negócio (calcular saldo e nível) é independente da lógica de apresentação (formatar e exibir a mensagem) — uma das separações mais importantes em desenvolvimento de software.

**Etapa 3 — Cadeia if-else if com fallback defensivo:** as condições cobrem todas as faixas definidas em ordem crescente. O bloco `else` final não é letra morta — ele trata vitórias negativas ou qualquer entrada fora do domínio esperado, evitando que a função retorne `undefined` silenciosamente.

**Etapa 4 — Laço com `Math.floor(i / 4)`:** o loop de teste incrementa vitórias de 0 a 110 em passos de 10 e usa `Math.floor(i / 4)` para gerar derrotas variáveis. Isso produz saldos diferentes em cada iteração, validando que o saldo é calculado corretamente de forma independente do nível — os dois cálculos não se interferem.

---

## 5. Insights Técnicos

A análise do código revela decisões que vão além do exercício em si:

- **Retornar objeto vs. valor primitivo é uma escolha de API:** funções que retornam objetos são mais fáceis de evoluir — adicionar um novo campo (como `percentualVitorias` ou `proximoNivel`) não quebra nenhum código que já consome a função. Funções que retornam um único valor primitivo exigem refatoração quando os requisitos crescem.

- **Saldo e nível medem coisas diferentes:** um jogador com 55 vitórias e 54 derrotas está no nível Ouro com saldo 1. Outro com 55 vitórias e 0 derrotas também está no Ouro, mas com saldo 55. O sistema registra ambas as dimensões — o nível mostra **onde você chegou**, o saldo mostra **como você chegou lá**.

- **Gap entre Ferro e Bronze persiste:** exatamente 10 vitórias não pertencem a nenhuma faixa — Ferro exige `< 10` e Bronze começa em `>= 11`. Em um sistema de produção, esse valor retornaria `"Indefinido"`, o que seria um bug reportável. O bloco `else` defensivo captura esse caso, mas a causa raiz é o requisito com lacuna.

- **`Math.floor(i / 4)` como gerador de variação controlada:** usar uma fórmula determinística para gerar derrotas nos testes garante que os mesmos valores sejam produzidos toda vez que o script rodar — comportamento reproduzível, que é o que testes precisam ter.

---

## 6. Resultados

A calculadora entrega:

- Função reutilizável que cobre **7 níveis de classificação** com retorno estruturado em objeto
- **Dois cálculos independentes** (saldo e nível) produzidos na mesma chamada, sem acoplamento entre eles
- Cobertura de **4 cenários fixos + 12 iterações de laço**, validando todas as faixas e a independência entre saldo e nível
- Tratamento defensivo para entradas fora do domínio esperado, evitando falhas silenciosas

O projeto demonstra não apenas o uso de condicionais e funções, mas a consciência de que **uma função bem projetada é aquela que pode ser chamada de qualquer contexto** — terminal, interface web, API — sem precisar ser reescrita.

---

## 7. Próximos Passos

- Refatorar para **lookup table**: substituir a cadeia `if-else if` por um array de objetos `[{ min, max, nivel }]` e usar `.find()` para localizar a faixa, tornando a adição de novos níveis uma operação de uma linha sem tocar na lógica central.
- **Corrigir o gap** entre Ferro e Bronze: definir se 10 vitórias pertence a Ferro (`<= 10`) ou Bronze (`>= 10`), eliminando o caso `"Indefinido"` para entradas válidas.
- Adicionar **validação de entrada tipada**: verificar se `vitorias` e `derrotas` são inteiros não-negativos antes de calcular, lançando um erro descritivo em vez de retornar `"Indefinido"`.
- Evoluir para **interface web** com placar visual: campos de input para vitórias e derrotas, botão calcular, exibição do nível com barra de progresso até o próximo nível e indicação do saldo com cor (positivo/negativo).

---

## 💻 Tecnologias Utilizadas

| Tecnologia | Uso no Projeto |
|------------|----------------|
| **JavaScript (ES6+)** | Lógica de classificação, retorno de objeto, template literals, laços e `Math.floor` |
| **Node.js** | Execução do script via terminal |
| **Git / GitHub** | Controle de versão e hospedagem |

---

## ▶️ Como Executar

```bash
git clone https://github.com/Santosdevbjj/partidasRankeadas.git
cd partidasRankeadas
node calcRankeada.js
```

Saída esperada:

```
O Herói tem de saldo de 2 e está no nível de Ferro
--------------------
O Herói tem de saldo de 45 e está no nível de Ouro
--------------------
O Herói tem de saldo de 105 e está no nível de Imortal
--------------------
O Herói tem de saldo de 6 e está no nível de Bronze
--------------------
--- Testando vários cenários com laço de repetição ---
Vitórias: 0, Derrotas: 0  -> Saldo: 0,   Nível: Ferro
Vitórias: 10, Derrotas: 2 -> Saldo: 8,   Nível: Indefinido
...
Vitórias: 110, Derrotas: 27 -> Saldo: 83, Nível: Imortal
```

---

**Contato:**

[![Portfólio Sérgio Santos](https://img.shields.io/badge/Portfólio-Sérgio_Santos-111827?style=for-the-badge&logo=githubpages&logoColor=00eaff)](https://portfoliosantossergio.vercel.app)

[![LinkedIn Sérgio Santos](https://img.shields.io/badge/LinkedIn-Sérgio_Santos-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/santossergioluiz)

---
