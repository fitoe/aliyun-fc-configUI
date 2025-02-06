declare global {
  interface TriggerHttp {
    triggerName: string
    triggerType: string
    qualifier: string
    triggerConfig: {
      methods: string[]
      authType: string
      disableURLInternet: boolean
    }
  }

  interface TriggerHttpItem {
    type: MarkRaw
    title: string
    config: TriggerHttp
  }

  interface TriggerTimer {
    triggerName: string
    triggerType: string
    qualifier: string
    triggerConfig: {
      enable: boolean
      cronExpression: string
      payload: string
    }
  }
  interface TriggerTimerItem {
    type: MarkRaw
    title: string
    config: TriggerTimer
  }
}

export { }
