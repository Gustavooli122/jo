import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useGame } from '../hooks/useGame.js';
import TopBar from '../components/TopBar.jsx';
import Menu from '../components/Menu.jsx';
import Loja from '../components/Loja.jsx';
import Inventario from '../components/Inventario.jsx';
import Mercado from '../components/Mercado.jsx';
import Empresas from '../components/Empresas.jsx';
import Upgrades from '../components/Upgrades.jsx';
import RendaPassiva from '../components/RendaPassiva.jsx';
import Banco from '../components/Banco.jsx';
import Investimentos from '../components/Investimentos.jsx';
import Cassino from '../components/Cassino.jsx';
import Funcionarios from '../components/Funcionarios.jsx';
import Conquistas from '../components/Conquistas.jsx';
import Prestige from '../components/Prestige.jsx';
import { Toaster } from '../components/ui/toaster';

const HomePage = () => {
  const game = useGame();
  const [activeTab, setActiveTab] = useState('Loja');

  return (
    <>
      <Helmet>
        <title>Business Empire Tycoon - Construa Seu Império</title>
        <meta name="description" content="Construa seu império empresarial do zero! Compre produtos, invista em empresas, faça upgrades e domine o mercado neste jogo idle incremental." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <TopBar game={game} />
        <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'Loja' && <Loja game={game} />}
          {activeTab === 'Inventário' && <Inventario game={game} />}
          {activeTab === 'Mercado' && <Mercado game={game} />}
          {activeTab === 'Empresas' && <Empresas game={game} />}
          {activeTab === 'Upgrades' && <Upgrades game={game} />}
          {activeTab === 'Renda Passiva' && <RendaPassiva game={game} />}
          {activeTab === 'Banco' && <Banco game={game} />}
          {activeTab === 'Investimentos' && <Investimentos game={game} />}
          {activeTab === 'Cassino' && <Cassino game={game} />}
          {activeTab === 'Funcionários' && <Funcionarios game={game} />}
          {activeTab === 'Conquistas' && <Conquistas game={game} />}
          {activeTab === 'Prestige' && <Prestige game={game} />}
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default HomePage;