const express = require("express");
const router = express.Router();
const PizzaController = require("../controllers/PizzaController");
const PizzaModel = require("../models/Pizza");

router.get("/", PizzaController.listar);
router.get('/new',(req, res) =>{
    res.render("novaPizza", {title:"Criar Nova Pizza" })
})
router.get("/editar/:id",(req,res)=>{
    const {id} = req.params;
    const pizza = PizzaModel.findById(id);
    res.render("editarPizza", {pizza, title:"Editar Pizza"})
})

router.get("/:id",PizzaController.buscar)

router.post("/", PizzaController.criarUmaPizza);

router.put("/:id", PizzaController.editarUmaPizza);

router.delete("/:id", PizzaController.deletarUmaPizza);

module.exports = router;
