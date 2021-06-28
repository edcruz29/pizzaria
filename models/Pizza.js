const pizzas = require("../database/pizzas.json");
const fs = require("fs");

const PizzaModel = {
  findAll: () => pizzas,
  findById:(id) =>{
    const encontrarPizza = pizzas.find((pizza) => pizza.id === id);
    return encontrarPizza;
  },
  create: (pizza) => {
    pizzas.push(pizza);
    fs.writeFileSync("./database/pizzas.json", JSON.stringify(pizzas));
  },
  update:(pizzaEncontrada,sabor,categoria,preco)=>{
  
    pizzaEncontrada.sabor = sabor;
    pizzaEncontrada.categoria = categoria;
    pizzaEncontrada.preco = preco;

  fs.writeFileSync("./database/pizzas.json", JSON.stringify(pizzas));
  },
  destroy:(id)=>{
    const newPizzas = pizzas.filter((pizza) => pizza.id !== id);
    pizzas.splice(newPizzas,1);
     fs.writeFileSync("./database/pizzas.json", JSON.stringify(newPizzas));
  }
};

module.exports = PizzaModel;
