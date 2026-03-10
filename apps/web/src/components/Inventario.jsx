import React, { useState } from 'react';
import { produtos } from '../data/produtos.js';
import { formatMoney } from '../utils/formatters.js';
import { DollarSign, Store } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.jsx';

const Inventario = ({ game }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [precoMercado, setPrecoMercado] = useState(0);
  const [action, setAction] = useState('');

  const produtosInventario = Object.keys(game.inventario)
    .filter(id => game.inventario[id] > 0)
    .map(id => ({
      ...produtos.find(p => p.id === parseInt(id)),
      quantidade: game.inventario[id]
    }));

  const handleSell = () => {
    if (selectedProduct) {
      game.venderProduto(selectedProduct.id, quantidade);
      setQuantidade(1);
    }
  };

  const handleMarket = () => {
    if (selectedProduct && precoMercado > 0) {
      game.colocarNoMercado(selectedProduct.id, quantidade, precoMercado);
      setQuantidade(1);
      setPrecoMercado(0);
    }
  };

  return (
    <div className="space-y-6">
      {produtosInventario.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl">Seu inventário está vazio</p>
          <p className="text-sm mt-2">Compre produtos na loja!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {produtosInventario.map((produto) => (
            <div
              key={produto.id}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4"
            >
              <h3 className="font-bold text-white mb-2">{produto.nome}</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Quantidade: {produto.quantidade}</div>
                <div className="text-sm text-gray-400">Valor de venda: R$ {formatMoney(produto.preco * 0.5)}</div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedProduct(produto);
                          setAction('sell');
                          setQuantidade(1);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Vender
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Vender {produto.nome}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">Quantidade (máx: {produto.quantidade})</label>
                          <Input
                            type="number"
                            min="1"
                            max={produto.quantidade}
                            value={quantidade}
                            onChange={(e) => setQuantidade(Math.min(produto.quantidade, parseInt(e.target.value) || 1))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Valor unitário:</span>
                            <span className="text-green-400"> R$ {formatMoney(produto.preco * 0.5)}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-green-400">R$ {formatMoney(produto.preco * 0.5 * quantidade)}</span>
                          </div>
                        </div>
                        <Button onClick={handleSell} className="w-full">
                          Confirmar Venda
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedProduct(produto);
                          setAction('market');
                          setQuantidade(1);
                          setPrecoMercado(produto.preco);
                        }}
                        size="sm"
                        className="flex-1 gap-2"
                      >
                        <Store className="w-4 h-4" />
                        Mercado
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Colocar no Mercado</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">Quantidade (máx: {produto.quantidade})</label>
                          <Input
                            type="number"
                            min="1"
                            max={produto.quantidade}
                            value={quantidade}
                            onChange={(e) => setQuantidade(Math.min(produto.quantidade, parseInt(e.target.value) || 1))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Preço (máx: {formatMoney(produto.preco * 1.1)})</label>
                          <Input
                            type="number"
                            min={produto.preco}
                            max={produto.preco * 1.1}
                            value={precoMercado}
                            onChange={(e) => setPrecoMercado(parseFloat(e.target.value) || produto.preco)}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="text-xs text-yellow-400">
                          * Máximo de 10% acima do preço base
                        </div>
                        <Button onClick={handleMarket} className="w-full">
                          Listar no Mercado
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventario;