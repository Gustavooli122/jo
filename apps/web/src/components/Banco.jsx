import React, { useState } from 'react';
import { formatMoney } from '../utils/formatters.js';
import { Landmark, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
const Banco = ({ game }) => {
  const [valorDeposito, setValorDeposito] = useState('');
  const [valorSaque, setValorSaque] = useState('');

  
  const handleDepositar = () => {
    const valor = parseFloat(valorDeposito);
    if (valor > 0) {
      game.depositarBanco(valor);
      setValorDeposito('');
    }
  };

  const handleSacar = () => {
    const valor = parseFloat(valorSaque);
    if (valor > 0) {
      game.sacarBanco(valor);
      setValorSaque('');
    }
  };

  const calcularJurosProjetados = (tempo) => {
    const taxaPor5s = 0.005;
    const periodos = tempo / 5;
    return game.banco.saldo * Math.pow(1 + taxaPor5s, periodos);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Landmark className="w-8 h-8 text-emerald-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Saldo no Banco</h3>
            <p className="text-2xl font-bold text-emerald-400">R$ {formatMoney(game.banco.saldo)}</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>Taxa de juros: 0.5% a cada 5 segundos</p>
          <p className="text-xs mt-1">Equivalente a ~6% por minuto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <ArrowDownToLine className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white">Depositar</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Valor</label>
              <Input
                type="number"
                value={valorDeposito}
                onChange={(e) => setValorDeposito(e.target.value)}
                placeholder="0.00"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setValorDeposito(game.dinheiro.toString())}
                variant="outline"
                size="sm"
              >
                Tudo
              </Button>
              <Button
                onClick={() => setValorDeposito((game.dinheiro / 2).toString())}
                variant="outline"
                size="sm"
              >
                50%
              </Button>
            </div>
            <Button onClick={handleDepositar} className="w-full">
              Depositar
            </Button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpFromLine className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-white">Sacar</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Valor</label>
              <Input
                type="number"
                value={valorSaque}
                onChange={(e) => setValorSaque(e.target.value)}
                placeholder="0.00"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setValorSaque(game.banco.saldo.toString())}
                variant="outline"
                size="sm"
              >
                Tudo
              </Button>
              <Button
                onClick={() => setValorSaque((game.banco.saldo / 2).toString())}
                variant="outline"
                size="sm"
              >
                50%
              </Button>
            </div>
            <Button onClick={handleSacar} className="w-full">
              Sacar
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
        <h3 className="font-bold text-white mb-4">Projeção de Ganhos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Em 1 minuto</div>
            <div className="text-lg font-bold text-green-400">
             R$ {formatMoney(calcularJurosProjetados(60))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Em 5 minutos</div>
            <div className="text-lg font-bold text-green-400">
             R$ {formatMoney(calcularJurosProjetados(300))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Em 1 hora</div>
            <div className="text-lg font-bold text-green-400">
             R$ {formatMoney(calcularJurosProjetados(3600))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Em 1 dia</div>
            <div className="text-lg font-bold text-green-400">
             R$ {formatMoney(calcularJurosProjetados(86400))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banco;