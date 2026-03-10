import React from 'react';
import { motion } from 'framer-motion';
import { formatMoney } from '../utils/formatters.js';
import { Save, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button.jsx';

const TopBar = ({ game }) => {
  const { dinheiro, nivel, eventoAtivo, prestige } = game;

  const handleSave = () => {
    const gameData = {
      dinheiro: game.dinheiro,
      inventario: game.inventario,
      empresas: game.empresas,
      upgrades: game.upgrades,
      funcionarios: game.funcionarios,
      prestige: game.prestige,
      banco: game.banco,
      investimentos: game.investimentos,
      mercado: game.mercado,
      conquistas: game.conquistas,
      rendaPassiva: game.rendaPassiva,
      estatisticas: game.estatisticas
    };
    localStorage.setItem('businessEmpireGame', JSON.stringify(gameData));
    alert('Jogo salvo com sucesso!');
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 px-4 py-3 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <motion.div
            key={dinheiro}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-6 h-6 text-green-400" />
            <div>
              <div className="text-xs text-gray-400">Dinheiro</div>
              <div className="text-xl font-bold text-green-400">{formatMoney(dinheiro)}</div>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-xs text-gray-400">Nível</div>
              <div className="text-lg font-bold text-yellow-400">{nivel}</div>
            </div>
          </div>

          {prestige.nivel > 0 && (
            <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1 rounded-lg border border-purple-500/30">
              <div className="text-xs text-gray-400">Prestige</div>
              <div className="text-lg font-bold text-purple-400">x{prestige.multiplicador.toFixed(1)}</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {eventoAtivo && Date.now() < eventoAtivo.fim && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600 ${eventoAtivo.cor}`}
            >
              <div className="text-xs text-gray-400">Evento Ativo</div>
              <div className="font-bold">{eventoAtivo.tipo}</div>
              <div className="text-xs">x{eventoAtivo.multiplicador}</div>
            </motion.div>
          )}

          <Button onClick={handleSave} variant="outline" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;