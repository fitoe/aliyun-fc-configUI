declare global {
  interface Network {
    enable: boolean
    auto: boolean
    securityGroupId: string
    vpcId: string
    vSwitchIds: string[]
    internetAccess: boolean
  }
}

export { }
