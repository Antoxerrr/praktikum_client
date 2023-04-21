import { defineStore } from 'pinia'
import axios from "axios";

export const NO_PROJECT_VALUE = {
  id: null,
  name: 'Общие'
};

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
    projects: []
  }),
  actions: {
    async getProjectsList() {
      try {
        const response = await axios.get('/comments/projects/');
        this.projects = [
          NO_PROJECT_VALUE,
          ...response.data
        ];
      }
      catch (error) {
        return error;
      }
    },

    async getCommentTemplatesList() {
      try {
        const response = await axios.get('/comments/templates/');
        this.comments = response.data;
      }
      catch (error) {
        return error;
      }
    },

    async createComment(text, projectId) {
      try { await axios.post('/comments/templates/', {text: text, project: projectId}) }
      catch (error) { return error }
      await this.getCommentTemplatesList();
    },

    async updateComment(commentId, text, projectId) {
      try { await axios.patch(`/comments/templates/${commentId}`, {text: text, project: projectId}) }
      catch (error) { return error }
      await this.getCommentTemplatesList();
    },

    async deleteComment(commentId) {
      try { await axios.delete(`/comments/templates/${commentId}`) }
      catch (error) { return error }
      await this.getCommentTemplatesList();
    }
  }
})
