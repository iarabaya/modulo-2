//JAVASCRIPT BASICS

var myName = 'Iara Baya';
var age = 23;
var ignasiAge = 32;
var ageDiff = age - ignasiAge;

console.log('Starting javascript...');
console.log('Your name is ' + myName);
console.log('Your age is ' + age);
console.log(ageDiff);

if (age > 21) {
    console.log('You are older than 21 ')

} else if (age = 21) {
    console.log('You are 21 years old')
} else {
    console.log('You are not older than 21')
};


if (age > ignasiAge) {
        console.log('Ignasi is younger than you')
    } else if (age == ignasiAge){
        console.log('You have the same age as Ignasi')
    }else {
    console.log('Ignasi is older than you')
};

//JAVASCRIPT FUNCTIONS
// EXERCISE 1
var names = ['Silvana Darlik', 'Matías Guerrero', 'Hernán', 'Miriam', 'Agustina Oficialdegui', 'Alejandro Belo', 'Alejandro Raffo', 'Amad Saed', 'Cristian Cahe', 'Regina Molares', 'Nahuel Correa', 'Elizabeth Sainz', 'Federico Viola', 'Tomás Shiao', 'Genaro Di Martino', 'Iara Baya', 'Inés Ehulech', 'José Luis González', 'Joseph Flores', 'Leonardo López', 'Lighuen Gerónimo', 'Luz Marina Pereira', 'Marco A. López', 'Mateo Barreiros'];

names.sort();
console.log (names[0]);
console.log(names[23]);

for(var i=0;i<names.length;i++){
 console.log(names[i]); 
};

//EXERCISE 2
var num = 0;
var ages =[21,18,43,22,29,32,28,30,21,40,35,26,26,22,23,19,17,28,60,42,45,22,23];

/* solo imprimir edades
while(num<ages.length){
    console.log(ages[num]);
    num++;
};*/

//imprimir even numbers
while(num<ages.length){
    if(ages[num]%2 == 0){
        console.log(ages[num]);
    };
    num++;
};

for(var i=0; i<ages.length; i++){
    if(ages[i]%2 == 0){
        console.log(ages[i]);
    };
};

//EXERCISE 3
function lowestNumber(Array){
    var numero=9999;
    for(var i=0; i<Array.length; i++){
        if(numero>Array[i] && Array[i]>0){
            numero=Array[i];
        };
    };
    console.log('el menor numero es '+ numero);
};

lowestNumber(ages);

//EXERCISE 4
function biggestNumber(Array){
    var numero=0;
    for(var i=0;i<Array.length; i++){
        if(numero<Array[i]){
            numero=Array[i];
        }       
    }
    console.log('el mayor numero es '+ numero);
};

biggestNumber(ages);

//EXERCISE 5
var array = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
var index = 2;
function printValue(Array,position){
    if(position<Array.length){
        console.log('el valor de la posicion '+ position +' es '+Array[position]);
    }else{
        console.log('valor de posicion no valido')
    }
};

printValue(array,index);

//EXERCISE 6

var array2 = [3,6,67,6,23,11,100,6,93,0,17,24,7,1,33,45,28,33,23,12,99,100]; 

function repeatedValues(Array){
  var repetidos= [];
  for(var i=0;i<Array.length;i++){      //recorre el array   
    var repeticion=0;
    for(var j=i;j<Array.length; j++){    //recorre el array otra vez
      if(i!=j && Array[i]==Array[j]){    //si hay repeticion se agrega el valor al array repetidos
        if(!repetidos.includes(Array[j])){
          repetidos.push(Array[i]);
          repeticion++;
        }
        
      }
    }
    
  }
  repetidos.sort(function(a,b){return a-b} );
  console.log("Los numero repetidos son:"+repetidos.toString()/*repetidos.join(",")*/); //imprime los repetidos
};

repeatedValues(array2);


function repeatedValues2(Array){
  var repetidos2 =[];
  var j = 1;
  
  for (i=0;i<Array.length;i++){                    //recorro todo el array
    while (j<Array.length && i!=j){
      if(Array[i]==Array[j]){
        repetidos2.push(Array[i]);
        break;
        }
      j++;
    }  
  }
  
console.log(repetidos2.join(","));
}

repeatedValues2(array2);

/*
function repeatedValues2(Array){
  var repetidos2=[];
    for(var i=0;i<Array.length;i++){
      var algo=Array.indexOf(Array[i]);
      if(algo !=-1){
        repetidos2.push(Array[i]);
      }
    }
    console.log(repetidos2);
  };

repeatedValues2(array2);
*/

//EXERCISE 7
var myColor = ["Red", "Green", "White", "Black"];
function printColor(Array){
  console.log("\""+Array.join("\",\"")+"\"");
};

printColor(myColor);

//STRING EXERCISES
//EXERCISE 1
var algo=3244366;

function changeOrder(algo){
  var str=algo.toString().split("").reverse().join("");
  console.log(str);
};
changeOrder(algo);

//EXERCISE 2
var palabra = "webmaster";
 function letterOrder(String){
   var str = String.split("");
   str.sort();
   console.log(str.join(""));
 }

 letterOrder(palabra);

//EXERCISE 3
var title="prince of persia"
function firstLetter(String){
  var words = String.split(" ");
  for(var i=0;i<words.length;i++){
    words[i]= words[i].charAt(0).toUpperCase()+words[i].substring(1);
  }
  var todo=words.join(" ");
  console.log(todo);
}

firstLetter(title);

//EXERCISE 4
var phrase= "Web Development Tutorial";
function longestWord(String){
  var str=String.split(" ");
  var word="";
  for(i=0;i<str.length;i++){
    if(word.length<str[i].length){
      word=str[i];
    }
  }
  console.log(word);
}

longestWord(phrase);