import React from 'react';
import { funcionarios as funcionariosData } from '../data/funcionarios.js';
import { formatMoney } from '../utils/formatters.js';
import { Users, TrendingUp } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { motion } from 'framer-motion';

const Funcionarios = ({ game }) => {
  const calcularBonusTotal = () => {
    let bonus = 0;
    Object.keys(game.funcionarios).forEach(id => {
      const func = funcionariosData.find(f => f.id === id);
      if (func && game.funcionarios[id] > 0) {
        bonus += func.bonus * game.funcionarios[id];
      }
    });
    return bonus * 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-orange-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Bônus Total de Renda</h3>
            <p className="text-2xl font-bold text-orange-400">+{calcularBonusTotal().toFixed(0)}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {funcionariosData.map((funcionario) => {
          const quantidade = game.funcionarios[funcionario.id] || 0;
          const custoAtual = funcionario.custo * Math.pow(1.2, quantidade);
          const bonusAtual = funcionario.bonus * quantidade * 100;

          return (
            <motion.div
              key={funcionario.id}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Users className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{funcionario.nome}</h3>
                  <p className="text-xs text-gray-400">{funcionario.descricao}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Custo:</span>
                  <span className="text-yellow-400 font-bold">R$ {formatMoney(custoAtual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bônus:</span>
                  <span className="text-green-400 font-bold">+{(funcionario.bonus * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contratados:</span>
                  <span className="text-white font-bold">{quantidade}</span>
                </div>
                {quantidade > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bônus total:</span>
                    <span className="text-green-400 font-bold">+{bonusAtual.toFixed(0)}%</span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => game.comprarFuncionario(funcionario.id)}
                className="w-full mt-4"
                disabled={game.dinheiro < custoAtual}
              >
                Contratar
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Funcionarios;