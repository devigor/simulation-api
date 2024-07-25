import { format as formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { SimulationService } from "./simulationService";
import { getPowerValue } from "../utils/power";
import { Gerador, fetchAllItems, filterItemsByPower } from "../external/GeradoresApi";
import { UserService } from "./userService";
import { PdfCreateProps, createPdfSimulation } from "../utils/pdf";
import { StatusEnum } from '../entity/Simulation';

export const createReports = async () => {
  const simulationService = new SimulationService();
  const userService = new UserService();

  const simulations = await simulationService.findAllPendingSimulations();

  if (simulations.length === 0) {
    return;
  }

  for (const simulation of simulations) {
    try {
      console.log(`Começou a simulação ${simulation.id}`);
      // Alterando o status para em progresso
      simulation.status = StatusEnum.IN_PROGRESS;
      await simulationService.updateSimulation(simulation.id, simulation);

      const user = await userService.getUserById(simulation.userId);

      const powerValue = calculatePower(simulation.value);

      // Buscar na api os geradores
      const allGenerators = await fetchAllItems();
      const filterGenerators = filterItemsByPower(allGenerators, powerValue);

      const formattedDate = formatDate(new Date(simulation.simulationDate), 'dd/MM/yy', { locale: ptBR });

      // Gerar o PDF
      const fileName = await createPdf(user.name, formattedDate, filterGenerators);

      // Enviar por email

      // Atualizar no banco de dados
      simulation.filename = fileName;
      simulation.status = StatusEnum.COMPLETED;
      await simulationService.updateSimulation(simulation.id, simulation);
      console.log(`Finalizou a simulação ${simulation.id}`);
    } catch (e) {
      console.log(`Erro na simulação ${simulation.id}, tentando novamente dentro de alguns minutos...`);
      simulation.status = StatusEnum.PENDING;
      await simulationService.updateSimulation(simulation.id, simulation);
    }
  }
};

export const calculatePower = (lightValue: string) => {
  const powerCoefficient = process.env.COEFICIENTE_DE_POTENCIA;

  return getPowerValue(lightValue, powerCoefficient);
}

export const createPdf = async (name: string, date: string, items: Gerador[]): Promise<string> => {
  const pdfContent: PdfCreateProps = {
    title: 'Portal Solar',
    text: `Olá ${name}! Aqui está o resultado da sua simulação solicitada no dia ${date}!`,
    items
  }
  const filename = await createPdfSimulation(pdfContent);
  return filename;
}