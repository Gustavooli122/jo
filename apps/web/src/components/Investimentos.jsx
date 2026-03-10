import React, { useState } from 'react';
import { ativos as ativosData } from '../data/ativos.js';
import { formatMoney } from '../utils/formatters.js';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const Investimentos = ({ game }) => {
  const [selectedAtivo, setSelectedAtivo] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [action, setAction] = useState('');

  const calcularValorPortfolio = () => {
    let total = 0;
    Object.keys(game.investimentos).forEach(id => {
      const inv = game.investimentos[id];
      const precoAtual = game.precosAcoes[id];
      total += inv.quantidade * precoAtual;
    });
    return total;
  };

  const calcularLucro = (id) => {
    const inv = game.investimentos[id];
    if (!inv) return 0;
    const precoAtual = game.precosAcoes[id];
    return (precoAtual - inv.precoMedio) * inv.quantidade;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Valor do Portfólio</h3>
            <p className="text-2xl font-bold text-indigo-400">{formatMoney(calcularValorPortfolio())}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ativosData.map((ativo) => {
          const precoAtual = game.precosAcoes[ativo.id] || ativo.precoInicial;
          const variacao = ((precoAtual - ativo.precoInicial) / ativo.precoInicial) * 100;
          const investimento = game.investimentos[ativo.id];
          const lucro = calcularLucro(ativo.id);

          return (
            <div
              key={ativo.id}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
            >
              <h3 className="font-bold text-white mb-2">{ativo.nome}</h3>
              <p className="text-xs text-gray-400 mb-3">{ativo.descricao}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Preço atual:</span>
                  <span className="text-white font-bold">{formatMoney(precoAtual)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Variação:</span>
                  <div className="flex items-center gap-1">
                    {variacao >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={variacao >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {variacao >= 0 ? '+' : ''}{variacao.toFixed(2)}%
                    </span>
                  </div>
                </div>
                {investimento && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Possui:</span>
                      <span className="text-white font-bold">{investimento.quantidade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Preço médio:</span>
                      <span className="text-white">{formatMoney(investimento.precoMedio)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lucro/Prejuízo:</span>
                      <span className={lucro >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {formatMoney(lucro)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setSelectedAtivo(ativo);
                        setAction('buy');
                        setQuantidade(1);
                      }}
                      className="flex-1"
                      size="sm"
                    >
                      Comprar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Comprar {ativo.nome}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400">Quantidade</label>
                        <Input
                          type="number"
                          min="1"
                          value={quantidade}
                          onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Preço unitário:</span>
                          <span className="text-white">{formatMoney(precoAtual)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-green-400">{formatMoney(precoAtual * quantidade)}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          game.comprarAcao(ativo.id, quantidade);
                          setQuantidade(1);
                        }}
                        className="w-full"
                      >
                        Confirmar Compra
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {investimento && investimento.quantidade > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedAtivo(ativo);
                          setAction('sell');
                          setQuantidade(1);
                        }}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        Vender
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Vender {ativo.nome}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">Quantidade (máx: {investimento.quantidade})</label>
                          <Input
                            type="number"
                            min="1"
                            max={investimento.quantidade}
                            value={quantidade}
                            onChange={(e) => setQuantidade(Math.min(investimento.quantidade, parseInt(e.target.value) || 1))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Preço de venda:</span>
                            <span className="text-white">{formatMoney(precoAtual)}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-green-400">{formatMoney(precoAtual * quantidade)}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            game.venderAcao(ativo.id, quantidade);
                            setQuantidade(1);
                          }}
                          className="w-full"
                        >
                          Confirmar Venda
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Investimentos;