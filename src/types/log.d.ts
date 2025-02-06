declare global {
  interface Log {
    enable: boolean
    auto: boolean
    enableRequestMetrics: boolean
    enableInstanceMetrics: boolean
    logBeginRule: boolean
    project: string
    logstore: string
  }
}

export { }
