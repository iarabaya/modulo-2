var congressMembers = 0;
var page = document.getElementById('attendance')? 'attendance' : (document.getElementById('party-loyalty')? 'party-loyalty' : 'attendance');
console.log(page);

var url = '';
var chamber = '';

if(document.getElementById('senate')){
  chamber = 'senate';
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"
  console.log(url);
}else if(document.getElementById('house')){
  chamber = 'house';
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
  console.log(url);
}

var statistics = {
  "total_members": 0,
  "num_of_democrats": 0,
  "num_of_republicans": 0,
  "num_of_independents": 0,
  "democrats_average_votes_with_party": 0,
  "republicans_average_votes_with_party": 0,
  "independents_average_votes_with_party": 0,
  "total_average_votes_with_party": 0,
  "least_engaged": 0,
  "most_engaged": 0,
  "least_loyal": 0,
  "most_loyal": 0,
  "democratList": [],
  "republicanList":[],
  "independentList":[]
};
  

var app = new Vue({
  el:'#tabla',
  data: {
    stats:{}
  }
});

fetch(url,{
  headers:{'X-API-Key': '6KrAgPHFgkxmuIdBjxdBhBXccl2kWbUcejhCbXnx'}
}).then(res => res.json()).then(res => 
  {congressMembers = res;
    congressMembers = congressMembers.results[0].members;
    fillStatistics(congressMembers);
    setStatistics();
    
  })
.catch( error => console.error(error));



function setStatistics(){
  app.stats = statistics;
  console.log(app.stats);
}



//Funcion para llenar el objeto Statitics
function fillStatistics(obj) {

 /*  para no mostrar los delegates solo filtro a los representatives (que son los que votan)
  if (data.results[0].chamber === "House") {
    obj = obj.filter(member => member.title == 'Representative');
  }*/

  statistics.total_members = obj.length;

  statistics.democratList = obj.filter(member => member.party == 'D');
  statistics.republicanList = obj.filter(member => member.party == 'R');

  statistics.num_of_democrats = statistics.democratList.length;
  statistics.num_of_republicans = statistics.republicanList.length;

  //Solo para la cámara que además tenga Independientes
  if (chamber == "senate") {
    statistics.independentList = obj.filter(member => member.party == 'I');
    statistics.num_of_independents = statistics.independentList.length;
    statistics.independents_average_votes_with_party = average(statistics.independentList,"votes_with_party_pct").toFixed(2);
  }

  statistics.democrats_average_votes_with_party = average(statistics.democratList, "votes_with_party_pct").toFixed(2);
  statistics.republicans_average_votes_with_party = average(statistics.republicanList, "votes_with_party_pct").toFixed(2);
  statistics.total_average_votes_with_party = average(obj,"votes_with_party_pct").toFixed(2);

  if(page == "party-loyalty"){
    statistics.most_loyal = showPercentage(obj, "votes_with_party_pct",true);
    statistics.least_loyal = showPercentage(obj, "votes_with_party_pct",false);
  }else if(page == "attendance"){
  statistics.most_engaged = showPercentage(obj, "missed_votes_pct",false);
  statistics.least_engaged = showPercentage(obj, "missed_votes_pct",true);
  }

  obj.forEach(function(member){
    member.total_present = Math.round((member.total_votes - member.missed_votes)*member.votes_with_party_pct/100);
  });
  
}


//FUNCIONES DE CALCULOS ESTADISTICOS

//Promedio
function average(obj, key) {
  var avg = 0;
  avg = (obj.reduce(function (a, b) {
    return a + b[key];
  }, 0)) / obj.length;
  return avg;
}

//Function to show a percentage of members
function showPercentage(obj, key, order) {
  var limite = obj.length * 0.1;
  var selected = [];
  var members = obj.sort ((a,b)=> order? b[key] - a[key]: a[key] - b[key]); //true: descendente(de mayor a menor),false: ascendente (de menor a mayor)

  var i = 0;
  while (i < limite) {
    selected.push(members[i]);
    i++;
  }

  //para agregar si el ultimo elemento del array tambien tiene otros con el mismo valor de key aunque supere el porcentaje limite
  var ultimos = members.filter(member => member[key] == selected[selected.length - 1][key] && !selected.includes(member));
 
  return selected = (ultimos.length > 0? selected.concat(ultimos): selected);
}