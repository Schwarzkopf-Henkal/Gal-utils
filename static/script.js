export var script=new Object();
// var $=require('jquery');
var _chars=[],_uid=0;
script.Char=class{
    constructor({vis=true,m_b,m_t,w,h,src,alt}){
        this.visibility=vis;
        this.margin_b=m_b;
        this.margin_t=m_t;
        this.width=w;
        this.height=h;
        this.src=src;
        this.uid=++_uid;
        this.reference=alt;
        this.html=`<img src="${src}" alt="${alt}" style="${w?`width:${w};`:""}${h?`height:${h};`:""}${m_b?`margin-bottom:${m_b};`:""}${m_t?`margin-top:${m_t};`:""}display:${vis?"block":"none"};" script-char-id="${this.uid}" class="Char user-select-none">`;
    }
    visibility;
    reference;
    margin_b;
    margin_t;
    height;
    width;
    html;
    src;
    uid;
}
script.clear_stage=()=>{
    $('.script_con').empty();
    _chars=[];
}
script.append_char=(Char)=>{
    _chars.push(Char);
    $('.script_con').append(Char.html);
}
script.pop_char=()=>{
    if(_chars.length===0)
        return;
    let Char=_chars[_chars.length-1];
    $(`[script-char-id = ${Char.uid}]`).remove();
    _chars.pop();
}
script.prepend_char=(Char)=>{
    _chars.unshift(Char);
    $('.script_con').prepend(Char.html);
}
script.shift_char=()=>{
    if(_chars.length===0)
        return;
    let Char=_chars[0];
    $(`[script-char-id = ${Char.uid}]`).remove();
    _chars.shift();
}
script.insert_char=(Char,idx)=>{
    if(idx===_chars.length)
        return script.append_char(Char);
    $(`[script-char-id = ${_chars[idx].uid}]`).before(Char.html);
    _chars.splice(idx,0,Char);
}
script.delete_char=(Char)=>{
    if((typeof Char)==="object")
        Char=Char.uid;
    $(`[script-char-id = ${Char}]`).remove();
    for(let i in _chars)
        if(_chars[i].uid===Char)
            return _chars.splice(i,1);
}
var _defer=[1000,75,70,65,60,55,50,45,40,35,0];
script.put_dialog=async(Str,Speed)=>{
    let _Box=$('.script_dialog_box');
    let _Click=false;
    _Box.html('');
    _Box.off('click');
    _Box.on('click',()=>{_Click=true;});
    for(let i in Str){
        if(_Click)
            break;
        _Box.append(Str[i]);
        await new Promise((resolve)=>setTimeout(resolve,_defer[Speed]));
    }
    _Box.html(Str);
}
script.until_click=()=>{
    return new Promise((resolve)=>{
        $('.script_dialog_box').off('click');
        $('.script_dialog_box').on('click',resolve);
    })
};
//width height margin-bottom margin-top src