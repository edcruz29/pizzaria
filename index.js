const express = require("express");
const app = express();



const pizzas = require('./database/pizzas.json');


const listarTodasAsPizzas = () => {
    let conteudo = "";

   pizzas.forEach(pizza =>{
    conteudo +=`
        id:${pizza.id}
         Sabor: ${pizza.sabor}
         Categoria: ${pizza.categoria}
         Preço: ${pizza.preco}        
        `
    });
    return  conteudo;
}
console.log(listarTodasAsPizzas())


const adicionarPizza = function (sabor,categoria,preco){

    const pizzaNova = {
        id:pizzas[pizzas.length -1].id + 1,
        sabor: sabor,
        categoria:categoria,
        preco:preco
    }
   
    pizzas.push(pizzaNova);

}
adicionarPizza("Peperoni", "Salgada", 15.89)
console.log(listarTodasAsPizzas())


/*Criar uma função que recebe o nome da pizza e retorna o objeto dessa pizza.
Dica: Utilizem o método find
const infoPizza = (pizza) => {
    function buscarPizza(sabor) {
        return sabor.sabor === pizza;
    }
    console.log(pizzas.find(buscarPizza));
    }
infoPizza("Brócolis");*/

const procurarPizzaPeloNome = function (nomePizza) {
    const pizzaEncontrada = pizzas.find((pizza) => pizza.sabor === nomePizza);
  
    if (!pizzaEncontrada) return `A pizza sabor ${nomePizza} não foi encontrada.`;
  
    // return pizzaEncontrada
    //   ? pizzaEncontrada
    //   : `A pizza sabor ${sabor} não foi encontrada.`;
  
    return pizzaEncontrada;
  };
console.log(procurarPizzaPeloNome("Calabresa"))




app.use(express.json());

app.get('/pizzas',(req,res) => res.json(pizzas));
/*Criar rota para criar uma nova pizza, utilizem o método http correto
Adicionem no array de pizzas e retorne essa nova pizza como json.
Importante: a Nova pizza precisa ter ID*/



  app.listen(3000,() =>console.log("ServerON"))