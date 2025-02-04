const db = require('../config/database');

exports.listarPedidos = async (request, reply) => {
  try {
    const [rows] = await db.query('SELECT p.*, c.nome as cliente_nome FROM pedidos p JOIN clientes c ON p.id_cliente = c.id_cliente');
    reply.send(rows);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar pedidos' });
  }
};

exports.obterPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    const [rows] = await db.query('SELECT p.*, c.nome as cliente_nome FROM pedidos p JOIN clientes c ON p.id_cliente = c.id_cliente WHERE p.id_pedido = ?', [id]);
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Pedido não encontrado' });
    } else {
      reply.send(rows[0]);
    }
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter pedido' });
  }
};

exports.criarPedido = async (request, reply) => {
  const { id_cliente } = request.body;
  try {
    const [result] = await db.query('INSERT INTO pedidos (data, id_cliente) VALUES (NOW(), ?)', [id_cliente]);
    reply.status(201).send({ id: result.insertId, id_cliente });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar pedido' });
  }
};

exports.atualizarPedido = async (request, reply) => {
  const { id } = request.params;
  const { data, id_cliente } = request.body;
  try {
    await db.query('UPDATE pedidos SET data = NOW(), id_cliente = ? WHERE id_pedido = ?', [id_cliente, id]);
    reply.send({ id, id_cliente });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao atualizar pedido' });
  }
};

exports.excluirPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    await db.query('DELETE FROM pedido_itens WHERE id_pedido = ?', [id]);
    await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    reply.send({ message: 'Pedido excluído com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir pedido' });
  }
};