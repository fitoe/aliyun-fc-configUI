declare global {
  interface OssMountPoint {
    region: string
    bucketName: string
    bucketPath: string
    mountDir: string
    readOnly: boolean
  }
  interface Oss {
    enable: boolean
    mountPoints: OssMountPoint[]
  }
}

export { }
