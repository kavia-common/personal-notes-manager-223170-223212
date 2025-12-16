'use strict';

const noteModel = require('../models/note');

/**
 * NotesService handles business logic and validation for notes.
 */
class NotesService {
  /**
   * Validate payload for creating/updating a note.
   * @param {object} payload
   * @param {boolean} partial - if true, allow partial fields (for update)
   * @returns {{valid: boolean, errors: string[]}}
   */
  validate(payload, partial = false) {
    const errors = [];

    if (!partial || payload.title !== undefined) {
      if (typeof payload.title !== 'string' || payload.title.trim() === '') {
        errors.push('title must be a non-empty string');
      }
    }

    if (!partial || payload.content !== undefined) {
      if (typeof payload.content !== 'string' || payload.content.trim() === '') {
        errors.push('content must be a non-empty string');
      }
    }

    if (payload.tags !== undefined) {
      if (!Array.isArray(payload.tags) || !payload.tags.every((t) => typeof t === 'string')) {
        errors.push('tags must be an array of strings');
      }
    }

    return { valid: errors.length === 0, errors };
  }

  // PUBLIC_INTERFACE
  list() {
    /** Returns all notes. */
    return noteModel.findAll();
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Returns a note by its id or null if not found. */
    return noteModel.findById(id);
  }

  // PUBLIC_INTERFACE
  create(payload) {
    /** Creates a new note after validation. */
    const { valid, errors } = this.validate(payload, false);
    if (!valid) {
      const err = new Error('Validation error');
      err.status = 400;
      err.details = errors;
      throw err;
    }
    return noteModel.create(payload);
  }

  // PUBLIC_INTERFACE
  update(id, payload) {
    /** Updates an existing note after validation. */
    const { valid, errors } = this.validate(payload, true);
    if (!valid) {
      const err = new Error('Validation error');
      err.status = 400;
      err.details = errors;
      throw err;
    }
    const existing = noteModel.findById(id);
    if (!existing) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    return noteModel.update(id, payload);
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Deletes a note by id. Returns true if deleted, false if not found. */
    const existed = noteModel.findById(id);
    if (!existed) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    return noteModel.delete(id);
  }
}

module.exports = new NotesService();
