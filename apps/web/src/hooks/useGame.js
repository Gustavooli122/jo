import { useState, useEffect, useCallback } from 'react';
import { produtos } from '../data/produtos.js';
import { empresas as empresasData } from '../data/empresas.js';
import { upgrades as upgradesData } from '../data/upgrades.js';
import { funcionarios as funcionariosData } from '../data/funcionarios.js';
import { conquistas as conquistasData } from '../data/conquistas.js';
import { ativos as ativosData } from '../data/ativos.js';
import { useToast } from '../hooks/use-toast';

export const useGame = () => {
  const { toast } = useToast();
  
  const [dinheiro, setDinheiro] = useState(500);
  const [ouro, setOuro] = useState(0);
  const [diamantes, setDiamantes] = useState(0);
  const [inventario, setInventario] = useState({});
  const [empresas, setEmpresas] = useState({});
  const [upgrades, setUpgrades] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [prestige, setPrestige] = useState({ nivel: 0, multiplicador: 1.0 });
  const [banco, setBanco] = useState({ saldo: 0 });
  const [investimentos, setInvestimentos] = useState({});
  const [mercado, setMercado] = useState({});
  const [conquistas, setConquistas] = useState({});
  const [eventoAtivo, setEventoAtivo] = useState(null);
  const [ultimoEvento, setUltimoEvento] = useState(0);
  const [mercadoMultiplicador, setMercadoMultiplicador] = useState(1.0);
  const [precosAcoes, setPrecosAcoes] = useState({});
  const [rendaPassiva, setRendaPassiva] = useState({});
  const [estatisticas, setEstatisticas] = useState({
    totalGanho: 0,
    totalVendido: 0,
    casinoVitorias: 0,
    totalInvestido: 0,
    totalEmpresas: 0,
    totalUpgrades: 0,
    totalFuncionarios: 0,
    prestigeNivel: 0,
    saldoBanco: 0,
    vendasMercado: 0
  });

  const nivel = Math.min(10, Math.floor(dinheiro / 10000) + 1);

  // Initialize stock prices
  useEffect(() => {
    const precos = {};
    ativosData.forEach(ativo => {
      precos[ativo.id] = ativo.precoInicial;
    });
    setPrecosAcoes(precos);
  }, []);

  // Load game from localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem('businessEmpireGame');
    if (savedGame) {
      try {
        const data = JSON.parse(savedGame);
        setOuro(data.ouro || 500);
        setDiamantes(data.diamantes || 0);
        setDinheiro(data.dinheiro || 500);
        setInventario(data.inventario || {});
        setEmpresas(data.empresas || {});
        setUpgrades(data.upgrades || {});
        setFuncionarios(data.funcionarios || {});
        setPrestige(data.prestige || { nivel: 0, multiplicador: 1.0 });
        setBanco(data.banco || { saldo: 0 });
        setInvestimentos(data.investimentos || {});
        setMercado(data.mercado || {});
        setConquistas(data.conquistas || {});
        setRendaPassiva(data.rendaPassiva || {});
        setEstatisticas(data.estatisticas || {
          totalGanho: 0,
          totalVendido: 0,
          casinoVitorias: 0,
          totalInvestido: 0,
          totalEmpresas: 0,
          totalUpgrades: 0,
          totalFuncionarios: 0,
          prestigeNivel: 0,
          saldoBanco: 0,
          vendasMercado: 0
        });
      } catch (error) {
        console.error('Error loading game:', error);
      }
    }
  }, []);

  const comprarOuro = useCallback((quantidade = 1) => {
  const custo = 10000000 * quantidade;
  if (nivel < 50) {
    toast({ title: "❌ Nível insuficiente", description: "Você precisa ser nível 50" });
    return;
  }
  if (dinheiro >= custo) {
    setDinheiro(prev => prev - custo);
    setOuro(prev => prev + quantidade);
    toast({ title: "💛 Ouro comprado!", description: `+${quantidade} ouro(s)` });
  } else {
    toast({ title: "❌ Dinheiro insuficiente" });
  }
   console.log("erro")
}, [dinheiro, nivel, toast]);

