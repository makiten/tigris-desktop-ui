import { Loading } from 'quasar'
const Loader = {
  show: () => {
    Loading.show(
      {
        spinner: 'facebook'
      }
    )
  },
  hide: () => {
    Loading.hide()
  }
}

export default Loader
