const db = require('../database');
const my_date = require('../models/my_date');
const uuidv1 = require('uuid/v1');

class InvitationServices {
  async getByInvitationId(invitationId) {
    try {
      const date = await my_date.findOne({date_code: invitationId})
      return date || {};
    }
    catch (err) {
      console.log('err', err);
    }
  }

  async updateInvitation(id, payload) {
    try {
      payload.submitted = true;
      const ret = await my_date.findByIdAndUpdate(id, payload, {new: true});
      return ret;
    }
    catch (err) {
      console.log('err', err);
    }
  }

  async createInvitation(payload) {
    try {
      payload.date_code = uuidv1();
      const newInvitation = new my_date(payload);
      await newInvitation.save();
      return newInvitation;
    }
    catch (err) {
      console.log('err', err);
    }
  }
}

module.exports = new InvitationServices();