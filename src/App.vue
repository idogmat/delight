<template>
  <div id="app">
    <div class="main-menu">
      <h3>Папка</h3>
      <router-link tag="li" class="main-menu__li"
                   v-for="folder in main"
                   :to="'/'+folder.id"
                   :key="folder.id"
                   active-class="main-active"

      >{{ folder.name }}
      </router-link>
      <pre>{{ main.length }}</pre>
      <pre>{{ routIndex }}</pre>
    </div>
    <router-view :folder="arrayFile"/>
    <a href="static/prosto.pdf">2222222</a>


    <!--    <pre>{{ main[0] }}</pre>-->
    <!--    <pre>{{ main[0].under_folder[0].files[0].store_name }}</pre>-->


    <div class="info-block">
      <p>{{ currentRout ? currentRout : '' }}</p>
      <p>{{ this.$route.params['id'] === 'file6' ? this.currentFile.created_at : this.createdFolder}}</p>
      <!--      <p>Создан:{{this.changedInfo ? this.currentFile[0].created_at : this.createdFolder}}</p>-->
      <!--      <p>Изменен:{{this.changedInfo ? this.currentFile[0].updated_at : this.updatedFolder}}</p>-->
    </div>
  </div>
</template>
<script>
import json from '../static/main-menu.json'

export default {
  name: 'App',
  data() {
    return {
      main: '',
      second: '',
      routIndex: '',
      id: this.$route.path.slice(1),
      currentRout: '',
      createdFolder: '',
      updatedFolder: '',
      arrayFile:'',
      currentFile: '',
    }
  },
  computed: {


  },
  methods: {

    currentIndex() {
      return new Promise((resolve, reject) => {
        if (this.$route.path !== '/' && this.$route.path !== '/file/*') {
          for (let i = 0; i < this.main.length; i++) {
            console.log(this.$route.path.slice(1))
            console.log(this.main[i].id)
            if (Number(this.main[i].id) === Number(this.$route.path.slice(1))) {
              resolve(i)
            }
          }
        }
      }).then(res => {
        this.createdFolder = this.main[res].created_at
        this.updatedFolder = this.main[res].updated_at
        this.arrayFile = this.main[res].under_folder
        this.currentFile = this.main[res].under_folder[res]
        this.currentRout = res
      }).then(reject => console.log(reject))
    },
  }, watch: {
    $route(to, from) {
      console.log(to.params['id'])
      this.id = to.params['id']
      this.currentRout = false
      this.currentIndex()
    }
  },
  beforeCreate() {

    fetch('/static/main-menu.json', {
      method: 'GET'
    }).then(
      response => response.json())
      .then(json => this.main = json.data)

    fetch('/static/second-menu.json', {
      method: 'GET'
    }).then(
      response => response.json())
      .then(json => this.second = json.data)

  },
  created() {
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.main-menu {
  width: 150px;
  height: 100vh;
  border-right: 1px solid gray;
}

.second-menu {
  width: 150px;
  height: 100vh;
  border-right: 1px solid gray;
  justify-content: flex-start;
}

.info-block {
  width: 300px;
  height: 100vh;
  border-left: 1px solid gray;
}

.main-menu__li {
  text-decoration: none;
  list-style: none;
  cursor: pointer;
}

.main-active {
  background: gray;
  color: white;
}
</style>
