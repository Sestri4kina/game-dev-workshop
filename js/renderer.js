function Renderer(width, height) {
    this.init(width, height);
    this.items = [];
}

Renderer.prototype.init = function (width, height) {

    this.renderer = PIXI.autoDetectRenderer(width || 1200, height || 800);

    document.body.appendChild(this.renderer.view);

    this.renderer.backgroundColor = 0xccccff;

    this.stage = new PIXI.Container();

    this.renderer.render(this.stage);

    this.currentTime = 0;
};


/**
 *
 * This function is called every frame.
 *
 * @param {number} timePassed - Time in milliseconds from the first call of requestAnimationFrame;
 */

Renderer.prototype.animate = function (timePassed) {
    var dt = timePassed - this.currentTime;

    this.currentTime = timePassed;


    this.items.forEach(function(item){
        if(item.update){
            item.update(dt);
        }
        else{
            console.error("THIS ITEM HAS NO UPDATE", item);
        }
    });

    this.renderer.render(this.stage);

    requestAnimationFrame(this.animate.bind(this));
};

/**
 * Adds sprite to render loop.
 *
 * @param {PIXI.Sprite} sprite - Sprite that you want to be visible.
 */
Renderer.prototype.addToRenderLoop = function (sprite) {
    if(sprite){
        this.stage.addChild(sprite);
    }
};

/**
 * Adds any object that has update method into loop.
 * Update method wil receive dt(as first parameter) - time that passed since last update.
 *
 * @param {Object} item - Object that should have update method called every frame.
 */
Renderer.prototype.addToUpdateLoop = function (item) {
    if(item && item.update && typeof item.update === "function"){
        this.items.push(item);
    }else{
        console.error("Object", item, "doesn't have update() method to be called every frame.");
    }
};

/**
 * Removes item from update loop.
 *
 * @param {Object} item - Object that no longer needs to be updated every frame
 */
Renderer.prototype.removeFromUpdateLoop = function(item){
    var index = this.items.indexOf(item);

    if(item && index > -1){
        this.items.splice(index, 1);
    }

};
