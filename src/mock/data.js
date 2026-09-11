export const mockServices = [
  {
    id: 1,
    nome: 'Consultoria Ambiental',
    slug: 'consultoria-ambiental',
    descricao:
      'Diagnóstico, planejamento e apoio técnico para empresas que precisam reduzir riscos e atender a legislação ambiental.',
    conteudo:
      '<p>Atuamos com diagnóstico ambiental, elaboração de relatórios e acompanhamento técnico para garantir conformidade regulatória.</p><ul><li>Auditoria inicial e diagnóstico</li><li>Relatórios técnicos e documentação</li><li>Suporte para aprovação e atendimento regulatório</li></ul>',
    imagem:
      'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    nome: 'Monitoramento Ambiental',
    slug: 'monitoramento-ambiental',
    descricao:
      'Programas de coleta e análise de dados para controlar emissões, ruído, qualidade de água e impactos ambientais.',
    conteudo:
      '<p>Implementamos monitoramento contínuo com indicadores e relatórios claros para apoiar tomadas de decisão.</p><ul><li>Coleta de dados e indicadores</li><li>Relatórios operacionais</li><li>Suporte para gestão ambiental</li></ul>',
    imagem:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    nome: 'Licenciamento e Regularização',
    slug: 'licenciamento-e-regularizacao',
    descricao:
      'Acompanhamento completo do processo de licenciamento e regularização ambiental para reduzir burocracia e riscos.',
    conteudo:
      '<p>Guiamos clientes desde a identificação dos requisitos até a obtenção das autorizações necessárias.</p><ul><li>Assessoria de licenciamento</li><li>Regularização documental</li><li>Atendimento às autoridades ambientais</li></ul>',
    imagem:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    nome: 'Treinamentos e Capacitação',
    slug: 'treinamentos-e-capacitacao',
    descricao:
      'Cursos e palestras para equipes, gestores e colaboradores com foco em sustentabilidade e compliance ambiental.',
    conteudo:
      '<p>Oferecemos formação prática para fortalecer a cultura ambiental e a responsabilidade socioambiental da organização.</p><ul><li>Treinamentos presenciais e online</li><li>Material exclusivo e orientação</li><li>Planejamento de ações internas</li></ul>',
    imagem:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
]

export const mockMensagens = [
  {
    id: 1,
    nome: 'Maria Souza',
    email: 'maria@empresa.com',
    telefone: '(11) 99999-1111',
    empresa: 'EcoPlus',
    mensagem: 'Gostaria de saber mais sobre licenciamento ambiental para nosso novo empreendimento.',
    lida: true,
    createdAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 2,
    nome: 'João Pereira',
    email: 'joao@industrial.com',
    telefone: '(11) 98888-2222',
    empresa: 'Indústria Verde',
    mensagem: 'Preciso de um diagnóstico para entender os impactos do projeto e adequações necessárias.',
    lida: false,
    createdAt: '2026-08-27T15:35:00.000Z',
  },
]

export const mockUsuarios = [
  {
    id: 1,
    nome: 'Administrador Demo',
    name: 'Administrador Demo',
    email: 'admin@rta.local',
    role: 'admin',
    status: 'ativo',
  },
  {
    id: 2,
    nome: 'Ana Costa',
    name: 'Ana Costa',
    email: 'ana@rta.local',
    role: 'editor',
    status: 'ativo',
  },
]

export const mockCandidatos = [
  {
    id: 1,
    nome: 'Carlos Mendes',
    email: 'carlos@email.com',
    telefone: '(11) 97777-1234',
    area: 'ambiental',
    mensagem: 'Tenho experiência em gestão ambiental e licenciamento.',
    status: 'novo',
    curriculoUrl: 'https://example.com/cv-carlos.pdf',
    createdAt: '2026-08-15T09:00:00.000Z',
  },
  {
    id: 2,
    nome: 'Letícia Ramos',
    email: 'leticia@email.com',
    telefone: '(11) 98888-4321',
    area: 'tecnico',
    mensagem: 'Busco oportunidade em campo e monitoramento ambiental.',
    status: 'em_análise',
    curriculoUrl: 'https://example.com/cv-leticia.pdf',
    createdAt: '2026-08-19T14:30:00.000Z',
  },
]

export const mockAdminUser = {
  id: 'mock-admin',
  name: 'Administrador Demo',
  email: 'admin@rta.local',
  role: 'admin',
}
