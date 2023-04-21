<template>
<v-row>
  <div class="comment-editor-row">
    <h2 v-if="!commentId">Создать комментарий</h2>
    <div class="comment-editor-container bg-dark-soft">
      <textarea class="comment-editor" :value="input" @input="update"></textarea>
      <div class="comment-preview" v-html="renderComment"></div>
    </div>
    <div class="bottom-row">
      <v-select
        v-model="projectId"
        :items="projectsWithCommon"
        item-title="name"
        item-value="id"
        v-if="projects"
        class="project-select"
        variant="solo"
        density="compact"
        hide-details
      ></v-select>
      <div class="buttons-wrapper">
        <div class="buttons-right">
          <v-btn
            variant="flat"
            color="red-secondary"
            @click="cancel"
          >
            Отмена
          </v-btn>
          <v-btn
            variant="flat"
            color="blue-primary"
            @click="saveComment"
            :loading="submitLoading"
          >
            Сохранить
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</v-row>
</template>

<script>
import {marked} from "marked";
import {useCommentsStore} from "@/store/comments";
import {markedRender} from "@/utils/marked";

// null для select-a это всё равно что "не выбрано"
// Заменяем null на строку, потому что у нас
// у "Общего" проекта id = null
const NULL_ALIAS = 'null';

export default {
  name: "commentTemplateEditor",
  props: {
    commentText: String,
    commentId: Number,
    commentProject: Number,
    projects: Array
  },
  data() {
    return {
      input: this.commentText,
      projectId: this.commentProject || NULL_ALIAS,
      submitLoading: false
    }
  },
  computed: {
    renderComment() {
      return markedRender(this.input);
    },
    projectsWithCommon() {
      const nullProject = v => ({...v, id: NULL_ALIAS});
      return this.projects.map(v => v.id ? v : nullProject(v));
    }
  },
  methods: {
    update(e) {
      this.input = e.target.value;
    },
    cancel() {
      this.input = '';
      this.$emit('cancel');
    },
    async saveComment() {
      if (this.input) {
        this.submitLoading = true;
        let projectId = this.projectId === NULL_ALIAS ? null : this.projectId;
        const store = useCommentsStore();
        if (this.commentId) {
          await store.updateComment(this.commentId, this.input, projectId);
        } else {
          await store.createComment(this.input, projectId);
        }
        this.submitLoading = false;
        this.cancel();
      }
    }
  }
}
</script>

<style scoped>
.comment-editor-row {
  margin: 15px 0;
  width: 100%;
}

.comment-editor-container {
  display: flex;
  gap: 0;
  height: 350px;
  width: 100%;
  margin: 15px 0;
  border-radius: 15px;
}

.comment-editor {
  padding: 25px 25px;
  resize: none;
  outline: none;
  background-color: #212121;
  flex: 1;
  border-right: 1px solid #3f3f3f;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.comment-preview {
  padding: 25px 25px;
  flex: 1;
  overflow: auto;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.buttons-wrapper {
  flex: 1;
}

.bottom-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-select {
  flex: 0.7;
}

.buttons-right {
  display: flex;
  gap: 10px;
  margin-left: auto;
  width: fit-content;
}
</style>
