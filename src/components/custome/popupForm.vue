<script>
import {defineComponent, ref} from "@vue/composition-api";
import BaseForm from "@/components/common/BaseForm.vue";
import {formConfigF} from "@/constants";
import ca from "element-ui/src/locale/lang/ca";

export default defineComponent({
  methods: {formConfigF},
  components: {BaseForm},
  props: {
    formItems: {
      type: Array,
      required: true
    },
    onMaskClose:{
      type:Boolean,
      default:true
    },
    tit: {
      type: String,
    }
  },
  emits: ['onConfirm'],
  setup(props, {emit}) {
    const dialogRef = ref(null)
    const baseFormRef = ref(null)
    const show = ref(false)
    const open = (callback) => dialogRef.value.show({beforeShowAction: callback, onConfirmCallback: () => emit('onConfirm', baseFormRef.value.generatorParams())})
    const close = () => dialogRef.value.close()
    return {
      dialogRef, baseFormRef, show,
      open, close
    }
  }
})
</script>

<template>
  <Dialog ref="dialogRef" :close-on-click-modal="onMaskClose" :title="tit">
    <template>
      <BaseForm
        ref="baseFormRef"
        :form-items="formItems"
        :config="formConfigF(100)"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>
