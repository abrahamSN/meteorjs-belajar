import { Template } from 'meteor/templating';

import { Task } from '../api/tasks.js';

import './task.html';

Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Task.update(this._id, {
            $set: { checked: !this.checked }
        });
    },
    'click .delete'() {
        Task.remove(this._id);
    },
});