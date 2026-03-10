import React, { useState } from 'react';
import { formatMoney } from '../utils/formatters.js';
import { Dices, Coins, CircleDot } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { motion } from 'framer-motion';

const Cassino = ({ game }) => {
  const [valorAposta, setValorAposta] = useState('');
  const [resultado, setResultado] = useState(null);

  const jogar = (tipo) => {
    const valor = parseFloat(valorAposta);
    if (valor <= 0 || isNaN(valor)) {
      alert('Digite um valor válido!');
      return;
    }

    game.apostarCassino(valor, tipo);
    setValorAposta('');
    
    // Simulate result animation
    setTimeout(() => {
      setResultado(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">🎰 Cassino</h2>
        <p className="text-gray-400">Teste sua sorte e ganhe grandes prêmios!</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
        <label className="text-sm text-gray-400 mb-2 block">Valor da Aposta</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={valorAposta}
            onChange={(e) => setValorAposta(e.target.value)}
            placeholder="0.00"
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button
            onClick={() => setValorAposta((game.dinheiro * 0.1).toString())}
            variant="outline"
          >
            10%
          </Button>
          <Button
            onClick={() => setValorAposta((game.dinheiro * 0.5).toString())}
            variant="outline"
          >
            50%
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border border-yellow-500/30 rounded-lg p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="font-bold text-white">Cara ou Coroa</h3>
              <p className="text-xs text-gray-400">50% de chance</p>
            </div>
          </div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Chance:</span>
              <span className="text-white">50%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Prêmio:</span>
              <span className="text-green-400 font-bold">2x</span>
            </div>
          </div>
          <Button
            onClick={() => jogar('moeda')}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            Jogar
          </Button>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Dices className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="font-bold text-white">Dado</h3>
              <p className="text-xs text-gray-400">16.67% de chance</p>
            </div>
          </div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Chance:</span>
              <span className="text-white">16.67%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Prêmio:</span>
              <span className="text-green-400 font-bold">6x</span>
            </div>
          </div>
          <Button
            onClick={() => jogar('dado')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Jogar
          </Button>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CircleDot className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="font-bold text-white">Roleta</h3>
              <p className="text-xs text-gray-400">2.7% de chance</p>
            </div>
          </div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Chance:</span>
              <span className="text-white">2.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Prêmio:</span>
              <span className="text-green-400 font-bold">36x</span>
            </div>
          </div>
          <Button
            onClick={() => jogar('roleta')}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Jogar
          </Button>
        </motion.div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
        <h3 className="font-bold text-white mb-2">Estatísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400">Vitórias no Cassino</div>
            <div className="text-2xl font-bold text-green-400">{game.estatisticas.casinoVitorias}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cassino;