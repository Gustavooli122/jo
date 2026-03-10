export const conquistas = [
  {
    id: 'primeira_venda',
    nome: 'Primeira Venda',
    descricao: 'Venda seu primeiro produto',
    condicao: (stats) => stats.totalVendido >= 1,
    ganho: 500
  },
  {
    id: 'vendedor_iniciante',
    nome: 'Vendedor Iniciante',
    descricao: 'Venda 10 produtos',
    condicao: (stats) => stats.totalVendido >= 10,
    ganho: 2000
  },
  {
    id: 'vendedor_experiente',
    nome: 'Vendedor Experiente',
    descricao: 'Venda 100 produtos',
    condicao: (stats) => stats.totalVendido >= 100,
    ganho: 15000
  },
  {
    id: 'vendedor_mestre',
    nome: 'Vendedor Mestre',
    descricao: 'Venda 1000 produtos',
    condicao: (stats) => stats.totalVendido >= 1000,
    ganho:500000
  },
  {
    id: 'primeiro_milhao',
    nome: 'Primeiro Milhão',
    descricao: 'Ganhe R$ 1.000.000',
    condicao: (stats) => stats.totalGanho >= 1000000,
    ganho: 2000000
  },
  {
    id: 'primeiro_bilhao',
    nome: 'Primeiro Bilhão',
    descricao: 'Ganhe R$ 1.000.000.000',
    condicao: (stats) => stats.totalGanho >= 1000000000,
    ganho:25000000000
  },
  {
    id: 'empresario',
    nome: 'Empresário',
    descricao: 'Compre sua primeira empresa',
    condicao: (stats) => stats.totalEmpresas >= 1,
    ganho:20000
  },
  {
    id: 'magnata',
    nome: 'Magnata',
    descricao: 'Possua 10 empresas',
    condicao: (stats) => stats.totalEmpresas >= 10,
    ganho:100000
  },
  {
    id: 'imperio_empresarial',
    nome: 'Império Empresarial',
    descricao: 'Possua 50 empresas',
    condicao: (stats) => stats.totalEmpresas >= 50,
    ganho:300000
  },
  {
    id: 'inovador',
    nome: 'Inovador',
    descricao: 'Compre 5 upgrades',
    condicao: (stats) => stats.totalUpgrades >= 5,
    ganho:700000
  },
  {
    id: 'visionario',
    nome: 'Visionário',
    descricao: 'Compre 10 upgrades',
    condicao: (stats) => stats.totalUpgrades >= 10,
    ganho:1200000
  },
  {
    id: 'futurista',
    nome: 'Futurista',
    descricao: 'Compre todos os upgrades',
    condicao: (stats) => stats.totalUpgrades >= 15,
    ganho:100000000000
  },
  {
    id: 'sortudo',
    nome: 'Sortudo',
    descricao: 'Ganhe no cassino 10 vezes',
    condicao: (stats) => stats.casinoVitorias >= 10,
    ganho: 2000
  },
  {
    id: 'apostador',
    nome: 'Apostador',
    descricao: 'Ganhe no cassino 50 vezes',
    condicao: (stats) => stats.casinoVitorias >= 50,
    ganho: 5000
  },
  {
    id: 'investidor',
    nome: 'Investidor',
    descricao: 'Invista R$ 100.000',
    condicao: (stats) => stats.totalInvestido >= 100000,
    ganho:150000
  },
  {
    id: 'investidor_profissional',
    nome: 'Investidor Profissional',
    descricao: 'Invista R$ 1.000.000',
    condicao: (stats) => stats.totalInvestido >= 1000000,
    ganho: 1500000
  },
  {
    id: 'equipe_pequena',
    nome: 'Equipe Pequena',
    descricao: 'Contrate 10 funcionários',
    condicao: (stats) => stats.totalFuncionarios >= 10,
    ganho:12000
  },
  {
    id: 'equipe_grande',
    nome: 'Equipe Grande',
    descricao: 'Contrate 50 funcionários',
    condicao: (stats) => stats.totalFuncionarios >= 50,
    ganho: 60000
  },
  {
    id: 'renascimento',
    nome: 'Renascimento',
    descricao: 'Faça seu primeiro prestige',
    condicao: (stats) => stats.prestigeNivel >= 1,
    ganho:5000
  },
  {
    id: 'ascensao',
    nome: 'Ascensão',
    descricao: 'Alcance prestige nível 5',
    condicao: (stats) => stats.prestigeNivel >= 5,
    ganho: 200000
  },
  {
    id: 'transcendencia',
    nome: 'Transcendência',
    descricao: 'Alcance prestige nível 10',
    condicao: (stats) => stats.prestigeNivel >= 10,
    ganho: 500000
  },
  {
    id: 'banqueiro',
    nome: 'Banqueiro',
    descricao: 'Tenha R$ 1.000.000 no banco',
    condicao: (stats) => stats.saldoBanco >= 1000000,
    ganho:200000
  },
  {
    id: 'comerciante',
    nome: 'Comerciante',
    descricao: 'Venda 10 produtos no mercado',
    condicao: (stats) => stats.vendasMercado >= 10,
    ganho:2000
  }
];