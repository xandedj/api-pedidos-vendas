const db = require('../config/database');

// exports.listarItensPedido = async (request, reply) => {
//   const { idPedido } = request.params;
//   try {
//     const [rows] = await db.query('SELECT pi.*, p.preco as preco_unitario, p.nome as produto_nome FROM pedido_itens pi JOIN produtos p ON pi.id_produto = p.id_produto WHERE pi.id_pedido = ?', [idPedido]);
//     reply.send(rows);
//   } catch (error) {
//     reply.status(500).send({ error: 'Erro ao listar itens do pedido' });
//   }
// };

exports.obterItemPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    // const [rows] = await db.query('SELECT pi.*, p.nome as produto_nome FROM pedido_itens pi JOIN produtos p ON pi.id_produto = p.id_produto WHERE pi.id_pedido_item = ?', [id]);
    const [rows] = await db.query('SELECT pi.*, p.preco as preco_unitario, p.nome as produto_nome FROM pedido_itens pi JOIN produtos p ON pi.id_produto = p.id_produto WHERE pi.id_pedido = ?', [id]);
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Item de pedido não encontrado' });
    } else {
      reply.send(rows);
    }
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter item de pedido' });
  }
};

exports.adicionarItemPedido = async (request, reply) => {
  const { id_pedido, id_produto, qtde } = request.body;

  try {
    // Primeiro, buscar o preço do produto
    const [produtoRows] = await db.query('SELECT preco FROM produtos WHERE id_produto = ?', [id_produto]);
    
    if (produtoRows.length === 0) {
      return reply.status(404).send({ error: 'Produto não encontrado' });
    }

    const precoProduto = produtoRows[0].preco;

    // Calcular o valor total
    const valorTotal = precoProduto * qtde;

    // Inserir o item do pedido com o valor total calculado
    const [result] = await db.query(
      'INSERT INTO pedido_itens (id_pedido, id_produto, qtde, preco) VALUES (?, ?, ?, ?)',
      [id_pedido, id_produto, qtde, valorTotal]
    );

    // Buscar o item inserido para retornar todos os detalhes
    const [itemInserido] = await db.query(
      'SELECT pi.*, p.nome as produto_nome FROM pedido_itens pi ' +
      'JOIN produtos p ON pi.id_produto = p.id_produto ' +
      'WHERE pi.id_pedido_item = ?',
      [result.insertId]
    );

    reply.status(201).send(itemInserido[0]);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao adicionar item ao pedido' });
  }
};

// exports.atualizarItemPedido = async (request, reply) => {
//   const { id } = request.params;
//   const { qtde, preco } = request.body;
//   try {
//     await db.query('UPDATE pedido_itens SET qtde = ?, preco = ? WHERE id_pedido_item = ?', [qtde, preco, id]);
//     reply.send({ id, qtde, preco });
//   } catch (error) {
//     reply.status(500).send({ error: 'Erro ao atualizar item do pedido' });
//   }
// };

exports.atualizarItemPedido = async (request, reply) => {
  const { id } = request.params;
  const { qtde } = request.body;

  try {
    // Primeiro, buscar informações do item do pedido atual
    const [itemPedidoRows] = await db.query(
      'SELECT id_produto FROM pedido_itens WHERE id_pedido_item = ?',
      [id]
    );

    if (itemPedidoRows.length === 0) {
      return reply.status(404).send({ error: 'Item do pedido não encontrado' });
    }

    const id_produto = itemPedidoRows[0].id_produto;

    // Buscar o preço atual do produto
    const [produtoRows] = await db.query(
      'SELECT preco FROM produtos WHERE id_produto = ?',
      [id_produto]
    );

    if (produtoRows.length === 0) {
      return reply.status(404).send({ error: 'Produto não encontrado' });
    }

    const precoProduto = produtoRows[0].preco;

    // Calcular o novo valor total
    const novoValorTotal = precoProduto * qtde;

    // Atualizar o item do pedido com a nova quantidade e o novo valor total
    await db.query(
      'UPDATE pedido_itens SET qtde = ?, preco = ? WHERE id_pedido_item = ?',
      [qtde, novoValorTotal, id]
    );

    // Buscar o item atualizado para retornar todos os detalhes
    const [itemAtualizado] = await db.query(
      'SELECT pi.*, p.nome as produto_nome FROM pedido_itens pi ' +
      'JOIN produtos p ON pi.id_produto = p.id_produto ' +
      'WHERE pi.id_pedido_item = ?',
      [id]
    );

    reply.send(itemAtualizado[0]);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao atualizar item do pedido' });
  }
};

exports.removerItemPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    await db.query('DELETE FROM pedido_itens WHERE id_pedido_item = ?', [id]);
    reply.send({ message: 'Item do pedido removido com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao remover item do pedido' });
  }
};