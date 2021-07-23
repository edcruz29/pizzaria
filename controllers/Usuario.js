const UsuarioModel = require("../models/Usuario");
const fs=require('fs');

logarUsuario:(req,res)=>{
    const {email, senha} = req.body;
    const usuarioSalvo = fs.readFileSync(usuarioJson, {encoding:'utf-8'});
    usuarioSalvo=json.parse(usuarioSalvo);
    if(email!=usuarioSalvo.email){
        return res.send("Usuário Inválido")
    }
    if(!bcrypt.compareSync(senha, usuarioSalvo.senha)){
        return res.send("Senha Invalida")
    }
    req.session.usuario = usuarioSalvo;
    res.redirect("/pizzas")
}