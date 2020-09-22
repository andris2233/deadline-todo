<template>
  <div id="app">
    <div id="nav">
      <div class="nav__header">Задачи</div>
      <div class="nav-menu">
        <router-link to="/" class="nav-link">Создать</router-link>
        <router-link to="/list" class="nav-link">Список</router-link>
      </div>
    </div>
    <transition name="router" tag="div" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #383838;
}

#nav {
  padding-left: 15px;
  background: #328bca;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  box-sizing: content-box;
  margin: 0;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;

  a.router-link-exact-active {
    background: #1d6ca5;
  }
}

.nav__header {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
}

.nav-menu {
  display: flex;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.3s;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  width: 90px;
  height: 70px;

  &:hover {
    background: #49a0de;
  }
}

.router-enter-active,
.router-leave-active {
  transition: 0.3s;
}

.router-enter,
.router-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
