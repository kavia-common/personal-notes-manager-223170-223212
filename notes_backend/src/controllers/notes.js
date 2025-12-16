'use strict';

const notesService = require('../services/notes');

class NotesController {
  /**
   * GET /api/notes
   * Returns a list of notes.
   */
  // PUBLIC_INTERFACE
  list(req, res, next) {
    /** List all notes. */
    try {
      console.log('[GET] /api/notes');
      const data = notesService.list();
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * GET /api/notes/:id
   * Returns the note with the given id.
   */
  // PUBLIC_INTERFACE
  getById(req, res, next) {
    /** Get a note by id. */
    try {
      const { id } = req.params;
      console.log(`[GET] /api/notes/${id}`);
      const note = notesService.getById(id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.status(200).json({ data: note });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * POST /api/notes
   * Creates a new note.
   */
  // PUBLIC_INTERFACE
  create(req, res, next) {
    /** Create a new note. */
    try {
      console.log('[POST] /api/notes body=', req.body);
      const created = notesService.create(req.body || {});
      return res.status(201).json({ data: created });
    } catch (err) {
      if (err.status === 400) {
        return res.status(400).json({ error: 'Validation error', details: err.details || [] });
      }
      return next(err);
    }
  }

  /**
   * PUT /api/notes/:id
   * Updates an existing note.
   */
  // PUBLIC_INTERFACE
  update(req, res, next) {
    /** Update an existing note. */
    try {
      const { id } = req.params;
      console.log(`[PUT] /api/notes/${id} body=`, req.body);
      const updated = notesService.update(id, req.body || {});
      return res.status(200).json({ data: updated });
    } catch (err) {
      if (err.status === 400) {
        return res.status(400).json({ error: 'Validation error', details: err.details || [] });
      }
      if (err.status === 404) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return next(err);
    }
  }

  /**
   * DELETE /api/notes/:id
   * Deletes a note.
   */
  // PUBLIC_INTERFACE
  delete(req, res, next) {
    /** Delete a note by id. */
    try {
      const { id } = req.params;
      console.log(`[DELETE] /api/notes/${id}`);
      notesService.delete(id);
      return res.status(204).send();
    } catch (err) {
      if (err.status === 404) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return next(err);
    }
  }
}

module.exports = new NotesController();
