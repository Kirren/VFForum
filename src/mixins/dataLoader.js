export default {
  data () {
    return {
      dataReady: false
    }
  },
  methods: {
    dataFetched () {
      this.dataReady = true
    }
  }
}
