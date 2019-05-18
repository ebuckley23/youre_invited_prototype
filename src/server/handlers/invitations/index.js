const express = require('express');
const router = express.Router();
const invitationsService = require('../../services/invitations');

router.get('/:invitationId', async (req, res) => {
  const ret = await invitationsService.getByInvitationId(req.params.invitationId);
  res.json(ret);
})

router.put('/:id', async (req, res) => {
  const ret = await invitationsService.updateInvitation(req.params.invitationId, req.body);
  res.json(ret);
})

router.post('/', async (req, res) => {
  const ret = await invitationsService.createInvitation(req.body);
  res.json(ret);
})

module.exports = router;