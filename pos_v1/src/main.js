inputs = [
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000001',
'ITEM000003-2',
'ITEM000005',
'ITEM000005',
'ITEM000005'
];
var items = loadAllItems();
var promotions = loadPromotions() ;


function printInventory(inputs){
  var allnumbers = getallnumbers(inputs);
  var allmenu = getallmenu(allnumbers);
  console.log(allmenu);
}


//allmenu = printInventory(inputs);



function getallnumbers(inputs){
  var itemNumber = [];
  for ( var j=0 ; j<items.length ; j++){
    itemNumber[j] = 0;
  }
//console.log(itemNumber);
  for (var i=0 ; i<inputs.length ; i++){
    var input = inputs[i].split('-');
    if (input.length ===  2){
      for ( var a=0 ; a<items.length ; a++){
        if(input[0] === items[a].barcode){
          itemNumber[a] += parseInt(input[1]) ;
          break;
        }
      }
    }
    else{
      for ( var a=0 ; a<items.length ; a++){
        if(input[0] === items[a].barcode){
          itemNumber[a]++;
          break;
        }
      }
    }
  }
//console.log(itemNumber);
  return itemNumber;
}


function getallmenu(allnumbers){
  var menu = '***<没钱赚商店>购物清单***\n' +
             getmenu1(allnumbers) +
             '----------------------\n' +
             '挥泪赠送商品：\n' +
             getmenu2(allnumbers) +
             '----------------------\n' +
             getmenu3(allnumbers) +
             '**********************' ;
  return menu ;
}


function getmenu1(allnumbers){
  var menu1 = '' ;

  for ( var i=0 ; i<allnumbers.length ; i++)
    {if (allnumbers[i]!=0){
      load(i) ? (menu1 += freemenu(i,allnumbers)) : (menu1 += nofreemenu(i,allnumbers)) ;
     }
    }
  return menu1 ;
}

function load(i){
  var loads = false ;
  for(var a=0 ; a<promotions[0].barcodes.length ; a++){
    if(items[i].barcode === promotions[0].barcodes[a]){
       loads = true ;
    }
  }
  return loads ;
}

function freemenu(i,allnumbers){
  var number = allnumbers[i];
  number = number - parseInt(number/3);
  var nofreemenu = '名称：' + items[i].name +
                   '，数量：' +allnumbers[i] + items[i].unit +
                   '，单价：' + items[i].price.toFixed(2) +
                   '(元)，小计：' + (items[i].price*number).toFixed(2) + '(元)\n' ;
  return nofreemenu ;
}


function nofreemenu(i,allnumbers){
  var nofreemenu = '名称：' + items[i].name +
                   '，数量：' +allnumbers[i] + items[i].unit +
                   '，单价：' + items[i].price.toFixed(2) +
                   '(元)，小计：' + (items[i].price*allnumbers[i]).toFixed(2) + '(元)\n' ;
  return nofreemenu ;
}


function getmenu2(allnumbers){
  var menu2 = '' ;
  for ( var i=0 ; i<allnumbers.length ; i++){
    if (allnumbers[i]!=0 && load(i)){
      menu2 += '名称：' + items[i].name +
               '，数量：' + parseInt(allnumbers[i]/3) + items[i].unit + '\n' ;
    }
  }
  return menu2 ;
}






function getmenu3(allnumbers){
  var allsum = 0;
  var loadsum = 0;
  for ( var i=0 ; i<allnumbers.length ; i++){
    if (allnumbers[i]!=0 && load(i)){
      allsum += items[i].price*(allnumbers[i]-parseInt(allnumbers[i]/3)) ;
      loadsum += items[i].price*parseInt(allnumbers[i]/3);
    }
    else {
      allsum += items[i].price*allnumbers[i] ;
    }
  }

  var menu3 = '总计：' + allsum.toFixed(2) + '(元)\n' +
              '节省：' + loadsum.toFixed(2) + '(元)\n';
  return menu3 ;
}
