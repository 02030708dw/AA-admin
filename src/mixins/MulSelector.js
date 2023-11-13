export default {
  data(){
    return {
      selectedItems:[]
    }
  },
  methods:{
    deleteParams(key='id'){
      return this.selectedItems.map(it=>it[key])
    },
    handleSelectionChange(selectedItems) {
      this.selectedItems = selectedItems
    }
  },
  computed:{
    delStatus(){
      return !this.selectedItems.length
    }
  }
}
