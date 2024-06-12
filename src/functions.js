import { promises as fs } from 'fs';
import path from 'path';

//função para ler os dados:
export async function readMeasurements() {
    const filepath = path.join(process.cwd(), 'data', 'measurements.txt');
    try {
        const data = await fs.readFile(filepath, 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const measurements = lines.map(line => {
            const [station, temperature] = line.split(';');
            return { station, temperature: parseFloat(temperature) };
        });
        return measurements;
    } catch (err) {
        throw new Error('Error reading measurements file');
    }
}

//função para os cálculos(média, máximo, mínimo e moda das temperaturas):
export function calculateProperties(temperatures) {
    let sum = 0;
    for (let i = 0; i < temperatures.length; i++){
        sum =+ temperatures[i];
    }   
    const mean = (sum / temperatures.length).toFixed(2);

    const sorted = [...temperatures].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    const frequencyMap = new Map();
    let mode = temperatures[0];
    let maxCount = 1;

    temperatures.forEach(temp => {
        const count = (frequencyMap.get(temp) || 0) + 1;
        frequencyMap.set(temp, count);

        if (count > maxCount) {
            maxCount = count;
            mode = temp;
        }
    });

    return { mean, min, max, mode };
}

//função para obter estações únicas, ordenado alfabeticamente e sem nomes duplicados:
export function getUniqueStations(measurements) {
    const stations = [...new Set(measurements.map(m => m.station))];
    return stations.sort((a, b) => a.localeCompare(b));
}

//função para obter os dados agregados:
export async function getGroupData() {
    try {
        const measurements = await readMeasurements();

        const stations = getUniqueStations(measurements);

        const conjoint = stations.map(station => {
            const stationMeasurements = measurements.filter(m => m.station === station);
            const temperatures = stationMeasurements.map(m => m.temperature);
            const stats = calculateProperties(temperatures);
            return { station, ...stats };
        });

        return conjoint.sort((a, b) => a.station.localeCompare(b.station));
    } catch (err) {
        console.error('Erro ao obter dados agregados:', err);
        throw err;
    }
}