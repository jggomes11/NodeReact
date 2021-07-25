const HttpStatus = require("../constants/http");

module.exports.INCORRECT_PASSWORD = {
  status: HttpStatus.BAD_REQUEST,
  code: "AUTH-001",
  message: "Senha incorreta.",
};

module.exports.INCORRET_EMAIL = {
  status: HttpStatus.BAD_REQUEST,
  code: "AUTH-002",
  message: "Email incorreto.",
};

module.exports.AUTH003 = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  code: "AUTH-003",
  message: "Falha ao atualizar o token.",
};

module.exports.AUTH004 = {
  status: HttpStatus.FORBIDDEN,
  code: "AUTH-004",
  message: "Falha buscar usuário pelo token.",
};

module.exports.INVALID_TOKEN = {
  status: HttpStatus.FORBIDDEN,
  code: "AUTH-005",
  message: "Falha ao validar o token.",
};

module.exports.AUTH006 = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  code: "AUTH-006",
  message: "Falha ao remover o token.",
};

module.exports.NO_TOKEN = {
  status: HttpStatus.FORBIDDEN,
  code: "AUTH-008",
  message: "Token não enviado",
};
