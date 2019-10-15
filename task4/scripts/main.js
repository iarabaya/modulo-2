var congressMembers;

var url = '';
var chamber = '';

var app = new Vue({
  el:'#tabla',
  data: {
    members: congressMembers
  },
  methods:{
    update: function(){
      this.members= filterMembers(congressMembers);
    }
  }
});


if(document.getElementById('senate')){
  chamber = 'senate';
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"
  console.log(url);
}else if(document.getElementById('house')){
  chamber = 'house';
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
  console.log(url);
}
 
fetch(url,{
  headers:{'X-API-Key': '6KrAgPHFgkxmuIdBjxdBhBXccl2kWbUcejhCbXnx'}
}).then(res => res.json()).then(res => 
  {congressMembers = res;
    congressMembers = congressMembers.results[0].members;
    console.log(congressMembers);
    app.members = congressMembers;
  })
.catch( error => console.error(error));


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
function filterMembers(array){
  var filtrados = [];
  filtrados = array.filter(members => partySelected().includes(members.party) && (stateSelected() == members.state ||stateSelected() ==""))
    return filtrados;
}


