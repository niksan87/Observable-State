Function.prototype.equals = function(fn: Function) {
    return this.name.replace('bound ', '') === fn.name ||
    this.name === fn.name ||
    this.name === fn.name.replace('bound ', '') ||
    this.name.replace('bound ', '') === fn.name.replace('bound ', '');
};