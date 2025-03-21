// ! Los environments deben ser cargado primeramente por sobre todo
import { LoggerAdapter } from './plugins/logger.adapter'
import { envs } from './plugins/envs.adapter'
import { Server } from './presentation/server'
// FUNCION AUTOINVOCADA
(
  async () => {
    main();
  }
)();


function main() {

  Server.start();

}