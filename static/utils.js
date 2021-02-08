// var $=require('jquery');
function _Modal(title,body,button){
    $('.utils_modal_title').html(title);
    $('.utils_modal_content').html(body);
    $('.utils_modal_button').html(button);
    $('.utils_modal').modal('toggle');
}
async function _Maskon(){
    $('.utils_load').html('Loading...');
    $('.utils_mask').fadeIn(600);
    await new Promise((resolve)=>setTimeout(resolve,600));
}
async function _Maskoff(){
    $('.utils_mask').fadeOut(600);
    await new Promise((resolve)=>setTimeout(resolve,600));
}
function _Suggestloading(target){
    $('.utils_load').html(`Loading: ${target}`);
}
var _Loadedasset=new Set();
// async function _Preload(ls,onLoad,fin){
//     for(let url in ls){
//         if(onLoad)
//             onLoad(ls[url]);
//         if(_Loadedasset.has(ls[url]))
//             continue;
//         await fetch(ls[url]);
//         _Loadedasset.add(ls[url]);
//     }
//     if(onLoad&&fin)
//         onLoad('finished');
// }//祖传单核加载不能丢
async function _Preload(ls,onLoad,fin){
    let img=new Image();
    for(let url in ls){
        if(onLoad)
            onLoad(ls[url]);
        if(_Loadedasset.has(ls[url]))
            continue;
        img.src=ls[url];
        await new Promise((resolve)=>img.onload=resolve);
        _Loadedasset.add(ls[url]);
    }
    if(onLoad&&fin)
        onLoad('finished');
}//祖传单核加载不能丢
function _Typeof(par){
    return Object.prototype.toString.call(par);
}