const comprarDiamante = useCallback((quantidade = 1) => {
  const custo = 90 * quantidade;
  if (ouro >= custo) {
    setOuro(prev => prev - custo);
    setDiamantes(prev => prev + quantidade);
    toast({ title: "💎 Diamante comprado!", description: `+${quantidade} diamante(s)` });
  } else {
    toast({ title: "❌ Ouro insuficiente" });
  }
}, [ouro, toast]);
  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const gameData = {
        ouro,
        diamantes,
        dinheiro,
        inventario,
        empresas,
        upgrades,
        funcionarios,
        prestige,
        banco,
        investimentos,
        mercado,
        conquistas,
        rendaPassiva,
        estatisticas
      };
      localStorage.setItem('businessEmpireGame', JSON.stringify(gameData));
    }, 5000);

    return () => clearInterval(interval);
  }, [dinheiro,diamantes,ouro, inventario, empresas, upgrades, funcionarios, prestige, banco, investimentos, mercado, conquistas, rendaPassiva, estatisticas]);

  // Calculate total multiplier
  const calcularMultiplicador = useCallback(() => {
    let mult = prestige.multiplicador;
    
    // Upgrades multiplier
    Object.keys(upgrades).forEach(id => {
      const upgrade = upgradesData.find(u => u.id === id);
      if (upgrade && upgrades[id]) {
        mult *= upgrade.multiplicador;
      }
    });

    // Funcionarios bonus
    let bonusFuncionarios = 1.0;
    Object.keys(funcionarios).forEach(id => {
      const func = funcionariosData.find(f => f.id === id);
      if (func && funcionarios[id] > 0) {
        bonusFuncionarios += func.bonus * funcionarios[id];
      }
    });
    mult *= bonusFuncionarios;

    // Event multiplier
    if (eventoAtivo && Date.now() < eventoAtivo.fim) {
      mult *= eventoAtivo.multiplicador;
    }

    return mult;
  }, [upgrades, funcionarios, prestige, eventoAtivo]);

  // Passive income every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let renda = 0;
      const multiplicador = calcularMultiplicador();

      // Income from empresas
      Object.keys(empresas).forEach(id => {
        const empresa = empresasData.find(e => e.id === id);
        if (empresa && empresas[id] > 0) {
          renda += empresa.renda * empresas[id];
        }
      });

      // Income from renda passiva
      Object.keys(rendaPassiva).forEach(id => {
        const geradores = [
          { id: 'gen1', renda: 50 },
          { id: 'gen2', renda: 100 },
          { id: 'gen3', renda: 200 },
          { id: 'gen4', renda: 500 },
          { id: 'gen5', renda: 1000 }
        ];
        const gerador = geradores.find(g => g.id === id);
        if (gerador && rendaPassiva[id] > 0) {
          renda += gerador.renda * rendaPassiva[id];
        }
      });

      if (renda > 0) {
        const rendaFinal = renda * multiplicador;
        setDinheiro(prev => prev + rendaFinal);
        setEstatisticas(prev => ({ ...prev, totalGanho: prev.totalGanho + rendaFinal }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [empresas, rendaPassiva, calcularMultiplicador]);

  // Bank interest every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (banco.saldo > 0) {
        const juros = banco.saldo * 0.05;
        setBanco(prev => ({ saldo: prev.saldo + juros }));
        setEstatisticas(prev => ({ ...prev, saldoBanco: banco.saldo + juros }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [banco]);

  // Economic events every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const eventos = [
        { tipo: 'Boom Econômico', multiplicador: 1.5, cor: 'text-green-400' },
        { tipo: 'Crise', multiplicador: 0.5, cor: 'text-red-400' },
        { tipo: 'Promoção', multiplicador: 0.7, cor: 'text-yellow-400' },
        { tipo: 'Alta Demanda', multiplicador: 1.8, cor: 'text-blue-400' }
      ];
      
      const evento = eventos[Math.floor(Math.random() * eventos.length)];
      setEventoAtivo({
        ...evento,
        fim: Date.now() + 10000
      });
      setUltimoEvento(Date.now());

      toast({
        title: `🎯 ${evento.tipo}!`,
        description: `Multiplicador: ${evento.multiplicador}x por 10 segundos`,
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [toast]);

  // Stock price variation every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrecosAcoes(prev => {
        const novosPrecos = { ...prev };
        ativosData.forEach(ativo => {
          const variacao = (Math.random() - 0.5) * 2 * ativo.volatilidade;
          novosPrecos[ativo.id] = Math.max(1, prev[ativo.id] * (1 + variacao));
        });
        return novosPrecos;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Market multiplier every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const novoMult = 0.8 + Math.random() * 0.4;
      setMercadoMultiplicador(novoMult);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // NPCs buying from market
  useEffect(() => {
    const interval = setInterval(() => {
      const produtosNoMercado = Object.keys(mercado);
      if (produtosNoMercado.length > 0) {
        const produtoId = produtosNoMercado[Math.floor(Math.random() * produtosNoMercado.length)];
        const produto = mercado[produtoId];
        
        if (produto && produto.quantidade > 0) {
          const quantidadeComprada = Math.min(
            Math.floor(Math.random() * 3) + 1,
            produto.quantidade
          );
          
          const valorVenda = produto.preco * quantidadeComprada * mercadoMultiplicador;
          
          setMercado(prev => {
            const novo = { ...prev };
            novo[produtoId].quantidade -= quantidadeComprada;
            if (novo[produtoId].quantidade <= 0) {
              delete novo[produtoId];
            }
            return novo;
          });
          
          setDinheiro(prev => prev + valorVenda);
          setEstatisticas(prev => ({ 
            ...prev, 
            totalGanho: prev.totalGanho + valorVenda,
            vendasMercado: prev.vendasMercado + quantidadeComprada
          }));

          const produtoInfo = produtos.find(p => p.id === parseInt(produtoId));
          toast({
            title: '💰 Venda no Mercado!',
            description: `NPC comprou ${quantidadeComprada}x ${produtoInfo?.nome || 'Produto'}`,
          });
        }
      }
    }, Math.random() * 20000 + 10000);

    return () => clearInterval(interval);
  }, [mercado, mercadoMultiplicador, toast]);

  // Check achievements
  const verificarConquistas = useCallback(() => {
    const stats = {
      ...estatisticas,
      totalEmpresas: Object.values(empresas).reduce((sum, qty) => sum + qty, 0),
      totalUpgrades: Object.keys(upgrades).length,
      totalFuncionarios: Object.values(funcionarios).reduce((sum, qty) => sum + qty, 0),
      prestigeNivel: prestige.nivel,
      saldoBanco: banco.saldo
    };

    conquistasData.forEach(conquista => {
      if (!conquistas[conquista.id] && conquista.condicao(stats)) {
        setConquistas(prev => ({ ...prev, [conquista.id]: true }));
        setDinheiro((prev) => conquista.ganho + prev)
        toast({
          title: '🏆 Conquista Desbloqueada!',
          description: conquista.nome,
        });
      }
    });
  }, [estatisticas, empresas, upgrades, funcionarios, prestige, banco, conquistas, toast]);

  useEffect(() => {
    verificarConquistas();
  }, [verificarConquistas]);

  const comprarProduto = useCallback((id, quantidade = 1) => {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const custoTotal = produto.preco * quantidade;
    
    if (dinheiro >= custoTotal) {
      setDinheiro(prev => prev - custoTotal);
      setInventario(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + quantidade
      }));
      
      toast({
        title: '✅ Compra realizada!',
        description: `${quantidade}x ${produto.nome}`,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        description: 'Você não tem dinheiro suficiente.',
        variant: 'destructive'
      });
    }
  }, [dinheiro, toast]);

  const venderProduto = useCallback((id, quantidade = 1) => {
    const produto = produtos.find(p => p.id === id);
    if (!produto || !inventario[id] || inventario[id] < quantidade) {
      toast({
        title: '❌ Erro!',
        description: 'Você não tem produtos suficientes.',
        variant: 'destructive'
      });
      return;
    }

    const valorVenda = produto.preco * quantidade * 0.5;
    
    setInventario(prev => {
      const novo = { ...prev };
      novo[id] -= quantidade;
      if (novo[id] <= 0) delete novo[id];
      return novo;
    });
    
    setDinheiro(prev => prev + valorVenda);
    setEstatisticas(prev => ({ 
      ...prev, 
      totalGanho: prev.totalGanho + valorVenda,
      totalVendido: prev.totalVendido + quantidade
    }));
    
    toast({
      title: '💰 Venda realizada!',
      description: `${quantidade}x ${produto.nome}`,
    });
  }, [inventario, toast]);

  const colocarNoMercado = useCallback((id, quantidade, preco) => {
    const produto = produtos.find(p => p.id === id);
    if (!produto || !inventario[id] || inventario[id] < quantidade) {
      toast({
        title: '❌ Erro!',
        description: 'Você não tem produtos suficientes.',
        variant: 'destructive'
      });
      return;
    }

    const precoMaximo = produto.preco * 1.1;
    if (preco > precoMaximo) {
      toast({
        title: '❌ Preço muito alto!',
        description: 'Máximo de 10% acima do preço base.',
        variant: 'destructive'
      });
      return;
    }

    setInventario(prev => {
      const novo = { ...prev };
      novo[id] -= quantidade;
      if (novo[id] <= 0) delete novo[id];
      return novo;
    });

    setMercado(prev => ({
      ...prev,
      [id]: {
        quantidade: (prev[id]?.quantidade || 0) + quantidade,
        preco
      }
    }));

    toast({
      title: '📦 Produto listado!',
      description: `${quantidade}x ${produto.nome} no mercado`,
    });
  }, [inventario, toast]);

  const comprarEmpresa = useCallback((id) => {
    const empresa = empresasData.find(e => e.id === id);
    if (!empresa) return;
    
    const quantidade = empresas[id] || 0;
    const custo = empresa.custo * Math.pow(1.15, quantidade);
    if(empresa.tipoCusto === "ouro"){
      if (ouro >= custo) {
      setOuro(prev => prev - custo);
      setEmpresas(prev => ({
        ...prev,
        [id]: quantidade + 1
      }));
      setEstatisticas(prev => ({ ...prev, totalEmpresas: prev.totalEmpresas + 1 }));
      
      toast({
        title: '🏢 Empresa comprada!',
        description: empresa.nome,
      });
    } else {
      toast({
        title: '❌ Ouro insuficiente!',
        variant: 'destructive'
      });
    }
    }
   else if(empresa.tipoCusto === "diamante"){
       if (diamantes >= custo) {
      setDiamantes(prev => prev - custo);
      setEmpresas(prev => ({
        ...prev,
        [id]: quantidade + 1
      }));
      setEstatisticas(prev => ({ ...prev, totalEmpresas: prev.totalEmpresas + 1 }));
      
      toast({
        title: '🏢 Empresa comprada!',
        description: empresa.nome,
      });
    } else {
      toast({
        title: '❌ Diamantes insuficiente!',
        variant: 'destructive'
      });
    }
    }
    else if (dinheiro >= custo) {
      setDinheiro(prev => prev - custo);
      setEmpresas(prev => ({
        ...prev,
        [id]: quantidade + 1
      }));
      setEstatisticas(prev => ({ ...prev, totalEmpresas: prev.totalEmpresas + 1 }));
      
      toast({
        title: '🏢 Empresa comprada!',
        description: empresa.nome,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }
  }, [dinheiro,ouro,diamantes, empresas, toast]);

  const comprarUpgrade = useCallback((id) => {
    const upgrade = upgradesData.find(u => u.id === id);
    if (!upgrade || upgrades[id]) return;
     if(upgrade.tipoCusto === "dinheiro"){ if (dinheiro >= upgrade.custo) {
      setDinheiro(prev => prev - upgrade.custo);
      setUpgrades(prev => ({ ...prev, [id]: true }));
      setEstatisticas(prev => ({ ...prev, totalUpgrades: prev.totalUpgrades + 1 }));
      
      toast({
        title: '⚡ Upgrade comprado!',
        description: upgrade.nome,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }}else if(upgrade.tipoCusto === "ouro"){
       if (ouro >= upgrade.custo) {
      setOuro(prev => prev - upgrade.custo);
      setUpgrades(prev => ({ ...prev, [id]: true }));
      setEstatisticas(prev => ({ ...prev, totalUpgrades: prev.totalUpgrades + 1 }));
      
      toast({
        title: '⚡ Upgrade comprado!',
        description: upgrade.nome,
      });
    } else {
      toast({
        title: '❌ Ouro insuficiente!',
        variant: 'destructive'
      });
    } 
    }
   else if(upgrade.tipoCusto === "diamante"){
       if (diamantes >= upgrade.custo) {
      setDiamantes(prev => prev - upgrade.custo);
      setUpgrades(prev => ({ ...prev, [id]: true }));
      setEstatisticas(prev => ({ ...prev, totalUpgrades: prev.totalUpgrades + 1 }));
      
      toast({
        title: '⚡ Upgrade comprado!',
        description: upgrade.nome,
      });
    } else {
      toast({
        title: '❌ Diamante insuficiente!',
        variant: 'destructive'
      });
    }
  }}, [dinheiro,ouro,diamantes, upgrades, toast]);

  const comprarFuncionario = useCallback((id) => {
    const funcionario = funcionariosData.find(f => f.id === id);
    if (!funcionario) return;

    const quantidade = funcionarios[id] || 0;
    const custo = funcionario.custo * Math.pow(1.2, quantidade);

    if (dinheiro >= custo) {
      setDinheiro(prev => prev - custo);
      setFuncionarios(prev => ({
        ...prev,
        [id]: quantidade + 1
      }));
      setEstatisticas(prev => ({ ...prev, totalFuncionarios: prev.totalFuncionarios + 1 }));
      
      toast({
        title: '👔 Funcionário contratado!',
        description: funcionario.nome,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }
  }, [dinheiro, funcionarios, toast]);

  const comprarGerador = useCallback((id, custo, renda) => {
    const quantidade = rendaPassiva[id] || 0;
    const custoFinal = custo * Math.pow(1.15, quantidade);

    if (dinheiro >= custoFinal) {
      setDinheiro(prev => prev - custoFinal);
      setRendaPassiva(prev => ({
        ...prev,
        [id]: quantidade + 1
      }));
      
      toast({
        title: '⚙️ Gerador comprado!',
        description: `+R$ ${renda}/5s`,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }
  }, [dinheiro, rendaPassiva, toast]);

 const fazerPrestige = useCallback(() => {
  if (dinheiro < 1000000000) {
    toast({
      title: '❌ Requisito não atendido!',
      description: 'Você precisa de R$ 1B para fazer prestige.',
      variant: 'destructive'
    });
    return;
  }

  const novoPrestige = {
    nivel: prestige.nivel + 1,
    multiplicador: 1.0 + ((prestige.nivel + 1) * 0.5)
  };

  // Reset do jogo
  setDiamantes(0);
  setOuro(0);
  setDinheiro(500);
  setUpgrades({});
  setInventario({});
  setEmpresas({});
  setMercado({});
  setRendaPassiva({});
  setBanco({ saldo: 0 });

  // Atualiza prestige
  setPrestige(novoPrestige);

  // Atualiza estatísticas
  setEstatisticas(prev => ({
    ...prev,
    prestigeNivel: prev.prestigeNivel + 1,
    totalGanho: 0,
    totalVendido: 0
  }));

  toast({
    title: '🌟 Prestige realizado!',
    description: `Nível ${novoPrestige.nivel} - Multiplicador: ${novoPrestige.multiplicador.toFixed(1)}x`,
  });
}, [dinheiro, prestige, toast]);

  const depositarBanco = useCallback((valor) => {
    if (dinheiro >= valor) {
      setDinheiro(prev => prev - valor);
      setBanco(prev => ({ saldo: prev.saldo + valor }));
      setEstatisticas(prev => ({ ...prev, saldoBanco: banco.saldo + valor }));
      
      toast({
        title: '🏦 Depósito realizado!',
        description: `R$ ${valor.toFixed(2)}`,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }
  }, [dinheiro, banco, toast]);

  const sacarBanco = useCallback((valor) => {
    if (banco.saldo >= valor) {
      setBanco(prev => ({ saldo: prev.saldo - valor }));
      setDinheiro(prev => prev + valor);
      
      toast({
        title: '🏦 Saque realizado!',
        description: `R$ ${valor.toFixed(2)}`,
      });
    } else {
      toast({
        title: '❌ Saldo insuficiente!',
        variant: 'destructive'
      });
    }
  }, [banco, toast]);

  const comprarAcao = useCallback((id, quantidade) => {
    const preco = precosAcoes[id];
    const custoTotal = preco * quantidade;

    if (dinheiro >= custoTotal) {
      setDinheiro(prev => prev - custoTotal);
      setInvestimentos(prev => ({
        ...prev,
        [id]: {
          quantidade: (prev[id]?.quantidade || 0) + quantidade,
          precoMedio: prev[id] 
            ? ((prev[id].precoMedio * prev[id].quantidade) + (preco * quantidade)) / ((prev[id].quantidade || 0) + quantidade)
            : preco
        }
      }));
      setEstatisticas(prev => ({ ...prev, totalInvestido: prev.totalInvestido + custoTotal }));
      
      toast({
        title: '📈 Ações compradas!',
        description: `${quantidade}x ações`,
      });
    } else {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
    }
  }, [dinheiro, precosAcoes, toast]);

  const venderAcao = useCallback((id, quantidade) => {
    const investimento = investimentos[id];
    if (!investimento || investimento.quantidade < quantidade) {
      toast({
        title: '❌ Ações insuficientes!',
        variant: 'destructive'
      });
      return;
    }

    const preco = precosAcoes[id];
    const valorVenda = preco * quantidade;

    setInvestimentos(prev => {
      const novo = { ...prev };
      novo[id].quantidade -= quantidade;
      if (novo[id].quantidade <= 0) delete novo[id];
      return novo;
    });
    
    setDinheiro(prev => prev + valorVenda);
    setEstatisticas(prev => ({ ...prev, totalGanho: prev.totalGanho + valorVenda }));
    
    toast({
      title: '📉 Ações vendidas!',
      description: `${quantidade}x ações`,
    });
  }, [investimentos, precosAcoes, toast]);


  const apostarCassino = useCallback((valor, tipo) => {
    if (dinheiro < valor) {
      toast({
        title: '❌ Dinheiro insuficiente!',
        variant: 'destructive'
      });
      return;
    }

    setDinheiro(prev => prev - valor);

    let ganhou = false;
    let multiplicador = 0;

    if (tipo === 'moeda') {
      ganhou = Math.random() < 0.5;
      multiplicador = 2;
    } else if (tipo === 'dado') {
      ganhou = Math.random() < 0.1667;
      multiplicador = 6;
    } else if (tipo === 'roleta') {
      ganhou = Math.random() < 0.027;
      multiplicador = 36;
    }

    if (ganhou) {
      const premio = valor * multiplicador;
      setDinheiro(prev => prev + premio);
      setEstatisticas(prev => ({ 
        ...prev, 
        casinoVitorias: prev.casinoVitorias + 1,
        totalGanho: prev.totalGanho + premio
      }));
      
      toast({
        title: '🎰 Você ganhou!',
        description: `Prêmio: R$ ${premio.toFixed(2)}`,
      });
    } else {
      toast({
        title: '😢 Você perdeu!',
        description: `Perdeu: R$ ${valor.toFixed(2)}`,
        variant: 'destructive'
      });
    }
  }, [dinheiro, toast]);

  return {
    dinheiro,
    ouro,
    diamantes,
    nivel,
    inventario,
    empresas,
    upgrades,
    funcionarios,
    prestige,
    banco,
    investimentos,
    mercado,
    conquistas,
    eventoAtivo,
    mercadoMultiplicador,
    precosAcoes,
    rendaPassiva,
    estatisticas,
    comprarOuro,
    comprarDiamante,
    comprarProduto,
    venderProduto,
    colocarNoMercado,
    comprarEmpresa,
    comprarUpgrade,
    comprarFuncionario,
    comprarGerador,
    fazerPrestige,
    depositarBanco,
    sacarBanco,
    comprarAcao,
    venderAcao,
    apostarCassino,
    calcularMultiplicador
  };
};
