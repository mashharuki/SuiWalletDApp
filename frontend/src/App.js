import logo from './logo.svg';
import './App.css';
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <strong>Welcome to my Dapp!!</strong>
        </header>
      </div>
    </WalletProvider>
  );
}

export default App;
