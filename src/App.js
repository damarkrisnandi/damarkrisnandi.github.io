
import './App.css';
import * as PIXI from "pixi.js";
import { AppProvider, Stage } from '@pixi/react';
import LibraryScene from './scenes/Library';
import WasdInfo from './info/wasd';



function App() {
  const app = new PIXI.Application({
    width: window.screen.width,
    height: window.screen.height,
    backgroundColor: 'black'

  });

  // detect
  window.globalThis.__PIXI_APP__ = app;
  
  return (
    <AppProvider value={app}>
      <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0x000, opacity: 100 }}>
        <LibraryScene />

        <WasdInfo />
      </Stage>
    </AppProvider>
      
      
    
  );
}

export default App;
