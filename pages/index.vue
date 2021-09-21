<template>

  <div>
    <NuxtLink to="login">
        <main-button type="button" class="app-btn-primary">Login</main-button>
    </NuxtLink>
  </div>


</template>

<script>
export default {
    layout: 'default',
    auth: false
}
</script>
