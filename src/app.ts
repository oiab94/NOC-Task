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