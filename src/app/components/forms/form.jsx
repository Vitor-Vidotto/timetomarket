import { useState } from "react";
import { OpenAI } from "openai";
import useAuth from "../../hook/useAuth";
import { useRouter } from 'next/navigation'
import { addTodo } from "../../api/send/todo";

export default function MVPForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    deadline: "",
    problema: "",
    publicoAlvo: "",
    solucao: "",
    func1: "",
    func2: "",
    func3: "",
    objetivo: "",
    sucesso: "",
    concorrentes: "",
    investimento: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Coloque sua chave aqui TEMPORARIAMENTE para testes locais
    dangerouslyAllowBrowser: true, // necessário para usar no client-side
  });

  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async ({ title, description, displayDate, observation }) => {
    console.log("handleTodoCreate:", title, description, displayDate, observation)

    if (!isLoggedIn) {
      return;
    }

    const todo = {
      title,
      description,
      status: "Backlog", // ou qualquer valor padrão
      userId: user.uid,
      displayDate,
      observation,
      userEmail: user.email,
    };

    try {
      // Chame a função addTodo para adicionar a tarefa ao Firebase
      await addTodo(todo);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    console.log("Data Atual:", dataAtual)

    const prompt = `
Estou desenvolvendo um produto para minha start up, o nome do projeto é ${formData.nome}, e tenho como alvo concluir ele até ${formData.deadline}, o problema identificado é ${formData.problema}, meu publico alvo é ${formData.publicoAlvo}, minha solução é ${formData.solucao}, ela tem como principais funcionalidades pensadas ${formData.func1}, ${formData.func2}, ${formData.func3} e como objetivo ${formData.objetivo}, minha condição de sucesso é ${formData.sucesso}. Tendo em mente que possuo as seguintes concorrentes ${formData.concorrentes} (pode considerar outras que você encontrar), que hoje é ${dataAtual} e que tenho de recursos ${formData.investimento}.  

CRIE UMA LISTA DETALHADA E BEM SEPARADA DE TAREFAS PARA A CONCLUSÃO DESSE PROJETO DENTRO DO PRAZO ESTIMADO SEGUINDO O SEGUINTE TEMPLATE DE TAREFA E NÃO GERE NADA ALÉM DESSA LISTA:

'''
==+==
TITLE: "título aqui",
DESCRIPTION: "descrição aqui",
TASK_DEADLINE: "data aqui",
OBSERVATION: "observação aqui",
'''`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const tarefasText = completion.choices[0].message.content;

      console.log("Resposta GPT: ", tarefasText)

      const tarefas = tarefasText
        .split("==+==") // Separa por delimitador
        .filter(Boolean) // Remove entradas vazias
        .map((t) => {
          console.log("CHAMOUUUUUUUUUUU: ", t);

          // Regex atualizada: captura chave e valor sem exigir aspas
          const regex = /(\w+):\s*(.+)/g;
          let match;
          const dados = {};

          while ((match = regex.exec(t)) !== null) {
            const key = match[1];
            const value = match[2].trim();
            dados[key] = value;
          }

          console.log("TITLE: ", dados.TITLE);
          console.log("DESCRIPTION: ", dados.DESCRIPTION);
          console.log("TASK_DEADLINE: ", dados.TASK_DEADLINE);
          console.log("OBSERVATION: ", dados.OBSERVATION);

          return {
            title: dados.TITLE || "",
            description: dados.DESCRIPTION || "",
            displayDate: dados.TASK_DEADLINE || "",
            observation: dados.OBSERVATION || "",
          };
        });

      console.log(tarefas.length)

      tarefas.shift();
      
      console.log(tarefas.length)

      for (const tarefa of tarefas) {
        console.log("Tarefa: ", tarefa)
        await handleTodoCreate(tarefa);
      }

      router.push("/painel");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Formulário de Idealização de MVP</h1>

      {/* Passo 1 */}
      <Section title="1. Informações Básicas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome do Projeto"
          />
          <div>
            Data alvo de conclusão:
            <input
              type="date"
              className="input"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>
      </Section>

      {/* Passo 2 */}
      <Section title="2. Problema">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            name="problema"
            value={formData.problema}
            onChange={handleChange}
            placeholder="Qual problema você identificou?"
          />
        </div>
      </Section>

      {/* Passo 3 */}
      <Section title="3. Solução Proposta">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            name="solucao"
            value={formData.solucao}
            onChange={handleChange}
            placeholder="Descreva sua solução"
          />
        </div>
      </Section>

      {/* Passo 4 */}
      <Section title="4. Público-Alvo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            name="publicoAlvo"
            value={formData.publicoAlvo}
            onChange={handleChange}
            placeholder="Quem é o público-alvo?"
          />
        </div>
      </Section>

      {/* Passo 5 */}
      <Section title="5. Funcionalidades Essenciais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            name="func1"
            value={formData.func1}
            onChange={handleChange}
            placeholder="Funcionalidade 1"
          />
          <input
            className="input"
            name="func2"
            value={formData.func2}
            onChange={handleChange}
            placeholder="Funcionalidade 2"
          />
          <input
            className="input"
            name="func3"
            value={formData.func3}
            onChange={handleChange}
            placeholder="Funcionalidade 3"
          />
        </div>
      </Section>

      {/* Passo 6 */}
      <Section title="6. Indicadores de Sucesso">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="sucesso"
            value={formData.sucesso}
            onChange={handleChange}
            placeholder="Como saber se o MVP foi um sucesso?"
          />
          <input
            className="input"
            name="objetivo"
            value={formData.objetivo}
            onChange={handleChange}
            placeholder="Qual o objetivo principal do MVP?"
          />
        </div>
      </Section>

      {/* Passo 7 */}
      <Section title="7. Concorrência">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="concorrentes"
            value={formData.concorrentes}
            onChange={handleChange}
            placeholder="Quem são os concorrentes?"
          />
        </div>
      </Section>

      {/* Passo 8 */}
      <Section title="8. Recursos Necessários">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="investimento"
            value={formData.investimento}
            onChange={handleChange}
            placeholder="Tempo e investimento disponíveis"
          />
        </div>
      </Section>

      <button
        // onClick={() => console.log(formData)} // depois substitua por handleSubmit
        onClick={handleSubmit}
        className="bg-green-700 text-white px-4 py-2 mt-4 rounded"
      >
        Gerar Backlog com IA
      </button>
    </div>
  );
}

// Componente de seção reutilizável
function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl border-4 border-green-700 p-6 mb-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

// Tailwind utility classes - você pode usar isso em globals.css ou diretamente com className:
const styles = `
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600;
}
.textarea {
  @apply w-full mt-2 mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 min-h-[100px];
}
.section {
  @apply bg-white rounded-xl border-4 border-green-700 p-6 mb-6 shadow-md;
}
.title {
  @apply text-xl font-semibold mb-4;
}
`;
