<template>
  <div>
    <header>
      <h1>Nova Platform</h1>
      <h3>Homepage</h3>
      <p>Overview of infrastructures.</p>
    </header>
    <section v-if="stats.servers.length > 0">
      <h2>Servers: {{stats.servers.length}}</h2>
      <ul>
        <li v-for="item in stats.servers">
          <span class="uuid">{{item.uuid}}</span>
          <span class="memory">{{item.memory}} Mo</span>
        </li>
      </ul>
    </section>
    <section v-if="stats.clients.length > 0">
      <h2>Clients: {{stats.clients.length}}</h2>
      <ul>
        <li v-for="item in stats.clients">
          <span class="uuid">{{item.uuid}}</span>
          <span class="memory">{{item.memory}} Mo</span>
        </li>
      </ul>
    </section>
    <section v-if="stats.services.length > 0">
      <h2>Services: {{stats.services.length}}</h2>
      <ul>
        <li v-for="item in stats.services">{{item.name}} ({{item.consumers}})</li>
      </ul>
    </section>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
