<template>
  <div id="app" class="d-flex flex-column">
    <Navbar />
    <div class="container py-5 flex-grow-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Navbar from "@/components/Layouts/Navbar";
  import Footer from "@/components/Layouts/Footer";
  export default {
    name: "App",
    components: {
      Navbar,
      Footer,
    },
  };
</script>
