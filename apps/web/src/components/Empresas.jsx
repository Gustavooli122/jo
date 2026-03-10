import React from 'react';
import { empresas as empresasData } from '../data/empresas.js';
import { formatMoney } from '../utils/formatters.js';
import { Building2, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Empresas = ({ game }) => {
  const getTierColor = (custo) => {
    if (custo < 100000) return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
    if (custo < 1000000) return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
    if (custo < 50000000) return 'from-pink-500/20 to-pink-600/20 border-pink-500/30';
    return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
  };

  const calcularRendaTotal = () => {
    let total = 0;
    Object.keys(game.empresas).forEach(id => {
      const empresa = empresasData.find(e => e.id === id);
      if (empresa) {
        total += empresa.renda * game.empresas[id];
      }
    });
    return total * game.calcularMultiplicador();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Renda Passiva Total</h3>
            <p className="text-2xl font-bold text-green-400">R$ {formatMoney(calcularRendaTotal())}/5s</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {empresasData.map((empresa) => {
          const quantidade = game.empresas[empresa.id] || 0;
          const custoAtual = empresa.custo * Math.pow(1.15, quantidade);
          const rendaAtual = empresa.renda * quantidade * game.calcularMultiplicador();

          return (
            <motion.div
              key={empresa.id}
              className={`bg-gradient-to-br ${getTierColor(empresa.custo)} backdrop-blur border rounded-lg p-4`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Building2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{empresa.nome}</h3>
                  <p className="text-xs text-gray-400">{empresa.descricao}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Custo:</span>
                  <span className="text-yellow-400 font-bold">R$ {formatMoney(custoAtual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Renda:</span>
                  <span className="text-green-400 font-bold">R$ {formatMoney(empresa.renda)}/5s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Possui:</span>
                  <span className="text-white font-bold">{quantidade}</span>
                </div>
                {quantidade > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Renda total:</span>
                    <span className="text-green-400 font-bold">R$ {formatMoney(rendaAtual)}/5s</span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => game.comprarEmpresa(empresa.id)}
                className="w-full mt-4"
                disabled={game.dinheiro < custoAtual}
              >
                Comprar
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Empresas;