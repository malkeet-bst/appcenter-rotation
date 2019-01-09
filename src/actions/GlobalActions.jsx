import FluxApp from '../utils/FluxApp'

class GlobalActions {
  constructor() {
    this.generateActions(
      'fetchXpackInfo',
      'fetchXpackVideos',
      'fetchXpackLocalization',
      'fetchRotationData'
    )
  }
}
new FluxApp()
export default FluxApp.instance.createActions(GlobalActions)
