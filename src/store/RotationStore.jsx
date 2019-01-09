import FluxApp from '../utils/FluxApp'
import GlobalActions from '../actions/GlobalActions'


export class RotationStore {
  constructor() {
    window.RotationStore = this
    // CloudApi and cache are singletons

    // A network resource, should be null initially
    this.rotationData = []
    this.bindActions(GlobalActions)
    window.RotationStore = this
  }

  onClearData() {
    this.xpackInfo = null
  }
  async onFetchRotationData() {
    this.rotationData = [
      {
        rotation_id: '3727',
        game_name: 'clash of clans',
        package_name: 'coc',
        action: [{ value: 'download', label: 'download' }],
        sticky: true,
        image_url: 'http://',
        partner: [{ value: 'vn', label: 'vn' }, { value: 'in', label: 'in' }],
        order: 1,
        download_url: 'http://download'
      },
      {
        package_name: "1",
        game_name: "2",
        action: "3"
      },
      {
        package_name: "a",
        game_name: "b",
        action: "c"
      }
    ]
    let response = await fetch('https://cdn-bgp.bluestacks.com/bgp/json/engg/in/in_app_center_home.json?v=7235');
    let user = await response.json();
    let githubResponse = await fetch(`https://cdn-bgp.bluestacks.com/bgp/json/engg/in/in_app_center_topic_data_Strategy.json?v=7203${user.name}`);
    console.log(githubResponse.json())
  }

}

export default FluxApp.instance.createStore(RotationStore, 'RotationStore')
