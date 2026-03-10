import React from 'react';
import { formatMoney } from '../utils/formatters.js';
import { Star, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const Prestige = ({ game }) => {
  const requisito = 1000000000;
  const podePrestigiar = game.dinheiro >= requisito;
  const proximoMultiplicador = 1.0 + ((game.prestige.nivel + 1) * 0.5);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Sistema de Prestige</h3>
            <p className="text-sm text-gray-400">Reinicie seu progresso para ganhar multiplicadores permanentes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-white mb-4">Status Atual</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Nível de Prestige:</span>
              <span className="text-purple-400 font-bold">{game.prestige.nivel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Multiplicador Atual:</span>
              <span className="text-purple-400 font-bold">x{game.prestige.multiplicador.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dinheiro Atual:</span>
              <span className="text-green-400 font-bold">{formatMoney(game.dinheiro)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-white mb-4">Próximo Prestige</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Requisito:</span>
              <span className="text-yellow-400 font-bold">{formatMoney(requisito)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Novo Nível:</span>
              <span className="text-purple-400 font-bold">{game.prestige.nivel + 1}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Novo Multiplicador:</span>
              <span className="text-purple-400 font-bold">x{proximoMultiplicador.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-400 mb-2">O que será resetado:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Dinheiro (volta para R$ 500)</li>
              <li>• Inventário</li>
              <li>• Empresas</li>
              <li>• Mercado</li>
              <li>• Geradores de Renda Passiva</li>
              <li>• Saldo do Banco</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Star className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-green-400 mb-2">O que será mantido:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Upgrades</li>
              <li>• Funcionários</li>
              <li>• Conquistas</li>
              <li>• Investimentos</li>
              <li>• Multiplicador de Prestige (aumentado)</li>
            </ul>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={!podePrestigiar}
            className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
          >
            {podePrestigiar ? '🌟 Fazer Prestige' : `Requisito: ${formatMoney(requisito)}`}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Prestige?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Você está prestes a fazer prestige. Seu progresso será resetado, mas você ganhará um multiplicador permanente de x{proximoMultiplicador.toFixed(1)}.
              Esta ação não pode ser desfeita!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => game.fazerPrestige()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Confirmar Prestige
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Prestige;