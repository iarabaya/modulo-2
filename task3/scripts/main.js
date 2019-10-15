var arrayMembers = data.results[0].members;
var idSenate = 'senate-data';
var idHouse = 'house-data';

if(document.getElementById('senate-data')){
    createTable(idSenate);
}else if(document.getElementById('house-data')){
    createTable(idHouse);
}


function createTable(idName){
    var tablaNueva = newTable(update(arrayMembers));
    var tablaSenado = document.getElementById(idName);
    tablaSenado.innerHTML = tablaNueva;
}


function newTable(membersArray){
    var tabla = '<thead class="thead-dark"><tr><th>Full Name</th><th>Party Afflication</th><th>State</th><th>Seniority</th><th>% of votes with Party</th></tr></thead>';;
    tabla += '<tbody>'

    membersArray.forEach(function(members){
        tabla += '<tr>';

        var middle = members.middle_name ? members.middle_name : '';
        var completeName = '<a href="'+ members.url+ '">'+ members.first_name + ' '+ middle + ' ' + members.last_name +'</a>';

        tabla += '<td>'+ completeName +'</td>';
        tabla += '<td class="party">'+ members.party+'</td>';
        tabla += '<td class="state">'+ members.state+'</td>';
        tabla += '<td>'+ members.seniority+'</td>';
        tabla += '<td>'+ members.votes_with_party_pct +'%</td>';

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
  filtrados = array.filter(members => partySelected().includes(members.party) && (stateSelected() == members.state ||stateSelected() ==""))
    return filtrados;
}


