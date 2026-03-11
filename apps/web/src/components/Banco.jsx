import React, { useState } from 'react';
import { formatMoney } from '../utils/formatters.js';
import { Landmark, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Coins } from 'lucide-react';
const Banco = ({ game }) => {
  const [valorDeposito, setValorDeposito] = useState('');
  const [valorSaque, setValorSaque] = useState('');

    const comprarDiamond = ()=> game.comprarDiamante();
  const comprarGold = () => game.comprarOuro();

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Card Diamantes */}
  <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 flex flex-col justify-between">
    <div className="mb-4">
      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
        <Coins className="w-6 h-6 text-blue-400" />
        Comprar Diamantes
      </h3>
      <p className="text-gray-400">Valor: <span className=" font-semibold text-yellow-400">100 Ouro</span></p>
      <p className="text-gray-400 mt-1">Possui: <span className="text-purple-400 font-semibold">{game.diamantes}</span></p>
    </div>
    <Button onClick={comprarDiamond} className="w-full">
      Comprar
    </Button>
  </div>

  {/* Card Ouro */}
  <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 flex flex-col justify-between">
    <div className="mb-4">
      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
        <Coins className="w-6 h-6 text-yellow-400" />
        Comprar Ouro
      </h3>
      <p className="text-gray-400">Valor: <span className=" font-semibold text-green-500">R$ 10.000.000</span></p>
      <p className="text-gray-400 mt-1">Possui: <span className="text-yellow-400 font-semibold">{game.ouro}</span></p>
    </div>
    <Button onClick={comprarGold} className="w-full">
      Comprar
    </Button>
  </div>
</div>
    </div>
  );
};

export default Banco;