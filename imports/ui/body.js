import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Task } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
        const inst = Template.instance();
        if (Session.get('hideCompleted')) {

        return Task.find({ checked: { $ne: true } }, { sort: { createAt: -1 } });
        }
        return Task.find({}, { sort: { createAt: -1 } });
    },
    blomKelar() {
        return Task.find({ checked: { $ne: true } }).count();
    }
});

Template.input.events({
    'submit .new-task'(event, t) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.data.value;

        // Insert a task into the collection
        const data = Task.insert({
            text,
            createdAt: new Date(), // current time
        });
        // Clear form
        target.data.value = '';
    },

    'change .hide-completed input'(event, instance) {
        Session.set('hideCompleted', event.target.checked);
    },
});
