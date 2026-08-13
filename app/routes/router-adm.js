const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");


router.get("/", (req, res)=>{
    res.render("pages/index-adm");
})

router.get("/adm-cliente", (req, res)=>{
    res.render("pages/adm-cliente");
})

router.get("/adm-cliente-novo", (req, res)=>{
     res.render("pages/adm-cliente-novo", { listaErros: null, campos:{} })
});

router.post(
    "/adm-cliente-novo",

    body("nome")
        .isLength({ min: 10, max: 50 })
        .withMessage("O nome deve ter de 10 a 50 caracteres!"),

    body("email")
        .isEmail()
        .withMessage("O e-mail deve ser válido!"),

    body("senha")
        .isLength({ min: 8, max: 10 })
        .withMessage("A senha deve ter de 8 a 10 caracteres!"),

    body("cSenha").custom((value, { req }) => {
        if (value !== req.body.senha) {
            throw new Error("As senhas estão diferentes");  
        }
        return true;
    }),


     body("tipo").isInt({"min" : 1 , "max" : 2})
     .withMessage("Tipo tem que ser 1 ou 2 querido"),

          body("status").isInt({"min" : 1 , "max" : 2})
     .withMessage("Tipo tem que ser 1 ou 2 querido"),

       body("nomeUsuario")
        .isLength({ min: 1, max: 10 })
        .withMessage("O nome deve ter de 1 a 10 caracteres!"),
   
    body("cep")
        .isLength({ min: 8, max: 8 })
        .withMessage("O CEP deve conter 8 dígitos!")
        .isNumeric()
        .withMessage("O CEP deve conter apenas números!"),

    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("pages/adm-cliente-novo", {
                listaErros: errors,
                campos: req.body
            });
        }

        return res.render("pages/adm-cliente-novo", {
            listaErros: null,
            campos: req.body
        });
    }
);


router.get("/adm-cliente-edit", (req, res)=>{
    res.render("pages/adm-cliente-edit");
})

router.get("/adm-cliente-list", (req, res)=>{
    res.render("pages/adm-cliente-list");
})

router.get("/adm-cliente-del", (req, res)=>{
    res.render("pages/adm-cliente-del");
})

module.exports = router;