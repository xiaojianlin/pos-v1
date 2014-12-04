function printInventory(inputs){
  var allnumbers = getallnumbers(inputs);
  var allmenu = getallmenu(allnumbers);
  console.log(allmenu);
}


function getallnumbers(inputs){
  var itemNumber = [];
  _.forEach(loadAllItems(),function(allnumber,index){
    itemNumber[index] = 0;
  })


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
                number = allnumber;
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
  for ( var i=0 ; i<allnumbers.length ; i++){
    if (allnumbers[i]!==0 && load(i)){
      menu2 += '名称：' + loadAllItems()[i].name +
               '，数量：' + parseInt(allnumbers[i]/3) + loadAllItems()[i].unit + '\n' ;
    }
  }
  return menu2 ;
}


function getmenu3(allnumbers){
  var allsum = 0;
  var loadsum = 0;
  for ( var i=0 ; i<allnumbers.length ; i++){
    if (allnumbers[i]!==0 && load(i)){
      allsum += loadAllItems()[i].price*(allnumbers[i]-parseInt(allnumbers[i]/3)) ;
      loadsum += loadAllItems()[i].price*parseInt(allnumbers[i]/3);
    }
    else {
      allsum += loadAllItems()[i].price*allnumbers[i] ;
    }
  }
  return menu3 = '总计：' + allsum.toFixed(2) + '(元)\n' +
                 '节省：' + loadsum.toFixed(2) + '(元)\n' ;
}
