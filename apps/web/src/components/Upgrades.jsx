import React from 'react';
import { upgrades as upgradesData } from '../data/upgrades.js';
import { formatMoney } from '../utils/formatters.js';
import { Zap, Check } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { motion } from 'framer-motion';

const Upgrades = ({ game }) => {
  const multiplicadorTotal = game.calcularMultiplicador();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Multiplicador Total</h3>
            <p className="text-2xl font-bold text-purple-400">x{multiplicadorTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {upgradesData.map((upgrade) => {
          const possuido = game.upgrades[upgrade.id] || false;

          return (
            <motion.div
              key={upgrade.id}
              className={`backdrop-blur border rounded-lg p-4 ${
                possuido
                  ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50'
                  : 'bg-gray-800/50 border-gray-700'
              }`}
              whileHover={{ scale: possuido ? 1 : 1.02 }}
            >
              <div className="flex items-start gap-3 mb-3">
                {possuido ? (
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <Zap className="w-6 h-6 text-purple-400 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-white">{upgrade.nome}</h3>
                  <p className="text-xs text-gray-400">{upgrade.descricao}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Multiplicador:</span>
                  <span className="text-purple-400 font-bold">x{upgrade.multiplicador}</span>
                </div>
                {!possuido && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Custo:</span>
                    <span className="text-yellow-400 font-bold">R$ {formatMoney(upgrade.custo)}</span>
                  </div>
                )}
              </div>

              {possuido ? (
                <div className="w-full py-2 text-center bg-green-900/30 rounded-lg text-green-400 font-bold">
                  Adquirido
                </div>
              ) : (
                <Button
                  onClick={() => game.comprarUpgrade(upgrade.id)}
                  className="w-full"
                  disabled={game.dinheiro < upgrade.custo}
                >
                  Comprar
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Upgrades;