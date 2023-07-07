import { Registry, ModelDefinition, Assign, FactoryDefinition, FlattenFactoryMethods } from "miragejs/-types"
import { Server } from "miragejs/server"
import { User, makeServer } from "."

let server: Server<Registry<{ user: ModelDefinition<Assign<{}, Partial<User>>> }, { user: FactoryDefinition<Assign<{}, FlattenFactoryMethods<{ id: string; name: string; email: string; createdAt: Date }>>> }>>

let isMirageServerUp: boolean = false

export function createMirageServer () {
  if (isMirageServerUp) return
  
  server = makeServer();
  console.log("Servidor Mirage criado!");
  isMirageServerUp = true;
}

export function shutDownMirageServer() {
    if (!isMirageServerUp) return;
    
    server.shutdown()
    console.log("Servidor Mirage fechado!");
    isMirageServerUp = false
}
