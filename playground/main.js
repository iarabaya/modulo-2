console.log('Starting javascript...');
var myName = 'Iara Baya';
console.log('Your name is ' + myName);
var age = 22;
console.log('Your age is '+age);
var ignasiAge = 32;
var ageDiff = age - ignasiAge;
console.log(ageDiff);

if(age>=21){
  if(age>21){
    console.log('You are older than 21 ')
  }
  else{
    console.log('You are 21 years old')
  }
  
}
else{
  console.log('You are not older than 21')
};

if(age>=ignasiAge){
  if(age>ignasiAge){
    console.log('Ignasi is younger than you')
  }
  else{
    console.log('You have the same age as Ignasi')
  }
}
else{
  console.log('Ignasi is older than you')
};


var names = ['Silvana Darlik', 'Matías Guerrero', 'Hernán', 'Miriam', 'Agustina Oficialdegui', 'Alejandro Belo', 'Alejandro Raffo', 'Amad Saed', 'Cristian Cahe', 'Regina Molares', 'Nahuel Correa', 'Elizabeth Sainz', 'Federico Viola', 'Tomás Shiao', 'Genaro Di Martino', 'Iara Baya', 'Inés Ehulech', 'José Luis González', 'Joseph Flores', 'Leonardo López', 'Lighuen Gerónimo', 'Luz Marina Pereira', 'Marco A. López', 'Mateo Barreiros'];


for(i=0,i<names.length,i=i+1){
  names.sort();
  console.log(0);
}