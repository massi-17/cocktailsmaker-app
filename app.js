let glass = document.getElementById('glass');
let cocktails = document.querySelectorAll('.cocktails > div');
let root = document.documentElement;

async function getCocktail(drink) {
    let response = await fetch('data.json');
    let data = await response.json();

    let totParts = 0;
    for (let i = 0; i < data[drink].ingredients.length; i++) {
        totParts = totParts + parseInt(data[drink].ingredients[i].part);
    }

    

    for (let i = 0; i < data[drink].ingredients.length; i++) {
        let div = document.createElement('div');
        div.classList.add('ingredient');

        div.style.backgroundColor = data[drink].ingredients[i].color;
        div.style.height = `${(345 / totParts) * parseInt(data[drink].ingredients[i].part)}px`;

        div.style.animationDuration = '0.5s';
        div.style.animationDelay = `${i * 0.5}s`;

        glass.appendChild(div);
        glass.classList.add('animate');

        div.textContent = `${data[drink].ingredients[i].part} part of ${data[drink].ingredients[i].name}`;
    }
}

cocktails.forEach((cocktail) => {
    cocktail.addEventListener('click', (e) => {
        glass.innerHTML = '';
        glass.classList.remove('animate');
        getCocktail(e.target.dataset.drink);
    });
});
