declare global {
  interface TriggerHttp {
    triggerName: string
    triggerType: string
    qualifier: string
    description: string
    triggerConfig: {
      methods: string[]
      authType: string
      disableURLInternet: boolean
    }
  }

  interface TriggerTimer {
    triggerName: string
    triggerType: string
    qualifier: string
    description: string
    triggerConfig: {
      enable: boolean
      cronExpression: string
      payload: string
    }
  }

  interface TriggerItem {
    type: any
    title: string
    config: TriggerHttp | TriggerTimer
  }
}

export { }
