$(function(){
  var UnAuditList;
  var FileModelList;
  var CcurrentPageUnAudit;
  init();
});

/*初始化*/
function init() {
  createinitElementLab();
  UnAuditList = getUnAuditPageList();
  CcurrentPageUnAudit = UnAuditList[0];
  FileModelList = getFileModelList(UnAuditList[0]);
  autoRender(FileModelList);
}

/*刷新*/
function refresh(FileModelList) {
  $('#container_right').remove();
  autoRender(FileModelList);
}

/*自动渲染*/
function autoRender(fileModelList) {
  $("<div>",{
    id:'container_right',
    function:function(){
      $(this).css('height','100%');
      $(this).css('width','43%');
      $(this).css('border-style','solid');
      $(this).css('border-width','1px');
      $(this).css('margin-top','0px');
      $(this).css('position','relative');
      $(this).css('background-size','100% 100%');
      // $(this).css('margin-left','50%');
      $(this).css('float','left');
    }
  }).appendTo($('#formid'));
  $('#container_left').css('background-image',fileModelList[0].imgUrl);
  $('#container_right').css('background-image',fileModelList[0].imgUrl);
  for (let i = 0; i < fileModelList.length; i++) {
    var fileModel = fileModelList[i];
    var fileModelListString = fileModel.index;
    if (fileModelListString == null || fileModelListString == '' || fileModelListString == undefined ) {
      continue;
    }
    var containerheight = 1500;
    var containerweight = 1000;
    var divleft = getPercent(fileModel.x1,containerweight);
    var divtop  = subPercent(getPercent(fileModel.y2,containerheight),getPercent(fileModel.h,containerheight));
    createElementLab($('#container_right'),"line"+fileModelListString,divleft,divtop,getPercent(fileModel.h,containerheight),getPercent(fileModel.w,containerweight),fileModel.elementType,"line"+fileModelListString,fileModel.elementTxt,fileModel.relationKey);
  }
}
/*转换表单数据*/
function tranSubmitData() {
    var propertyMap= {};
    $("#container_right input").each(function () {
      if (this.type=='radio') {
        propertyMap[$(this).parent().attr('id')]=$(this).prop("checked")+'';
      }else {
        propertyMap[this.name] = this.value;
      }
    });
    var propertyInfo= JSON.stringify(propertyMap);
    var updateFileModelList = FileModelList;
    var num=0;
    for(var key in propertyMap){
      updateFileModelList[num].elementTxt =propertyMap[key];
      num++;
    }
    FileModelList=updateFileModelList;
    refresh(FileModelList);
}

