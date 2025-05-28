import { Box, Input, Textarea, VStack, Heading } from "@chakra-ui/react";

export default function MVPForm() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Formulário de Idealização de MVP</h1>

      {/* Passo 1 */}
      <Section title="1. Informações Básicas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Nome do Projeto" />
          <input className="input" placeholder="Responsável/Idealizador" />
          <input type="date" className="input" />
        </div>
      </Section>

      {/* Passo 2 */}
      <Section title="2. Problema">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Qual problema você identificou?" />
          <input className="input" placeholder="Quem são os afetados?" />
          <input className="input" placeholder="Como é resolvido atualmente?" />
        </div>
      </Section>

      {/* Passo 3 */}
      <Section title="3. Solução Proposta">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Descreva sua solução" />
          <input className="input" placeholder="O que torna ela diferente?" />
          <input className="input" placeholder="Pode ser simplificada para um MVP?" />
        </div>
      </Section>

      {/* Passo 4 */}
      <Section title="4. Público-Alvo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Quem é o público-alvo?" />
          <input className="input" placeholder="Onde eles estão?" />
          <input className="input" placeholder="Como você vai alcançá-los?" />
        </div>
      </Section>

      {/* Passo 5 */}
      <Section title="5. Funcionalidades Essenciais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Funcionalidade 1" />
          <input className="input" placeholder="Funcionalidade 2" />
          <input className="input" placeholder="Funcionalidade 3" />
        </div>
      </Section>

      {/* Passo 6 */}
      <Section title="6. Indicadores de Sucesso">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" placeholder="Como saber se o MVP foi um sucesso?" />
          <input className="input" placeholder="Qual o objetivo principal do MVP?" />
        </div>
      </Section>

      {/* Passo 7 */}
      <Section title="7. Concorrência">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" placeholder="Quem são os concorrentes?" />
          <input className="input" placeholder="O que você pode aprender com eles?" />
        </div>
      </Section>

      {/* Passo 8 */}
      <Section title="8. Recursos Necessários">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" placeholder="Quais recursos você precisa para começar?" />
          <input className="input" placeholder="Tempo e investimento disponíveis" />
        </div>
      </Section>

      {/* Passo 9 */}
      <Section title="9. Próximos Passos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder="Passo 1" />
          <input className="input" placeholder="Passo 2" />
          <input className="input" placeholder="Passo 3" />
        </div>
      </Section>
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
