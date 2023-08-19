export default class Clicker {
    clicks: number
    timer: number|undefined
    constructor() {
	this.clicks = 0;
	this.timer = undefined;
    }

    doubleClick():boolean {
	this.clicks++;
	if (this.clicks === 1) {
	    this.timer = setTimeout(() => {
		this.clicks = 0;
	    }, 250);
	    return false
	} else if (this.clicks === 2) {
	    clearTimeout(this.timer);
	    this.clicks = 0;
	    return true
	}
	else return false
    }
}
