export default class Clicker {
    constructor() {
	this.clicks = 0;
	this.timer = null;
    }

    doubleClick() {
	this.clicks++;
	if (this.clicks === 1) {
	    this.timer = setTimeout(() => {
		this.clicks = 0;
	    }, 150);
	    return false
	} else if (this.clicks === 2) {
	    clearTimeout(this.timer);
	    this.clicks = 0;
	    return true
	}
    }
}

