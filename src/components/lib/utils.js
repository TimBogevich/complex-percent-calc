export default{
  methods: {
    delimiter: (val, delim="") => val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + delim)
  },
}

