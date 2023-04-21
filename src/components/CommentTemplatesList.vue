<template>
<v-container>
  <CommentTemplatesTools
    @commentSearch="updateSearch"
    @projectSelection="updateSelectedProjects"
    :projects="projects"
  />
  <v-row
    v-for="comment in filteredComments"
    class="soft-border-top pt-1 mt-4">
    <CommentTemplate
      :comment="comment"
      :projects="projects"
    />
  </v-row>
</v-container>
</template>

<script>
import axios from "axios";
import {useCommentsStore} from "@/store/comments";
import {mapState} from "pinia";
import CommentTemplate from "@/components/CommentTemplate.vue";
import CommentTemplatesTools from "@/components/commentTemplatesTools.vue";
import CommentTemplateEditor from "@/components/commentTemplateEditor.vue";

export default {
  name: "CommentTemplatesList",
  components: {CommentTemplateEditor, CommentTemplatesTools, CommentTemplate},
  data() {
    return {
      search: '',
      selectedProjects: []
    }
  },

  async mounted() {
    await this.$nextTick(async function () {
      const commentsStore = useCommentsStore();
      await commentsStore.getCommentTemplatesList();
      await commentsStore.getProjectsList();
    });

  },

  computed: {
    ...mapState(useCommentsStore, ['comments', 'projects']),
    filteredComments() {
      return this.comments.filter(comment => {
        const commentProjectId = comment.project ? comment.project.id : null;

        const fitsProjectSelection = this.selectedProjects.length === 0 || this.selectedProjects.indexOf(commentProjectId) !== -1;
        const fitsSearch = comment.text.toLowerCase().includes(this.search.toLowerCase());

        return fitsProjectSelection && fitsSearch;
      })
    }
  },

  methods: {
    updateSearch(search) {
      this.search = search || '';
    },
    updateSelectedProjects(selectedProjects) {
      this.selectedProjects = selectedProjects;
    }
  }
}
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';
@import "@/assets/styles/gradient-btn.css";
</style>
