export var theme_color_panels='black';
export var status_color='white';
export var notify_status=false;
export var highlight_color="blue";
export var window_header_color="black";
export var zIndexFrames=1;

export function modify()
{
    theme_color_panels="red";
    console.log(theme_color_panels);
}
export function incrementZIndexStackTrace()
{
    zIndexFrames++;
}
