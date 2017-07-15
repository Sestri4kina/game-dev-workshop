function KeyboardManager() {
    this.init();

    this.subscription = {
        "spaceDown": [],
        "leftArrowDown": [],
        "rightArrowDown": [],
        "spaceUp": [],
        "leftArrowUp": [],
        "rightArrowUp": []
    }
}

KeyboardManager.prototype.init = function () {
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
};

KeyboardManager.prototype.keyDown = function (e) {
    switch (e.keyCode) {
        case 37:
            this.callListeners("leftArrowDown");
            break;
        case 39:
            this.callListeners("rightArrowDown");
            break;
        case 32:
            this.callListeners("spaceDown");
            break;
    }
};

KeyboardManager.prototype.keyUp = function (e) {
    switch (e.keyCode) {
        case 37:
            this.callListeners("leftArrowUp");
            break;
        case 39:
            this.callListeners("rightArrowUp");
            break;
        case 32:
            this.callListeners("spaceUp");
            break;
    }
};

/**
 * Adds listener to a specific key event.
 *
 * @param {String} event - Name of event you want to subscribe to. Can be: spaceDown, spaceUp, leftArrowUp, leftArrowDown, rightArrowUp, rightArrowDown
 * @param {function} callback - Function that is called every time specific key event is fired.
 */
KeyboardManager.prototype.subscribe = function (event, callback) {
    if (this.subscription[event]) {
        this.subscription[event].push(callback);
    }
    else {
        console.error("Event", "'" + event + "'", "is not available for subscription");
    }
};

KeyboardManager.prototype.callListeners = function (event) {
    this.subscription[event].forEach(function (cb) {
        if (cb) {
            cb();
        }
    })
};
