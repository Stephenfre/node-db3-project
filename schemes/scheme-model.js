const db = require('../data/db-config.js');


function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(scheme_id) {
    return db('schemes as sc')
        .join('steps as st', 'st.scheme_id', 'sc.id')
        .where({ scheme_id })
        .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .orderBy('st.step_number');
}

// function add(scheme) {
//     return db('schemes')
//         .insert(scheme)
// }

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => {
            return findById(ids[0])
        });
}

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(id => {
            return findById(id)
        });
}

function remove(id) {
    return db('scheme')
        .where({ id })
        .del()
}


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}