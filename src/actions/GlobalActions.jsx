import FluxApp from '../utils/FluxApp'

class GlobalActions {
  constructor() {
    this.generateActions(
      'fetchRotationData',
      'viewPartnerData',
      'deleteRotationBanner',
      'addRotation',
      'setSelectedPartner',
      'updateRotation'
    )
  }
}
new FluxApp()
export default FluxApp.instance.createActions(GlobalActions)
