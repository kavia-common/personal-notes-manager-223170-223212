'use strict';

/**
 * In-memory Notes model.
 * This model provides a simple in-memory store with methods to interact with notes data.
 * It is designed to be replaceable with a database-backed implementation later
 * by keeping the interface small and consistent.
 */

const { randomUUID } = require('crypto');

class NoteModel {
  constructor() {
    this.notes = new Map(); // id -> note
  }

  /**
   * Create a new note in the store.
   * @param {{title: string, content: string, tags?: string[]}} data
   * @returns {object} created note
   */
  create(data) {
    const now = new Date().toISOString();
    const note = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      tags: Array.isArray(data.tags) ? data.tags : [],
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(note.id, note);
    return { ...note };
  }

  /**
   * Get all notes.
   * @returns {object[]} notes
   */
  findAll() {
    return Array.from(this.notes.values()).map((n) => ({ ...n }));
  }

  /**
   * Find a note by id.
   * @param {string} id
   * @returns {object|null}
   */
  findById(id) {
    const n = this.notes.get(id);
    return n ? { ...n } : null;
  }

  /**
   * Update a note by id.
   * @param {string} id
   * @param {{title?: string, content?: string, tags?: string[]}} data
   * @returns {object|null} updated note
   */
  update(id, data) {
    const existing = this.notes.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      title: data.title !== undefined ? data.title : existing.title,
      content: data.content !== undefined ? data.content : existing.content,
      tags: Array.isArray(data.tags) ? data.tags : existing.tags,
      updatedAt: new Date().toISOString(),
    };
    this.notes.set(id, updated);
    return { ...updated };
  }

  /**
   * Delete note by id.
   * @param {string} id
   * @returns {boolean} true if deleted
   */
  delete(id) {
    return this.notes.delete(id);
  }
}

module.exports = new NoteModel();
