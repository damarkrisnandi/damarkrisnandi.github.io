import { CustomPIXIComponent } from "react-pixi-fiber/index.js";
import * as PIXI from "pixi.js";

export default CustomPIXIComponent(
  {
    customDisplayObject: function (props) {
        console.log(props);
      return new PIXI.AnimatedSprite(props.textures, props.autoupdate);
    }
  },
  "AnimatedSprite"
);