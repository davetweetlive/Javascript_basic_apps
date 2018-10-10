//Variables





//EventListeners
document.addEventListener('DOMContentLoaded', function(){
  const html = new HTMLUI();
  html.displayYears();
});




//Objects
function HTMLUI(){}

HTMLUI.prototype.displayYears = function(){
  const max = new Data().getFullYear();
  const min = max-20;

  const selectYears = document.getElementById('year');

  for(let i=0; i<max; i++){
    let options = document.createElement('option');
    options.value = i;
    option.textContent = i;
    selectYears.appendChild(options)
  }
}
;
