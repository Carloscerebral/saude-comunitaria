const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/sobre', (req, res) => {
  res.render('sobre', { title: 'Sobre' });
});

router.get('/cadastro', (req, res) => {
  res.render('cadastro', { title: 'Cadastro' });
});

router.post('/adicionar', async (req, res) => {
  const { nome, valor, descricao, fornecedor, email, telefone } = req.body;
  await db.execute('INSERT INTO servicos (nome, valor, descricao, fornecedor, email, telefone) VALUES (?, ?, ?, ?, ?, ?)', 
    [nome, valor, descricao, fornecedor, email, telefone]);
  res.redirect('/servicos');
});

router.get('/servicos', async (req, res) => {
  const [result] = await db.execute('SELECT * FROM servicos');
  res.render('servicos', { servicos: result, title: 'Serviços' });
});

router.post('/deletar/:id', async (req, res) => {
  await db.execute('DELETE FROM servicos WHERE id = ?', [req.params.id]);
  res.redirect('/servicos');
});

router.get('/editar/:id', async (req, res) => {
  const [dados] = await db.execute('SELECT * FROM servicos WHERE id = ?', [req.params.id]);
  res.render('editar', { servico: dados[0], title: 'Editar Serviço' });
});

router.post('/editar/:id', async (req, res) => {
  const { nome, valor, descricao, fornecedor, email, telefone } = req.body;
  await db.execute(
    'UPDATE servicos SET nome=?, valor=?, descricao=?, fornecedor=?, email=?, telefone=? WHERE id=?',
    [nome, valor, descricao, fornecedor, email, telefone, req.params.id]
  );
  res.redirect('/servicos');
});

module.exports = router;