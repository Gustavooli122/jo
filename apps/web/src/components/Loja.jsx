import React, { useState } from 'react';
import { produtos } from '../data/produtos.js';
import { formatMoney } from '../utils/formatters.js';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.jsx';

const Loja = ({ game }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const itemsPerPage = 20;

  const filteredProducts = produtos.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleBuy = () => {
    if (selectedProduct) {
      game.comprarProduto(selectedProduct.id, quantidade);
      setQuantidade(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProducts.map((produto) => {
          const precoAjustado = produto.preco * game.prestige.multiplicador;
          const quantidadeInventario = game.inventario[produto.id] || 0;

          return (
            <div
              key={produto.id}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all"
            >
              <h3 className="font-bold text-white mb-2">{produto.nome}</h3>
              <div className="space-y-2">
                <div className="text-green-400 font-bold">{formatMoney(precoAjustado)}</div>
                {quantidadeInventario > 0 && (
                  <div className="text-sm text-gray-400">Possui: {quantidadeInventario}</div>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedProduct(produto)}
                      className="w-full bg-[#3c83f6] gap-2"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 " />
                      Comprar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Comprar {produto.nome}</DialogTitle>
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
                          <span className="text-green-400">{formatMoney(precoAjustado)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-green-400">{formatMoney(precoAjustado * quantidade)}</span>
                        </div>
                      </div>
                      <Button onClick={handleBuy} className="w-full">
                        Confirmar Compra
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span className="px-4 py-2 text-white">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
};

export default Loja;