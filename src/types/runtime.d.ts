declare global {
  interface Runtime {
    runtime: string[]
    command: string
    port: number
    instanceConcurrency: number
    timeout: number
    code: string
    handler: string
  }
}

export { }
