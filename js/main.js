window.onload = function () {

    window.loader = new Loader();

    loader.preload(["img/pony.png", "img/bullet.png", "img/cloud.png"], function () {

        // creates renderer
        window.renderer = new Renderer();

        //creates keyboardManager
        window.keyboardManager = new KeyboardManager();

        // starts render loop
        renderer.animate(0);


      // create new Pixi Sprite with Pixi Texture from Loader
        var pony = new PIXI.Sprite(loader.getTexture("img/pony.png"));

        //Set sprite scale
        pony.scale.set(0.3);

        //Set sprite position
        pony.position.set(120, 600);

        //Set sprite anchor: x=0.5 and y=0.5
        pony.anchor.set(0.5, 0.5);

        //Create update function: moving pony with defined speed by selected angle
        pony.update = function () {
            if (pony.direction === 'left') {
              if (pony.position.x > 120) {pony.position.x -= 5; }
            } else if (pony.direction === 'right') {
              if (pony.position.x < 1070) {pony.position.x += 5; }
            }
        };

        var bullet = new PIXI.Sprite(loader.getTexture("img/bullet.png"));

        bullet.scale.set(0.1);
        bullet.position.set(120, 900);
        bullet.anchor.set(0.5, 0.5);

        bullet.update = function () {

            if (bullet.alive === true) {
              bullet.position.y -= 5;

              if (isCollided(cloud.position.x, cloud.position.y, cloud.width , cloud.height, bullet.position.x, bullet.position.y)) {
                cloud.position.y = 1200;
                bullet.position.y = -50;
              }
            }
        };

        function isCollided(x, y, w, h, x1, y1) {
          if (x1 > x && x1 < x + w && y1 > y && y1 < y + h) {
            return true;
          } else {
            return false;
          }
        }

        var cloud = new PIXI.Sprite(loader.getTexture("img/cloud.png"));

        cloud.scale.set(0.3);
        cloud.position.set(130, 150);

        cloud.update = function (dT) {
            //Define moving object speed
            var speed = 5 / 200 * dT;
            //Update sprite position
            this.position.x += speed * Math.cos(this.rotation);
            this.position.y += speed * Math.sin(this.rotation);
        };

        var style = {
          fontSize: "3.5em",
          fill: "#FADDAF",
          fontWeight: "700"
        };
        var message = new PIXI.Text("WELCOME TO GAME DEVELOPMENT WORKSHOP", style);

        message.position.set(20, 50);


        //Create new instance of KeyboardManager
        var kMen = new KeyboardManager();

        kMen.subscribe("leftArrowDown", function () {
            pony.direction = "left";
        });

        kMen.subscribe("leftArrowUp", function () {
            pony.direction = "";
        });

        kMen.subscribe("rightArrowDown", function () {
            pony.direction = "right";

        });

        kMen.subscribe("rightArrowUp", function () {
            pony.direction = "";
        });

        kMen.subscribe("spaceUp", function () {
            bullet.position.set(pony.position.x, pony.position.y);
            bullet.alive = true;
        });

        //Add sprite to main stage - sprite becomes visible
        renderer.addToRenderLoop(message);
        renderer.addToRenderLoop(pony);
        renderer.addToRenderLoop(cloud);
        renderer.addToRenderLoop(bullet);

        //Add sprite to UpdateLoop - sprites update() function will be called with dT parameter
        renderer.addToUpdateLoop(pony);
        renderer.addToUpdateLoop(bullet);
        renderer.addToUpdateLoop(cloud);

    });
};
