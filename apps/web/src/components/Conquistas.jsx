import React from 'react';
import { conquistas as conquistasData } from '../data/conquistas.js';
import { Trophy, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Conquistas = ({ game }) => {
  const conquistasDesbloqueadas = Object.keys(game.conquistas).filter(id => game.conquistas[id]).length;
  const totalConquistas = conquistasData.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Progresso de Conquistas</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {conquistasDesbloqueadas} / {totalConquistas}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${(conquistasDesbloqueadas / totalConquistas) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {conquistasData.map((conquista) => {
          const desbloqueada = game.conquistas[conquista.id] || false;

          return (
            <motion.div
              key={conquista.id}
              className={`backdrop-blur border rounded-lg p-4 ${
                desbloqueada
                  ? 'bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/50'
                  : 'bg-gray-800/30 border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                {desbloqueada ? (
                  <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                ) : (
                  <Lock className="w-6 h-6 text-gray-500 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className={`font-bold ${desbloqueada ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {conquista.nome}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{conquista.descricao}</p>
                  {desbloqueada && (
                    <div className="mt-2 text-xs text-green-400">✓ Desbloqueada</div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Conquistas;