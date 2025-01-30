require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('fastify-cors');

// fastify.register(cors, { 
//   origin: true
// });

// fastify.register(require('fastify-swagger'), {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'Sistema de Pedidos API' }
//   }
// });

// Registre as rotas aqui

fastify.register(require('./routes/produtoRoutes'));
fastify.register(require('./routes/clienteRoutes'));
fastify.register(require('./routes/pedidoRoutes'));
fastify.register(require('./routes/pedidoItemRoutes'));

const start = async () => {
    try {
      await fastify.listen({ 
        port: parseInt(process.env.PORT, 10) || 3000,
        host: '0.0.0.0'
      });
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

start();