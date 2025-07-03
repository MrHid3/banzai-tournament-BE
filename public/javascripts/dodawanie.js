//lista belek dla każdego pasu jako emotki
//to bolało
const belki = {
    bialy: [
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
    zolty: [
        "🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟨🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟨🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟥🟨🟨🟨🟨🟨🟨🟨",
        "🟥🟥🟥🟥🟨🟨🟨🟨🟨🟨",
        "🟧🟧🟧🟧🟧🟨🟨🟨🟨🟨",
    ],
    pomaranczowy: [
        "🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧",
        "🟧🟧🟧🟧🟧🟩🟩🟩🟩🟩"
    ],
    zielony: [
        "🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩"
    ]
}

//belki pokazują się kiedy wybierze się dany pas
const pasForm = document.getElementById("pas-form");
const belkiForm = document.getElementById("belki-form");
pasForm.addEventListener("input", () => {
    console.log(pasForm)
    while(belkiForm.length > 0)
        belkiForm.removeChild(belkiForm.firstChild);
    belki[pasForm.value].forEach((e, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.text = e;
        belkiForm.appendChild(option);
    })
})

//dodawanie kolejnego dziecka
function dodajDziecko(){
    const tablicaDzieci = document.querySelector("#tablica-dzieci");
    const original = document.querySelector("#original");
    const clone = original.cloneNode(true);

}