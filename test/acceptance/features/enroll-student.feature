# language: pt
Funcionalidade: Matrícula de estudante
  Contexto:
    Dado que a escola possua os seguintes cursos disponíveis
      | curso        | módulo | classe |
      | Ensino Médio | 1      | A      |    
      
  Cenário: Matrícula em curso disponível
    Quando cadastrar a matrícula com os dados
      | curso        | módulo | classe |
      | Ensino Médio | 1      | A      |
    Então a matrícula deve ser cadastrada com sucesso

  Cenário: Matrícula em curso indisponível
    Quando cadastrar a matrícula com os dados
      | curso        | módulo | classe |
      | Ensino Médio | 2      | A      |
    Então a matrícula não deve ser cadastrada