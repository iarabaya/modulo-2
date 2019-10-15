var arrayMembers = data.results[0].members;

if(document.getElementById('senate-data')){
    createTableSenate();
}else if(document.getElementById('house-data')){
    createTableHouse();
}



function createTableSenate(){
    var tablaNueva = newTable(update(arrayMembers));
    var tablaSenado = document.getElementById('senate-data');
    tablaSenado.innerHTML = tablaNueva;
}

function createTableHouse(){
    var tablaNueva = newTable(update(arrayMembers));
    var tablaHouse = document.getElementById('house-data');
    tablaHouse.innerHTML = tablaNueva;
}


function newTable(membersArray){
    var tabla = '<thead class="thead-dark"><tr><th>Full Name</th><th>Party Afflication</th><th>State</th><th>Seniority</th><th>% of votes with Party</th></tr>';;
    tabla += '<tbody>'

    membersArray.forEach(function(members){
        tabla += '<tr>';

        var middle = members.middle_name ? members.middle_name : '';
        var completeName = '<a href="'+ members.url+ '">'+ members.first_name + ' '+ middle + ' ' + members.last_name +'</a>';

        tabla += '<td>'+ completeName +'</td>';
        tabla += '<td class="party">'+ members.party+'</td>';
        tabla += '<td class="state">'+ members.state+'</td>';
        tabla += '<td>'+ members.seniority+'</td>';
        tabla += '<td> % '+ members.votes_with_party_pct +'</td>';

        tabla += '</tr>';
    });

    tabla += '</tbody>';
    return tabla;
}

//Array para los checkboxes seleccionados
function partySelected(){
  var checkedBoxes = document.querySelectorAll('input[name=party_filter]:checked')
  checkedBoxes = Array.from(checkedBoxes);
  checkedBoxes = checkedBoxes.map(function(element){return element.value});
  return checkedBoxes;
}

//Array para el estado seleccionado en el dropdown
function stateSelected(){
  var selectedOp = document.querySelector('#state_filter').value;
  return selectedOp;
}

//Array que filtra segun lo seleccionado para partido y estado
function update(array){
  var filtrados = [];
  filtrados = array.filter(members => partySelected().includes(members.party))
  
    if(stateSelected() != ""){
      filtrados = filtrados.filter(member => stateSelected().includes(member.state))
      return filtrados;
    }else if(stateSelected()==""){
      return filtrados;
    }
}




//Otras formas de hacer el dropdown de estados

/*
var states = [];
var statesClean = [];
var stateOptions = "";
var k = 0;

var createSelect = document.createElement("SELECT");
createSelect.setAttribute("id", "stateFilter");
createSelect.setAttribute("class", "filter");
createSelect.setAttribute("name", "state");
document.body.appendChild(createSelect);

var createElement = document.createElement("option");
createElement.setAttribute("value", "All");

var createNode = document.createTextNode("All");
createElement.appendChild(createNode);
document.getElementById("stateFilter").appendChild(createElement);

for (var i = 0; i < data.results[0].num_results; i++) {
	states[i] = dataCorto[i].state;
}

Array.prototype.unique = function (a) { // crea un prototipo del objeto array 
	return function () {
		return this.filter(a)
	}
}(function (a, b, c) {
	return c.indexOf(a, b + 1) < 0
});

statesClean = states.unique();
statesClean.sort();

var myLambda = (item, index) => {
	var createElement = document.createElement("option");
	createElement.setAttribute("value", item);

	var createNode = document.createTextNode(item);
	createElement.appendChild(createNode);
	document.getElementById("stateFilter").appendChild(createElement);
}
statesClean.forEach(myLambda);
*/ 


/*var stateList = []

getStates(data.results[0].members);

function getStates(members){
 for (var i = 0; i < members.length; i++){
   if (!stateList.includes(members[i].state)){
     stateList.push(members[i].state);
   }
 }
 stateList.sort();
}

var dropdownSelect = "";

function createStateDropdown(){
 dropdownSelect += "<option value='All'>All</option>" ;
 stateList.forEach(item => {
   dropdownSelect += "<option value='" + item + "'>" + item + "</option>";
 });
 return dropdownSelect;
}

createStateDropdown();
document.getElementById("stateSelect").innerHTML = dropdownSelect*/
