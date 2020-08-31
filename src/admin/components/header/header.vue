<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation />
  </div>
</template>

<script>
  import headline from "../headline";
  import user from "../user";
  import navigation from "../navigation";

  export default {
    components: {
      headline,
      navigation,
      user
    }
  };
</script>
