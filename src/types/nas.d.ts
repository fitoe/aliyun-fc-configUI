declare global {
  interface NasMountPoint {
    enableTLS: boolean
    serverAddr: string
    mountDir: string
    localDir?: string
  }
  interface Nas {
    enable: boolean
    auto: boolean
    groupId: number
    userId: number
    mountPoints: NasMountPoint[]
  }
}

export { }
