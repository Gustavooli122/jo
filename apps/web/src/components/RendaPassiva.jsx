import React from 'react';
import { formatMoney } from '../utils/formatters.js';
import { Cog, TrendingUp } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { motion } from 'framer-motion';

const RendaPassiva = ({ game }) => {
  const geradores = [
    { id: 'gen1', nome: 'Gerador Básico', renda: 50, custo: 1000 },
    { id: 'gen2', nome: 'Gerador Médio', renda: 100, custo: 5000 },
    { id: 'gen3', nome: 'Gerador Avançado', renda: 200, custo: 20000 },
    { id: 'gen4', nome: 'Gerador Premium', renda: 500, custo: 100000 },
    { id: 'gen5', nome: 'Gerador Elite', renda: 1000, custo: 500000 }
  ];

  const calcularRendaTotal = () => {
    let total = 0;
    geradores.forEach(gerador => {
      const quantidade = game.rendaPassiva[gerador.id] || 0;
      total += gerador.renda * quantidade;
    });
    return total * game.calcularMultiplicador();
  };

  const calcularROI = (custo, renda) => {
    const rendaPorSegundo = (renda * game.calcularMultiplicador()) / 5;
    const segundos = custo / rendaPorSegundo;
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) return `${horas}h ${minutos % 60}m`;
    if (minutos > 0) return `${minutos}m`;
    return `${Math.floor(segundos)}s`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Renda Passiva Total</h3>
            <p className="text-2xl font-bold text-cyan-400">R$ {formatMoney(calcularRendaTotal())}/5s</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {geradores.map((gerador) => {
          const quantidade = game.rendaPassiva[gerador.id] || 0;
          const custoAtual = gerador.custo * Math.pow(1.15, quantidade);
          const rendaAtual = gerador.renda * quantidade * game.calcularMultiplicador();

          return (
            <motion.div
              key={gerador.id}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Cog className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{gerador.nome}</h3>
                  <p className="text-xs text-gray-400">Gerador automático de renda</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Custo:</span>
                  <span className="text-yellow-400 font-bold">R$ {formatMoney(custoAtual)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Renda:</span>
                  <span className="text-green-400 font-bold">R$ {formatMoney(gerador.renda)}/5s</span>
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
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-blue-400 font-bold">{calcularROI(custoAtual, gerador.renda)}</span>
                </div>
              </div>

              <Button
                onClick={() => game.comprarGerador(gerador.id, gerador.custo, gerador.renda)}
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

export default RendaPassiva;