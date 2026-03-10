import React from 'react';
import { produtos } from '../data/produtos.js';
import { formatMoney } from '../utils/formatters.js';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { Button } from './ui/button.jsx';

const Mercado = ({ game }) => {
  const produtosMercado = Object.keys(game.mercado).map(id => ({
    ...produtos.find(p => p.id === parseInt(id)),
    ...game.mercado[id]
  }));

  const removerDoMercado = (id) => {
    const produto = game.mercado[id];
    if (produto) {
      game.setInventario(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + produto.quantidade
      }));
      game.setMercado(prev => {
        const novo = { ...prev };
        delete novo[id];
        return novo;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Multiplicador do Mercado</h3>
            <p className="text-sm text-gray-400">Atualizado a cada 15 segundos</p>
          </div>
          <div className="flex items-center gap-2">
            {game.mercadoMultiplicador >= 1 ? (
              <TrendingUp className="w-6 h-6 text-green-400" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-400" />
            )}
            <span className={`text-2xl font-bold ${game.mercadoMultiplicador >= 1 ? 'text-green-400' : 'text-red-400'}`}>
              x{game.mercadoMultiplicador.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {produtosMercado.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl">Nenhum produto no mercado</p>
          <p className="text-sm mt-2">Liste produtos do seu inventário!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {produtosMercado.map((produto) => {
            const precoFinal = produto.preco * game.mercadoMultiplicador;
            
            return (
              <div
                key={produto.id}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{produto.nome}</h3>
                  <Button
                    onClick={() => removerDoMercado(produto.id)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Quantidade: {produto.quantidade}</div>
                  <div className="text-sm text-gray-400">Preço base: {formatMoney(produto.preco)}</div>
                  <div className="text-lg font-bold text-green-400">
                    Preço atual: {formatMoney(precoFinal)}
                  </div>
                  <div className="text-xs text-gray-500">
                    NPCs podem comprar a qualquer momento
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Mercado;