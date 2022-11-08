import logo from './logo.svg';
import './App.css';
import { 
  WalletProvider,
  ConnectWalletModal,
  getDefaultWallets,
  ConnectButton,
  useWallet,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { useEffect } from 'react';

const supportedWallets = getDefaultWallets();

/**
 * App Component
 * @returns 
 */
function App() {
  // get useWallet object
  const { 
    select,
    connected, 
    getAccounts,
    signAndExecuteTransaction,
    groupWallets
  } = useWallet();

  /**
   * ボタンをクリックした時に実行する処理
   */
  const handleClick = async () => {
    await signAndExecuteTransaction({
      kind: 'moveCall',
      data: {
        packageObjectId: '0x2',
        module: 'devnet_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
          'name',
          'capy',
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
        ],
        gasBudget: 10000,
      },
    });
  };

  useEffect(() => {
    if (connected) {
      getAccounts().then((accounts) => {
        console.log(accounts);
      });
    }
  }, [connected]);

  return (
    <WalletProvider supportedWallets={supportedWallets}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ConnectWalletModal
            groupWallets={groupWallets}
            onWalletClick={(wallet) => {
              if (!wallet.installed) return;
              select(wallet.name);
              console.log("wallet", wallet.name)
            }}
          >
            <ConnectButton>ConnectWallet</ConnectButton>
          </ConnectWalletModal>
          {!connected ? (
            <strong>Please Connect Wallet!!</strong>
          ) : (
            <div>
              <strong>Welcome to my Dapp!!</strong>
              <button 
                onClick={handleClick}
              >
                send transaction
              </button>
            </div>
          )}
        </header>
      </div>
    </WalletProvider>
  );
}

export default App;
