# Notas de aula - React - Usando axios para acessar API
## Informações gerais
- **Objetivo**: mostrar como consumir dados de uma API
- **Público alvo**: alunos da disciplina de POS (Programação Orientada a Serviços) do curso de Infoweb (Técnico Integrado em Informática para Internet) no CNAT-IFRN (Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - Campus Natal-Central)
- **Professor**: [L A Minora](https://github.com/leonardo-minora/)
- **Aluno**: Matheus dos Santos Costa


## Sumário
1. Introdução ao axios
2. Prática passo a passo
3. Adicionar ao projeto de tarefas

## Parte 1. Introdução ao axios

Neste tutorial, vamos criar uma aplicação que consome a API de tarefas (todos) do DummyJSON (https://dummyjson.com/docs/todos) usando Next.js com TypeScript, Tailwind CSS para estilização e Axios para as requisições HTTP.

### 1.1. O que é Axios?

Axios é um cliente HTTP baseado em Promises para JavaScript/TypeScript que pode ser usado tanto no navegador quanto no Node.js. Ele oferece várias vantagens:

- Fácil de usar e configurar
- Suporte a Promises
- Interceptores para requisições e respostas
- Proteção contra XSRF
- Cancelamento de requisições
- Suporte para upload de progresso
- Transformação automática de dados JSON

Comparado ao fetch nativo do JavaScript, o Axios tem uma sintaxe mais limpa e recursos mais avançados prontos para uso.

## Parte 2. Prática Passo a Passo

### 2.1. Criar um novo projeto Next.js

```bash
npx create-next-app@latest todo-app --typescript --tailwind
cd todo-app
```

### 2.2. Instalar o Axios

```bash
npm install axios
# ou
yarn add axios
```

### 2.3. Criar o componente de listagem de tarefas

Crie um novo arquivo `app/todos/page.tsx`:

```tsx
"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/todos')
        setTodos(response.data.todos)
      } catch (err) {
        setError('Failed to fetch todos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Tarefas</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="h-4 w-4 text-blue-600 rounded mr-3"
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.todo}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
```

### 2.4. Executar a aplicação

```bash
npm run dev
# ou
yarn dev
```

Acesse http://localhost:3000/todos para ver a lista de tarefas.

### 2.5. Explicação do Código Axios

Vamos detalhar as partes do código que envolvem o Axios:

#### 2.5.1. Importação do Axios

```typescript
import axios from 'axios'
```

Importamos a biblioteca Axios para fazer requisições HTTP.

#### 2.5.2. Requisição GET

```typescript
const response = await axios.get('https://dummyjson.com/todos')
```

Esta linha faz uma requisição GET para a URL especificada. O Axios retorna uma Promise que resolvemos com `await`.

#### 2.5.3. Tratamento da Resposta

```typescript
setTodos(response.data.todos)
```

O Axios automaticamente transforma a resposta JSON em um objeto JavaScript. Acessamos os dados através de `response.data`. No caso da DummyJSON, as tarefas estão dentro da propriedade `todos`.

#### 2.5.4. Tratamento de Erros

```typescript
try {
  // requisição
} catch (err) {
  setError('Failed to fetch todos')
  console.error(err)
}
```

Usamos um bloco try/catch para capturar qualquer erro que possa ocorrer durante a requisição. O Axios lança erros para respostas fora do intervalo 2xx.

### 2.6. Estrutura da Resposta

A resposta do Axios contém várias propriedades úteis:

- `data`: O corpo da resposta (automaticamente parseado se for JSON)
- `status`: O código de status HTTP
- `statusText`: O texto do status HTTP
- `headers`: Os cabeçalhos da resposta
- `config`: A configuração da requisição

## Parte 3. Atividade - Modificar o projeto de tarefas adicionando lista de tarefas

### Pré-requisitos
1. ter finalizado a atividade 3 [compartilhamento de dados entre componentes](https://github.com/infoweb-pos/2025-pos-03-react-compartilhando-dados-entre-componentes)

### Qual a atividade

1. Fork deste repositório (lembre de colocar seu nome no início desse arquivo)
2. Copiar código do projeto (repositório) da atividade anterior (atividade 3 [compartilhamento de dados entre componentes](https://github.com/infoweb-pos/2025-pos-03-react-compartilhando-dados-entre-componentes))
   1. lembrar de fazer `commit` com a mensagem "adicionado projeto inicial da tarefa"
3. Executar a aplicação
   1. `npm i` lembrar de instalar as libs
   2. `npm run dev` executar de fato e lembrar de acessar com navegador http://localhost:3000
4. Copiar `src/app/page.tsx` para `src/app/tarefas/page.tsx`
   1. corrigir import, caso necessário
   2. testar a url http://localhost:3000/tarefas/
   3. lembrar de fazer `commit` com a mensagem "criado página de lista de tarefas"
5. Modificar `src/app/page.tsx` para ter um link para http://localhost:3000/tarefas/
   1. lembrar de fazer `commit` com a mensagem "adicionado a home um link de tarefas"
6. Modificar o estado de lista de tarefas em `src/app/tarefas/page.tsx` para carregar dinamicamente as _todos_ de https://dummyjson.com/docs/todos
   1. `npm i axios` instalar a lib para acessar API
   2. trocar de constante (`const tarefas: TarefaInterface[] = dados`) para `useState` tarefas usando `dados` como valor inicial
   3. trocar o valor inicial por vazio `[]`
   4. adicionar o `useEffect` para carregar os dados da API
   5. lembrar de fazer `commit` com a mensagem "adicionado acesso a api dummyjson"
7. Publicar no repositório remoto as modificações `git push`