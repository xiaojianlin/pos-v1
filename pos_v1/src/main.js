function printInventory(inputs){
  var leadNumbers = getLeadNumbers(inputs);
  var allmenu = getAllMenu(leadNumbers);
  console.log(allmenu);
}


function getLeadNumbers(inputs){
  var leadNumber = foundLeadNumber() ;
  _.forEach(inputs,function(inputs){
    var input = inputs.split('-');
    leadNumber = addLeadNumber (leadNumber,input) ;
  });
  return leadNumber;
}


function foundLeadNumber(){
  var leadNumber = [] ;
  _.forEach(loadAllItems(),function(number, index){
    leadNumber[index] = 0;
  });
  return leadNumber ;
}


function addLeadNumber (leadNumber, input){
  _.forEach( loadAllItems(),function(trg,index) {
    if(input[0] === trg.barcode){
      leadNumber[index] = diffInputs(leadNumber[index],input);
     }
  });
  return leadNumber;
}


function diffInputs(number,input) {
  (input.length === 2) ? number += parseInt(input[1]):
                         number++ ;
  return number;
}


function getAllMenu(leadNumbers){
  return menus = '***<没钱赚商店>购物清单***\n' +
                 getmenu1(leadNumbers) +
                 '----------------------\n' +
                 '挥泪赠送商品：\n' +
                 getmenu2(leadNumbers) +
                 '----------------------\n' +
                 getmenu3(leadNumbers) +
                 '**********************' ;
}


function getmenu1(leadNumbers){
  var menu1 = '' ;
  var numbers = 0 ;
  _.forEach(leadNumbers,function(number, index){
      if (number!==0){
      load(index) ? numbers = number - parseInt(number/3) :
                numbers = number ;
      var itemindex = loadAllItems()[index] ;
      menu1 += '名称：' + itemindex.name +
                '，数量：' +number + itemindex.unit +
                '，单价：' + itemindex.price.toFixed(2) +
                '(元)，小计：' + (itemindex.price*numbers).toFixed(2) + '(元)\n' ;
      }
  });
  return menu1 ;
}


function load(i){
  var loads = false ;
  _.forEach( loadPromotions()[0].barcodes, function(trg){
    if(loadAllItems()[i].barcode === trg ){
      loads = true ;
    }
  });
  return loads ;
}


function getmenu2(leadNumbers){
  var menu2 = '' ;
  _.forEach(leadNumbers,function(number, index){
    if (number !== 0 && load(index)){
      menu2 += '名称：' + loadAllItems()[index].name +
               '，数量：' + parseInt(number/3) + loadAllItems()[index].unit + '\n' ;
    }
  });
  return menu2 ;
}


function getmenu3(leadNumbers){
  var allMoney = 0;
  var reduceMoney = 0;
  _.forEach(leadNumbers,function(number, index){
    var price = loadAllItems()[index].price ;
      if (number!==0 && load(index)){
        allMoney += price*(number-parseInt(number/3)) ;
        reduceMoney += price*parseInt(number/3);
      }
      else {
        allMoney += price*number ;
      }
  } ) ;
  return menu3 = '总计：' + allMoney.toFixed(2) + '(元)\n' +
                 '节省：' + reduceMoney.toFixed(2) + '(元)\n' ;
}
