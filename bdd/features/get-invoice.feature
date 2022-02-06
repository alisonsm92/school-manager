# language: pt
Funcionalidade: Consultar matrícula
  Contexto: 
    Dado que a escola possua os seguintes cursos disponíveis
      | curso        | módulo | classe | valor    |
      | Ensino Médio | 1      | A      | 17000.00 |
      
  Cenário: Matrícula com fatura a vencer
    Dado que a matrícula tenha sido cadastrada
      | curso        | módulo | classe | parcelas |
      | Ensino Médio | 1      | A      | 3        |
    Quando consultar a matrícula
    Então os valores das parcelas das faturas devem ser
      | valor original | multa | juros | saldo   |
      | 5666.66        | 0     | 0     | 5666.66 |
      | 5666.66        | 0     | 0     | 5666.66 |
      | 5666.68        | 0     | 0     | 5666.68 |