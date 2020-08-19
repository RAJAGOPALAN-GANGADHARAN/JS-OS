const interact=require('interactjs');
export function idGen(m) 
{
    m = m || 9;
    var s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
	return s;
};
export function draggerDriver(movable)
{
    interact(movable)
        .draggable({
        onmove: window.dragMoveListener,
        allowFrom: '.header',
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        inertia:true
        })
        .resizable({
        edges: { left:true, right:true, bottom:true, top: false },
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },
        restrictSize: {
            min: { width: 100, height: 50 },
        },

        inertia: true,
        })
        .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        });
        function dragMoveListener(event) 
        {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            target.style.webkitTransform =
            target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        window.dragMoveListener = dragMoveListener;
}
export function resizeDriver(movable)
{
    //experimental
    interact(movable)
        .resizable({
        edges: { left:false, right:true, bottom:false, top: false },
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },
        restrictSize: {
            min: { width: 100 },
        },
        snap:{bottom:'parent'},
        inertia: true,
        })
        .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        });
        
}


export class Stack
{
    constructor() 
    {
        this.stack=[];
    }
    push(item)
    {
        this.stack.push(item);
    }
    pop()
    {
        return this.stack.pop();
    }
    top()
    {
        return this.stack[this.stack.length-1];
    }
}