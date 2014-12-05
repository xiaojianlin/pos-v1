function printInventory(inputs){
  var allnumbers = getallnumbers(inputs);
  var allmenu = getallmenu(allnumbers);
  console.log(allmenu);
}

function getItemNumbers(){
  var itemNumber = [] ;
  _.forEach(loadAllItems(),function(allnumber,index){
    itemNumber[index] = 0;
  });
  return itemNumber ;
}

function getallnumbers(inputs){
  var itemNumber = getItemNumbers() ;
  _.forEach(inputs,function(trg){
    var input = trg.split('-');
    itemNumber = getnumber (itemNumber,input) ;
  });
  return itemNumber;
}


function getnumber (itemNumber,input){
  _.forEach( loadAllItems(),function(trg,index) {
    if(input[0] === trg.barcode){
     itemNumber[index] = getItemNumber(itemNumber[index],input);
     }
  });
  return itemNumber;
}


function getItemNumber(number,input) {
  (input.length === 2) ? number += parseInt(input[1]):number++ ;
  return number;
}


function getallmenu(allnumbers){
  return menu = '***<没钱赚商店>购物清单***\n' +
                getmenu1(allnumbers) +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                getmenu2(allnumbers) +
                '----------------------\n' +
                getmenu3(allnumbers) +
                '**********************' ;
}


function getmenu1(allnumbers){
  var menu1 = '' ;
  var number = 0 ;
  _.forEach(allnumbers,function(allnumber,index){
      if (allnumber!==0){
      load(index) ? number = allnumber - parseInt(allnumber/3) :
                number = allnumber ;
      menu1 += '名称：' + loadAllItems()[index].name +
                '，数量：' +allnumber + loadAllItems()[index].unit +
                '，单价：' + loadAllItems()[index].price.toFixed(2) +
                '(元)，小计：' + (loadAllItems()[index].price*number).toFixed(2) + '(元)\n' ;
      }
  });
  return menu1 ;
}


function load(i){
  var loads = false ;
  _.forEach( loadPromotions()[0].barcodes,function(trg){
    if(loadAllItems()[i].barcode === trg ){
      loads = true ;
    }
  });
  return loads ;
}


function getmenu2(allnumbers){
  var menu2 = '' ;
  _.forEach(allnumbers,function(allnumber,index){
    if (allnumber !== 0 && load(index)){
      menu2 += '名称：' + loadAllItems()[index].name +
               '，数量：' + parseInt(allnumber/3) + loadAllItems()[index].unit + '\n' ;
    }
  });
  return menu2 ;
}


function getmenu3(allnumbers){
  var allsums = 0;
  var loadsums = 0;
  _.forEach(allnumbers,function(allnumber,index){
    var sum = loadAllItems()[index].price ;
      if (allnumber!==0 && load(index)){
        allsums += sum*(allnumber-parseInt(allnumber/3)) ;
        loadsums += sum*parseInt(allnumber/3);
      }
      else {
        allsums += sum*allnumber ;
      }
  } )
  return menu3 = '总计：' + allsums.toFixed(2) + '(元)\n' +
                 '节省：' + loadsums.toFixed(2) + '(元)\n' ;
}
