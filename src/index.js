import Fastify from 'fastify';
import { getGroupData } from './functions.js';
import { readMeasurements, calculateProperties} from './functions.js'; 

const fastify = Fastify({
    logger: true
});

// Rota principal: retorna um agregado de todas as estações
fastify.get('/', async (request, reply) => {
    try {
        const conjointData = await getGroupData();
        reply.send(conjointData);
    } catch (err) {
        reply.status(500).send({ error: 'Failed to fetch conjoint data' });
    }
});

// Rota: retorna todas as instâncias da estação com o nome informado
fastify.get('/station/:name', async (request, reply) => {
    try {
        const { name } = request.params;
        const measurements = await readMeasurements();
        const stationData = measurements.filter(m => m.station === name);
        
        if (stationData.length === 0) {
            reply.status(404).send({ error: 'Station not found' });
            return;
        }

        const temperatures = stationData.map(m => m.temperature);
        const stats = calculateProperties(temperatures);

        reply.send({ station: name, ...stats });
    } catch (err) {
        reply.status(500).send({ error: 'Failed to fetch station data' });
    }
});

// Rota: retorna todas as estações em que o número se enquadra no intervalo
fastify.get('/temperatura/:temperature', async (request, reply) => {
    try {
        const { temperature } = request.params;
        const tempNumber = parseFloat(temperature);
        const measurements = await readMeasurements();
        const matchingStations = measurements.filter(m => m.temperature <= tempNumber + 0.5 && m.temperature >= tempNumber - 0.5);
        const uniqueStations = [...new Set(matchingStations.map(m => m.station))];

        if (uniqueStations.length === 0) {
            reply.status(404).send({ error: 'No stations found within the specified temperature range' });
            return;
        }

        reply.send(uniqueStations);
    } catch (err) {
        reply.status(500).send({ error: 'Failed to fetch stations by temperature' });
    }
});

// Iniciar o servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3005 });
        console.log('Servidor rodando em http://localhost:3005');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
