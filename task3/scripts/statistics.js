var arrayData = data.results[0].members;
var page = document.getElementById('attendance')? 'attendance' : (document.getElementById('party-loyalty')? 'party-loyalty' : 'attendance');
console.log(page);

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
  "most_loyal": 0
};

var democratList = [];
var republicanList = [];
var independentList = [];

fillStatistics(arrayData);

//Funcion para llenar el objeto Statitics
function fillStatistics(obj) {

 /*  para no mostrar los delegates solo filtro a los representatives (que son los que votan)
  if (data.results[0].chamber === "House") {
    obj = obj.filter(member => member.title == 'Representative');
  }*/

  statistics.total_members = obj.length;

  democratList = obj.filter(member => member.party == 'D');
  republicanList = obj.filter(member => member.party == 'R');

  statistics.num_of_democrats = democratList.length;
  statistics.num_of_republicans = republicanList.length;

  console.log(statistics.total_members + " cantidad de miembros y " + statistics.num_of_democrats + " son democratas");
  console.log(statistics.num_of_republicans + " son republicanos");

  //Solo para la cámara que además tenga Independientes
  if (data.results[0].chamber == "Senate") {
    independentList = obj.filter(member => member.party == 'I');
    statistics.num_of_independents = independentList.length;
    console.log(statistics.num_of_independents + " son independientes");
  }

  statistics.democrats_average_votes_with_party = average(democratList, "votes_with_party_pct").toFixed(2);
  statistics.republicans_average_votes_with_party = average(republicanList, "votes_with_party_pct").toFixed(2);
  statistics.total_average_votes_with_party = average(obj,"votes_with_party_pct").toFixed(2);

  console.log(statistics.democrats_average_votes_with_party + " % promedio de votos por partido de democratas");
  console.log(statistics.republicans_average_votes_with_party + " % promedio de votos por partido de repubicanos");
  console.log(statistics.total_average_votes_with_party + " % promedio de lealtad en toda la camara");

  if(page == "party-loyalty"){
    statistics.most_loyal = showPercentage(obj, "votes_with_party_pct",true);
    statistics.least_loyal = showPercentage(obj, "votes_with_party_pct",false);
  
    console.log("the most loyal");
    console.log(statistics.most_loyal);
    console.log("the least loyal");
    console.log(statistics.least_loyal);
  }else if(page == "attendance"){
  statistics.most_engaged = showPercentage(obj, "missed_votes_pct",false);
  statistics.least_engaged = showPercentage(obj, "missed_votes_pct",true);

  console.log("the most engaged");
  console.log(statistics.most_engaged);
  console.log("the least engaged");
  console.log(statistics.least_engaged);
  }
  
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

//FUNCIONES PARA TABLAS
function createStatisticsTable(algo){
  return algo == 'least'? newStatisticsTable('least') : newStatisticsTable('most');
}

function newStatisticsTable(order){
var key1 ='';
var key2 = '';
var membersArray = [];
var column1 = '';
var column2= '';

  if (page == 'party-loyalty'){
     order == 'least'? membersArray = statistics.least_loyal : order == 'most'? membersArray = statistics.most_loyal : '';
     key1 = 'total_present';
     key2 = 'votes_with_party_pct';
     column1 = 'Num of Party Votes';
     column2 = '% Party Votes'
  }else if(page == 'attendance'){
     order == 'least'? membersArray = statistics.least_engaged : order == 'most'? membersArray = statistics.most_engaged : '';
     key1 = 'missed_votes';
     key2 = 'missed_votes_pct';
     column1 = 'Num of Missed Votes';
     column2 = '% Missed'
  }

  var tabla = '<thead class="thead-dark"><tr><th>Names</th><th>'+ column1 +'</th><th>'+ column2 +'</th></tr></thead>';
  tabla += '<tbody>'

  membersArray.forEach(function(member){
      tabla += '<tr>';
      member.total_present = Math.round((member.total_votes - member.missed_votes)*member.votes_with_party_pct/100);

      var middle = member.middle_name ? member.middle_name : '';
      var completeName = '<a href="'+ member.url+ '">'+ member.first_name + ' '+ middle + ' ' + member.last_name +'</a>';

      tabla += '<td>'+ completeName +'</td>';
      tabla += '<td>'+ member[key1]+'</td>';
      tabla += '<td>'+ member[key2]+'</td>';
      tabla += '</tr>';
  });

  tabla += '</tbody>';
  return tabla;
}

function glanceTable(){
  var table ='<thead class="thead-dark"><tr><th>Party</th><th>Number of Reps</th><th>% voted with party</th></tr></thead><tbody>';
  table += '<tr><td>Democrat</td><td>'+statistics.num_of_democrats+'</td><td>'+statistics.democrats_average_votes_with_party+'</td></tr>';
  table += '<tr><td>Republican</td><td>'+statistics.num_of_republicans+'</td><td>'+statistics.republicans_average_votes_with_party+'</td></tr>';
  data.results[0].chamber == 'Senate'? table += '<tr><td>Independent</td><td>'+statistics.num_of_independents+'</td><td>'+statistics.independents_average_votes_with_party+'</td></tr>': '';
  table += '<tr><td>Total</td><td>'+statistics.total_members+'</td><td>'+statistics.total_average_votes_with_party+'</td></tr>';
  table += '</tbody>';

  return table;
}
