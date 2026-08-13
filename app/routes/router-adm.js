const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
 
 
// =========================
// PÁGINA INICIAL ADM
// =========================
router.get("/", (req, res) => {
    res.render("pages/index-adm");
});
 
 
// =========================
// CLIENTES
// =========================
router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});
 
 
// =========================
// NOVO CLIENTE - GET
// =========================
router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo", {
        listaErros: [],
        campos: {},
        mensagemSucesso: null
    });
});
 
 
// =========================
// NOVO CLIENTE - POST
// =========================
router.post(
    "/adm-cliente-novo",
 
    // NOME
    body("nome")
        .trim()
        .notEmpty()
        .withMessage("O nome é obrigatório!")
        .bail()
        .isLength({ min: 10, max: 50 })
        .withMessage("O nome deve ter de 10 a 50 caracteres!"),
 
    // E-MAIL
    body("email")
        .trim()
        .notEmpty()
        .withMessage("O e-mail é obrigatório!")
        .bail()
        .isEmail()
        .withMessage("O e-mail deve ser válido!"),
 
    // SENHA
    body("senha")
        .notEmpty()
        .withMessage("A senha é obrigatória!")
        .bail()
        .isLength({ min: 8, max: 10 })
        .withMessage("A senha deve ter de 8 a 10 caracteres!"),
 
    // CONFIRMAR SENHA
    body("cSenha")
        .notEmpty()
        .withMessage("Confirme a senha!")
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.senha) {
                throw new Error("As senhas estão diferentes!");
            }
 
            return true;
        }),
 
    // TIPO
    body("tipo")
        .notEmpty()
        .withMessage("O tipo de usuário é obrigatório!")
        .bail()
        .isInt({ min: 1, max: 2 })
        .withMessage("Tipo deve ser 1 ou 2!"),
 
    // STATUS
    body("status")
        .notEmpty()
        .withMessage("O status é obrigatório!")
        .bail()
        .isInt({ min: 1, max: 2 })
        .withMessage("Status deve ser 1 ou 2!"),
 
    // NOME DE USUÁRIO
    body("nomeUsuario")
        .trim()
        .notEmpty()
        .withMessage("O nome de usuário é obrigatório!")
        .bail()
        .isLength({ min: 1, max: 10 })
        .withMessage("O nome de usuário deve ter de 1 a 10 caracteres!"),
 
    // CEP
    body("cep")
        .trim()
        .notEmpty()
        .withMessage("O CEP é obrigatório!")
        .bail()
        .isLength({ min: 8, max: 8 })
        .withMessage("O CEP deve conter 8 dígitos!")
        .bail()
        .isNumeric()
        .withMessage("O CEP deve conter apenas números!"),
 
    // RESULTADO DA VALIDAÇÃO
    function (req, res) {
 
        const error = validationResult(req);
 
        // =========================
        // SE TIVER ERRO
        // =========================
        if (!error.isEmpty()) {
 
            console.log(error.array());
 
            return res.render("pages/adm-cliente-novo", {
                listaErros: error.array(),
                campos: req.body,
                mensagemSucesso: null
            });
        }
 
        // =========================
        // SE ESTIVER TUDO CERTO
        // =========================
        console.log("Cliente válido:", req.body);
 
        return res.render("pages/adm-cliente-novo", {
            listaErros: [],
            campos: {},
            mensagemSucesso: "Cliente criado com sucesso!"
        });
    }
);
 
 
// =========================
// EDITAR CLIENTE
// =========================
router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});
 
 
// =========================
// LISTAR CLIENTES
// =========================
router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});
 
 
// =========================
// DELETAR CLIENTE
// =========================
router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});
 
 
module.exports = router;