/*创建Element标签*/
function createElementLab(parent,divclassname,left,top,height,width,inputType,dataName,dataValue,relationKey) {
  $("<div>",{
    id:divclassname,
    function:function(){
      $(this).css('position','absolute');
      $(this).css('left',left);
      $(this).css('top',top);
      $(this).css('height',height);
      $(this).css('width',width);
    }
  }).appendTo(parent);

  if ("input" == inputType){
    $("<input>",{
      type:'text',
      name:dataName,
      val:dataValue,
      function:function(){
        $(this).css('height','100%');
        $(this).css('width','100%');
      }
    }).appendTo($('#'+divclassname+''));
  } else if ("radio" == inputType){
    $("<input>",{
      type:'radio',
      name:relationKey,
      val:dataValue,
      function:function(){
        $(this).css('height','100%');
        $(this).css('width','100%');
        if ('true'==dataValue){
          // $(this).attr("checked",true);
          $(this).prop("checked","checked");
        }
      }
    }).appendTo($('#'+divclassname+''));
  }//end if
}
var CurrentPageNo =0;
function getNextPageContent(){
  CurrentPageNo++;
  if(CurrentPageNo <= UnAuditList.length-1){
    FileModelList = getFileModelList(UnAuditList[CurrentPageNo]);
    refresh(FileModelList);
  }else {
    CurrentPageNo=0;
    FileModelList = getFileModelList(UnAuditList[CurrentPageNo]);
    refresh(FileModelList);
  }
}
function getPrePageContent(){
  CurrentPageNo--;
  if(CurrentPageNo >=0){
    FileModelList = getFileModelList(UnAuditList[CurrentPageNo]);
    refresh(FileModelList);
  }else {
    CurrentPageNo=UnAuditList.length-1;
    FileModelList = getFileModelList(UnAuditList[CurrentPageNo]);
    refresh(FileModelList);
  }
}
function createinitElementLab(){
  $("<div>",{
    id:'outer',
    function:function(){
      $(this).css('width','1650px');
      $(this).css('height','1200px');
    }
  }).appendTo($('#border'));
  $("<div>",{
    id:'container_top',
    function:function(){
      $(this).css('height','10%');
      $(this).css('width','100%');
      $(this).css('position','relative');
      $(this).css('float','left');
      $(this).css('margin-left','4%');

    }
  }).appendTo($('#outer'));
  $("<div>",{
    id:'top_title',
    function:function(){
      $(this).css('height','60%');
      $(this).css('width','100%');
      $(this).css('float','left');
      $(this).css('font-size','200%');
      $(this).text('未审核列表');
    }
  }).appendTo($('#container_top'));
  $("<div>",{
    id:'top_left',
    function:function(){
      $(this).css('height','40%');
      $(this).css('width','50%');
      $(this).css('float','left');
    }
  }).appendTo($('#container_top'));
  $("<div>",{
    function:function(){
      $(this).css('height','70%');
      $(this).css('width','20%');
      $(this).css('margin-left','40%');
      $(this).css('margin-bottom','30%');
      $(this).css('text-align','center');
      $(this).css('background-color','#EEEEEE');
      $(this).css('font-size','150%');
      // $(this).css('vertical-align','middle');
      $(this).text('原始影像');
    }
  }).appendTo($('#top_left'));
  $("<div>",{
    id:'top_right',
    function:function(){
      $(this).css('height','40%');
      $(this).css('width','50%');
      $(this).css('float','left');
    }
  }).appendTo($('#container_top'));
  $("<div>",{
    function:function(){
      $(this).css('height','70%');
      $(this).css('width','20%');
      $(this).css('margin-left','40%');
      $(this).css('margin-bottom','30%');
      $(this).css('text-align','center');
      $(this).css('background-color','#EEEEEE');
      $(this).css('font-size','150%');
      $(this).text('识别区');
    }
  }).appendTo($('#top_right'));
  $("<div>",{
    id:'container_left',
    function:function(){
      $(this).css('height','80%');
      $(this).css('width','43%');
      $(this).css('border-style','solid');
      $(this).css('border-width','1px');
      $(this).css('margin-top','0px');
      $(this).css('position','relative');
      $(this).css('background-size','100% 100%');
      $(this).css('margin-left','4%');
      $(this).css('float','left');
    }
  }).appendTo($('#outer'));
  $("<div>",{
    id:'container_middle',
    function:function(){
      $(this).css('height','80%');
      $(this).css('width','10%');
      $(this).css('margin-top','0px');
      $(this).css('position','relative');
      $(this).css('background-size','100% 100%');
      $(this).css('float','left');
    }
  }).appendTo($('#outer'));
  $("<div>",{
    id:'div_pre',
    function:function(){
      $(this).css('height','5%');
      $(this).css('width','100%');
      $(this).css('margin-top','70%');
      $(this).css('text-align','center');
    }
  }).appendTo($('#container_middle'));
  $("<button>",{
    id:'button_pre',
    html:'上一页',
    onclick:'getPrePageContent()',
    function:function(){
      $(this).css('height','100%');
      $(this).css('width','90%');
      $(this).css('background-color','#EEEEEE');
    }
  }).appendTo($('#div_pre'));
  $("<div>",{
    id:'div_next',
    function:function(){
      $(this).css('height','5%');
      $(this).css('width','100%');
      $(this).css('margin-top','70%');
      $(this).css('text-align','center');
    }
  }).appendTo($('#container_middle'));
  $("<button>",{
    id:'button_next',
    html:'下一页',
    onclick:'getNextPageContent()',
    function:function(){
      $(this).css('height','100%');
      $(this).css('width','90%');
      $(this).css('background-color','#EEEEEE');
    }
  }).appendTo($('#div_next'));
  $("<form>",{
    id:'formid',
    function:function(){
      $(this).attr('action','444.html');
      $(this).css('height','80%');
    }
  }).appendTo($('#outer'));
  $("<div>",{
    id:'container_bottom',
    function:function(){
      $(this).css('height','10%');
      $(this).css('width','100%');
      $(this).css('margin-top','0px');
      $(this).css('position','relative');
      $(this).css('background-size','100% 100%');
      $(this).css('float','left');
    }
  }).appendTo($('#outer'));
  $("<button>",{
    onclick:'saveAudit()',
    html:'保存',
    function:function(){
      $(this).css('height','33%');
      $(this).css('width','7%');
      $(this).css('margin-top','1%');
      $(this).css('margin-left','35%');
    }
  }).appendTo($('#container_bottom'));
  $("<button>",{
    onclick:'auditSuccess()',
    html:'审核通过',
    function:function(){
      $(this).css('height','33%');
      $(this).css('width','7%');
      $(this).css('margin-top','1%');
      $(this).css('margin-left','2%');
    }
  }).appendTo($('#container_bottom'));
  $("<button>",{
    onclick:'auditFail()',
    html:'审核拒绝',
    function:function(){
      $(this).css('height','33%');
      $(this).css('width','7%');
      $(this).css('margin-top','1%');
      $(this).css('margin-left','2%');
    }
  }).appendTo($('#container_bottom'));
}
/*保存*/
function saveAudit() {
  tranSubmitData();
  alert("保存成功"+JSON.stringify(FileModelList));
}
/*审核通过*/
function auditSuccess() {
  alert("审核通过"+JSON.stringify(CcurrentPageUnAudit));
}
/*审核拒绝*/
function auditFail() {
  alert("审核拒绝"+JSON.stringify(CcurrentPageUnAudit));
}
/*num 占num2的百分比*/
function getPercent(num, num2) {
  return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
}
/*两个百分比相减*/
function subPercent(percent1,percent2){
  var str=toPoint(percent1)-toPoint(percent2);
  str= toPercent(str);
  return str;
}
/*转为百分比*/
function toPercent(pointString){
  var str=Number(pointString*100).toFixed(1);
  str+="%";
  return str;
}
/*转为小数*/
function toPoint(percentString){
  var str = percentString+"";
/*  var str =percentString.substring(0,percentString.length-1);*/
 str = str.replace("%","");
  str= str/100;
  return str;
}
/*更新档案模板内容*/
function updateFileModelList() {

}
/*获取未审核列表单条数据的多页作为list*/
function getUnAuditPageList() {
  var unAuditList=[
    {"id":"1","fileId":"1","unAuditId":"CN","recogniteTime":"CN","isFinished":"true","batchNo":"1","modelNo":"1","pageNo":"1"},
    {"id":"2","fileId":"2","unAuditId":"JP","recogniteTime":"JP","isFinished":"true","batchNo":"1","modelNo":"1","pageNo":"2"}
  ];
  return unAuditList;

}


