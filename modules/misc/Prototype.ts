Function.prototype.equals = function(fn: Function) {
    return this.name.replace('bound ', '') === fn.name || this.name === fn.name;
};