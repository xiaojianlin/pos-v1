function printInventory(inputs){
  var allnumbers = getallnumbers(inputs);
  var allmenu = getallmenu(allnumbers);
  console.log(allmenu);
}


function getallnumbers(inputs){
  var itemNumber = [];
  for ( var j=0 ; j<loadAllItems().length ; j++){
    itemNumber[j] = 0;
    
  }
  for (var i=0 ; i<inputs.length ; i++){
    var input = inputs[i].split('-');
    itemNumber = getnumber (itemNumber,input) ;
  }
  return itemNumber;
}


function getnumber (itemNumber,input){
  for ( var a=0 ; a<loadAllItems().length ; a++){
    if(input[0] === loadAllItems()[a].barcode){
      (input.length ===  2) ? (itemNumber[a] += parseInt(input[1])):
                              (itemNumber[a]++) ;
        }
  }
  return itemNumber;
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
  for ( var i=0 ; i<allnumbers.length ; i++){
      if (allnumbers[i]!=0){
      load(i) ? (number = allnumbers[i] - parseInt(allnumbers[i]/3)) :
                (number = allnumbers[i] ) ;
      menu1 += '名称：' + loadAllItems()[i].name +
                '，数量：' +allnumbers[i] + loadAllItems()[i].unit +
                '，单价：' + loadAllItems()[i].price.toFixed(2) +
                '(元)，小计：' + (loadAllItems()[i].price*number).toFixed(2) + '(元)\n' ;
      }
    }
  return menu1 ;
}


function load(i){
  var loads = false ;
  for(var a=0 ; a<loadPromotions()[0].barcodes.length ; a++){
    if(loadAllItems()[i].barcode === loadPromotions()[0].barcodes[a]){
       loads = true ;
    }
  }
  return loads ;
}


function getmenu2(allnumbers){
  var menu2 = '' ;
  for ( var i=0 ; i<allnumbers.length ; i++){
    if (allnumbers[i]!=0 && load(i)){
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
    if (allnumbers[i]!=0 && load(i)){
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