/*获取档案模板内容*/
function getFileModelList(unAudit) {
  /*
  *  文件模型=主键，索引号，批次号，模板号，页码号，背景图片url，高，宽，矩形第一、四点横坐标，矩形第一、四点纵坐标，每页的div编号，每页的div类型，div里的元素编号，关联属性，备注；
  * FileModel={id,index,batchNo,modelNo,pageNo,imgUrl,h,w,x1,x2,y1,y2,divNo,elementNo,elementType,elementTxt,relationKey,mark};
  *
  * 根据批次号（这一批数据有相同的批次号），模板号，页码号获取一个list；
  * */


 var fileModelList=[
    {"id":"1","index":"1","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"23","w":"306","x1":"195","x2":"501","y1":"163","y2":"186","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"2","index":"2","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"305","x1":"620","x2":"925","y1":"167","y2":"186","divNo":"2","elementNo":"1","elementType":"input","elementTxt":"test2","relationKey":"","mark":""},
    {"id":"3","index":"3","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"16","x1":"580","x2":"596","y1":"210","y2":"230","divNo":"3","elementNo":"1","elementType":"radio","elementTxt":"true","relationKey":"radio3","mark":""},
    {"id":"4","index":"4","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"17","w":"18","x1":"729","x2":"747","y1":"213","y2":"230","divNo":"4","elementNo":"1","elementType":"radio","elementTxt":"false","relationKey":"radio3","mark":""},
    {"id":"5","index":"5","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"16","x1":"505","x2":"521","y1":"255","y2":"269","divNo":"5","elementNo":"1","elementType":"radio","elementTxt":"test5","relationKey":"radio5","mark":""},
    {"id":"6","index":"6","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"16","x1":"588","x2":"604","y1":"255","y2":"269","divNo":"6","elementNo":"1","elementType":"radio","elementTxt":"true","relationKey":"radio5","mark":""},
    {"id":"7","index":"7","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"17","w":"20","x1":"67","x2":"87","y1":"307","y2":"324","divNo":"7","elementNo":"1","elementType":"radio","elementTxt":"true","relationKey":"radio7","mark":""},
    {"id":"8","index":"8","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"22","w":"57","x1":"189","x2":"246","y1":"352","y2":"374","divNo":"8","elementNo":"1","elementType":"input","elementTxt":"test8","relationKey":"","mark":""},
    {"id":"9","index":"9","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"22","w":"58","x1":"363","x2":"421","y1":"352","y2":"374","divNo":"9","elementNo":"1","elementType":"input","elementTxt":"test9","relationKey":"","mark":""},
    {"id":"10","index":"10","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"66","x1":"538","x2":"604","y1":"356","y2":"374","divNo":"10","elementNo":"1","elementType":"input","elementTxt":"test10","relationKey":"","mark":""},
    {"id":"11","index":"11","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"73","x1":"676","x2":"749","y1":"356","y2":"374","divNo":"11","elementNo":"1","elementType":"input","elementTxt":"test11","relationKey":"","mark":""},
    {"id":"12","index":"12","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"73","x1":"817","x2":"890","y1":"356","y2":"375","divNo":"12","elementNo":"1","elementType":"input","elementTxt":"test12","relationKey":"","mark":""},
    {"id":"13","index":"13","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"16","w":"14","x1":"67","x2":"81","y1":"440","y2":"456","divNo":"13","elementNo":"1","elementType":"radio","elementTxt":"test13","relationKey":"radio13","mark":""},
    {"id":"14","index":"14","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"16","w":"13","x1":"67","x2":"80","y1":"491","y2":"507","divNo":"14","elementNo":"1","elementType":"radio","elementTxt":"true","relationKey":"radio13","mark":""},
    {"id":"15","index":"15","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"197","x1":"377","x2":"574","y1":"520","y2":"540","divNo":"15","elementNo":"1","elementType":"input","elementTxt":"test15","relationKey":"","mark":""},
    {"id":"16","index":"16","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"16","w":"13","x1":"67","x2":"80","y1":"563","y2":"579","divNo":"16","elementNo":"1","elementType":"radio","elementTxt":"test16","relationKey":"radio13","mark":""},
    {"id":"17","index":"17","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"208","x1":"675","x2":"883","y1":"562","y2":"576","divNo":"17","elementNo":"1","elementType":"input","elementTxt":"test17","relationKey":"","mark":""},
    {"id":"18","index":"18","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"15","w":"13","x1":"69","x2":"82","y1":"619","y2":"634","divNo":"18","elementNo":"1","elementType":"radio","elementTxt":"test18","relationKey":"radio7","mark":""},
    {"id":"19","index":"19","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"24","w":"65","x1":"184","x2":"249","y1":"663","y2":"687","divNo":"19","elementNo":"1","elementType":"input","elementTxt":"test19","relationKey":"","mark":""},
    {"id":"20","index":"20","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"111","x1":"371","x2":"482","y1":"665","y2":"686","divNo":"20","elementNo":"1","elementType":"input","elementTxt":"test20","relationKey":"","mark":""},
    {"id":"21","index":"21","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"108","x1":"548","x2":"656","y1":"665","y2":"686","divNo":"21","elementNo":"1","elementType":"input","elementTxt":"test21","relationKey":"","mark":""},
    {"id":"22","index":"22","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"13","w":"14","x1":"680","x2":"694","y1":"670","y2":"683","divNo":"22","elementNo":"1","elementType":"radio","elementTxt":"test22","relationKey":"","mark":""},
    {"id":"23","index":"23","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"15","w":"15","x1":"815","x2":"830","y1":"668","y2":"683","divNo":"23","elementNo":"1","elementType":"radio","elementTxt":"test23","relationKey":"","mark":""},
    {"id":"24","index":"24","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"17","x1":"66","x2":"83","y1":"722","y2":"736","divNo":"24","elementNo":"1","elementType":"radio","elementTxt":"test24","relationKey":"radio7","mark":""},
    {"id":"25","index":"25","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"15","w":"15","x1":"68","x2":"83","y1":"769","y2":"784","divNo":"25","elementNo":"1","elementType":"radio","elementTxt":"test25","relationKey":"radio25","mark":""},
    {"id":"26","index":"26","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"233","x1":"239","x2":"472","y1":"770","y2":"789","divNo":"26","elementNo":"1","elementType":"input","elementTxt":"test26","relationKey":"","mark":""},
    {"id":"27","index":"27","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"78","x1":"511","x2":"589","y1":"768","y2":"788","divNo":"27","elementNo":"1","elementType":"input","elementTxt":"test27","relationKey":"","mark":""},
    {"id":"28","index":"28","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"22","w":"177","x1":"759","x2":"936","y1":"767","y2":"789","divNo":"28","elementNo":"1","elementType":"input","elementTxt":"test28","relationKey":"","mark":""},
    {"id":"29","index":"29","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"66","x1":"121","x2":"187","y1":"809","y2":"830","divNo":"29","elementNo":"1","elementType":"input","elementTxt":"test29","relationKey":"","mark":""},
    {"id":"30","index":"30","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"48","x1":"210","x2":"258","y1":"810","y2":"830","divNo":"30","elementNo":"1","elementType":"input","elementTxt":"test30","relationKey":"","mark":""},
    {"id":"31","index":"31","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"54","x1":"275","x2":"329","y1":"812","y2":"831","divNo":"31","elementNo":"1","elementType":"input","elementTxt":"test31","relationKey":"","mark":""},
    {"id":"32","index":"32","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"230","x1":"241","x2":"471","y1":"851","y2":"871","divNo":"32","elementNo":"1","elementType":"input","elementTxt":"test32","relationKey":"","mark":""},
    {"id":"33","index":"33","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"82","x1":"513","x2":"595","y1":"852","y2":"871","divNo":"33","elementNo":"1","elementType":"input","elementTxt":"test33","relationKey":"","mark":""},
    {"id":"34","index":"34","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"22","w":"176","x1":"761","x2":"937","y1":"851","y2":"873","divNo":"34","elementNo":"1","elementType":"input","elementTxt":"test34","relationKey":"","mark":""},
    {"id":"35","index":"35","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"13","w":"12","x1":"67","x2":"79","y1":"855","y2":"868","divNo":"35","elementNo":"1","elementType":"radio","elementTxt":"test35","relationKey":"radio25","mark":""},
    {"id":"36","index":"36","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"64","x1":"211","x2":"275","y1":"894","y2":"914","divNo":"36","elementNo":"1","elementType":"input","elementTxt":"test36","relationKey":"","mark":""},
    {"id":"37","index":"37","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"50","x1":"297","x2":"347","y1":"894","y2":"912","divNo":"37","elementNo":"1","elementType":"input","elementTxt":"test37","relationKey":"","mark":""},
    {"id":"38","index":"38","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"49","x1":"367","x2":"416","y1":"894","y2":"914","divNo":"38","elementNo":"1","elementType":"input","elementTxt":"test38","relationKey":"","mark":""},
    {"id":"39","index":"39","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"16","x1":"65","x2":"81","y1":"944","y2":"958","divNo":"39","elementNo":"1","elementType":"radio","elementTxt":"test39","relationKey":"radio25","mark":""},
    {"id":"40","index":"40","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"226","x1":"238","x2":"464","y1":"941","y2":"962","divNo":"40","elementNo":"1","elementType":"input","elementTxt":"test40","relationKey":"","mark":""},
    {"id":"41","index":"41","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"91","x1":"522","x2":"613","y1":"943","y2":"961","divNo":"41","elementNo":"1","elementType":"input","elementTxt":"test41","relationKey":"","mark":""},
    {"id":"42","index":"42","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"9","x1":"617","x2":"626","y1":"945","y2":"959","divNo":"42","elementNo":"1","elementType":"radio","elementTxt":"test42","relationKey":"","mark":""},
    {"id":"43","index":"43","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"10","x1":"666","x2":"676","y1":"945","y2":"959","divNo":"43","elementNo":"1","elementType":"radio","elementTxt":"test43","relationKey":"","mark":""},
    {"id":"44","index":"44","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"168","x1":"767","x2":"935","y1":"941","y2":"961","divNo":"44","elementNo":"1","elementType":"input","elementTxt":"test44","relationKey":"","mark":""},
    {"id":"45","index":"45","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"74","x1":"209","x2":"283","y1":"983","y2":"1003","divNo":"45","elementNo":"1","elementType":"input","elementTxt":"test45","relationKey":"","mark":""},
    {"id":"46","index":"46","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"55","x1":"297","x2":"352","y1":"984","y2":"1004","divNo":"46","elementNo":"1","elementType":"input","elementTxt":"test46","relationKey":"","mark":""},
    {"id":"47","index":"47","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"19","w":"55","x1":"364","x2":"419","y1":"984","y2":"1003","divNo":"47","elementNo":"1","elementType":"input","elementTxt":"test47","relationKey":"","mark":""},
    {"id":"48","index":"48","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"14","w":"16","x1":"67","x2":"83","y1":"1041","y2":"1055","divNo":"48","elementNo":"1","elementType":"radio","elementTxt":"test48","relationKey":"radio7","mark":""},
    {"id":"49","index":"49","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"17","x1":"65","x2":"82","y1":"1083","y2":"1101","divNo":"49","elementNo":"1","elementType":"radio","elementTxt":"test49","relationKey":"radio7","mark":""},
    {"id":"50","index":"50","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"16","w":"324","x1":"235","x2":"559","y1":"1435","y2":"1451","divNo":"50","elementNo":"1","elementType":"input","elementTxt":"test50","relationKey":"","mark":""},
    {"id":"51","index":"51","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"20","w":"64","x1":"749","x2":"813","y1":"1433","y2":"1453","divNo":"51","elementNo":"1","elementType":"input","elementTxt":"test51","relationKey":"","mark":""},
    {"id":"52","index":"52","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"74","x1":"883","x2":"957","y1":"1434","y2":"1455","divNo":"52","elementNo":"1","elementType":"input","elementTxt":"test52","relationKey":"","mark":""},
    {"id":"53","index":"53","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"21","w":"50","x1":"143","x2":"193","y1":"1455","y2":"1476","divNo":"53","elementNo":"1","elementType":"input","elementTxt":"test53","relationKey":"","mark":""},
    {"id":"54","index":"54","batchNo":"1","modelNo":"54","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"62","x1":"257","x2":"319","y1":"1456","y2":"1474","divNo":"54","elementNo":"1","elementType":"input","elementTxt":"test54","relationKey":"","mark":""},
    {"id":"55","index":"55","batchNo":"1","modelNo":"55","pageNo":"1","imgUrl":"url(../static/img/img1.jpg)","h":"18","w":"65","x1":"395","x2":"460","y1":"1457","y2":"1475","divNo":"55","elementNo":"1","elementType":"input","elementTxt":"test55","relationKey":"","mark":""}
  ];
  var fileModelList2=[
    {"id":"10","index":"10","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"22","w":"303","x1":"196.00390625","x2":"499.00390625","y1":"164.796875","y2":"186.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"11","index":"11","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"12","w":"75","x1":"365.00390625","x2":"440.00390625","y1":"362.796875","y2":"374.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"12","index":"12","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"24","w":"58","x1":"551.00390625","x2":"609.00390625","y1":"348.796875","y2":"372.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"13","index":"13","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"25","w":"52","x1":"354.00390625","x2":"406.00390625","y1":"91.796875","y2":"116.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"14","index":"14","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"22","w":"62","x1":"434.00390625","x2":"496.00390625","y1":"92.796875","y2":"114.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"15","index":"15","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"27","w":"53","x1":"522.00390625","x2":"575.00390625","y1":"92.796875","y2":"119.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"16","index":"16","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"155","w":"830","x1":"76.00390625","x2":"906.00390625","y1":"139.796875","y2":"294.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"17","index":"17","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"28","w":"28","x1":"591.00390625","x2":"619.00390625","y1":"306.796875","y2":"334.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"18","index":"18","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"26","w":"36","x1":"696.00390625","x2":"732.00390625","y1":"307.796875","y2":"333.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"19","index":"19","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"27","w":"39","x1":"812.00390625","x2":"851.00390625","y1":"306.796875","y2":"333.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"20","index":"20","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"31","x1":"589.00390625","x2":"620.00390625","y1":"343.796875","y2":"366.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"21","index":"21","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"35","w":"759","x1":"160.00390625","x2":"919.00390625","y1":"371.796875","y2":"406.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"22","index":"22","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"34","w":"756","x1":"160.00390625","x2":"916.00390625","y1":"409.796875","y2":"443.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"23","index":"23","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"25","w":"29","x1":"176.00390625","x2":"205.00390625","y1":"446.796875","y2":"471.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"24","index":"24","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"15","w":"22","x1":"277.00390625","x2":"299.00390625","y1":"449.796875","y2":"464.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"25","index":"25","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"26","x1":"356.00390625","x2":"382.00390625","y1":"448.796875","y2":"471.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"26","index":"26","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"17","w":"26","x1":"596.00390625","x2":"622.00390625","y1":"451.796875","y2":"468.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"27","index":"27","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"19","w":"21","x1":"685.00390625","x2":"706.00390625","y1":"453.796875","y2":"472.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"28","index":"28","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"29","w":"661","x1":"241.00390625","x2":"902.00390625","y1":"483.796875","y2":"512.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"29","index":"29","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"30","w":"676","x1":"240.00390625","x2":"916.00390625","y1":"518.796875","y2":"548.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"30","index":"30","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"30","w":"208","x1":"237.00390625","x2":"445.00390625","y1":"552.796875","y2":"582.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"31","index":"31","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"30","w":"338","x1":"579.00390625","x2":"917.00390625","y1":"552.796875","y2":"582.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"32","index":"32","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"32","w":"214","x1":"235.00390625","x2":"449.00390625","y1":"586.796875","y2":"618.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"33","index":"33","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"35","w":"340","x1":"576.00390625","x2":"916.00390625","y1":"583.796875","y2":"618.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"34","index":"34","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"29","w":"25","x1":"74.00390625","x2":"99.00390625","y1":"644.796875","y2":"673.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"35","index":"35","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"17","x1":"79.00390625","x2":"96.00390625","y1":"713.796875","y2":"736.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"36","index":"36","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"20","w":"20","x1":"72.00390625","x2":"92.00390625","y1":"781.796875","y2":"801.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"37","index":"37","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"18","x1":"74.00390625","x2":"92.00390625","y1":"846.796875","y2":"869.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"38","index":"38","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"71","x1":"309.00390625","x2":"380.00390625","y1":"643.796875","y2":"666.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"39","index":"39","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"19","w":"60","x1":"446.00390625","x2":"506.00390625","y1":"647.796875","y2":"666.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"40","index":"40","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"18","w":"147","x1":"374.00390625","x2":"521.00390625","y1":"714.796875","y2":"732.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"41","index":"41","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"20","w":"127","x1":"405.00390625","x2":"532.00390625","y1":"782.796875","y2":"802.796875","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"42","index":"42","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"27","w":"338","x1":"102.00390625","x2":"440.00390625","y1":"1076.796875","y2":"1103.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"43","index":"43","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"24","w":"335","x1":"104.00390625","x2":"439.00390625","y1":"1119.796875","y2":"1143.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"44","index":"44","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"26","w":"332","x1":"105.00390625","x2":"437.00390625","y1":"1153.796875","y2":"1179.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"45","index":"45","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"97","w":"298","x1":"589.00390625","x2":"887.00390625","y1":"996.796875","y2":"1093.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"46","index":"46","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"20","w":"98","x1":"176.00390625","x2":"274.00390625","y1":"1212.796875","y2":"1232.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"47","index":"47","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"17","w":"53","x1":"294.00390625","x2":"347.00390625","y1":"1216.796875","y2":"1233.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"48","index":"48","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"20","w":"80","x1":"370.00390625","x2":"450.00390625","y1":"1214.796875","y2":"1234.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"49","index":"49","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"24","w":"91","x1":"631.00390625","x2":"722.00390625","y1":"1213.796875","y2":"1237.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"50","index":"50","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"23","w":"59","x1":"747.00390625","x2":"806.00390625","y1":"1214.796875","y2":"1237.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
    {"id":"51","index":"51","batchNo":"1","modelNo":"1","pageNo":"1","imgUrl":"url(../static/img/img2.jpg)","h":"20","w":"50","x1":"830.00390625","x2":"880.00390625","y1":"1217.796875","y2":"1237.79687","divNo":"1","elementNo":"1","elementType":"input","elementTxt":"test1","relationKey":"","mark":""},
  ];
if (unAudit.pageNo==1) {

  return fileModelList;
}else {
  return fileModelList2;
}
}
