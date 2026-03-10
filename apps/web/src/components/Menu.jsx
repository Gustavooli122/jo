import React from 'react';
import { motion } from 'framer-motion';

const Menu = ({ activeTab, setActiveTab }) => {
  const tabs = [
    'Loja',
    'Inventário',
    'Mercado',
    'Empresas',
    'Upgrades',
    'Renda Passiva',
    'Banco',
    'Investimentos',
    'Cassino',
    'Funcionários',
    'Conquistas',
    'Prestige'
  ];

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 py-3 min-w-max">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;