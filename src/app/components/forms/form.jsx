import { Box, Input, Textarea, VStack, Heading } from "@chakra-ui/react";
import { addTodo } from "../../api/send/todo";
import { useState } from "react";
import axios from "axios";
import { toast } from "@chakra-ui/react";

export default function MVPForm() {
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

  const handleSubmit = async () => {
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    const prompt = `
Estou desenvolvendo um produto para minha start up, o nome do projeto é ${formData.nome}, e tenho como alvo concluir ele até ${formData.deadline}, o problema identificado é ${formData.problema}, meu publico alvo é ${formData.publicoAlvo}, minha solução é ${formData.solucao}, ela tem como principais funcionalidades pensadas ${formData.func1}, ${formData.func2}, ${formData.func3} e como objetivo ${formData.objetivo}, minha condição de sucesso é ${formData.sucesso}. Tendo em mente que possuo as seguintes concorrentes ${formData.concorrentes} (pode considerar outras que você encontrar), que hoje é ${dataAtual} e que tenho de recursos ${formData.investimento}.  

CRIE UMA LISTA DETALHADA E BEM SEPARADA DE TAREFAS PARA A CONCLUSÃO DESSE PROJETO DENTRO DO PRAZO ESTIMADO SEGUINDO O SEGUINTE TEMPLATE DE TAREFA E NÃO GERE NADA ALÉM DESSA LISTA:

'''
==+==
TITLE: "",
DESCRIPTION: "",
TASK_DEADLINE: "",
OBSERVATION: "",
'''`;

    try {
      const gptRes = await axios.post("/api/chatgpt", {
        messages: [{ role: "user", content: prompt }],
      });

      const tarefasText = gptRes.data.choices[0].message.content;
      const tarefas = tarefasText.split("==+==").filter(Boolean).map((t) => {
        const title = t.match(/TITLE:\s?"(.*?)"/)?.[1] || "";
        const description = t.match(/DESCRIPTION:\s?"(.*?)"/)?.[1] || "";
        const deadline = t.match(/TASK_DEADLINE:\s?"(.*?)"/)?.[1] || "";
        const observation = t.match(/OBSERVATION:\s?"(.*?)"/)?.[1] || "";

        return { title, description, displayDate: deadline, observation };
      });

      for (const tarefa of tarefas) {
        await handleTodoCreate(tarefa);
      }

      toast({ title: "Backlog criado com sucesso!", status: "success" });
    } catch (err) {
      console.error(err);
      toast({ title: "Erro ao criar backlog", status: "error" });
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
        onClick={() => console.log(formData)} // depois substitua por handleSubmit
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
