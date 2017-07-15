function Loader() {
    this.loaded = {};
}

/**
 *
 * @param {Array<String>} images - array od images that should be preloaded before game starts
 * @param {function} callback - callback that is called when all images are loaded
 */
Loader.prototype.preload = function (images, callback) {
    var me = this;
    images.forEach(function(image){
        PIXI.loader.add(image);
    });

    PIXI.loader.load(function(){
        images.forEach(function (image) {
            me.loaded[image] = PIXI.loader.resources[image].texture;
        });
        callback();
    });
};

/**
 *
 * @param {String} image - path to the image that should have been already loaded.
 * @param {function} [callback] - Function that is called with texture as a parameter
 * @returns {PIXI.Texture}
 */
Loader.prototype.getTexture = function (image, callback) {
    if(this.loaded[image]){
        if(callback){
            callback(texture);
        }
        return this.loaded[image];
    }else{
        console.error("image", "'"+image+ "'", "was not preloaded");
    }
};