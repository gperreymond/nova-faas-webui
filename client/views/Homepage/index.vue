<template>
  <div>
    <header>
      <h1>Nova Platform</h1>
      <h3>Homepage</h3>
      <p>Overview of infrastructures.</p>
    </header>
    <section>
      <h2>Servers: {{stats.servers.length}}</h2>
      <ul>
        <li v-for="item in stats.servers">{{item.uuid}}</li>
      </ul>
    </section>
    <section>
      <h2>Clients: {{stats.clients.length}}</h2>
      <ul>
        <li v-for="item in stats.clients">{{item.uuid}}</li>
      </ul>
    </section>
    <section>
      <h2>Services: {{stats.services.length}}</h2>
      <ul>
        <li v-for="item in stats.services">{{item.name}} ({{item.consumers}})</li>
      </ul>
    </section>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
