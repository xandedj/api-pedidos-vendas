const db = require('../config/database');

exports.listarClientes = async (request, reply) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    reply.send(rows);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar clientes' });
  }
};

exports.obterCliente = async (request, reply) => {
  const { id } = request.params;
  try {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Cliente não encontrado' });
    } else {
      reply.send(rows[0]);
    }
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter cliente' });
  }
};

exports.criarCliente = async (request, reply) => {
  const { nome, email } = request.body;
  try {
    const [result] = await db.query('INSERT INTO clientes (nome, email) VALUES (?, ?)', [nome, email]);
    reply.status(201).send({ id: result.insertId, nome, email });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar cliente' });
  }
};

exports.atualizarCliente = async (request, reply) => {
  const { id } = request.params;
  const { nome, email } = request.body;
  try {
    await db.query('UPDATE clientes SET nome = ?, email = ? WHERE id_cliente = ?', [nome, email, id]);
    reply.send({ id, nome, email });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao atualizar os dados do cliente' });
  }
};

exports.excluirCliente = async (request, reply) => {
  const { id } = request.params;
  try {
    await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    reply.send({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir cliente' });
  }
};