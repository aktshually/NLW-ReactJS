# NLW - ReactJS

## Deixando tudo pronto

| Comando  | Função  |
|---|---|
| `yarn create react-app nome_do_projeto --template typescript`  |  Cria nosso projeto com extensões .tsx com as devidas configurações  |
| `yarn add nome_da_lib`  | Instala uma livraria necessária para nossa aplicação. Para instalarmos ela em modo de desenvolvimento, usamos a flag `-D` depois do nome  |

## Primeira aula

### Componentes
Tudo em ReactJS é feito a partir de componentes. Este é utilizado cada vez que um elemento em nossa página é muito semelhante. Estes também podem herdar propriedades.

### Props
Propriedades (props) são atributos dados aos nossos componentes ao declará-los, por exemplo:
```ts
const Componente => (props) {
    return (
        <div>
            <h1>
                Isto é um componente!
            </h1>
            <p>
                Ao inserir duas tags HTML ou mais dentro de um componente, devemos colocar os elementos dentro de uma div, como esse exemplo. A prop <code>text</code> equivale a <code>{props.text}</code>
            </p>
        </div>
    )
}

const CompontentePrimário = () => {
    return (
        <Componente text="Hello world!"/>
    )
}
```

## Segunda aula

### Rotas
Para criarmos rotas, primeiro precisamos instalar a dependência `react-router-dom` e `@types/react-router-dom` (para usarmos TypeScript nela) e, dela, podemos importar BrowserRouter e Route. Os dois são componentes e o segundo leva as props `path` e `component`. A primeira é a rota a ser usaada e a segunda é o componente a ser exibido na rota.

### Context
É uma forma de compartilhar informações entre 2 ou mais componentes. <br>
Para utilizá-lo, precisamos primeiramente importar `createContext` no arquivo que queremos criar o contexto a partir de um valor e criar uma variável const com o nome do nosso contexto e atribuir à ele o valor `createContext("valor incial do contexto")`. <br>
*Código esperado*
```ts
import { createContext } from "react";

export const MeuContexto = createContext({} as any);
 
// o "as any" vai ser utilizado para ignorar a tipagem nesse contexto
```

 Após isso, devemos criar um estado definindo o valor do nosso contexto que será utilizado por outros componentes. Devemos também "encapsular" todos os componentes que queremos que conversem entre si com `nome_do_contexto.Provider value={{value, setValue}}`, ou seja, os valores do estado.<br>
*Código esperado*
```ts
import {useState} from "react";

function App() {

    const [value, setValue] = useState("valor compartilhado")

    return (
        <div>
            <MeuContexto.Provider value={{value, setValue}}>
                <ComponenteUm />
                <ComponenteDois />
            </MeuContexto.Provider>
        </div>
    )
}
```

 Para usarmos o contexto, precisaremos importar o hook `useContext()` e o nosso contexto criado no arquivo que queremos usar o valor do contexto e colocar, como parâmetro desse método, o nome da variável const, atribuída lá no início do processo.

 *Código esperado*
 ```ts
 import { useContext } from "react";
 import { MeuContexto } from "./App"

 function ComponenteUm() {

     const {value, setValue} = useContext(MeuContexto)

     return (
         <h1>
            O valor do contexto é {value}
         </h1>
     )
 }
 ```

 Assim podemos também modificar o valor do contexto através da função atribuída no estado. Ao mudar esse valor, o valor também será modificado nos outros componentes

 ### useEffect
 `useEffect()` é um hook do React utilizado para executar uma função cada vez que algo acontecer, na aplicação desenvolvida na NLW, este hook é utilizado para recuperar o estado quando a aplicação é atualizada. <br>
 Esta função leva 2 parâmetros:
 - **Primeiro parâmetro:** a função a ser executada quando aquele evento acontecer.
 - **Segundo parâmetro:** o evento que estará sendo monitorada para executar a função. Esta é coloca num array e se este estiver vazio, o evento vai ser quanto o componente montar.

 *Boas práticas*
 - **Parar** o *event listener* no fim do método em que este é declarado
- **Fazer um componente** pra cada contexto da nossa aplicação

## Terceira aula

### Eventos

| Evento  | Função  |
|---|---|
| onSubmit  | Cada vez que um formulário é enviado  |
|  onChange | Cada vez que o valor de um input muda  |

### Switch
É um componente nativo do React que nunca vai deixar duas rotas serem chamadas ao mesmo tempo. No projeto construído na NLW, ele é usado para não confundir a aplicação entre as rotas `/rooms/new` e `/rooms/:id`

### useParams()
É um hook geralmente armazenado numa variável, a qual se refere aos parâmetros da URL da página. Na aplicação, é utilizado para identificar o ID.
