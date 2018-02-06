var arrayData = [];
var limitString = window.prompt("ingrese fecha limite \n formato [2018-01-01]", "2017-06-01");
var limit = new Date(limitString);
var timeOutMS = 1000;
var cb = function(){

    var csv = arrayData.map(function(d){
        return d.join();
    }).join('\n');

    download(csv, "datos.csv", "text/csv")
}


var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
    if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([content], {
            type: mimeType
        }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
}




var nextPage = function(){
    var form=document.getElementById("iceform");
    form['iceform:_idcl'].value='iceform:crvlfeSub:icePnlTbSet:0:dataScroll_Et0next';
    form['iceform:crvlfeSub:icePnlTbSet:0:dataScroll_Et0'].value='next';
    return iceSubmit(form,null,event);
}


var getElementFromTable = function(){
    var oTable = document.getElementById("iceform:crvlfeSub:icePnlTbSet:0:tableEt0");
    //gets rows of table
    var rowLength = oTable.rows.length;
    var date = null;
    var dateObj = null;
    var value = null;

    //loops through rows    
    //comienza en 1 para saltar el titulo
    for (i = 1; i < rowLength; i++){

      //gets cells of current row  
       var oCells = oTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

       //loops through each cell in current row
       for(var j = 0; j < cellLength; j++){

              // get your cell info here

              var cellVal = oCells.item(j).innerHTML;
              if(j == 0){
                  //date
                  date = oCells.item(j).innerHTML;
                  date = date.split("/").reverse().join("-");
              }
              if(j == 1){
                  //date
                  value = oCells.item(j).firstChild.innerHTML;
              }
           }
           arrayData.push([date, value]);
    }
};


var getData = function(callback){
    console.log("getData");
    getElementFromTable();
    if(limit < new Date(arrayData[arrayData.length - 1][0])){
        nextPage();
        setTimeout(function(){ getData(callback); }, timeOutMS);
    }else{
        callback()
    }
    return;
}

getData(cb);