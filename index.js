const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid")
app.use(express.json());

const pizzas = require('./database/pizzas.json');

/*
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

/*
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

/*const procurarPizzaPeloNome = function (nomePizza) {
    const pizzaEncontrada = pizzas.find((pizza) => pizza.sabor === nomePizza);
  
    if (!pizzaEncontrada) return `A pizza sabor ${nomePizza} não foi encontrada.`;
  
    // return pizzaEncontrada
    //   ? pizzaEncontrada
    //   : `A pizza sabor ${sabor} não foi encontrada.`;
  
    return pizzaEncontrada;
  };
console.log(procurarPizzaPeloNome("Calabresa"))*/

app.get('/pizzas',(req,res) => res.json(pizzas));
/*Criar rota para criar uma nova pizza, utilizem o método http correto
Adicionem no array de pizzas e retorne essa nova pizza como json.
Importante: a Nova pizza precisa ter ID*/

app.post('/pizzas', (req,res) =>{
    const {sabor, categoria, preco} = req.body;
    

    const novaPizza = {
        id: uuidv4(),
        sabor,
        categoria,
        preco
    };
    pizzas.push(novaPizza)
    fs.writeFileSync("./database/pizzas.json", JSON.stringify(pizzas));
    res.status(201).json(novaPizza).send();
})

app.put('/pizzas/:id', (req,res) =>{
    const {id} = req.params;
    const {sabor, categoria, preco} = req.body;
    const pizzaEncontrada = pizzas.find(pizza => pizza.id === id)

    if(!pizzaEncontrada){
        return res.status(400).json({mensagem:"Pizza não encontrada"})
    }
    pizzaEncontrada.sabor = sabor;
    pizzaEncontrada.categoria = categoria;
    pizzaEncontrada.preco = preco

    fs.writeFileSync("./database/pizzas.json", JSON.stringify(pizzas));
    return res.json(pizzaEncontrada)
})


  app.listen(3000,() =>console.log("ServerON"))