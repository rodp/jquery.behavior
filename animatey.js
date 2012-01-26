/*global $ */
function Animatey(el) {
    this.el = $(el);
}
Animatey.prototype.animate = function(loop) {
    var that = this;
    this.el.animate({
        opacity: 0
    }, 3000, function () {
        $(this).animate({
            opacity: 1
        }, 3000);
        if (loop) {
            that.animate(loop);
        }
    });
};
