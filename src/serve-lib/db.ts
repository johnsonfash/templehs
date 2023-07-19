import knex from 'knex'
import { CONST } from './constants';

export const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

export const down = async () => {
  return db.schema
    .dropTable(CONST.USER_TABLE)
    .dropTable(CONST.DOCTOR_TABLE)
    .dropTable(CONST.DOCTOR_FIELD_TABLE)
    .dropTable(CONST.APPOINTMENT_TABLE)
}

export const up = async () => {
  return db.schema.hasTable(CONST.USER_TABLE).then(function (exists) {
    console.log(exists)
    if (!exists) {
      return db.schema.createTable(CONST.USER_TABLE, function (table) {
        table.increments('id');
        table.string('email').notNullable().unique();
        table.string('password').notNullable()
        table.string('name').nullable()
        table.dateTime('created_at', { precision: 6 }).defaultTo(db.fn.now(6));
        table.dateTime('updated_at', { precision: 6 }).defaultTo(db.fn.now(6));
      })
        .createTable(CONST.DOCTOR_TABLE, function (table) {
          table.increments('id');
          table.string('email').notNullable().unique();
          table.string('password').notNullable();
          table.string('name').nullable();
          table.string('field').nullable();
          table.string('abbr').nullable();
          table.string('bio').nullable();
          table.string('image').nullable();
          table.string('visit_type').nullable();
          table.specificType('available_date', 'text ARRAY')
          table.specificType('available_time', 'text ARRAY')
          table.dateTime('created_at', { precision: 6 }).defaultTo(db.fn.now(6));
          table.dateTime('updated_at', { precision: 6 }).defaultTo(db.fn.now(6));
        })
        .createTable(CONST.DOCTOR_FIELD_TABLE, function (table) {
          table.increments('id');
          table.string('name').notNullable();
          table.string('abbr').nullable();
          table.dateTime('created_at', { precision: 6 }).defaultTo(db.fn.now(6));
          table.dateTime('updated_at', { precision: 6 }).defaultTo(db.fn.now(6));
        })
        .createTable(CONST.APPOINTMENT_TABLE, function (table) {
          table.increments('id');
          table.integer('doctor_id').notNullable();
          table.integer('user_id').notNullable();
          table.string('appointment_date').notNullable();
          table.string('appointment_time').notNullable();
          table.dateTime('created_at', { precision: 6 }).defaultTo(db.fn.now(6));
          table.dateTime('updated_at', { precision: 6 }).defaultTo(db.fn.now(6));
        })
    }
  });
}