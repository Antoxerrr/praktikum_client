<template>
<div class="comment-item-entry" v-bind:data-instance-id="comment.id">
  <v-fade-transition group hide-on-leave>
    <div v-if="!editing" class="comment-item-container bg-dark-soft">
      <div class="comment-header text-muted text-caption">
        <div class="comment-header-title">
          {{ comment.project ? comment.project.name : 'Общее' }}
        </div>
        <div class="buttons-container">
          <v-icon class="edit-comment-button item-icon" @click="editing = true" icon="mdi-pencil" size="large"></v-icon>
          <v-icon v-if="!deletionLoader" @click="deleteComment" class="delete-comment-button item-icon" icon="mdi-delete" size="large"></v-icon>
          <v-progress-circular v-if="deletionLoader" :size="21" :width="2" indeterminate></v-progress-circular>
          <v-fade-transition group hide-on-leave>
            <v-icon v-if="copied" icon="mdi-check-bold" size="large" color="success"></v-icon>
            <v-icon v-if="!copied" class="copy-comment-button item-icon" @click="copyComment" icon="mdi-content-copy" size="large"></v-icon>
          </v-fade-transition>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="comment-content-area text-secondary text-wrap overflow-x-auto" v-html="renderComment"></div>
    </div>
    <CommentTemplateEditor
      v-if="editing"
      :comment-id="comment.id"
      :comment-text="comment.text"
      :comment-project="comment.project ? comment.project.id : null"
      :projects="projects"
      @cancel="editing = false"
      class="mb-2"
    />
  </v-fade-transition>
</div>
</template>

<script>
import {useCommentsStore} from "@/store/comments";
import CommentTemplateEditor from "@/components/commentTemplateEditor.vue";
import {markedRender} from "@/utils/marked";

export default {
  name: "CommentTemplate",
  components: {CommentTemplateEditor},
  data() {
    return {
      deletionLoader: false,
      deletionTooltip: false,
      editing: false,
      copied: false
    }
  },

  methods: {
    async deleteComment() {
      this.deletionLoader = true;
      const store = useCommentsStore();
      await store.deleteComment(this.comment.id);
      this.deletionLoader = false;
    },
    copyComment() {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;
      clipboardData.writeText(this.comment.text);

      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  },
  props: {
    comment: {
      id: Number,
      text: String,
      updated: String,
      created: String,
      project: null
    },
    projects: Array
  },
  computed: {
    renderComment() {
      return markedRender(this.comment.text || '');
    }
  },
  mounted() {
    const container = document.querySelector(`.comment-item-entry[data-instance-id="${this.comment.id}"]`);
    const getButtons = e => e.target.querySelector('.buttons-container');
    const setOpacity = (e, value) => this.editing ? null : getButtons(e).style.opacity = value;
    const setVisible = e => setOpacity(e, 1);
    const setHidden = e => setOpacity(e, 0);
    container.addEventListener('mouseenter', setVisible);
    container.addEventListener('mouseleave', setHidden);
  }
}
</script>

<style scoped>
.comment-item-entry {
  width: 100%;
}

.comment-item-container {
  position: relative;
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 15px 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-header-title {
  padding: 8px;
}

.comment-content-area {
  padding: 10px 25px;
  margin-top: 3px;
}

.buttons-container {
  display: flex;
  gap: 10px;
  /*position: absolute;*/
  /*top: 19px;*/
  /*right: 25px;*/
  transition: opacity 150ms ease;
  opacity: 0;
}

.buttons-container .item-icon {
  cursor: pointer;
  transition: color 150ms ease;
}

.delete-comment-button:hover {
  color: rgb(var(--v-theme-red-primary)) !important;;
}

.edit-comment-button:hover {
  color: rgb(var(--v-theme-blue-primary)) !important;;
}

.copy-comment-button:hover {
  color: rgb(var(--v-theme-blue-secondary)) !important;;
}
</style>
