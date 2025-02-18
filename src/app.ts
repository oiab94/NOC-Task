import { Server } from './presentation/server'
import { envs } from './plugins/envs.adapter'
// FUNCION AUTOINVOCADA
(
  async () => {
    main();
  }
)();


function main() {
  //Server.start();
  console.log( envs )
}