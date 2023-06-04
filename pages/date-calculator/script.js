$(document).ready( function() {

  function cast_minutes_time_to_seconds(str){
  if(str.includes('h')){
    let str_time = str.replace('h',' ').replace('min',' ').replace('s','').split(' ')
    return (parseInt(str_time[0]) * 60 * 60) + (parseInt(str_time[1]) * 60) + parseInt(str_time[2]) 
  } else {
    let str_time = str.replace('min',' ').replace('s','').split(' ')
    return (parseInt(str_time[0]) * 60) + parseInt(str_time[1])  
  }
  
}

function cast_seconds_to_minutes_time(str){
  let str_time = parseInt(str)
  if(str_time >= 3600){
    let hours = Math.floor(str_time/3600) 
    let rest = str_time % 3600
    let seconds = rest % 60
    let minutes = (rest - seconds) / 60
    return hours + 'h' + minutes + 'min' + seconds + 's'  
  } 
  let seconds = str_time % 60
  let minutes = (str_time - seconds) / 60
  return minutes + 'min' + seconds + 's'
}

  let regex_exp  = /\d{1,2}min\d\ds/gm
  let regex_exp2 = /\d{1,2}h\d{1,2}min\d\ds/gm
  let regex_exp3 = /\d{1,2}h\d{1,2}min/gm

/*
Presa ter 2 chars antse do min e 2 chars antes do s
3min40s
3min50s
4min20s
3min40s
3min20s

*/


  $("#submit").click(function(){

    let text_area = $("#input-text").val()
    console.log(text_area)

    let values = text_area.match(regex_exp)
    console.log(values)

    if(values === null){
      values = text_area.match(regex_exp2)
      console.log(values)
    }

    if(values === null){
      console.log('re', values)
      values = text_area.match(regex_exp3)
    console.log('saida', values)
      values = values.map(el => {
       return el + '00s'
      })
    }

    let values_int = values.map(el => {
     return cast_minutes_time_to_seconds(el)
    })
    console.log('xxx', values_int)

    let max_val = Math.max(... values_int)
    let min_val = Math.min(... values_int)
    let len_val = values_int.length
    let sum_val = values_int.reduce( (a,b) => a+ b, 0)
    let avg_val = Math.round(sum_val / len_val, 2)

    $('#max').text(cast_seconds_to_minutes_time(max_val))
    $('#min').text(cast_seconds_to_minutes_time(min_val))
    $('#len').text(len_val)
    $('#sum').text(cast_seconds_to_minutes_time(sum_val))
    $('#avg').text(cast_seconds_to_minutes_time(avg_val))

    console.log(max_val, min_val, len_val, sum_val, avg_val)

    let txt = "";
    function myFunction(value, index, array) {
      txt += value + "\n";
    }
    values.forEach(myFunction);
    $('#output').val(txt)

    


    
    // alert("Bye! You now leave p1!");

    // let re = /\d\dmin\d\ds/gm
    // a.match(re)

  });

  

});





















// // Set Default Text
// var defaultText = `
//   Example of MarkDown Text to generate TOC

//   # h1

//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

//   ## h2

//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

//   ### h3.1

//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.

//   ### h2.2

//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.`;

// // Replace content to place in HTML
// defaultText = defaultText.replace(/\\t/g, '').replace(/  /g, '').trim();
// document.getElementById("md-text").value = defaultText;

// /*

//  Observações:
//  + '.' deve ser retiraod nos links
//  + ' ' deve ser convertido em '-'
//  + O correto está no TOC generator original

// */

// var symbols = { 1: '+', 2: '-', 3: '*', 4: '+', 5: '-', 6: '*' };

// function generate_toc() {

//    let flagSpaces = document.getElementById("spaces").checked;

//    let list = document.getElementById("md-text").value;
//    list = list.split("\n").filter(el => el != "").filter(el => el[0] == '#');

//    let response = null;
//    response = list.map(el => {
//      let count_hashtags = count_hashtag(el);
//      let symbol = symbols[count_hashtags]
//      if (count_hashtags == 0) {
//        console.log('error')
//      }
//      let spaces = count_hashtags - 1;
//      let el_clean = el.replace(/#/g, '').trim()
//      let el_clean_link = el_clean.replace(/\s/g,'-').replace(/\./g,'').toLowerCase()
//      return generate_spaces(spaces) + symbol + ' ' + '[' + el_clean + `](#${el_clean_link})`
//    })

//    let saida = '';
//    let space = flagSpaces ? '\n' : '';
//    for (let r of response) {
//      saida += r + '\n' + space;
//    }
//    document.getElementById("md-output").value = saida;

//  }

//  function generate_spaces(num) {
//    let str = '';
//    for (let i = 0; i < num; i++) {
//      str += '  '
//    }
//    return str
//  }

//  function count_hashtag(el) {
//    console.log('el', el)
//    let count = 0;
//    for (let i = 0; i < el.length; i = i + 1) {
//      if (el[i] == '#') {
//        count = count + 1;
//      } else {
//        break
//      }
//    }
//    return count;
//  }
