async function getResource(resourceName) {
    const request = await fetch(resourceName);
    return await request.json();
}
const stripes = await getResource('/resources/stripes.json');
const locations = await getResource('/resources/locations.json');

const locationSelect = document.querySelector('#location-select');
locations.forEach(location => {
    const option = document.createElement("option");
    option.value = location.value;
    option.text = location.name;
    locationSelect.appendChild(option);
})

//scheme
// <tr class="competitor-0">
// <td><input type="text" name="name"></td>
// <td><input type="text" name="surname"></td>
// <td><input type="number" name="age"></td>
// <td><input type="number" name="weight"></td>
// <td><select name="belt" onInput=showStripes(0)>
//     <option value="white">biały</option>
//     <option value="yellow">żółty</option>
//     <option value="orange">pomarańczowy</option>
//     <option value="green">zielony</option>
// </select></td>
// <td><select name="stripe" class="stripe-0"></select></td>
// </tr>
let competitorNumber = 0;
function addCompetitor() {
    competitorNumber++;
    const inputs = [['text', 'name'], ['text', 'surname'], ['number', 'age'], ['number', 'weight']]
    const competitorTable = document.querySelector("#competitors-table");
    const tr = document.createElement("tr");
    tr.classList.add(`competitor-${competitorNumber}`);
    tr.classList.add("competitor");
    for (let i = 0; i < inputs.length; i++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = inputs[i][0];
        input.name = inputs[i][1];
        td.appendChild(input);
        tr.appendChild(td);
    }
    const belts = [['white', 'biały'], ['yellow', 'żółty'], ['orange', 'pomarańczowy'], ['green', 'zielony']];
    let beltTd = document.createElement("td");
    let beltSelect = document.createElement("select");
    beltSelect.name = "belt";
    for (let i = 0; i < belts.length; i++) {
        const option = document.createElement("option");
        option.value = belts[i][0];
        option.text = belts[i][1];
        beltSelect.appendChild(option);
        beltSelect.classList.add(`belt-${competitorNumber}`)
        beltSelect.oninput = showStripes;
    }
    beltTd.appendChild(beltSelect);
    tr.appendChild(beltTd);
    const stripeTd = document.createElement("td");
    const stripeSelect = document.createElement("select");
    stripeSelect.name = "stripe";
    stripeSelect.classList.add(`stripe-${competitorNumber}`);
    stripeTd.appendChild(stripeSelect);
    tr.appendChild(stripeTd);
    const deleteButtonTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button")
    deleteButton.innerHTML = "&#88;";
    deleteButton.onclick = deleteCompetitor;
    deleteButtonTd.appendChild(deleteButton);
    tr.appendChild(deleteButtonTd);
    competitorTable.appendChild(tr);
    showStripes({target: beltSelect})
}

function showStripes(e){
    const stripeForm = e.target.parentElement.parentElement.children[5].children[0];
    const beltForm = e.target;
    while (stripeForm.length > 0)
         stripeForm.removeChild(stripeForm.firstChild);
     stripes[beltForm.value].forEach((e, i) => {
         const option = document.createElement("option");
         option.value = i;
         option.text = e;
         stripeForm.appendChild(option);
     })
}

function deleteCompetitor(e){
    e.target.parentElement.parentElement.remove();
    competitorNumber--;
}

addCompetitor();
const addCompetitorButton = document.querySelector("#add-competitor-button");
addCompetitorButton.addEventListener("click", addCompetitor);

function send(){
    if(confirm("Na pewno?")){
        let competitors = [];
        const categories = ["name", "surname", "age", "weight"];
        for(let i = 0; i < competitorNumber; i++){
            competitors.push([]);
        }
        categories.forEach(category => {
            const inputs = document.querySelectorAll(`input[name="${category}"]`);
            inputs.forEach((input, j) => {
                competitors[j].push(input.value);
            })
        })
        const beltSelects = document.querySelectorAll("select[name=belt]");
        beltSelects.forEach((input, index) => {
            competitors[index].push(input.value);
        })
        const stripeSelects = document.querySelectorAll("select[name=stripe]");
        stripeSelects.forEach((input, index) => {
            competitors[index].push(input.value);
        })
        competitors.forEach((competitor, index) => {
            for(let i = 5; i >= 0; i--){
                if(competitor[i] == ""){
                    competitors.splice(index, 1);
                    break;
                }
            }
        });
        console.log(competitors);
        fetch("/addCompetitors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                school: locationSelect.value,
                competitors: competitors
            })
        })
    }
}
const sendButton = document.querySelector("#send-button");
sendButton.addEventListener("click", send);