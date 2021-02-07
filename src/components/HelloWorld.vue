<template>
  <div class="preview">
    <div class="second-menu">
      <h3>Файл</h3>
      <router-link tag="li" class="second-menu__li"
                   v-for="file in folder"
                   :to="'file'+file.id"
                   :key="file.id"
                   active-class="second-active"
      >{{ file.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props:['folder'],
  name: 'HelloWorld',
  data:()=>({
    created:'',
    updated:'',
    currentRout:''

  }),
  methods:{

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview {
  width: 100%;
}
.second-menu__li{
  text-decoration: none;
  list-style: none;
  cursor: pointer;
}
.second-active{
  background: gray;
  color: white;
}
</style>
