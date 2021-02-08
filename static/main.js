var fs=require('fs');
fs=fs.promises;
// var $=require('jquery');
import {script} from './script.js'
var asset,menu,_Posit;
(async ()=>{
    await Promise.all([
        fs.readFile('./content/asset_sheet.json').then(buf=>{asset=JSON.parse(buf)}),
        fs.readFile('./content/menu.json').then(buf=>{menu=JSON.parse(buf);})
    ]);
    goto_menu(true);
})();
async function goto_start(){
    //要重做唉
    await goto_script(false);
    display_script('script1json');
}
async function goto_script(sign){
    await _Maskon();
    $('.field').html(menu.script);
    $('.opt_0').off('click');
    $('.opt_1').off('click');
    $('.opt_2').off('click');
    $('.opt_3').off('click');
    $('.opt_0').on('click',()=>goto_menu(false));
    $('.opt_1').on('click',goto_saves);
    $('.opt_2').on('click',goto_settings);
    $('.opt_3').on('click',show_help);
    if(sign)
        _Maskoff();
    _Posit='script';
}
var _Exec=[
    async ()=>{
        await _Maskon();
    },
];//🐕了
async function display_script(script_id){
    let Script;
    let _Chars=new Object();
    await fs.readFile(asset[script_id]).then(buf=>{Script=JSON.parse(buf)});
    for(let _cur in Script){
        if(Script[_cur].action===0){
            await _Maskon();
        }
        if(Script[_cur].action===1){
            await _Maskoff();
        }
        if(Script[_cur].action===2){
            await _Preload(Script[_cur].para[0],_Suggestloading,Script[_cur].para[1]);
        }
        if(Script[_cur].action===3){
            _Chars[Script[_cur].para[0]]=new script.Char(Script[_cur].para[1]);
        }
        if(Script[_cur].action===4){
            script.append_char(_Chars[Script[_cur].para[0]]);
        }
        if(Script[_cur].action===5){
            script.prepend_char(_Chars[Script[_cur].para[0]]);
        }
        if(Script[_cur].action===6){
            script.insert_char(_Chars[Script[_cur].para[0]],Script[_cur].para[1]);
        }
        if(Script[_cur].action===7){
            script.delete_char(_Chars[Script[_cur].para[0]]);
        }
        if(Script[_cur].action===8){
            script.shift_char();
        }
        if(Script[_cur].action===9){
            script.pop_char();
        }
        if(Script[_cur].action===10){
            script.clear_stage();
        }
        if(Script[_cur].action===11){
            await script.put_dialog(Script[_cur].para[0],Script[_cur].para[1]);
        }
        if(Script[_cur].action===12){
            await script.until_click();
        }
        // _Exec[Script[_cur].action](Script[_cur].para);
    }
}
function goto_menu(sign){
    $('title').html(menu.title);
    $('.field').html(menu.menu);
    $('.Menu').css("display","none");
    $('.opt_0').off('click');
    $('.opt_1').off('click');
    $('.opt_2').off('click');
    $('.opt_3').off('click');
    $('.opt_0').on('click',goto_start);
    $('.opt_1').on('click',goto_saves);
    $('.opt_2').on('click',goto_settings);
    $('.opt_3').on('click',show_help);
    $('#logo').on('click',()=>{
        $('#logo').css("top","10%");
        $('#logo').off('click');
        $('.Menu').css("display","");
        if(sign)
            show_help();
    });
    _Posit='menu';
}
function goto_saves(){
    //要重做存档页面唉
}
function goto_settings(){
    //要重做设置页面唉
}
function show_help(){
    _Modal('帮助',menu.help,'明白了');
}//进度标识符：script名称
/*
action标识引导
0：打开加载时遮罩；非异步；参数：[]
1：关闭加载时遮罩；非异步；参数：[]//也许我应该去掉这两个API……
2：预加载资源；非异步；参数：[Array:要加载的资源的url,Boolean:是否在加载完毕后提示Finished]//应该只有image是可行的……
3：创建一个人物；非异步；参数：[String:人物代号，不应重复,Object:一个script.Char的Class，可选参数参见]
4：在舞台右边添加一个人物；异步；参数：[String:人物代号]
5：在舞台左边添加一个人物；异步；参数：[String:人物代号]
6：在舞台指定下标添加一个人物；异步；参数：[String:人物代号,Number:下标]
7：在舞台上删除一个人物（人物可以重用，但是舞台上不应该同时出现代号相同的人物）；异步；参数：[String:人物代号]
8：删除舞台最左边的人物；异步；参数：[]
9：删除舞台最右边的人物；异步；参数：[]
10：清除舞台上所有的人物；异步；参数：[]
11：显示一段文本；非异步；参数：[String:文本,Number:文本演出速度]
12：等待鼠标的点击；非异步；参数：[]

值得指出的是现在一个指令是否异步没有区别，理论上都是非异步的😅

注：异步与否指的是是否会等待该命令执行完毕后执行下一个命令。
   非异步会等待该命令执行完毕后继续执行，非异步则不会。
可选参数：{
    vis:Boolean//人物的可见性，显然默认true
    m_b:String//人物的margin-bottom，用于优化显示布局
    m_t:String//人物的margin-top，用于优化显示布局
    w:String//人物的宽
    h:String//人物的高
    src:String//人物图片的url，虽然后面有意再支持live2d的说
    alt:String//alt文本，在图片加载失败时显示。
}
只有src是必选的。
*/