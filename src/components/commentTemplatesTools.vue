<template>
<div>
  <v-row class="search-create-row">
    <v-text-field
      variant="solo"
      placeholder="Поиск [Alt+F]"
      hide-details
      density="comfortable"
      v-model="search"
      @input="commentSearch"
      id="comments-search-field"
      bg-color="background-soft"
    />
    <v-btn id="create-comment-btn" class="gradient-btn-blue" @click="commentCreation = true">Создать шаблон</v-btn>
  </v-row>
  <v-slide-y-transition>
    <div v-if="commentCreation" class="mb-4">
      <CommentTemplateEditor @cancel="commentCreation = false" :projects="projects"/>
    </div>
  </v-slide-y-transition>
  <v-row>
    <v-slide-group
      show-arrows
      multiple
      v-model="selectedProjects">
      <v-slide-group-item
        v-for="project in projects"
        :key="project.id"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          class="ma-2"
          :color="isSelected ? 'secondary' : 'background-alt'"
          @click="projectSelection(project.id, isSelected)"
        >
          {{ project.name }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-row>
</div>
</template>

<script>
import {useCommentsStore} from "@/store/comments";
import {mapState} from "pinia";
import CommentTemplateEditor from "@/components/commentTemplateEditor.vue";

export default {
  name: "commentTemplatesTools",
  components: {CommentTemplateEditor},
  data() {
    return {
      search: '',
      selectedProjects: [],
      commentCreation: false
    }
  },
  props: {
    projects: Array
  },
  async mounted() {
    const commentsStore = useCommentsStore();
    await commentsStore.getProjectsList();
    // Фокус на поле фильтра при нажатии Alt + F
    window.onkeydown = function(e){
      if(e.altKey && (e.key === 'f' || e.key === 'а')) {
        e.preventDefault();
        document.getElementById('comments-search-field').focus();
      }
    }
  },
  methods: {
    commentSearch() {
      this.$emit('commentSearch', this.search);
    },

    projectSelection(projectId, isSelected) {
      // Короче бля, я с этой темой заманался
      // v-slide-group при выборе элемента добавляет в модель именно
      // ИНДЕКС ЭТОГО ЭЛЕМЕНТА В МАССИВЕ, я хз может можно сделать
      // по другому, но я не нашёл как, поэтому хуевертим тут вот
      // такие выкрутасы с индексами
      const projectIndex = () => this.projects.map(v => v.id).indexOf(projectId);
      isSelected ?
        this.selectedProjects.splice(this.selectedProjects.indexOf(projectIndex()), 1) :
        this.selectedProjects.push(projectIndex());

      const projectIdsByIndex = () => this.selectedProjects.map(v => this.projects[v] ? this.projects[v].id : null);
      this.$emit('projectSelection', projectIdsByIndex())
    }
  }
}
</script>

<style scoped>
.search-create-row {
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

#create-comment-btn {
  height: 42px;
}
</style>
