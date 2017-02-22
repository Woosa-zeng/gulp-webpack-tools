var animal = require('./animal');
var formatDate = require('./date');

var result = animal(2);
console.log(result);

var time = 1469281964000;
function logDate(time){
  var date = new Date(time);
  console.log(formatDate(date, 'yyyy-MM-dd hh:mm'));
}
logDate(time);


$.ajax({
    type:'get',
    url:'/sysArea/getDistrictList',
    success:function(data){
        console.log(data[0]);
        $("p").text("areaName: " + data[0].areaName);            
    },
    error:function(){
        $.toast("系统繁忙，请稍后重试",2000);
    }
});