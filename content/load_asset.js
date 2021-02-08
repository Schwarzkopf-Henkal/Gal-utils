const fs=require('fs/promises');
var asset_sheet=new Object();
var whitelist=new Set(["asset_sheet.json","load_asset.js"]);
var pattern=new RegExp(`[[\\]/:*?\"<>|.]`);
fileDisplay('./').then(()=>{
    fs.writeFile('asset_sheet.json',JSON.stringify(asset_sheet));
});
async function fileDisplay(path){
    await fs.readdir(path).then(async (files)=>{
        var Prp=[];
        for(let i=0;i<files.length;i++){
            Prp.push(
            fs.stat(path+files[i]).then(async (stats)=>{
                if(stats.isFile()){
                    if(whitelist.has(files[i])!==true){
                        asset_sheet[files[i].replace(pattern,"")]="./content/"+path.substring(2,path.length)+files[i];
                    }
                }else await fileDisplay(path+files[i]+'/');
                
            },(err)=>{
                console.log(err);
                console.warn('Some errors happened when reading file stats.');
            }));
        }
        await Promise.all(Prp);
    },(err)=>{
        console.warn(err);
    });
}