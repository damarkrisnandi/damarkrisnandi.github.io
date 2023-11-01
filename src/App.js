
import './App.css';
import * as PIXI from "pixi.js";
import PlayerSprite from './players/Players';
import { AppProvider, Stage } from '@pixi/react';
import LibraryScene from './scenes/Library';



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
      <Stage width={window.screen.width} height={window.screen.width} options={{ backgroundColor: 0x000, opacity: 100 }}>
        <LibraryScene />
        <PlayerSprite />
      </Stage>
    </AppProvider>
      
      
    
  );
}

export default App;
