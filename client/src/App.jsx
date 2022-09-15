import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Content from "./components/Content"
import Header from "./components/Header";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div>
          <Header />
          <Content/>
          <Footer />
        </div>
      </div>
      </EthProvider>
 );
}

export default App;
