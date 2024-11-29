<template>
  <div>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
      <div style="padding: 0 15px;display: flex; align-items: center; justify-content: center; height: 70px;" :style="{color:Color}">
        {{ $t('Lange') }}
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
        <el-dropdown-item command="tn">泰语</el-dropdown-item>
        <el-dropdown-item command="vn">越南语</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  name: 'LangSelect',
  props: {
    Color: {
      type: String,
    }
  },
  data() {
    return {

    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {

  },
  created() {
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message.success('switch language success')
    }
  }
}
</script>

<style>
</style>
