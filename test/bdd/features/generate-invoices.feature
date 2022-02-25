# language: pt
Funcionalidade: Geração de faturas
  Contexto: 
    Dado que a escola possua os seguintes cursos disponíveis
      | curso        | módulo | classe | valor    |
      | Ensino Médio | 1      | A      | 17000.00 |
      
  Cenário: Matrícula com parcelamento de fatura
    Quando cadastrar a matrícula com os dados
      | curso        | módulo | classe | parcelas |
      | Ensino Médio | 1      | A      | 3        |
    Então os valores das faturas devem ser
      | saldo   |
      | 5666.66 |
      | 5666.66 |
      | 5666.68 |