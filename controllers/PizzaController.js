const { v4 } = require("uuid");
const PizzaModel = require("../models/Pizza");

const PizzaController = {
  listar: (req, res) => {
    const pizzas = PizzaModel.findAll();
    res.json(pizzas);
    //res.render("pizzas", { pizzas });
  },
  buscar:(req,res) =>{
    const { id } = req.params;
    const pizzas = PizzaModel.findById(id);
    res.json(pizzas);
  },
  criarUmaPizza: (req, res) => {
    const { sabor, categoria, preco } = req.body;

    const pizzaNova = {
      id: v4(),
      sabor,
      categoria,
      deleted: false,
      preco,
    };

    PizzaModel.create(pizzaNova);

    res.status(201).json(pizzaNova);
  },
  editarUmaPizza: (req, res) => {
    const { id } = req.params;
    const { sabor, categoria, preco } = req.body;
    const pizzaEncontrada = PizzaModel.findById(id);

    if (!pizzaEncontrada) {
      return res.status(400).json({ mensagem: "Pizza não encontrada" });
    }

    pizzaEncontrada.sabor = sabor;
    pizzaEncontrada.categoria = categoria;
    pizzaEncontrada.preco = preco;

    PizzaModel.update(pizzaEncontrada);

    return res.json(pizzaEncontrada);
  },
  deletarUmaPizza: (req, res) => {
    const { id } = req.params;

 PizzaModel.destroy(id);
  res.status(204).json();
  },
};

module.exports = PizzaController;
