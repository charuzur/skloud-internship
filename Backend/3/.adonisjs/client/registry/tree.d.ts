/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
  }
  tasks: {
    index: typeof routes['tasks.index']
    show: typeof routes['tasks.show']
    store: typeof routes['tasks.store']
    update: typeof routes['tasks.update']
    destroy: typeof routes['tasks.destroy']
  }
}
