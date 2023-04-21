<template>
  <v-container>
    <CommentTemplatesList/>
  </v-container>
</template>

<script>
import CommentTemplatesList from "@/components/CommentTemplatesList.vue";

export default {
  name: "Home",
  components: {CommentTemplatesList}
}
</script>
