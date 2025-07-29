//lista belek dla każdego pasu jako emotki
//to bolało
const stripes = {
    white: [
        "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜",
        "🟨⬜⬜⬜⬜⬜⬜⬜⬜⬜",
        "🟨🟨⬜⬜⬜⬜⬜⬜⬜⬜",
        "🟨🟨🟨⬜⬜⬜⬜⬜⬜⬜",
        "🟨🟨🟨🟥⬜⬜⬜⬜⬜⬜",
        "🟨🟨🟨🟥🟥⬜⬜⬜⬜⬜",
        "🟨🟨🟨🟥🟥🟥⬜⬜⬜⬜",
        "🟨🟨🟨🟥🟥🟥⬛⬜⬜⬜",
        "🟨🟨🟨🟥🟥🟥⬛⬛⬜⬜",
        "🟨🟨🟨🟥🟥🟥⬛⬛⬛⬜",
        "🟨🟨🟨🟨🟨⬜⬜⬜⬜⬜",
    ],
    yellow: [
        "🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟨🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟥🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟥🟥🟨🟨🟨🟨🟨🟨",
        "🟧🟧🟧🟧🟧🟨🟨🟨🟨🟨",
    ],
    orange: [
        "🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧",
        "🟧🟧🟧🟧🟧🟩🟩🟩🟩🟩"
    ],
    green: [
        "🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩"
    ]
}

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
    const inputs = [['text', 'imie'], ['text', 'nazwisko'], ['number', 'wiek'], ['number', 'waga']]
    const competitorTable = document.querySelector("#competitor-table");
    const tr = document.createElement("tr");
    tr.classList.add(`competitor-${competitorNumber}`);
    for (let i = 0; i < inputs.length; i++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = inputs[i][0];
        input.name = inputs[i][1];
        td.appendChild(input);
        tr.appendChild(td);
    }
    const belts = [['white', 'biały'], ['yellow', 'żółty'], ['orange', 'pomaranczowy'], ['green', 'zielony']];
    let beltTd = document.createElement("td");
    let beltSelect = document.createElement("select");
    beltSelect.name = "belt";
    for (let i = 0; i < belts.length; i++) {
        const option = document.createElement("option");
        option.value = belts[i][0];
        option.text = belts[i][1];
        beltSelect.appendChild(option);
        beltSelect.classList.add(`belt-${competitorNumber}`)
        beltSelect.oninput = () => showStripes(competitorNumber);
    }
    beltTd.appendChild(beltSelect);
    tr.appendChild(beltTd);
    const stripeTd = document.createElement("td");
    const stripeSelect = document.createElement("select");
    stripeSelect.name = "stripe";
    stripeSelect.classList.add(`stripe-${competitorNumber}`);
    stripeTd.appendChild(stripeSelect);
    tr.appendChild(stripeTd);
    competitorTable.appendChild(tr);
    showStripes(competitorNumber);
}

function showStripes(competitorNumber){
    const stripeForm = document.querySelector(`.stripe-${competitorNumber}`);
    const beltForm = document.querySelector(`.belt-${competitorNumber}`);
    console.log(stripeForm, `.stripe-${competitorNumber}`);
    while (stripeForm.length > 0)
         stripeForm.removeChild(stripeForm.firstChild);
     stripes[beltForm.value].forEach((e, i) => {
         const option = document.createElement("option");
         option.value = i;
         option.text = e;
         stripeForm.appendChild(option);
     })
}

addCompetitor();